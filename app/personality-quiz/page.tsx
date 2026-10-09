import type { Metadata } from 'next';
import PersonalityQuizContent from './PersonalityQuizContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Which Hunger Games Tribute Are You? — Personality Quiz',
  description: 'Take the Hunger Games personality quiz: 10 scenario questions reveal which of our 37 tributes matches your survival instincts. Share your result!',
  alternates: { canonical: '/personality-quiz' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="🧬 TRIBUTE PERSONALITY QUIZ"
        title="Which Hunger Games Tribute Are You?"
        paragraphs={[
          'Forget trivia — this quiz reads your survival instincts. Ten scenario-based questions put you inside the arena: the bloodbath, a midnight ambush, a sponsor gamble, the final three. Every answer is weighted against our 37 fully scored tributes, and the engine matches you to the tribute who would make your exact choices.',
          'Your result is not random. Each option carries points toward 2–4 tributes whose canon behavior matches that choice — pick the trap over the sword and you score with Beetee and Haymitch; charge the Cornucopia and you score with Cato and Brutus. The tribute with the highest total is your arena twin.',
          'Share your result with the one-tap copy button and challenge your friends: who got Katniss, and who got Snow? Then take your tribute into the full simulator and see if your instincts survive the Games.',
        ]}
        stepsTitle="How the Personality Quiz Works"
        steps={[
          { icon: '🧬', title: 'Answer 10 Scenarios', text: 'Real arena situations — no trivia, no wrong answers. Just choices that reveal how you survive.' },
          { icon: '⚖️', title: 'Weighted Matching', text: 'Every answer scores points toward the tributes who would make the same call in canon.' },
          { icon: '👤', title: 'Meet Your Tribute', text: 'Get your matched tribute with their bio, top stats, and nickname.' },
          { icon: '📋', title: 'Share & Compare', text: 'Copy your result in one tap, challenge friends, then run your tribute in the simulator.' },
        ]}
        faqs={[
          { q: 'How is this different from the trivia quiz?', a: 'Our 30-question trivia quiz tests what you know about Panem. This personality quiz tests who you are in the arena — 10 scenario questions with no wrong answers, matched against all 37 tributes by weighted scoring.' },
          { q: 'How is my tribute match calculated?', a: 'Each answer option carries 1–3 points toward 2–4 tributes whose canonical behavior matches that choice. Your points are summed across all 10 questions, and the highest-scoring tribute is your match. Ties go to the first tribute to reach the top score.' },
          { q: 'Can I get a villain like Snow or Coin?', a: 'Yes — all 37 tributes are in the matching pool, including Capitol figures. Ruthless answers score with Snow, Coin, and the Career pack.' },
          { q: 'Is the personality quiz free?', a: 'Completely free, no account needed — like every feature on this site.' },
        ]}
        cta={[
          { href: '/tributes', label: '👤 ALL TRIBUTES' },
          { href: '/simulator', label: '⚔️ RUN SIMULATOR' },
        ]}
      />
      <PersonalityQuizContent />
    </>
  );
}
