import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Hunger Games Simulator',
  description: 'Contact Hunger Games Simulator for general questions, stat corrections, privacy inquiries, copyright notices, and website feedback.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const email = process.env.CONTACT_EMAIL || 'contact@hungergamessimulators.com';
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1rem'}}>
      <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem'}}>
        <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Contact</span>
      </nav>
      <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.35em',margin:'0 0 0.75rem'}}>✉️ GET IN TOUCH</p>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.75rem,4vw,2.5rem)',margin:'0 0 1rem'}}>Contact Us</h1>
      <p style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem',marginBottom:'2rem'}}>Questions about the simulator? Found a stat that looks wrong? Need to reach us about privacy or copyright? Use the form below or email us directly at <a href={`mailto:${email}`} style={{color:'#d4a017'}}>{email}</a>. We usually reply within 2–3 business days.</p>

      <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'12px',padding:'1.5rem',marginBottom:'2rem'}}>
        <ContactForm />
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'1rem',marginBottom:'2rem'}}>
        {[
          { icon: '📝', title: 'Stat Corrections', text: 'Disagree with a tribute\u2019s stats? Send us the book or film evidence and we\u2019ll review it against our methodology.' },
          { icon: '🔒', title: 'Privacy Inquiries', text: 'Questions about data, cookies, or advertising? See our Privacy Policy, or ask us directly.' },
          { icon: '⚖️', title: 'Copyright Notices', text: 'Rights holders: choose "Copyright / DMCA notice" above and include the work, URL, and your contact details.' },
          { icon: '🤝', title: 'Press & Partnerships', text: 'Writing about fan simulators or Panem data? We\u2019re happy to share methodology and lab statistics.' },
        ].map(c => (
          <div key={c.title} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.1rem'}}>
            <div style={{fontSize:'1.4rem',marginBottom:'0.5rem'}}>{c.icon}</div>
            <h2 style={{fontSize:'0.9rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:'0 0 0.4rem'}}>{c.title}</h2>
            <p style={{fontSize:'0.78rem',color:'#a09880',lineHeight:1.7,margin:0}}>{c.text}</p>
          </div>
        ))}
      </div>

      <div style={{color:'#a09880',lineHeight:1.9,fontSize:'0.95rem'}}>
        <p>For privacy information, please see our <Link href="/privacy" style={{color:'#d4a017'}}>Privacy Policy</Link>. For the site's fan-project and use terms, see our <Link href="/terms" style={{color:'#d4a017'}}>Terms & Disclaimer</Link>. To learn who runs this site, visit the <Link href="/about" style={{color:'#d4a017'}}>About page</Link>.</p>
      </div>
    </div>
  );
}
