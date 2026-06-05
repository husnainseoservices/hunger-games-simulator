'use client';
import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts, getPostBySlug } from '@/data/blog-posts';

const CAT_COLORS: Record<string,string> = { 'tribute-guides':'#d4a017','analysis':'#70a0e8','strategy':'#e87070','game-recaps':'#e8a030','district-profiles':'#70c870','rankings':'#c070e8' };

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  const paras = post.content.split('\n\n').filter(Boolean);
  const catColor = CAT_COLORS[post.category] || '#d4a017';

  return (
    <>
      <style>{`.blog-layout{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:2.5rem;} .blog-layout article{min-width:0;overflow-wrap:break-word;word-wrap:break-word;} .blog-layout h1,.blog-layout h2,.blog-layout p{overflow-wrap:break-word;} @media(max-width:900px){.blog-layout{grid-template-columns:1fr;gap:1.5rem;} .blog-sidebar{display:none;}}`}</style>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div className="blog-layout">
          <article>
            <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem',flexWrap:'wrap'}}>
              <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span>
              <Link href="/blog" style={{color:'#d4a017',textDecoration:'none'}}>Blog</Link><span>/</span>
              <span style={{color:'#a09880'}}>{post.title.substring(0,40)}...</span>
            </nav>

            <span style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:catColor,background:`${catColor}18`,border:`1px solid ${catColor}44`,padding:'0.2rem 0.75rem',borderRadius:'2px',display:'inline-block',marginBottom:'0.875rem'}}>
              {post.category.replace(/-/g,' ').toUpperCase()}
            </span>

            <h1 style={{fontSize:'clamp(1.3rem,4vw,2rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,lineHeight:1.2,color:'#e8e0d0',margin:'0 0 0.75rem'}}>{post.title}</h1>
            <p style={{fontSize:'1rem',color:'#a09880',lineHeight:1.7,margin:'0 0 1rem'}}>{post.excerpt}</p>

            <div style={{display:'flex',gap:'1rem',paddingBottom:'1.25rem',borderBottom:'1px solid #1e2818',flexWrap:'wrap',marginBottom:'1.25rem'}}>
              <span style={{fontSize:'0.72rem',color:'#5a5448'}}>✍️ {post.author}</span>
              <span style={{fontSize:'0.72rem',color:'#5a5448'}}>📅 {new Date(post.publishedAt).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</span>
              <span style={{fontSize:'0.72rem',color:'#5a5448'}}>⏱️ {post.readTime} min read</span>
            </div>

            {/* Hero image placeholder */}
            <div style={{height:'200px',background:`linear-gradient(135deg, ${catColor}18 0%, #080a06 100%)`,borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'1.75rem',border:`1px solid ${catColor}22`}}>
              <span style={{fontSize:'3rem',fontFamily:'Cinzel, serif',fontWeight:900,color:`${catColor}30`}}>{post.title.charAt(0)}</span>
            </div>

            {/* Content */}
            <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
              {paras.map((p, i) => {
                if (p.startsWith('**') && p.endsWith('**')) return (
                  <h2 key={i} style={{fontSize:'clamp(1rem,2.5vw,1.2rem)',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'2rem 0 0.75rem'}}>{p.replace(/\*\*/g,'')}</h2>
                );
                return <p key={i} style={{marginBottom:'1.25rem'}}>{p.split(/\*\*(.*?)\*\*/g).map((part, j) => j%2===0 ? part : <strong key={j} style={{color:'#e8e0d0',fontWeight:700}}>{part}</strong>)}</p>;
              })}
            </div>

            {/* Tags */}
            <div style={{marginTop:'2rem',paddingTop:'1.25rem',borderTop:'1px solid #1e2818'}}>
              <p style={{fontSize:'0.6rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',marginBottom:'0.5rem'}}>TAGS</p>
              <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
                {post.tags.map(tag => <span key={tag} style={{padding:'0.2rem 0.6rem',background:'#111609',border:'1px solid #1e2818',borderRadius:'3px',fontSize:'0.68rem',color:'#5a5448'}}>#{tag}</span>)}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{marginTop:'2rem'}}>
                <h3 style={{fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.875rem'}}>RELATED ARTICLES</h3>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(200px,100%),1fr))',gap:'0.875rem'}}>
                  {related.map(r => (
                    <Link key={r.id} href={`/blog/${r.slug}`} style={{textDecoration:'none'}}>
                      <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',padding:'0.875rem',cursor:'pointer'}}>
                        <span style={{fontSize:'0.58rem',color:CAT_COLORS[r.category]||'#d4a017',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>{r.category.replace(/-/g,' ').toUpperCase()}</span>
                        <p style={{fontSize:'0.85rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',lineHeight:1.4,margin:'0.3rem 0 0.3rem'}}>{r.title.substring(0,60)}...</p>
                        <p style={{fontSize:'0.65rem',color:'#5a5448',margin:0}}>{r.readTime} min read</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="blog-sidebar">
            <div style={{background:'linear-gradient(135deg,rgba(212,160,23,0.12),rgba(139,26,26,0.06))',border:'1px solid rgba(212,160,23,0.25)',borderRadius:'8px',padding:'1.1rem',marginBottom:'1rem',textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',marginBottom:'0.4rem'}}>⚔️</div>
              <h3 style={{fontSize:'0.88rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.35rem'}}>Run the Games</h3>
              <p style={{fontSize:'0.72rem',color:'#5a5448',margin:'0 0 0.75rem',lineHeight:1.5}}>Simulate the arena. See who survives.</p>
              <Link href="/simulator" style={{display:'block',background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#0a0c06',padding:'0.6rem',borderRadius:'4px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.12em',fontWeight:700,fontSize:'0.75rem',marginBottom:'0.4rem'}}>⚔️ SIMULATE</Link>
              <Link href="/quiz" style={{display:'block',background:'transparent',color:'#d4a017',padding:'0.6rem',borderRadius:'4px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.72rem',border:'1px solid rgba(212,160,23,0.3)'}}>🧠 TAKE THE QUIZ</Link>
            </div>

            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',padding:'1.1rem',marginBottom:'1rem'}}>
              <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.75rem'}}>RECENT POSTS</p>
              {blogPosts.slice(0,6).map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`} style={{display:'block',padding:'0.5rem 0',borderBottom:'1px solid #1e2818',textDecoration:'none'}}>
                  <p style={{fontSize:'0.78rem',fontFamily:'Cinzel, serif',color:'#e8e0d0',margin:'0 0 0.1rem',lineHeight:1.3}}>{p.title.substring(0,48)}...</p>
                  <p style={{fontSize:'0.6rem',color:'#5a5448',margin:0}}>{p.readTime} min · {p.category.replace(/-/g,' ')}</p>
                </Link>
              ))}
            </div>

            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',padding:'1.1rem'}}>
              <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.75rem'}}>CATEGORIES</p>
              {['tribute-guides','analysis','strategy','game-recaps','district-profiles','rankings'].map(cat => (
                <Link key={cat} href="/blog" style={{display:'flex',justifyContent:'space-between',padding:'0.4rem 0',borderBottom:'1px solid rgba(255,255,255,0.03)',textDecoration:'none',color:'#5a5448',fontSize:'0.8rem'}}>
                  <span>{cat.replace(/-/g,' ')}</span>
                  <span style={{color:'#2a3020'}}>{blogPosts.filter(p=>p.category===cat).length}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
