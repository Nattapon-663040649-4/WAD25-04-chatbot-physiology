// ==================== Elements ====================
const questionCard = document.getElementById('questionCard');
const topicDisplay = document.getElementById('topicDisplay');
const difficultyDisplay = document.getElementById('difficultyDisplay');
const currentQuestionDisplay = document.getElementById('currentQuestion');
const totalQuestionsDisplay = document.getElementById('totalQuestions');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const navigatorGrid = document.getElementById('navigatorGrid');
const timerDisplay = document.getElementById('timer');

// ==================== State Variables ====================
let quizData = null;
let quizConfig = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let startTime = Date.now();
let timerInterval = null;

// ==================== Initialize ====================
(function init() {
    // Load quiz data from sessionStorage
    const quizDataStr = sessionStorage.getItem('quizData');
    const quizConfigStr = sessionStorage.getItem('quizConfig');

    if (!quizDataStr || !quizConfigStr) {
        alert('No quiz data found. Redirecting to quiz selection...');
        window.location.href = '/quiz-select.html';
        return;
    }

    quizData = JSON.parse(quizDataStr);
    quizConfig = JSON.parse(quizConfigStr);

    console.log('📚 Quiz Data Loaded:', quizData);
    console.log('⚙️ Quiz Config:', quizConfig);

    // Initialize UI
    initializeUI();
    displayQuestion(0);
    startTimer();
})();

// ==================== Initialize UI ====================
function initializeUI() {
    // Set topic and difficulty display
    const topicNames = {
        heart: 'Heart (หัวใจ)',
        brain: 'Brain (สมอง)'
    };
    const difficultyNames = {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard'
    };

    topicDisplay.textContent = topicNames[quizConfig.topic] || quizConfig.topic;
    difficultyDisplay.textContent = difficultyNames[quizConfig.difficulty] || quizConfig.difficulty;
    totalQuestionsDisplay.textContent = quizData.questions.length;

    // Create question navigator buttons
    navigatorGrid.innerHTML = '';
    quizData.questions.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'nav-question-btn';
        btn.textContent = index + 1;
        btn.addEventListener('click', () => navigateToQuestion(index));
        navigatorGrid.appendChild(btn);
    });

    updateNavigator();
}

// ==================== Display Question ====================
function displayQuestion(index) {
    currentQuestionIndex = index;
    const question = quizData.questions[index];

    if (!question) {
        console.error('Question not found at index:', index);
        return;
    }

    // Update progress
    currentQuestionDisplay.textContent = index + 1;
    const progress = ((index + 1) / quizData.questions.length) * 100;
    progressBar.style.width = progress + '%';

    // Build question HTML
    questionCard.innerHTML = `
        <div class="question-header">
            <div class="question-number">${index + 1}</div>
            <div class="question-text">
                <h2>${question.question}</h2>
                ${question.subtopic ? `<div class="question-subtopic"><i class="fa-solid fa-tag"></i> ${question.subtopic}</div>` : ''}
            </div>
        </div>
        <div class="answer-options">
            ${question.options.map((option, i) => `
                <div class="answer-option ${userAnswers[index] === i ? 'selected' : ''}" data-option="${i}">
                    <div class="option-letter">${String.fromCharCode(65 + i)}</div>
                    <div class="option-text">${option}</div>
                </div>
            `).join('')}
        </div>
    `;

    // Add click handlers to options
    const options = questionCard.querySelectorAll('.answer-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const selectedOption = parseInt(option.dataset.option);
            selectAnswer(selectedOption);
        });
    });

    // Update navigation buttons
    updateNavigationButtons();
    updateNavigator();
}

// ==================== Select Answer ====================
function selectAnswer(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Update UI
    const options = questionCard.querySelectorAll('.answer-option');
    options.forEach((option, i) => {
        if (i === optionIndex) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });

    updateNavigator();
    console.log('✅ Answer selected:', { question: currentQuestionIndex + 1, answer: optionIndex });
}

// ==================== Navigation ====================
function navigateToQuestion(index) {
    if (index >= 0 && index < quizData.questions.length) {
        displayQuestion(index);
    }
}

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        displayQuestion(currentQuestionIndex - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
    }
});

submitBtn.addEventListener('click', () => {
    // Check if all questions are answered
    const unansweredCount = quizData.questions.length - Object.keys(userAnswers).length;
    
    if (unansweredCount > 0) {
        const confirmSubmit = confirm(`You have ${unansweredCount} unanswered question(s). Do you want to submit anyway?`);
        if (!confirmSubmit) return;
    }

    submitQuiz();
});

// ==================== Update Navigation Buttons ====================
function updateNavigationButtons() {
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;

    // Next/Submit button
    const isLastQuestion = currentQuestionIndex === quizData.questions.length - 1;
    
    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        submitBtn.style.display = 'none';
    }
}

// ==================== Update Navigator ====================
function updateNavigator() {
    const navButtons = navigatorGrid.querySelectorAll('.nav-question-btn');
    
    navButtons.forEach((btn, index) => {
        btn.classList.remove('current', 'answered');
        
        if (index === currentQuestionIndex) {
            btn.classList.add('current');
        } else if (userAnswers.hasOwnProperty(index)) {
            btn.classList.add('answered');
        }
    });
}

// ==================== Timer ====================
function startTimer() {
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timerDisplay.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

// ==================== Submit Quiz ====================
async function submitQuiz() {
    clearInterval(timerInterval);
    
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // Calculate score
    let correctAnswers = 0;
    const results = quizData.questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) correctAnswers++;
        
        return {
            question: question.question,
            subtopic: question.subtopic,
            options: question.options,
            userAnswer: userAnswer !== undefined ? userAnswer : -1,
            correctAnswer: question.correctAnswer,
            isCorrect: isCorrect,
            explanation: question.explanation || ''
        };
    });

    const score = (correctAnswers / quizData.questions.length) * 100;

    const quizResult = {
        topic: quizConfig.topic,
        difficulty: quizConfig.difficulty,
        totalQuestions: quizData.questions.length,
        correctAnswers: correctAnswers,
        score: score,
        timeSpent: timeSpent,
        results: results
    };

    console.log('📊 Quiz Result:', quizResult);

    // Save result to sessionStorage
    sessionStorage.setItem('quizResult', JSON.stringify(quizResult));

    // Save to database if user is logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            await fetch('/api/quiz/save-result', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.userId,
                    result: quizResult
                })
            });
            console.log('✅ Result saved to database');
        } catch (error) {
            console.error('❌ Error saving result:', error);
        }
    }

    // Redirect to result page
    window.location.href = '/quiz-result.html';
}

// ==================== Prevent Accidental Exit ====================
window.addEventListener('beforeunload', (e) => {
    if (Object.keys(userAnswers).length > 0) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        displayQuestion(currentQuestionIndex - 1);
    } else if (e.key === 'ArrowRight' && currentQuestionIndex < quizData.questions.length - 1) {
        displayQuestion(currentQuestionIndex + 1);
    } else if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        if (optionIndex < quizData.questions[currentQuestionIndex].options.length) {
            selectAnswer(optionIndex);
        }
    }
});