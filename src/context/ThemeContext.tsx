import { createContext } from "react";

export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const initialThemeState: ThemeState = {
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
} satisfies ThemeState;

export const ThemeContext = createContext<ThemeState>(initialThemeState);
