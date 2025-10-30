require("dotenv").config();
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const uploads = multer({ dest: "uploads/" });

// ตรวจสอบ API KEY
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: .env file is missing the GEMINI_API_KEY");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ==================== 1. Database Setup ====================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/physsi_db"; 
mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    history: [{ 
        prompt: String,
        response: String,
        timestamp: { type: Date, default: Date.now }
    }],
    quizResults: [{ 
        topic: String,
        score: Number,
        totalQuestions: Number,
        difficulty: String,
        date: { type: Date, default: Date.now }
    }]
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

// ==================== Middleware ====================
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

const staticPath = path.resolve(__dirname, "../client/static");
app.use("/static", express.static(staticPath));

console.log(`[Static Files] Serving static files from: ${staticPath}`);

// ==================== HTML Routes ====================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/welcome.html"));
});

app.get("/chatbot.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/chatbot.html"));
});

app.get("/login.html", (req, res) => { 
    res.sendFile(path.join(__dirname, "../client/login.html"));
});

app.get("/register.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/register.html"));
});

app.get("/quiz-select.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/quiz-select.html"));
});

app.get("/quiz-question.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/quiz-question.html"));
});

app.get("/quiz-result.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/quiz-result.html"));
});

// ==================== API Authentication ====================
app.post("/api/register", async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ success: false, message: "Please provide username, password, and email." });
    }
    try {
        const user = new User({ username, password, email });
        await user.save();
        res.status(201).json({ success: true, message: "Registration successful. Redirecting to login..." });
    } catch (error) {
        console.error("Registration error:", error);
        if (error.code === 11000) {
            return res.status(409).json({ success: false, message: "Username or email already exists." });
        }
        res.status(500).json({ success: false, message: "Server error during registration." });
    }
});

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please provide username and password." });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }
        res.json({ success: true, message: "Login successful.", userId: user._id, username: user.username });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error during login." });
    }
});

// ==================== API Chatbot ====================
function formatAIResponse(text) {
    const lines = text.split("\n");
    let html = "";
    let inList = false;
    lines.forEach((line) => {
        line = line.trim();
        if (!line) return;
        if (line.startsWith("* ")) {
            if (!inList) {
                html += "<ul>";
                inList = true;
            }
            html += `<li>${line.substring(2)}</li>`;
        } else {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            line = line.replace(/\*(.*?)\*/g, "<em>$1</em>");
            html += `<p>${line}</p>`;
        }
    });
    if (inList) html += "</ul>";
    return html;
}

app.post("/get", uploads.single("file"), async (req, res) => {
    const userId = req.body.userId;
    const userInput = req.body.msg;
    const file = req.file;
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        let prompt = [userInput];
        
        if (file) {
            const fileData = fs.readFileSync(file.path);
            prompt.push({
                inlineData: {
                    data: fileData.toString("base64"),
                    mimeType: file.mimetype,
                },
            });
        }
        
        const response = await model.generateContent(prompt);
        const aiResponseText = formatAIResponse(response.response.text());
        
        // Save to database if user is logged in
        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            await User.findByIdAndUpdate(userId, {
                $push: {
                    history: { 
                        prompt: userInput, 
                        response: aiResponseText,
                        timestamp: new Date()
                    }
                }
            });
        }
        
        res.send(aiResponseText);
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).send("Sorry, an error occurred while generating the AI response.");
    } finally {
        if (file) fs.unlinkSync(file.path);
    }
});

// ==================== API History Management ====================

// Get user history
app.get("/api/history/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID." });
    }
    try {
        const user = await User.findById(userId).select('history username');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        res.json({ 
            success: true, 
            history: user.history.reverse(), 
            username: user.username 
        });
    } catch (error) {
        console.error("Fetch history error:", error);
        res.status(500).json({ success: false, message: "Server error fetching history." });
    }
});

// Delete all user history
app.delete("/api/history/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID." });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        
        user.history = [];
        await user.save();
        
        res.json({ 
            success: true, 
            message: "All chat history has been cleared." 
        });
    } catch (error) {
        console.error("Delete history error:", error);
        res.status(500).json({ success: false, message: "Server error deleting history." });
    }
});

// Delete single history item
app.delete("/api/history/:userId/:historyId", async (req, res) => {
    const { userId, historyId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID." });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        
        user.history = user.history.filter(h => h._id.toString() !== historyId);
        await user.save();
        
        res.json({ 
            success: true, 
            message: "Chat history item deleted." 
        });
    } catch (error) {
        console.error("Delete single history error:", error);
        res.status(500).json({ success: false, message: "Server error deleting history item." });
    }
});

// ==================== API Quiz Generation ====================
app.post("/api/quiz/generate", async (req, res) => {
    const { topic, numQuestions, difficulty, language } = req.body;
    
    if (!topic || !numQuestions || !difficulty || !language) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Define topic content mapping
        const topicContent = {
            heart: {
                en: "heart anatomy, cardiovascular system, cardiac cycle, blood circulation, heart valves, ECG, arrhythmias, cardiac disorders",
                th: "กายวิภาคหัวใจ, ระบบหัวใจและหลอดเลือด, วัฏจักรหัวใจ, การไหลเวียนของเลือด, ลิ้นหัวใจ, คลื่นไฟฟ้าหัวใจ, ภาวะหัวใจเต้นผิดจังหวะ, โรคหัวใจ"
            },
            brain: {
                en: "brain anatomy, nervous system, neurotransmitters, brain regions, cognitive functions, neurological disorders",
                th: "กายวิภาคสมอง, ระบบประสาท, สารสื่อประสาท, ส่วนต่างๆของสมอง, การทำงานทางสติปัญญา, โรคทางระบบประสาท"
            }
        };

        const difficultyInstructions = {
            easy: {
                en: "basic concepts and definitions, suitable for beginners",
                th: "แนวคิดและคำจำกัดความพื้นฐาน เหมาะสำหรับผู้เริ่มต้น"
            },
            medium: {
                en: "intermediate level with some detailed concepts",
                th: "ระดับกลาง มีแนวคิดที่มีรายละเอียดบางอย่าง"
            },
            hard: {
                en: "advanced topics with in-depth understanding required",
                th: "หัวข้อขั้นสูง ต้องการความเข้าใจเชิงลึก"
            }
        };

        const languageInstruction = language === 'th' 
            ? "Generate questions in THAI language (ภาษาไทย). All questions, options, explanations, and subtopics must be in Thai."
            : "Generate questions in ENGLISH language. All questions, options, explanations, and subtopics must be in English.";

        const prompt = `${languageInstruction}

Generate exactly ${numQuestions} multiple-choice questions about ${topicContent[topic][language]}.

**Difficulty Level:** ${difficultyInstructions[difficulty][language]}

**Requirements:**
1. Each question must have exactly 4 answer options
2. Only ONE option should be correct
3. For each question in "${topic}" topic, identify which SUBTOPIC it belongs to
   - For heart: "Cardiac Cycle", "Blood Vessels", "Heart Valves", "ECG", etc. (or Thai equivalents)
   - For brain: "Brain Anatomy", "Neurotransmitters", "Brain Functions", etc. (or Thai equivalents)
4. Provide a brief explanation for the correct answer
5. Mix questions across different subtopics within ${topic}

**Output Format (JSON):**
{
  "questions": [
    {
      "question": "Question text here in ${language === 'th' ? 'Thai' : 'English'}",
      "subtopic": "Specific subtopic name in ${language === 'th' ? 'Thai' : 'English'}",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Brief explanation in ${language === 'th' ? 'Thai' : 'English'}"
    }
  ]
}

**Important:**
- correctAnswer is the INDEX (0-3) of the correct option
- Questions should be clear and unambiguous
- ALL text must be in ${language === 'th' ? 'THAI (ภาษาไทย)' : 'ENGLISH'} language
- Return ONLY valid JSON, no additional text

Generate ${numQuestions} questions now.`;

        console.log(`🧪 Generating ${numQuestions} ${difficulty} questions about ${topic} in ${language}...`);

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Extract JSON from response
        let quizData;
        try {
            // Try to parse directly
            quizData = JSON.parse(responseText);
        } catch (e) {
            // Try to extract JSON from markdown code blocks
            const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                             responseText.match(/```\s*([\s\S]*?)\s*```/);
            if (jsonMatch) {
                quizData = JSON.parse(jsonMatch[1]);
            } else {
                throw new Error("Could not parse quiz data from AI response");
            }
        }

        // Validate quiz data
        if (!quizData.questions || quizData.questions.length === 0) {
            throw new Error("No questions generated");
        }

        // Ensure we have exactly the requested number of questions
        quizData.questions = quizData.questions.slice(0, numQuestions);

        console.log(`✅ Generated ${quizData.questions.length} questions successfully`);

        res.json({
            success: true,
            quiz: quizData,
            message: "Quiz generated successfully"
        });

    } catch (error) {
        console.error("❌ Error generating quiz:", error);
        res.status(500).json({
            success: false,
            message: "Failed to generate quiz. Please try again."
        });
    }
});

// ==================== API Save Quiz Result ====================
app.post("/api/quiz/save-result", async (req, res) => {
    const { userId, result } = req.body;

    if (!userId || !result) {
        return res.status(400).json({ success: false, message: "Missing userId or result" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Add result to user's quiz results
        user.quizResults.push({
            topic: result.topic,
            score: result.score,
            totalQuestions: result.totalQuestions,
            difficulty: result.difficulty,
            date: new Date()
        });

        await user.save();

        console.log(`✅ Quiz result saved for user: ${user.username}`);

        res.json({
            success: true,
            message: "Quiz result saved successfully"
        });

    } catch (error) {
        console.error("❌ Error saving quiz result:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save quiz result"
        });
    }
});

// ==================== API Get User Quiz Results ====================
app.get("/api/quiz/results/:userId", async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    try {
        const user = await User.findById(userId).select('quizResults username');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            results: user.quizResults.reverse(), // Most recent first
            username: user.username
        });

    } catch (error) {
        console.error("❌ Error fetching quiz results:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch quiz results"
        });
    }
});

// ==================== Start Server ====================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});