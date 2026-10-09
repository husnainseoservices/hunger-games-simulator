import type { ReactNode } from 'react';
import { colors, radii } from '@/lib/theme';

interface CalloutProps {
  children: ReactNode;
  tone?: 'gold' | 'red' | 'green' | 'blue';
  title?: string;
}

const tones = {
  gold: { border: `${colors.gold}55`, bg: `${colors.gold}0d`, accent: colors.gold, icon: '💡' },
  red: { border: `${colors.redLight}55`, bg: `${colors.red}22`, accent: colors.redLight, icon: '⚠️' },
  green: { border: `${colors.greenLight}66`, bg: `${colors.green}33`, accent: '#70c870', icon: '✅' },
  blue: { border: '#70a0e844', bg: '#70a0e811', accent: '#70a0e8', icon: 'ℹ️' },
};

/** Tip/warning/info callout box. Replaces ad-hoc colored divs. */
export default function Callout({ children, tone = 'gold', title }: CalloutProps) {
  const t = tones[tone];
  return (
    <div style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: radii.lg, padding: '1rem 1.15rem', margin: '1.25rem 0' }}>
      <p style={{ margin: '0 0 0.4rem', color: t.accent, fontSize: '0.8rem', fontWeight: 700 }}>
        {t.icon} {title || (tone === 'gold' ? 'TIP' : tone.toUpperCase())}
      </p>
      <div style={{ color: colors.textSecondary, fontSize: '0.88rem', lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
