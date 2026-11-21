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
        const setMenuState = function(expanded) {
            mobileMenuBtn.setAttribute('aria-expanded', String(expanded));
            mobileMenuBtn.setAttribute('aria-label', expanded ? 'Cerrar menú' : 'Abrir menú');
        };

        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            const expanded = mobileMenu.classList.contains('active');
            document.body.style.overflow = expanded ? 'hidden' : '';
            setMenuState(expanded);
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                setMenuState(false);
            });
        });

        // Close menu with Escape and return focus to the button
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                setMenuState(false);
                mobileMenuBtn.focus();
            }
        });
    }
    
    // ============================================
    // Header Scroll Effect (rAF-throttled)
    // ============================================
    const header = document.getElementById('header');
    let scrollTicking = false;

    window.addEventListener('scroll', function() {
        if (scrollTicking) return;
        scrollTicking = true;

        requestAnimationFrame(function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.98)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = 'none';
            }

            scrollTicking = false;
        });
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
        '.benefit-card, .service-card, .result-card, .testimonial-card, .trust-feature-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // ============================================
    // HERO VIDEO - Normal autoplay
    // ============================================
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        heroVideo.play().catch(() => {});
    }
    
    // ============================================
    // Performance: Pause videos when tab hidden
    // ============================================
    document.addEventListener('visibilitychange', () => {
        const allVideos = document.querySelectorAll('video');
        allVideos.forEach(video => {
            if (document.hidden) {
                video.dataset.wasPlaying = !video.paused;
                video.pause();
            } else if (video.dataset.wasPlaying === 'true') {
                video.play().catch(() => {});
            }
        });
    });
    
    // ============================================
    // WhatsApp CTA - Toast de confirmación
    // ============================================
    const toast = document.getElementById('waToast');
    let toastTimer;

    if (toast) {
        document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
            button.addEventListener('click', function() {
                toast.classList.add('visible');
                clearTimeout(toastTimer);
                toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
            });
        });
    }
    
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
    // Parallax Effect for Hero (AHORA BLOQUEADO EN MÓVIL)
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    // window.innerWidth > 768 evita que el parallax rompa la vista móvil
    if (heroSection && window.innerWidth > 768 && !window.matchMedia('(pointer: coarse)').matches) {
        let parallaxTicking = false;

        window.addEventListener('scroll', function() {
            if (parallaxTicking) return;
            parallaxTicking = true;

            requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.3;

                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${rate}px)`;
                    heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
                }

                parallaxTicking = false;
            });
        });
    }
    
    // ============================================
    // Button Click Effects
    // ============================================
    const allButtons = document.querySelectorAll('.btn-service');
    
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
    
});