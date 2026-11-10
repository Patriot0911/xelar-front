/**
 * Visual helpers for Discord guilds: CDN URLs and a deterministic fallback banner gradient.
 */

const DISCORD_CDN = 'https://cdn.discordapp.com';

type TCdnSize = 64 | 128 | 256 | 512 | 1024 | 2048;

const imageExt = (hash: string) => (hash.startsWith('a_') ? 'gif' : 'png');

export const getGuildIconUrl = (guildId: string, icon: string | null, size: TCdnSize = 128): string | null =>
  icon ? `${DISCORD_CDN}/icons/${guildId}/${icon}.${imageExt(icon)}?size=${size}` : null;

export const getGuildBannerUrl = (guildId: string, banner: string | null, size: TCdnSize = 1024): string | null =>
  banner ? `${DISCORD_CDN}/banners/${guildId}/${banner}.${imageExt(banner)}?size=${size}` : null;

export interface IGuildGradient {
  /** Three analogous colours, light enough to never read as black. */
  colors: [string, string, string];
  angle: number;
  /** Ready-to-use `background` value. */
  css: string;
}

/*
 * Hues skipped when picking the base colour: 45°–95° is the olive / mustard band where saturated
 * colours turn muddy, and next to violet or red it produces the "brown" look we want to avoid.
 */
const SKIP_FROM = 45;
const SKIP_SIZE = 50;

/** Total hue spread of the three colours stays small, so a gradient never mixes e.g. red, green and brown. */
const MIN_SPREAD = 22;
const MAX_SPREAD = 48;

/**
 * Snowflake → hex → bytes. Discord ids are numeric; anything else falls back to char codes so the
 * function never throws.
 */
const toBytes = (id: string): number[] => {
  let hex: string;
  try {
    hex = BigInt(id).toString(16);
  } catch {
    hex = Array.from(id, (char) => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
  }
  if (hex.length % 2) hex = `0${hex}`;
  return (hex.match(/../g) ?? ['00']).map((pair) => parseInt(pair, 16));
};

/** MurmurHash3 finaliser: spreads a one-byte difference in the id over every bit of the seed. */
const mix = (value: number): number => {
  let h = value;
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
};

/**
 * Builds a stable gradient from the guild id. The same id always gives the same banner; neighbouring
 * ids (created close in time share the high snowflake bits) still differ, because every byte feeds the seed.
 *
 * Colours are generated in HSL with a lightness floor (54%+) and high saturation, so the result is
 * always vivid and never close to black — no separate darkness check is needed.
 */
export const getGuildGradient = (guildId: string): IGuildGradient => {
  const bytes = toBytes(guildId);
  const seed = mix(bytes.reduce((acc, byte, index) => (Math.imul(acc, 31) + byte * (index + 1)) >>> 0, 2166136261));
  const pick = (shift: number) => (seed >>> shift) & 0xff;

  let hue = seed % (360 - SKIP_SIZE);
  if (hue >= SKIP_FROM) hue += SKIP_SIZE;

  const spread = MIN_SPREAD + (pick(8) % (MAX_SPREAD - MIN_SPREAD + 1));
  const saturation = 78 + (pick(16) % 15); // 78–92%
  const lightness = 56 + (pick(24) % 8); // 56–63%
  const angle = 115 + (pick(4) % 60); // 115–174°

  const hsl = (h: number, l: number) => `hsl(${Math.round((h + 360) % 360)} ${saturation}% ${l}%)`;
  const colors: [string, string, string] = [
    hsl(hue - spread / 2, lightness + 2),
    hsl(hue, lightness - 4),
    hsl(hue + spread / 2, lightness - 2),
  ];

  return {
    colors,
    angle,
    css: `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 52%, ${colors[2]} 100%)`,
  };
};
