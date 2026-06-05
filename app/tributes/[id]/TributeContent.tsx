'use client';
import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tributes, getTributeById, calculateVictoryOdds } from '@/data/tributes';
import TributeAvatar from '@/components/TributeAvatar';

const STAT_LABELS: Record<string,[string,string]> = {
  strength: ['Strength','💪'], agility: ['Agility','⚡'], survival: ['Survival','🌿'],
  intelligence: ['Intelligence','🧠'], charisma: ['Charisma','✨'], stealth: ['Stealth','👁️'],
  weaponSkill: ['Weapon Skill','⚔️'], allianceLoyalty: ['Alliance','🤝'],
};
const STAT_COLORS = ['#e87070','#70c870','#70a0e8','#c070e8','#d4a017','#5a8b6a','#e8a030','#70c8c8'];
const BG_COLORS: Record<string,string> = { Career:'#d4a017', Victor:'#c070e8', Volunteer:'#70c870', Reaped:'#e87070' };

export default function TributePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const t = getTributeById(id);
  if (!t) notFound();

  const odds = calculateVictoryOdds(t, tributes);
  const overallScore = Math.round(Object.values(t.stats).reduce((a,b)=>a+b,0)/Object.keys(t.stats).length);
  const topStat = Object.entries(t.stats).sort((a,b)=>b[1]-a[1])[0];
  const districtMates = tributes.filter(tr => tr.districtNumber === t.districtNumber && tr.id !== t.id);
  const rivals = tributes.filter(tr => tr.id !== t.id && tr.districtNumber !== t.districtNumber).sort((a,b) => {
    const sa = a.stats.strength+a.stats.weaponSkill; const sb = b.stats.strength+b.stats.weaponSkill;
    return Math.abs(sa-(t.stats.strength+t.stats.weaponSkill)) - Math.abs(sb-(t.stats.strength+t.stats.weaponSkill));
  }).slice(0,3);

  return (
    <>
      <style>{`.tribute-layout{display:grid;grid-template-columns:1fr 320px;gap:2rem;} .tribute-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;} @media(max-width:900px){.tribute-layout{grid-template-columns:1fr;} .tribute-stats-grid{grid-template-columns:repeat(2,1fr);}}`}</style>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem',flexWrap:'wrap'}}>
          <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span>
          <Link href="/tributes" style={{color:'#d4a017',textDecoration:'none'}}>Tributes</Link><span>/</span>
          <span style={{color:'#a09880'}}>{t.name}</span>
        </nav>

        {/* Hero */}
        <div style={{background:'linear-gradient(135deg, rgba(212,160,23,0.1), rgba(139,26,26,0.06))',border:'1px solid rgba(212,160,23,0.25)',borderRadius:'14px',padding:'1.75rem',marginBottom:'1.5rem'}}>
          <div style={{display:'flex',gap:'1.5rem',alignItems:'flex-start',flexWrap:'wrap'}}>
            <TributeAvatar src={t.image} name={t.name} size={88} fontSize="2.2rem" />
            <div style={{flex:1,minWidth:'200px'}}>
              <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.5rem',flexWrap:'wrap'}}>
                <span style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:BG_COLORS[t.background]||'#a09880',background:`${BG_COLORS[t.background]||'#a09880'}18`,border:`1px solid ${BG_COLORS[t.background]||'#a09880'}44`,padding:'0.2rem 0.6rem',borderRadius:'2px'}}>{t.background.toUpperCase()}</span>
                <span style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#5a5448',background:'#111609',border:'1px solid #1e2818',padding:'0.2rem 0.6rem',borderRadius:'2px'}}>{t.district.toUpperCase()}</span>
              </div>
              <h1 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.25rem',color:'#e8e0d0'}}>{t.name}</h1>
              {t.nickname && <p style={{fontSize:'0.9rem',color:'#d4a017',margin:'0 0 0.75rem',fontFamily:'Cinzel, serif',fontStyle:'italic'}}>"{t.nickname}"</p>}
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                {[{l:'Age',v:t.age},{l:'Training',v:`${t.trainingScore}/12`},{l:'Weapon',v:t.weapon.split(',')[0]},{l:'Strategy',v:t.strategy.split(',')[0]}].map(s => (
                  <div key={s.l} style={{textAlign:'center'}}>
                    <p style={{fontSize:'0.85rem',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.1rem'}}>{s.v}</p>
                    <p style={{fontSize:'0.55rem',color:'#5a5448',margin:0,fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>{s.l.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'2.5rem',fontWeight:700,color:'#d4a017',margin:'0 0 0.1rem',fontFamily:'Cinzel, serif'}}>{odds}%</p>
              <p style={{fontSize:'0.6rem',color:'#5a5448',margin:0,fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>VICTORY ODDS</p>
            </div>
          </div>
        </div>

        <div className="tribute-layout">
          <div>
            {/* Stats */}
            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem',marginBottom:'1.1rem'}}>
              <p style={{fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',marginBottom:'1rem'}}>TRIBUTE STATS</p>
              <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
                {(Object.entries(t.stats) as [keyof typeof t.stats, number][]).map(([key, val], i) => {
                  const [label, icon] = STAT_LABELS[key] || [key,''];
                  const color = STAT_COLORS[i % STAT_COLORS.length];
                  return (
                    <div key={key}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem'}}>
                        <span style={{fontSize:'0.78rem',color:'#a09880'}}>{icon} {label}</span>
                        <span style={{fontSize:'0.78rem',fontWeight:700,color:val>=90?'#d4a017':val>=75?color:'#5a5448'}}>{val}/100</span>
                      </div>
                      <div style={{height:'6px',background:'#1e2818',borderRadius:'3px',overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${val}%`,background:color,borderRadius:'3px'}}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem',marginBottom:'1.1rem'}}>
              <p style={{fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',marginBottom:'0.875rem'}}>BIOGRAPHY</p>
              <p style={{color:'#a09880',lineHeight:1.8,fontSize:'0.9rem'}}>{t.bio}</p>
            </div>

            {/* Catchphrase */}
            <div style={{background:'rgba(212,160,23,0.05)',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'10px',padding:'1.25rem',marginBottom:'1.1rem'}}>
              <p style={{fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',marginBottom:'0.5rem'}}>MEMORABLE QUOTE</p>
              <p style={{color:'#e8e0d0',fontSize:'1rem',fontFamily:'Cinzel, serif',fontStyle:'italic',lineHeight:1.7}}>"{t.catchphrase}"</p>
            </div>

            {/* Strategy */}
            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem',marginBottom:'1.1rem'}}>
              <p style={{fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',marginBottom:'0.75rem'}}>ARENA STRATEGY</p>
              <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
                {t.strategy.split(',').map(s => <span key={s} style={{fontSize:'0.75rem',color:'#a09880',background:'#111609',border:'1px solid #1e2818',padding:'0.3rem 0.75rem',borderRadius:'4px'}}>{s.trim()}</span>)}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
              <Link href="/simulator" style={{flex:1,background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#0a0c06',padding:'0.875rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:700,fontSize:'0.8rem',textAlign:'center',minWidth:'140px'}}>⚔️ SIMULATE GAMES</Link>
              <Link href="/fight" style={{flex:1,background:'transparent',color:'#d4a017',border:'1px solid rgba(212,160,23,0.4)',padding:'0.875rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.8rem',textAlign:'center',minWidth:'120px'}}>👊 1v1 FIGHT</Link>
              <Link href="/odds" style={{flex:1,background:'transparent',color:'#a09880',border:'1px solid #1e2818',padding:'0.875rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.8rem',textAlign:'center',minWidth:'100px'}}>📊 ODDS</Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Key stats */}
            <div className="tribute-stats-grid" style={{marginBottom:'1rem'}}>
              {[{l:'Overall',v:overallScore,c:'#d4a017'},{l:'Top Stat',v:`${topStat[1]}`,c:'#70c870'},{l:'Training',v:`${t.trainingScore}/12`,c:'#e8a030'},{l:'Odds',v:`${odds}%`,c:'#c070e8'}].map(s => (
                <div key={s.l} style={{background:'#0d1009',border:`1px solid ${s.c}33`,borderRadius:'8px',padding:'0.75rem',textAlign:'center'}}>
                  <p style={{fontSize:'1.1rem',fontWeight:700,color:s.c,margin:'0 0 0.1rem',fontFamily:'Cinzel, serif'}}>{s.v}</p>
                  <p style={{fontSize:'0.55rem',color:'#5a5448',margin:0,fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>{s.l.toUpperCase()}</p>
                </div>
              ))}
            </div>

            {districtMates.length > 0 && (
              <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.1rem',marginBottom:'1rem'}}>
                <p style={{fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.6rem'}}>DISTRICT TRIBUTES</p>
                {districtMates.map(dm => (
                  <Link key={dm.id} href={`/tributes/${dm.id}`} style={{display:'flex',alignItems:'center',gap:'0.6rem',padding:'0.5rem 0',borderBottom:'1px solid #1e2818',textDecoration:'none'}}>
                    <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#d4a017,#8b6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',fontWeight:900,color:'#0a0c06',flexShrink:0}}>{dm.name.charAt(0)}</div>
                    <div><p style={{fontSize:'0.8rem',fontFamily:'Cinzel, serif',color:'#e8e0d0',margin:0}}>{dm.name}</p><p style={{fontSize:'0.6rem',color:'#5a5448',margin:0}}>{dm.background}</p></div>
                  </Link>
                ))}
              </div>
            )}

            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.1rem',marginBottom:'1rem'}}>
              <p style={{fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.6rem'}}>COMPARABLE RIVALS</p>
              {rivals.map(r => (
                <Link key={r.id} href={`/tributes/${r.id}`} style={{display:'flex',alignItems:'center',gap:'0.6rem',padding:'0.5rem 0',borderBottom:'1px solid #1e2818',textDecoration:'none'}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#8b1a1a,#c0362b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.7rem',fontWeight:900,color:'#fff',flexShrink:0}}>{r.name.charAt(0)}</div>
                  <div><p style={{fontSize:'0.8rem',fontFamily:'Cinzel, serif',color:'#e8e0d0',margin:0}}>{r.name}</p><p style={{fontSize:'0.6rem',color:'#5a5448',margin:0}}>D{r.districtNumber}</p></div>
                </Link>
              ))}
            </div>

            <Link href="/tributes" style={{display:'block',background:'#0d1009',color:'#d4a017',border:'1px solid rgba(212,160,23,0.3)',padding:'0.75rem',borderRadius:'6px',textAlign:'center',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.78rem'}}>
              ← ALL TRIBUTES
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}