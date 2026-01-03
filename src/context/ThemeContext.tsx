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
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode === "dark" || savedMode === "light") {
      setMode(savedMode);
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
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
            main: mode === "light" ? "#000000" : "#ffffff",
          },
          secondary: {
            main: mode === "light" ? "#666666" : "#999999",
          },
          background: {
            default: mode === "light" ? "#ffffff" : "#000000",
            paper: mode === "light" ? "#fafafa" : "#0a0a0a",
          },
          text: {
            primary: mode === "light" ? "#000000" : "#ffffff",
            secondary: mode === "light" ? "#666666" : "#999999",
          },
        },
        shape: {
          borderRadius: 0,
        },
        typography: {
          fontFamily:
            '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          h4: {
            fontWeight: 300,
            letterSpacing: "-0.02em",
          },
          h6: {
            fontWeight: 400,
            letterSpacing: "-0.01em",
          },
          button: {
            textTransform: "none",
            fontWeight: 500,
            letterSpacing: "0.02em",
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                padding: "12px 32px",
                fontSize: "14px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              },
              contained: {
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              },
              outlined: {
                borderWidth: "1px",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(4px)",
                  },
                  "&.Mui-focused": {
                    transform: "translateX(4px)",
                  },
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                boxShadow: "none",
                border:
                  mode === "light" ? "1px solid #e0e0e0" : "1px solid #1a1a1a",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                boxShadow: "none",
                border:
                  mode === "light" ? "1px solid #e0e0e0" : "1px solid #1a1a1a",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 0,
              },
            },
          },
          MuiStepper: {
            styleOverrides: {
              root: {
                padding: "24px 0",
              },
            },
          },
          MuiStepLabel: {
            styleOverrides: {
              label: {
                fontSize: "13px",
                letterSpacing: "0.05em",
              },
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
