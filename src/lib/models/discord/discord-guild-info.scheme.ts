import { z } from 'zod';
import type { IDiscordGuildInfoModel } from './discord-guild-info.model';

/**
 * A statistic that may be missing or malformed: it degrades to `null` instead of failing the page.
 * Numeric strings are accepted (Postgres decimals arrive as "12.5"); `null`/`undefined` stay `null`, not 0.
 */
const optionalCount = z
  .preprocess((value) => (value === null || value === undefined || value === '' ? null : Number(value)), z.number().finite().nullable())
  .catch(null);

/**
 * Identity fields are required (without them the page is meaningless → `contract` error);
 * everything decorative or statistical degrades gracefully.
 */
export const guildInfoResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().nullable().catch(null),
  banner: z.string().nullable().catch(null),
  owner: z.boolean().catch(false),
  permissions: z.string().catch('0'),
  features: z.array(z.string()).catch([]),
  hasBot: z.boolean().catch(true),
  managerPermission: z.string().nullable().catch(null),
  memberCount: optionalCount,
  presenceCount: optionalCount,
  balance: optionalCount,
  notificationCount: optionalCount,
  botNotificationCount: optionalCount,
  webhookNotificationCount: optionalCount,
  subscriptionCount: optionalCount,
}) satisfies z.ZodType<IDiscordGuildInfoModel>;
