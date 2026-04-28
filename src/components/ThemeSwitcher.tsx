import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="ui-icon-button ui-icon-button--hero rounded-full p-2 text-xl md:text-2xl"
      data-testid="theme-switcher"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
