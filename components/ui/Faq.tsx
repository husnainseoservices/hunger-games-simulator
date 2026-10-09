'use client';
import { colors, fonts, radii } from '@/lib/theme';

export interface FaqItem { q: string; a: string }

interface FaqProps {
  items: FaqItem[];
  title?: string;
  withSchema?: boolean;
}

/**
 * FAQ accordion with optional FAQPage JSON-LD.
 * Replaces the FAQ <details> block previously duplicated in PageIntro —
 * any page can now render <Faq items={...} withSchema /> on its own.
 */
export default function Faq({ items, title = 'Frequently Asked Questions', withSchema = true }: FaqProps) {
  if (!items || items.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <div style={{ marginTop: '2rem' }}>
      {withSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
      <h2 style={{ fontFamily: fonts.heading, fontWeight: 900, fontSize: 'clamp(1.2rem,3vw,1.6rem)', margin: '0 0 1.25rem', color: colors.textPrimary }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        {items.map((f, i) => (
          <details key={i} style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: radii.lg, overflow: 'hidden' }}>
            <summary style={{ padding: '1rem 1.15rem', cursor: 'pointer', fontFamily: fonts.heading, fontWeight: 700, fontSize: '0.9rem', color: colors.textPrimary, listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              {f.q}
              <span style={{ color: colors.gold, fontSize: '1.2rem', flexShrink: 0 }}>+</span>
            </summary>
            <div style={{ padding: '0 1.15rem 1.15rem', color: colors.textSecondary, lineHeight: 1.8, fontSize: '0.85rem' }}>{f.a}</div>
          </details>
        ))}
      </div>
      <style>{`details summary::-webkit-details-marker{display:none;}`}</style>
    </div>
  );
}
