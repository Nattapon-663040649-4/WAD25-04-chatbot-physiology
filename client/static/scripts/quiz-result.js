// ==================== Elements ====================
const scoreValue = document.getElementById('scoreValue');
const scoreIcon = document.getElementById('scoreIcon');
const scoreMessage = document.getElementById('scoreMessage');
const correctCount = document.getElementById('correctCount');
const incorrectCount = document.getElementById('incorrectCount');
const timeSpent = document.getElementById('timeSpent');
const questionsList = document.getElementById('questionsList');
const filterButtons = document.querySelectorAll('.filter-btn');
const confettiCanvas = document.getElementById('confetti');

// ==================== State Variables ====================
let quizResult = null;

// ==================== Initialize ====================
(async function init() {
    // Load quiz result from sessionStorage
    const quizResultStr = sessionStorage.getItem('quizResult');

    if (!quizResultStr) {
        alert('No quiz result found. Redirecting to quiz selection...');
        window.location.href = '/quiz-select.html';
        return;
    }

    quizResult = JSON.parse(quizResultStr);
    console.log('📊 Quiz Result:', quizResult);

    // Display results
    displayScore();
    displayAnswerReview();

    // Save result to database
    await saveResultToDatabase();

    // Celebrate if score is good
    if (quizResult.score >= 80) {
        celebrateWithConfetti();
    }
})();

// ==================== Save Result to Database ====================
async function saveResultToDatabase() {
    // Get user data
    const userDataStr = localStorage.getItem('userData');
    
    if (!userDataStr) {
        console.log('⚠️ No user logged in - result not saved');
        return;
    }
    
    try {
        const userData = JSON.parse(userDataStr);
        const userId = userData.userId;
        
        // Get quiz config
        const quizConfigStr = sessionStorage.getItem('quizConfig');
        const quizConfig = quizConfigStr ? JSON.parse(quizConfigStr) : {};
        
        // Prepare result data with questions
        const resultData = {
            userId: userId,
            result: {
                topic: quizConfig.topic || 'unknown',
                difficulty: quizConfig.difficulty || 'medium',
                score: quizResult.score,
                totalQuestions: quizResult.totalQuestions,
                questions: quizResult.answers || [] // ส่ง questions พร้อม subtopic
            }
        };
        
        console.log('💾 Saving quiz result:', resultData);
        
        const response = await fetch('/api/quiz/save-result', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resultData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('✅ Quiz result saved successfully');
        } else {
            console.error('❌ Failed to save quiz result:', data.message);
        }
    } catch (error) {
        console.error('❌ Error saving quiz result:', error);
    }
}

// ==================== Display Score ====================
function displayScore() {
    // Animate score counting
    animateValue(scoreValue, 0, Math.round(quizResult.score), 1500);

    // Update counts
    correctCount.textContent = quizResult.correctAnswers;
    incorrectCount.textContent = quizResult.totalQuestions - quizResult.correctAnswers;

    // Format time
    const minutes = Math.floor(quizResult.timeSpent / 60);
    const seconds = quizResult.timeSpent % 60;
    timeSpent.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;

    // Set icon and message based on score
    if (quizResult.score >= 90) {
        scoreIcon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
        scoreIcon.className = 'score-icon gold';
        scoreMessage.textContent = 'Outstanding! You\'re a master! 🏆';
    } else if (quizResult.score >= 80) {
        scoreIcon.innerHTML = '<i class="fa-solid fa-star"></i>';
        scoreIcon.className = 'score-icon green';
        scoreMessage.textContent = 'Excellent work! Keep it up! ⭐';
    } else if (quizResult.score >= 70) {
        scoreIcon.innerHTML = '<i class="fa-solid fa-face-smile"></i>';
        scoreIcon.className = 'score-icon orange';
        scoreMessage.textContent = 'Good job! Room for improvement! 😊';
    } else if (quizResult.score >= 50) {
        scoreIcon.innerHTML = '<i class="fa-solid fa-face-meh"></i>';
        scoreIcon.className = 'score-icon orange';
        scoreMessage.textContent = 'Not bad, but you can do better! 💪';
    } else {
        scoreIcon.innerHTML = '<i class="fa-solid fa-face-frown"></i>';
        scoreIcon.className = 'score-icon red';
        scoreMessage.textContent = 'Keep practicing, you\'ll improve! 📚';
    }
}

// ==================== Animate Number Counting ====================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ==================== Display Answer Review ====================
function displayAnswerReview() {
    questionsList.innerHTML = '';

    quizResult.answers.forEach((result, index) => {
        const isCorrect = result.isCorrect;
        const userAnswerIndex = result.userAnswer;
        const correctAnswerIndex = result.correctAnswer;

        const card = document.createElement('div');
        card.className = `question-review-card ${isCorrect ? 'correct' : 'incorrect'}`;
        card.dataset.status = isCorrect ? 'correct' : 'incorrect';

        card.innerHTML = `
            <div class="review-question-header">
                <div class="review-question-number">${index + 1}</div>
                <div class="review-question-text">
                    <h3>${result.question}</h3>
                    ${result.subtopic ? `<span class="review-subtopic"><i class="fa-solid fa-tag"></i> ${result.subtopic}</span>` : ''}
                </div>
                <div class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                    <i class="fa-solid fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                    ${isCorrect ? 'Correct' : 'Incorrect'}
                </div>
            </div>

            <div class="review-options">
                ${result.options.map((option, i) => {
                    let optionClass = '';
                    let label = '';

                    if (i === correctAnswerIndex && i === userAnswerIndex) {
                        // User selected correct answer
                        optionClass = 'user-correct';
                        label = '<span class="review-option-label">Your Answer ✓</span>';
                    } else if (i === userAnswerIndex) {
                        // User selected wrong answer
                        optionClass = 'user-answer';
                        label = '<span class="review-option-label">Your Answer ✗</span>';
                    } else if (i === correctAnswerIndex) {
                        // Show correct answer
                        optionClass = 'correct-answer';
                        label = '<span class="review-option-label">Correct Answer ✓</span>';
                    }

                    return `
                        <div class="review-option ${optionClass}">
                            <div class="review-option-letter">${String.fromCharCode(65 + i)}</div>
                            <div class="review-option-text">${option}</div>
                            ${label}
                        </div>
                    `;
                }).join('')}
            </div>

            ${result.explanation ? `
                <div class="review-explanation">
                    <h4><i class="fa-solid fa-lightbulb"></i> Explanation</h4>
                    <p>${result.explanation}</p>
                </div>
            ` : ''}
        `;

        questionsList.appendChild(card);
    });
}

// ==================== Filter Questions ====================
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('.question-review-card');

        cards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else if (filter === 'correct') {
                card.classList.toggle('hidden', card.dataset.status !== 'correct');
            } else if (filter === 'incorrect') {
                card.classList.toggle('hidden', card.dataset.status !== 'incorrect');
            }
        });
    });
});

// ==================== Confetti Animation ====================
function celebrateWithConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 150;
    const colors = ['#4A9782', '#DCD0A8', '#fbbf24', '#22c55e', '#3b82f6', '#ef4444'];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        for (let i = 0; i < confetti.length; i++) {
            const c = confetti[i];
            ctx.beginPath();
            ctx.lineWidth = c.r / 2;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + (c.r / 4), c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + (c.r / 4));
            ctx.stroke();
        }

        update();
    }

    function update() {
        for (let i = 0; i < confetti.length; i++) {
            const c = confetti[i];
            c.tiltAngle += c.tiltAngleIncremental;
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.x += Math.sin(c.d);
            c.tilt = (Math.sin(c.tiltAngle - (i / 3))) * 15;

            if (c.y > confettiCanvas.height) {
                confetti[i] = {
                    x: Math.random() * confettiCanvas.width,
                    y: -20,
                    r: c.r,
                    d: c.d,
                    color: c.color,
                    tilt: c.tilt,
                    tiltAngleIncremental: c.tiltAngleIncremental,
                    tiltAngle: c.tiltAngle
                };
            }
        }
    }

    let animationId;
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Stop confetti after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }, 5000);
}

// ==================== Resize Handler ====================
window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// ==================== Print Results ====================
function printResults() {
    window.print();
}

// ==================== Share Results (Future feature) ====================
function shareResults() {
    const text = `I scored ${Math.round(quizResult.score)}% on PHYSSi Quiz! 🎉`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Quiz Result',
            text: text,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('Sharing is not supported on this browser');
    }
}