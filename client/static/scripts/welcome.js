// FAQ Toggle Functionality
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function () {
        const arrow = this.querySelector('.faq-arrow');
        arrow.style.transform = arrow.style.transform === 'rotate(180deg)' ? 'rotate(360deg)' : 'rotate(180deg)';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});