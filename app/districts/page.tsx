import type { Metadata } from 'next';
import DistrictsContent from './DistrictsContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Districts of Panem — Complete District Guide',
  description: 'Explore all 13 districts of Panem plus the Capitol. See wealth levels, Capitol loyalty, industries, past victors, and the tributes from each district.',
  alternates: { canonical: '/districts' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="🏛️ PANEM GEOGRAPHY"
        title="The Complete District Guide"
        paragraphs={[
          'Panem\u2019s thirteen districts were designed by the Capitol to be unequal — and that inequality shapes every Games. Our district guide profiles all 13 districts with wealth levels, Capitol loyalty scores, industries, historical victor counts, and the tributes each district has produced.',
          'See why Districts 1, 2, and 4 — the Career districts — win about 29% of all simulations, how the middle districts (3, 5, 6, 7, 8) survive through specialized skills rather than raw combat, and why the poorest districts (9, 10, 11, 12) consistently outperform their odds in survival events.',
          'Each district card links to its tributes, so you can go from district economics straight into the stat sheets — and from there into the simulator to test whether District 12 really can beat District 2.',
        ]}
        stepsTitle="How to Explore the Districts"
        steps={[
          { icon: '🏛️', title: 'Browse All 13', text: 'Every district profiled with wealth, Capitol loyalty, industry, and historical victor counts.' },
          { icon: '📊', title: 'Compare Metrics', text: 'Wealth and loyalty scores explain why some districts train killers and others breed survivors.' },
          { icon: '👤', title: 'Meet the Tributes', text: 'Jump from any district into its tributes\u2019 full stat profiles.' },
          { icon: '⚔️', title: 'Test in the Arena', text: 'Run district-vs-district simulations and see the economics of Panem play out.' },
        ]}
        faqs={[
          { q: 'How many districts are there in Panem?', a: 'Thirteen. Districts 1 through 12 participate in the Games; District 13 was destroyed in the Dark Days (officially) and operates outside the Games system.' },
          { q: 'Which district wins the most simulations?', a: 'District 2 leads with the highest historical win rate, followed by District 1 and District 4. The three Career districts combined win about 29% of all simulations — the largest bloc share, measured across 2,000 lab runs.' },
          { q: 'What is Capitol loyalty?', a: 'Our 0\u2013100 score measuring how favored a district is by the Capitol. District 2 scores 92; District 12 scores just 20. Higher loyalty generally means better training and equipment for that district\u2019s tributes.' },
        ]}
        cta={[
          { href: '/tributes', label: '👤 ALL TRIBUTES' },
          { href: '/blog/all-districts-hunger-games-guide', label: '📖 DISTRICT GUIDE' },
        ]}
      />
      <DistrictsContent />
    </>
  );
}
