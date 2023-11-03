import { Grid } from "@mui/material";

import { ReminderCard } from "@/Components/Card/ReminderCard";
import { ReminderEntity } from "@/entity/Reminder";

type Props = {
  reminders: ReminderEntity[];
  onRemove?: (reminder: ReminderEntity) => void;
};
export function ReminderCardList(props: Props) {
  const ReminderCardList = props.reminders.map((reminder) => {
    return (
      <Grid item key={reminder.uuid}>
        <ReminderCard reminder={reminder} onRemove={props.onRemove} />
      </Grid>
    );
  });
  return <Grid container>{ReminderCardList}</Grid>;
}
