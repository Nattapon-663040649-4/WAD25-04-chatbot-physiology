 // Elements
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const initialState = document.getElementById('initialState');
const conversationState = document.getElementById('conversationState');
const chatContainer = document.getElementById('chatContainer');
const disclaimer = document.getElementById('disclaimer');
const shareBtn = document.getElementById('shareBtn');
const darkModeBtn = document.getElementById('darkModeBtn');

let isConversationStarted = false;

// -------------------- Helper functions -------------------- //

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
        shareBtn.nextElementSibling.style.display = 'block';

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
                <button class="message-btn" title="More"><i class="fa-solid fa-ellipsis"></i></button>
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

// -------------------- Send message to AI -------------------- //
async function getAIResponseFromServer(message) {
    try {
        const formData = new FormData();
        formData.append('msg', message);

        const response = await fetch('/get', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('AI server error');

        const text = await response.text();
        return text;
    } catch (err) {
        console.error(err);
        return "Sorry, something went wrong. Please try again.";
    }
}

// -------------------- Message handling -------------------- //
async function processMessage(message) {
    addMessage(message, true);
    chatInput.value = '';

    showTypingIndicator();

    const aiResponse = await getAIResponseFromServer(message);

    removeTypingIndicator();
    addMessage(aiResponse, false);
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

// -------------------- Event listeners -------------------- //
sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
});

// Dark mode toggle
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    darkModeBtn.innerHTML = isDark
        ? '<span><i class="fa-solid fa-sun"></i></span>Light Mode'
        : '<span><i class="fa-solid fa-moon"></i></span>Dark Mode';
});

// Message actions
document.addEventListener('click', e => {
    if (e.target.classList.contains('message-btn')) {
        const title = e.target.getAttribute('title');
        switch (title) {
            case 'Copy': navigator.clipboard.writeText(e.target.closest('.ai-response-container').innerText); break;
            case 'Like': e.target.style.color = '#22c55e'; break;
            case 'Dislike': e.target.style.color = '#ef4444'; break;
            case 'Share': alert('Sharing message...'); break;
            case 'Regenerate': alert('Regenerating response...'); break;
            case 'More': alert('More options...'); break;
        }
    }
});

// Sidebar interactions
document.querySelectorAll('.sidebar-icon').forEach((icon, index) => {
    icon.addEventListener('click', () => {
        document.querySelectorAll('.sidebar-icon').forEach(i => i.classList.remove('active'));
        icon.classList.add('active');

        if (index === 0) location.reload(); // New chat
    });
});

// Auto-focus input
chatInput.focus();
