'use client';

import type { CSSProperties } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { arenaPresets, runAdvancedSimulation, type ArenaConfig, type AdvancedScenario } from '@/lib/advanced-simulation';
import { tributes } from '@/data/tributes';

const initial: AdvancedScenario = { ...arenaPresets[0], roster: tributes.map(t=>t.id), scenarioName:'My Custom Games', strategyMode:'dynamic' };
export default function ArenaBuilderContent(){
 const [s,setS]=useState<AdvancedScenario>(initial); const [result,setResult]=useState<ReturnType<typeof runAdvancedSimulation>|null>(null);
 const update=(p:Partial<AdvancedScenario>)=>setS(x=>({...x,...p}));
 const toggle=(id:string)=>update({roster:s.roster.includes(id)?s.roster.length>2?s.roster.filter(x=>x!==id):s.roster:[...s.roster,id]});
 const randomize=()=>{const shuffled=[...tributes].sort(()=>Math.random()-.5).slice(0,24).map(t=>t.id);update({roster:shuffled});};
 const run=()=>{if(s.roster.length>=2)setResult(runAdvancedSimulation(s));};
 return <main style={{maxWidth:1300,margin:'0 auto',padding:'2rem 1rem 5rem'}}>
   <Link href="/" style={{color:'#d4a017',fontSize:'.7rem',textDecoration:'none'}}>HOME /</Link>
   <p style={{color:'#d4a017',fontFamily:'Oswald',letterSpacing:'.35em',fontSize:'.62rem',margin:'1rem 0 .4rem'}}>🏟️ SCENARIO DESIGNER</p>
   <h1 style={{fontFamily:'Cinzel,serif',fontSize:'clamp(2rem,5vw,3.2rem)',margin:0}}>Custom Arena + Scenario Builder</h1>
   <p style={{color:'#a09880',maxWidth:760,lineHeight:1.7}}>Design the conditions before the Games begin. The advanced strategy engine uses your arena settings to influence survival, combat, alliances, and environmental pressure.</p>
   <section style={{display:'grid',gridTemplateColumns:'300px minmax(0,1fr)',gap:'1rem',marginTop:'1.5rem'}}>
    <aside style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:10,padding:'1rem'}}>
      <label style={label}>SCENARIO NAME</label><input value={s.scenarioName} onChange={e=>update({scenarioName:e.target.value})} style={input}/>
      <label style={label}>ARENA NAME</label><input value={s.name} onChange={e=>update({name:e.target.value})} style={input}/>
      <Select label="TERRAIN" value={s.terrain} onChange={v=>update({terrain:v as ArenaConfig['terrain']})} options={['forest','mountain','desert','coast','ruins','swamp']}/>
      <Select label="WEATHER" value={s.weather} onChange={v=>update({weather:v as ArenaConfig['weather']})} options={['clear','rain','storm','heat','cold','fog']}/>
      <Select label="AI STRATEGY" value={s.strategyMode} onChange={v=>update({strategyMode:v as AdvancedScenario['strategyMode']})} options={['dynamic','balanced','aggressive','survival']}/>
      <Range label="RESOURCES" value={s.resourceLevel} onChange={v=>update({resourceLevel:v})}/>
      <Range label="HAZARDS" value={s.hazardLevel} onChange={v=>update({hazardLevel:v})}/>
      <Range label="ALLIANCE RATE" value={s.allianceRate} onChange={v=>update({allianceRate:v})}/>
      <Range label="SPONSOR RATE" value={s.sponsorRate} onChange={v=>update({sponsorRate:v})}/>
      <label style={label}>SPECIAL RULE</label><textarea value={s.specialRule||''} onChange={e=>update({specialRule:e.target.value})} placeholder="Optional rule..." style={{...input,minHeight:70,resize:'vertical'}}/>
      <button onClick={run} disabled={s.roster.length<2} style={button}>RUN CUSTOM SCENARIO</button>
    </aside>
    <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:10,padding:'1rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'.5rem',flexWrap:'wrap'}}><div><h2 style={{fontFamily:'Cinzel,serif',margin:0}}>Roster</h2><p style={{color:'#5a5448',fontSize:'.68rem'}}>{s.roster.length} tributes selected</p></div><button onClick={randomize} style={secondary}>🎲 RANDOM ROSTER</button></div>
      <div style={{display:'flex',gap:'.4rem',flexWrap:'wrap',marginTop:'.8rem'}}>{tributes.map(t=><button key={t.id} onClick={()=>toggle(t.id)} style={{background:s.roster.includes(t.id)?'rgba(212,160,23,.1)':'transparent',border:`1px solid ${s.roster.includes(t.id)?'rgba(212,160,23,.5)':'#1e2818'}`,color:s.roster.includes(t.id)?'#d4a017':'#5a5448',padding:'.3rem .5rem',borderRadius:3,cursor:'pointer',fontSize:'.62rem'}}>{t.name}</button>)}</div>
      {result && <div style={{marginTop:'1.5rem',borderTop:'1px solid #1e2818',paddingTop:'1rem'}}><p style={{color:'#d4a017',fontFamily:'Oswald',letterSpacing:'.15em',fontSize:'.62rem'}}>SIMULATION RESULT</p><h2 style={{fontFamily:'Cinzel,serif',margin:'.2rem 0'}}>{result.victor?.name} WINS</h2><p style={{color:'#a09880'}}>Day {result.days} · {result.placements.length} tributes · {result.events.length} recorded events</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'.5rem'}}>{result.placements.slice(0,8).map(p=><div key={p.tributeId} style={{border:'1px solid #1e2818',padding:'.65rem',borderRadius:5}}><strong style={{color:'#e8e0d0',fontFamily:'Cinzel,serif'}}>{p.placement}. {tributes.find(t=>t.id===p.tributeId)?.name}</strong><div style={{fontSize:'.62rem',color:'#5a5448'}}>Day {p.survivalDay} · {p.kills} eliminations</div></div>)}</div></div>}
    </div>
   </section>
 </main>;
}
function Select({label:l,value,onChange,options}:{label:string,value:string,onChange:(v:string)=>void,options:string[]}){return <><label style={label}>{l}</label><select value={value} onChange={e=>onChange(e.target.value)} style={input}>{options.map(o=><option key={o}>{o}</option>)}</select></>}
function Range({label:l,value,onChange}:{label:string,value:number,onChange:(v:number)=>void}){return <><label style={label}>{l} <span style={{color:'#d4a017'}}>{value}</span></label><input type="range" min="0" max="100" value={value} onChange={e=>onChange(Number(e.target.value))} style={{width:'100%'}}/></>}
const label={display:'block',color:'#a09880',fontSize:'.68rem',marginTop:'.8rem',marginBottom:'.35rem'} as CSSProperties;
const input={width:'100%',boxSizing:'border-box',background:'#080a06',color:'#e8e0d0',border:'1px solid #1e2818',borderRadius:4,padding:'.55rem'} as CSSProperties;
const button={width:'100%',marginTop:'1rem',padding:'.75rem',border:0,borderRadius:4,background:'linear-gradient(135deg,#d4a017,#b8860b)',fontFamily:'Oswald',fontWeight:700,cursor:'pointer'} as CSSProperties;
const secondary={background:'#080a06',color:'#d4a017',border:'1px solid rgba(212,160,23,.3)',padding:'.5rem .7rem',borderRadius:4,cursor:'pointer',fontFamily:'Oswald'} as CSSProperties;
