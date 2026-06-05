import type { Metadata } from 'next';
import OddsContent from './OddsContent';

export const metadata: Metadata = {
  title: 'Victory Odds Calculator — Hunger Games Tributes',
  description: 'Live victory odds for every Hunger Games tribute. Build your tribute pool, sort by any stat, and see who the Capitol favors to win the Games.',
  alternates: { canonical: '/odds' },
};

export default function Page() {
  return <OddsContent />;
}
