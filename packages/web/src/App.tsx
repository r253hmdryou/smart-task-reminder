import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { Context } from "@/Context";
import { Router } from "@/Router";

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ja">
      <Context>
        <CssBaseline />
        <Router />
      </Context>
    </LocalizationProvider>
  );
}
