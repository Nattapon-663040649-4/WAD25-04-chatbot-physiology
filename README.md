# 🤖 Physsi - AI Chatbot for Physiology Education

Interactive web application helping high school students learn physiology through AI-powered conversations, adaptive quizzes, and interactive diagrams.

## 📋 Overview

Physsi is an educational platform designed for high school students (Grades 10-12) to learn human physiology in an engaging and personalized way. The platform combines AI chatbot technology with interactive learning tools.

## ✨ Key Features

- **AI-Powered Chatbot** - Ask questions and get instant explanations about physiology topics
- **Adaptive Quiz System** - Customizable difficulty levels (Easy, Medium, Hard)
- **Interactive Diagrams** - Visual learning with clickable anatomy diagrams
- **Progress Tracking** - Track learning history and quiz performance
- **User Authentication** - Secure login and personalized experience

## 🛠 Technologies

**Frontend:**
- HTML5, CSS3, JavaScript

**Backend:**
- Node.js
- Express.js
- MongoDB (Database)

**APIs:**
- OpenAI API (for chatbot responses)

## 🚀 Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/physsi-chatbot.git
   cd physsi-chatbot
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   Create a `.env` file:
```
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
```

4. **Run the application**
```bash
   npm start
```

5. **Access the app**
```
   http://localhost:3000
```

## 📁 Project Structure
```
physsi-chatbot/
├── server.js              # Main server file
├── routes/                # API routes
├── models/                # MongoDB schemas
├── public/                # Frontend files
│   ├── index.html
│   ├── css/
│   └── js/
└── package.json
```

## 🎯 Main Features

### 1. AI Chatbot
- Natural language processing for physiology questions
- Context-aware responses
- Conversation history saved per user

### 2. Quiz System
- Multiple difficulty levels
- Auto-generated questions
- Instant feedback
- Score tracking

### 3. Interactive Learning
- Clickable anatomy diagrams
- Detailed explanations
- Visual learning aids

### 4. User Dashboard
- View chat history
- Track quiz scores
- Monitor learning progress

## 🔧 API Endpoints
```
POST   /api/chat          # Send message to chatbot
GET    /api/history       # Get chat history
POST   /api/quiz          # Generate quiz
POST   /api/quiz/submit   # Submit quiz answers
GET    /api/user/progress # Get user progress
```

## 📚 Content Coverage

- Cardiovascular System
- Respiratory System
- Nervous System
- Digestive System
- And more...

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 👥 Team

**Team Size:** 2 members

**Roles:**
- Team Lead & Full-stack Developer
- Frontend Developer

## 📄 License

MIT License

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- MongoDB for database
- Express.js community

## 📞 Contact

**Live Demo:** [https://wad25-04-chatbot-physiology.onrender.com](https://wad25-04-chatbot-physiology.onrender.com)

---

**Made for Web Application Development Course 2025**
