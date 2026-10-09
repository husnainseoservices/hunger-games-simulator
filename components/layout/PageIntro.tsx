import Link from 'next/link';

export interface FaqItem { q: string; a: string }
export interface StepItem { icon: string; title: string; text: string }

interface PageIntroProps {
  kicker: string;
  title: string;
  paragraphs: string[];
  steps?: StepItem[];
  stepsTitle?: string;
  faqs?: FaqItem[];
  cta?: { href: string; label: string }[];
}

/** Editorial intro block for tool pages: unique prose, how-to steps and FAQs so
 *  interactive pages also carry substantial indexable content. */
export default function PageIntro({ kicker, title, paragraphs, steps, stepsTitle, faqs, cta }: PageIntroProps) {
  return (
    <div style={{maxWidth:'900px',margin:'0 auto',padding:'2rem 1rem 1.5rem'}}>
      <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.35em',margin:'0 0 0.75rem'}}>{kicker}</p>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.6rem,4vw,2.4rem)',margin:'0 0 1.25rem',lineHeight:1.2,color:'#e8e0d0'}}>{title}</h1>
      <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
        {paragraphs.map((p, i) => <p key={i} style={{marginBottom:'1.1rem'}}>{p}</p>)}
      </div>
      {cta && (
        <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',marginTop:'1.25rem'}}>
          {cta.map((c, i) => (
            <Link key={c.href} href={c.href} style={{
              padding:'0.7rem 1.5rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',
              letterSpacing:'0.12em',fontWeight:700,fontSize:'0.8rem',
              background: i === 0 ? 'linear-gradient(135deg,#d4a017,#b8860b)' : 'transparent',
              color: i === 0 ? '#080a06' : '#d4a017',
              border: i === 0 ? 'none' : '1px solid rgba(212,160,23,0.35)',
            }}>{c.label}</Link>
          ))}
        </div>
      )}
      {steps && steps.length > 0 && (
        <div style={{marginTop:'2rem'}}>
          <h2 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.2rem,3vw,1.6rem)',margin:'0 0 1.25rem',color:'#e8e0d0'}}>{stepsTitle || 'How It Works'}</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'0.875rem'}}>
            {steps.map((s, i) => (
              <div key={i} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.1rem'}}>
                <div style={{fontSize:'1.6rem',marginBottom:'0.6rem'}}>{s.icon}</div>
                <h3 style={{fontSize:'0.9rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.4rem'}}>{s.title}</h3>
                <p style={{fontSize:'0.78rem',color:'#a09880',lineHeight:1.7,margin:0}}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {faqs && faqs.length > 0 && (
        <div style={{marginTop:'2rem'}}>
          <h2 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.2rem,3vw,1.6rem)',margin:'0 0 1.25rem',color:'#e8e0d0'}}>Frequently Asked Questions</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'0.7rem'}}>
            {faqs.map((f, i) => (
              <details key={i} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',overflow:'hidden'}}>
                <summary style={{padding:'1rem 1.15rem',cursor:'pointer',fontFamily:'Cinzel, serif',fontWeight:700,fontSize:'0.9rem',color:'#e8e0d0',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem'}}>
                  {f.q}
                  <span style={{color:'#d4a017',fontSize:'1.2rem',flexShrink:0}}>+</span>
                </summary>
                <div style={{padding:'0 1.15rem 1.15rem',color:'#a09880',lineHeight:1.8,fontSize:'0.85rem'}}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      )}
      <style>{`details summary::-webkit-details-marker{display:none;}`}</style>
    </div>
  );
}
