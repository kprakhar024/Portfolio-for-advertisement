// ==========================================
// PRELOADER
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1500);
});

// ==========================================
// TYPED TEXT EFFECT
// ==========================================
const typedElement = document.getElementById('typed');
const words = ['Restaurants', 'Cafés', 'Bakeries', 'Salons', 'Small Businesses'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typedElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typedElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Active nav link
    updateActiveNavLink();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// ACTIVE NAV LINK
// ==========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// MOBILE MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ==========================================
// PORTFOLIO FILTERS
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ==========================================
// TESTIMONIALS SLIDER
// ==========================================
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');
const cards = track.querySelectorAll('.testimonial-card');
let currentSlide = 0;
const totalSlides = cards.length;

// Create dots
cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

// Auto-play
let autoPlay = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}, 5000);

// Pause on hover
const sliderContainer = document.querySelector('.testimonials-slider');
sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlay));
sliderContainer.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
});

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }, 2000);
});

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function revealOnScroll() {
    const reveals = document.querySelectorAll(
        '.service-card, .portfolio-item, .process-step, .pricing-card, .about-feature, .contact-card'
    );

    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('revealed');
        }
    });
}

// Add initial styles for reveal elements
const style = document.createElement('style');
style.textContent = `
    .service-card, .portfolio-item, .process-step, .pricing-card, .about-feature, .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .service-card.revealed, .portfolio-item.revealed, .process-step.revealed, 
    .pricing-card.revealed, .about-feature.revealed, .contact-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .service-card:nth-child(2) { transition-delay: 0.1s; }
    .service-card:nth-child(3) { transition-delay: 0.2s; }
    .service-card:nth-child(4) { transition-delay: 0.3s; }
    .service-card:nth-child(5) { transition-delay: 0.4s; }
    .service-card:nth-child(6) { transition-delay: 0.5s; }
    .portfolio-item:nth-child(2) { transition-delay: 0.1s; }
    .portfolio-item:nth-child(3) { transition-delay: 0.2s; }
    .portfolio-item:nth-child(4) { transition-delay: 0.3s; }
    .portfolio-item:nth-child(5) { transition-delay: 0.4s; }
    .portfolio-item:nth-child(6) { transition-delay: 0.5s; }
    .process-step:nth-child(2) { transition-delay: 0.15s; }
    .process-step:nth-child(3) { transition-delay: 0.3s; }
    .process-step:nth-child(4) { transition-delay: 0.45s; }
    .pricing-card:nth-child(2) { transition-delay: 0.15s; }
    .pricing-card:nth-child(3) { transition-delay: 0.3s; }
    .about-feature:nth-child(2) { transition-delay: 0.1s; }
    .about-feature:nth-child(3) { transition-delay: 0.2s; }
    .about-feature:nth-child(4) { transition-delay: 0.3s; }
    .contact-card:nth-child(2) { transition-delay: 0.1s; }
    .contact-card:nth-child(3) { transition-delay: 0.2s; }
    .contact-card:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ==========================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ==========================================
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

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat strong');
    counters.forEach(counter => {
        if (counter.dataset.animated) return;

        const rect = counter.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            counter.dataset.animated = 'true';
            const text = counter.textContent;

            // Extract number
            const match = text.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[1]);
                const prefix = text.split(match[1])[0];
                const suffix = text.split(match[1])[1];
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = prefix + Math.round(current) + suffix;
                }, 20);
            }
        }
    });
}

window.addEventListener('scroll', animateCounters);

// ==========================================
// PARALLAX EFFECT FOR HERO SHAPES
// ==========================================
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

console.log('🚀 WebCraft Studio — Portfolio Website Loaded Successfully!');
