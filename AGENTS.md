# CarFilms Estética Vehicular - AGENTS.md

Este archivo brinda orientación compacta y específica del reposo para futuras sesiones de OpenCode. Cada línea responde a "¿Probablemente el agente se perdería esto sin ayuda?"

## Ubicación de archivos
- **Todos los archivos van en la raíz** — sin carpetas `assets/`, `img/` o `videos/`. El proyecto declara explícitamente "TODO en la RAÍZ".
- Archivos clave: `index.html`, `style.css`, `script.js`, `logo.jpg`, más los archivos de video MP4 y las fotos `trabajo-*.jpg`.
- Favicon: `logo-busqueda.svg` (SVG, para resultados de búsqueda) con respaldo `favicon-192.png`; `logo.jpg` se usa como `apple-touch-icon`.
- Solo se muestran dos marcas (Avery Dennison y StarkPro), con logos en la raíz: `logo-avery-dennison.svg` y `logo-starkpro.png`. La sección `#marcas` los muestra como imágenes (no como texto); Avery se invierte a blanco con CSS por su tinta oscura.
- Cada foto `trabajo-*.jpg` se usa **una sola vez** en todo el sitio (resultados, servicios y galería). No repetir una imagen en dos secciones.

## Despliegue en GitHub Pages
- Dos métodos: (1) carga manual de todos los archivos a la rama `main` raíz, o (2) GitHub Actions (verificar si existe `.github/workflows/deploy.yml`).
- **Crítico**: `.htaccess` **NO** es servido por GitHub Pages. Los headers de seguridad deben re-implementarse como meta tags en `<head>` si son necesarios.
- Desplegar desde la rama `main`, origen en la raíz `/`.

## Videos
- Deben ser formato MP4, cada uno con menos de 25 MB.
- Usar nombres de archivo sin ruta (ej. `15448797-hd_1920_1080_60fps.mp4`) - todos los videos viven en la raíz.
- Video hero: autoplay, muted, loop. Hoy es el único video de la página; si se agregan videos de resultados, usar reproducción bajo clic (lazy loading).

## Paleta de colores (variables CSS en `style.css`)
- `--color-black: #0a0a0a` (fondo principal)
- `--color-gold: #d4af37` (acento principal)
- `--color-gold-light: #e5c76b` (gradientes dorados)
- `--color-white: #ffffff` (contraste de texto)
- `--color-silver: #a8a8a8` (texto secundario)

## Mensajes CTA de WhatsApp (por servicio)
- PPF: `https://wa.me/573022469542?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20de%20CARFILMS%20y%20quiero%20cotizar%20PPF%20completo.%20Mi%20carro%20es%20marca%20___%2C%20modelo%20___%2C%20a%C3%B1o%20___.%20Me%20interesa%20el%20acabado%20brillante%20o%20mate`
- Polarizado: `https://wa.me/573022469542?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20de%20CARFILMS%20y%20quiero%20cotizar%20polarizado%20profesional`
- Wrap: `https://wa.me/573022469542?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20de%20CARFILMS%20y%20quiero%20cotizar%20wrap%20completo`
- Detailing: `https://wa.me/573022469542?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20de%20CARFILMS%20y%20quiero%20cotizar%20detailing%20premium`
- Siempre usar `target="_blank"` y `rel="noopener"`.

## Precios actualizados (nov 2026)
- PPF premium: $6.900.000
- Polarizado profesional: $750.000
- Wrap completo: $7.900.000
- Detailing: $300.000
- Entrega: PPF y detailing 2 días, wrap 3 días, polarizado 3 horas
- Garantía: 10 años

## Convenciones clave (verificar contra defaults)
- **JavaScript vanilla solo** — sin jQuery, sin Bootstrap. `script.js` usa APIs DOM vanilla y Intersection Observer.
- **Mobile-first**: Puntos de quiebre en 1024px, 768px, 480px en `style.css`. Probar en móvil.
- **Ningún framework**: Todas las animaciones, scroll e interacciones son vanilla.
- **Scroll suave** para enlaces de navegación con `#` (tanto el `scroll-behavior: smooth` en CSS como el cálculo de offset en JS).
- **Efecto parallax** bloqueado en móvil: `window.innerWidth > 768 && !window.matchMedia('(pointer: coarse)').matches` en `script.js`.
- **CTA fijo de WhatsApp** en esquina inferior derecha persiste en todas las páginas.
- **Efecto de header al hacer scroll**: background rgba(10,10,10,0.98) después de 100px de scroll.

## SEO
- `robots.txt` prohíbe `/*.md$` y `/README.md` — no agregar archivos markdown a la raíz.
- `sitemap.xml` lista todos los anclajes de sección (`#servicio-ppf`, `#testimonios`, etc.).
- Meta descripción y viewport están en `<head>` de `index.html`.

## Quirks de rendimiento
- Videos lazy-load mediante Intersection Observer — clic en el poster para reproducir, clic fuera para detener (aplicable si se agregan videos de resultados; hoy solo existe el video hero).
- `preload="none"` en videos lazy; `preload="metadata"` si se quiere vista previa.
- `IntersectionObserver` usado para animaciones fade-in-up, contadores de estadísticas y carga de videos.
- `prefers-reduced-motion` reduce/elimina animaciones.
- `prefers-reduced-data` oculta todos los elementos `<video>`.

## Directrices de diseño y sistema

### Estados de carga
- Usar **skeletons de carga** en lugar de espacios vacíos o spinners para todo el contenido.
- El skeleton debe transmitir claramente que el contenido está cargando y mejorar la experiencia de espera.

### Diseño responsive
- La app debe adaptarse a móvil, tablet y diferentes sizes de escritorio.
- **No limitarse a encoger la versión desktop** — el diseño debe refluir y reorganizarse inteligentemente por punto de quiebre.
- Puntos de quiebre definidos en `style.css`: 1024px (tablet), 768px (móvil grande), 480px (móvil pequeño).

### Jerarquía visual
- Evitar mucho texto innecesario que agregan las IAs y elementos que compiten por la atención.
- **Destacar la acción principal** (CTA de WhatsApp) y hacer que la interfaz sea fácil de escanear.
- Usar tamaños de fuente, colores y espaciado para guiar la mirada del usuario.

### Tokens de diseño
Definir para mantener consistencia en toda la app:
- **Colores**: variables CSS `--color-black`, `--color-gold`, `--color-gold-light`, `--color-white`, `--color-silver` (definidas en `style.css:6-24`).
- **Tipografías**: `--font-primary: 'Montserrat', sans-serif;` y `--font-secondary: 'Playfair Display', serif;` ( `style.css:33-34`).
- **Espaciados**: `--spacing-xs: 0.5rem`, `--spacing-sm: 1rem`, `--spacing-md: 2rem`, `--spacing-lg: 4rem`, `--spacing-xl: 6rem` ( `style.css:37-41`).
- **Bordes**: `--radius-sm: 8px`, `--radius-md: 12px`, `--radius-lg: 20px`, `--radius-full: 9999px` ( `style.css:49-52`).
- **Sombras**: `--shadow-gold: 0 4px 20px rgba(212, 175, 55, 0.3)`, `--shadow-dark: 0 10px 40px rgba(0, 0, 0, 0.5)`, `--shadow-card: 0 8px 32px rgba(0, 0, 0, 0.3)` ( `style.css:28-30`).

### Consistencia entre componentes
- Botones, cards, campos y modales deben usar el mismo lenguaje visual.
- Si hay dark mode, debe estar bien definido con todos los tokens aplicados.
- Estilos consistentes: mismas variables CSS, mismos radio de borde, mismas sombras, misma tipografía.

### Accesibilidad
- No basta con que se vea bien: las imágenes deben tener textos alternativos (`alt` attribute).
- Botones deben tener nombres accesibles (texto descriptivo o `aria-label`).
- **Contraste** que permita leer contenido (revisar razón de contraste AA/AAA).
- Los colores `--color-gold:#d4af37` sobre `--color-black:#0a0a0a` deben verificarse contra estándares WCAG.

### Estados de la interfaz
- Definir qué ocurre cuando:
  - **No hay datos** (empty states con skeleton o mensaje apropiado).
  - **Algo falla** (mensajes de error claros con sugerencias de solución).
  - **Una acción se completa** (confirmación visual, toast, o update de estado).
- **No diseñar solo el estado ideal** — los estados edge case son tan importantes como el primary state.