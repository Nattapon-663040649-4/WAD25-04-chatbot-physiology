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

        // Sample AI responses for physiology questions
        const physiologyResponses = {
            "what is physiology": "Physiology is the branch of biology that deals with the normal functions of living organisms and their parts. It studies how organs, organ systems, organisms, and cells carry out chemical and physical functions.",
            "where is my heart": "Your heart is located in your chest cavity, slightly left of center, between your lungs. It sits in a space called the mediastinum, protected by your rib cage.",
            "how does the heart work": "The heart works as a muscular pump with four chambers. It contracts rhythmically to pump blood through two circuits: pulmonary (to the lungs) and systemic (to the rest of the body).",
            "what is blood pressure": "Blood pressure is the force exerted by circulating blood against the walls of blood vessels. It's measured as systolic pressure (during heartbeat) over diastolic pressure (between beats).",
            "default": "Answer: I don't know what you question, get off form da here."
        };

        function switchToConversation() {
            if (isConversationStarted) return;
            
            isConversationStarted = true;
            
            // Hide initial state with animation
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
                
                // Show disclaimer and additional header buttons
                disclaimer.classList.add('show');
                shareBtn.style.display = 'block';
                shareBtn.nextElementSibling.style.display = 'block';
                
                // Adjust chat container
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
                        <button class="message-btn" title="Copy">
                            <i class="fa-solid fa-copy"></i>
                        </button>
                        <button class="message-btn" title="Like">
                            <i class="fa-solid fa-thumbs-up"></i>
                        </button>
                        <button class="message-btn" title="Dislike">
                            <i class="fa-solid fa-thumbs-down"></i></i>
                        </button>
                        <button class="message-btn" title="Share">
                            <i class="fa-solid fa-arrow-up-from-bracket"></i>
                        </button>
                        <button class="message-btn" title="Regenerate">
                            <i class="fa-solid fa-rotate"></i>
                        </button>
                        <button class="message-btn" title="More">
                            <i class="fa-solid fa-ellipsis">
                        </i></button>
                    </div>
                `;
            }
            
            conversationState.appendChild(messageDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.innerHTML = `
                <span>PHYSSi is typing</span>
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            `;
            typingDiv.id = 'typingIndicator';
            conversationState.appendChild(typingDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typingIndicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        function getAIResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            for (const [key, response] of Object.entries(physiologyResponses)) {
                if (key !== 'default' && lowerMessage.includes(key)) {
                    return response;
                }
            }
            
            return physiologyResponses.default;
        }

        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Switch to conversation mode if not already
            if (!isConversationStarted) {
                switchToConversation();
                
                // Wait for animation to complete
                setTimeout(() => {
                    processMessage(message);
                }, 350);
            } else {
                processMessage(message);
            }
        }

        function processMessage(message) {
            // Add user message
            addMessage(message, true);
            chatInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Simulate AI response delay
            setTimeout(() => {
                removeTypingIndicator();
                const response = getAIResponse(message);
                addMessage(response, false);
            }, 1500);
        }

        // Event listeners
        sendBtn.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Quiz generator button
        document.getElementById('quizBtn').addEventListener('click', () => {
            alert('Opening Quiz Generator...');
        });

        // Dark mode toggle
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const isDark = document.body.classList.contains('dark');
            darkModeBtn.innerHTML = isDark ? '<span><i class="fa-solid fa-sun"></i></span>Light Mode' : '<span><i class="fa-solid fa-moon"></i></span>Dark Mode';
        });

        // Message action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('message-btn')) {
                const title = e.target.getAttribute('title');
                switch(title) {
                    case 'Copy':
                        alert('Message copied to clipboard!');
                        break;
                    case 'Like':
                        e.target.style.color = '#22c55e';
                        break;
                    case 'Dislike':
                        e.target.style.color = '#ef4444';
                        break;
                    case 'Share':
                        alert('Sharing message...');
                        break;
                    case 'Regenerate':
                        alert('Regenerating response...');
                        break;
                    case 'More':
                        alert('More options...');
                        break;
                }
            }
        });

        // Sidebar interactions
        document.querySelectorAll('.sidebar-icon').forEach((icon, index) => {
            icon.addEventListener('click', () => {
                document.querySelectorAll('.sidebar-icon').forEach(i => i.classList.remove('active'));
                icon.classList.add('active');
                
                if (index === 0) { // New chat
                    location.reload();
                }
            });
        });

        // Auto-focus input
        chatInput.focus();