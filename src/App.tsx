import { Container, CssBaseline, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ja">
      <CssBaseline />
      <Container sx={{ padding: "16px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={6}>
            <ReminderRegistrationForm
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
