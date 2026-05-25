import { z } from 'zod';

export const editTwitchAppSchema = z.object({
  name: z.string(),
  clientSecret: z.string(),
  webhookSecret: z.string().optional(),
  type: z.string(),
});

export type TEditTwitchAppForm = z.infer<typeof editTwitchAppSchema>;
