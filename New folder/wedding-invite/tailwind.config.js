   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           'ivory': '#FFFFF0',
           'rose-gold': '#B76E79',
           'gold': '#D4AF37',
           'pastel-pink': '#F8E1E9',
         },
         fontFamily: {
           'elegant': ['Playfair Display', 'serif'],
           'serif': ['Lora', 'serif'],
         },
         animation: {
           'falling': 'falling 3s linear infinite',
         },
         keyframes: {
           falling: {
             '0%': { transform: 'translateY(-100vh) rotate(0deg)' },
             '100%': { transform: 'translateY(100vh) rotate(360deg)' },
           },
         },
       },
     },
     plugins: [],
   }
   