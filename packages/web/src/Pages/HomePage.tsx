import { useEffect, useState } from "react";
import { Box, Container, Grid, Tab, Tabs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { reminderRepository } from "@smart-task-reminder/api-client";

import { ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";
import { ReminderCardList } from "@/Components/List/ReminderCardList";
import { ReminderEntity } from "@/entity/Reminder";

export function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [reminders, setReminders] = useState<ReminderEntity[]>([]);

  async function refreshReminders() {
    const response =
      tab === 1
        ? await reminderRepository.getCompletedReminders()
        : await reminderRepository.getReminders();
    setReminders(response.data.map(ReminderEntity.fromApi));
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("tab") === "completed") {
      setTab(1);
      return;
    }
    setTab(0);
  }, [location.search]);

  useEffect(() => {
    refreshReminders();
  }, [tab]);

  function handleChangeTab(_event: React.SyntheticEvent, newValue: number) {
    switch (newValue) {
      case 1:
        navigate(`?tab=completed`);
        break;

      default:
        navigate(``);
    }
  }

  return (
    <Container sx={{ padding: "16px" }}>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <ReminderRegistrationForm onRegister={refreshReminders} />
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab} centered>
          <Tab label="リマインダー" />
          <Tab label="完了したリマインダー" />
        </Tabs>
      </Box>
      <ReminderCardList reminders={reminders} onRemove={refreshReminders} />
    </Container>
  );
}
