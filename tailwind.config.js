/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", 
    "./pages/**/*.{js,jsx,ts,tsx}",   
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs: '480px',  
      sm: '640px',  
      md: '768px',  
      lg: '1024px', 
      xl: '1280px', 
      '2xl': '1536px', 
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          dark: "rgb(var(--color-primary-dark))",
        },
        black: "rgb(var(--color-black))",
        white: "rgb(var(--color-white))",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
     
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      
      keyframes: {
        moveText: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      boxShadow: {
        'primary': '0 4px 10px rgba(26, 82, 118, 0.2)',
        'header': '0 3px 10px rgba(26, 82, 118, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2980B9, #1A5276)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, 
  },
}
