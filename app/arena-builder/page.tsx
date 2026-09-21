import type { Metadata } from 'next';
import ArenaBuilderContent from './ArenaBuilderContent';

export const metadata: Metadata = {
  title: 'Custom Arena & Scenario Builder — Hunger Games Simulator',
  description:
    'Build a custom Hunger Games arena and scenario with terrain, weather, resources, hazards, alliances, sponsors, and AI strategy modes.',
  alternates: { canonical: '/arena-builder' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Custom Arena & Scenario Builder',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  url: 'https://hungergamessimulators.com/arena-builder',
  description:
    'Build a custom Hunger Games arena and scenario with terrain, weather, resources, hazards, alliances, sponsors, and AI strategy modes.',
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
      <ArenaBuilderContent />
    </>
  );
}
