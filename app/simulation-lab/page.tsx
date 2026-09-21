import type { Metadata } from 'next';
import SimulationLabContent from './SimulationLabContent';

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
      <SimulationLabContent />
    </>
  );
}
