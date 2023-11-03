import moment from "moment";
import { ReminderResponseDto, reminderRepository } from "@smart-task-reminder/api-client";

type Reminder = {
  uuid: string;
  title: string;
  description: string;
  datetime: moment.Moment;
  completedAt: moment.Moment | null;
};

export type ReminderStatus = "completed" | "overdue" | "scheduled";

export class ReminderEntity {
  private properties: Reminder;
  constructor(properties: Reminder) {
    this.properties = properties;
  }

  static fromApi(reminder: ReminderResponseDto) {
    let completedAt = null;
    if (reminder.completedAt !== null) {
      completedAt = moment(reminder.completedAt);
    }

    return new ReminderEntity({
      uuid: reminder.uuid,
      title: reminder.title,
      description: reminder.description,
      datetime: moment(reminder.datetime),
      completedAt: completedAt,
    });
  }

  isOverdue() {
    return this.properties.datetime.isBefore();
  }

  get status(): ReminderStatus {
    if (this.isCompleted()) {
      return "completed";
    }
    if (this.isOverdue()) {
      return "overdue";
    }
    return "scheduled";
  }

  private isCompleted() {
    return this.properties.completedAt !== null;
  }

  async remove() {
    await reminderRepository.removeReminder(this.properties.uuid);
  }

  async complete() {
    await reminderRepository.completeReminder(this.properties.uuid);
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

  get datetime(): moment.Moment {
    return this.properties.datetime;
  }
}
