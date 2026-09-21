import type { Metadata } from 'next';
import ArenaBuilderContent from './ArenaBuilderContent';

export const metadata: Metadata = {
  title: 'Custom Arena & Scenario Builder — Hunger Games Simulator',
  description: 'Build a custom Hunger Games arena and scenario with terrain, weather, resources, hazards, alliances, sponsors, and AI strategy modes.',
  alternates: { canonical: '/arena-builder' },
};

export default function Page() { return <ArenaBuilderContent />; }
