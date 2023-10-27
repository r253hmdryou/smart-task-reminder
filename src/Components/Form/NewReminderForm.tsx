import { useReducer } from "react";
import moment from "moment";
import { Button, Stack, TextField } from "@mui/material";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";

import { getNextRounded30Minutes } from "@/libs/utils";

type Reminder = {
  title: string;
  description: string;
  isEditing: boolean;
  datetime: moment.Moment | null;
};

type Action =
  | {
      type: "change";
      state: Partial<Reminder>;
    }
  | {
      type: "reset";
    };

const initialReminder: Reminder = {
  title: "",
  description: "",
  isEditing: false,
  datetime: null,
};

function reducer(state: Reminder, action: Action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        isEditing: true,
        datetime: state.isEditing ? state.datetime : getNextRounded30Minutes(moment().add(30, "minutes")),
        ...action.state,
      };

    case "reset":
      return initialReminder;
  }
}

type Props = {
  onSubmit: (reminder: Reminder) => void;
};

export function NewReminderForm(props: Props) {
  const [reminder, dispatch] = useReducer(reducer, initialReminder);

  function handleChangeDate(newValue: moment.Moment | null) {
    dispatch({
      type: "change",
      state: {
        datetime: newValue,
      },
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "change",
      state: {
        [event.target.name]: event.target.value,
      },
    });
  }

  function handleRegister() {
    props.onSubmit(reminder);
    dispatch({ type: "reset" });
  }

  return (
    <Stack spacing={1}>
      <TextField
        name="title"
        label="新規リマインダー"
        variant="outlined"
        fullWidth
        value={reminder.title}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="説明"
        variant="outlined"
        multiline
        fullWidth
        value={reminder.description}
        onChange={handleChange}
      />
      <DateTimePicker
        ampm={false}
        value={reminder.datetime}
        onChange={handleChangeDate}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
        登録
      </Button>
    </Stack>
  );
}
