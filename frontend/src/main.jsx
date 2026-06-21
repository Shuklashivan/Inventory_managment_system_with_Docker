import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/inter";

import theme from "./theme/theme";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <App />
      </AuthProvider>

    </ThemeProvider>
  </StrictMode>
);