import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const element = document.getElementById("root");
if (element === null) {
  throw new Error("not found");
}

const root = createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
