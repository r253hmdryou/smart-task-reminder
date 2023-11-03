import { useContext, useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { reminderRepository } from "@smart-task-reminder/api-client";

import { RemindersContext, RemindersDispatchContext } from "@/Context";
import { ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";
import { ReminderCardList } from "@/Components/List/ReminderCardList";

export function HomePage() {
  const reminders = useContext(RemindersContext);
  const remindersDispatch = useContext(RemindersDispatchContext);
  const location = useLocation();
  const [tab, setTab] = useState("default");

  async function refreshReminders() {
    const response =
      tab === "completed"
        ? await reminderRepository.getCompletedReminders()
        : await reminderRepository.getReminders();
    remindersDispatch({
      type: "REFRESH",
      payload: response.data,
    });
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setTab(query.get("tab") || "default");
  }, [location.search]);

  useEffect(() => {
    refreshReminders();
  }, [tab]);

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
