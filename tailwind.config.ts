import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand palette — warm, formal, slightly funky
        charcoal: '#1a1a1a',
        ink: '#0e0e0e',
        chalk: '#f5f2eb',
        cream: '#faf8f3',
        sand: '#e8e4db',
        warm: '#d4cfc4',
        
        // Accent spectrum
        coral: '#e8553d',
        vermillion: '#c4392b',
        amber: '#e6940a',
        teal: '#1a9e8f',
        cyan: '#2bc4c4',
        lime: '#8cc63f',
        
        // Legacy compat (admin pages use these)
        black: '#000000',
        prussian: '#14213d',
        orange: '#e8553d',
        alabaster: '#e5e5e5',
        white: '#ffffff',
        dark: '#1a1a1a',
        'dark-secondary': '#2a2a2a',
        accent: '#e8553d',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        poppins: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 6rem)',
        'display': 'clamp(2rem, 5vw, 4rem)',
        'section': 'clamp(1.5rem, 4vw, 2.5rem)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
