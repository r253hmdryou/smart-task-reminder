import { useReducer } from "react";
import moment from "moment";
import { ReminderResponse } from "@smart-task-reminder/common";

export type Reminder = {
  uuid: string;
  title: string;
  description: string;
  datetime: moment.Moment;
};

export type ReminderAction =
  | {
      type: "ADD";
      payload: ReminderResponse;
    }
  | {
      type: "REFRESH";
      payload: ReminderResponse[];
    };

export const reminderInitialState: Reminder[] = [];

function reducer(state: Reminder[], action: ReminderAction): Reminder[] {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          ...action.payload,
          datetime: moment(action.payload.datetime),
        },
      ];

    case "REFRESH":
      return action.payload.map((reminder) => ({
        ...reminder,
        datetime: moment(reminder.datetime),
      }));
  }
}

export function useReminderReducer() {
  return useReducer(reducer, reminderInitialState);
}
