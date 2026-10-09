import type { Metadata } from 'next';
import SimulationLabContent from './SimulationLabContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: '10,000 Simulation Lab — Hunger Games Simulator',
  description:
    'Run thousands of Hunger Games simulations and analyze win rates, average placement, survival days, eliminations, and top-three finishes.',
  alternates: { canonical: '/simulation-lab' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '10,000 Simulation Lab',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  url: 'https://hungergamessimulators.com/simulation-lab',
  description:
    'Run thousands of independent Hunger Games simulations and analyze simulated win rates, survival, placements, and eliminations.',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Hunger Games Simulator',
    url: 'https://hungergamessimulators.com',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <PageIntro
        kicker="🧪 SIMULATION LAB"
        title="The 10,000 Simulation Lab"
        paragraphs={[
          'One simulation is a story. Ten thousand simulations are statistics. The Simulation Lab runs thousands of independent Games in seconds and aggregates the results: win rates, average placement, average survival days, eliminations, and top-three finishes for every tribute.',
          'This is where our editorial analysis comes from. Every claim on our blog — that Districts 1, 2 and 4 win about 29% of simulations, that Foxface regularly outlasts most of the 37-tribute field, that the Cornucopia bloodbath averages about 5 deaths — was measured here across thousands of runs.',
          'Use the lab to answer questions the single-run simulator cannot: Which tribute has the highest win rate in a full field? Who survives longest on average? How does removing the Career pack shift the entire distribution?',
        ]}
        stepsTitle="How to Use the Lab"
        steps={[
          { icon: '👥', title: 'Set Your Roster', text: 'Choose the full 37-tribute field or a custom pool to isolate the variables you care about.' },
          { icon: '🔢', title: 'Choose Run Count', text: 'Run hundreds or thousands of simulations. More runs mean more reliable statistics.' },
          { icon: '📊', title: 'Analyze Results', text: 'Review win rates, placements, survival days, and eliminations across every tribute.' },
          { icon: '📖', title: 'Read the Analysis', text: 'Our blog turns lab data into tribute guides, matchup breakdowns, and strategy articles.' },
        ]}
        faqs={[
          { q: 'What is the Simulation Lab?', a: 'A tool that runs thousands of Hunger Games simulations at once and aggregates statistics: win rates, average placement, survival days, and eliminations per tribute.' },
          { q: 'Where do the statistics on the blog come from?', a: 'From the Simulation Lab. Claims like "Districts 1, 2 and 4 win about 29% of simulations" are measured across thousands of lab runs, not guessed.' },
          { q: 'How many simulations should I run?', a: 'The more the better. A few hundred runs reveal broad patterns; several thousand give stable, reliable win rates.' },
        ]}
        cta={[
          { href: '/simulator', label: '⚔️ SINGLE SIMULATOR' },
          { href: '/blog', label: '📖 READ ANALYSIS' },
        ]}
      />
      <SimulationLabContent />
    </>
  );
}
