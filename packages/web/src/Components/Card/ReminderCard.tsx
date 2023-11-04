import { useEffect, useState } from "react";
import moment from "moment";
import { Button, Card, CardContent, Typography } from "@mui/material";

import { ReminderEntity, ReminderStatus } from "@/entity/Reminder";

function getColor(status: ReminderStatus) {
  if (status === "completed") {
    return "text.disabled";
  }
  if (status === "overdue") {
    return "warning.main";
  }
  return "background.default";
}

type Props = {
  reminder: ReminderEntity;
  onRemove?: (reminder: ReminderEntity) => void;
  onComplete?: (reminder: ReminderEntity) => void;
};
export function ReminderCard(props: Props) {
  const { reminder } = props;
  const [color, setColor] = useState(getColor(reminder.status));
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (reminder.isOverdue()) {
      return;
    }
    const timer = reminder.datetime.diff(moment(), "millisecond");
    setTimeout(() => {
      setRefresh((prev) => prev + 1);
    }, timer);
  }, []);

  useEffect(() => {
    setColor(getColor(reminder.status));
  }, [refresh, reminder.datetime]);

  function handleRemove() {
    reminder.remove().then(() => {
      props.onRemove?.(reminder);
    });
  }

  function handleComplete() {
    reminder.complete().then(() => {
      props.onComplete?.(reminder);
    });
  }

  return (
    <Card sx={{ backgroundColor: color }}>
      <CardContent>
        <Typography variant="h5">{reminder.title}</Typography>
        <Typography color="text.secondary">
          {reminder.datetime.format("YYYY/MM/DD HH:mm")}
        </Typography>
        <Typography>{reminder.description}</Typography>
        <Button onClick={handleRemove}>削除</Button>
        {reminder.status !== "completed" && <Button onClick={handleComplete}>完了</Button>}
      </CardContent>
    </Card>
  );
}
