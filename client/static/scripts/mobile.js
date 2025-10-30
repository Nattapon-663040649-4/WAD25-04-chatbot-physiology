// ==================== Mobile Navigation Script ====================
// Add this script to ALL pages (chatbot, quiz, profile, learning, etc.)

(function initMobileNav() {
    // Wait for DOM to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupMobileNav);
    } else {
        setupMobileNav();
    }
})();

function setupMobileNav() {
    console.log('🔧 Setting up mobile navigation...');
    
    // Find the navigation container
    const navContainer = document.querySelector('.nav-container');
    const leftHeader = document.querySelector('.left-side-header');
    
    if (!navContainer || !leftHeader) {
        console.log('⚠️ Nav container not found');
        return;
    }
    
    // Create mobile menu button if it doesn't exist
    let mobileBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileBtn) {
        mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        mobileBtn.setAttribute('aria-label', 'Toggle menu');
        
        // Insert after logo
        const logo = leftHeader.querySelector('.logo');
        if (logo) {
            logo.insertAdjacentElement('afterend', mobileBtn);
        } else {
            leftHeader.appendChild(mobileBtn);
        }
    }
    
    // Create mobile menu if it doesn't exist
    let mobileMenu = document.querySelector('.mobile-nav-menu');
    if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-nav-menu';
        
        // Get current page to mark as active
        const currentPath = window.location.pathname;
        
        // Menu items
        const menuItems = [
            { href: '/', icon: 'fa-house', text: 'Home', path: '/' },
            { href: '/chatbot.html', icon: 'fa-comments', text: 'Chatbot', path: '/chatbot.html' },
            { href: '/quiz-select.html', icon: 'fa-clipboard-question', text: 'Quiz', path: '/quiz-select.html' },
            { href: '/learning.html', icon: 'fa-book', text: 'Learning', path: '/learning.html' },
            { href: '/profile.html', icon: 'fa-user', text: 'Profile', path: '/profile.html' }
        ];
        
        // Build menu HTML
        menuItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.innerHTML = `<i class="fa-solid ${item.icon}"></i> ${item.text}`;
            
            // Mark active page
            if (currentPath === item.path || 
                (currentPath === '/index.html' && item.path === '/') ||
                (currentPath.includes('quiz') && item.path === '/quiz-select.html')) {
                link.classList.add('active');
            }
            
            mobileMenu.appendChild(link);
        });
        
        // Insert menu after header
        const header = document.querySelector('.header');
        if (header) {
            header.appendChild(mobileMenu);
        }
    }
    
    // Toggle menu on button click
    mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileBtn.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-bars';
            }
        }
    });
    
    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileBtn.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-bars';
            }
        });
    });
    
    console.log('✅ Mobile navigation ready');
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { setupMobileNav };
}