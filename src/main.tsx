import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import { ThemeProvider } from "./components/theme-provider";
import "./global.css";
import Layout from "./layout";
import { generateBoard } from "./lib/game/algorithms";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <App />
      </Layout>
    </ThemeProvider>
  </StrictMode>
);
generateBoard(10, 10, 10);
