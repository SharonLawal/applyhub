/**
 * Theme Context & Provider
 * * Manages the application's color mode (Light/Dark).
 * * Features:
 * - Persists user preference to localStorage.
 * - customized Material UI theme configuration (Palette, Typography, Components).
 * * Usage:
 * const { mode, toggleColorMode } = useColorMode();
 */

import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import type { PaletteMode } from "@mui/material";

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as PaletteMode;
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "light" ? "#2563eb" : "#3b82f6",
            light: mode === "light" ? "#60a5fa" : "#60a5fa",
            dark: mode === "light" ? "#1e40af" : "#1d4ed8",
          },
          secondary: {
            main: "#10b981",
          },
          background: {
            default: mode === "light" ? "#f0f9ff" : "#0f172a",
            paper: mode === "light" ? "#ffffff" : "#1e293b",
          },
          text: {
            primary: mode === "light" ? "#0f172a" : "#f8fafc",
            secondary: mode === "light" ? "#475569" : "#94a3b8",
          },
          error: {
            main: "#ef4444",
          },
          success: {
            main: "#10b981",
          },
        },
        shape: { borderRadius: 12 },
        typography: {
          fontFamily: '"Inter", "SF Pro Display", -apple-system, sans-serif',
          h4: { fontWeight: 600, letterSpacing: "-0.02em" },
          button: { textTransform: "none", fontWeight: 600 },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                boxShadow: "none",
                "&:hover": { boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: { backgroundImage: "none" },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
