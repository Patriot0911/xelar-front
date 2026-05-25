import { z } from 'zod';

export const twitchAppSchema = z.object({
  clientId: z.string(),
  name: z.string(),
  clientSecret: z.string(),
  webhookSecret: z.string().optional(),
});

export type TTwitchAppForm = z.infer<typeof twitchAppSchema>;
