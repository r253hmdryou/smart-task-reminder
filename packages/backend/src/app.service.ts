import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

export type Reminder = {
  uuid: string;
  title: string;
  description: string;
  datetime: string;
};

type ReminderCreation = {
  title: string;
  description: string;
  datetime: string;
};

const reminders = [
  {
    uuid: 'e68233f5-21bd-4dab-821d-04a587d7bb5a',
    title: 'さんちゃんのご飯',
    description: 'さんちゃんにご飯を上げる',
    datetime: new Date('2023-10-27T19:00:00+09:00').toISOString(),
  },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getReminders(): Reminder[] {
    return reminders;
  }

  postReminders(reminder: ReminderCreation): Reminder {
    const newReminder = {
      ...reminder,
      uuid: v4(),
    };
    reminders.push(newReminder);
    return newReminder;
  }
}
