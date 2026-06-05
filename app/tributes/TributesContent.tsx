'use client';
import { useState } from 'react';
import Link from 'next/link';
import { tributes } from '@/data/tributes';
import TributeAvatar from '@/components/TributeAvatar';

const STATS = ['strength','agility','survival','intelligence','weaponSkill','stealth','charisma'] as const;
const BG_COLORS: Record<string,string> = { Career:'#d4a017', Victor:'#c070e8', Volunteer:'#70c870', Reaped:'#e87070', Capitol:'#70a0e8' };

export default function TributesPage() {
  const [filter, setFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState(0);
  const [bgFilter, setBgFilter] = useState('');
  const [sortBy, setSortBy] = useState<typeof STATS[number]|'name'>('strength');

  const districts = [...new Set(tributes.map(t => t.districtNumber))].sort((a,b) => a-b);
  const filtered = tributes
    .filter(t => t.name.toLowerCase().includes(filter.toLowerCase()) || t.nickname?.toLowerCase().includes(filter.toLowerCase()))
    .filter(t => !districtFilter || t.districtNumber === districtFilter)
    .filter(t => !bgFilter || t.background === bgFilter)
    .sort((a,b) => sortBy === 'name' ? a.name.localeCompare(b.name) : b.stats[sortBy] - a.stats[sortBy]);

  return (
    <>
      <style>{`.tributes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;}`}</style>
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div style={{marginBottom:'1.75rem'}}>
          <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'0.75rem'}}>
            <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Tributes</span>
          </nav>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.4rem'}}>👤 THE TRIBUTE ROSTER</p>
          <h1 style={{fontSize:'clamp(1.75rem,5vw,2.75rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.4rem'}}>All Tributes</h1>
          <p style={{color:'#a09880',margin:0}}>{tributes.length} tributes from {districts.length} districts — full stats, weapons, strategies</p>
        </div>

        {/* Filters */}
        <div style={{display:'flex',gap:'0.75rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
          <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="🔍 Search tributes..." style={{flex:'1 1 180px',background:'#0d1009',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',color:'#e8e0d0',fontSize:'0.85rem',outline:'none'}}/>
          <select value={districtFilter} onChange={e=>setDistrictFilter(+e.target.value)} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',color:'#e8e0d0',fontSize:'0.8rem',outline:'none',cursor:'pointer'}}>
            <option value={0}>All Districts</option>
            {districts.map(d => <option key={d} value={d}>District {d}</option>)}
          </select>
          <select value={bgFilter} onChange={e=>setBgFilter(e.target.value)} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',color:'#e8e0d0',fontSize:'0.8rem',outline:'none',cursor:'pointer'}}>
            <option value="">All Backgrounds</option>
            {['Career','Victor','Volunteer','Reaped'].map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value as any)} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',color:'#e8e0d0',fontSize:'0.8rem',outline:'none',cursor:'pointer'}}>
            {[['strength','Strength'],['agility','Agility'],['survival','Survival'],['intelligence','Intelligence'],['weaponSkill','Weapon Skill'],['stealth','Stealth'],['name','Name A-Z']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <p style={{fontSize:'0.68rem',color:'#5a5448',marginBottom:'1rem',fontFamily:'Oswald, sans-serif'}}>{filtered.length} results</p>

        <div className="tributes-grid">
          {filtered.map(t => {
            const overallScore = Math.round(Object.values(t.stats).reduce((a,b)=>a+b,0)/Object.keys(t.stats).length);
            return (
              <Link key={t.id} href={`/tributes/${t.id}`} style={{textDecoration:'none'}}>
                <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem',height:'100%',cursor:'pointer'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'0.875rem',marginBottom:'1rem'}}>
                    <TributeAvatar src={t.image} name={t.name} size={48} />
                    <div style={{flex:1,minWidth:0}}>
                      <h3 style={{fontSize:'0.95rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</h3>
                      {t.nickname && <p style={{fontSize:'0.65rem',color:'#d4a017',margin:'0.1rem 0 0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>"{t.nickname}"</p>}
                    </div>
                    <div style={{textAlign:'right',flexShrink:0}}>
                      <p style={{fontSize:'1.1rem',fontWeight:700,color:'#d4a017',margin:0}}>{overallScore}</p>
                      <p style={{fontSize:'0.5rem',color:'#5a5448',margin:0}}>AVG STAT</p>
                    </div>
                  </div>

                  <div style={{display:'flex',gap:'0.4rem',marginBottom:'0.875rem',flexWrap:'wrap'}}>
                    <span style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.08em',color:BG_COLORS[t.background]||'#a09880',background:`${BG_COLORS[t.background]||'#a09880'}18`,border:`1px solid ${BG_COLORS[t.background]||'#a09880'}44`,padding:'0.1rem 0.5rem',borderRadius:'2px'}}>{t.background}</span>
                    <span style={{fontSize:'0.58rem',color:'#5a5448',background:'#111609',border:'1px solid #1e2818',padding:'0.1rem 0.5rem',borderRadius:'2px'}}>D{t.districtNumber}</span>
                    <span style={{fontSize:'0.58rem',color:'#5a5448',background:'#111609',border:'1px solid #1e2818',padding:'0.1rem 0.5rem',borderRadius:'2px'}}>Age {t.age}</span>
                    <span style={{fontSize:'0.58rem',color:'#5a5448',marginLeft:'auto',background:'rgba(212,160,23,0.1)',border:'1px solid rgba(212,160,23,0.2)',padding:'0.1rem 0.5rem',borderRadius:'2px'}}>T:{t.trainingScore}</span>
                  </div>

                  <div style={{display:'flex',flexDirection:'column',gap:'0.35rem'}}>
                    {([['STR',t.stats.strength,'#e87070'],['AGI',t.stats.agility,'#70c870'],['SUR',t.stats.survival,'#70a0e8'],['WPN',t.stats.weaponSkill,'#d4a017'],['STH',t.stats.stealth,'#c070e8']] as [string,number,string][]).map(([l,v,c]) => (
                      <div key={l} style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                        <span style={{fontSize:'0.55rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',width:'28px',flexShrink:0}}>{l}</span>
                        <div style={{flex:1,height:'4px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}>
                          <div style={{height:'100%',width:`${v}%`,background:c,borderRadius:'2px',transition:'width 0.4s ease'}}/>
                        </div>
                        <span style={{fontSize:'0.65rem',color:c,fontWeight:700,width:'24px',textAlign:'right',flexShrink:0}}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <p style={{fontSize:'0.68rem',color:'#5a5448',marginTop:'0.75rem',margin:'0.75rem 0 0'}}>🗡️ {t.weapon.split(',')[0]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}