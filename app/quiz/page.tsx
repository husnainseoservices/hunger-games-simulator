import type { Metadata } from 'next';
import QuizContent from './QuizContent';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Hunger Games Quiz — 30 Questions, 5 Modes',
  description: 'Test your Hunger Games knowledge with 30 questions across 5 difficulty modes. Timed rounds, instant explanations, and a final tribute ranking.',
  alternates: { canonical: '/quiz' },
};

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="🧠 PANEM KNOWLEDGE TRIALS"
        title="The Hunger Games Quiz"
        paragraphs={[
          'Think you know Panem? Our quiz tests your Hunger Games knowledge with 30 questions across 5 difficulty modes — from Training Ground basics that any casual fan can answer, to brutal Quarter Quell questions that challenge even trilogy veterans.',
          'Questions cover the original trilogy, the Ballad of Songbirds & Snakes prequel, tribute stats, district lore, arena mechanics, and the simulation data published on this site. Every answer comes with an instant explanation, so even a wrong guess teaches you something.',
          'Rounds are timed, and your final score earns you a tribute ranking — score low and you are District 12 cannon fodder; score high and you are Capitol strategist material. Check the leaderboard to see how your score stacks up.',
        ]}
        stepsTitle="How the Quiz Works"
        steps={[
          { icon: '🎯', title: 'Pick Your Mode', text: 'Choose from 5 difficulty modes: Training Ground, Arena Trials, Victor\u2019s Gauntlet, Gamemaker\u2019s Test, or the Quarter Quell.' },
          { icon: '⏱️', title: 'Answer Against the Clock', text: 'Timed rounds keep the pressure on. Answer fast for bonus points.' },
          { icon: '📚', title: 'Learn Instantly', text: 'Every question includes an explanation, so the quiz doubles as a study guide for the saga.' },
          { icon: '🏆', title: 'Earn Your Rank', text: 'Your final score maps to a tribute ranking — and you can post it to the leaderboard.' },
        ]}
        faqs={[
          { q: 'How many questions are in the Hunger Games quiz?', a: '30 questions per run, drawn across 5 difficulty modes. Questions span the original trilogy, the prequel, tribute stats, district lore, and arena mechanics.' },
          { q: 'Is the quiz timed?', a: 'Yes — rounds are timed, and faster correct answers earn more points. The pressure is part of the arena experience.' },
          { q: 'What do I get for a high score?', a: 'A tribute ranking based on your final score, plus a spot on the leaderboard so you can compare with other fans.' },
          { q: 'Is the quiz free?', a: 'Completely free, no account needed — like every feature on this site.' },
        ]}
        cta={[
          { href: '/personality-quiz', label: '🧬 WHICH TRIBUTE ARE YOU?' },
          { href: '/leaderboard', label: '🏆 LEADERBOARD' },
        ]}
      />
      <QuizContent />
    </>
  );
}
