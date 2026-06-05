import type { Metadata } from 'next';
import SimulatorContent from './SimulatorContent';

export const metadata: Metadata = {
  title: 'Hunger Games Simulator — Run a Full Game Simulation',
  description: 'Run a complete Hunger Games simulation. Pick your tributes and arena, then watch the Games unfold day by day from the Cornucopia bloodbath to the final victor.',
  alternates: { canonical: '/simulator' },
};

export default function Page() {
  return <SimulatorContent />;
}
