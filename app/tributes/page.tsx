import type { Metadata } from 'next';
import TributesContent from './TributesContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'All Tributes — Hunger Games Character Stats',
  description: 'Browse all Hunger Games tributes with full stat breakdowns. Compare strength, agility, survival, intelligence, stealth, charisma, and weapon skill.',
  alternates: { canonical: '/tributes' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="👤 TRIBUTE DATABASE"
        title="All 37 Tributes, Fully Scored"
        paragraphs={[
          'The most complete fan-built tribute database on the internet. All 37 tributes from the Hunger Games saga — spanning the original trilogy, the Ballad of Songbirds & Snakes, and key rebellion-era characters — each scored across eight stats derived from their canon backgrounds.',
          'Every profile includes a full stat breakdown (strength, agility, survival, intelligence, charisma, stealth, weapon skill, alliance loyalty), a biography, training score, signature weapon, arena strategy tags, a memorable quote, and live victory odds computed against the full pool.',
          'Click any tribute for their deep-dive profile with district teammates, comparable rivals, and stat analysis. Then run them in the simulator, pit them against each other in 1v1 fights, or check their odds before the cannons fire.',
        ]}
        stepsTitle="How to Explore the Tributes"
        steps={[
          { icon: '🔍', title: 'Browse & Filter', text: 'Filter by district, background (Career, Victor, Volunteer, Reaped), or search by name.' },
          { icon: '📊', title: 'Compare Stats', text: 'Open any profile to see all eight stats visualized, plus an overall composite score.' },
          { icon: '⚔️', title: 'Simulate', text: 'Take any tribute straight into the full simulator or a 1v1 fight with one click.' },
          { icon: '📖', title: 'Read the Guides', text: 'Deep-dive tribute guides on our blog explain the stats, matchups, and hidden strengths.' },
        ]}
        faqs={[
          { q: 'How many tributes are in the database?', a: '37 tributes, covering the original trilogy, the Ballad of Songbirds & Snakes prequel, and rebellion-era characters — each with eight canon-derived stats.' },
          { q: 'How are tribute stats determined?', a: 'Stats are assigned by our editorial team based on each tribute\u2019s canonical feats: book and film events, training scores, arena performance, and established abilities. Read our methodology on the About page.' },
          { q: 'Who is the highest-rated tribute?', a: 'Katniss Everdeen leads our composite rankings at 89.4, driven by her near-perfect weapon skill (98) and survival (97). Finnick Odair follows closely at 88.7.' },
        ]}
        cta={[
          { href: '/simulator', label: '⚔️ SIMULATE GAMES' },
          { href: '/blog/tribute-power-rankings', label: '📖 POWER RANKINGS' },
        ]}
      />
      <TributesContent />
    </>
  );
}
