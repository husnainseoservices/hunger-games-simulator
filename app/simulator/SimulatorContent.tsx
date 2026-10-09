'use client';
import { useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { hungerGames } from '@/data/games';
import { tributes, getTributeById } from '@/data/tributes';
import { simulateGame, setCustomEvents, setSimulationSeed, generateSeed, type CustomEvent } from '@/lib/simulation-engine';
import { getCustomTributes, saveCustomTribute, serializeForShare, deserializeFromShare } from '@/lib/custom-tributes';
import { SimulationResult } from '@/types';

type Phase = 'select' | 'running' | 'results';
type CustomEventType = 'combat' | 'survival' | 'hazard' | 'alliance' | 'sponsor';

const EVENT_TYPE_INFO: Record<CustomEventType, { label: string; icon: string; color: string; placeholder: string; hint: string; fatal: boolean }> = {
  combat:   { label: 'Combat',   icon: '⚔️', color: '#e87070', placeholder: '{w} corners {l} in a ravine and wins the duel.', hint: 'Use {w} for the winner and {l} for the loser. Fatal.', fatal: true },
  hazard:   { label: 'Hazard',   icon: '🔥', color: '#e8a030', placeholder: '{d} is swept away by a sudden Gamemaker flood.', hint: 'Use {d} for the tribute who dies. Fatal.', fatal: true },
  alliance: { label: 'Alliance', icon: '🤝', color: '#70a0e8', placeholder: '{t1} and {t2} share a quiet meal and swear loyalty.', hint: 'Use {t1} and {t2} for the two allies. Non-fatal.', fatal: false },
  survival: { label: 'Survival', icon: '🌿', color: '#70c870', placeholder: '{t} discovers a hidden spring and refills supplies.', hint: 'Use {t} for the tribute. Non-fatal.', fatal: false },
  sponsor:  { label: 'Sponsor',  icon: '🎁', color: '#d4a017', placeholder: '{t} receives a mysterious silver parachute at dawn.', hint: 'Use {t} for the tribute. Non-fatal.', fatal: false },
};

export default function SimulatorPage() {
  const [selectedGame, setSelectedGame] = useState('');
  const [customTributes, setCustomTributes] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>('select');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const [showDayList, setShowDayList] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [userEvents, setUserEvents] = useState<CustomEvent[]>([]);
  const [showEventBuilder, setShowEventBuilder] = useState(false);
  const [newEventType, setNewEventType] = useState<CustomEventType>('combat');
  const [newEventText, setNewEventText] = useState('');

  // Custom tributes (this device) merged with the canon roster
  const [customTick, setCustomTick] = useState(0);
  const allTributes = useMemo(() => [...tributes, ...getCustomTributes()], [customTick]);
  useEffect(() => {
    const bump = () => setCustomTick(v => v + 1);
    window.addEventListener('focus', bump);
    return () => window.removeEventListener('focus', bump);
  }, []);

  const selectedGameData = hungerGames.find(g => g.id === selectedGame);
  const tributePool = selectedGame === 'custom-games' ? customTributes : (selectedGameData?.tributes || []);

  // Share-link state
  const [runSeed, setRunSeed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const [autoStarted, setAutoStarted] = useState(false);

  const startRun = useCallback(async (pool: string[], seed: string | null) => {
    if (pool.length < 2) return;
    const s = seed || generateSeed();
    setSimulationSeed(s);
    setRunSeed(s);
    setCustomEvents(userEvents);
    setPhase('running'); setProgress(0);
    const msgs = ['Selecting tributes...','Training scores calculated...','Opening ceremonies...','The arena is set...','The countdown begins...','Let the Games begin!'];
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(r => setTimeout(r, 40));
      setProgress(i);
      setProgressMsg(msgs[Math.floor(i / 18)]);
    }
    const res = simulateGame(pool);
    setResult(res); setActiveDay(0); setPhase('results');
  }, [userEvents]);

  const handleStart = useCallback(() => { startRun(tributePool, null); }, [tributePool, startRun]);

  // Auto-run from a share link (?game=&seed=&roster=&custom=&autostart=1)
  useEffect(() => {
    if (autoStarted) return;
    const game = searchParams.get('game');
    if (!game || searchParams.get('autostart') !== '1') return;
    const customParam = searchParams.get('custom');
    if (customParam) {
      deserializeFromShare(customParam).forEach(t => saveCustomTribute(t));
      setCustomTick(v => v + 1);
    }
    const seed = searchParams.get('seed');
    const roster = (searchParams.get('roster') || '').split(',').filter(Boolean);
    setSelectedGame(game);
    if (game === 'custom-games' && roster.length >= 2) setCustomTributes(roster);
    setAutoStarted(true);
    window.setTimeout(() => {
      const pool = game === 'custom-games'
        ? roster
        : (hungerGames.find(g => g.id === game)?.tributes || []);
      if (pool.length >= 2) startRun(pool, seed);
    }, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, autoStarted]);

  const copyShareLink = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      params.set('game', selectedGame);
      if (runSeed) params.set('seed', runSeed);
      if (selectedGame === 'custom-games') params.set('roster', tributePool.join(','));
      const customs = allTributes.filter(t => tributePool.includes(t.id) && t.id.startsWith('custom-'));
      if (customs.length) params.set('custom', serializeForShare(customs));
      params.set('autostart', '1');
      await navigator.clipboard.writeText(`${window.location.origin}/simulator?${params.toString()}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      alert('Could not copy the link. Copy the URL from your address bar instead.');
    }
  }, [selectedGame, runSeed, tributePool, allTributes]);

  const addEvent = () => {
    const text = newEventText.trim();
    if (text.length < 5) return;
    setUserEvents(prev => [...prev, { type: newEventType, template: text, fatal: EVENT_TYPE_INFO[newEventType].fatal }]);
    setNewEventText('');
  };
  const removeEvent = (idx: number) => setUserEvents(prev => prev.filter((_, i) => i !== idx));

  const handleReset = () => { setPhase('select'); setSelectedGame(''); setResult(null); setActiveDay(0); setCustomTributes([]); };
  const toggleCustom = (id: string) => setCustomTributes(prev => prev.includes(id) ? prev.filter(t => t !== id) : prev.length < 24 ? [...prev, id] : prev);

  const typeColors: Record<string,string> = { combat:'#e87070', survival:'#70c870', hazard:'#e8a030', alliance:'#70a0e8', sponsor:'#d4a017', cornucopia:'#e87070', feast:'#e8a030', trap:'#c070e8' };

  return (
    <>
      <style>{`.sim-day-grid{display:grid;grid-template-columns:260px 1fr;gap:1.25rem;} @media(max-width:768px){.sim-day-grid{grid-template-columns:1fr;} .sim-sidebar{display:none;} .sim-sidebar.open{display:block!important;} .sim-toggle{display:block!important;}}`}</style>
      <div style={{maxWidth:'1400px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <div style={{marginBottom:'1.75rem'}}>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.4rem'}}>⚔️ SIMULATION ENGINE</p>
          <h1 style={{fontSize:'clamp(1.6rem,5vw,3rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.4rem'}}>Arena Simulator</h1>
          <p style={{color:'#a09880',margin:0}}>Select a game edition, run the simulation, watch tributes fall</p>
        </div>

        {phase === 'select' && (
          <div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))',gap:'0.875rem',marginBottom:'1.5rem'}}>
              {hungerGames.map(game => (
                <button key={game.id} onClick={() => setSelectedGame(game.id)} style={{background:selectedGame===game.id?'rgba(212,160,23,0.1)':'#0d1009',border:`1px solid ${selectedGame===game.id?'#d4a017':'#1e2818'}`,borderRadius:'8px',padding:'1.25rem',cursor:'pointer',textAlign:'left'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.4rem'}}>
                    <span style={{fontSize:'1rem',fontFamily:'Cinzel, serif',fontWeight:700,color:selectedGame===game.id?'#d4a017':'#e8e0d0'}}>{game.name}</span>
                    {game.specialRules && <span style={{fontSize:'0.55rem',color:'#e87070',fontFamily:'Oswald, sans-serif',background:'rgba(139,26,26,0.2)',border:'1px solid rgba(139,26,26,0.4)',padding:'0.1rem 0.4rem',borderRadius:'2px'}}>QUELL</span>}
                  </div>
                  <p style={{fontSize:'0.72rem',color:'#a09880',marginBottom:'0.6rem'}}>📍 {game.arena}</p>
                  <div style={{height:'3px',background:'#1e2818',borderRadius:'2px',marginBottom:'0.4rem'}}>
                    <div style={{height:'100%',width:`${game.dangerMeter}%`,background:'linear-gradient(90deg,#8b1a1a,#d4a017)',borderRadius:'2px'}}/>
                  </div>
                  <p style={{fontSize:'0.6rem',color:'#5a5448',margin:0}}>{game.tributes.length > 0 ? `${game.tributes.length} tributes` : 'Build your own roster'}</p>
                </button>
              ))}
            </div>

            {selectedGame === 'custom-games' && (
              <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem',marginBottom:'1.25rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.875rem',flexWrap:'wrap',gap:'0.5rem'}}>
                  <p style={{fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',margin:0}}>SELECT TRIBUTES ({customTributes.length}/24)</p>
                  <Link href="/custom-tributes" style={{fontSize:'0.7rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#d4a017',textDecoration:'none',border:'1px dashed rgba(212,160,23,0.4)',borderRadius:'4px',padding:'0.35rem 0.75rem'}}>✨ CREATE YOUR OWN TRIBUTE</Link>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(170px, 1fr))',gap:'0.4rem'}}>
                  {allTributes.map(t => {
                    const sel = customTributes.includes(t.id);
                    return <button key={t.id} onClick={() => toggleCustom(t.id)} style={{background:sel?'rgba(212,160,23,0.1)':'transparent',border:`1px solid ${sel?'#d4a017':'#1e2818'}`,borderRadius:'5px',padding:'0.5rem 0.75rem',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:'0.5rem'}}>
                      <div style={{width:22,height:22,borderRadius:'50%',background:sel?'linear-gradient(135deg,#d4a017,#8b6914)':'#1e2818',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.6rem',fontWeight:700,color:sel?'#0a0c06':'#5a5448',flexShrink:0}}>{t.name.charAt(0)}</div>
                      <div style={{overflow:'hidden'}}>
                        <p style={{fontSize:'0.72rem',color:sel?'#d4a017':'#a09880',margin:0,fontWeight:sel?700:400,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</p>
                        <p style={{fontSize:'0.58rem',color:'#5a5448',margin:0}}>D{t.districtNumber}</p>
                      </div>
                    </button>;
                  })}
                </div>
              </div>
            )}

            {/* CUSTOM EVENTS */}
            <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem',marginBottom:'1.25rem'}}>
              <button onClick={() => setShowEventBuilder(v => !v)} style={{width:'100%',background:'transparent',border:'none',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',padding:0}}>
                <div style={{textAlign:'left'}}>
                  <p style={{fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',margin:'0 0 0.2rem'}}>✍️ CUSTOM EVENTS {userEvents.length > 0 && `(${userEvents.length})`}</p>
                  <p style={{fontSize:'0.78rem',color:'#a09880',margin:0}}>Write your own arena events — they get mixed into the simulation</p>
                </div>
                <span style={{color:'#d4a017',fontSize:'1.3rem'}}>{showEventBuilder ? '−' : '+'}</span>
              </button>

              {showEventBuilder && (
                <div style={{marginTop:'1.25rem',paddingTop:'1.25rem',borderTop:'1px solid #1e2818'}}>
                  {/* Type selector */}
                  <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap',marginBottom:'0.875rem'}}>
                    {(Object.keys(EVENT_TYPE_INFO) as CustomEventType[]).map(type => {
                      const info = EVENT_TYPE_INFO[type];
                      const active = newEventType === type;
                      return (
                        <button key={type} onClick={() => { setNewEventType(type); setNewEventText(''); }} style={{background:active?`${info.color}18`:'transparent',border:`1px solid ${active?info.color:'#1e2818'}`,color:active?info.color:'#5a5448',padding:'0.3rem 0.7rem',borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em',fontSize:'0.7rem',outline:'none'}}>
                          {info.icon} {info.label}{info.fatal ? ' ☠' : ''}
                        </button>
                      );
                    })}
                  </div>

                  {/* Hint */}
                  <p style={{fontSize:'0.7rem',color:'#5a5448',margin:'0 0 0.5rem',lineHeight:1.5}}>{EVENT_TYPE_INFO[newEventType].hint}</p>

                  {/* Input */}
                  <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.875rem',flexWrap:'wrap'}}>
                    <input
                      value={newEventText}
                      onChange={e => setNewEventText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') addEvent(); }}
                      placeholder={EVENT_TYPE_INFO[newEventType].placeholder}
                      maxLength={200}
                      style={{flex:'1 1 240px',minWidth:0,background:'#080a06',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.6rem 0.75rem',color:'#e8e0d0',fontSize:'0.82rem',outline:'none'}}
                    />
                    <button onClick={addEvent} disabled={newEventText.trim().length < 5} style={{background:newEventText.trim().length >= 5 ? `linear-gradient(135deg,${EVENT_TYPE_INFO[newEventType].color},${EVENT_TYPE_INFO[newEventType].color}bb)` : '#1e2818',color:newEventText.trim().length >= 5 ? '#0a0c06' : '#5a5448',border:'none',borderRadius:'5px',padding:'0.6rem 1.25rem',cursor:newEventText.trim().length >= 5 ? 'pointer' : 'not-allowed',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontWeight:700,fontSize:'0.75rem',whiteSpace:'nowrap'}}>
                      ADD EVENT
                    </button>
                  </div>

                  {/* List of added events */}
                  {userEvents.length > 0 && (
                    <div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
                      {userEvents.map((ev, i) => {
                        const info = EVENT_TYPE_INFO[ev.type as CustomEventType] || EVENT_TYPE_INFO.survival;
                        return (
                          <div key={i} style={{display:'flex',alignItems:'center',gap:'0.6rem',background:'#080a06',border:'1px solid #1e2818',borderRadius:'5px',padding:'0.5rem 0.7rem'}}>
                            <span style={{fontSize:'0.55rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em',color:info.color,background:`${info.color}15`,border:`1px solid ${info.color}33`,padding:'0.15rem 0.45rem',borderRadius:'2px',flexShrink:0}}>{info.icon} {info.label.toUpperCase()}</span>
                            <span style={{fontSize:'0.78rem',color:'#a09880',flex:1,minWidth:0,overflowWrap:'break-word'}}>{ev.template}</span>
                            <button onClick={() => removeEvent(i)} style={{background:'transparent',border:'none',color:'#8b1a1a',cursor:'pointer',fontSize:'1.1rem',flexShrink:0,lineHeight:1,padding:'0 0.2rem'}}>×</button>
                          </div>
                        );
                      })}
                      <p style={{fontSize:'0.68rem',color:'#5a5448',margin:'0.4rem 0 0',fontStyle:'italic'}}>These {userEvents.length} custom event{userEvents.length > 1 ? 's' : ''} will appear randomly alongside the built-in events when you run the Games.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button onClick={handleStart} disabled={tributePool.length < 2} style={{width:'100%',background:tributePool.length>=2?'linear-gradient(135deg,#d4a017,#b8860b)':'#1e2818',color:tributePool.length>=2?'#0a0c06':'#5a5448',border:'none',borderRadius:'6px',padding:'1rem',fontSize:'1rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',fontWeight:700,cursor:tributePool.length>=2?'pointer':'not-allowed'}}>
              {tributePool.length < 2 ? 'SELECT A GAME EDITION' : 'LET THE GAMES BEGIN →'}
            </button>
          </div>
        )}

        {phase === 'running' && (
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'50vh',gap:'1.5rem',textAlign:'center'}}>
            <div style={{fontSize:'3.5rem'}}>⚔️</div>
            <div>
              <p style={{fontFamily:'Oswald, sans-serif',letterSpacing:'0.3em',color:'#d4a017',marginBottom:'0.5rem',fontSize:'0.8rem'}}>GAMES IN PROGRESS</p>
              <p style={{color:'#a09880'}}>{progressMsg}</p>
            </div>
            <div style={{width:'min(400px,90vw)',height:'6px',background:'#1e2818',borderRadius:'3px',overflow:'hidden'}}>
              <div style={{height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,#8b1a1a,#d4a017)',borderRadius:'3px',transition:'width 0.1s linear'}}/>
            </div>
            <p style={{fontFamily:'Oswald, sans-serif',fontSize:'0.75rem',color:'#5a5448',letterSpacing:'0.2em'}}>{progress}%</p>
          </div>
        )}

        {phase === 'results' && result && (
          <div>
            {result.victor && (
              <div style={{background:'linear-gradient(135deg, rgba(212,160,23,0.12), rgba(139,26,26,0.08))',border:'1px solid rgba(212,160,23,0.3)',borderRadius:'12px',padding:'1.5rem',marginBottom:'1.25rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
                  <span style={{fontSize:'2.5rem'}}>👑</span>
                  <div style={{flex:1,minWidth:'140px'}}>
                    <p style={{fontSize:'0.55rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',color:'#d4a017',margin:'0 0 0.2rem'}}>VICTOR</p>
                    <h2 style={{fontSize:'clamp(1.2rem,4vw,2rem)',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',margin:0}}>{result.victor.name}</h2>
                    <p style={{fontSize:'0.72rem',color:'#a09880',margin:'0.2rem 0 0'}}>{result.victor.district}</p>
                  </div>
                  <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap'}}>
                    <div style={{textAlign:'center',background:'rgba(139,26,26,0.2)',border:'1px solid rgba(139,26,26,0.3)',borderRadius:'6px',padding:'0.5rem 0.875rem'}}>
                      <p style={{fontSize:'1.25rem',fontWeight:700,color:'#e87070',margin:0}}>{result.totalDeaths}</p>
                      <p style={{fontSize:'0.55rem',color:'#5a5448',margin:0}}>DEAD</p>
                    </div>
                    <div style={{textAlign:'center',background:'rgba(212,160,23,0.1)',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'6px',padding:'0.5rem 0.875rem'}}>
                      <p style={{fontSize:'1.25rem',fontWeight:700,color:'#d4a017',margin:0}}>{result.totalDays}</p>
                      <p style={{fontSize:'0.55rem',color:'#5a5448',margin:0}}>DAYS</p>
                    </div>
                  </div>
                  <button onClick={handleReset} style={{background:'linear-gradient(135deg,#d4a017,#b8860b)',border:'none',color:'#0a0c06',padding:'0.6rem 1.25rem',borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.72rem',fontWeight:700}}>🔄 NEW GAMES</button>
                  <button onClick={copyShareLink} style={{background:'transparent',border:'1px solid rgba(212,160,23,0.4)',color:'#d4a017',padding:'0.6rem 1.25rem',borderRadius:'4px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',fontSize:'0.72rem',fontWeight:600}}>{copied ? '✓ LINK COPIED!' : '🔗 SHARE THESE GAMES'}</button>
                </div>
              </div>
            )}

            <button className="sim-toggle" onClick={() => setShowDayList(!showDayList)} style={{width:'100%',marginBottom:'0.875rem',background:'#0d1009',border:'1px solid #d4a017',color:'#d4a017',padding:'0.75rem',borderRadius:'6px',cursor:'pointer',fontFamily:'Oswald, sans-serif',fontSize:'0.8rem',letterSpacing:'0.15em',display:'none'}}>
              {showDayList ? '▲ HIDE DAYS' : `▼ ALL DAYS (${result.days.length})`}
            </button>

            <div className="sim-day-grid">
              <div className={`sim-sidebar${showDayList?' open':''}`}>
                <h3 style={{fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#5a5448',marginBottom:'0.6rem'}}>DAYS ({result.days.length})</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'0.3rem',maxHeight:'65vh',overflowY:'auto'}}>
                  {result.days.map((day, i) => (
                    <button key={day.day} onClick={() => { setActiveDay(i); setShowDayList(false); }} style={{background:activeDay===i?'rgba(212,160,23,0.1)':'#0d1009',border:`1px solid ${activeDay===i?'#d4a017':'#1e2818'}`,borderRadius:'5px',padding:'0.6rem 0.875rem',cursor:'pointer',textAlign:'left'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.1rem'}}>
                        <span style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',color:activeDay===i?'#d4a017':'#5a5448'}}>DAY {day.day}</span>
                        {day.cannonCount > 0 && <span style={{fontSize:'0.58rem',color:'#e87070'}}>💀 {day.cannonCount}</span>}
                      </div>
                      <p style={{fontSize:'0.75rem',fontFamily:'Cinzel, serif',color:activeDay===i?'#e8e0d0':'#a09880',margin:0}}>{day.title}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                {result.days[activeDay] && (() => {
                  const day = result.days[activeDay];
                  return (
                    <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem'}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1rem',flexWrap:'wrap',gap:'0.5rem'}}>
                        <div>
                          <p style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017',margin:'0 0 0.25rem'}}>DAY {day.day}</p>
                          <h3 style={{fontSize:'clamp(1rem,3vw,1.4rem)',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:0}}>{day.title}</h3>
                        </div>
                        <div style={{display:'flex',gap:'0.75rem'}}>
                          <div style={{textAlign:'center'}}><div style={{fontSize:'1.2rem',fontWeight:700,color:'#e87070',fontFamily:'Cinzel, serif'}}>{day.cannonCount}</div><div style={{fontSize:'0.5rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>CANNONS</div></div>
                          <div style={{textAlign:'center'}}><div style={{fontSize:'1.2rem',fontWeight:700,color:'#d4a017',fontFamily:'Cinzel, serif'}}>{day.survivors.length}</div><div style={{fontSize:'0.5rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>ALIVE</div></div>
                        </div>
                      </div>
                      <div style={{background:'rgba(212,160,23,0.05)',border:'1px solid rgba(212,160,23,0.15)',borderRadius:'6px',padding:'0.75rem',marginBottom:'1rem'}}>
                        <p style={{color:'#a09880',fontSize:'0.875rem',margin:0,lineHeight:1.6}}>{day.highlight}</p>
                      </div>
                      {day.events.map(ev => (
                        <div key={ev.id} style={{background:'#111609',border:'1px solid #1e2818',borderRadius:'6px',padding:'0.875rem',marginBottom:'0.4rem'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.35rem'}}>
                            <span style={{fontSize:'0.55rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:typeColors[ev.type]||'#a09880',background:`${typeColors[ev.type]||'#a09880'}18`,border:`1px solid ${typeColors[ev.type]||'#a09880'}44`,padding:'0.1rem 0.5rem',borderRadius:'2px'}}>{ev.type.toUpperCase()}</span>
                          </div>
                          <p style={{color:'#c0b8a8',fontSize:'0.875rem',lineHeight:1.6,margin:0}}>{ev.description}</p>
                          {ev.deaths.length > 0 && (
                            <div style={{marginTop:'0.4rem',display:'flex',gap:'0.35rem',flexWrap:'wrap'}}>
                              {ev.deaths.map(did => { const dt = getTributeById(did); return dt ? <span key={did} style={{fontSize:'0.62rem',color:'#e87070',background:'rgba(139,26,26,0.2)',border:'1px solid rgba(139,26,26,0.3)',padding:'0.1rem 0.4rem',borderRadius:'2px'}}>💀 {dt.name}</span> : null; })}
                            </div>
                          )}
                        </div>
                      ))}
                      <div style={{marginTop:'0.875rem',paddingTop:'0.875rem',borderTop:'1px solid #1e2818'}}>
                        <p style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',marginBottom:'0.4rem'}}>ALIVE ({day.survivors.length})</p>
                        <div style={{display:'flex',gap:'0.35rem',flexWrap:'wrap'}}>
                          {day.survivors.map(sid => { const st = getTributeById(sid); return st ? <span key={sid} style={{fontSize:'0.68rem',color:'#a09880',background:'#111609',border:'1px solid #1e2818',padding:'0.15rem 0.5rem',borderRadius:'3px'}}>{st.name}</span> : null; })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
                <div style={{display:'flex',gap:'0.5rem',marginTop:'0.875rem'}}>
                  <button onClick={() => setActiveDay(Math.max(0,activeDay-1))} disabled={activeDay===0} style={{flex:1,background:'#0d1009',border:'1px solid #1e2818',color:activeDay===0?'#2a3020':'#a09880',padding:'0.6rem',borderRadius:'4px',cursor:activeDay===0?'not-allowed':'pointer',fontFamily:'Oswald, sans-serif',fontSize:'0.75rem'}}>← PREV</button>
                  <button onClick={() => setActiveDay(Math.min(result.days.length-1,activeDay+1))} disabled={activeDay===result.days.length-1} style={{flex:1,background:'#0d1009',border:'1px solid #1e2818',color:activeDay===result.days.length-1?'#2a3020':'#d4a017',padding:'0.6rem',borderRadius:'4px',cursor:activeDay===result.days.length-1?'not-allowed':'pointer',fontFamily:'Oswald, sans-serif',fontSize:'0.75rem'}}>NEXT →</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}