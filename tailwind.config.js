module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        "todo-header-day": "url('/src/header-day.jpg')",
        "todo-header-afternoon": "url('/src/header-afternoon.jpg')",
        "todo-header-night": "url('/src/header-night.jpg')",
      })
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover', 'focus', 'focus-within'],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      useFormClasses: true,
    })
  ],
};
