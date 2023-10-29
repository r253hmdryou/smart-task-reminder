import { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";

import { RemindersContext, RemindersDispatchContext } from "@/Context";
import { ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";
import { ReminderCardList } from "@/Components/List/ReminderCardList";

export function HomePage() {
  const reminders = useContext(RemindersContext);
  const remindersDispatch = useContext(RemindersDispatchContext);

  async function refreshReminders() {
    axios.get("http://localhost:3000/v1/reminders").then((response) => {
      remindersDispatch({
        type: "REFRESH",
        payload: response.data,
      });
    });
  }

  useEffect(() => {
    refreshReminders();
  }, []);

  return (
    <Container sx={{ padding: "16px" }}>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <ReminderRegistrationForm onRegister={refreshReminders} />
        </Grid>
      </Grid>
      <ReminderCardList reminders={reminders} />
    </Container>
  );
}
