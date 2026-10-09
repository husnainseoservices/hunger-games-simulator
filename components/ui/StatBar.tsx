import { colors, fonts, radii } from '@/lib/theme';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  barColor?: string;
}

/** Labeled stat bar (tribute profiles, odds breakdowns, comparisons).
 *  One component instead of the bar markup repeated per page. */
export default function StatBar({ label, value, max = 100, barColor = colors.gold }: StatBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ marginBottom: '0.6rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
        <span style={{ color: colors.textSecondary, fontFamily: fonts.ui, letterSpacing: '0.08em' }}>{label.toUpperCase()}</span>
        <span style={{ color: colors.textPrimary, fontWeight: 700 }}>{value}</span>
      </div>
      <div style={{ height: '8px', background: colors.bgSecondary, borderRadius: radii.sm, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${barColor}88, ${barColor})`, borderRadius: radii.sm }} />
      </div>
    </div>
  );
}
