import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="transition duration-200 ease-in-out text-white hover:text-gray-200 focus:outline-none text-xl p-2 rounded-full"
      data-testid="theme-switcher"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
