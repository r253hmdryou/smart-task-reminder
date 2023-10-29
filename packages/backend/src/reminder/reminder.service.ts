import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Reminder } from '@prisma/client';

import { PrismaService } from '../vendors/prisma/prisma.service';
import { ReminderCreationDto, ReminderResponseDto } from './reminder.dto';

@Injectable()
export class ReminderService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async findAll(): Promise<Reminder[]> {
    return await this.prisma.reminder.findMany();
  }

  async findByUuid(uuid: string): Promise<Reminder> {
    return await this.prisma.reminder.findUnique({ where: { uuid } });
  }

  async create(creationDto: ReminderCreationDto): Promise<Reminder> {
    return await this.prisma.reminder.create({
      data: {
        ...creationDto,
        uuid: v4(),
        createdAt: new Date(),
      },
    });
  }

  async remove(reminder: Reminder): Promise<void> {
    await this.prisma.reminder.delete({ where: { uuid: reminder.uuid } });
  }

  toResponse(reminder: Reminder): ReminderResponseDto {
    return {
      uuid: reminder.uuid,
      title: reminder.title,
      description: reminder.description,
      datetime: reminder.datetime.toISOString(),
    };
  }
}
