'use client';
import { useState } from 'react';
import Link from 'next/link';
import { tributes, calculateVictoryOdds } from '@/data/tributes';
import { districts } from '@/data/districts';
import { hungerGames } from '@/data/games';

const topTributes = [...tributes].sort((a,b) => {
  const s = (t: typeof tributes[0]) => t.stats.strength*0.15+t.stats.agility*0.15+t.stats.survival*0.2+t.stats.intelligence*0.15+t.stats.weaponSkill*0.2+t.stats.stealth*0.15;
  return s(b)-s(a);
}).slice(0,6);

const SITE_STATS = [
  { label: 'Tributes', value: tributes.length, icon: '⚔️' },
  { label: 'Districts', value: districts.length, icon: '🏛️' },
  { label: 'Game Editions', value: hungerGames.length, icon: '📜' },
  { label: 'Quiz Questions', value: '30', icon: '🧠' },
];

const FEATURES = [
  { icon: '⚔️', title: 'Full Season Simulator', desc: 'Run the 74th Games, Quarter Quell, 50th Games, or build a custom roster. Day-by-day events, cannon deaths, alliance betrayals.', href: '/simulator', cta: 'Run the Games' },
  { icon: '👊', title: '1v1 Fight Simulator', desc: 'Put any two tributes head-to-head. Choose combat type: direct combat, survival, alliance, or trap scenarios.', href: '/fight', cta: 'Start a Fight' },
  { icon: '📊', title: 'Live Odds Calculator', desc: 'Real-time victory odds for every tribute. Filter by district, adjust the pool, see who the Capitol is backing.', href: '/odds', cta: 'Check Odds' },
  { icon: '🧠', title: 'Hunger Games Quiz', desc: '30 questions across 5 modes — easy Training Ground to brutal Quarter Quell. Test your Panem knowledge.', href: '/quiz', cta: 'Take the Quiz' },
  { icon: '👤', title: 'Tribute Profiles', desc: 'Full stat sheets for all 24 tributes — strength, agility, survival, intelligence, stealth, charisma, weapon skill.', href: '/tributes', cta: 'View Tributes' },
  { icon: '🏛️', title: 'District Guide', desc: '13 districts with wealth levels, Capitol loyalty scores, industry breakdowns, and historical win rates.', href: '/districts', cta: 'Explore Districts' },
];

const BG_COLORS: Record<string,string> = { Career:'#d4a017', Victor:'#c070e8', Volunteer:'#70c870', Reaped:'#e87070' };

export default function HomePage() {
  const [hoveredTribute, setHoveredTribute] = useState<string|null>(null);
  const odds = tributes.map(t => ({ tribute: t, odds: calculateVictoryOdds(t, tributes) })).sort((a,b) => b.odds-a.odds).slice(0,5);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: HOME_FAQS.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }) }} />
      <style>{`
        .home-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;}
        .home-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;}
        .home-games-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;}
        .home-tributes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:0.875rem;}
        .home-features-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem;}
        .home-bottom-grid{display:grid;grid-template-columns:2fr 1fr;gap:2rem;}
        @media(max-width:900px){.home-hero-grid{grid-template-columns:1fr;} .home-bottom-grid{grid-template-columns:1fr;}}
        @media(max-width:600px){.home-stats-grid{grid-template-columns:repeat(2,1fr);}}
      `}</style>

      {/* HERO */}
      <section style={{background:'radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.12) 0%, transparent 60%), #080a06',padding:'4rem 1.5rem 3rem',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(212,160,23,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(212,160,23,0.04) 1px, transparent 1px)',backgroundSize:'50px 50px',pointerEvents:'none'}}/>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div className="home-hero-grid">
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'rgba(212,160,23,0.08)',border:'1px solid rgba(212,160,23,0.25)',borderRadius:'20px',padding:'0.35rem 0.875rem',marginBottom:'1.25rem'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#d4a017',display:'inline-block',animation:'pulse 2s infinite'}}/>
                <span style={{fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017'}}>LIVE SIMULATOR · PANEM ONLINE</span>
              </div>
              <h1 style={{fontSize:'clamp(2.2rem,6vw,4rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,lineHeight:1.1,margin:'0 0 1.25rem'}}>
                <span style={{background:'linear-gradient(135deg,#d4a017,#f0c842,#d4a017)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Hunger Games</span>
                <br/><span style={{color:'#e8e0d0'}}>Simulator</span>
              </h1>
              <p style={{fontSize:'1.05rem',color:'#a09880',lineHeight:1.8,margin:'0 0 2rem',maxWidth:'480px'}}>
                The most advanced Hunger Games simulator. Run the 74th Games, Quarter Quell, or custom arenas. Full tribute stats, 1v1 fights, live odds, and a 30-question quiz.
              </p>
              <div style={{display:'flex',gap:'0.875rem',flexWrap:'wrap'}}>
                <Link href="/simulator" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.875rem 1.75rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:700,fontSize:'0.85rem',boxShadow:'0 0 30px rgba(212,160,23,0.3)'}}>
                  ⚔️ ENTER THE ARENA
                </Link>
                <Link href="/quiz" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'transparent',color:'#d4a017',padding:'0.875rem 1.75rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:600,fontSize:'0.85rem',border:'1px solid rgba(212,160,23,0.35)'}}>
                  🧠 TAKE THE QUIZ
                </Link>
              </div>
            </div>

            {/* Live odds panel */}
            <div style={{background:'rgba(13,16,9,0.9)',border:'1px solid rgba(212,160,23,0.25)',borderRadius:'14px',padding:'1.25rem',backdropFilter:'blur(10px)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem'}}>
                <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.3em',color:'#d4a017',margin:0}}>LIVE CAPITOL ODDS</p>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#70c870',display:'inline-block'}}/>
              </div>
              {odds.map(({tribute:t, odds:o}, i) => (
                <Link key={t.id} href={`/tributes/${t.id}`} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.6rem 0',borderBottom:'1px solid rgba(255,255,255,0.03)',textDecoration:'none'}}>
                  <span style={{fontSize:'0.7rem',color:'#5a5448',fontFamily:'Cinzel, serif',width:'20px',flexShrink:0}}>#{i+1}</span>
                  <div style={{width:32,height:32,borderRadius:'50%',background:`linear-gradient(135deg,#d4a017,#8b6914)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.85rem',fontWeight:900,color:'#080a06',fontFamily:'Cinzel, serif',flexShrink:0}}>{t.name.charAt(0)}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:'0.85rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</p>
                    <p style={{fontSize:'0.6rem',color:'#5a5448',margin:0}}>D{t.districtNumber} · {t.background}</p>
                  </div>
                  <div style={{textAlign:'right',flexShrink:0}}>
                    <p style={{fontSize:'1rem',fontWeight:700,color:'#d4a017',margin:0,fontFamily:'Cinzel, serif'}}>{o}%</p>
                    <div style={{height:'2px',width:'50px',background:'#1e2818',borderRadius:'1px',overflow:'hidden',marginTop:'3px'}}>
                      <div style={{height:'100%',width:`${(o/odds[0].odds)*100}%`,background:'linear-gradient(90deg,#d4a017,#f0c842)',borderRadius:'1px'}}/>
                    </div>
                  </div>
                </Link>
              ))}
              <Link href="/odds" style={{display:'block',textAlign:'center',marginTop:'1rem',fontSize:'0.7rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#d4a017',textDecoration:'none'}}>VIEW ALL ODDS →</Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="home-stats-grid" style={{marginTop:'2.5rem'}}>
            {SITE_STATS.map(s => (
              <div key={s.label} style={{background:'rgba(13,16,9,0.6)',border:'1px solid rgba(212,160,23,0.12)',borderRadius:'8px',padding:'1rem',textAlign:'center'}}>
                <div style={{fontSize:'1.5rem',marginBottom:'0.25rem'}}>{s.icon}</div>
                <p style={{fontSize:'1.75rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',margin:'0 0 0.1rem'}}>{s.value}</p>
                <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',margin:0}}>{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GAME EDITIONS */}
      <section style={{padding:'3rem 1.5rem',background:'#080a06'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{marginBottom:'1.75rem'}}>
            <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.5rem'}}>📜 CHOOSE YOUR GAMES</p>
            <h2 style={{fontSize:'clamp(1.5rem,4vw,2.25rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:0}}>Game Editions</h2>
          </div>
          <div className="home-games-grid">
            {hungerGames.map(game => (
              <Link key={game.id} href="/simulator" style={{textDecoration:'none'}}>
                <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'12px',overflow:'hidden',height:'100%',cursor:'pointer',transition:'all 0.25s'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(212,160,23,0.35)';(e.currentTarget as HTMLElement).style.transform='translateY(-3px)';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#1e2818';(e.currentTarget as HTMLElement).style.transform='none';}}>
                  <GameImage game={game}/>
                  <div style={{padding:'1.1rem'}}>
                    <h3 style={{fontSize:'1rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.3rem',lineHeight:1.3}}>{game.name}</h3>
                    <p style={{fontSize:'0.75rem',color:'#5a5448',margin:'0 0 0.75rem'}}>📍 {game.arena}</p>
                    <div style={{marginBottom:'0.75rem'}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.2rem'}}>
                        <span style={{fontSize:'0.55rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#5a5448'}}>DANGER LEVEL</span>
                        <span style={{fontSize:'0.6rem',color:'#8b1a1a',fontWeight:700}}>{game.dangerMeter}/100</span>
                      </div>
                      <div style={{height:'4px',background:'#1e2818',borderRadius:'2px',overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${game.dangerMeter}%`,background:'linear-gradient(90deg,#8b1a1a,#e87070)',borderRadius:'2px'}}/>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:'0.35rem',flexWrap:'wrap'}}>
                      {game.arenaHazards.slice(0,3).map(h => (
                        <span key={h} style={{fontSize:'0.58rem',color:'#8b1a1a',background:'rgba(139,26,26,0.1)',border:'1px solid rgba(139,26,26,0.2)',padding:'0.1rem 0.4rem',borderRadius:'2px'}}>{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOP TRIBUTES */}
      <section style={{padding:'3rem 1.5rem',background:'#0a0c08'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'1.75rem',flexWrap:'wrap',gap:'0.5rem'}}>
            <div>
              <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.5rem'}}>👤 TOP TRIBUTES</p>
              <h2 style={{fontSize:'clamp(1.5rem,4vw,2.25rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:0}}>Most Dangerous Tributes</h2>
            </div>
            <Link href="/tributes" style={{fontSize:'0.72rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#d4a017',textDecoration:'none'}}>VIEW ALL →</Link>
          </div>
          <div className="home-tributes-grid">
            {topTributes.map((t,i) => {
              const odds = calculateVictoryOdds(t, tributes);
              return (
                <Link key={t.id} href={`/tributes/${t.id}`} style={{textDecoration:'none'}}>
                  <div style={{background:'#0d1009',border:`1px solid ${hoveredTribute===t.id?'rgba(212,160,23,0.35)':'#1e2818'}`,borderRadius:'10px',padding:'1rem',textAlign:'center',cursor:'pointer',transition:'all 0.2s',transform:hoveredTribute===t.id?'translateY(-4px)':'none'}}
                    onMouseEnter={()=>setHoveredTribute(t.id)} onMouseLeave={()=>setHoveredTribute(null)}>
                    <div style={{position:'relative',display:'inline-block',marginBottom:'0.75rem'}}>
                      <div style={{width:56,height:56,borderRadius:'50%',background:`linear-gradient(135deg,#d4a017,#8b6914)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',fontWeight:900,color:'#080a06',fontFamily:'Cinzel, serif',margin:'0 auto'}}>
                        {t.name.charAt(0)}
                      </div>
                      <span style={{position:'absolute',top:-4,right:-4,width:20,height:20,borderRadius:'50%',background:'#080a06',border:'1px solid rgba(212,160,23,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.6rem',color:'#d4a017',fontFamily:'Cinzel, serif',fontWeight:700}}>{i+1}</span>
                    </div>
                    <h3 style={{fontSize:'0.9rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.2rem'}}>{t.name}</h3>
                    {t.nickname && <p style={{fontSize:'0.6rem',color:'#d4a017',margin:'0 0 0.5rem',fontFamily:'Cinzel, serif',fontStyle:'italic',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>"{t.nickname}"</p>}
                    <div style={{display:'flex',gap:'0.3rem',justifyContent:'center',marginBottom:'0.75rem',flexWrap:'wrap'}}>
                      <span style={{fontSize:'0.55rem',color:BG_COLORS[t.background]||'#a09880',background:`${BG_COLORS[t.background]||'#a09880'}18`,border:`1px solid ${BG_COLORS[t.background]||'#a09880'}33`,padding:'0.1rem 0.4rem',borderRadius:'2px'}}>{t.background}</span>
                      <span style={{fontSize:'0.55rem',color:'#5a5448',background:'#111609',border:'1px solid #1e2818',padding:'0.1rem 0.4rem',borderRadius:'2px'}}>D{t.districtNumber}</span>
                    </div>
                    <div style={{fontSize:'1.25rem',fontWeight:700,color:'#d4a017',fontFamily:'Cinzel, serif'}}>{odds}%</div>
                    <div style={{fontSize:'0.55rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>VICTORY ODDS</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:'3rem 1.5rem',background:'#080a06'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.5rem'}}>🏛️ EVERYTHING YOU NEED</p>
            <h2 style={{fontSize:'clamp(1.5rem,4vw,2.25rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:0}}>Simulator Features</h2>
          </div>
          <div className="home-features-grid">
            {FEATURES.map(f => (
              <Link key={f.href} href={f.href} style={{textDecoration:'none'}}>
                <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'12px',padding:'1.5rem',height:'100%',cursor:'pointer',transition:'all 0.25s'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(212,160,23,0.3)';(e.currentTarget as HTMLElement).style.background='#111609';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#1e2818';(e.currentTarget as HTMLElement).style.background='#0d1009';}}>
                  <div style={{fontSize:'2rem',marginBottom:'0.875rem'}}>{f.icon}</div>
                  <h3 style={{fontSize:'1rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.5rem'}}>{f.title}</h3>
                  <p style={{fontSize:'0.82rem',color:'#a09880',lineHeight:1.7,margin:'0 0 1rem'}}>{f.desc}</p>
                  <span style={{fontSize:'0.7rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#d4a017'}}>{f.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUIZ CTA */}
      <section style={{padding:'3rem 1.5rem',background:'#0a0c08'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div style={{background:'linear-gradient(135deg,rgba(212,160,23,0.1),rgba(139,26,26,0.06))',border:'1px solid rgba(212,160,23,0.25)',borderRadius:'16px',padding:'2.5rem',textAlign:'center'}}>
            <div style={{fontSize:'2.5rem',marginBottom:'1rem'}}>🧠</div>
            <h2 style={{fontSize:'clamp(1.5rem,4vw,2.25rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.75rem'}}>Think You Know Panem?</h2>
            <p style={{color:'#a09880',fontSize:'1rem',margin:'0 0 1.75rem',lineHeight:1.7,maxWidth:'500px',display:'block',marginLeft:'auto',marginRight:'auto'}}>
              30 questions across 5 difficulty modes — from Training Ground basics to brutal Quarter Quell knowledge. Test your Hunger Games expertise.
            </p>
            <div style={{display:'flex',gap:'0.875rem',justifyContent:'center',flexWrap:'wrap'}}>
              <Link href="/quiz" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.875rem 2rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:700,fontSize:'0.85rem',boxShadow:'0 0 25px rgba(212,160,23,0.25)'}}>
                🎯 START QUIZ
              </Link>
              <Link href="/leaderboard" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',background:'transparent',color:'#d4a017',padding:'0.875rem 2rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:600,fontSize:'0.85rem',border:'1px solid rgba(212,160,23,0.3)'}}>
                🏆 LEADERBOARD
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE GUIDE / SEO CONTENT */}
      <section style={{background:'#080a06',padding:'3.5rem 1.5rem'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <div style={{borderBottom:'1px solid #1e2818',paddingBottom:'2.5rem',marginBottom:'2.5rem'}}>
            <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.75rem'}}>📖 THE COMPLETE GUIDE</p>
            <h2 style={{fontSize:'clamp(1.5rem,3.5vw,2.5rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 1.5rem',lineHeight:1.2}}>
              The Most Advanced Hunger Games Simulator Online
            </h2>
            <p style={{color:'#a09880',lineHeight:1.9,marginBottom:'1.25rem',fontSize:'0.95rem'}}>
              Hunger Games Simulator is the internet&apos;s most detailed simulator for Suzanne Collins&apos; world of Panem. Whether you&apos;re a devoted fan of the original trilogy, fascinated by the <strong style={{color:'#e8e0d0'}}>Ballad of Songbirds &amp; Snakes</strong> prequel, or just love running &quot;what if&quot; scenarios, our platform brings every tribute, district, and arena to life with an unprecedented level of detail.
            </p>
            <p style={{color:'#a09880',lineHeight:1.9,marginBottom:'1.25rem',fontSize:'0.95rem'}}>
              Our simulation engine assigns each of the <strong style={{color:'#e8e0d0'}}>{tributes.length} tributes</strong> eight core stats — <strong style={{color:'#d4a017'}}>strength, agility, survival, intelligence, charisma, stealth, weapon skill, and alliance loyalty</strong>. Every Games plays out differently because the engine combines these stats with controlled randomness, so no two simulations are ever identical. The Cornucopia bloodbath, mid-game alliances, betrayals, arena hazards, and the final showdown all unfold dynamically.
            </p>
            <p style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
              From <strong style={{color:'#e8e0d0'}}>Katniss Everdeen</strong> and the 74th Games to the deadly clockwork arena of the 75th Quarter Quell, you can run any official edition or build a fully custom roster. Pit Katniss against Finnick, see if Foxface can outlast the Career pack, or check live victory odds before the cannons fire.
            </p>
          </div>

          {/* HOW IT WORKS */}
          <div style={{marginBottom:'2.5rem'}}>
            <h2 style={{fontSize:'clamp(1.4rem,3vw,2.25rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 1.75rem'}}>How the Simulator Works</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'1rem'}}>
              {[
                {n:'1',icon:'⚔️',t:'Choose Your Games',d:'Pick an official edition — the 74th Games, 75th Quarter Quell, or 50th Games — or build a custom arena with any combination of tributes.'},
                {n:'2',icon:'👤',t:'Select Tributes',d:'Each tribute carries eight unique stats drawn from their canon background. Careers dominate combat; underdogs survive on stealth and smarts.'},
                {n:'3',icon:'🎬',t:'Run the Simulation',d:'Watch the Games unfold day by day — Cornucopia bloodbath, alliances, betrayals, arena hazards, and sponsor gifts all play out dynamically.'},
                {n:'4',icon:'🏆',t:'Crown the Victor',d:'One tribute survives. Review the full death log, kill leader, and popularity rankings — then run it again for a completely different outcome.'},
              ].map(step => (
                <div key={step.n} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem',position:'relative'}}>
                  <div style={{position:'absolute',top:'1rem',right:'1rem',fontSize:'1.75rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'rgba(212,160,23,0.15)'}}>{step.n}</div>
                  <div style={{fontSize:'1.75rem',marginBottom:'0.75rem'}}>{step.icon}</div>
                  <h3 style={{fontSize:'1rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.5rem'}}>{step.t}</h3>
                  <p style={{fontSize:'0.82rem',color:'#a09880',lineHeight:1.7,margin:0}}>{step.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STAT EXPLAINER */}
          <div style={{marginBottom:'2.5rem',background:'rgba(212,160,23,0.04)',border:'1px solid rgba(212,160,23,0.15)',borderRadius:'12px',padding:'1.75rem'}}>
            <h2 style={{fontSize:'clamp(1.3rem,3vw,2rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 1.25rem'}}>Understanding the Eight Tribute Stats</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'0.875rem'}}>
              {[
                ['💪','Strength','Raw physical power. Decides close-quarters combat and the Cornucopia bloodbath.','#e87070'],
                ['⚡','Agility','Speed and reflexes. Helps tributes dodge attacks and escape arena hazards.','#70c870'],
                ['🌿','Survival','Living off the land — food, water, shelter. The single most important long-game stat.','#70a0e8'],
                ['🧠','Intelligence','Strategy and problem-solving. Powers traps, alliances, and reading the arena.','#c070e8'],
                ['✨','Charisma','Sponsor appeal. High-charisma tributes receive life-saving gifts mid-Games.','#e8a8d0'],
                ['👁️','Stealth','Staying hidden. Lets tributes avoid the bloodbath and pick their moments.','#5a8b6a'],
                ['⚔️','Weapon Skill','Mastery of a chosen weapon. The biggest multiplier in any direct fight.','#d4a017'],
                ['🤝','Alliance Loyalty','How dependable a tribute is. Low loyalty means betrayal is always coming.','#70c8c8'],
              ].map(([icon,name,desc,color]) => (
                <div key={name as string} style={{display:'flex',gap:'0.75rem',alignItems:'flex-start'}}>
                  <span style={{fontSize:'1.25rem',flexShrink:0}}>{icon}</span>
                  <div>
                    <h3 style={{fontSize:'0.85rem',fontFamily:'Cinzel, serif',fontWeight:700,color:color as string,margin:'0 0 0.2rem'}}>{name}</h3>
                    <p style={{fontSize:'0.75rem',color:'#a09880',lineHeight:1.6,margin:0}}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 style={{fontSize:'clamp(1.4rem,3vw,2.25rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 1.75rem'}}>Frequently Asked Questions</h2>
            <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
              {HOME_FAQS.map((faq, i) => (
                <details key={i} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',overflow:'hidden'}}>
                  <summary style={{padding:'1.1rem 1.25rem',cursor:'pointer',fontFamily:'Cinzel, serif',fontWeight:700,fontSize:'0.95rem',color:'#e8e0d0',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem'}}>
                    {faq.q}
                    <span style={{color:'#d4a017',fontSize:'1.3rem',flexShrink:0}}>+</span>
                  </summary>
                  <div style={{padding:'0 1.25rem 1.25rem',color:'#a09880',lineHeight:1.8,fontSize:'0.88rem'}}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}} details summary::-webkit-details-marker{display:none;}`}</style>
    </>
  );
}

const HOME_FAQS = [
  { q: 'What is the Hunger Games Simulator?', a: 'It is a free interactive tool that lets you run complete Hunger Games simulations. You pick the tributes and arena, and our engine plays out the entire Games day by day — from the Cornucopia bloodbath to the final victor — using each tribute\u2019s eight core stats combined with realistic randomness.' },
  { q: 'How many tributes and districts are included?', a: `The simulator includes ${tributes.length} fully detailed tributes from across the entire Hunger Games saga, spanning all 13 districts plus the Capitol. This covers the original trilogy, the Ballad of Songbirds & Snakes prequel, and key rebellion-era characters, each with canon-based stats, weapons, and strategies.` },
  { q: 'Is the Hunger Games Simulator free to use?', a: 'Yes, completely free. Every feature — the full game simulator, the 1v1 fight simulator, the odds calculator, the quiz, and all tribute and district profiles — is available with no account, no signup, and no payment required.' },
  { q: 'How are victory odds calculated?', a: 'Victory odds are derived from a weighted formula: weapon skill and survival each count for 20%, while strength, agility, intelligence, and stealth each contribute 15%. Within any selected pool of tributes, all odds are normalized so they add up to exactly 100%.' },
  { q: 'Can I create my own custom Games?', a: 'Absolutely. Choose the Custom Games option in the simulator and build any roster you like — mix victors with reaped tributes, set Katniss against Finnick, or assemble an all-Career bloodbath. The engine adapts to whatever combination you choose.' },
  { q: 'Are the simulation results always the same?', a: 'No. The engine layers controlled randomness on top of each tribute\u2019s stats, so the same roster can produce a different victor, different alliances, and different deaths every single run. Stronger tributes win more often, but upsets happen — just like in the real Games.' },
  { q: 'Is this an official Hunger Games product?', a: 'No. This is an independent fan-made project created for entertainment. The Hunger Games is the intellectual property of Suzanne Collins, Scholastic, and Lionsgate. This site is not affiliated with or endorsed by any of them.' },
];

function GameImage({ game }: { game: typeof hungerGames[0] }) {
  const [err, setErr] = useState(false);
  if (err) return (
    <div style={{height:'140px',background:'linear-gradient(135deg,rgba(212,160,23,0.15),#0d1009)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'0.4rem',position:'relative'}}>
      <span style={{fontSize:'2rem'}}>⚔️</span>
      <span style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448'}}>{game.year}</span>
      <div style={{position:'absolute',top:'0.6rem',right:'0.6rem',background:'rgba(139,26,26,0.15)',border:'1px solid rgba(139,26,26,0.3)',padding:'0.1rem 0.4rem',borderRadius:'2px',fontSize:'0.55rem',color:'#e87070',fontFamily:'Oswald, sans-serif'}}>{game.dangerMeter}/100 DANGER</div>
    </div>
  );
  return (
    <div style={{position:'relative',height:'140px',overflow:'hidden'}}>
      <img src={game.image} alt={game.name} onError={()=>setErr(true)} style={{width:'100%',height:'140px',objectFit:'cover',display:'block'}}/>
      <div style={{position:'absolute',top:'0.6rem',right:'0.6rem',background:'rgba(0,0,0,0.7)',border:'1px solid rgba(139,26,26,0.4)',padding:'0.1rem 0.4rem',borderRadius:'2px',fontSize:'0.55rem',color:'#e87070',fontFamily:'Oswald, sans-serif',fontWeight:700}}>{game.dangerMeter}/100</div>
    </div>
  );
}