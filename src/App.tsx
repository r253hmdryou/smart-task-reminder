import { Container, CssBaseline, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { NewReminderForm } from "@/Components/Form/NewReminderForm";

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ja">
      <CssBaseline />
      <Container sx={{ padding: "16px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <NewReminderForm
              onSubmit={(reminder) => {
                console.log(reminder);
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
}
