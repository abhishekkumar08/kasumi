# Spacing

A **4px base on an 8px rhythm** — the grid Airbnb's design language, Material and
Apple's HIG all share. Every spacing value in the suite is a multiple of 4px.

| px  | Tailwind | Use                                                             |
| --- | -------- | --------------------------------------------------------------- |
| 4   | `1`      | icon ↔ label, chip vertical padding                             |
| 8   | `2`      | tight stacks, chip horizontal padding                           |
| 12  | `3`      | control vertical padding, small gaps                            |
| 16  | `4`      | control horizontal padding, default stack, page gutter (mobile) |
| 24  | `6`      | card padding, large stack                                       |
| 32  | `8`      | page gutter (desktop), group separation                         |
| 48  | `12`     | section padding                                                 |
| 64  | `16`     | page-level breathing room                                       |

This matches IBM Carbon's published scale.

**Not used:** half-steps (`1.5`, `2.5`, `3.5`) and `5` (20px). They sit between grid
stops, so spacing drifts. Pick the nearest scale value.
The one exception is `pl-*`/`pr-*` that reserves room for an icon inside an input;
that is sized to the icon, not to the rhythm.

## Semantic tokens

Prefer these in shared components — they state intent, and one edit in
`src/theme/spacing.js` re-spaces every app. They work with any spacing utility
(`p-card`, `gap-stack`, `py-section`, …).

| Token                             | px          | For                                |
| --------------------------------- | ----------- | ---------------------------------- |
| `chip-x` / `chip-y`               | 8 / 4       | badges, tags                       |
| `control-x` / `control-y`         | 16 / 12     | inputs, alerts                     |
| `card-sm` / `card`                | 16 / 24     | card padding                       |
| `stack-sm` / `stack` / `stack-lg` | 8 / 16 / 24 | gap between related blocks         |
| `gutter` / `gutter-lg`            | 16 / 32     | page side padding                  |
| `section`                         | 48          | vertical padding of a page section |

Touch targets stay at least 40–44px: a `py-3` control with 20px text is 44px.
