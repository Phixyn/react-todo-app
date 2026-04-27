import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from 'vitest'

import { ThemeContext } from "../context/ThemeContext";
import type { ThemeState } from "../context/ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

// Helpers

function renderWithTheme(overrides: Partial<ThemeState> = {}) {
  const toggleTheme = vi.fn();
  const setTheme = vi.fn();

  const context: ThemeState = {
    theme: "light",
    toggleTheme,
    setTheme,
    ...overrides,
  };

  render(
    <ThemeContext.Provider value={context}>
      <ThemeSwitcher />
    </ThemeContext.Provider>,
  );

  return { toggleTheme, setTheme };
}

// Tests
describe("ThemeSwitcher", () => {
  test("renders a button", () => {
    renderWithTheme();
    expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
  });

  describe("in light mode", () => {
    test("has aria-label to switch to dark theme", () => {
      renderWithTheme({ theme: "light" });
      expect(screen.getByTestId("theme-switcher")).toHaveAttribute(
        "aria-label",
        "Switch to dark theme",
      );
    });

    test("calls toggleTheme when clicked", () => {
      const { toggleTheme } = renderWithTheme({ theme: "light" });
      fireEvent.click(screen.getByTestId("theme-switcher"));
      expect(toggleTheme).toHaveBeenCalledTimes(1);
    });
  });

  describe("in dark mode", () => {
    test("has aria-label to switch to light theme", () => {
      renderWithTheme({ theme: "dark" });
      expect(screen.getByTestId("theme-switcher")).toHaveAttribute(
        "aria-label",
        "Switch to light theme",
      );
    });

    test("calls toggleTheme when clicked", () => {
      const { toggleTheme } = renderWithTheme({ theme: "dark" });
      fireEvent.click(screen.getByTestId("theme-switcher"));
      expect(toggleTheme).toHaveBeenCalledTimes(1);
    });
  });
});
