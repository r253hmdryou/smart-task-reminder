import { useReducer } from "react";
import moment from "moment";

import { ReminderCreation } from "@/Components/Form/ReminderRegistrationForm";
import { v4 } from "uuid";

export type Reminder = {
  uuid: string;
  title: string;
  description: string;
  datetime: moment.Moment | null;
};

export type ReminderAction = {
  type: "add";
  payload: ReminderCreation;
};

export const reminderInitialState: Reminder[] = [
  {
    uuid: "e68233f5-21bd-4dab-821d-04a587d7bb5a",
    title: "さんちゃんのご飯",
    description: "さんちゃんにご飯を上げる",
    datetime: moment("2023-10-27T19:00:00+09:00"),
  },
];

function reducer(state: Reminder[], action: ReminderAction): Reminder[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          ...action.payload,
          uuid: v4(),
        },
      ];
  }
}

export function useReminderReducer() {
  return useReducer(reducer, reminderInitialState);
}
