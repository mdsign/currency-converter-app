import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <header></header>
    <main>
      <App />
    </main>
    <footer></footer>
  </StrictMode>
);
