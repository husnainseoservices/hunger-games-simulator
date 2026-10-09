'use client';
import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug } from '@/data/blog-posts';
import { categoryColors, colors, fonts, radii } from '@/lib/theme';
import { getBlogImage } from '@/lib/images';
import SiteImage from '@/components/media/SiteImage';
import { AuthorBox, RelatedPosts, BlogSidebar } from '@/components/blog';

function renderBold(text: string, kp: string | number) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, j) =>
    j % 2 === 0 ? part : <strong key={`${kp}-b${j}`} style={{ color: colors.textPrimary, fontWeight: 700 }}>{part}</strong>
  );
}

function renderInline(text: string, kp: string | number) {
  return text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
    const m = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (m) {
      const url = m[2];
      const external = /^https?:\/\//.test(url);
      const inner = renderBold(m[1], `${kp}-l${i}`);
      return external ? (
        <a key={`${kp}-l${i}`} href={url} target="_blank" rel="noopener noreferrer" style={{ color: colors.gold, textDecoration: 'underline' }}>{inner}</a>
      ) : (
        <Link key={`${kp}-l${i}`} href={url} style={{ color: colors.gold, textDecoration: 'underline' }}>{inner}</Link>
      );
    }
    return <span key={`${kp}-t${i}`}>{renderBold(part, `${kp}-t${i}`)}</span>;
  });
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const paras = post.content.split('\n\n').filter(Boolean);
  const catColor = categoryColors[post.category] || colors.gold;
  const hero = getBlogImage(post.slug);

  return (
    <>
      <style>{`.blog-layout{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:2.5rem;} .blog-layout article{min-width:0;overflow-wrap:break-word;word-wrap:break-word;} .blog-layout h1,.blog-layout h2,.blog-layout p{overflow-wrap:break-word;} @media(max-width:900px){.blog-layout{grid-template-columns:1fr;gap:1.5rem;} .blog-sidebar{display:none;}}`}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        <div className="blog-layout">
          <article>
            <nav style={{ display: 'flex', gap: '0.5rem', fontSize: '0.7rem', color: colors.textMuted, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: colors.gold, textDecoration: 'none' }}>Home</Link><span>/</span>
              <Link href="/blog" style={{ color: colors.gold, textDecoration: 'none' }}>Blog</Link><span>/</span>
              <span style={{ color: colors.textSecondary }}>{post.title.substring(0, 40)}...</span>
            </nav>

            <span style={{ fontSize: '0.6rem', fontFamily: fonts.ui, letterSpacing: '0.2em', color: catColor, background: `${catColor}18`, border: `1px solid ${catColor}44`, padding: '0.2rem 0.75rem', borderRadius: '2px', display: 'inline-block', marginBottom: '0.875rem' }}>
              {post.category.replace(/-/g, ' ').toUpperCase()}
            </span>

            <h1 style={{ fontSize: 'clamp(1.3rem,4vw,2rem)', fontFamily: fonts.heading, fontWeight: 900, lineHeight: 1.2, color: colors.textPrimary, margin: '0 0 0.75rem' }}>{post.title}</h1>
            <p style={{ fontSize: '1rem', color: colors.textSecondary, lineHeight: 1.7, margin: '0 0 1rem' }}>{post.excerpt}</p>

            <div style={{ display: 'flex', gap: '1rem', paddingBottom: '1.25rem', borderBottom: `1px solid ${colors.border}`, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', color: colors.textMuted }}>✍️ {post.author}</span>
              <span style={{ fontSize: '0.72rem', color: colors.textMuted }}>📅 {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span style={{ fontSize: '0.72rem', color: colors.textMuted }}>⏱️ {post.readTime} min read</span>
            </div>

            {/* Hero image — from the central registry, alt enforced */}
            {hero && (
              <figure style={{ margin: '0 0 1.75rem' }}>
                <SiteImage image={hero} eager style={{ width: '100%', border: `1px solid ${catColor}22` }} />
              </figure>
            )}

            {/* Content */}
            <div style={{ color: colors.textSecondary, lineHeight: 1.9, fontSize: '0.95rem' }}>
              {paras.map((p, i) => {
                if (p.startsWith('**') && p.endsWith('**')) return (
                  <h2 key={i} style={{ fontSize: 'clamp(1rem,2.5vw,1.2rem)', fontFamily: fonts.heading, fontWeight: 700, color: colors.textPrimary, margin: '2rem 0 0.75rem' }}>{p.replace(/\*\*/g, '')}</h2>
                );
                return <p key={i} style={{ marginBottom: '1.25rem' }}>{renderInline(p, i)}</p>;
              })}
            </div>

            {/* Tags */}
            <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: `1px solid ${colors.border}` }}>
              <p style={{ fontSize: '0.6rem', color: colors.textMuted, fontFamily: fonts.ui, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>TAGS</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {post.tags.map((tag) => (
                  <span key={tag} style={{ padding: '0.2rem 0.6rem', background: colors.bgSecondary, border: `1px solid ${colors.border}`, borderRadius: radii.sm, fontSize: '0.68rem', color: colors.textMuted }}>#{tag}</span>
                ))}
              </div>
            </div>

            <AuthorBox author={post.author} />
            <RelatedPosts currentId={post.id} category={post.category} />
          </article>

          <BlogSidebar />
        </div>
      </div>
    </>
  );
}
