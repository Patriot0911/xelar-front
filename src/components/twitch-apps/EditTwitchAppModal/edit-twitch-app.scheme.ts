import { TwitchAppStatus } from '@/lib/constants/twitch-app-status';
import { z } from 'zod';

export const editTwitchAppSchema = z.object({
  name: z.string(),
  clientSecret: z.string().optional(),
  webhookSecret: z.string().optional(),
  status: z.nativeEnum(TwitchAppStatus),
});

export type TEditTwitchAppForm = z.infer<typeof editTwitchAppSchema>;
