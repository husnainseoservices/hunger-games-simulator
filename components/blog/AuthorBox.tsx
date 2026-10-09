import Link from 'next/link';
import { colors, fonts, radii } from '@/lib/theme';

const BIOS: Record<string, string> = {
  'Arena Analyst': 'Simulation engineer and lead writer. Built the eight-stat scoring system and the 10,000 Simulation Lab; every claim in this article was measured across thousands of runs.',
  'Capitol Correspondent': 'District and lore editor. Maintains the Panem district database and writes our district profiles and game recaps from lab data and close reading of the saga.',
  'Capitol Analyst': 'Rankings analyst. Owns the composite scoring methodology behind our power rankings and leaderboard.',
  'Capitol Odds Bureau': 'Data and odds specialist. Built the victory odds formula and the dark horse indicator used across the site.',
};

/** Author bio card. Single definition — previously inlined in PostContent. */
export default function AuthorBox({ author }: { author: string }) {
  return (
    <div style={{ marginTop: '2rem', background: `${colors.gold}0d`, border: `1px solid ${colors.gold}33`, borderRadius: radii.xl, padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ width: 48, height: 48, borderRadius: radii.round, background: `linear-gradient(135deg,${colors.gold},#8b6914)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, color: colors.bg, flexShrink: 0, fontFamily: fonts.heading }}>
        {author.charAt(0)}
      </div>
      <div>
        <p style={{ fontSize: '0.62rem', fontFamily: fonts.ui, letterSpacing: '0.2em', color: colors.gold, margin: '0 0 0.25rem' }}>WRITTEN BY</p>
        <p style={{ fontSize: '0.95rem', fontFamily: fonts.heading, fontWeight: 700, color: colors.textPrimary, margin: '0 0 0.35rem' }}>{author}</p>
        <p style={{ fontSize: '0.8rem', color: colors.textSecondary, lineHeight: 1.7, margin: '0 0 0.5rem' }}>
          {BIOS[author] || 'Contributing writer covering the Hunger Games simulator, tributes, and arena strategy.'}
        </p>
        <Link href="/about" style={{ fontSize: '0.72rem', color: colors.gold, textDecoration: 'none', fontFamily: fonts.ui, letterSpacing: '0.1em' }}>
          MORE ABOUT OUR TEAM →
        </Link>
      </div>
    </div>
  );
}
