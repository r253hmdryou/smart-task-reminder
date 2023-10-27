import { Grid } from "@mui/material";

import { Reminder } from "@/Pages/HomePage";
import { ReminderCard } from "@/Components/Card/ReminderCard";

type Props = {
  reminders: Reminder[];
};
export function ReminderCardList(props: Props) {
  const ReminderCardList = props.reminders.map((reminder) => {
    return (
      <Grid item key={reminder.uuid}>
        <ReminderCard reminder={reminder} />
      </Grid>
    );
  });
  return <Grid container>{ReminderCardList}</Grid>;
}
