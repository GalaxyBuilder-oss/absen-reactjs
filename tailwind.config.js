/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'skew-anim': 'skew-anim 0.5s ease-in-out infinite', // Nama animasi: definisi animasi
        'fade-in': 'fade-in .5s linear', // Nama animasi: definisi animasi
      },
      keyframes: {
        'skew-anim': {
          '0%, 100%': { transform: 'none' },
          '30%': { transform: 'skewX(2deg)' }, // Adjust the skew as needed
          '40%': { transform: 'skewX(1deg)' }, // Adjust the skew as needed
          '60%': { transform: 'skewX(-2deg)' }, // Adjust the skew as needed
          '70%': { transform: 'skewX(-1deg)', filter : "drop-shadow(10px, black)" }, // Adjust the skew as needed
        },
        'fade-in' : {
          '0%' : { opacity: '0'},
          '100%' : { opacity: '1' },
        }
      },
    },
  },
  plugins: [
    "@tailwindcss/typography",
    "@tailwindcss/forms",
  ],
}

