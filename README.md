# Basílica de Nuestra Señora de los Ángeles – Sitio Web

Aplicación construida con Astro + Tailwind CSS para compartir la historia, arquitectura y devoción alrededor de la Basílica de Los Ángeles en Cartago.

## 📋 Requisitos

- Node.js **20.18.0+** y npm **10.0.0+** (verifica con `node --version` y `npm --version`).
- Se recomienda usar NVM/nvm-windows para gestionar versiones (`nvm install 20.18.0 && nvm use 20.18.0`).

## 🚀 Puesta en marcha

```bash
git clone <repository-url>
cd Web-Site-TCU
npm install
npm run dev   # Servidor en http://localhost:4321

npm run build   # Compila a ./dist
npm run preview # Sirve el build generado
```

## 🧱 Estructura principal

```text
src/
├── components/
│   ├── Footer.astro
│   ├── IconGallery.astro
│   ├── Navbar.astro
│   └── SiteIcon.astro
├── layouts/
│   └── MainLayout.astro
├── pages/
│   ├── arquitectura.astro
│   ├── index.astro
│   ├── virgen-de-los-angeles.astro
│   └── styleguide/icons.astro
└── styles/
	└── global.css

public/
├── assets/ (imágenes de la Basílica)
└── favicon.ico
```

## 🛠️ Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga rápida |
| `npm run build` | Build optimizado listo para publicar |
| `npm run preview` | Sirve el build localmente |
| `npm run astro` | Acceso directo al CLI de Astro |

## 🧩 Stack y utilidades

- **Astro 5** como meta-framework estático.
- **Tailwind CSS 4** (modo `@theme`) para la paleta oficial.
- **astro-icon** + `@iconify-json/ph` para los iconos del sitio.
- Estilos globales definidos en `src/styles/global.css` con las fuentes y colores institucionales.

## 📚 Recursos útiles

- [Documentación de Astro](https://docs.astro.build/)
- [Tailwind CSS](https://tailwindcss.com/docs)
