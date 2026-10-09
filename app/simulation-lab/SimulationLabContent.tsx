'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { runSimulationLab, arenaPresets, type ArenaConfig } from '@/lib/advanced-simulation';
import { tributes } from '@/data/tributes';

export default function SimulationLabContent() {
  const [selected, setSelected] = useState(tributes.map(t=>t.id));
  const [count, setCount] = useState(10000);
  const [preset, setPreset] = useState(0);
  const [mode, setMode] = useState<'dynamic'|'aggressive'|'survival'|'balanced'>('dynamic');
  const [result, setResult] = useState<ReturnType<typeof runSimulationLab>|null>(null);
  const [running, setRunning] = useState(false);
  const arena = arenaPresets[preset] as ArenaConfig;
  const selectedTributes = useMemo(()=>tributes.filter(t=>selected.includes(t.id)),[selected]);

  const run = () => {
    if (selected.length < 2) return;
    setRunning(true);
    window.setTimeout(()=>{ setResult(runSimulationLab(selected, count, arena, mode)); setRunning(false); }, 20);
  };
  const toggle=(id:string)=>setSelected(s=>s.includes(id)?s.length>2?s.filter(x=>x!==id):s:[...s,id]);

  return <main className="simulation-lab-page" style={{maxWidth:1300,margin:'0 auto',padding:'0 1rem 5rem'}}>

    <section className="lab-grid" style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) 300px',gap:'1rem',marginTop:'1.5rem'}}>
      <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:10,padding:'1rem'}}>
        <h2 style={{fontFamily:'Cinzel,serif',fontSize:'1rem'}}>Tribute Pool</h2>
        <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap'}}>{tributes.map(t=><button key={t.id} onClick={()=>toggle(t.id)} style={{background:selected.includes(t.id)?'rgba(212,160,23,.1)':'transparent',border:`1px solid ${selected.includes(t.id)?'rgba(212,160,23,.5)':'#1e2818'}`,color:selected.includes(t.id)?'#d4a017':'#5a5448',padding:'.3rem .5rem',borderRadius:3,cursor:'pointer',fontSize:'.62rem'}}>{t.name}</button>)}</div>
        <p style={{color:'#5a5448',fontSize:'.65rem',marginTop:'.7rem'}}>{selectedTributes.length} tributes selected</p>
      </div>
      <aside style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:10,padding:'1rem'}}>
        <label style={{display:'block',color:'#a09880',fontSize:'.68rem',marginBottom:'.35rem'}}>SIMULATIONS</label>
        <select value={count} onChange={e=>setCount(Number(e.target.value))} style={input}>{[1000,2500,5000,10000].map(n=><option key={n} value={n}>{n.toLocaleString()}</option>)}</select>
        <label style={label}>ARENA</label><select value={preset} onChange={e=>setPreset(Number(e.target.value))} style={input}>{arenaPresets.map((a,i)=><option key={a.name} value={i}>{a.name}</option>)}</select>
        <label style={label}>AI MODE</label><select value={mode} onChange={e=>setMode(e.target.value as typeof mode)} style={input}><option value="dynamic">Dynamic</option><option value="balanced">Balanced</option><option value="aggressive">Aggressive</option><option value="survival">Survival</option></select>
        <button onClick={run} disabled={running||selected.length<2} style={{width:'100%',marginTop:'1rem',padding:'.75rem',border:0,borderRadius:4,background:'linear-gradient(135deg,#d4a017,#b8860b)',fontFamily:'Oswald',fontWeight:700,cursor:running?'wait':'pointer'}}>{running?'RUNNING…':'RUN SIMULATIONS'}</button>
      </aside>
    </section>

        {result && (
          <section style={{marginTop:'1.5rem',background:'#0d1009',border:'1px solid #1e2818',borderRadius:10,overflow:'hidden'}}>
            <div style={{padding:'1.1rem 1.25rem',borderBottom:'1px solid #1e2818',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'0.5rem'}}>
              <div>
                <p style={{fontSize:'0.62rem',fontFamily:'Oswald',letterSpacing:'0.25em',color:'#d4a017',margin:'0 0 0.3rem'}}>📊 LAB RESULTS</p>
                <p style={{fontSize:'0.8rem',color:'#a09880',margin:0}}>
                  {result.simulations.toLocaleString()} simulations · {result.arena.name} · {mode.charAt(0).toUpperCase()+mode.slice(1)} AI
                </p>
              </div>
              <p style={{fontSize:'0.7rem',color:'#5a5448',margin:0}}>Win rates are measured, not predicted</p>
            </div>
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',minWidth:'640px'}}>
                <thead>
                  <tr>
                    <th style={th}>#</th>
                    <th style={th}>TRIBUTE</th>
                    <th style={{...th,textAlign:'right'}}>WINS</th>
                    <th style={th}>WIN RATE</th>
                    <th style={{...th,textAlign:'right'}}>AVG PLACE</th>
                    <th style={{...th,textAlign:'right'}}>AVG DAYS</th>
                    <th style={{...th,textAlign:'right'}}>AVG KILLS</th>
                    <th style={{...th,textAlign:'right'}}>TOP-3</th>
                  </tr>
                </thead>
                <tbody>
                  {[...result.rows].sort((a,b)=>b.wins-a.wins).map((row,i)=>{
                    const maxWins = Math.max(1, ...result.rows.map(r=>r.wins));
                    return (
                      <tr key={row.tributeId}>
                        <td style={{...td,color:i<3?'#d4a017':'#5a5448',fontWeight:i<3?700:400}}>{i+1}</td>
                        <td style={{...td,color:'#e8e0d0',fontFamily:'Cinzel,serif',fontWeight:600}}>{row.name}</td>
                        <td style={{...td,textAlign:'right',color:'#e8e0d0',fontWeight:700}}>{row.wins.toLocaleString()}</td>
                        <td style={td}>
                          <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                            <div style={{flex:1,minWidth:'60px',height:'6px',background:'#1e2818',borderRadius:'3px',overflow:'hidden'}}>
                              <div style={{height:'100%',width:`${(row.wins/maxWins)*100}%`,background:'linear-gradient(90deg,#d4a017,#f0c842)',borderRadius:'3px'}}/>
                            </div>
                            <span style={{fontSize:'0.72rem',color:'#d4a017',fontWeight:700,minWidth:'44px',textAlign:'right'}}>{row.winRate.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td style={{...td,textAlign:'right'}}>{row.averagePlacement.toFixed(1)}</td>
                        <td style={{...td,textAlign:'right'}}>{row.averageSurvivalDay.toFixed(1)}</td>
                        <td style={{...td,textAlign:'right'}}>{row.averageKills.toFixed(1)}</td>
                        <td style={{...td,textAlign:'right'}}>{row.topThreeRate.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{padding:'0.9rem 1.25rem',fontSize:'0.68rem',color:'#5a5448',margin:0,borderTop:'1px solid #1e2818',lineHeight:1.6}}>
              These figures are generated by this site's simulation engine across independent runs and are not canon probabilities. Read our <Link href="/blog/simulation-engine-methodology" style={{color:'#d4a017'}}>methodology breakdown</Link> for exactly how they are computed.
            </p>
          </section>
        )}

    <style>{`
      .simulation-lab-page {
        width: 100%;
        box-sizing: border-box;
        overflow-x: hidden;
      }

      .lab-grid {
        width: 100%;
        box-sizing: border-box;
      }

      @media (max-width: 700px) {
        .lab-grid {
          grid-template-columns: 1fr !important;
        }

        .simulation-lab-page {
          padding-left: 0.75rem !important;
          padding-right: 0.75rem !important;
        }
      }
    `}</style>
  </main>;
}
const label={display:'block',color:'#a09880',fontSize:'.68rem',marginTop:'.8rem',marginBottom:'.35rem'} as CSSProperties;
const input={width:'100%',background:'#080a06',color:'#e8e0d0',border:'1px solid #1e2818',borderRadius:4,padding:'.55rem'} as CSSProperties;
const th={textAlign:'left',padding:'.65rem',fontSize:'.55rem',color:'#5a5448',borderBottom:'1px solid #1e2818'} as CSSProperties;
const td={padding:'.65rem',fontSize:'.72rem',color:'#a09880',borderBottom:'1px solid rgba(255,255,255,.03)'} as CSSProperties;
