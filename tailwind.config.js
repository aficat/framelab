/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pastel-lavender': '#E6D9F2',
        'pastel-beige': '#F5E6D3',
        'pastel-pink': '#FFE5F1',
        'pastel-mint': '#E0F2E9',
        'genz-purple': '#B19CD9',
        'genz-blue': '#A8D5E2',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        'playful': '2rem',
      },
    },
  },
  plugins: [],
}

