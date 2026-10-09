import { colors, fonts, radii, sx } from '@/lib/theme';
import { CtaRow } from '@/components/ui/Buttons';
import Faq, { type FaqItem } from '@/components/ui/Faq';
import Card from '@/components/ui/Card';

export type { FaqItem };
export interface StepItem { icon: string; title: string; text: string }

interface PageIntroProps {
  kicker: string;
  title: string;
  paragraphs: string[];
  steps?: StepItem[];
  stepsTitle?: string;
  faqs?: FaqItem[];
  cta?: { href: string; label: string }[];
}

/** Editorial intro block for tool pages: unique prose, how-to steps and FAQs so
 *  interactive pages also carry substantial indexable content.
 *  Composed from shared primitives — see `@/components/ui`. */
export default function PageIntro({ kicker, title, paragraphs, steps, stepsTitle, faqs, cta }: PageIntroProps) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem 1.5rem' }}>
      <p style={{ ...sx.kicker, margin: '0 0 0.75rem' }}>{kicker}</p>
      <h1 style={{ ...sx.h1, fontSize: 'clamp(1.6rem,4vw,2.4rem)', margin: '0 0 1.25rem' }}>{title}</h1>
      <div style={sx.bodyText}>
        {paragraphs.map((p, i) => <p key={i} style={{ marginBottom: '1.1rem' }}>{p}</p>)}
      </div>
      {cta && <CtaRow items={cta.map((c, i) => ({ ...c, primary: i === 0 }))} />}
      {steps && steps.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ ...sx.h2, fontSize: 'clamp(1.2rem,3vw,1.6rem)', margin: '0 0 1.25rem', fontWeight: 900 }}>
            {stepsTitle || 'How It Works'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '0.875rem' }}>
            {steps.map((s, i) => (
              <Card key={i} style={{ padding: '1.1rem', borderRadius: radii.xl }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '0.6rem' }}>{s.icon}</div>
                <h3 style={{ fontSize: '0.9rem', fontFamily: fonts.heading, fontWeight: 700, color: colors.textPrimary, margin: '0 0 0.4rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.78rem', color: colors.textSecondary, lineHeight: 1.7, margin: 0 }}>{s.text}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
      {faqs && faqs.length > 0 && <Faq items={faqs} />}
    </div>
  );
}
