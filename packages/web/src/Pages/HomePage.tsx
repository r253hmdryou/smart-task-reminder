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
  const [tab, setTab] = useState<null | number>(null);
  const [reminders, setReminders] = useState<ReminderEntity[]>([]);

  async function getReminders() {
    switch (tab) {
      case 0:
        return await reminderRepository.getReminders();
      case 1:
        return await reminderRepository.getCompletedReminders();
      case null:
        return { data: [] };
      default:
        return await reminderRepository.getReminders();
    }
  }

  async function refreshReminders() {
    const response = await getReminders();
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
        <Tabs value={tab || 0} onChange={handleChangeTab} centered>
          <Tab label="リマインダー" />
          <Tab label="完了したリマインダー" />
        </Tabs>
      </Box>
      <ReminderCardList
        reminders={reminders}
        onRemove={refreshReminders}
        onComplete={refreshReminders}
        onUncomplete={refreshReminders}
      />
    </Container>
  );
}
