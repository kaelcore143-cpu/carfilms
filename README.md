# Carfilms Estética Vehicular

Sitio web optimizado para Carfilms Estética Vehicular - Especialistas en polarizado, cerámico, detailing y vinilado de vehículos en Medellín.

## 🚀 Características

- **Optimización de rendimiento**: Videos con lazy loading y control de reproducción
- **Mobile-first**: Diseño responsivo optimizado para móviles
- **SEO optimizado**: Meta tags, structured data y sitemap
- **Seguridad**: Headers de seguridad y validaciones
- **Accesibilidad**: ARIA labels y semántica HTML5

## 📁 Estructura del Proyecto

```
carfilms.com/
├── index.html          # Página principal
├── style.css           # Estilos optimizados
├── script.js           # JavaScript con optimizaciones
├── assets/             # Recursos estáticos
│   ├── videos/         # Videos de background
│   └── img/           # Imágenes
├── .htaccess          # Configuración de servidor
├── robots.txt         # Directivas para crawlers
├── sitemap.xml        # Mapa del sitio
└── README.md          # Este archivo
```

## 🌐 Despliegue en GitHub Pages

### Método 1: Desde rama main/master

1. Sube todos los archivos a tu repositorio GitHub
2. Ve a **Settings** > **Pages**
3. En **Source**, selecciona **Deploy from a branch**
4. Elige la rama **main** (o master) y carpeta **/(root)**
5. Haz clic en **Save**

### Método 2: Desde GitHub Actions

Crea el archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Pages
      uses: actions/configure-pages@v3
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: '.'
        
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v2
```

## 🔧 Configuración de Dominio Personalizado

1. Ve a **Settings** > **Pages** > **Custom domain**
2. Ingresa: `carfilms.com.co`
3. Configura estos registros DNS:

```
Tipo A: @ -> 185.199.108.153
Tipo A: @ -> 185.199.109.153
Tipo A: @ -> 185.199.110.153
Tipo A: @ -> 185.199.111.153
CNAME: www -> carfilms-com-co.github.io
```

## 🛡️ Seguridad Implementada

- **Content Security Policy**: Previene XSS y ataques de inyección
- **Headers de seguridad**: X-Frame-Options, X-Content-Type-Options
- **HTTPS forzado**: Redirección automática a HTTPS
- **Validación de dominio**: Protección contra hotlinking

## 📈 SEO Optimizado

- **Meta tags completos**: Title, description, keywords
- **Open Graph**: Para compartir en redes sociales
- **Twitter Cards**: Optimizado para Twitter
- **Structured Data**: Schema.org para motores de búsqueda
- **Sitemap.xml**: Mapa del sitio para crawlers
- **Robots.txt**: Directivas para indexación

## ⚡ Optimización de Rendimiento

- **Lazy loading**: Videos solo cuando son visibles
- **Intersection Observer**: Control eficiente de recursos
- **RequestAnimationFrame**: Animaciones optimizadas
- **Memory management**: Limpieza de recursos
- **Performance monitoring**: Detección automática de bajo rendimiento

## 📱 Mobile Optimizations

- **Mobile-first CSS**: Prioridad a dispositivos móviles
- **Touch-friendly**: Botones y navegación optimizados
- **Reduced animations**: Menor consumo de batería
- **Optimized videos**: Playback rate reducido en móvil

## 🐛 Solución de Problemas Comunes

### Videos no se reproducen en GitHub Pages
- Los videos deben estar en formato MP4
- Asegúrate que los archivos no excedan 25MB
- Verifica que las rutas sean relativas: `assets/videos/video.mp4`

### Problemas de seguridad
- GitHub Pages no soporta `.htaccess`
- Los headers de seguridad se implementan via meta tags
- HTTPS es automático en GitHub Pages

### SEO no funciona
- Verifica el sitemap.xml en `https://username.github.io/sitemap.xml`
- Confirma el robots.txt en `https://username.github.io/robots.txt`
- Usa Google Search Console para verificar indexación

## 📞 Contacto

- **Teléfono**: +57 302 246 9542
- **WhatsApp**: https://wa.me/573022469542
- **Dirección**: Carrera 70 #30a-156, Belén Rosales, Medellín
- **Facebook**: https://www.facebook.com/nanoceramicaypolarizados/

## 📄 Licencia

Este proyecto es propiedad de Carfilms Estética Vehicular 
