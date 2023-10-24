import React from "react";
import { createRoot } from "react-dom/client";

const element = document.getElementById("root");
if (element === null) {
  throw new Error("not found");
}

const root = createRoot(element);
root.render(<React.StrictMode>Hello World.</React.StrictMode>);
