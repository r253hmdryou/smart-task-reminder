import { useContext, useReducer, useState } from "react";
import moment from "moment";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { Button, Stack, TextField } from "@mui/material";
import { DateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { ReminderCreationSchema } from "@smart-task-reminder/common";

import { RemindersDispatchContext } from "@/Context";
import { getNextRounded30Minutes } from "@/libs/utils";
import { isValidationError, isZodError } from "@/libs/error";

export type ReminderCreation = {
  title: string;
  description: string;
  isEditing: boolean;
  datetime: moment.Moment | null;
};

type Action =
  | {
      type: "change";
      payload: Partial<ReminderCreation>;
      callback?: (reminder: ReminderCreation) => void;
    }
  | {
      type: "reset";
    };

const initialReminder: ReminderCreation = {
  title: "",
  description: "",
  isEditing: false,
  datetime: null,
};

function reducer(state: ReminderCreation, action: Action) {
  switch (action.type) {
    case "change": {
      const newState = {
        ...state,
        isEditing: true,
        datetime: state.isEditing ? state.datetime : getNextRounded30Minutes(moment().add(30, "minutes")),
        ...action.payload,
      };
      if (action.callback) {
        action.callback(newState);
      }
      return newState;
    }

    case "reset":
      return initialReminder;
  }
}

type Props = {
  onRegister: () => void;
};
export function ReminderRegistrationForm(props: Props) {
  const [reminder, dispatch] = useReducer(reducer, initialReminder);
  const [error, setError] = useState<z.ZodIssue[]>([]);
  const remindersDispatch = useContext(RemindersDispatchContext);

  function handleChangeDate(newValue: moment.Moment | null) {
    dispatch({
      type: "change",
      payload: {
        datetime: newValue,
      },
    });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    dispatch({
      type: "change",
      payload: {
        [name]: value,
      },
      callback: (reminder) => {
        if (isInvalid(error, name)) {
          validation(reminder);
        }
      },
    });
  }

  function validation(reminder: ReminderCreation) {
    try {
      ReminderCreationSchema.parse({
        ...reminder,
        datetime: reminder.datetime?.toISOString(),
      });
      setError([]);
    } catch (err) {
      if (!isZodError(err)) {
        throw err;
      }
      setError(err.issues);
      return false;
    }
    return true;
  }

  async function handleRegister() {
    if (!validation(reminder)) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/v1/reminders", reminder);
      remindersDispatch({
        type: "ADD",
        payload: response.data,
      });
      props.onRegister();
      dispatch({ type: "reset" });
      setError([]);
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        throw err;
      }
      if (err.response === undefined) {
        throw err;
      }
      const errorResponse = err.response.data;
      if (!isValidationError(errorResponse)) {
        throw err;
      }
      setError(errorResponse.errors);
    }
  }

  function isInvalid(error: z.ZodIssue[], name: string) {
    return error.some((e) => e.path[0] === name);
  }

  function findError(error: z.ZodIssue[], name: string) {
    return error.find((e) => e.path[0] === name);
  }

  return (
    <Stack spacing={1}>
      <TextField
        name="title"
        label="新規リマインダー"
        variant="outlined"
        error={isInvalid(error, "title")}
        helperText={findError(error, "title")?.message}
        fullWidth
        value={reminder.title}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="説明"
        variant="outlined"
        error={isInvalid(error, "description")}
        helperText={findError(error, "description")?.message}
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
