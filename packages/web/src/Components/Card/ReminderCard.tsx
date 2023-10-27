import { Card, CardContent, Typography } from "@mui/material";
import { Reminder } from "@/Reducer/remindersReducer";

type Props = {
  reminder: Reminder;
};
export function ReminderCard(props: Props) {
  const { reminder } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{reminder.title}</Typography>
        <Typography color="text.secondary">{reminder.datetime?.format("YYYY/MM/DD HH:mm")}</Typography>
        <Typography>{reminder.description}</Typography>
      </CardContent>
    </Card>
  );
}
