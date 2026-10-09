/**
 * Design tokens — the single source of truth for the site's visual language.
 *
 * These mirror the CSS variables in `app/globals.css` (`:root`). When you add
 * a new color or font, add it in BOTH places so CSS and JS stay in sync.
 *
 * RULE: new components must import from here instead of hard-coding hex
 * values. That is what makes the theme reusable and re-skinnable.
 */

export const colors = {
  bg: '#080a06',
  bgCard: '#0d1009',
  bgSecondary: '#111609',
  border: '#1e2818',
  borderLight: '#2a3820',
  gold: '#d4a017',
  goldLight: '#e8b84b',
  red: '#8b1a1a',
  redLight: '#c0362b',
  green: '#2d4a1e',
  greenLight: '#3d6428',
  textPrimary: '#e8e0d0',
  textSecondary: '#a09880',
  textMuted: '#5a5448',
} as const;

/** Category accent colors, shared by blog cards, tool pages and badges. */
export const categoryColors: Record<string, string> = {
  'tribute-guides': '#d4a017',
  'analysis': '#70a0e8',
  'strategy': '#e87070',
  'game-recaps': '#e8a030',
  'district-profiles': '#70c870',
  'rankings': '#c070e8',
};

export const fonts = {
  heading: "'Cinzel', Georgia, serif",
  ui: "'Oswald', sans-serif",
  body: "'Source Sans 3', sans-serif",
} as const;

export const radii = {
  sm: '3px',
  md: '6px',
  lg: '8px',
  xl: '10px',
  round: '50%',
} as const;

/** Reusable style fragments for the most common patterns. */
export const sx = {
  card: {
    background: colors.bgCard,
    border: `1px solid ${colors.border}`,
    borderRadius: radii.lg,
  },
  kicker: {
    color: colors.gold,
    fontSize: '0.62rem',
    fontFamily: fonts.ui,
    letterSpacing: '0.35em',
  },
  h1: {
    fontFamily: fonts.heading,
    fontWeight: 900,
    color: colors.textPrimary,
    lineHeight: 1.2,
  },
  h2: {
    fontFamily: fonts.heading,
    fontWeight: 700,
    color: colors.textPrimary,
    lineHeight: 1.3,
  },
  bodyText: {
    color: colors.textSecondary,
    lineHeight: 1.9,
    fontSize: '0.95rem',
  },
  muted: {
    color: colors.textMuted,
    fontSize: '0.72rem',
  },
} as const;
