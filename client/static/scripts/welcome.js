// Accessible FAQ accordion with dynamic height animation
(function () {
    const items = Array.from(document.querySelectorAll('.faq-item'));

    function closeAllExcept(except) {
        items.forEach(i => {
            if (i === except) return;
            if (i.classList.contains('open')) {
                toggleItem(i, false);
            }
        });
    }

    function toggleItem(item, forceOpen) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !item.classList.contains('open');

        if (isOpen) {
            // open
            item.classList.add('open');
            question.setAttribute('aria-expanded', 'true');
            answer.setAttribute('aria-hidden', 'false');
            // set max-height to content height for smooth animation
            answer.style.maxHeight = answer.scrollHeight + 'px';
            // after transition, remove max-height to allow flexible content (optional)
            const onEnd = function () {
                answer.style.maxHeight = 'none';
                answer.removeEventListener('transitionend', onEnd);
            };
            answer.addEventListener('transitionend', onEnd);
        } else {
            // close
            // set explicit max-height from current height to trigger transition
            const prev = answer.scrollHeight;
            answer.style.maxHeight = prev + 'px';
            // force reflow
            void answer.offsetHeight;
            item.classList.remove('open');
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            // then set to 0 to animate
            requestAnimationFrame(() => {
                answer.style.maxHeight = '0px';
            });
        }
    }

    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        // ensure initial closed state
        item.classList.remove('open');
        question.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        answer.style.maxHeight = '0px';

        question.addEventListener('click', (e) => {
            const willOpen = !item.classList.contains('open');
            toggleItem(item, willOpen);
            // simple accordion: close others when opening
            if (willOpen) closeAllExcept(item);
        });

        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
})();

// Smooth scrolling for navigation links (keeps existing behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
// Article cards are static now — no JS required.

// Article cards: inline collapsible answer (FAQ-style)
(function () {
    const cards = Array.from(document.querySelectorAll('.articles-section .article-card'));
    if (!cards.length) return;

    function closeAllExcept(except) {
        cards.forEach(c => {
            if (c === except) return;
            if (c.classList.contains('open')) {
                toggleCard(c, false);
            }
        });
    }

    function toggleCard(card, forceOpen) {
        const img = card.querySelector('.article-image-wrap');
        const answer = card.querySelector('.article-answer');
        if (!img || !answer) return;

        const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !card.classList.contains('open');

        if (isOpen) {
            // open
            card.classList.add('open');
            img.setAttribute('aria-expanded', 'true');
            answer.setAttribute('aria-hidden', 'false');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            const onEnd = function () {
                answer.style.maxHeight = 'none';
                answer.removeEventListener('transitionend', onEnd);
            };
            answer.addEventListener('transitionend', onEnd);
        } else {
            // close
            const prev = answer.scrollHeight;
            answer.style.maxHeight = prev +'px';
            void answer.offsetHeight; // force reflow
            card.classList.remove('open');
            img.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            requestAnimationFrame(() => {
                answer.style.maxHeight = '0px';
            });
        }
    }

    cards.forEach(card => {
        const img = card.querySelector('.article-image-wrap');
        const answer = card.querySelector('.article-answer');
        if (!img || !answer) return;

        // initial closed state
        card.classList.remove('open');
        img.setAttribute('aria-expanded', 'false');
        answer.setAttribute('aria-hidden', 'true');
        answer.style.maxHeight = '0px';

        img.addEventListener('click', (e) => {
            const willOpen = !card.classList.contains('open');
            toggleCard(card, willOpen);
            if (willOpen) closeAllExcept(card);
        });

        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const willOpen = !card.classList.contains('open');
                toggleCard(card, willOpen);
                if (willOpen) closeAllExcept(card);
            }
        });
    });
})();