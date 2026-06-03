'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { tributes, calculateVictoryOdds } from '@/data/tributes';
import { Tribute } from '@/types';

type SortKey = 'odds'|'strength'|'survival'|'weaponSkill'|'stealth'|'intelligence'|'agility';

const STAT_COLORS: Record<string,string> = {
  strength:'#e87070', agility:'#70c870', survival:'#70a0e8',
  intelligence:'#c070e8', charisma:'#e8a8d0', stealth:'#5a8b6a',
  weaponSkill:'#d4a017', allianceLoyalty:'#70c8c8',
};

const SORT_OPTIONS: { key: SortKey; label: string; icon: string }[] = [
  { key: 'odds', label: 'Victory Odds', icon: '📊' },
  { key: 'strength', label: 'Strength', icon: '💪' },
  { key: 'survival', label: 'Survival', icon: '🌿' },
  { key: 'weaponSkill', label: 'Weapon Skill', icon: '⚔️' },
  { key: 'stealth', label: 'Stealth', icon: '👁️' },
  { key: 'intelligence', label: 'Intelligence', icon: '🧠' },
  { key: 'agility', label: 'Agility', icon: '⚡' },
];

const BG_COLORS: Record<string,string> = { Career:'#d4a017', Victor:'#c070e8', Volunteer:'#70c870', Reaped:'#e87070' };

export default function OddsPage() {
  const [selected, setSelected] = useState<string[]>(tributes.map(t => t.id));
  const [sortBy, setSortBy] = useState<SortKey>('odds');
  const [search, setSearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState(0);
  const [bgFilter, setBgFilter] = useState('');
  const [view, setView] = useState<'table'|'cards'>('table');

  const pool = useMemo(() => tributes.filter(t => selected.includes(t.id)), [selected]);
  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.length > 1 ? prev.filter(p => p !== id) : prev : [...prev, id]);
  const selectAll = () => setSelected(tributes.map(t => t.id));
  const selectCareers = () => setSelected(tributes.filter(t => t.background === 'Career').map(t => t.id));
  const selectDistrict = (n: number) => setSelected(tributes.filter(t => t.districtNumber === n).map(t => t.id));

  const oddsData = useMemo(() => pool.map(t => ({
    tribute: t,
    odds: calculateVictoryOdds(t, pool)
  })).sort((a, b) => {
    if (sortBy === 'odds') return b.odds - a.odds;
    return b.tribute.stats[sortBy as keyof typeof b.tribute.stats] - a.tribute.stats[sortBy as keyof typeof a.tribute.stats];
  }), [pool, sortBy]);

  const filtered = useMemo(() => oddsData.filter(({tribute:t}) => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (districtFilter && t.districtNumber !== districtFilter) return false;
    if (bgFilter && t.background !== bgFilter) return false;
    return true;
  }), [oddsData, search, districtFilter, bgFilter]);

  const top3 = oddsData.slice(0, 3);
  const leader = oddsData[0];
  const darkHorse = oddsData.find(d => d.tribute.background === 'Reaped' || d.tribute.background === 'Volunteer');

  return (
    <>
      <style>{`
        .odds-layout{display:grid;grid-template-columns:1fr 280px;gap:2rem;}
        .odds-podium{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.875rem;}
        @media(max-width:900px){.odds-layout{grid-template-columns:1fr;} .odds-sidebar{display:none;}}
        @media(max-width:600px){.odds-podium{grid-template-columns:1fr;}}
      `}</style>
      <div style={{maxWidth:'1300px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        {/* Header */}
        <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'0.75rem'}}>
          <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Odds Calculator</span>
        </nav>
        <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.4rem'}}>📊 LIVE CAPITOL BETTING ODDS</p>
        <h1 style={{fontSize:'clamp(1.75rem,5vw,2.75rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.4rem'}}>Victory Odds Calculator</h1>
        <p style={{color:'#a09880',margin:'0 0 1.5rem'}}>Select your tribute pool · Sort by any stat · Watch odds update in real-time</p>

        <div className="odds-layout">
          <div>
            {/* Pool summary */}
            <div style={{background:'rgba(212,160,23,0.06)',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'8px',padding:'0.875rem 1rem',marginBottom:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'0.5rem'}}>
              <span style={{fontSize:'0.78rem',color:'#a09880'}}>
                Pool: <strong style={{color:'#d4a017'}}>{pool.length}</strong> tributes · All odds sum to <strong style={{color:'#d4a017'}}>100%</strong>
              </span>
              <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
                <button onClick={selectAll} style={{background:'#0d1009',border:'1px solid #1e2818',color:'#a09880',padding:'0.25rem 0.6rem',borderRadius:'3px',cursor:'pointer',fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>ALL</button>
                <button onClick={selectCareers} style={{background:'rgba(212,160,23,0.08)',border:'1px solid rgba(212,160,23,0.3)',color:'#d4a017',padding:'0.25rem 0.6rem',borderRadius:'3px',cursor:'pointer',fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>CAREERS ONLY</button>
                {[1,2,4,12].map(n => (
                  <button key={n} onClick={()=>selectDistrict(n)} style={{background:'#0d1009',border:'1px solid #1e2818',color:'#a09880',padding:'0.25rem 0.6rem',borderRadius:'3px',cursor:'pointer',fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>D{n}</button>
                ))}
              </div>
            </div>

            {/* Tribute selector */}
            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1rem',marginBottom:'1.25rem'}}>
              <h3 style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.875rem'}}>SELECT TRIBUTES IN POOL</h3>
              <div style={{display:'flex',flexWrap:'wrap',gap:'0.35rem'}}>
                {tributes.map(t => (
                  <button key={t.id} onClick={()=>toggle(t.id)} style={{background:selected.includes(t.id)?`${BG_COLORS[t.background]||'#5a5448'}15`:'transparent',border:`1px solid ${selected.includes(t.id)?BG_COLORS[t.background]||'rgba(212,160,23,0.5)':'#1e2818'}`,color:selected.includes(t.id)?BG_COLORS[t.background]||'#d4a017':'#5a5448',padding:'0.25rem 0.5rem',borderRadius:'3px',cursor:'pointer',fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em',whiteSpace:'nowrap',transition:'all 0.15s',outline:'none'}}>
                    D{t.districtNumber} {t.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Podium */}
            {top3.length >= 3 && (
              <div style={{marginBottom:'1.25rem'}}>
                <h3 style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.875rem'}}>TOP FAVORITES</h3>
                <div className="odds-podium">
                  {[top3[1],top3[0],top3[2]].map((d,i) => {
                    if (!d) return <div key={i}/>;
                    const rank = i===1?1:i===0?2:3;
                    const medals = ['🥈','🥇','🥉'];
                    const heights = ['140px','180px','130px'];
                    return (
                      <Link key={d.tribute.id} href={`/tributes/${d.tribute.id}`} style={{textDecoration:'none'}}>
                        <div style={{background:rank===1?'rgba(212,160,23,0.08)':'rgba(255,255,255,0.02)',border:`1px solid ${rank===1?'rgba(212,160,23,0.4)':'#1e2818'}`,borderRadius:'10px',padding:'1rem',textAlign:'center',height:heights[i],display:'flex',flexDirection:'column',justifyContent:'center',boxSizing:'border-box',cursor:'pointer'}}>
                          <div style={{fontSize:'1.2rem',marginBottom:'0.3rem'}}>{medals[i]}</div>
                          <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#d4a017,#8b6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.9rem',fontWeight:900,color:'#080a06',fontFamily:'Cinzel, serif',margin:'0 auto 0.4rem'}}>{d.tribute.name.charAt(0)}</div>
                          <p style={{fontSize:'0.8rem',fontFamily:'Cinzel, serif',fontWeight:700,color:rank===1?'#d4a017':'#e8e0d0',margin:'0 0 0.1rem'}}>{d.tribute.name.split(' ')[0]}</p>
                          <p style={{fontSize:'0.6rem',color:'#5a5448',margin:'0 0 0.3rem'}}>D{d.tribute.districtNumber}</p>
                          <p style={{fontSize:'1.1rem',fontWeight:700,color:'#d4a017',margin:0,fontFamily:'Cinzel, serif'}}>{d.odds}%</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filters + Sort */}
            <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.875rem',flexWrap:'wrap'}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search..." style={{flex:'1 1 150px',background:'#0d1009',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.45rem 0.75rem',color:'#e8e0d0',fontSize:'0.82rem',outline:'none'}}/>
              <select value={districtFilter} onChange={e=>setDistrictFilter(+e.target.value)} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.45rem 0.6rem',color:'#e8e0d0',fontSize:'0.78rem',outline:'none',cursor:'pointer'}}>
                <option value={0}>All Districts</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(n=><option key={n} value={n}>D{n}</option>)}
              </select>
              <select value={bgFilter} onChange={e=>setBgFilter(e.target.value)} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.45rem 0.6rem',color:'#e8e0d0',fontSize:'0.78rem',outline:'none',cursor:'pointer'}}>
                <option value="">All Backgrounds</option>
                {['Career','Victor','Volunteer','Reaped'].map(b=><option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Sort tabs */}
            <div style={{display:'flex',gap:'0.35rem',marginBottom:'0.875rem',flexWrap:'wrap'}}>
              {SORT_OPTIONS.map(s => (
                <button key={s.key} onClick={()=>setSortBy(s.key)} style={{background:sortBy===s.key?`rgba(212,160,23,0.1)`:'#0d1009',border:`1px solid ${sortBy===s.key?'rgba(212,160,23,0.5)':'#1e2818'}`,color:sortBy===s.key?'#d4a017':'#5a5448',padding:'0.3rem 0.6rem',borderRadius:'3px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em',fontSize:'0.68rem',outline:'none',whiteSpace:'nowrap'}}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            {/* Odds Table */}
            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',overflow:'hidden'}}>
              <div style={{display:'grid',gridTemplateColumns:'36px 1fr 80px 70px 70px 60px',padding:'0.6rem 1rem',borderBottom:'1px solid #1e2818',gap:'0.5rem'}}>
                {['#','Tribute','Odds','W.Skill','Survival','Dist.'].map(h=><span key={h} style={{fontSize:'0.55rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>{h.toUpperCase()}</span>)}
              </div>
              {filtered.slice(0,30).map(({tribute:t, odds:o}, i) => (
                <Link key={t.id} href={`/tributes/${t.id}`} style={{textDecoration:'none',display:'grid',gridTemplateColumns:'36px 1fr 80px 70px 70px 60px',padding:'0.65rem 1rem',borderBottom:'1px solid rgba(255,255,255,0.02)',gap:'0.5rem',alignItems:'center',transition:'background 0.15s'}}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.02)'}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='transparent'}>
                  <span style={{fontSize:'0.7rem',color:'#5a5448',fontFamily:'Cinzel, serif'}}>#{i+1}</span>
                  <div style={{minWidth:0}}>
                    <p style={{fontSize:'0.85rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.1rem',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</p>
                    <div style={{display:'flex',gap:'0.3rem'}}>
                      <span style={{fontSize:'0.52rem',color:BG_COLORS[t.background]||'#a09880'}}>{t.background}</span>
                      <span style={{fontSize:'0.52rem',color:'#5a5448'}}>Age {t.age}</span>
                    </div>
                  </div>
                  <div>
                    <p style={{fontSize:'0.9rem',fontWeight:700,color:'#d4a017',margin:'0 0 0.1rem',fontFamily:'Cinzel, serif'}}>{o}%</p>
                    <div style={{height:'3px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${(o/oddsData[0].odds)*100}%`,background:'linear-gradient(90deg,#d4a017,#f0c842)',borderRadius:'2px'}}/>
                    </div>
                  </div>
                  <span style={{fontSize:'0.82rem',color:STAT_COLORS.weaponSkill,fontWeight:700,fontFamily:'Cinzel, serif'}}>{t.stats.weaponSkill}</span>
                  <span style={{fontSize:'0.82rem',color:STAT_COLORS.survival,fontWeight:700,fontFamily:'Cinzel, serif'}}>{t.stats.survival}</span>
                  <span style={{fontSize:'0.75rem',color:'#5a5448'}}>D{t.districtNumber}</span>
                </Link>
              ))}
            </div>
            <p style={{fontSize:'0.65rem',color:'#5a5448',margin:'0.5rem 0 0',textAlign:'right'}}>Showing {Math.min(filtered.length,30)} of {filtered.length} tributes</p>
          </div>

          {/* Sidebar */}
          <aside className="odds-sidebar">
            {leader && (
              <div style={{background:'linear-gradient(135deg,rgba(212,160,23,0.1),rgba(139,26,26,0.05))',border:'1px solid rgba(212,160,23,0.3)',borderRadius:'10px',padding:'1.25rem',marginBottom:'1rem',textAlign:'center'}}>
                <p style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',margin:'0 0 0.6rem'}}>CAPITOL FAVOURITE</p>
                <div style={{width:56,height:56,borderRadius:'50%',background:'linear-gradient(135deg,#d4a017,#8b6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',fontWeight:900,color:'#080a06',fontFamily:'Cinzel, serif',margin:'0 auto 0.6rem'}}>{leader.tribute.name.charAt(0)}</div>
                <h3 style={{fontSize:'1.1rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',margin:'0 0 0.2rem'}}>{leader.tribute.name}</h3>
                <p style={{fontSize:'0.68rem',color:'#5a5448',margin:'0 0 0.75rem'}}>D{leader.tribute.districtNumber} · {leader.tribute.background}</p>
                <div style={{fontSize:'2rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',margin:'0 0 0.2rem'}}>{leader.odds}%</div>
                <p style={{fontSize:'0.6rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',margin:0}}>VICTORY PROBABILITY</p>
                <Link href={`/tributes/${leader.tribute.id}`} style={{display:'block',marginTop:'0.875rem',background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.5rem',borderRadius:'4px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontSize:'0.72rem',fontWeight:700}}>
                  VIEW PROFILE →
                </Link>
              </div>
            )}

            {darkHorse && (
              <div style={{background:'rgba(112,200,112,0.05)',border:'1px solid rgba(112,200,112,0.2)',borderRadius:'10px',padding:'1.1rem',marginBottom:'1rem'}}>
                <p style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#70c870',margin:'0 0 0.6rem'}}>🌿 DARK HORSE</p>
                <h3 style={{fontSize:'0.95rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.2rem'}}>{darkHorse.tribute.name}</h3>
                <p style={{fontSize:'0.68rem',color:'#5a5448',margin:'0 0 0.5rem'}}>D{darkHorse.tribute.districtNumber} · Underdog pick</p>
                <div style={{fontSize:'1.5rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'#70c870'}}>{darkHorse.odds}%</div>
              </div>
            )}

            {/* Stat key */}
            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.1rem'}}>
              <p style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',margin:'0 0 0.875rem'}}>ODDS FORMULA</p>
              <p style={{fontSize:'0.75rem',color:'#a09880',lineHeight:1.7,marginBottom:'0.75rem'}}>Victory odds are calculated from weighted stats:</p>
              {[['Weapon Skill','20%','#d4a017'],['Survival','20%','#70a0e8'],['Strength','15%','#e87070'],['Agility','15%','#70c870'],['Intelligence','15%','#c070e8'],['Stealth','15%','#5a8b6a']].map(([s,w,c])=>(
                <div key={s} style={{display:'flex',justifyContent:'space-between',marginBottom:'0.35rem'}}>
                  <span style={{fontSize:'0.72rem',color:c}}>{s}</span>
                  <span style={{fontSize:'0.72rem',color:c,fontWeight:700}}>{w}</span>
                </div>
              ))}
              <div style={{paddingTop:'0.75rem',borderTop:'1px solid #1e2818',marginTop:'0.75rem',fontSize:'0.68rem',color:'#5a5448',lineHeight:1.6}}>
                All tribute odds normalize to exactly 100% within the selected pool.
              </div>
            </div>

            <Link href="/simulator" style={{display:'block',marginTop:'1rem',background:'linear-gradient(135deg,#8b1a1a,#c0362b)',color:'white',padding:'0.75rem',borderRadius:'5px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontSize:'0.78rem',fontWeight:700,textAlign:'center'}}>
              ⚔️ RUN FULL SIMULATION
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
