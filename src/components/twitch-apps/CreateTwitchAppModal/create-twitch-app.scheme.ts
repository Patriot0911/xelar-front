import { z } from 'zod';

export const createTwitchAppSchema = z.object({
  clientId: z.string(),
  name: z.string(),
  clientSecret: z.string(),
  webhookSecret: z.string().optional(),
  type: z.string(),
});

export type TCreateTwitchAppForm = z.infer<typeof createTwitchAppSchema>;
