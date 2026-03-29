/* ===== CARFILMS - OPTIMIZED JAVASCRIPT ===== */

// Mobile Menu Toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

// Navbar Scroll Effect
const navbar = document.getElementById('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  
  if (lastScrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.2)';
  } else {
    navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.1)';
  }
}, { passive: true });

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.nosotros, .servicios, .resenas, .contacto');

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add('reveal-visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll, { passive: true });

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Video Preload Optimization
const videos = document.querySelectorAll('video');
videos.forEach(video => {
  video.addEventListener('play', () => {
    video.closest('.servicio-card')?.style.opacity = '1';
  }, { once: true });
});

// Performance: Lazy load videos only when visible
const observerOptions = {
  threshold: 0.1,
  rootMargin: '50px'
};

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      if (!video.src && video.querySelector('source')) {
        video.load();
      }
    }
  });
}, observerOptions);

videos.forEach(video => {
  if (video.className !== 'hero-video') {
    videoObserver.observe(video);
  }
});

// Add reveal animation class to sections
const style = document.createElement('style');
style.textContent = `
  .servicios, .resenas, .contacto {
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }
  
  .reveal-visible {
    opacity: 1 !important;
  }
`;
document.head.appendChild(style);

// Initialize reveal on load
window.addEventListener('load', revealOnScroll, { once: true });

console.log('Carfilms loaded ✓');
