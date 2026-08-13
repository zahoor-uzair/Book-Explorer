"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { ReactNode } from "react";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#263A5B",
      light: "#4A6288",
      dark: "#18263D",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#B7793E",
      light: "#D39A5E",
      dark: "#8A5428",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F7F4EE",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#1F2937",
      secondary: "#667085",
    },

    divider: "#E7E2D8",
  },

  typography: {
    fontFamily: "var(--font-geist-sans)",

    h1: {
      fontWeight: 800,
      letterSpacing: "-0.035em",
    },

    h2: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },

    h3: {
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },

    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background:
            "linear-gradient(135deg, #1E2F4A 0%, #263A5B 60%, #304766 100%)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E7E2D8",
          boxShadow: "0 4px 20px rgba(38, 58, 91, 0.06)",
          borderRadius: 16,
          transition: "all 0.2s ease",

          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 30px rgba(38, 58, 91, 0.12)",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "9px 18px",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 12,

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#B8C2D1",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#263A5B",
            borderWidth: 2,
          },
        },

        notchedOutline: {
          borderColor: "#DED9CF",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default function MuiProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
