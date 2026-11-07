/**
 * Spacing: a 4px base on an 8px rhythm — the same system Airbnb's DLS, Material
 * and Apple's HIG converge on. Every value is a multiple of 4px.
 *
 *   scale (px)   0  1  2  4  8  12  16  24  32  40  48  64
 *   tailwind     0 px 0.5 1  2   3   4   6   8  10  12  16
 *
 * Matches IBM Carbon's scale. Half-steps (1.5, 2.5, 3.5) and 20px (5) fall
 * between stops and are not used; reach for the nearest scale value instead.
 *
 * The semantic names below say what the space is *for*, so a component states
 * intent (`p-card`) rather than a number, and one edit here re-spaces the suite.
 */
const rem = (px) => `${px / 16}rem`;

export const spacingScale = [0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64];

export const semanticSpacing = {
  "chip-x": rem(8),
  "chip-y": rem(4),
  "control-x": rem(16),
  "control-y": rem(12),
  "card-sm": rem(16),
  card: rem(24),
  "stack-sm": rem(8),
  stack: rem(16),
  "stack-lg": rem(24),
  gutter: rem(16),
  "gutter-lg": rem(32),
  section: rem(48),
};
