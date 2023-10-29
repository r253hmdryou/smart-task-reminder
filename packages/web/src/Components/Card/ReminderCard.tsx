import { useEffect, useState } from "react";
import moment from "moment";
import { Card, CardContent, Typography } from "@mui/material";

import { Reminder } from "@/Reducer/remindersReducer";

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
};
export function ReminderCard(props: Props) {
  const { reminder } = props;
  const [color, setColor] = useState(getColor(reminder.datetime));
  const [refresh, setRefresh] = useState(0);

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

  return (
    <Card sx={{ backgroundColor: color }}>
      <CardContent>
        <Typography variant="h5">{reminder.title}</Typography>
        <Typography color="text.secondary">{reminder.datetime.format("YYYY/MM/DD HH:mm")}</Typography>
        <Typography>{reminder.description}</Typography>
      </CardContent>
    </Card>
  );
}
