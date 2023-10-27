import { Dispatch, createContext } from "react";
import { ReminderAction, reminderInitialState, useReminderReducer } from "@/Reducer/remindersReducer";

export const RemindersContext = createContext(reminderInitialState);
export const RemindersDispatchContext = createContext<Dispatch<ReminderAction>>(() => {});

export function Context(props: { children: React.ReactNode }) {
  const [reminder, dispatch] = useReminderReducer();
  return (
    <RemindersContext.Provider value={reminder}>
      <RemindersDispatchContext.Provider value={dispatch}>{props.children}</RemindersDispatchContext.Provider>
    </RemindersContext.Provider>
  );
}
