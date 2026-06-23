import type { TEditNotificationForm } from './edit-notification.scheme';

export const EDIT_DEFAULT_VALUES: TEditNotificationForm = {
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
  embedAuthorName:    '',
  embedAuthorUrl:     '',
  embedAuthorIconUrl: '',
  embedFooterText:    '',
  embedFooterIconUrl: '',
  embedTimestamp:     false,
  embedFields:        [],
};

export const parsePayloadToFormValues = (
  payload: unknown,
): Pick<
  TEditNotificationForm,
  | 'content' | 'username' | 'avatarUrl'
  | 'embedEnabled' | 'embedTitle' | 'embedDescription'
  | 'embedColorEnabled' | 'embedColor' | 'embedUrl'
  | 'embedAuthorName' | 'embedAuthorUrl' | 'embedAuthorIconUrl'
  | 'embedThumbnailUrl' | 'embedImageUrl'
  | 'embedFooterText' | 'embedFooterIconUrl'
  | 'embedTimestamp' | 'embedFields'
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
    embedAuthorName:    '',
    embedAuthorUrl:     '',
    embedAuthorIconUrl: '',
    embedThumbnailUrl: '',
    embedImageUrl:     '',
    embedFooterText:   '',
    embedFooterIconUrl: '',
    embedTimestamp:    false,
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

    const author = embed.author as Record<string, unknown> | null | undefined;
    if (typeof author?.name === 'string')     base.embedAuthorName    = author.name;
    if (typeof author?.url === 'string')      base.embedAuthorUrl     = author.url;
    if (typeof author?.icon_url === 'string') base.embedAuthorIconUrl = author.icon_url;

    const footer = embed.footer as Record<string, unknown> | null | undefined;
    if (typeof footer?.text === 'string')     base.embedFooterText    = footer.text;
    if (typeof footer?.icon_url === 'string') base.embedFooterIconUrl = footer.icon_url;

    if (typeof embed.timestamp === 'string' && embed.timestamp.length > 0) base.embedTimestamp = true;

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
