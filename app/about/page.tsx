import Link from 'next/link';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About — Hunger Games Simulator',
  description: 'Learn about the Hunger Games Simulator: who built it, how the simulation engine works, our stat methodology, and our editorial process.',
  alternates: { canonical: '/about' },
};

const TEAM = [
  {
    name: 'Arena Analyst',
    role: 'Simulation Engineer & Lead Writer',
    bio: 'Built the simulation engine and the eight-stat scoring system. Runs the 10,000 Simulation Lab and writes the tribute guides, matchup analysis, and strategy articles. A trilogy reader since 2009.',
  },
  {
    name: 'Capitol Correspondent',
    role: 'District & Lore Editor',
    bio: 'Maintains the district database — wealth levels, Capitol loyalty scores, victor histories — and writes the district profiles and game recaps. Obsessed with Panem economics and why District 2 keeps winning.',
  },
  {
    name: 'Capitol Odds Bureau',
    role: 'Data & Odds Specialist',
    bio: 'Owns the victory odds formula and the dark horse indicator. Turns raw lab statistics into the probability models behind the odds calculator.',
  },
];

export default function AboutPage() {
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1rem'}}>
      <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem'}}>
        <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>About</span>
      </nav>
      <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.35em',margin:'0 0 0.75rem'}}>🏛️ ABOUT THIS SITE</p>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.75rem,4vw,2.5rem)',margin:'0 0 1.5rem'}}>About Hunger Games Simulator</h1>

      <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
        <p style={{marginBottom:'1.25rem'}}>Hunger Games Simulator is an independent, fan-made interactive project built by a small team of Hunger Games fans. We set out to answer a simple question: <strong style={{color:'#e8e0d0'}}>what would actually happen if you put all 37 tributes from the saga into one arena and let the numbers decide?</strong></p>
        <p style={{marginBottom:'1.25rem'}}>The result is the most detailed Hunger Games simulation on the internet: a full-season simulator that plays out complete Games day by day, a 1v1 fight simulator for head-to-head matchups, a live victory odds calculator, a 30-question quiz, a 10,000-run Simulation Lab, a custom arena builder, and a fully scored database of 37 tributes across 13 districts — all free, with no account or signup.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'2rem 0 0.75rem'}}>Our Methodology</h2>
        <p style={{marginBottom:'1.25rem'}}>Every tribute is scored across <strong style={{color:'#e8e0d0'}}>eight core stats</strong> — strength, agility, survival, intelligence, charisma, stealth, weapon skill, and alliance loyalty — each rated 0–100 based on their canonical feats in the books and films: training scores, arena performance, and established abilities. Stat assignments are documented in our tribute guides and power rankings on the <Link href="/blog" style={{color:'#d4a017'}}>blog</Link>.</p>
        <p style={{marginBottom:'1.25rem'}}>The simulation engine resolves each event from these stats plus controlled randomness: the Cornucopia bloodbath, alliance formations, betrayals, sponsor gifts, arena hazards, and the final showdown. Victory odds use a weighted formula — weapon skill and survival at 20% each; strength, agility, intelligence, and stealth at 15% each — normalized so every pool sums to 100%.</p>
        <p style={{marginBottom:'1.25rem'}}>Every statistical claim we publish — from &ldquo;Districts 1, 2 and 4 win about 29% of simulations&rdquo; to &ldquo;the bloodbath averages about 5 deaths&rdquo; — is measured in the <Link href="/simulation-lab" style={{color:'#d4a017'}}>Simulation Lab</Link> across thousands of independent runs, not guessed. When we update stats or the engine, we re-run the lab and update the published numbers.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'2rem 0 0.75rem'}}>Editorial Process</h2>
        <p style={{marginBottom:'1.25rem'}}>Our articles are written by the editors below, based on lab data and close reading of the source material. Tribute guides cite the specific feats behind each stat score; analysis articles publish the simulation counts behind every claim. We correct errors when readers point them out — contact us via the <Link href="/contact" style={{color:'#d4a017'}}>Contact page</Link> — and update affected stats, odds, and articles.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'2rem 0 0.75rem'}}>The Team</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'1rem',marginBottom:'1.5rem'}}>
          {TEAM.map(m => (
            <div key={m.name} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.25rem'}}>
              <p style={{fontSize:'1rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.2rem'}}>✍️ {m.name}</p>
              <p style={{fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#d4a017',margin:'0 0 0.6rem'}}>{m.role.toUpperCase()}</p>
              <p style={{fontSize:'0.85rem',color:'#a09880',lineHeight:1.7,margin:0}}>{m.bio}</p>
            </div>
          ))}
        </div>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'2rem 0 0.75rem'}}>Update History</h2>
        <p style={{marginBottom:'1.25rem'}}>The site launched in 2025 with the core simulator, 24 tributes, and the odds calculator. Since then we have expanded to 37 tributes, added the 1v1 fight simulator, the 10,000 Simulation Lab, the custom arena builder, 20 strategy and tribute guides, district profiles, and the quiz. Stat scores and odds are reviewed against lab data on an ongoing basis — the &ldquo;last updated&rdquo; dates on our <Link href="/privacy" style={{color:'#d4a017'}}>Privacy Policy</Link> and <Link href="/terms" style={{color:'#d4a017'}}>Terms</Link> reflect the most recent site-wide review.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'2rem 0 0.75rem'}}>What You Can Do Here</h2>
        <p style={{marginBottom:'1.25rem'}}>Run complete Hunger Games simulations including the 74th Games, the 75th Quarter Quell, the 50th Second Quell, or custom arenas with any combination of tributes. Use the 1v1 fight simulator to settle debates like Katniss vs. Finnick. Check live victory odds in the odds calculator. Test your Panem knowledge with 30 questions across 5 difficulty modes.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'2rem 0 0.75rem'}}>Disclaimer</h2>
        <p style={{marginBottom:'1.25rem'}}>This is an unofficial fan project. The Hunger Games is the intellectual property of Suzanne Collins, Scholastic Press, and Lionsgate Entertainment. This site is not affiliated with, endorsed by, or sponsored by any of these entities. All character names, likenesses, and story elements are used for entertainment and commentary purposes only. Simulation results are fictional outputs of our own algorithms, not official predictions.</p>

        <p style={{marginBottom:'1.25rem'}}>Questions, corrections, or copyright concerns? Reach us through the <Link href="/contact" style={{color:'#d4a017'}}>Contact page</Link>.</p>
      </div>
    </div>
  );
}
