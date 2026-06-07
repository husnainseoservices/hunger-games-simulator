'use client';
import { useState } from 'react';
import Link from 'next/link';
import { tributes, calculateVictoryOdds } from '@/data/tributes';
import TributeAvatar from '@/components/TributeAvatar';

type StatKey = 'odds'|'strength'|'agility'|'survival'|'intelligence'|'weaponSkill'|'stealth'|'charisma';
const CATS: {key:StatKey;label:string;icon:string;color:string}[] = [
  {key:'odds',label:'Victory Odds',icon:'📊',color:'#d4a017'},
  {key:'strength',label:'Strength',icon:'💪',color:'#e87070'},
  {key:'agility',label:'Agility',icon:'⚡',color:'#70c870'},
  {key:'survival',label:'Survival',icon:'🌿',color:'#70a0e8'},
  {key:'intelligence',label:'Intelligence',icon:'🧠',color:'#c070e8'},
  {key:'weaponSkill',label:'Weapon Skill',icon:'⚔️',color:'#e8a030'},
  {key:'stealth',label:'Stealth',icon:'👁️',color:'#5a8b6a'},
  {key:'charisma',label:'Charisma',icon:'✨',color:'#e8a8d0'},
];

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<StatKey>('odds');
  const odds = tributes.map(t => ({ id: t.id, odds: calculateVictoryOdds(t, tributes) }));
  const cat = CATS.find(c => c.key === activeTab)!;

  const ranked = [...tributes].sort((a, b) => {
    if (activeTab === 'odds') {
      const ao = odds.find(o => o.id === a.id)?.odds || 0;
      const bo = odds.find(o => o.id === b.id)?.odds || 0;
      return bo - ao;
    }
    return b.stats[activeTab as keyof typeof b.stats] - a.stats[activeTab as keyof typeof a.stats];
  });

  const getValue = (t: typeof tributes[0]) => {
    if (activeTab === 'odds') return `${odds.find(o => o.id === t.id)?.odds || 0}%`;
    return `${t.stats[activeTab as keyof typeof t.stats]}`;
  };

  const getNum = (t: typeof tributes[0]) => {
    if (activeTab === 'odds') return odds.find(o => o.id === t.id)?.odds || 0;
    return t.stats[activeTab as keyof typeof t.stats];
  };

  const top3 = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  return (
    <>
      <style>{`.lb-tabs{display:flex;flex-wrap:wrap;gap:0.4rem;} .lb-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.875rem;} @media(max-width:700px){.lb-grid{grid-template-columns:1fr;}}`}</style>
      <div style={{maxWidth:'1000px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div style={{marginBottom:'1.75rem'}}>
          <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'0.75rem'}}>
            <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Leaderboard</span>
          </nav>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.4rem'}}>🏆 CAPITOL RANKINGS</p>
          <h1 style={{fontSize:'clamp(1.75rem,5vw,2.75rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.4rem'}}>Victor Leaderboard</h1>
          <p style={{color:'#a09880',margin:0}}>Rankings by stat — click any category to reorder</p>
        </div>

        {/* Tabs */}
        <div className="lb-tabs" style={{marginBottom:'1.75rem'}}>
          {CATS.map(c => (
            <button key={c.key} onClick={() => setActiveTab(c.key)} style={{background:activeTab===c.key?`${c.color}18`:'#0d1009',border:`1px solid ${activeTab===c.key?c.color:'#1e2818'}`,color:activeTab===c.key?c.color:'#5a5448',padding:'0.4rem 0.875rem',borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.08em',fontSize:'0.75rem'}}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="lb-grid" style={{marginBottom:'1.75rem'}}>
          {[top3[1], top3[0], top3[2]].map((t, i) => {
            if (!t) return <div key={i}/>;
            const rank = i===1?1:i===0?2:3;
            const medals = ['🥈','🥇','🥉'];
            const sizes = ['160px','200px','150px'];
            const val = getNum(t);
            const maxVal = getNum(ranked[0]);
            return (
              <Link key={t.id} href={`/tributes/${t.id}`} style={{textDecoration:'none'}}>
                <div style={{background:rank===1?`${cat.color}12`:'rgba(255,255,255,0.02)',border:`1px solid ${rank===1?`${cat.color}44`:'#1e2818'}`,borderRadius:'12px',padding:'1.25rem',textAlign:'center',height:sizes[i],display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',boxSizing:'border-box',cursor:'pointer'}}>
                  <div style={{fontSize:'1.5rem',marginBottom:'0.3rem'}}>{medals[i]}</div>
                  <div style={{marginBottom:'0.5rem',display:'flex',justifyContent:'center'}}><TributeAvatar src={t.image} name={t.name} size={44} fontSize="1.1rem" /></div>
                  <p style={{fontSize:'0.9rem',fontFamily:'Cinzel, serif',fontWeight:700,color:rank===1?cat.color:'#e8e0d0',margin:'0 0 0.1rem'}}>{t.name}</p>
                  <p style={{fontSize:'0.62rem',color:'#5a5448',margin:'0 0 0.3rem'}}>D{t.districtNumber}</p>
                  <p style={{fontSize:'1.3rem',fontWeight:700,color:cat.color,margin:0}}>{getValue(t)}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Full table */}
        <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'44px 1fr 100px 60px',padding:'0.75rem 1rem',borderBottom:'1px solid #1e2818',gap:'0.5rem'}}>
            {['Rank','Tribute',cat.label,'District'].map(h => <span key={h} style={{fontSize:'0.6rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>{h.toUpperCase()}</span>)}
          </div>
          {rest.map((t, i) => {
            const rank = i + 4;
            const val = getNum(t);
            const maxVal = getNum(ranked[0]);
            return (
              <Link key={t.id} href={`/tributes/${t.id}`} style={{textDecoration:'none',display:'grid',gridTemplateColumns:'44px 1fr 100px 60px',padding:'0.7rem 1rem',borderBottom:'1px solid rgba(255,255,255,0.02)',gap:'0.5rem',alignItems:'center'}}>
                <span style={{fontSize:'0.75rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>#{rank}</span>
                <div>
                  <p style={{fontSize:'0.85rem',fontFamily:'Cinzel, serif',fontWeight:600,color:'#e8e0d0',margin:0}}>{t.name}</p>
                  <p style={{fontSize:'0.6rem',color:'#5a5448',margin:0}}>{t.background}</p>
                </div>
                <div>
                  <p style={{fontSize:'0.9rem',fontWeight:700,color:cat.color,margin:'0 0 0.15rem'}}>{getValue(t)}</p>
                  <div style={{height:'3px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${(val/maxVal)*100}%`,background:cat.color,borderRadius:'2px'}}/>
                  </div>
                </div>
                <span style={{fontSize:'0.75rem',color:'#5a5448'}}>D{t.districtNumber}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}