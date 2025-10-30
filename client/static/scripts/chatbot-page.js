// ==================== Elements ====================
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const initialState = document.getElementById('initialState');
const conversationState = document.getElementById('conversationState');
const chatContainer = document.getElementById('chatContainer');
const disclaimer = document.getElementById('disclaimer');
const shareBtn = document.getElementById('shareBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const userAvatar = document.getElementById('userAvatar');

// History Sidebar Elements
const historySidebar = document.getElementById('historySidebar');
const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
const closeHistoryBtn = document.getElementById('closeHistoryBtn');
const historyList = document.getElementById('historyList');
const historyUserInfo = document.getElementById('historyUserInfo');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const newChatBtn = document.getElementById('newChatBtn');

let isConversationStarted = false;
let currentUser = null;
let sessionHistory = []; // สำหรับ guest user (รีเฟรชแล้วหาย)
let currentChatId = null;

// ==================== Initialize ====================
(async function init() {
    loadUserSession();
    await loadChatHistory();
    updateHistoryUserInfo();
})();

// ==================== User Session Management ====================
function loadUserSession() {
    const userData = localStorage.getItem('userData');
    
    console.log('🔍 Checking localStorage for userData...', userData);
    
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            console.log('✅ User logged in successfully:', currentUser);
        } catch (error) {
            console.error('❌ Error parsing userData from localStorage:', error);
            localStorage.removeItem('userData'); // ลบข้อมูลที่เสีย
        }
    } else {
        console.log('⚠️ No userData found - Guest mode activated');
    }
}

function updateHistoryUserInfo() {
    if (currentUser) {
        historyUserInfo.innerHTML = `
            <div class="user-status logged-in">
                <i class="fa-solid fa-circle-check"></i>
                <span>Logged in as <strong>${currentUser.username}</strong></span>
            </div>
        `;
        console.log('✅ History sidebar updated for user:', currentUser.username);
    } else {
        historyUserInfo.innerHTML = `
            <div class="user-status">
                <i class="fa-solid fa-circle-info"></i>
                <span>Guest Mode (History won't be saved)</span>
            </div>
        `;
        console.log('⚠️ History sidebar shows Guest Mode');
    }
}

// ==================== History Sidebar ====================
toggleHistoryBtn.addEventListener('click', () => {
    historySidebar.classList.toggle('open');
});

closeHistoryBtn.addEventListener('click', () => {
    historySidebar.classList.remove('open');
});

// ==================== Load Chat History ====================
async function loadChatHistory() {
    historyList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary);"><i class="fa-solid fa-spinner fa-spin"></i> Loading...</div>';
    
    try {
        if (currentUser && currentUser.userId) {
            console.log('🔄 Loading history from database for userId:', currentUser.userId);
            // Load from database (authenticated user)
            const response = await fetch(`/api/history/${currentUser.userId}`);
            const data = await response.json();
            
            if (data.success && data.history.length > 0) {
                console.log('✅ History loaded:', data.history.length, 'items');
                displayHistory(data.history);
            } else {
                console.log('ℹ️ No history found in database');
                showEmptyHistory();
            }
        } else {
            console.log('⚠️ Guest mode - checking session history');
            // Load from session (guest user)
            if (sessionHistory.length > 0) {
                displayHistory(sessionHistory);
            } else {
                showEmptyHistory();
            }
        }
    } catch (error) {
        console.error('❌ Error loading history:', error);
        historyList.innerHTML = '<div style="text-align: center; padding: 20px; color: #ef4444;">Failed to load history</div>';
    }
}

function displayHistory(history) {
    if (history.length === 0) {
        showEmptyHistory();
        return;
    }

    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.dataset.index = index;
        
        const prompt = item.prompt || 'Untitled Chat';
        const date = item.timestamp ? new Date(item.timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : 'Just now';
        
        historyItem.innerHTML = `
            <div class="history-item-title">${truncateText(prompt, 40)}</div>
            <div class="history-item-date">${date}</div>
        `;
        
        historyItem.addEventListener('click', () => loadConversation(item));
        historyList.appendChild(historyItem);
    });
}

function showEmptyHistory() {
    historyList.innerHTML = `
        <div class="history-empty">
            <i class="fa-solid fa-comments"></i>
            <p>No chat history yet</p>
            <p style="font-size: 12px; margin-top: 10px;">Start a conversation to see your history here</p>
        </div>
    `;
}

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// ==================== Load Previous Conversation ====================
function loadConversation(item) {
    if (!isConversationStarted) {
        switchToConversation();
    }
    
    conversationState.innerHTML = '';
    addMessage(item.prompt, true);
    addMessage(item.response, false);
    
    historySidebar.classList.remove('open');
}

// ==================== Save to History ====================
async function saveToHistory(prompt, response) {
    const historyItem = {
        prompt: prompt,
        response: response,
        timestamp: new Date().toISOString()
    };
    
    if (currentUser && currentUser.userId) {
        // Already saved by backend in /get endpoint
        console.log('✅ History saved to database');
    } else {
        // Save to session (guest)
        sessionHistory.unshift(historyItem);
        console.log('⚠️ History saved to session (Guest mode)');
    }
    
    await loadChatHistory();
}

// ==================== Clear History ====================
clearHistoryBtn.addEventListener('click', async () => {
    const confirmed = confirm('Are you sure you want to clear all chat history?');
    if (!confirmed) return;
    
    if (currentUser && currentUser.userId) {
        try {
            const response = await fetch(`/api/history/${currentUser.userId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            
            if (data.success) {
                alert('History cleared successfully!');
                await loadChatHistory();
            } else {
                alert('Failed to clear history');
            }
        } catch (error) {
            console.error('Error clearing history:', error);
            alert('Error clearing history');
        }
    } else {
        sessionHistory = [];
        await loadChatHistory();
        alert('Session history cleared!');
    }
});

// ==================== New Chat ====================
newChatBtn.addEventListener('click', () => {
    location.reload();
});

// ==================== Helper Functions ====================
function switchToConversation() {
    if (isConversationStarted) return;
    isConversationStarted = true;

    initialState.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    initialState.style.opacity = '0';
    initialState.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        initialState.style.display = 'none';
        conversationState.style.display = 'flex';
        conversationState.style.opacity = '0';

        setTimeout(() => {
            conversationState.style.transition = 'opacity 0.3s ease';
            conversationState.style.opacity = '1';
        }, 50);

        disclaimer.classList.add('show');
        shareBtn.style.display = 'block';

        chatContainer.style.justifyContent = 'flex-start';
        chatContainer.style.paddingTop = '20px';
    }, 300);
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');

    if (isUser) {
        messageDiv.className = 'message-container';
        messageDiv.innerHTML = `<div class="user-message">${text}</div>`;
    } else {
        messageDiv.className = 'ai-response-container';
        messageDiv.innerHTML = `
            <div class="ai-message">${text}</div>
            <div class="message-actions">
                <button class="message-btn" title="Copy"><i class="fa-solid fa-copy"></i></button>
                <button class="message-btn" title="Like"><i class="fa-solid fa-thumbs-up"></i></button>
                <button class="message-btn" title="Dislike"><i class="fa-solid fa-thumbs-down"></i></button>
                <button class="message-btn" title="Share"><i class="fa-solid fa-arrow-up-from-bracket"></i></button>
                <button class="message-btn" title="Regenerate"><i class="fa-solid fa-rotate"></i></button>
            </div>
        `;
    }

    conversationState.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <span>PHYSSi is typing</span>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    conversationState.appendChild(typingDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.remove();
}

// ==================== Send Message to AI ====================
async function getAIResponseFromServer(message) {
    try {
        const formData = new FormData();
        formData.append('msg', message);
        
        if (currentUser && currentUser.userId) {
            formData.append('userId', currentUser.userId);
            console.log('📤 Sending message with userId:', currentUser.userId);
        } else {
            console.log('📤 Sending message as guest');
        }

        const response = await fetch('/get', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('AI server error');

        const text = await response.text();
        console.log('✅ AI response received');
        return text;
    } catch (err) {
        console.error('❌ Error getting AI response:', err);
        return "Sorry, something went wrong. Please try again.";
    }
}

// ==================== Message Handling ====================
async function processMessage(message) {
    addMessage(message, true);
    chatInput.value = '';

    showTypingIndicator();

    const aiResponse = await getAIResponseFromServer(message);

    removeTypingIndicator();
    addMessage(aiResponse, false);
    
    // Save to history
    await saveToHistory(message, aiResponse);
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    if (!isConversationStarted) {
        switchToConversation();
        setTimeout(() => processMessage(message), 350);
    } else {
        processMessage(message);
    }
}

// ==================== Event Listeners ====================
sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

// Dark Mode Toggle
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkModeBtn.innerHTML = isDark
        ? '<span><i class="fa-solid fa-sun"></i></span>Light Mode'
        : '<span><i class="fa-solid fa-moon"></i></span>Dark Mode';
});

// Message Actions
document.addEventListener('click', e => {
    if (e.target.closest('.message-btn')) {
        const btn = e.target.closest('.message-btn');
        const title = btn.getAttribute('title');
        const aiMessage = btn.closest('.ai-response-container').querySelector('.ai-message');
        
        switch (title) {
            case 'Copy': 
                navigator.clipboard.writeText(aiMessage.innerText);
                btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fa-solid fa-copy"></i>';
                }, 2000);
                break;
            case 'Like': 
                btn.style.color = btn.style.color === 'rgb(34, 197, 94)' ? '' : '#22c55e';
                break;
            case 'Dislike': 
                btn.style.color = btn.style.color === 'rgb(239, 68, 68)' ? '' : '#ef4444';
                break;
            case 'Share': 
                alert('Sharing feature coming soon!');
                break;
            case 'Regenerate': 
                alert('Regenerate feature coming soon!');
                break;
        }
    }
});

// User Avatar Click (Go to Profile or Login)
userAvatar.addEventListener('click', () => {
    if (currentUser) {
        // แสดงข้อมูลผู้ใช้และเสนอตัวเลือก logout
        const message = `Logged in as: ${currentUser.username}\n\nWould you like to logout?`;
        if (confirm(message)) {
            localStorage.removeItem('userData');
            window.location.href = '/login.html';
        }
    } else {
        if (confirm('You are in guest mode. Would you like to login to save your chat history?')) {
            window.location.href = '/login.html';
        }
    }
});

// Auto-focus Input
chatInput.focus();

// ==================== Debug Info (สามารถลบออกได้เมื่อเสร็จ) ====================
console.log('='.repeat(50));
console.log('🚀 PHYSSi Chatbot Initialized');
console.log('User Status:', currentUser ? `Logged in as ${currentUser.username}` : 'Guest Mode');
console.log('='.repeat(50));