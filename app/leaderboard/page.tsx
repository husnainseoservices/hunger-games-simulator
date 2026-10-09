import type { Metadata } from 'next';
import LeaderboardContent from './LeaderboardContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Tribute Leaderboard — Top Hunger Games Victors',
  description: 'The definitive Hunger Games tribute leaderboard. See the top-ranked tributes by victory odds and across all eight combat and survival stats.',
  alternates: { canonical: '/leaderboard' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="🏆 VICTOR LEADERBOARD"
        title="The Definitive Tribute Leaderboard"
        paragraphs={[
          'The definitive ranking of all 36 Hunger Games tributes, computed from their eight core stats and live victory odds. This is the same composite ranking that powers our Power Rankings article — and it updates with the same weighted formula the odds calculator uses.',
          'The composite score weights weapon skill and survival at 20% each, with strength, agility, intelligence, and stealth at 15% each. Katniss Everdeen leads at 89.4, followed by Finnick Odair at 88.7 and Cato at 86.2 — but the Foxface anomaly shows why composite score is not the whole story.',
          'For deeper analysis — methodology, tier breakdowns, and the tributes that outperform their rankings — read our complete Power Rankings guide on the blog.',
        ]}
        stepsTitle="How to Read the Leaderboard"
        steps={[
          { icon: '🥇', title: 'Top Tier (80+)', text: 'The untouchables: Katniss, Finnick, Cato, and the tributes with genuinely complete stat profiles.' },
          { icon: '⚔️', title: 'Mid Tier', text: 'Specialists — Careers with combat dominance, or stealth and survival experts with niche advantages.' },
          { icon: '🌱', title: 'Bottom Tier', text: 'Tributes the model undervalues — several consistently outperform their rankings in actual simulations.' },
          { icon: '📖', title: 'Full Breakdown', text: 'Read the Power Rankings article for methodology, tiers, and simulation-verified surprises.' },
        ]}
        faqs={[
          { q: 'Who is the #1 ranked tribute?', a: 'Katniss Everdeen, with a composite score of 89.4 — driven by her near-perfect weapon skill (98) and survival (97). Finnick Odair is #2 at 88.7.' },
          { q: 'How is the leaderboard calculated?', a: 'A weighted composite: weapon skill (20%) + survival (20%) + strength (15%) + agility (15%) + intelligence (15%) + stealth (15%). The same formula drives the odds calculator.' },
          { q: 'Why does Foxface rank higher than stronger tributes?', a: 'Her 99 stealth and 98 intelligence create a survival profile the formula rewards. In simulations longer than 10 days she ranks first — the model captures something pure combat scores miss.' },
        ]}
        cta={[
          { href: '/tributes', label: '👤 ALL TRIBUTES' },
          { href: '/blog/tribute-power-rankings', label: '📖 FULL RANKINGS' },
        ]}
      />
      <LeaderboardContent />
    </>
  );
}
