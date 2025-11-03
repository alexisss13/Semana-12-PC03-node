import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ✅ ESTA ES LA SECCIÓN CORRECTA
      colors: {
        'toyverse-blue': '#6EC1E4',
        'toyverse-yellow': '#FFD166',
        'toyverse-orange': '#F4A261',
        'toyverse-deep-blue': '#264653',
        'toyverse-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Asegúrate de que Poppins esté en layout.tsx
      },
    },
  },
  plugins: [],
}
export default config