import { z } from 'zod';

const embedFieldSchema = z.object({
  name:   z.string().min(1, 'Field name is required').max(256),
  value:  z.string().min(1, 'Field value is required').max(1024),
  inline: z.boolean(),
});

export const editNotificationSchema = z.object({
  // bot only
  channelId:         z.string().optional(),
  // webhook only
  webhookUrl:        z.string().optional(),
  // Payload — base
  content:           z.string().max(2000).optional(),
  // Payload — webhook-only
  username:          z.string().max(80).optional(),
  avatarUrl:         z.string().optional(),
  // Payload — embed
  embedEnabled:      z.boolean(),
  embedTitle:        z.string().max(256).optional(),
  embedDescription:  z.string().max(4096).optional(),
  embedColorEnabled: z.boolean(),
  embedColor:        z.string().optional(),
  embedUrl:          z.string().optional(),
  embedThumbnailUrl: z.string().optional(),
  embedImageUrl:     z.string().optional(),
  embedFooterText:   z.string().max(2048).optional(),
  embedFields:       z.array(embedFieldSchema),
}).superRefine((data, ctx) => {
  if (!data.content?.trim() && !data.embedEnabled) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Message content or embed is required',
      path: ['content'],
    });
  }
  if (data.embedEnabled) {
    const hasTitle  = !!data.embedTitle?.trim();
    const hasDesc   = !!data.embedDescription?.trim();
    const hasFields = (data.embedFields?.length ?? 0) > 0;
    if (!hasTitle && !hasDesc && !hasFields) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Embed must have a title, description, or at least one field',
        path: ['embedTitle'],
      });
    }
  }
});

export type TEditNotificationForm = z.infer<typeof editNotificationSchema>;
