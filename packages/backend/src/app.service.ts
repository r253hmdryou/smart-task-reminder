import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Reminder } from '@prisma/client';

import { PrismaService } from './vendors/prisma/prisma.service';
import { ReminderCreationDto, ReminderResponseDto } from './app.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getReminders(): Promise<ReminderResponseDto[]> {
    const reminders = await this.prisma.reminder.findMany();
    return reminders.map(this.toResponse);
  }

  async postReminders(
    creationDto: ReminderCreationDto,
  ): Promise<ReminderResponseDto> {
    const reminder = await this.prisma.reminder.create({
      data: {
        ...creationDto,
        uuid: v4(),
        createdAt: new Date(),
      },
    });
    return this.toResponse(reminder);
  }

  private toResponse(reminder: Reminder): ReminderResponseDto {
    return {
      uuid: reminder.uuid,
      title: reminder.title,
      description: reminder.description,
      datetime: reminder.datetime.toISOString(),
    };
  }
}
