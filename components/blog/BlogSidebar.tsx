import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { colors, fonts, radii } from '@/lib/theme';
import Card from '@/components/ui/Card';
import { GoldButton, GhostButton } from '@/components/ui/Buttons';

/** Article sidebar: simulator CTA, recent posts, category counts.
 *  Extracted from PostContent so the layout is defined once. */
export default function BlogSidebar() {
  const cats = ['tribute-guides', 'analysis', 'strategy', 'game-recaps', 'district-profiles', 'rankings'];
  return (
    <aside className="blog-sidebar">
      <div style={{ background: `linear-gradient(135deg,${colors.gold}1f,${colors.red}0f)`, border: `1px solid ${colors.gold}40`, borderRadius: radii.lg, padding: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>⚔️</div>
        <h3 style={{ fontSize: '0.88rem', fontFamily: fonts.heading, fontWeight: 700, color: colors.textPrimary, margin: '0 0 0.35rem' }}>Run the Games</h3>
        <p style={{ fontSize: '0.72rem', color: colors.textMuted, margin: '0 0 0.75rem', lineHeight: 1.5 }}>Simulate the arena. See who survives.</p>
        <GoldButton href="/simulator" style={{ display: 'block', marginBottom: '0.4rem' }}>⚔️ SIMULATE</GoldButton>
        <GhostButton href="/quiz" style={{ display: 'block' }}>🧠 TAKE THE QUIZ</GhostButton>
      </div>

      <Card style={{ padding: '1.1rem', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.6rem', fontFamily: fonts.ui, letterSpacing: '0.2em', color: colors.textMuted, marginBottom: '0.75rem' }}>RECENT POSTS</p>
        {blogPosts.slice(0, 6).map((p) => (
          <Link key={p.id} href={`/blog/${p.slug}`} style={{ display: 'block', padding: '0.5rem 0', borderBottom: `1px solid ${colors.border}`, textDecoration: 'none' }}>
            <p style={{ fontSize: '0.78rem', fontFamily: fonts.heading, color: colors.textPrimary, margin: '0 0 0.1rem', lineHeight: 1.3 }}>{p.title.substring(0, 48)}...</p>
            <p style={{ fontSize: '0.6rem', color: colors.textMuted, margin: 0 }}>{p.readTime} min · {p.category.replace(/-/g, ' ')}</p>
          </Link>
        ))}
      </Card>

      <Card style={{ padding: '1.1rem' }}>
        <p style={{ fontSize: '0.6rem', fontFamily: fonts.ui, letterSpacing: '0.2em', color: colors.textMuted, marginBottom: '0.75rem' }}>CATEGORIES</p>
        {cats.map((cat) => (
          <Link key={cat} href="/blog" style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.03)', textDecoration: 'none', color: colors.textMuted, fontSize: '0.8rem' }}>
            <span>{cat.replace(/-/g, ' ')}</span>
            <span style={{ color: colors.borderLight }}>{blogPosts.filter((p) => p.category === cat).length}</span>
          </Link>
        ))}
      </Card>
    </aside>
  );
}
