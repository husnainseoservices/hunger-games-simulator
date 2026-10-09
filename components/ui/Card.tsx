import type { CSSProperties, ReactNode } from 'react';
import { colors, radii } from '@/lib/theme';

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  hover?: boolean;
}

/** Standard dark content card. Use everywhere instead of re-declaring
 *  background/border/radius inline. */
export default function Card({ children, style, hover }: CardProps) {
  return (
    <div
      style={{
        background: colors.bgCard,
        border: `1px solid ${colors.border}`,
        borderRadius: radii.lg,
        overflow: 'hidden',
        transition: hover ? 'border-color 0.2s, transform 0.2s' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
