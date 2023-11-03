import { Injectable, NotFoundException } from "@nestjs/common";

import { PrismaService } from "../vendors/prisma/prisma.service";
import { ReminderCreationDto } from "./reminder.dto";
import { ReminderEntity } from "./reminder.entity";

@Injectable()
export class ReminderService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return "Hello World!";
  }

  async findAll(): Promise<ReminderEntity[]> {
    const models = await this.prisma.reminder.findMany({
      where: {
        completedAt: null,
      },
    });
    return models.map((model) => {
      return ReminderEntity.fromPrisma(model);
    });
  }

  async findAllCompleted(): Promise<ReminderEntity[]> {
    const models = await this.prisma.reminder.findMany({
      where: {
        completedAt: {
          not: null,
        },
      },
    });
    return models.map((model) => {
      return ReminderEntity.fromPrisma(model);
    });
  }

  async findByUuid(uuid: string): Promise<ReminderEntity> {
    const reminder = await this.prisma.reminder.findUnique({ where: { uuid } });
    if (reminder === null) {
      throw new NotFoundException("リマインダーが見つかりません");
    }
    return ReminderEntity.fromPrisma(reminder);
  }

  async create(creationDto: ReminderCreationDto): Promise<ReminderEntity> {
    const reminder = ReminderEntity.factory(creationDto);
    return await this.save(reminder);
  }

  async save(reminder: ReminderEntity): Promise<ReminderEntity> {
    if (reminder.isRemoved) {
      await this.prisma.reminder.delete({ where: { uuid: reminder.uuid } });
      return reminder;
    }
    const model = await this.prisma.reminder.upsert({
      where: {
        uuid: reminder.uuid,
      },
      update: reminder.toPrisma(),
      create: reminder.toPrisma(),
    });
    return ReminderEntity.fromPrisma(model);
  }
}
