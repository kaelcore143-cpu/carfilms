/* ===== CARFILMS - ULTRA OPTIMIZED JAVASCRIPT ===== */

// Video Lazy Loading Class
class VideoOptimizer {
  constructor() {
    this.videos = document.querySelectorAll('video');
    this.isMobile = window.innerWidth <= 768;
    this.loadedVideos = new Set();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.optimizeVideoSources();
    this.setupPerformanceMonitoring();
    this.loadHeroVideo();
  }

  loadHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo && heroVideo.dataset.src) {
      this.loadVideo(heroVideo);
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: this.isMobile ? '50px' : '100px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
          if (!this.loadedVideos.has(video)) {
            this.loadVideo(video);
          } else {
            this.playVideo(video);
          }
        } else {
          this.pauseVideo(video);
        }
      });
    }, options);

    this.videos.forEach(video => {
      video.pause();
      video.preload = 'none';
      
      if (!video.closest('.hero')) {
        this.observer.observe(video);
      }
    });
  }

  loadVideo(video) {
    if (this.loadedVideos.has(video) || !video.dataset.src) return;
    
    const source = document.createElement('source');
    source.src = video.dataset.src;
    source.type = 'video/mp4';
    video.appendChild(source);
    
    video.load();
    this.loadedVideos.add(video);
    video.classList.add('loaded');
    this.playVideo(video);
  }

  playVideo(video) {
    if (video.paused) {
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  }

  pauseVideo(video) {
    if (!video.paused) {
      video.pause();
      if (this.isMobile) {
        video.preload = 'none';
      }
    }
  }

  optimizeVideoSources() {
    this.videos.forEach(video => {
      if (this.isMobile) {
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        if (video.playbackRate > 0.8) {
          video.playbackRate = 0.75;
        }
      }
    });
  }

  setupPerformanceMonitoring() {
    if ('performance' in window && this.isMobile) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          this.pauseAllNonVisibleVideos();
        }
      }, 5000);
    }
  }

  pauseAllNonVisibleVideos() {
    this.videos.forEach(video => {
      const section = video.closest('.servicios, .hero');
      if (section && !this.isVisible(section)) {
        this.pauseVideo(video);
      }
    });
  }

  isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Mobile Menu Toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('active');
    mobileMenu.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      mobileMenu.classList.remove('active');
      burger.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
}

// Navbar Scroll Effect - Optimized
const navbar = document.getElementById('nav');
let ticking = false;

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.2)';
  } else {
    navbar.style.borderBottomColor = 'rgba(201, 168, 76, 0.1)';
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// Scroll Reveal Animation - Optimized
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  setTimeout(() => {
    const elements = document.querySelectorAll('.nosotros, .servicios, .galeria, .resenas, .contacto');
    elements.forEach(el => observer.observe(el));
  }, 100);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  try {
    new VideoOptimizer();
    setupScrollReveal();
  } catch (error) {
    console.error('Error en inicialización:', error);
    // Fallback básico
    document.querySelectorAll('video').forEach(video => {
      video.muted = true;
      video.playsinline = true;
    });
  }
});

// Performance monitoring
window.addEventListener('error', (e) => {
  console.warn('Error controlado:', e.error);
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
