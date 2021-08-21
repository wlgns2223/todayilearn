import React, { createContext, useState, useContext, useCallback } from "react";
import { lightMode, darkMode } from "../theme/colorScheme";
import { ThemeProvider } from "styled-components";

const ThemeContext = createContext();

function ThemeComponent({ children }) {
  const localTheme = localStorage.getItem("color-theme") || "light";
  const [themeMode, setThemeMode] = useState(localTheme);
  const themeObj = themeMode === "light" ? lightMode : darkMode;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={themeObj}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  const { themeMode, setThemeMode } = context;
  const toggleTheme = useCallback(() => {
    if (themeMode === "light") {
      setThemeMode("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      setThemeMode("light");
      localStorage.setItem("color-theme", "light");
    }
  }, [themeMode]);

  return [themeMode, toggleTheme];
}

export { ThemeComponent, useTheme };
