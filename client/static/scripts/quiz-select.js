// ==================== Elements ====================
const quizForm = document.getElementById('quizForm');
const numQuestionsInput = document.getElementById('numQuestions');
const questionCountDisplay = document.getElementById('questionCount');
const loadingOverlay = document.getElementById('loadingOverlay');
const startQuizBtn = document.getElementById('startQuizBtn');

// Topic cards click handling
const topicCards = document.querySelectorAll('.topic-card');
topicCards.forEach(card => {
    card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});

// Difficulty cards click handling
const difficultyCards = document.querySelectorAll('.difficulty-card');
difficultyCards.forEach(card => {
    card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});

// Language cards click handling
const languageCards = document.querySelectorAll('.language-card');
languageCards.forEach(card => {
    card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});

// ==================== Update Question Count Display ====================
numQuestionsInput.addEventListener('input', (e) => {
    questionCountDisplay.textContent = e.target.value;
});

// ==================== Form Submission ====================
quizForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(quizForm);
    const topic = formData.get('topic');
    const numQuestions = parseInt(formData.get('numQuestions'));
    const difficulty = formData.get('difficulty');
    const language = formData.get('language');

    // Validate
    if (!topic || !difficulty || !language) {
        alert('Please complete all selections!');
        return;
    }

    console.log('📝 Quiz Configuration:', { topic, numQuestions, difficulty, language });

    // Show loading
    loadingOverlay.classList.add('show');
    startQuizBtn.disabled = true;

    try {
        // Send request to backend to generate quiz
        const response = await fetch('/api/quiz/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: topic,
                numQuestions: numQuestions,
                difficulty: difficulty,
                language: language
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log('✅ Quiz generated successfully!');
            
            // Store quiz data in sessionStorage
            sessionStorage.setItem('quizData', JSON.stringify(data.quiz));
            sessionStorage.setItem('quizConfig', JSON.stringify({ topic, numQuestions, difficulty, language }));

            // Redirect to quiz question page
            window.location.href = '/quiz-question.html';
        } else {
            throw new Error(data.message || 'Failed to generate quiz');
        }
    } catch (error) {
        console.error('❌ Error generating quiz:', error);
        alert('Failed to generate quiz. Please try again.');
        loadingOverlay.classList.remove('show');
        startQuizBtn.disabled = false;
    }
});

// ==================== Check Login Status ====================
(function checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (userData) {
        try {
            const user = JSON.parse(userData);
            authButtons.innerHTML = `
                <a href="/profile.html" class="btn-login">
                    <i class="fa-solid fa-user"></i> ${user.username}
                </a>
                <a href="#" class="btn-started" onclick="logout(); return false;">
                    <i class="fa-solid fa-right-from-bracket"></i> Logout
                </a>
            `;
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
})();

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.reload();
    }
}