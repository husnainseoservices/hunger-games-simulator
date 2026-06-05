import type { Metadata } from 'next';
import TributesContent from './TributesContent';

export const metadata: Metadata = {
  title: 'All Tributes — Hunger Games Character Stats',
  description: 'Browse all Hunger Games tributes with full stat breakdowns. Compare strength, agility, survival, intelligence, stealth, charisma, and weapon skill.',
  alternates: { canonical: '/tributes' },
};

export default function Page() {
  return <TributesContent />;
}
