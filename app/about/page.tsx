import Link from 'next/link';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About — Hunger Games Simulator',
  description: 'Learn about the Hunger Games Simulator, the most advanced fan-made simulation tool for Suzanne Collins’ world of Panem.',
  alternates: { canonical: '/about' },
};
export default function AboutPage() {
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1rem'}}>
      <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem'}}>
        <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>About</span>
      </nav>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.75rem,4vw,2.5rem)',margin:'0 0 1.5rem'}}>About Hunger Games Simulator</h1>
      <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
        <p style={{marginBottom:'1.25rem'}}>Hunger Games Simulator is a fan-made interactive simulator built for fans of Suzanne Collins' Hunger Games trilogy. We've built the most comprehensive tribute stats database and simulation engine available — tracking 8 unique stats per tribute and running thousands of possible game outcomes.</p>
        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'1.5rem 0 0.75rem'}}>What You Can Do</h2>
        <p style={{marginBottom:'1.25rem'}}>Run complete Hunger Games simulations including the 74th Games, the 75th Quarter Quell, the 50th Second Quell, or custom arenas with any combination of tributes. Use the 1v1 fight simulator to settle debates like Katniss vs. Finnick. Check live victory odds in the odds calculator. Test your Panem knowledge with 30 questions across 5 difficulty modes.</p>
        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.2rem',margin:'1.5rem 0 0.75rem'}}>Disclaimer</h2>
        <p style={{marginBottom:'1.25rem'}}>This is an unofficial fan project. The Hunger Games is the intellectual property of Suzanne Collins, Scholastic Press, and Lionsgate Entertainment. This site is not affiliated with, endorsed by, or sponsored by any of these entities. All character names, likenesses, and story elements are used for educational and entertainment fan purposes only.</p>
      </div>
    </div>
  );
}
