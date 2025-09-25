require("dotenv").config();
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const uploads = multer({ dest: "uploads/" });

// ตรวจสอบ API KEY
if (!process.env.GEMINI_API_KEY) {
  console.error("Error: env file is missing the API KEY");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (JS, CSS, images) จาก client/static
app.use("/static", express.static(path.join(__dirname, "../client/static")));

// หน้าแรก
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/welcome.html"));
});

// หน้า chatbot
app.get("/chatbot.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/chatbot.html"));
});


// ฟังก์ชันแปลง Markdown-like เป็น HTML
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

// POST endpoint สำหรับ chatbot
app.post("/get", uploads.single("file"), async (req, res) => {
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
    res.send(formatAIResponse(response.response.text()));
  } catch (error) {
    console.error("Error generating response:", error);
    res
      .status(500)
      .send("Sorry, an error occurred while generating the AI response.");
  } finally {
    if (file) fs.unlinkSync(file.path);
  }
});

// เริ่ม server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
