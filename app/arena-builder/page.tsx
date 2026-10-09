import type { Metadata } from 'next';
import ArenaBuilderContent from './ArenaBuilderContent';
import PageIntro from '@/components/layout/PageIntro';

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
      <PageIntro
        kicker="🏟️ ARENA BUILDER"
        title="Custom Arena & Scenario Builder"
        paragraphs={[
          'Every Gamemaker designs their arena for a purpose. The Arena Builder lets you do the same: configure terrain, weather, resources, hazards, alliances, sponsors, and tribute AI strategy modes to create your own Games scenario.',
          'Arena design is not decoration — it changes who wins. Forest arenas favor stealth and survival tributes like Katniss, Foxface, and Rue. Open terrain favors Careers. Hazard-heavy arenas punish low-intelligence tributes and reward planners like Beetee and Wiress. Weather and resource scarcity decide whether the Games last three days or ten.',
          'Build your scenario, run it through the simulator, then compare results against the official game editions to see how much your design changed the outcome.',
        ]}
        stepsTitle="How to Build an Arena"
        steps={[
          { icon: '🏔️', title: 'Set Terrain & Weather', text: 'Choose the landscape and conditions that define how tributes move, hide, and survive.' },
          { icon: '🔥', title: 'Configure Hazards', text: 'Add Gamemaker traps, floods, fires, and muttations — or keep the arena clean for a pure stat contest.' },
          { icon: '🤝', title: 'Shape Alliances', text: 'Adjust alliance formation tendencies and sponsor generosity to favor different play styles.' },
          { icon: '⚔️', title: 'Run the Games', text: 'Send your scenario into the simulator and watch how your design decisions play out.' },
        ]}
        faqs={[
          { q: 'What can I customize in the Arena Builder?', a: 'Terrain, weather, resources, hazards, alliance behavior, sponsor activity, and tribute AI strategy modes — everything that defines a Games scenario.' },
          { q: 'Does arena design change simulation outcomes?', a: 'Dramatically. Terrain and hazards interact with tribute stats: stealth tributes dominate forests, intelligence tributes dominate hazard-heavy arenas, and Careers dominate open ground.' },
          { q: 'Can I recreate the official arenas?', a: 'Yes — use the builder to approximate the 74th Games forest arena or the 75th clock arena, or design something the books never showed.' },
        ]}
        cta={[
          { href: '/simulator', label: '⚔️ RUN SIMULATOR' },
          { href: '/odds', label: '📊 VICTORY ODDS' },
        ]}
      />
      <ArenaBuilderContent />
    </>
  );
}
