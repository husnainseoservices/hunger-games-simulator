import type { Metadata } from 'next';
import LeaderboardContent from './LeaderboardContent';

export const metadata: Metadata = {
  title: 'Tribute Leaderboard — Top Hunger Games Victors',
  description: 'The definitive Hunger Games tribute leaderboard. See the top-ranked tributes by victory odds and across all eight combat and survival stats.',
  alternates: { canonical: '/leaderboard' },
};

export default function Page() {
  return <LeaderboardContent />;
}
