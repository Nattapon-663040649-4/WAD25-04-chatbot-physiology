// API Configuration
// This file defines the backend API URL

const API_CONFIG = {
    // Production Backend URL
    BACKEND_URL: 'https://wad25-04-chatbot-physiology.onrender.com',
    
    // Local Development (comment out in production)
    // BACKEND_URL: 'http://localhost:3000',
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API_CONFIG;
}