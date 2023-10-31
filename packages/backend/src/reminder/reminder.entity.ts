import { v4 } from 'uuid';
import { ReminderCore } from '../../../common/dist/reminder';
import { ReminderCreationDto, ReminderResponseDto } from './reminder.dto';
import { Reminder } from '@prisma/client';

interface PropertiesCore extends ReminderCore {
  isRemoved?: boolean;
}

export class ReminderEntity {
  protected readonly properties: PropertiesCore;

  constructor(properties: PropertiesCore) {
    this.properties = properties;
  }

  getOptionalProperty<T>(property: T | undefined): T {
    if (property === undefined) {
      throw new Error('property is undefined');
    }
    return property;
  }

  remove(): void {
    this.properties.isRemoved = true;
  }

  get isRemoved(): boolean {
    if (this.properties.isRemoved) {
      return true;
    }
  }

  static factory(properties: ReminderCreationDto): ReminderEntity {
    return new ReminderEntity({
      ...properties,
      datetime: new Date(properties.datetime),

      uuid: v4(),
      createdAt: new Date(),
    });
  }

  static fromPrisma(reminder: Reminder) {
    return new ReminderEntity({
      id: BigInt(reminder.id),
      uuid: reminder.uuid,
      title: reminder.title,
      description: reminder.description,
      datetime: reminder.datetime,
      createdAt: reminder.createdAt,
      completedAt: reminder.completedAt,
    });
  }

  toPrisma() {
    return {
      uuid: this.properties.uuid,
      title: this.properties.title,
      description: this.properties.description,
      datetime: this.properties.datetime,
      createdAt: this.properties.createdAt,
      completedAt: this.properties.completedAt,
    };
  }

  toResponse(): ReminderResponseDto {
    return {
      uuid: this.properties.uuid,
      title: this.properties.title,
      description: this.properties.description,
      datetime: this.properties.datetime.toISOString(),
      createdAt: this.properties.createdAt.toISOString(),
      completedAt: this.properties.completedAt?.toISOString(),
    };
  }

  get id(): bigint {
    return this.getOptionalProperty(this.properties.id);
  }

  get uuid(): string {
    return this.properties.uuid;
  }

  get title(): string {
    return this.properties.title;
  }

  get description(): string {
    return this.properties.description;
  }

  get datetime(): Date {
    return this.properties.datetime;
  }

  get createdAt(): Date {
    return this.properties.createdAt;
  }

  get completedAt(): Date | undefined {
    return this.properties.completedAt;
  }

  complete(): void {
    this.properties.completedAt = new Date();
  }
}
