'use client';
import Link from 'next/link';
import { districts } from '@/data/districts';
import { tributes } from '@/data/tributes';

export default function DistrictsPage() {
  return (
    <>
      <style>{`.dist-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.1rem;} .dist-card-inner{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;}`}</style>
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div style={{marginBottom:'1.75rem'}}>
          <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'0.75rem'}}>
            <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Districts</span>
          </nav>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.4rem'}}>🏛️ THE 13 DISTRICTS OF PANEM</p>
          <h1 style={{fontSize:'clamp(1.75rem,5vw,2.75rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.4rem'}}>Districts of Panem</h1>
          <p style={{color:'#a09880',margin:0}}>Wealth levels, industries, tribute counts, and historical win rates</p>
        </div>

        <div className="dist-grid">
          {districts.map(d => {
            const distTributes = tributes.filter(t => t.districtNumber === d.number);
            return (
              <div key={d.id} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'12px',overflow:'hidden'}}>
                {/* Header banner */}
                <div style={{height:'80px',background:`linear-gradient(135deg, ${d.color}30 0%, #080a06 100%)`,display:'flex',alignItems:'center',padding:'0 1.25rem',position:'relative',borderBottom:'1px solid #1e2818'}}>
                  <div style={{position:'absolute',left:0,top:0,bottom:0,width:'4px',background:d.color,opacity:0.8}}/>
                  <div>
                    <p style={{fontSize:'0.55rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:d.color,margin:'0 0 0.2rem'}}>DISTRICT {d.number}</p>
                    <h3 style={{fontSize:'1.1rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.1rem'}}>{d.industry}</h3>
                    <p style={{fontSize:'0.65rem',color:'#5a5448',margin:0}}>📍 {d.location}</p>
                  </div>
                  <div style={{marginLeft:'auto',textAlign:'right'}}>
                    <p style={{fontSize:'1.25rem',fontWeight:700,color:d.color,margin:0,fontFamily:'Cinzel, serif'}}>{d.pastWinners}</p>
                    <p style={{fontSize:'0.5rem',color:'#5a5448',margin:0,fontFamily:'Oswald, sans-serif'}}>PAST WINS</p>
                  </div>
                </div>

                <div style={{padding:'1.1rem'}}>
                  <p style={{fontSize:'0.8rem',color:'#a09880',lineHeight:1.6,marginBottom:'1rem'}}>{d.description.substring(0, 130)}...</p>

                  <div style={{marginBottom:'0.875rem'}}>
                    {[['WEALTH LEVEL',d.wealthLevel,'#d4a017'],['CAPITOL LOYALTY',d.loyaltyToCapitol,'#70a0e8']].map(([l,v,c]) => (
                      <div key={String(l)} style={{marginBottom:'0.5rem'}}>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.2rem'}}>
                          <span style={{fontSize:'0.55rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>{String(l)}</span>
                          <span style={{fontSize:'0.6rem',fontWeight:700,color:String(c)}}>{Number(v)}/100</span>
                        </div>
                        <div style={{height:'4px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}>
                          <div style={{height:'100%',width:`${Number(v)}%`,background:String(c),borderRadius:'2px'}}/>
                        </div>
                      </div>
                    ))}
                  </div>

                  {distTributes.length > 0 && (
                    <div style={{marginBottom:'0.875rem'}}>
                      <p style={{fontSize:'0.55rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#5a5448',marginBottom:'0.4rem'}}>TRIBUTES IN ROSTER</p>
                      <div style={{display:'flex',gap:'0.35rem',flexWrap:'wrap'}}>
                        {distTributes.map(t => (
                          <Link key={t.id} href={`/tributes/${t.id}`} style={{fontSize:'0.68rem',color:'#a09880',background:'#111609',border:'1px solid #1e2818',padding:'0.15rem 0.5rem',borderRadius:'3px',textDecoration:'none',whiteSpace:'nowrap'}}>{t.name}</Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{display:'flex',gap:'0.5rem',justifyContent:'space-between',paddingTop:'0.75rem',borderTop:'1px solid #1e2818'}}>
                    <span style={{fontSize:'0.68rem',color:'#5a5448'}}>📊 Avg Training: <span style={{color:d.color,fontWeight:700}}>{d.trainingScore}</span></span>
                    <span style={{fontSize:'0.68rem',color:'#5a5448'}}>🎖️ {d.theme}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
