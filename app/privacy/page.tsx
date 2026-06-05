import Link from 'next/link';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Privacy Policy — Hunger Games Simulator',
  description: 'Privacy policy for the Hunger Games Simulator. We collect no personal data and require no account to use any feature.',
  alternates: { canonical: '/privacy' },
};
export default function PrivacyPage() {
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1rem'}}>
      <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem'}}>
        <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Privacy</span>
      </nav>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.75rem,4vw,2.5rem)',margin:'0 0 1.5rem'}}>Privacy Policy</h1>
      <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
        <p style={{marginBottom:'1.25rem'}}>Last updated: January 2025</p>
        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>Data We Collect</h2>
        <p style={{marginBottom:'1.25rem'}}>Hunger Games Simulator does not collect, store, or sell personal data. All simulation results, quiz scores, and preferences are processed locally in your browser. We do not require account creation or login.</p>
        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>Analytics</h2>
        <p style={{marginBottom:'1.25rem'}}>We may use privacy-focused analytics to understand aggregate traffic patterns (pages visited, session duration). No personally identifiable information is collected through analytics.</p>
        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>Cookies</h2>
        <p style={{marginBottom:'1.25rem'}}>We use no tracking or advertising cookies. Your browser may store preferences locally using localStorage for UI preferences only.</p>
        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>Contact</h2>
        <p style={{marginBottom:'1.25rem'}}>Questions about this policy can be directed through our site's contact page. This is a fan project and we have no advertising partners.</p>
      </div>
    </div>
  );
}
