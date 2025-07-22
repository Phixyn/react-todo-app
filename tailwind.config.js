module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkmode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundimage: theme => ({
        "todo-header-day": "url('/src/header-day.jpg')",
        "todo-header-afternoon": "url('/src/header-afternoon.jpg')",
        "todo-header-night": "url('/src/header-night.jpg')",
      })
    },
  },
  variants: {
    extend: {
      borderwidth: ['hover', 'focus', 'focus-within'],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      useformclasses: true,
    })
  ],
};
