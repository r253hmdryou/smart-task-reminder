import { Grid } from "@mui/material";

import { ReminderCard } from "@/Components/Card/ReminderCard";
import { Reminder } from "@/Reducer/remindersReducer";

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
