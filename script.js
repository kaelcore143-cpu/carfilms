// =============================================
// CARFILMS — script.js OPTIMIZADO
// =============================================

'use strict';

// ── NAVBAR SCROLL STATE ──────────────────
let ticking = false;

function updateNavbar() {
  const nav = document.getElementById('nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}, { passive: true });

// ── MOBILE MENU HANDLER ──────────────────
const burgerBtn = document.getElementById('burgerBtn');
const mobNav = document.getElementById('mob-nav');

if (burgerBtn && mobNav) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerBtn.classList.toggle('open');
    mobNav.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-lnk').forEach(link => {
    link.addEventListener('click', () => {
      burgerBtn.classList.remove('open');
      mobNav.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
}

// ── VIDEO LAZY LOADING OPTIMIZADO ───────
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
    this.loadHeroVideo();
  }

  loadHeroVideo() {
    const heroVideo = document.querySelector('#hero video');
    if (heroVideo) {
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
          }
          this.playVideo(video);
        } else {
          this.pauseVideo(video);
        }
      });
    }, options);

    this.videos.forEach(video => {
      video.pause();
      video.preload = 'none';
      
      if (!video.closest('#hero')) {
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
      
      if (video.closest('#hero')) {
        video.preload = 'auto';
      } else {
        video.preload = 'none';
      }
    });
  }
}

// ── SCROLL REVEAL ───────────────────────
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  setTimeout(() => {
    document.querySelectorAll(
      '.servicio-card, .galeria-item, .contacto-item, .punto'
    ).forEach(el => observer.observe(el));
  }, 300);
}

// Agregar estilos para reveal animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .servicio-card, .galeria-item, .contacto-item, .punto {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .servicio-card.visible, 
  .galeria-item.visible, 
  .contacto-item.visible, 
  .punto.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .burger.open span:nth-child(1) {
    transform: rotate(45deg) translate(8px, 8px);
  }

  .burgerBtn.open span:nth-child(2) {
    opacity: 0;
  }

  .burger.open span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }
`;
document.head.appendChild(styleSheet);

// ── MEMORY CLEANUP ──────────────────────
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.querySelectorAll('video').forEach(video => {
      video.pause();
      video.preload = 'none';
    });
  } else {
    const heroVideo = document.querySelector('#hero video');
    if (heroVideo && heroVideo.paused) {
      heroVideo.preload = 'auto';
      heroVideo.play().catch(() => {});
    }
  }
});

// ── INITIALIZATION ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Video optimizer
    new VideoOptimizer();
    
    // Scroll reveal
    setupScrollReveal();
    
  } catch (error) {
    console.error('Error en inicialización:', error);
  }
});

// ── SMOOTH SCROLL ANCHORS ───────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '#hero') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ── PERFORMANCE MONITORING ──────────────
window.addEventListener('load', () => {
  requestIdleCallback(() => {
    const perf = window.performance;
    if (perf && perf.timing) {
      const loadTime = perf.timing.loadEventEnd - perf.timing.navigationStart;
      console.log(`Página cargada en ${loadTime}ms`);
    }
  });
});
