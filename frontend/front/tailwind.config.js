/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Añade estas rutas si usas componentes en otras ubicaciones
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#6b7280',
          dark: '#4b5563',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Asegura que Inter esté cargado
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'), // Útil para contenido textual
    require('@tailwindcss/aspect-ratio'), // Para manejar aspect-ratio
  ],
}