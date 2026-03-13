import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#44A194",
      light: "#69fce8",
      dark: "#2F7A6D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#537D96",
      light: "#6A96B0",
      dark: "#3D5A72",
      contrastText: "#fff",
    },
    background: {
      default: "transparent",
      paper: "rgba(255, 255, 255, 0.1)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#6B7280",
      disabled: "#d3d3d3",
    },
    error: {
      main: "#EF4444",
      light: "#FCA5A5",
      dark: "#991B1B",
    },
    warning: {
      main: "#F59E0B",
      light: "#FCD34D",
      dark: "#92400E",
    },
    success: {
      main: "#10B981",
      light: "#6EE7B7",
      dark: "#065F46",
    },
    info: {
      main: "#3B82F6",
      light: "#93C5FD",
      dark: "#1E40AF",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      color: "#1F2937",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.0078em",
      color: "#1F2937",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      letterSpacing: "0em",
      color: "#1F2937",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0.0125em",
      color: "#1F2937",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: "0em",
      color: "#1F2937",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "0.0125em",
      color: "#1F2937",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      letterSpacing: "0.03125em",
      lineHeight: 1.5,
      color: "#374151",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      letterSpacing: "0.0178571429em",
      lineHeight: 1.57,
      color: "#4B5563",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "0.03125em",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.0333333333em",
      color: "#6B7280",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 24px",
          borderRadius: "8px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
          },
        },
        contained: {
          boxShadow: "0 4px 15px rgba(68, 161, 148, 0.3)",
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
        },
        elevation0: {
          backgroundColor: "transparent",
          boxShadow: "none",
          backdropFilter: "none",
          border: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: "#E5E7EB",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "#44A194",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#44A194",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#6B7280",
            "&.Mui-focused": {
              color: "#44A194",
            },
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          "&.glass-box": {
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
          },
        },
      },
    },
  },
});

export const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "#000",
    borderRadius: 2,
    "& fieldset": {
      borderWidth: 2,
      borderColor: "primary.main",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#44A194" },
  //placeholder color
  "& .MuiInputBase-input::placeholder": { color: "#000" },
};

export default theme;
