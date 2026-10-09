'use client';
import { useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { BlogCategory, type BlogPost } from '@/types';
import { categoryColors, colors, fonts } from '@/lib/theme';
import { getBlogImage } from '@/lib/images';
import SiteImage from '@/components/media/SiteImage';
import Card from '@/components/ui/Card';
import SectionHeading from '@/components/ui/SectionHeading';

const CATS: { id: BlogCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All', icon: '📰' },
  { id: 'tribute-guides', label: 'Tribute Guides', icon: '👤' },
  { id: 'analysis', label: 'Analysis', icon: '📊' },
  { id: 'strategy', label: 'Strategy', icon: '⚔️' },
  { id: 'game-recaps', label: 'Recaps', icon: '🎬' },
  { id: 'district-profiles', label: 'Districts', icon: '🏛️' },
  { id: 'rankings', label: 'Rankings', icon: '🏆' },
];

function CategoryBadge({ post, style }: { post: BlogPost; style?: CSSProperties }) {
  return (
    <span style={{
      fontSize: '0.58rem', fontFamily: fonts.ui, letterSpacing: '0.1em', color: '#fff',
      background: 'rgba(8,10,6,0.65)', padding: '0.2rem 0.6rem', borderRadius: '2px',
      border: `1px solid ${(categoryColors[post.category] || colors.gold)}66`, ...style,
    }}>
      {post.category.replace(/-/g, ' ').toUpperCase()}
    </span>
  );
}

export default function BlogPage() {
  const [active, setActive] = useState<BlogCategory | 'all'>('all');
  const filtered = active === 'all' ? blogPosts : blogPosts.filter((p) => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);
  const featuredImg = featured && getBlogImage(featured.slug);

  return (
    <>
      <style>{`.blog-feat{display:grid;grid-template-columns:1fr 1fr;} .blog-feat *{min-width:0;overflow-wrap:break-word;} .blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(280px,100%),1fr));gap:1rem;} .blog-grid h3,.blog-grid p{overflow-wrap:break-word;} @media(max-width:700px){.blog-feat{grid-template-columns:1fr;}}`}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <nav style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', color: colors.textMuted, marginBottom: '0.75rem' }}>
            <Link href="/" style={{ color: colors.gold, textDecoration: 'none' }}>Home</Link><span>/</span>
            <span style={{ color: colors.textSecondary }}>Blog</span>
          </nav>
          <SectionHeading
            kicker="📰 THE ARENA REPORT"
            title="Hunger Games Blog"
            level={1}
            sub="Tribute guides, simulation analysis, district profiles, and strategy breakdowns"
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.75rem', overflowX: 'auto', paddingBottom: '0.25rem', flexWrap: 'wrap' }}>
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '0.4rem 0.875rem',
                background: active === c.id ? `${colors.gold}1a` : colors.bgCard,
                border: `1px solid ${active === c.id ? `${colors.gold}80` : colors.border}`,
                borderRadius: '4px', cursor: 'pointer', fontFamily: fonts.ui, letterSpacing: '0.08em',
                fontSize: '0.72rem', color: active === c.id ? colors.gold : colors.textMuted,
                whiteSpace: 'nowrap', flexShrink: 0,
              }}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {featured && featuredImg && (
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '1.5rem' }}>
            <Card style={{ borderRadius: '12px', border: `1px solid ${colors.gold}33` }} hover>
              <article className="blog-feat">
                <div style={{ minHeight: '220px', position: 'relative', overflow: 'hidden' }}>
                  <SiteImage image={featuredImg} eager rounded={false} bordered={false} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                  <CategoryBadge post={featured} style={{ position: 'absolute', left: '1.25rem', bottom: '1.25rem' }} />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 style={{ fontSize: 'clamp(1rem,3vw,1.4rem)', fontFamily: fonts.heading, fontWeight: 900, color: colors.textPrimary, margin: '0 0 0.6rem', lineHeight: 1.3 }}>{featured.title}</h2>
                  <p style={{ color: colors.textSecondary, fontSize: '0.875rem', lineHeight: 1.7, margin: '0 0 1rem' }}>{featured.excerpt}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.72rem', color: colors.textMuted }}>
                    <span>⏱️ {featured.readTime} min</span>
                    <span>📅 {new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </article>
            </Card>
          </Link>
        )}

        <div className="blog-grid">
          {rest.map((post) => {
            const image = getBlogImage(post.slug);
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <Card hover style={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '10px', cursor: 'pointer' }}>
                  <div style={{ height: '140px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    {image && <SiteImage image={image} rounded={false} bordered={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    <CategoryBadge post={post} style={{ position: 'absolute', left: '0.75rem', bottom: '0.75rem' }} />
                  </div>
                  <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '0.9rem', fontFamily: fonts.heading, fontWeight: 700, color: colors.textPrimary, lineHeight: 1.4, margin: '0 0 0.5rem', flex: 1 }}>{post.title}</h3>
                    <p style={{ fontSize: '0.75rem', color: colors.textMuted, lineHeight: 1.5, margin: '0 0 0.75rem' }}>{post.excerpt.substring(0, 90)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: colors.textMuted }}>
                      <span>⏱️ {post.readTime} min</span>
                      <span style={{ color: colors.gold }}>Read →</span>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
