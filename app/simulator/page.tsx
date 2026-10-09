import type { Metadata } from 'next';
import { Suspense } from 'react';
import SimulatorContent from './SimulatorContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Hunger Games Simulator — Run a Full Game Simulation',
  description: 'Run a complete Hunger Games simulation. Pick your tributes and arena, then watch the Games unfold day by day from the Cornucopia bloodbath to the final victor.',
  alternates: { canonical: '/simulator' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="⚔️ FULL SEASON SIMULATOR"
        title="Run a Complete Hunger Games Simulation"
        paragraphs={[
          'The Hunger Games Simulator is the most detailed fan-built simulation of Suzanne Collins\u2019 world of Panem. Choose the 74th Games, the 75th Quarter Quell, the 50th Second Quell, or build a completely custom roster — then watch the entire competition play out day by day, from the Cornucopia bloodbath to the final cannon.',
          'Every tribute in our database carries eight canon-derived stats: strength, agility, survival, intelligence, charisma, stealth, weapon skill, and alliance loyalty. The simulation engine weighs these stats against controlled randomness to generate bloodbath deaths, alliance formations, betrayals, sponsor gifts, arena hazards, and the final showdown. No two runs are ever identical.',
          'Use the custom event builder below to inject your own events into the narrative, or run a head-to-head matchup in the 1v1 Fight Simulator to settle debates like Katniss vs. Finnick before committing to a full Games.',
        ]}
        stepsTitle="How to Run Your Simulation"
        steps={[
          { icon: '📜', title: 'Pick Your Games', text: 'Choose the 74th Games, the 75th Quarter Quell, the 50th Games, or a fully custom roster with any combination of our 37 tributes.' },
          { icon: '👤', title: 'Review the Roster', text: 'Check each tribute\u2019s eight stats and victory odds. Careers dominate combat; underdogs survive on stealth and survival skill.' },
          { icon: '⚔️', title: 'Add Custom Events', text: 'Optionally write your own combat, hazard, alliance, survival, or sponsor events to shape the story of your Games.' },
          { icon: '🏆', title: 'Crown the Victor', text: 'Run the simulation and follow the day-by-day log: deaths, kills, betrayals, and the final victor — then run it again.' },
        ]}
        faqs={[
          { q: 'How does the Hunger Games simulator work?', a: 'You select a game edition or build a custom roster, and our engine simulates the Games day by day. Each event is resolved using the tributes\u2019 eight stats — strength, agility, survival, intelligence, charisma, stealth, weapon skill, and alliance loyalty — combined with controlled randomness, so outcomes feel realistic without being predetermined.' },
          { q: 'Can I simulate a custom Hunger Games with any tributes?', a: 'Yes. The Custom Games option lets you build any roster from our 37 tributes: mix victors with reaped tributes, pit Katniss against Finnick, or assemble an all-Career bloodbath. The engine adapts to any combination you choose.' },
          { q: 'Are simulation results random or predetermined?', a: 'Neither. Outcomes are stat-driven with controlled randomness layered on top. Stronger tributes win more often, but upsets happen — our data shows underdogs like Foxface consistently outlast tributes with far higher combat stats.' },
          { q: 'Is the simulator free to use?', a: 'Completely free. No account, no signup, no payment. Every feature on this site — the full simulator, 1v1 fights, odds calculator, quiz, and all tribute and district profiles — is free forever.' },
        ]}
        cta={[
          { href: '/fight', label: '👊 1V1 FIGHTS' },
          { href: '/odds', label: '📊 VICTORY ODDS' },
        ]}
      />
      <Suspense fallback={<div style={{maxWidth:'1400px',margin:'0 auto',padding:'3rem 1rem',textAlign:'center',color:'#5a5448'}}>Loading the arena…</div>}>
        <SimulatorContent />
      </Suspense>
    </>
  );
}
