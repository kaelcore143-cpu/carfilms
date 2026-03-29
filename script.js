// =============================================
// CARFILMS — script.js
// =============================================

// ── NAVBAR SCROLL OPTIMIZADO ─────────────────
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

// ── MOBILE MENU ───────────────────────────
const burgerBtn = document.getElementById('burgerBtn');
const mobNav    = document.getElementById('mob-nav');

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

// ── VIDEO LAZY LOADING ULTRA OPTIMIZADO ────────
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
    // Configuración optimizada para móviles
    const options = {
      root: null,
      rootMargin: this.isMobile ? '50px' : '100px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        
        if (entry.isIntersecting) {
          // Cargar video si no está cargado
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

    // Observar todos los videos excepto el hero
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
    
    // Marcar como cargado visualmente
    video.classList.add('loaded');
    
    // Intentar autoplay
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
      video.dataset.playing = 'false';
      
      // Liberar recursos en móvil
      if (this.isMobile) {
        video.preload = 'none';
      }
    }
  }

  optimizeVideoSources() {
    this.videos.forEach(video => {
      // Optimizar para móvil
      if (this.isMobile) {
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        
        // Reducir calidad en móvil para mejor rendimiento
        if (video.playbackRate > 0.8) {
          video.playbackRate = 0.75;
        }
      }
      
      // Preload strategy
      if (video.closest('#hero')) {
        video.preload = 'auto'; // Hero video carga inmediatamente
      } else {
        video.preload = 'none'; // Otros videos solo cargan cuando se necesitan
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

  setupPerformanceMonitoring() {
    // Monitorizar rendimiento y ajustar dinámicamente
    if ('performance' in window) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          // Si el uso de memoria es alto, pausar videos no visibles
          this.pauseAllNonVisibleVideos();
        }
      }, 5000);
    }
  }

  pauseAllNonVisibleVideos() {
    this.videos.forEach(video => {
      const section = video.closest('.service-section, #hero');
      if (section && !this.isVisible(section)) {
        this.pauseVideo(video);
      }
    });
  }
}

// ── SCROLL REVEAL ULTRA OPTIMIZADO ────────────
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05, // Más agresivo para móvil
    rootMargin: '0px 0px -20px 0px'
  });

  // Usar setTimeout para no bloquear carga inicial
  setTimeout(() => {
    // Solo observar elementos visibles inicialmente
    const elements = document.querySelectorAll('.service-section, .rv');
    elements.forEach(el => observer.observe(el));
  }, 200);
}

// ── PERFORMANCE MONITOR ───────────────────────
class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.lastTime = performance.now();
    this.frames = [];
    this.init();
  }

  init() {
    this.measureFPS();
    this.optimizeOnLowPerformance();
  }

  measureFPS() {
    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;
    
    const fps = 1000 / delta;
    this.frames.push(fps);
    
    // Mantener solo los últimos 60 frames
    if (this.frames.length > 60) {
      this.frames.shift();
    }
    
    requestAnimationFrame(() => this.measureFPS());
  }

  getCurrentFPS() {
    if (this.frames.length === 0) return 60;
    const sum = this.frames.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.frames.length);
  }

  optimizeOnLowPerformance() {
    // Solo monitorear en móviles o si hay baja batería
    const isMobile = window.innerWidth <= 768;
    const hasLowBattery = navigator.getBattery ? 
      (async () => (await navigator.getBattery()).level < 0.2)() : false;
    
    if (!isMobile) return;
    
    setInterval(() => {
      const currentFPS = this.getCurrentFPS();
      
      if (currentFPS < 25) {
        // Bajo rendimiento crítico
        document.body.classList.add('low-performance');
        this.pauseAllVideos();
      } else if (currentFPS < 35) {
        // Rendimiento bajo
        document.body.classList.add('low-performance');
      } else if (currentFPS > 45) {
        // Buen rendimiento
        document.body.classList.remove('low-performance');
      }
    }, 3000); // Menos frecuente para ahorrar batería
  }

  pauseAllVideos() {
    document.querySelectorAll('video').forEach(video => {
      if (!video.closest('#hero')) {
        video.pause();
        video.preload = 'none';
      }
    });
  }
}

// ── ERROR HANDLING & SECURITY ─────────────────
window.addEventListener('error', (e) => {
  console.warn('Error controlado:', e.error);
  // Continuar ejecución sin interrumpir experiencia
});

// ── INIT ULTRA OPTIMIZADO ───────────────────
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Validación ligera de dominio
    const allowedHosts = ['carfilms.com.co', 'localhost'];
    if (!allowedHosts.some(host => window.location.hostname.includes(host))) {
      console.warn('Dominio no autorizado');
    }
    
    // Inicialización progresiva
    requestIdleCallback(() => {
      // 1. Video optimizer - Prioridad alta
      new VideoOptimizer();
    }, { timeout: 100 });
    
    requestIdleCallback(() => {
      // 2. Performance monitor - Prioridad media
      new PerformanceMonitor();
    }, { timeout: 500 });
    
    requestIdleCallback(() => {
      // 3. Scroll reveal - Prioridad baja
      setupScrollReveal();
    }, { timeout: 1000 });
    
  } catch (error) {
    console.error('Error en inicialización:', error);
    // Fallback ultra ligero
    document.querySelectorAll('video').forEach(video => {
      video.muted = true;
      video.playsinline = true;
    });
  }
});

// ── LOAD OPTIMIZADO ───────────────────────────
window.addEventListener('load', () => {
  // Preload crítico después de carga principal
  requestIdleCallback(() => {
    // Cargar videos no críticos cuando el browser esté idle
    document.querySelectorAll('.service-video').forEach(video => {
      if (!video.closest('#hero')) {
        video.preload = 'metadata';
      }
    });
  });
});

// ── RESIZE OPTIMIZADO ───────────────────────────
let resizeTimeout;
window.addEventListener('resize', () => {
  // Debounce resize events
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Re-evaluar optimizaciones si cambia el tamaño significativamente
    const wasMobile = window.innerWidth <= 768;
    const isMobile = window.innerWidth <= 768;
    
    if (wasMobile !== isMobile) {
      // Cambió entre mobile/desktop, re inicializar
      location.reload(); // Simple solución para cambios drásticos
    }
  }, 250);
}, { passive: true });

// ── MEMORY CLEANUP ───────────────────────────
// Limpiar memoria cuando la página no está visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pausar todos los videos cuando la página está oculta
    document.querySelectorAll('video').forEach(video => {
      video.pause();
      video.preload = 'none';
    });
  } else {
    // Reanudar solo el video visible cuando la página vuelve a estar activa
    const heroVideo = document.querySelector('#hero video');
    if (heroVideo) {
      heroVideo.preload = 'auto';
      heroVideo.play().catch(() => {});
    }
  }
});