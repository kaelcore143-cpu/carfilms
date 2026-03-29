/* ===== CARFILMS - SCROLL POR SECCIONES COMPLETAS ===== */

// Mobile Menu Toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('active');
    mobileMenu.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ===== SCROLL POR SECCIONES COMPLETAS =====
class FullPageScroll {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.currentSection = 0;
    this.isScrolling = false;
    this.isMobile = window.innerWidth <= 768;
    this.touchStartY = 0;
    this.touchEndY = 0;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.updateActiveSection();
    this.optimizeVideos();
  }

  setupEventListeners() {
    // Desktop scroll
    if (!this.isMobile) {
      window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    }
    
    // Mobile touch
    window.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    window.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
    
    // Keyboard navigation
    window.addEventListener('keydown', (e) => this.handleKeyboard(e));
    
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleNavClick(e));
    });
    
    // Resize handling
    window.addEventListener('resize', () => this.handleResize());
  }

  handleWheel(e) {
    if (this.isScrolling) return;
    
    e.preventDefault();
    
    if (e.deltaY > 0) {
      this.scrollToNextSection();
    } else {
      this.scrollToPrevSection();
    }
  }

  handleTouchStart(e) {
    this.touchStartY = e.touches[0].clientY;
  }

  handleTouchEnd(e) {
    if (this.isScrolling) return;
    
    this.touchEndY = e.changedTouches[0].clientY;
    const diff = this.touchStartY - this.touchEndY;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        this.scrollToNextSection();
      } else {
        this.scrollToPrevSection();
      }
    }
  }

  handleKeyboard(e) {
    if (this.isScrolling) return;
    
    switch(e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        this.scrollToNextSection();
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        this.scrollToPrevSection();
        break;
      case 'Home':
        e.preventDefault();
        this.scrollToSection(0);
        break;
      case 'End':
        e.preventDefault();
        this.scrollToSection(this.sections.length - 1);
        break;
    }
  }

  handleNavClick(e) {
    const href = e.target.getAttribute('href');
    if (href === '#') return;
    
    const targetSection = document.querySelector(href);
    if (!targetSection) return;
    
    e.preventDefault();
    
    const sectionIndex = Array.from(this.sections).indexOf(targetSection);
    if (sectionIndex !== -1) {
      this.scrollToSection(sectionIndex);
    }
  }

  handleResize() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      // Re-initialize event listeners if needed
    }
  }

  scrollToNextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.scrollToSection(this.currentSection + 1);
    }
  }

  scrollToPrevSection() {
    if (this.currentSection > 0) {
      this.scrollToSection(this.currentSection - 1);
    }
  }

  scrollToSection(index) {
    if (index < 0 || index >= this.sections.length || this.isScrolling) return;
    
    this.isScrolling = true;
    this.currentSection = index;
    
    const targetSection = this.sections[index];
    const targetY = targetSection.offsetTop;
    
    // Smooth scroll
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
    
    // Update active section
    this.updateActiveSection();
    
    // Reset scrolling flag after animation
    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }

  updateActiveSection() {
    // Update navbar active state
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${this.sections[this.currentSection].id}`) {
        link.classList.add('active');
      }
    });
    
    // Update navbar background
    const navbar = document.getElementById('nav');
    if (this.currentSection > 0) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.2)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.1)';
    }
  }

  optimizeVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach((video, index) => {
      // Optimize for mobile
      if (this.isMobile) {
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.playbackRate = 0.75;
      }
      
      // Video visibility observer
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const sectionIndex = Array.from(this.sections).indexOf(entry.target.closest('section'));
          
          if (entry.isIntersecting && sectionIndex === this.currentSection) {
            // Play video when section is active and visible
            video.muted = true;
            video.play().catch(() => {
              console.log('Video play blocked, will retry');
            });
            entry.target.classList.add('video-active');
          } else {
            // Pause video when section is not active
            video.pause();
            entry.target.classList.remove('video-active');
          }
        });
      }, { 
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px'
      });
      
      videoObserver.observe(video);
    });
  }
}

// ===== REVEAL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ===== PARALLAX EFFECT FOR HERO =====
const heroSection = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');

if (heroSection && heroVideo) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;
    const heroTop = heroSection.offsetTop;
    
    // Only apply parallax when hero is visible
    if (scrolled < heroTop + heroHeight) {
      const parallax = scrolled * 0.3;
      heroVideo.style.transform = `translate(-50%, -50%) translateY(${parallax}px)`;
    }
  }, { passive: true });
}

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;
function updateAnimations() {
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}, { passive: true });

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.warn('Error controlado:', e.error);
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize full page scroll
    new FullPageScroll();
    
    // Observe sections for reveal animations
    const animatedElements = document.querySelectorAll('.nosotros-content, .servicio-content, .resenas-content, .contacto-content, .footer-content');
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    // Initialize hero video
    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {
        console.log('Hero video autoplay blocked');
      });
    }
    
  } catch (error) {
    console.error('Error en inicialización:', error);
    // Fallback: enable normal scrolling if full page scroll fails
    document.body.style.scrollBehavior = 'smooth';
  }
});
