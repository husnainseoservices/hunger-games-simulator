import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment, type CSSProperties } from 'react';
import PageIntro from '@/components/layout/PageIntro';

export const metadata: Metadata = {
  title: 'Best Hunger Games Simulators Compared (2026)',
  description: 'Honest comparison of the best Hunger Games simulators: BrantSteele, SimuBlast, hungergamessimulator.net and more. Features, pros, and verdict.',
  alternates: { canonical: '/best-hunger-games-simulators' },
};

const SITES = ['BrantSteele', 'hungergamessimulator.net', 'SimuBlast', 'horrorgames.io', 'hungergamessimulators.com (this site)'];

const ROWS: { feature: string; values: (boolean | 'partial' | string)[] }[] = [
  { feature: 'Custom tributes (your own characters)', values: [true, true, true, true, true] },
  { feature: 'Shareable results / season codes', values: [true, true, false, false, true] },
  { feature: 'Scored tribute database', values: [false, false, false, false, true] },
  { feature: 'Strategy guides & blog', values: [false, 'partial', false, false, true] },
  { feature: 'Personality quiz', values: [false, false, false, false, true] },
  { feature: 'Trivia quiz', values: [false, false, false, false, true] },
  { feature: 'Victory odds calculator', values: [false, false, false, false, true] },
  { feature: 'Bulk simulation lab (1,000s of runs)', values: [false, 'partial', false, false, true] },
  { feature: 'Custom arena builder', values: ['partial', 'partial', false, 'partial', true] },
  { feature: 'Adjustable death rate', values: [true, false, true, 'partial', false] },
  { feature: 'Free to use', values: [true, true, true, true, true] },
];

function cell(v: boolean | 'partial' | string, highlight: boolean) {
  const base: CSSProperties = {
    padding: '0.7rem 0.6rem', fontSize: '0.78rem', textAlign: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    background: highlight ? 'rgba(212,160,23,0.05)' : 'transparent',
  };
  if (v === true) return <td style={{ ...base, color: '#70c870', fontSize: '1rem' }}>✓</td>;
  if (v === false) return <td style={{ ...base, color: '#3a3a30' }}>—</td>;
  if (v === 'partial') return <td style={{ ...base, color: '#e8a030', fontSize: '0.7rem' }}>Partial</td>;
  return <td style={{ ...base, color: '#a09880', fontSize: '0.68rem', lineHeight: 1.4 }}>{v}</td>;
}

const REVIEWS = [
  {
    name: 'BrantSteele',
    url: 'https://brantsteele.com/hungergames/',
    text: 'The original Hunger Games simulator, running since 2014. Its killer feature is total customization: your own tributes with names, images and custom death images, adjustable roster sizes (24/36/48), death-rate control, custom events, and shareable season codes that turned simulator runs into a YouTube and Reddit culture. What it does not have is any content around the tool — no guides, no tribute database, no analysis. It is a pure sandbox, and a legendary one.',
    best: 'Best for: running custom casts (friends, fandoms, classrooms) and sharing seasons.',
  },
  {
    name: 'hungergamessimulator.net',
    url: 'https://hungergamessimulator.net/',
    text: 'A newer, modern challenger built to compete on usability and SEO. It offers custom tributes with avatar uploads, random seeds for exact replays, seed-encoded share links, and a challenge mode for friend-vs-friend competitions on the same roster. It also publishes genuinely useful guide content and keeps advertising outside the gameplay flow. A strong all-rounder for the classic custom-cast experience.',
    best: 'Best for: a modern, mobile-friendly BrantSteele-style experience with replayable seeds.',
  },
  {
    name: 'SimuBlast',
    url: 'https://simublast.com/hunger-games-simulator/',
    text: 'A multi-simulator hub (Hunger Games, Bachelor, Lottery) whose Hunger Games tool stands out for preset pop-culture casts — Marvel, Star Wars, Harry Potter, the 74th and 75th Games characters — plus fun interactive touches like survival boosts for your favorite tribute and manual kill/revive controls. Lighter on content and customization depth than the two above, but great for a quick themed run.',
    best: 'Best for: quick runs with famous pop-culture casts.',
  },
  {
    name: 'horrorgames.io',
    url: 'https://horrorgames.io/hunger-games-simulator',
    text: 'A game-portal take on the simulator: 24-player casts, custom names and image URLs, custom scenario uploads, and drama/calmness/randomness sliders that tune the tone of each run. Simple, fast, and playable in the browser with no fuss — but with no community features, guides, or deeper analysis tools.',
    best: 'Best for: a fast, no-frills browser run with tone sliders.',
  },
  {
    name: 'hungergamessimulators.com (this site)',
    url: 'https://hungergamessimulators.com/',
    text: 'This site takes a different approach from every simulator above: instead of a blank sandbox, it is a complete scored database of 37 canon tributes — each rated across eight stats — powering a full-season simulator, 1v1 fight simulator, live victory odds calculator, a 10,000-run simulation lab with published statistics, a custom arena builder, tribute and district guides, two quizzes, and 20 strategy articles with a fully documented methodology. The tradeoff: you cannot (yet) add your own custom characters.',
    best: 'Best for: canon-accurate simulations, data-driven analysis, learning the saga, and stat-based tools.',
  },
];

export default function Page() {
  return (
    <>
      <PageIntro
        kicker="⚖️ HONEST COMPARISON"
        title="Best Hunger Games Simulators Compared (2026)"
        paragraphs={[
          'There are several good Hunger Games simulators online, and they are good at different things. This page compares the five most notable options feature-by-feature — including our own site, judged by the same standard — so you can pick the right tool for the run you want.',
          'The short version: if you want to simulate your friends, your classroom, or your favorite fandom cast, BrantSteele and hungergamessimulator.net are the custom-cast specialists. If you want canon-accurate simulations of the actual Hunger Games tributes — with real statistics, odds, and strategy analysis — that is what this site was built for.',
          'We have tried to be fair to every tool listed here, including our own. Where a competitor does something better, we say so — and our roadmap includes closing the gaps that matter most.',
        ]}
        faqs={[
          { q: 'What is the best Hunger Games simulator?', a: 'It depends on what you want. For custom casts with your own characters, BrantSteele (the original, with season codes and huge customization) and hungergamessimulator.net (modern, seed replays, challenge mode) lead. For canon tributes with stats, odds, and analysis, hungergamessimulators.com is the most complete option.' },
          { q: 'Is BrantSteele still the best Hunger Games simulator?', a: 'For the classic custom-cast sandbox experience, yes — its roster sizes, death-rate control, custom events and shareable season codes remain unmatched, backed by a decade of community culture. Newer sites compete on modern UX, mobile design, and extra content rather than replacing it.' },
          { q: 'Are Hunger Games simulators free?', a: 'Yes — every simulator compared on this page is free to use with no account required, including this site.' },
          { q: 'Which simulator is best on mobile?', a: 'hungergamessimulator.net and horrorgames.io were built with modern responsive design. BrantSteele\u2019s classic version shows its 2014-era roots on small screens, though it remains fully functional.' },
        ]}
        cta={[
          { href: '/simulator', label: '⚔️ TRY OUR SIMULATOR' },
          { href: '/personality-quiz', label: '🧬 PERSONALITY QUIZ' },
        ]}
      />

      {/* Comparison table */}
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 1rem 1rem'}}>
        <h2 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.3rem,3vw,1.8rem)',margin:'0 0 1.25rem',color:'#e8e0d0'}}>Feature Comparison</h2>
        <div style={{overflowX:'auto',background:'#0d1009',border:'1px solid #1e2818',borderRadius:'12px'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'760px'}}>
            <thead>
              <tr>
                <th style={{textAlign:'left',padding:'0.8rem',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',borderBottom:'1px solid #1e2818'}}>FEATURE</th>
                {SITES.map((s, i) => (
                  <th key={s} style={{padding:'0.8rem 0.6rem',fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em',color:i===4?'#d4a017':'#a09880',borderBottom:'1px solid #1e2818',background:i===4?'rgba(212,160,23,0.05)':'transparent'}}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(r => (
                <tr key={r.feature}>
                  <td style={{padding:'0.7rem 0.8rem',fontSize:'0.78rem',color:'#a09880',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>{r.feature}</td>
                  {r.values.map((v, i) => <Fragment key={i}>{cell(v, i===4)}</Fragment>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{fontSize:'0.68rem',color:'#5a5448',marginTop:'0.75rem',lineHeight:1.6}}>Feature status checked October 2026 from each site\u2019s public pages. Tools evolve — if something here is out of date, tell us via the contact page.</p>
      </div>

      {/* Per-site reviews */}
      <div style={{maxWidth:'900px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        <h2 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.3rem,3vw,1.8rem)',margin:'0 0 1.25rem',color:'#e8e0d0'}}>In Detail</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'2.5rem'}}>
          {REVIEWS.map(r => (
            <div key={r.name} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'12px',padding:'1.5rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'0.5rem',marginBottom:'0.75rem'}}>
                <h3 style={{fontSize:'1.05rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:0}}>{r.name}</h3>
                <a href={r.url} target="_blank" rel="noopener noreferrer" style={{fontSize:'0.72rem',color:'#d4a017',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>VISIT SITE →</a>
              </div>
              <p style={{color:'#a09880',lineHeight:1.85,fontSize:'0.9rem',margin:'0 0 0.75rem'}}>{r.text}</p>
              <p style={{color:'#d4a017',fontSize:'0.82rem',margin:0,fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>{r.best}</p>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div style={{background:'linear-gradient(135deg,rgba(212,160,23,0.08),rgba(139,26,26,0.04))',border:'1px solid rgba(212,160,23,0.25)',borderRadius:'14px',padding:'2rem',marginBottom:'2rem'}}>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.35em',margin:'0 0 0.75rem'}}>🏆 OUR VERDICT</p>
          <h2 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.3rem,3vw,1.8rem)',margin:'0 0 1rem',color:'#e8e0d0'}}>Which Should You Pick?</h2>
          <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.92rem'}}>
            <p style={{marginBottom:'1rem'}}><strong style={{color:'#e8e0d0'}}>Simulating your own cast?</strong> Start with BrantSteele for maximum control, or hungergamessimulator.net for the smoothest modern experience with replays and challenges.</p>
            <p style={{marginBottom:'1rem'}}><strong style={{color:'#e8e0d0'}}>Simulating the real tributes?</strong> That is this site\u2019s home turf. No other simulator scores all 37 canon tributes across eight stats, publishes its full methodology, runs 10,000-simulation statistical labs, or pairs the Games with odds calculators, fight simulators, and 20 strategy guides. If you want to know who would actually win — backed by numbers, not vibes — start with our <Link href="/simulator" style={{color:'#d4a017'}}>simulator</Link>.</p>
            <p style={{margin:0}}><strong style={{color:'#e8e0d0'}}>Our honest gaps:</strong> BrantSteele still leads on fine-grained controls like adjustable death rates and roster sizes up to 48. But on the two features that matter most — custom user-created tributes and shareable season links — we now match them: create your own tributes <Link href="/custom-tributes" style={{color:'#d4a017'}}>here</Link> and share any Games with a link that replays the exact same run.</p>
          </div>
        </div>
      </div>
    </>
  );
}
