/**
 * Deterministic, vivid gradients generated from an id — the fallback when an entity has no banner image.
 */

export interface ISeedGradient {
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
 * Seed → hex → bytes.
 * - Discord snowflakes (numeric) are converted to hex;
 * - UUIDs and other hex strings are used as is (dashes dropped);
 * - anything else falls back to char codes, so the function never throws.
 */
const toBytes = (seed: string): number[] => {
  let hex: string;
  if (/^\d+$/.test(seed)) {
    hex = BigInt(seed).toString(16);
  } else if (/^[0-9a-f-]+$/i.test(seed)) {
    hex = seed.replace(/-/g, '');
  } else {
    hex = Array.from(seed, (char) => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
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
 * Builds a stable gradient from an id (guild snowflake, user UUID…). The same id always gives the same
 * banner; neighbouring ids (snowflakes created close in time share their high bits) still differ,
 * because every byte feeds the seed and the result is avalanche-mixed.
 *
 * Colours are generated in HSL with a lightness floor (54%+) and high saturation, so the result is
 * always vivid and never close to black — no separate darkness check is needed.
 */
export const getSeedGradient = (seed: string): ISeedGradient => {
  const bytes = toBytes(seed);
  const hash = mix(bytes.reduce((acc, byte, index) => (Math.imul(acc, 31) + byte * (index + 1)) >>> 0, 2166136261));
  const pick = (shift: number) => (hash >>> shift) & 0xff;

  let hue = hash % (360 - SKIP_SIZE);
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
