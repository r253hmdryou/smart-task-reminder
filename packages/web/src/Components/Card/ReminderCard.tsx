import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { Button, Card, CardContent, Typography } from "@mui/material";

import { Reminder } from "@/Reducer/remindersReducer";
import { RemindersDispatchContext } from "@/Context";
import { reminderRepository } from "@smart-task-reminder/api-client";

function isOverdue(datetime: moment.Moment) {
  return datetime.isBefore();
}

function getColor(datetime: moment.Moment) {
  if (isOverdue(datetime)) {
    return "warning.main";
  }
  return "background.default";
}

type Props = {
  reminder: Reminder;
  onRemove?: (reminder: Reminder) => void;
};
export function ReminderCard(props: Props) {
  const { reminder } = props;
  const [color, setColor] = useState(getColor(reminder.datetime));
  const [refresh, setRefresh] = useState(0);
  const remindersDispatch = useContext(RemindersDispatchContext);

  useEffect(() => {
    if (isOverdue(reminder.datetime)) {
      return;
    }
    const timer = reminder.datetime.diff(moment(), "millisecond");
    setTimeout(() => {
      setRefresh((prev) => prev + 1);
    }, timer);
  }, []);

  useEffect(() => {
    setColor(getColor(reminder.datetime));
  }, [refresh, reminder.datetime]);

  function handleRemove() {
    reminderRepository.removeReminder(reminder.uuid).then(() => {
      remindersDispatch({ type: "REMOVE", payload: reminder.uuid });
      props.onRemove?.(reminder);
    });
  }

  return (
    <Card sx={{ backgroundColor: color }}>
      <CardContent>
        <Typography variant="h5">{reminder.title}</Typography>
        <Typography color="text.secondary">{reminder.datetime.format("YYYY/MM/DD HH:mm")}</Typography>
        <Typography>{reminder.description}</Typography>
        <Button onClick={handleRemove}>削除</Button>
      </CardContent>
    </Card>
  );
}
