'use client';
import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { tributes, getTributeById } from '@/data/tributes';
import { getCustomTributes } from '@/lib/custom-tributes';
import { simulateFight } from '@/lib/simulation-engine';
import { Tribute } from '@/types';
import TributeAvatar from '@/components/TributeAvatar';

type FightType = 'combat' | 'survival' | 'trap' | 'hazard';
const FIGHT_TYPES = [
  { type: 'combat' as FightType, label: 'Combat', icon: '⚔️', desc: 'Strength + Weapon + Agility', color: '#e87070' },
  { type: 'survival' as FightType, label: 'Survival', icon: '🌿', desc: 'Survival + Intel + Stealth', color: '#70c870' },
  { type: 'trap' as FightType, label: 'Trap', icon: '🕸️', desc: 'Intelligence + Stealth + Survival', color: '#c070e8' },
  { type: 'hazard' as FightType, label: 'Hazard', icon: '⚡', desc: 'Agility + Survival + Strength', color: '#e8a030' },
];

const MATCHUPS = [
  { a: 'katniss-everdeen', b: 'cato' }, { a: 'katniss-everdeen', b: 'finnick-odair' },
  { a: 'cato', b: 'thresh' }, { a: 'foxface', b: 'rue' }, { a: 'finnick-odair', b: 'johanna-mason' },
  { a: 'peeta-mellark', b: 'clove' }, { a: 'beetee', b: 'wiress' },
];

function Avatar({ t, size=48 }: { t: Tribute; size?: number }) {
  return <TributeAvatar src={t.image} name={t.name} size={size} fontSize={`${size*0.38}px`} />;
}

export default function FightPage() {
  const [f1, setF1] = useState<Tribute|null>(null);
  const [f2, setF2] = useState<Tribute|null>(null);
  const [fightType, setFightType] = useState<FightType>('combat');
  const [result, setResult] = useState<ReturnType<typeof simulateFight>|null>(null);
  const [animating, setAnimating] = useState(false);
  const [s1, setS1] = useState('');
  const [s2, setS2] = useState('');
  const [history, setHistory] = useState<{winner:string;loser:string;type:string}[]>([]);
  const [customTick, setCustomTick] = useState(0);
  const allTributes = useMemo(() => [...tributes, ...getCustomTributes()], [customTick]);
  useEffect(() => {
    const bump = () => setCustomTick(v => v + 1);
    window.addEventListener('focus', bump);
    return () => window.removeEventListener('focus', bump);
  }, []);

  const fl1 = allTributes.filter(t => t.id !== f2?.id && t.name.toLowerCase().includes(s1.toLowerCase()));
  const fl2 = allTributes.filter(t => t.id !== f1?.id && t.name.toLowerCase().includes(s2.toLowerCase()));

  const handleFight = useCallback(async () => {
    if (!f1 || !f2) return;
    setAnimating(true); setResult(null);
    await new Promise(r => setTimeout(r, 1100));
    const res = simulateFight(f1, f2, fightType);
    setResult(res);
    setHistory(prev => [{winner:res.winner.name,loser:res.loser.name,type:fightType},...prev].slice(0,5));
    setAnimating(false);
  }, [f1, f2, fightType]);

  const handleRematch = useCallback(async () => {
    if (!f1 || !f2) return;
    setAnimating(true); setResult(null);
    await new Promise(r => setTimeout(r, 800));
    const res = simulateFight(f1, f2, fightType);
    setResult(res);
    setHistory(prev => [{winner:res.winner.name,loser:res.loser.name,type:fightType},...prev].slice(0,5));
    setAnimating(false);
  }, [f1, f2, fightType]);

  const loadMatchup = (a: string, b: string) => {
    const ta = getTributeById(a);
    const tb = getTributeById(b);
    if (ta && tb) { setF1(ta); setF2(tb); setResult(null); }
  };

  const activeFT = FIGHT_TYPES.find(f => f.type === fightType)!;

  return (
    <>
      <style>{`.fight-pickers{display:grid;grid-template-columns:1fr auto 1fr;gap:1rem;} .fight-breakdown{display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.875rem;} @media(max-width:700px){.fight-pickers{grid-template-columns:1fr;} .fight-breakdown{grid-template-columns:1fr;}}`}</style>
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div style={{marginBottom:'1.75rem'}}>
          <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'0.75rem'}}>
            <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>1v1 Fight</span>
          </nav>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.4rem'}}>⚔️ TRIBUTE BATTLE ENGINE</p>
          <h1 style={{fontSize:'clamp(1.75rem,5vw,2.75rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.4rem'}}>1v1 Fight Simulator</h1>
          <p style={{color:'#a09880',margin:0}}>Pick two tributes, choose battle type, let the stats decide</p>
        </div>

        {/* Fight type */}
        <div style={{marginBottom:'1.5rem'}}>
          <p style={{fontSize:'0.6rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',marginBottom:'0.6rem'}}>BATTLE TYPE</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0.5rem'}}>
            {FIGHT_TYPES.map(ft => (
              <button key={ft.type} onClick={() => { setFightType(ft.type); setResult(null); }} style={{background:fightType===ft.type?`${ft.color}18`:'#0d1009',border:`1px solid ${fightType===ft.type?ft.color:'#1e2818'}`,borderRadius:'8px',padding:'0.6rem 0.4rem',cursor:'pointer',textAlign:'center'}}>
                <div style={{fontSize:'1.3rem',marginBottom:'0.2rem'}}>{ft.icon}</div>
                <div style={{fontSize:'0.7rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em',color:fightType===ft.type?ft.color:'#a09880',fontWeight:fightType===ft.type?700:400}}>{ft.label}</div>
                <div style={{fontSize:'0.52rem',color:'#5a5448',marginTop:'0.15rem',lineHeight:1.3}}>{ft.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Pickers */}
        <div className="fight-pickers" style={{marginBottom:'1.25rem'}}>
          {/* Fighter 1 */}
          <div>
            <p style={{fontSize:'0.6rem',color:'#d4a017',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',marginBottom:'0.5rem'}}>TRIBUTE 1</p>
            {!f1 ? (
              <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'0.75rem'}}>
                <input value={s1} onChange={e=>setS1(e.target.value)} placeholder="Search tribute..." style={{width:'100%',background:'#111609',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',color:'#e8e0d0',fontSize:'0.85rem',marginBottom:'0.5rem',boxSizing:'border-box',outline:'none'}}/>
                <div style={{display:'flex',flexDirection:'column',gap:'0.3rem',maxHeight:'240px',overflowY:'auto'}}>
                  {fl1.map(t => (
                    <button key={t.id} onClick={() => {setF1(t);setS1('');setResult(null);}} style={{background:'transparent',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <TributeAvatar src={t.image} name={t.name} size={26} fontSize="0.65rem" />
                      <div><p style={{fontSize:'0.8rem',color:'#e8e0d0',fontWeight:600,margin:0}}>{t.name}</p><p style={{fontSize:'0.62rem',color:'#5a5448',margin:0}}>D{t.districtNumber} · {t.background}</p></div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{background:'#0d1009',border:'1px solid rgba(212,160,23,0.3)',borderRadius:'10px',padding:'1rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.875rem'}}>
                  <Avatar t={f1} size={44}/>
                  <div style={{flex:1}}><p style={{fontSize:'0.95rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:0}}>{f1.name}</p><p style={{fontSize:'0.65rem',color:'#d4a017',margin:0}}>{f1.district}</p></div>
                  <button onClick={() => {setF1(null);setResult(null);}} style={{background:'none',border:'none',color:'#5a5448',cursor:'pointer',fontSize:'1rem'}}>✕</button>
                </div>
                {[{l:'Strength',v:f1.stats.strength},{l:'Weapon Skill',v:f1.stats.weaponSkill},{l:'Agility',v:f1.stats.agility},{l:'Survival',v:f1.stats.survival},{l:'Intelligence',v:f1.stats.intelligence}].map(s => (
                  <div key={s.l} style={{marginBottom:'0.4rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.15rem'}}>
                      <span style={{fontSize:'0.6rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>{s.l}</span>
                      <span style={{fontSize:'0.6rem',color:'#d4a017',fontWeight:700}}>{s.v}</span>
                    </div>
                    <div style={{height:'3px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${s.v}%`,background:'linear-gradient(90deg,#d4a017,#f0c842)',borderRadius:'2px'}}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* VS */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',paddingTop:'2rem'}}>
            <div style={{background:'rgba(212,160,23,0.1)',border:'1px solid rgba(212,160,23,0.3)',borderRadius:'50%',width:'48px',height:'48px',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Cinzel, serif',fontWeight:900,fontSize:'0.9rem',color:'#d4a017'}}>VS</div>
          </div>

          {/* Fighter 2 */}
          <div>
            <p style={{fontSize:'0.6rem',color:'#e87070',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',marginBottom:'0.5rem'}}>TRIBUTE 2</p>
            {!f2 ? (
              <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'0.75rem'}}>
                <input value={s2} onChange={e=>setS2(e.target.value)} placeholder="Search tribute..." style={{width:'100%',background:'#111609',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',color:'#e8e0d0',fontSize:'0.85rem',marginBottom:'0.5rem',boxSizing:'border-box',outline:'none'}}/>
                <div style={{display:'flex',flexDirection:'column',gap:'0.3rem',maxHeight:'240px',overflowY:'auto'}}>
                  {fl2.map(t => (
                    <button key={t.id} onClick={() => {setF2(t);setS2('');setResult(null);}} style={{background:'transparent',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.75rem',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <TributeAvatar src={t.image} name={t.name} size={26} fontSize="0.65rem" />
                      <div><p style={{fontSize:'0.8rem',color:'#e8e0d0',fontWeight:600,margin:0}}>{t.name}</p><p style={{fontSize:'0.62rem',color:'#5a5448',margin:0}}>D{t.districtNumber} · {t.background}</p></div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{background:'#0d1009',border:'1px solid rgba(232,112,112,0.3)',borderRadius:'10px',padding:'1rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'0.75rem',marginBottom:'0.875rem'}}>
                  <Avatar t={f2} size={44}/>
                  <div style={{flex:1}}><p style={{fontSize:'0.95rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:0}}>{f2.name}</p><p style={{fontSize:'0.65rem',color:'#e87070',margin:0}}>{f2.district}</p></div>
                  <button onClick={() => {setF2(null);setResult(null);}} style={{background:'none',border:'none',color:'#5a5448',cursor:'pointer',fontSize:'1rem'}}>✕</button>
                </div>
                {[{l:'Strength',v:f2.stats.strength},{l:'Weapon Skill',v:f2.stats.weaponSkill},{l:'Agility',v:f2.stats.agility},{l:'Survival',v:f2.stats.survival},{l:'Intelligence',v:f2.stats.intelligence}].map(s => (
                  <div key={s.l} style={{marginBottom:'0.4rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.15rem'}}>
                      <span style={{fontSize:'0.6rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>{s.l}</span>
                      <span style={{fontSize:'0.6rem',color:'#e87070',fontWeight:700}}>{s.v}</span>
                    </div>
                    <div style={{height:'3px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${s.v}%`,background:'linear-gradient(90deg,#8b1a1a,#e87070)',borderRadius:'2px'}}/>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fight button */}
        <button onClick={handleFight} disabled={!f1||!f2||animating} style={{width:'100%',padding:'1rem',background:f1&&f2&&!animating?`linear-gradient(135deg,${activeFT.color},${activeFT.color}99)`:'#1e2818',color:f1&&f2&&!animating?'#0a0c06':'#5a5448',border:'none',borderRadius:'8px',cursor:f1&&f2&&!animating?'pointer':'not-allowed',fontFamily:'Oswald, sans-serif',letterSpacing:'0.25em',fontSize:'1rem',fontWeight:700,marginBottom:'1.5rem',boxShadow:f1&&f2?`0 0 25px ${activeFT.color}44`:'none'}}>
          {animating ? '⚔️ CALCULATING...' : !f1||!f2 ? 'SELECT BOTH TRIBUTES' : `${activeFT.icon} SIMULATE ${fightType.toUpperCase()} BATTLE`}
        </button>

        {animating && (
          <div style={{textAlign:'center',padding:'2rem',background:'#0d1009',border:'1px solid #1e2818',borderRadius:'12px',marginBottom:'1.5rem'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'0.75rem'}}>⚔️</div>
            <p style={{fontFamily:'Oswald, sans-serif',letterSpacing:'0.3em',color:'#d4a017',fontSize:'0.8rem'}}>BATTLE IN PROGRESS</p>
          </div>
        )}

        {/* Result */}
        {result && !animating && (
          <div style={{marginBottom:'2rem'}}>
            <div style={{background:'linear-gradient(135deg, rgba(212,160,23,0.12), rgba(139,26,26,0.08))',border:'1px solid rgba(212,160,23,0.3)',borderRadius:'12px',padding:'1.5rem',textAlign:'center',marginBottom:'1rem'}}>
              <div style={{fontSize:'2.5rem',marginBottom:'0.5rem'}}>👑</div>
              <p style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',color:'#d4a017',margin:'0 0 0.35rem'}}>WINNER</p>
              <h2 style={{fontSize:'clamp(1.4rem,5vw,2.25rem)',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',margin:'0 0 0.35rem'}}>{result.winner.name}</h2>
              <p style={{color:'#a09880',margin:'0 0 0.875rem',fontSize:'0.85rem'}}>{result.winner.district}</p>
              <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'1rem'}}>
                {[{v:result.winnerScore,l:'Score',c:'#d4a017'},{v:result.drama,l:'Drama',c:'#e87070'},{v:`+${result.margin}`,l:'Margin',c:'#a09880'}].map(s => (
                  <div key={s.l} style={{background:`${s.c}18`,border:`1px solid ${s.c}44`,borderRadius:'4px',padding:'0.3rem 0.875rem',textAlign:'center'}}>
                    <p style={{fontSize:'1.1rem',fontWeight:700,color:s.c,margin:0}}>{s.v}</p>
                    <p style={{fontSize:'0.55rem',color:'#5a5448',margin:0}}>{s.l.toUpperCase()}</p>
                  </div>
                ))}
              </div>
              <div style={{background:'rgba(139,26,26,0.1)',border:'1px solid rgba(139,26,26,0.2)',borderRadius:'6px',padding:'0.75rem',marginBottom:'0.875rem'}}>
                <p style={{color:'#e8e0d0',lineHeight:1.7,fontSize:'0.875rem',margin:0}}>{result.description}</p>
              </div>
              <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap'}}>
                <button onClick={handleRematch} style={{background:`linear-gradient(135deg,#d4a017,#b8860b)`,border:'none',color:'#0a0c06',padding:'0.6rem 1.25rem',borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.8rem',fontWeight:700}}>🔄 REMATCH</button>
                <button onClick={() => {setF1(null);setF2(null);setResult(null);}} style={{background:'transparent',color:'#d4a017',border:'1px solid rgba(212,160,23,0.4)',padding:'0.6rem 1.25rem',borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.8rem'}}>✕ NEW FIGHT</button>
                <Link href="/simulator" style={{background:'#0d1009',color:'#a09880',border:'1px solid #1e2818',padding:'0.6rem 1.25rem',borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.8rem',textDecoration:'none',display:'flex',alignItems:'center'}}>⚔️ FULL GAME</Link>
              </div>
            </div>

            {/* Stat breakdown */}
            {result.breakdown && (
              <div className="fight-breakdown">
                {result.breakdown.map((r: {label:string;p1:number;p2:number}) => (
                  <div key={r.label} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',padding:'0.875rem'}}>
                    <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#5a5448',margin:'0 0 0.6rem'}}>{r.label.toUpperCase()}</p>
                    <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.3rem'}}>
                      <span style={{fontSize:'0.7rem',color:r.p1>=r.p2?'#d4a017':'#5a5448',fontWeight:r.p1>=r.p2?700:400,minWidth:'80px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f1?.name}</span>
                      <div style={{flex:1,height:'4px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}><div style={{height:'100%',width:`${r.p1}%`,background:'#d4a017',borderRadius:'2px'}}/></div>
                      <span style={{fontSize:'0.7rem',color:r.p1>=r.p2?'#d4a017':'#5a5448',fontWeight:700,minWidth:'24px',textAlign:'right'}}>{r.p1}</span>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <span style={{fontSize:'0.7rem',color:r.p2>r.p1?'#e87070':'#5a5448',fontWeight:r.p2>r.p1?700:400,minWidth:'80px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f2?.name}</span>
                      <div style={{flex:1,height:'4px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}><div style={{height:'100%',width:`${r.p2}%`,background:'#8b1a1a',borderRadius:'2px'}}/></div>
                      <span style={{fontSize:'0.7rem',color:r.p2>r.p1?'#e87070':'#5a5448',fontWeight:700,minWidth:'24px',textAlign:'right'}}>{r.p2}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{marginBottom:'2rem'}}>
            <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.6rem'}}>BATTLE HISTORY</p>
            <div style={{display:'flex',flexDirection:'column',gap:'0.3rem'}}>
              {history.map((h,i) => (
                <div key={i} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'6px',padding:'0.6rem 0.875rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:'0.75rem',color:'#d4a017',fontFamily:'Cinzel, serif'}}>👑 {h.winner}</span>
                  <span style={{fontSize:'0.65rem',color:'#5a5448'}}>defeated {h.loser}</span>
                  <span style={{fontSize:'0.6rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>{h.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular matchups */}
        <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem'}}>
          <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',marginBottom:'0.75rem'}}>POPULAR MATCHUPS</p>
          <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
            {MATCHUPS.map((m,i) => {
              const ta = getTributeById(m.a);
              const tb = getTributeById(m.b);
              if (!ta || !tb) return null;
              return <button key={i} onClick={() => loadMatchup(m.a, m.b)} style={{background:'#111609',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.35rem 0.75rem',cursor:'pointer',color:'#a09880',fontSize:'0.72rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>{ta.name} vs {tb.name}</button>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}