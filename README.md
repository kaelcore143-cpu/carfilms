# CarFilms Estética Vehicular

Sitio web de **CarFilms Estética Vehicular** — especialistas en PPF (Paint Protection Film), polarizado cerámico y detailing profesional en Medellín.

🌐 **En vivo:** https://steticavehicularcarfilms.com/

## Stack

HTML/CSS/JS vanilla, sin build ni frameworks. Alojado en **GitHub Pages** (rama `main`, raíz `/`).

## Estructura

```
├── index.html        # Única página (sitio one-page)
├── style.css         # Estilos + design tokens (variables CSS en :root)
├── script.js         # Interactividad (menú móvil, scroll, animaciones, toast)
├── logo.jpg          # Logo + favicon
├── carfilms-logo.jpg # Logo (og:image)
├── *.mp4             # Video del hero
├── trabajo-*.jpg     # Fotos reales de trabajos (resultados y galería)
├── logo-*.svg|png    # Logos de marcas (Avery Dennison, 3M, XPEL, SunTek, Hexis, StarkPro)
├── sitemap.xml       # Mapa del sitio (1 URL)
├── robots.txt        # Reglas de rastreo + sitemap
└── CNAME             # Dominio personalizado de GitHub Pages
```

Parciales descartados: el sitio es one-page; no hay carpetas `assets/` — todo vive en la raíz.

## Desarrollo local

Abre `index.html` en el navegador (doble clic). No requiere servidor ni dependencias.

## Despliegue

GitHub Pages publica automáticamente desde `main` / raíz. Cada push a `main` reconstruye el sitio.

Checklist antes de subir:
- `git push origin main`
- Verificar https://steticavehicularcarfilms.com/ carga tras el rebuild (1-2 min)

## Contacto

- **Dirección:** Cra. 71 #30-11, Belén, Medellín
- **WhatsApp:** [+57 302 246 9542](https://wa.me/573022469542)
- **Horario:** Lun 8AM-6PM · Mar-Jue 8AM-9PM · Sáb 8AM-9PM
- **Instagram:** [@ppf_nano_polarizados](https://www.instagram.com/ppf_nano_polarizados/)
- **Facebook:** [ppf_nano_polarizados](https://www.facebook.com/403772080418525)

© 2026 CarFilms Estética Vehicular.
