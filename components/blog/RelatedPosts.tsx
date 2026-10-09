import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { categoryColors, colors, fonts, radii } from '@/lib/theme';
import Card from '@/components/ui/Card';

/** "Related articles" grid. Feed it the current post id + category —
 *  the query logic lives here, not in every article template. */
export default function RelatedPosts({ currentId, category, count = 3 }: { currentId: string; category: string; count?: number }) {
  const related = blogPosts.filter((p) => p.id !== currentId && p.category === category).slice(0, count);
  if (related.length === 0) return null;
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '0.65rem', fontFamily: fonts.ui, letterSpacing: '0.2em', color: colors.textMuted, marginBottom: '0.875rem' }}>
        RELATED ARTICLES
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(200px,100%),1fr))', gap: '0.875rem' }}>
        {related.map((r) => (
          <Link key={r.id} href={`/blog/${r.slug}`} style={{ textDecoration: 'none' }}>
            <Card style={{ padding: '0.875rem', height: '100%' }} hover>
              <span style={{ fontSize: '0.58rem', color: categoryColors[r.category] || colors.gold, fontFamily: fonts.ui, letterSpacing: '0.1em' }}>
                {r.category.replace(/-/g, ' ').toUpperCase()}
              </span>
              <p style={{ fontSize: '0.85rem', fontFamily: fonts.heading, fontWeight: 700, color: colors.textPrimary, lineHeight: 1.4, margin: '0.3rem 0' }}>
                {r.title.substring(0, 60)}...
              </p>
              <p style={{ fontSize: '0.65rem', color: colors.textMuted, margin: 0 }}>{r.readTime} min read</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
