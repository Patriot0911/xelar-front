import { z } from 'zod';
import { TwitchStreamerEvent, NotificationCostType } from '@/lib/constants/notifications';

export const addNotificationSchema = z.object({
  type: z.enum(['bot', 'webhook']),
  broadcasterId: z.string().min(1, 'Broadcaster ID is required'),
  event: z.nativeEnum(TwitchStreamerEvent),
  costType: z.nativeEnum(NotificationCostType),
  channelId: z.string().optional(),
  webhookUrl: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.type === 'bot' && !data.channelId?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Channel ID is required',
      path: ['channelId'],
    });
  }
  if (data.type === 'webhook' && !data.webhookUrl?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Webhook URL is required',
      path: ['webhookUrl'],
    });
  }
});

export type TAddNotificationForm = z.infer<typeof addNotificationSchema>;
