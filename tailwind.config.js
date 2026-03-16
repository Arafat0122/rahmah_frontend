/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated Accessible Palette for Rahmah Institute
        primary: {
          DEFAULT: '#1D779E', // Accessible Blue
          light: '#29AAE3',   // Use ONLY for icons/backgrounds (not text)
        },
        secondary: {
          DEFAULT: '#557A24', // Accessible Green
          light: '#8CC63E',   // Use ONLY for decorative elements
        },
        tertiary: '#F4F1DE',   // Sand (Good for backgrounds)
        accent: '#8A6E2E',     // Accessible Gold

        // Deep tones for maximum readability
        'text-main': '#1A1A1A', // Avoid pure black to reduce eye strain
        'text-muted': '#4B5563', // Standard gray that passes WAVE
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
        serif: ['Gelasio', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}