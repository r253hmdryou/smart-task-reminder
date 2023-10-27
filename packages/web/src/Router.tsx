import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@/Pages/HomePage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
