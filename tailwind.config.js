/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        starken: {
          green: '#009D4E',
          'green-dark': '#016E31',
          'green-light': '#E6F5EC',
          purple: '#551A8B',
          'purple-dark': '#3E1B6B',
          'purple-light': '#F3E8FF',
          teal: '#2D7282',
          'teal-dark': '#16424C',
          'teal-light': '#EBF3F5',
          orange: '#F97316',
          'orange-dark': '#EA580C',
          'orange-light': '#FFF7ED',
          'text-dark': '#303030',
          'text-muted': '#64748B',
          'bg-light': '#F8FAFC',
          border: '#E2E8F0',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        title: ['"DIN 2014"', '"DIN Alternate"', '"DIN Condensed"', 'DIN', 'sans-serif'],
        sans: ['Nunito', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'badge': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        'starken-sm': '0 2px 4px rgba(0,0,0,0.05)',
        'starken-md': '0 4px 12px rgba(0,0,0,0.08)',
        'starken-lg': '0 12px 24px rgba(0,0,0,0.12)',
        'starken-glow': '0 10px 30px -10px rgba(0, 157, 78, 0.35)',
      }
    },
  },
  plugins: [],
}
