import type { Metadata } from 'next';
import OddsContent from './OddsContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Victory Odds Calculator — Hunger Games Tributes',
  description: 'Live victory odds for every Hunger Games tribute. Build your tribute pool, sort by any stat, and see who the Capitol favors to win the Games.',
  alternates: { canonical: '/odds' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="📊 CAPITOL ODDS BUREAU"
        title="Victory Odds Calculator"
        paragraphs={[
          'Before the cannons fire, the Capitol always has a favorite. Our Victory Odds Calculator computes live win probability for every tribute using a weighted formula built from their eight core stats: weapon skill and survival each count for 20%, while strength, agility, intelligence, and stealth each contribute 15%.',
          'Odds are relative, not absolute — they are normalized so the whole pool adds up to exactly 100%. Remove Cato from the pool and Katniss\u2019s odds jump; remove the entire Career pack and she becomes the heavy favorite. Use the pool filter to test any scenario: only Careers, only non-Careers, a single district, or your custom Games roster.',
          'Watch for the Dark Horse indicator, which flags tributes whose stealth-plus-survival composite is disproportionately high relative to their overall odds. Foxface is the classic example — the simulator\u2019s stealth queen regularly outlasts tributes with far higher combat scores.',
        ]}
        stepsTitle="How to Use the Odds Calculator"
        steps={[
          { icon: '📊', title: 'Build Your Pool', text: 'Start with all 37 tributes, or filter by district and background to model any specific scenario.' },
          { icon: '⚖️', title: 'Read the Odds', text: 'Each tribute\u2019s percentage is their normalized win probability within your selected pool.' },
          { icon: '🐴', title: 'Spot Dark Horses', text: 'Look for the Dark Horse badge — stealthy survivors the odds formula undervalues.' },
          { icon: '⚔️', title: 'Run the Games', text: 'Take your pool into the full simulator and see whether the Capitol\u2019s favorite actually survives.' },
        ]}
        faqs={[
          { q: 'How are victory odds calculated?', a: 'A weighted stat formula: weapon skill (20%) + survival (20%) + strength (15%) + agility (15%) + intelligence (15%) + stealth (15%). Each tribute\u2019s score is divided by the total pool score so all odds sum to 100%.' },
          { q: 'Why do odds change when I remove tributes?', a: 'Because odds are relative. Removing a strong tribute redistributes their probability share across the remaining pool — Katniss\u2019s odds rise roughly 18% when Cato leaves the field.' },
          { q: 'What does the Dark Horse indicator mean?', a: 'It marks tributes whose combined stealth and survival stats are much stronger than their overall odds suggest. These are the tributes most likely to upset the model — Foxface being the prime example.' },
          { q: 'How accurate are the odds?', a: 'They are strongest for early-game survival. Late-game outcomes depend on alliance dynamics, arena hazard luck, and sponsor support, which no stat model fully captures. Use the full simulator for complete Games runs.' },
        ]}
        cta={[
          { href: '/simulator', label: '⚔️ RUN THE GAMES' },
          { href: '/blog/odds-calculator-guide', label: '📖 ODDS GUIDE' },
        ]}
      />
      <OddsContent />
    </>
  );
}
