import { z } from "zod";

const ReminderCoreSchema = z.object({
  id: z.bigint().optional(),
  uuid: z.string().uuid(),
  title: z
    .string()
    .min(1, "リマインダータイトルを1文字以上入力してください")
    .max(255, "リマインダータイトルは255文字以内で入力してください"),
  description: z.string().min(0).max(255),
  datetime: z.date(),
  createdAt: z.date(),
  completedAt: z.date().nullable(),
});
export type ReminderCore = z.infer<typeof ReminderCoreSchema>;

export const ReminderResponseSchema = ReminderCoreSchema.extend({
  datetime: z.string().datetime(),
  createdAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
}).omit({
  id: true,
});
export type ReminderResponse = z.infer<typeof ReminderResponseSchema>;

export const ReminderCreationSchema = ReminderCoreSchema.extend({
  datetime: z.string().datetime(),
}).omit({
  id: true,
  uuid: true,
  createdAt: true,
  completedAt: true,
});
export type ReminderCreation = z.infer<typeof ReminderCreationSchema>;
