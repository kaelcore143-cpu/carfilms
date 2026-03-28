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

// ── VIDEO LAZY LOADING CON INTERSECTION OBSERVER ───────────
class VideoOptimizer {
  constructor() {
    this.videos = document.querySelectorAll('video');
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.optimizeVideoSources();
    this.setupPerformanceMonitoring();
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
          this.playVideo(video);
        } else {
          this.pauseVideo(video);
        }
      });
    }, options);

    // Observar todos los videos
    this.videos.forEach(video => {
      // Pausar todos los videos inicialmente
      video.pause();
      video.preload = 'none';
      
      // Solo observar si no está en hero (hero video siempre visible)
      if (!video.closest('#hero')) {
        this.observer.observe(video);
      } else {
        // Hero video: reproducir solo cuando esté listo
        video.addEventListener('canplay', () => {
          if (this.isVisible(video.closest('#hero'))) {
            this.playVideo(video);
          }
        }, { once: true });
      }
    });
  }

  playVideo(video) {
    if (video.dataset.playing === 'true') return;
    
    video.preload = 'auto';
    video.play().catch(() => {
      // Si falla autoplay, intentar con muted
      video.muted = true;
      video.play().catch(() => {
        console.log('Video playback blocked');
      });
    });
    video.dataset.playing = 'true';
  }

  pauseVideo(video) {
    if (video.dataset.playing !== 'true') return;
    
    video.pause();
    video.dataset.playing = 'false';
    
    // Liberar recursos en móvil
    if (this.isMobile) {
      video.preload = 'none';
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

// ── SCROLL REVEAL OPTIMIZADO ───────────────
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target); // animar solo una vez
      }
    });
  }, {
    threshold: 0.1, // Reducido para mejor rendimiento
    rootMargin: '0px 0px -40px 0px' // Menos margen para activar antes
  });

  // Service sections con delay para mejor performance
  requestAnimationFrame(() => {
    document.querySelectorAll('.service-section').forEach(section => {
      observer.observe(section);
    });

    // Elementos genéricos con clase .rv
    document.querySelectorAll('.rv').forEach(el => {
      observer.observe(el);
    });
  });
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
    setInterval(() => {
      const currentFPS = this.getCurrentFPS();
      
      if (currentFPS < 30) {
        // Bajo rendimiento: reducir animaciones
        document.body.classList.add('low-performance');
        
        // Pausar videos no visibles
        document.querySelectorAll('video').forEach(video => {
          if (!video.closest('#hero')) {
            video.pause();
          }
        });
      } else if (currentFPS > 45) {
        // Buen rendimiento: restaurar animaciones
        document.body.classList.remove('low-performance');
      }
    }, 2000);
  }
}

// ── ERROR HANDLING & SECURITY ─────────────────
window.addEventListener('error', (e) => {
  console.warn('Error controlado:', e.error);
  // Continuar ejecución sin interrumpir experiencia
});

// ── INIT OPTIMIZADO CON SEGURIDAD ─────────────
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Validar que estamos en el dominio correcto
    if (window.location.hostname !== 'carfilms.com.co' && 
        window.location.hostname !== 'localhost' && 
        !window.location.hostname.includes('github.io')) {
      console.warn('Dominio no autorizado detectado');
    }
    
    // Inicializar con prioridades
    const videoOptimizer = new VideoOptimizer();
    const performanceMonitor = new PerformanceMonitor();
    
    // Scroll reveal con delay para no bloquear carga inicial
    setTimeout(() => {
      setupScrollReveal();
    }, 100);
    
  } catch (error) {
    console.error('Error en inicialización:', error);
    // Fallback básico
    document.querySelectorAll('video').forEach(video => {
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
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