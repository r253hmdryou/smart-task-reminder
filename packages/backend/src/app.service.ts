import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { ReminderCreationDto, ReminderResponseDto } from './app.dto';

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

  async getReminders(): Promise<ReminderResponseDto[]> {
    return reminders;
  }

  async postReminders(
    reminder: ReminderCreationDto,
  ): Promise<ReminderResponseDto> {
    const newReminder = {
      ...reminder,
      uuid: v4(),
    };
    reminders.push(newReminder);
    return newReminder;
  }
}
