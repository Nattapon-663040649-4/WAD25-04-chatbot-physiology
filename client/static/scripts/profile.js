// ==================== Global Variables ====================
let currentUser = null;
let quizData = [];

// ==================== Initialize ====================
(async function init() {
    console.log('🚀 Profile page loading...');
    
    // Load user from localStorage
    loadUser();
    
    if (!currentUser) {
        console.log('❌ No user found, redirecting to login...');
        window.location.href = '/login.html';
        return;
    }
    
    console.log('✅ User loaded:', currentUser.username);
    
    // Display user info
    displayUserInfo();
    
    // Load quiz data
    await loadQuizData();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('✅ Profile page initialized');
})();

// ==================== Load User ====================
function loadUser() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
        } catch (e) {
            console.error('Error parsing user data:', e);
        }
    }
}

// ==================== Display User Info ====================
function displayUserInfo() {
    document.getElementById('username').textContent = currentUser.username;
    document.getElementById('email').textContent = currentUser.email || 'No email provided';
}

// ==================== Load Quiz Data ====================
async function loadQuizData() {
    console.log('📊 Loading quiz data...');
    
    try {
        const response = await fetch(`/api/quiz/results/${currentUser.userId}`);
        const data = await response.json();
        
        console.log('API Response:', data);
        
        if (data.success && data.results && data.results.length > 0) {
            quizData = data.results;
            console.log('✅ Loaded', quizData.length, 'quizzes');
            console.log('Quiz data:', quizData);
            
            // Process and display data
            processQuizData();
        } else {
            console.log('⚠️ No quiz data found');
            showEmptyStates();
        }
    } catch (error) {
        console.error('❌ Error loading quiz data:', error);
        showEmptyStates();
    }
}

// ==================== Process Quiz Data ====================
function processQuizData() {
    console.log('🔄 Processing quiz data...');
    
    // Calculate overall stats
    const totalQuizzes = quizData.length;
    const totalScore = quizData.reduce((sum, q) => sum + (q.score || 0), 0);
    const avgScore = Math.round(totalScore / totalQuizzes);
    const bestScore = Math.max(...quizData.map(q => q.score || 0));
    
    // Update overall stats
    document.getElementById('totalQuizzes').textContent = totalQuizzes;
    document.getElementById('avgScore').textContent = avgScore + '%';
    document.getElementById('bestScore').textContent = bestScore + '%';
    
    // Separate by topic
    const heartQuizzes = quizData.filter(q => q.topic === 'heart');
    const brainQuizzes = quizData.filter(q => q.topic === 'brain');
    
    console.log('Heart quizzes:', heartQuizzes.length);
    console.log('Brain quizzes:', brainQuizzes.length);
    
    // Update topic stats
    updateTopicStats('heart', heartQuizzes);
    updateTopicStats('brain', brainQuizzes);
    
    // Analyze subtopics
    analyzeSubtopics('heart', heartQuizzes);
    analyzeSubtopics('brain', brainQuizzes);
}

// ==================== Update Topic Stats ====================
function updateTopicStats(topic, quizzes) {
    const count = quizzes.length;
    
    if (count === 0) {
        document.getElementById(`${topic}Quizzes`).textContent = '0';
        document.getElementById(`${topic}Score`).textContent = '0%';
        document.getElementById(`${topic}Best`).textContent = '0%';
        document.getElementById(`${topic}Progress`).style.width = '0%';
        return;
    }
    
    const totalScore = quizzes.reduce((sum, q) => sum + (q.score || 0), 0);
    const avgScore = Math.round(totalScore / count);
    const bestScore = Math.max(...quizzes.map(q => q.score || 0));
    
    document.getElementById(`${topic}Quizzes`).textContent = count;
    document.getElementById(`${topic}Score`).textContent = avgScore + '%';
    document.getElementById(`${topic}Best`).textContent = bestScore + '%';
    document.getElementById(`${topic}Progress`).style.width = avgScore + '%';
    
    console.log(`${topic} stats:`, { count, avgScore, bestScore });
}

// ==================== Analyze Subtopics ====================
function analyzeSubtopics(topic, quizzes) {
    console.log(`🔬 Analyzing ${topic} subtopics...`);
    
    if (quizzes.length === 0) {
        return;
    }
    
    const subtopicStats = {};
    
    quizzes.forEach(quiz => {
        if (quiz.questions && Array.isArray(quiz.questions) && quiz.questions.length > 0) {
            quiz.questions.forEach(q => {
                const subtopic = q.subtopic || 'Other';
                
                if (!subtopicStats[subtopic]) {
                    subtopicStats[subtopic] = {
                        total: 0,
                        correct: 0
                    };
                }
                
                subtopicStats[subtopic].total++;
                if (q.userAnswer === q.correctAnswer) {
                    subtopicStats[subtopic].correct++;
                }
            });
        }
    });
    
    console.log(`${topic} subtopic stats:`, subtopicStats);
    
    // Display subtopics
    displaySubtopics(topic, subtopicStats);
}

// ==================== Display Subtopics ====================
function displaySubtopics(topic, stats) {
    const container = document.getElementById(`${topic}Subtopics`);
    
    if (Object.keys(stats).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa-solid fa-clipboard-question"></i>
                <p>No detailed data available yet</p>
                <p style="font-size: 14px; margin-top: 10px;">
                    The quiz you took might not have subtopic information.
                </p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    // Sort by percentage
    const sorted = Object.entries(stats).sort((a, b) => {
        const percentA = (a[1].correct / a[1].total) * 100;
        const percentB = (b[1].correct / b[1].total) * 100;
        return percentB - percentA;
    });
    
    sorted.forEach(([subtopic, data]) => {
        const percent = Math.round((data.correct / data.total) * 100);
        const scoreClass = percent >= 80 ? 'excellent' : percent >= 60 ? 'good' : 'poor';
        
        const item = document.createElement('div');
        item.className = 'subtopic-item';
        item.innerHTML = `
            <div>
                <div class="subtopic-name">${subtopic}</div>
                <div class="subtopic-stats">
                    ${data.correct} correct out of ${data.total} questions
                </div>
            </div>
            <div class="subtopic-score">
                <div class="score-percent ${scoreClass}">${percent}%</div>
                <div class="score-details">${data.correct}/${data.total}</div>
            </div>
        `;
        
        container.appendChild(item);
    });
}

// ==================== Show Empty States ====================
function showEmptyStates() {
    // Already have empty states in HTML
    console.log('📭 Showing empty states');
}

// ==================== Setup Event Listeners ====================
function setupEventListeners() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ==================== Logout ====================
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = '/';
    }
}

console.log('='.repeat(50));
console.log('✅ Profile script loaded');
console.log('='.repeat(50));