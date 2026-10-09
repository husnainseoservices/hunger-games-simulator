'use client';
import { useState } from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { BlogCategory } from '@/types';

const CATS: {id:BlogCategory|'all';label:string;icon:string}[] = [
  {id:'all',label:'All',icon:'📰'},
  {id:'tribute-guides',label:'Tribute Guides',icon:'👤'},
  {id:'analysis',label:'Analysis',icon:'📊'},
  {id:'strategy',label:'Strategy',icon:'⚔️'},
  {id:'game-recaps',label:'Recaps',icon:'🎬'},
  {id:'district-profiles',label:'Districts',icon:'🏛️'},
  {id:'rankings',label:'Rankings',icon:'🏆'},
];
const CAT_COLORS: Record<string,string> = { 'tribute-guides':'#d4a017','analysis':'#70a0e8','strategy':'#e87070','game-recaps':'#e8a030','district-profiles':'#70c870','rankings':'#c070e8' };

export default function BlogPage() {
  const [active, setActive] = useState<BlogCategory|'all'>('all');
  const filtered = active === 'all' ? blogPosts : blogPosts.filter(p => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <style>{`.blog-feat{display:grid;grid-template-columns:1fr 1fr;} .blog-feat *{min-width:0;overflow-wrap:break-word;} .blog-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(280px,100%),1fr));gap:1rem;} .blog-grid h3,.blog-grid p{overflow-wrap:break-word;} @media(max-width:700px){.blog-feat{grid-template-columns:1fr;}}`}</style>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div style={{marginBottom:'1.75rem'}}>
          <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'0.75rem'}}>
            <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Blog</span>
          </nav>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.4rem'}}>📰 THE ARENA REPORT</p>
          <h1 style={{fontSize:'clamp(1.75rem,5vw,2.75rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.4rem'}}>Hunger Games Blog</h1>
          <p style={{color:'#a09880',margin:0}}>Tribute guides, simulation analysis, district profiles, and strategy breakdowns</p>
        </div>

        <div style={{display:'flex',gap:'0.4rem',marginBottom:'1.75rem',overflowX:'auto',paddingBottom:'0.25rem',flexWrap:'wrap'}}>
          {CATS.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} style={{padding:'0.4rem 0.875rem',background:active===c.id?'rgba(212,160,23,0.1)':'#0d1009',border:`1px solid ${active===c.id?'rgba(212,160,23,0.5)':'#1e2818'}`,borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.08em',fontSize:'0.72rem',color:active===c.id?'#d4a017':'#5a5448',whiteSpace:'nowrap',flexShrink:0}}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug}`} style={{textDecoration:'none',display:'block',marginBottom:'1.5rem'}}>
            <article className="blog-feat" style={{background:'#0d1009',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'12px',overflow:'hidden'}}>
              <div style={{height:'220px',background:`linear-gradient(135deg, ${CAT_COLORS[featured.category]||'#d4a017'}20, #080a06)`,display:'flex',alignItems:'flex-end',padding:'1.25rem',minHeight:'220px'}}>
                <span style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:CAT_COLORS[featured.category]||'#d4a017',background:`${CAT_COLORS[featured.category]||'#d4a017'}18`,border:`1px solid ${CAT_COLORS[featured.category]||'#d4a017'}44`,padding:'0.25rem 0.75rem',borderRadius:'2px'}}>FEATURED · {featured.category.replace('-',' ').toUpperCase()}</span>
              </div>
              <div style={{padding:'1.5rem',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <h2 style={{fontSize:'clamp(1rem,3vw,1.4rem)',fontFamily:'Cinzel, serif',fontWeight:900,color:'#e8e0d0',margin:'0 0 0.6rem',lineHeight:1.3}}>{featured.title}</h2>
                <p style={{color:'#a09880',fontSize:'0.875rem',lineHeight:1.7,margin:'0 0 1rem'}}>{featured.excerpt}</p>
                <div style={{display:'flex',gap:'1rem',fontSize:'0.72rem',color:'#5a5448'}}>
                  <span>⏱️ {featured.readTime} min</span>
                  <span>📅 {new Date(featured.publishedAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                </div>
              </div>
            </article>
          </Link>
        )}

        <div className="blog-grid">
          {rest.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} style={{textDecoration:'none'}}>
              <article style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',overflow:'hidden',height:'100%',display:'flex',flexDirection:'column',cursor:'pointer'}}>
                <div style={{height:'100px',background:`linear-gradient(135deg, ${CAT_COLORS[post.category]||'#d4a017'}15, #0a0c08)`,display:'flex',alignItems:'flex-end',padding:'0.75rem'}}>
                  <span style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:CAT_COLORS[post.category]||'#d4a017'}}>{post.category.replace('-',' ').toUpperCase()}</span>
                </div>
                <div style={{padding:'1rem',flex:1,display:'flex',flexDirection:'column'}}>
                  <h3 style={{fontSize:'0.9rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',lineHeight:1.4,margin:'0 0 0.5rem',flex:1}}>{post.title}</h3>
                  <p style={{fontSize:'0.75rem',color:'#5a5448',lineHeight:1.5,margin:'0 0 0.75rem'}}>{post.excerpt.substring(0,90)}...</p>
                  <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.65rem',color:'#5a5448'}}>
                    <span>⏱️ {post.readTime} min</span>
                    <span style={{color:'#d4a017'}}>Read →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
