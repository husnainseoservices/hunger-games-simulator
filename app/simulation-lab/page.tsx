import type { Metadata } from 'next';
import SimulationLabContent from './SimulationLabContent';

export const metadata: Metadata = {
  title: '10,000 Simulation Lab — Hunger Games Simulator',
  description: 'Run thousands of Hunger Games simulations and analyze win rates, average placement, survival days, eliminations, and top-three finishes.',
  alternates: { canonical: '/simulation-lab' },
};

export default function Page() { return <SimulationLabContent />; }
