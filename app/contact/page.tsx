import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Hunger Games Simulator',
  description: 'Contact Hunger Games Simulator for general questions, privacy inquiries, copyright notices, and website feedback.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const email = process.env.CONTACT_EMAIL || 'contact@hungergamessimulators.com';
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1rem'}}>
      <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem'}}>
        <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Contact</span>
      </nav>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.75rem,4vw,2.5rem)',margin:'0 0 1.5rem'}}>Contact</h1>
      <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
        <p>For general questions, privacy inquiries, copyright notices, or website feedback, contact us by email:</p>
        <p><a href={`mailto:${email}`} style={{color:'#d4a017'}}>{email}</a></p>
        <p>For privacy information, please see our <Link href="/privacy" style={{color:'#d4a017'}}>Privacy Policy</Link>. For the site's fan-project and use terms, see our <Link href="/terms" style={{color:'#d4a017'}}>Terms & Disclaimer</Link>.</p>
      </div>
    </div>
  );
}
