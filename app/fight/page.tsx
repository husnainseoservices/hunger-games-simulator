import type { Metadata } from 'next';
import FightContent from './FightContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: '1v1 Fight Simulator — Tribute vs Tribute',
  description: 'Pit any two Hunger Games tributes head-to-head. Choose the combat type and see who wins based on strength, agility, weapon skill, and survival stats.',
  alternates: { canonical: '/fight' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="👊 1V1 FIGHT SIMULATOR"
        title="Tribute vs Tribute: Settle the Debate"
        paragraphs={[
          'Who wins in a straight fight — Katniss or Cato? Finnick or Johanna? The 1v1 Fight Simulator pits any two of our 37 tributes against each other across four combat scenarios: direct combat, survival, alliance strength, and trap scenarios.',
          'Each fight is resolved using the tributes\u2019 eight canon-derived stats. Direct combat rewards strength, agility, and weapon skill. Survival scenarios reward survival, intelligence, and stealth. Trap scenarios reward intelligence and weapon skill, while alliance scenarios test charisma and alliance loyalty. Choose the scenario that matches the debate you want to settle.',
          'For the full multi-day experience — bloodbath, alliances, betrayals, and arena hazards — run the same tributes through the Full Season Simulator instead.',
        ]}
        stepsTitle="How to Run a 1v1 Fight"
        steps={[
          { icon: '👤', title: 'Pick Two Tributes', text: 'Select any two of our 37 tributes, from Katniss Everdeen to Beetee to Commander Paylor.' },
          { icon: '⚔️', title: 'Choose the Scenario', text: 'Direct combat for a duel, survival for an endurance test, trap for a battle of wits, or alliance for a loyalty contest.' },
          { icon: '🎬', title: 'Run the Fight', text: 'The engine resolves the matchup from the tributes\u2019 stats and narrates the outcome round by round.' },
          { icon: '🔁', title: 'Rematch', text: 'Run it again — controlled randomness means rematches can go either way, just like real Games upsets.' },
        ]}
        faqs={[
          { q: 'How are 1v1 fight winners decided?', a: 'Each combat scenario weights different stats. Direct combat leans on strength, agility, and weapon skill; survival leans on survival, intelligence, and stealth; traps lean on intelligence; alliances lean on charisma and loyalty. Controlled randomness is added so no matchup is 100% predictable.' },
          { q: 'Can I fight tributes from different Games editions?', a: 'Yes. Any two tributes from our 36-character roster can face each other, including victors from the 75th Quarter Quell against tributes from the 74th Games.' },
          { q: 'What is the difference between the fight simulator and the full simulator?', a: 'The fight simulator resolves a single head-to-head matchup in one scenario. The full season simulator runs an entire Games with a full roster — bloodbath, alliances, betrayals, hazards, and a final victor over multiple days.' },
        ]}
        cta={[
          { href: '/simulator', label: '⚔️ FULL SIMULATOR' },
          { href: '/tributes', label: '👤 ALL TRIBUTES' },
        ]}
      />
      <FightContent />
    </>
  );
}
