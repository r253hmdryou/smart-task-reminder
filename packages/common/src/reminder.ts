import { z } from "zod";

const ReminderCoreSchema = z.object({
  uuid: z.string().uuid(),
  title: z
    .string()
    .min(1, "リマインダータイトルを1文字以上入力してください")
    .max(255, "リマインダータイトルは255文字以内で入力してください"),
  description: z.string().min(0).max(255),
  datetime: z.string().datetime(),
});

export const ReminderResponseSchema = ReminderCoreSchema;
export type ReminderResponse = z.infer<typeof ReminderResponseSchema>;

export const ReminderCreationSchema = ReminderCoreSchema.omit({
  uuid: true,
});
export type ReminderCreation = z.infer<typeof ReminderCreationSchema>;
