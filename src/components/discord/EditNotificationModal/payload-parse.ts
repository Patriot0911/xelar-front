import type { TEditNotificationForm } from './edit-notification.scheme';
import { NotificationCostType } from '@/lib/constants/notifications';

export const EDIT_DEFAULT_VALUES: TEditNotificationForm = {
  costType:          NotificationCostType.Personal,
  channelId:         '',
  webhookUrl:        '',
  content:           '',
  username:          '',
  avatarUrl:         '',
  embedEnabled:      false,
  embedTitle:        '',
  embedDescription:  '',
  embedColorEnabled: false,
  embedColor:        '#5865F2',
  embedUrl:          '',
  embedThumbnailUrl: '',
  embedImageUrl:     '',
  embedFooterText:   '',
  embedFields:       [],
};

export const parsePayloadToFormValues = (
  payload: unknown,
): Pick<
  TEditNotificationForm,
  | 'content' | 'username' | 'avatarUrl'
  | 'embedEnabled' | 'embedTitle' | 'embedDescription'
  | 'embedColorEnabled' | 'embedColor' | 'embedUrl'
  | 'embedThumbnailUrl' | 'embedImageUrl' | 'embedFooterText' | 'embedFields'
> => {
  const base = {
    content:           '',
    username:          '',
    avatarUrl:         '',
    embedEnabled:      false,
    embedTitle:        '',
    embedDescription:  '',
    embedColorEnabled: false,
    embedColor:        '#5865F2',
    embedUrl:          '',
    embedThumbnailUrl: '',
    embedImageUrl:     '',
    embedFooterText:   '',
    embedFields:       [] as TEditNotificationForm['embedFields'],
  };

  if (!payload || typeof payload !== 'object') return base;
  const p = payload as Record<string, unknown>;

  if (typeof p.content === 'string') base.content   = p.content;
  if (typeof p.username === 'string') base.username  = p.username;
  if (typeof p.avatar_url === 'string') base.avatarUrl = p.avatar_url;

  const embeds = Array.isArray(p.embeds) ? p.embeds : [];
  const embed  = embeds.length > 0 ? (embeds[0] as Record<string, unknown>) : null;

  if (embed) {
    base.embedEnabled = true;
    if (typeof embed.title === 'string')       base.embedTitle       = embed.title;
    if (typeof embed.description === 'string') base.embedDescription = embed.description;
    if (typeof embed.url === 'string')         base.embedUrl         = embed.url;

    if (typeof embed.color === 'number') {
      base.embedColorEnabled = true;
      base.embedColor        = '#' + embed.color.toString(16).padStart(6, '0');
    }

    const thumb = embed.thumbnail as Record<string, unknown> | null | undefined;
    if (typeof thumb?.url === 'string') base.embedThumbnailUrl = thumb.url;

    const img = embed.image as Record<string, unknown> | null | undefined;
    if (typeof img?.url === 'string') base.embedImageUrl = img.url;

    const footer = embed.footer as Record<string, unknown> | null | undefined;
    if (typeof footer?.text === 'string') base.embedFooterText = footer.text;

    if (Array.isArray(embed.fields)) {
      base.embedFields = embed.fields.map((f: any) => ({
        name:   typeof f.name  === 'string' ? f.name  : '',
        value:  typeof f.value === 'string' ? f.value : '',
        inline: !!f.inline,
      }));
    }
  }

  return base;
};
