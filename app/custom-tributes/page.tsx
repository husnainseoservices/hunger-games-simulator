import type { Metadata } from 'next';
import CustomTributesContent from './CustomTributesContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Create Custom Tributes — Hunger Games Simulator',
  description: 'Create your own Hunger Games tributes with custom names, districts, portraits, and stats. Then run them in the simulator or 1v1 fights against canon tributes.',
  alternates: { canonical: '/custom-tributes' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="✨ TRIBUTE CREATOR"
        title="Create Your Own Tributes"
        paragraphs={[
          'The arena is yours now. Create fully custom tributes — yourself, your friends, your favorite characters from any fandom — with your own names, districts, portraits, and eight stat scores. Custom tributes plug straight into the full season simulator and the 1v1 fight simulator.',
          'Your tributes are stored privately in your own browser — nothing is uploaded to our servers. Give them honest stats: the engine treats custom tributes exactly like canon ones, so a maxed-out tribute will dominate and an average one will need luck and sponsors.',
          'Share links include your custom tributes automatically, so friends who open your link get the exact same cast and the exact same Games.',
        ]}
        stepsTitle="How to Create a Tribute"
        steps={[
          { icon: '✏️', title: 'Name & District', text: 'Give your tribute a name, pick a district from the Capitol to District 13, and choose their background.' },
          { icon: '📷', title: 'Add a Portrait', text: 'Upload any image — it is resized automatically and stays in your browser. Skip it for a default avatar.' },
          { icon: '📊', title: 'Set Eight Stats', text: 'Drag the sliders for strength, agility, survival, intelligence, charisma, stealth, weapon skill, and loyalty.' },
          { icon: '⚔️', title: 'Send Them In', text: 'Pick them in Custom Games or 1v1 Fights and watch how they fare against Katniss, Cato, and Finnick.' },
        ]}
        faqs={[
          { q: 'Are my custom tributes private?', a: 'Yes. They are stored only in your browser\u2019s local storage. We never see or store them. Clearing your browser data will remove them.' },
          { q: 'Can custom tributes fight canon tributes?', a: 'Absolutely — that is the point. Mix custom and canon tributes freely in Custom Games rosters and 1v1 fights. The engine scores everyone with the same rules.' },
          { q: 'Do share links include my custom tributes?', a: 'Yes. When you copy a share link, your custom tributes travel with it (portraits included where small enough), so the recipient sees the identical cast.' },
          { q: 'How many custom tributes can I create?', a: 'Up to 48 per device — enough for two full Games rosters.' },
        ]}
        cta={[
          { href: '/simulator', label: '⚔️ GO TO SIMULATOR' },
          { href: '/fight', label: '👊 1V1 FIGHTS' },
        ]}
      />
      <CustomTributesContent />
    </>
  );
}
