import { colors, fonts } from '@/lib/theme';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  level?: 1 | 2 | 3;
  accent?: string;
  sub?: string;
}

/** Kicker + heading + optional sub-text. One component instead of the
 *  kicker/h1/h2 style block pasted on every page. */
export default function SectionHeading({ kicker, title, level = 2, accent, sub }: SectionHeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3';
  const sizes = { 1: 'clamp(1.6rem,4vw,2.4rem)', 2: 'clamp(1.2rem,3vw,1.6rem)', 3: 'clamp(1rem,2.5vw,1.25rem)' };
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      {kicker && (
        <p style={{ color: accent || colors.gold, fontSize: '0.62rem', fontFamily: fonts.ui, letterSpacing: '0.35em', margin: '0 0 0.75rem' }}>
          {kicker}
        </p>
      )}
      <Tag style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: sizes[level], margin: '0 0 0.5rem', lineHeight: 1.2, color: colors.textPrimary }}>
        {title}
      </Tag>
      {sub && <p style={{ color: colors.textSecondary, margin: 0, lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}
