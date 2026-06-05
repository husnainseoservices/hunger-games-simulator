import type { Metadata } from 'next';
import FightContent from './FightContent';

export const metadata: Metadata = {
  title: '1v1 Fight Simulator — Tribute vs Tribute',
  description: 'Pit any two Hunger Games tributes head-to-head. Choose the combat type and see who wins based on strength, agility, weapon skill, and survival stats.',
  alternates: { canonical: '/fight' },
};

export default function Page() {
  return <FightContent />;
}
