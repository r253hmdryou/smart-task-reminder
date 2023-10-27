import { useState } from "react";
import moment from "moment";
import { v4 } from "uuid";
import { Container, Grid } from "@mui/material";

import { ReminderCreation, ReminderRegistrationForm } from "@/Components/Form/ReminderRegistrationForm";
import { ReminderCardList } from "@/Components/List/ReminderCardList";

export type Reminder = {
  uuid: string;
  title: string;
  description: string;
  datetime: moment.Moment | null;
};

export function HomePage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      uuid: "e68233f5-21bd-4dab-821d-04a587d7bb5a",
      title: "さんちゃんのご飯",
      description: "さんちゃんにご飯を上げる",
      datetime: moment("2023-10-27T19:00:00+09:00"),
    },
  ]);

  function handleAddReminder(reminder: ReminderCreation) {
    setReminders((reminders) => [
      ...reminders,
      {
        ...reminder,
        uuid: v4(),
      },
    ]);
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
