import { render, screen, fireEvent, act } from "@testing-library/react";
import { useContext } from "react";
import { vi } from 'vitest'

import { ThemeContext } from "./ThemeContext";
import { ThemeProvider } from "./ThemeProvider";

// Helpers

/** Minimal consumer that exposes context values via data-testids. */
function ThemeConsumer() {
  const { theme, toggleTheme, setTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        toggle
      </button>
      <button data-testid="set-light-btn" onClick={() => setTheme("light")}>
        set light
      </button>
      <button data-testid="set-dark-btn" onClick={() => setTheme("dark")}>
        set dark
      </button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>,
  );
}

// Mock helpers

function mockMatchMedia(prefersDark: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = [];

  const mql = {
    matches: prefersDark,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.push(cb);
    },
    removeEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(cb);
      if (idx !== -1) listeners.splice(idx, 1);
    },
  };

  vi.spyOn(window, "matchMedia").mockReturnValue(
    mql as unknown as MediaQueryList,
  );

  return { mql, listeners };
}

// Setup
beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove("dark");
  vi.restoreAllMocks();
});

// Tests
describe("ThemeProvider", () => {
  describe("initial theme", () => {
    test("defaults to light when OS preference is light and no stored value", () => {
      mockMatchMedia(false);
      renderWithProvider();
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    test("defaults to dark when OS preference is dark and no stored value", () => {
      mockMatchMedia(true);
      renderWithProvider();
      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    });

    test("uses stored 'light' value from localStorage regardless of OS preference", () => {
      localStorage.setItem("theme", "light");
      mockMatchMedia(true); // OS says dark, but stored override wins
      renderWithProvider();
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    test("uses stored 'dark' value from localStorage regardless of OS preference", () => {
      localStorage.setItem("theme", "dark");
      mockMatchMedia(false); // OS says light, but stored override wins
      renderWithProvider();
      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    });
  });

  describe("dark class on <html>", () => {
    test("adds 'dark' class to document.documentElement when theme is dark", () => {
      mockMatchMedia(true);
      renderWithProvider();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    test("removes 'dark' class from document.documentElement when theme is light", () => {
      document.documentElement.classList.add("dark");
      mockMatchMedia(false);
      renderWithProvider();
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  describe("toggleTheme", () => {
    test("switches from light to dark", () => {
      mockMatchMedia(false);
      renderWithProvider();
      fireEvent.click(screen.getByTestId("toggle-btn"));
      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    });

    test("switches from dark to light", () => {
      mockMatchMedia(true);
      renderWithProvider();
      fireEvent.click(screen.getByTestId("toggle-btn"));
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    test("persists new theme to localStorage", () => {
      mockMatchMedia(false);
      renderWithProvider();
      fireEvent.click(screen.getByTestId("toggle-btn"));
      expect(localStorage.getItem("theme")).toBe("dark");
    });
  });

  describe("setTheme", () => {
    test("sets theme to dark explicitly", () => {
      mockMatchMedia(false);
      renderWithProvider();
      fireEvent.click(screen.getByTestId("set-dark-btn"));
      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    });

    test("sets theme to light explicitly", () => {
      mockMatchMedia(true);
      renderWithProvider();
      fireEvent.click(screen.getByTestId("set-light-btn"));
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });
  });

  describe("localStorage persistence", () => {
    test("persists light theme to localStorage on render", () => {
      mockMatchMedia(false);
      renderWithProvider();
      expect(localStorage.getItem("theme")).toBe("light");
    });

    test("persists dark theme to localStorage on render", () => {
      mockMatchMedia(true);
      renderWithProvider();
      expect(localStorage.getItem("theme")).toBe("dark");
    });
  });

  describe("OS preference change listener", () => {
    test("updates theme when OS changes to dark and no stored preference", () => {
      const { listeners } = mockMatchMedia(false);
      renderWithProvider();
      localStorage.removeItem("theme");

      act(() => {
        listeners.forEach((cb) =>
          cb({ matches: true } as MediaQueryListEvent),
        );
      });

      expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    });

    test("updates theme when OS changes to light and no stored preference", () => {
      const { listeners } = mockMatchMedia(true);
      renderWithProvider();
      localStorage.removeItem("theme");

      act(() => {
        listeners.forEach((cb) =>
          cb({ matches: false } as MediaQueryListEvent),
        );
      });

      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });

    test("does not change theme when OS changes and stored preference exists", () => {
      const { listeners } = mockMatchMedia(false);
      localStorage.setItem("theme", "light");
      renderWithProvider();

      act(() => {
        listeners.forEach((cb) =>
          cb({ matches: true } as MediaQueryListEvent),
        );
      });

      // Stored preference should keep theme as light
      expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    });
  });
});
