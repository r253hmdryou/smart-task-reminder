import { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";

import { RemindersContext, RemindersDispatchContext } from "@/Context";
import { ReminderCreation, ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";
import { ReminderCardList } from "@/Components/List/ReminderCardList";
import { ReminderResponse } from "@/Reducer/remindersReducer";

export function HomePage() {
  const reminders = useContext(RemindersContext);
  const remindersDispatch = useContext(RemindersDispatchContext);

  async function refreshReminders() {
    axios.get<ReminderResponse[]>("http://localhost:3000/reminders").then((response) => {
      remindersDispatch({
        type: "REFRESH",
        payload: response.data,
      });
    });
  }

  useEffect(() => {
    refreshReminders();
  }, []);

  async function handleAddReminder(reminder: ReminderCreation) {
    axios.post<ReminderResponse>("http://localhost:3000/reminders", reminder).then((response) => {
      remindersDispatch({
        type: "ADD",
        payload: response.data,
      });
      refreshReminders();
    });
  }

  return (
    <Container sx={{ padding: "16px" }}>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <ReminderRegistrationForm onSubmit={handleAddReminder} />
        </Grid>
      </Grid>
      <ReminderCardList reminders={reminders} />
    </Container>
  );
}
