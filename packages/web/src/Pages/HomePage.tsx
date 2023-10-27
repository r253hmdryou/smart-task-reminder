import { useContext } from "react";
import { Container, Grid } from "@mui/material";

import { RemindersContext, RemindersDispatchContext } from "@/Context";
import { ReminderCreation, ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";
import { ReminderCardList } from "@/Components/List/ReminderCardList";

export function HomePage() {
  const reminders = useContext(RemindersContext);
  const remindersDispatch = useContext(RemindersDispatchContext);

  function handleAddReminder(reminder: ReminderCreation) {
    remindersDispatch({
      type: "add",
      payload: reminder,
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
