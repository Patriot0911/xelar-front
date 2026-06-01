import { z } from 'zod';

export const createTwitchAppSchema = z.object({
  clientId: z.string().min(8),
  name: z.string(),
  clientSecret: z.string().min(8),
  webhookSecret: z.string().optional(),
  type: z.string(),
});

export type TCreateTwitchAppForm = z.infer<typeof createTwitchAppSchema>;
