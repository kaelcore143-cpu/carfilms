// ============================================
// CarFilms Estética Vehicular - JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // Smooth Scroll for Navigation Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Intersection Observer for Scroll Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .service-card, .result-card, .testimonial-card, .trust-feature-item, .stat-item, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // ============================================
    // Video Background Handling
    // ============================================
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Ensure video plays on mobile
        heroVideo.play().catch(function(error) {
            console.log('Autoplay prevented:', error);
        });
        
        // Pause video when not visible (performance)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.1 });
        
        videoObserver.observe(heroVideo);
    }
    
    // ============================================
    // WhatsApp Button Tracking
    // ============================================
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track click (can be connected to analytics)
            console.log('WhatsApp clicked:', this.href);
            
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // ============================================
    // Service Card Interactions
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ============================================
    // Parallax Effect for Hero
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroSection && !window.matchMedia('(pointer: coarse)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            }
        });
    }
    
    // ============================================
    // Form Placeholder (if forms are added later)
    // ============================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Próximamente: Formulario de contacto. Por favor usa WhatsApp para cotizar ahora.');
        });
    });
    
    // ============================================
    // Performance: Lazy Load Images
    // ============================================
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ============================================
    // Counter Animation for Stats
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, suffix = '') => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        updateCounter();
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const text = statNumber.textContent;
                
                if (text.includes('500')) {
                    animateCounter(statNumber, 500, '+');
                } else if (text.includes('5')) {
                    statNumber.textContent = '5';
                } else if (text.includes('24')) {
                    statNumber.textContent = '24h';
                }
                
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // ============================================
    // Before/After Slider (Simple Version)
    // ============================================
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        card.addEventListener('click', function() {
            // Simple toggle effect for mobile
            const before = this.querySelector('.result-before');
            const after = this.querySelector('.result-after');
            
            if (window.innerWidth < 768) {
                before.style.opacity = before.style.opacity === '0' ? '1' : '0';
                after.style.opacity = after.style.opacity === '1' ? '0' : '1';
            }
        });
    });
    
    // ============================================
    // Button Click Effects
    // ============================================
    const allButtons = document.querySelectorAll('.btn-primary, .btn-service, .btn-cta-large');
    
    allButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // ============================================
    // Preloader (Optional)
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ============================================
    // Console Message
    // ============================================
    console.log('%c CarFilms Estética Vehicular ', 'background: linear-gradient(135deg, #d4af37 0%, #e5c76b 100%); color: #000; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%c Protección premium para tu vehículo en Medellín ', 'color: #d4af37; font-size: 14px;');
});

// ============================================
// Utility Functions
// ============================================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
