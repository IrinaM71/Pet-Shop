import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import ScrollToTop from "./ui/scrollToTop/ScrollToTop.jsx";
import store from "./redux/store.js";
import theme from "./theme/theme.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
