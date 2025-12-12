/** @type {import('tailwindcss').Config} */
module.exports = {
  // JIT está activado por defecto en Tailwind v3+/v4
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Paleta oficial Basílica de Los Ángeles
        primary: '#1F2A44',        // Azul principal
        primaryDark: '#2F3D6E',    // Azul secundario
        'accent-gold': '#936626',  // Dorado acento
        neutralGray: '#727F84',    // Gris medio
        background: '#F5F5F7',     // Fondo claro
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        // Tipografías oficiales
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        script: ['Great Vibes', 'cursive'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
