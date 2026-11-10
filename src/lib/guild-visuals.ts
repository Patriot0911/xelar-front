/**
 * Discord CDN URLs for guild images. The fallback banner gradient lives in `lib/seed-gradient.ts`.
 */

const DISCORD_CDN = 'https://cdn.discordapp.com';

type TCdnSize = 64 | 128 | 256 | 512 | 1024 | 2048;

const imageExt = (hash: string) => (hash.startsWith('a_') ? 'gif' : 'png');

export const getGuildIconUrl = (guildId: string, icon: string | null, size: TCdnSize = 128): string | null =>
  icon ? `${DISCORD_CDN}/icons/${guildId}/${icon}.${imageExt(icon)}?size=${size}` : null;

export const getGuildBannerUrl = (guildId: string, banner: string | null, size: TCdnSize = 1024): string | null =>
  banner ? `${DISCORD_CDN}/banners/${guildId}/${banner}.${imageExt(banner)}?size=${size}` : null;
