import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { colors, fonts, radii } from '@/lib/theme';

const base: CSSProperties = {
  display: 'inline-block',
  padding: '0.7rem 1.5rem',
  borderRadius: radii.md,
  textDecoration: 'none',
  fontFamily: fonts.ui,
  letterSpacing: '0.12em',
  fontWeight: 700,
  fontSize: '0.78rem',
  textAlign: 'center',
  cursor: 'pointer',
  border: '1px solid transparent',
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
}

/** Primary gold CTA button. */
export function GoldButton({ href, children, style }: ButtonProps) {
  return (
    <Link href={href} style={{ ...base, background: `linear-gradient(135deg,${colors.gold},#b8860b)`, color: '#0a0c06', ...style }}>
      {children}
    </Link>
  );
}

/** Secondary outline button. */
export function GhostButton({ href, children, style }: ButtonProps) {
  return (
    <Link href={href} style={{ ...base, background: 'transparent', color: colors.gold, border: `1px solid ${colors.gold}55`, ...style }}>
      {children}
    </Link>
  );
}

/** Row of CTAs with consistent spacing — replaces the flex div
 *  copy-pasted after every PageIntro. */
export function CtaRow({ items }: { items: { href: string; label: string; primary?: boolean }[] }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
      {items.map((c) =>
        c.primary === false ? (
          <GhostButton key={c.href} href={c.href}>{c.label}</GhostButton>
        ) : (
          <GoldButton key={c.href} href={c.href}>{c.label}</GoldButton>
        ),
      )}
    </div>
  );
}
