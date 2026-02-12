/* ================================================
   CAROUSELIZER.AI — Main JS
   Scroll animations + form handling
   100% client-side, no server code
   ================================================ */

// --- Scroll-triggered fade-in animations ---
document.addEventListener('DOMContentLoaded', () => {

    const fadeEls = document.querySelectorAll('.fade-in, .fade-in-children');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: just show everything
        fadeEls.forEach(el => el.classList.add('visible'));
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- FAQ toggle animation ---
    document.querySelectorAll('details').forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                // Close other open details
                document.querySelectorAll('details[open]').forEach(other => {
                    if (other !== detail) other.removeAttribute('open');
                });
            }
        });
    });

    // --- Nav background on scroll ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                nav.style.background = 'rgba(12, 17, 23, 0.95)';
            } else {
                nav.style.background = 'rgba(12, 17, 23, 0.85)';
            }
        }, { passive: true });
    }

    // --- Carousel horizontal drag scroll ---
    const carousel = document.querySelector('.carousel-demo');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1.5;
            carousel.scrollLeft = scrollLeft - walk;
        });

        carousel.style.cursor = 'grab';
    }

    // --- Animate stat numbers on scroll ---
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statObserver.observe(el));
    }
});

function animateValue(el) {
    const finalText = el.textContent;
    const match = finalText.match(/([\d.]+)/);
    if (!match) return;

    const finalNum = parseFloat(match[1]);
    const suffix = finalText.replace(match[1], '');
    const duration = 1200;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = (finalNum * eased).toFixed(finalNum % 1 === 0 ? 0 : 1);
        el.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = finalText;
        }
    }

    el.textContent = '0' + suffix;
    requestAnimationFrame(update);
}
