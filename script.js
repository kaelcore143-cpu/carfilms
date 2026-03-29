/* ===== CARFILMS - JAVASCRIPT LIMPIO ===== */

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

// Navbar Scroll Effect
const navbar = document.getElementById('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.2)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.1)';
  }
  
  lastScrollY = currentScrollY;
}, { passive: true });

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.nosotros, .servicio, .resenas-content');
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Video Optimization
const videos = document.querySelectorAll('video');
const isMobile = window.innerWidth <= 768;

videos.forEach(video => {
  // Optimize for mobile
  if (isMobile) {
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    if (video.playbackRate > 0.8) {
      video.playbackRate = 0.75;
    }
  }
  
  // Play videos when visible
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(() => {
          entry.target.muted = true;
          entry.target.play().catch(() => {});
        });
      } else {
        entry.target.pause();
      }
    });
  }, { threshold: 0.5 });
  
  videoObserver.observe(video);
});

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

// Parallax Effect for Hero
const heroSection = document.querySelector('.hero');
const heroVideo = document.querySelector('.hero-video');

if (heroSection && heroVideo) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    heroVideo.style.transform = `translate(-50%, -50%) translateY(${parallax}px)`;
  }, { passive: true });
}

// Performance optimization
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

// Error handling
window.addEventListener('error', (e) => {
  console.warn('Error controlado:', e.error);
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Auto-play videos with fallback
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(() => {
        console.log('Video autoplay blocked, will play on user interaction');
      });
    });
  } catch (error) {
    console.error('Error en inicialización:', error);
  }
});
