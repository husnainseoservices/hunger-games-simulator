import type { Metadata } from 'next';
import QuizContent from './QuizContent';

export const metadata: Metadata = {
  title: 'Hunger Games Quiz — 30 Questions, 5 Modes',
  description: 'Test your Hunger Games knowledge with 30 questions across 5 difficulty modes. Timed rounds, instant explanations, and a final tribute ranking.',
  alternates: { canonical: '/quiz' },
};

export default function Page() {
  return <QuizContent />;
}
