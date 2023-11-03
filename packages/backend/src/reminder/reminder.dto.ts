import { createZodDto } from "nestjs-zod";
import { ReminderCreationSchema, ReminderResponseSchema } from "@smart-task-reminder/common";

export class ReminderResponseDto extends createZodDto(ReminderResponseSchema) {}

export class ReminderCreationDto extends createZodDto(ReminderCreationSchema) {}
