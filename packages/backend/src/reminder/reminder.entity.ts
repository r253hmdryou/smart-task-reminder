import { v4 } from "uuid";
import { ReminderCreationDto, ReminderResponseDto } from "./reminder.dto";
import { Reminder } from "@prisma/client";
import { ReminderCore } from "@smart-task-reminder/common";

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
      throw new Error("property is undefined");
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
    return false;
  }

  static factory(properties: ReminderCreationDto): ReminderEntity {
    return new ReminderEntity({
      ...properties,
      datetime: new Date(properties.datetime),

      uuid: v4(),
      createdAt: new Date(),
      completedAt: null,
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
    let completedAt: string | null = null;
    if (this.properties.completedAt !== null) {
      completedAt = this.properties.completedAt.toISOString();
    }
    return {
      uuid: this.properties.uuid,
      title: this.properties.title,
      description: this.properties.description,
      datetime: this.properties.datetime.toISOString(),
      createdAt: this.properties.createdAt.toISOString(),
      completedAt: completedAt,
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

  get completedAt(): Date | null {
    return this.properties.completedAt;
  }

  complete(): void {
    this.properties.completedAt = new Date();
  }

  uncomplete(): void {
    this.properties.completedAt = null;
  }
}
