import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#0D50FF",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#282828",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#282828",
      secondary: "#8B8B8B",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
