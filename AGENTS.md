# CarFilms Estética Vehicular - AGENTS.md

Orientación compacta para futuras sesiones de OpenCode. Cada línea responde a "¿Probablemente el agente se perdería esto sin ayuda?".

## Estructura y comando
- **Sin build, sin dependencias, sin tests, sin lint, sin workflows.** `index.html` + `style.css` + `script.js` son el sitio completo.
- No existe `package.json`, `opencode.json`, `.gitignore` ni `.github/`. No hay nada que compilar ni instalar.
- Para verlo: abrir `index.html` en el navegador o servir la raíz con cualquier servidor estático.
- **Todo va en la raíz** — no crear `assets/`, `img/` ni `videos/`.

## Despliegue (GitHub Pages)
- Pages publica automáticamente desde la rama `main`, origen raíz `/`. Cada push a `main` reconstruye el sitio.
- **No existe `.htaccess`**: se eliminó porque GitHub Pages no sirve headers de seguridad, expiración, gzip ni redirecciones (HTTPS / quitar `www`). No recrearlo.
- Dominio personalizado: `steticavehicularcarfilms.com` (`CNAME`, canonical y `og:url`).
- `404.html` es la página de error que Pages sirve automáticamente (no tiene CTA fijo ni header).

## Assets y contenido
- Cada foto `trabajo-*.jpg` se usa **una sola vez** en `index.html`; no repetir la misma imagen en dos secciones.
- `trabajo-pickup-taller.jpg` y `trabajo-pickup-tres-cuartos.jpg` existen en el repo pero **no se referencian** en `index.html`.
- `carfilms-logo.jpg` solo se usa como `og:image`, `twitter:image` e imagen de json-ld; no aparece en el body.
- El video hero (`15448797-hd_1920_1080_60fps.mp4`, ~3 MB) es el **único** `<video>` del sitio. El `poster` es un SVG inline de respaldo.
- `#marcas` muestra solo Avery Dennison y StarkPro como imágenes. Avery se invierte con `filter: brightness(0) invert(1)` y StarkPro se aclara con `brightness(1.25)` en `style.css`.

## Precios y tiempos (nov 2026)
- PPF premium $6.900.000 · Polarizado $750.000 · Wrap completo $7.900.000 · Detailing $300.000.
- Entrega: PPF y detailing 2 días, wrap 3 días, polarizado 3 horas. Garantía 10 años.

## CTA de WhatsApp
- Base `https://wa.me/573022469542`; siempre `target="_blank" rel="noopener noreferrer"`.
- PPF (hero y servicio): `?text=Hola%2C%20vengo%20de%20la%20p%C3%A1gina%20de%20CARFILMS%20y%20quiero%20cotizar%20PPF%20completo.%20Mi%20carro%20es%20marca%20___%2C%20modelo%20___%2C%20a%C3%B1o%20___.%20Me%20interesa%20el%20acabado%20brillante%20o%20mate`
- Polarizado / Wrap / Detailing: `?text=Hola,%20quiero%20cotizar%20<Polarizado|Wrap|Detailing>` (coma literal, no `%2C`).
- Testimonios: `?text=Hola,%20vi%20los%20testimonios%20y%20quiero%20agendar`.
- Header, menú móvil, CTA final, footer y 404 usan la base sin `?text`.
- Quirk: el HTML mezcla `%2C` (PPF) con `,` (resto). No "arreglar" la codificación sin querer.

## Tokens y responsive (`style.css`)
- Colores: líneas 10-18 (`--color-black`, `-black-light`, `-black-lighter`, `--color-silver` + variantes, `--color-gold`, `--color-gold-light`, `--color-white`). **No existe `--shadow-dark`.**
- Sombras: 25-26. Tipografías: 34-35. Espaciados: 38-42. Radios: 50-53.
- Breakpoints reales: 1024px, 768px y 480px.

## JS y comportamiento (`script.js`)
- Solo vanilla; sin jQuery ni frameworks.
- Header: el JS escribe `background: rgba(10,10,10,0.98)` inline al superar 100px de scroll (el CSS base es 0.95). El estilo inline gana: cambiar solo el CSS no basta.
- Parallax del hero bloqueado en móvil: `window.innerWidth > 768 && !window.matchMedia('(pointer: coarse)').matches`.
- `IntersectionObserver` se usa solo para `fade-in-up`. Las imágenes usan `loading="lazy"` nativo; el bloque `img[data-src]` del JS está muerto (ningún `data-src` en el HTML).
- `visibilitychange` pausa y reanuda todos los `<video>` al ocultar/mostrar la pestaña.
- Toast `#waToast`: 3 s al hacer clic en cualquier enlace `wa.me`.
- Menú móvil: `aria-expanded`/`aria-label` actualizados, Escape cierra y devuelve el foco, bloquea `body.style.overflow`.
- `prefers-reduced-motion`: desactiva el pulso y el hover de imágenes (no todas las animaciones). `prefers-reduced-data`: `display:none` en todos los `<video>`.

## Estados de UI
- Skip-link y `:focus-visible` dorado están cableados; el sitio es dark-only (no hay toggle de tema).
- Se eliminaron los estados `.skeleton`, `.empty-state`, `.error-state` y `.success-state` (no se usaban en `index.html`). Para contenido asíncrono futuro, usar skeletons en lugar de spinners.

## SEO
- `robots.txt`: solo `Allow: /` y el sitemap; no bloquea `*.md` ni `README.md`.
- `sitemap.xml`: una sola URL (la raíz), no lista anclajes de sección.
- Meta description, OG, Twitter y json-ld (`LocalBusiness`) están en el `<head>` de `index.html`.
