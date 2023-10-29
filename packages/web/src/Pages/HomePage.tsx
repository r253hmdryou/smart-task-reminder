import { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { reminderRepository } from "@smart-task-reminder/api-client";

import { RemindersContext, RemindersDispatchContext } from "@/Context";
import { ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";
import { ReminderCardList } from "@/Components/List/ReminderCardList";

export function HomePage() {
  const reminders = useContext(RemindersContext);
  const remindersDispatch = useContext(RemindersDispatchContext);

  async function refreshReminders() {
    reminderRepository.getReminders().then((response) => {
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
      <ReminderCardList reminders={reminders} onRemove={refreshReminders} />
    </Container>
  );
}
