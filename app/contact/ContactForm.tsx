'use client';
import { useState } from 'react';

const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@hungergamessimulators.com';

export default function ContactForm() {
  const [topic, setTopic] = useState('General question');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0d1009', border: '1px solid #1e2818', borderRadius: '6px',
    padding: '0.75rem 1rem', color: '#e8e0d0', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${topic}] Message from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{background:'rgba(112,200,112,0.06)',border:'1px solid rgba(112,200,112,0.25)',borderRadius:'10px',padding:'1.5rem',textAlign:'center'}}>
        <div style={{fontSize:'2rem',marginBottom:'0.5rem'}}>📨</div>
        <p style={{color:'#e8e0d0',fontFamily:'Cinzel, serif',fontWeight:700,margin:'0 0 0.5rem'}}>Your email app should now be open</p>
        <p style={{color:'#a09880',fontSize:'0.85rem',margin:0,lineHeight:1.7}}>Your message was prepared and addressed to {EMAIL}. Just hit send in your email app. We usually reply within 2–3 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'0.9rem'}}>
      <div>
        <label style={{display:'block',fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',marginBottom:'0.4rem'}}>TOPIC</label>
        <select value={topic} onChange={e => setTopic(e.target.value)} style={inputStyle}>
          <option>General question</option>
          <option>Stat correction / feedback</option>
          <option>Privacy inquiry</option>
          <option>Copyright / DMCA notice</option>
          <option>Press / partnership</option>
        </select>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.9rem'}}>
        <div>
          <label style={{display:'block',fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',marginBottom:'0.4rem'}}>YOUR NAME</label>
          <input value={name} onChange={e => setName(e.target.value)} required placeholder="Katniss Everdeen" style={inputStyle} />
        </div>
        <div>
          <label style={{display:'block',fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',marginBottom:'0.4rem'}}>YOUR EMAIL</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={{display:'block',fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',marginBottom:'0.4rem'}}>MESSAGE</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5} placeholder="Tell us what's on your mind…" style={{...inputStyle, resize:'vertical'}} />
      </div>
      <button type="submit" style={{background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.85rem',borderRadius:'6px',border:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:700,fontSize:'0.85rem',cursor:'pointer'}}>
        ✉️ SEND MESSAGE
      </button>
      <p style={{fontSize:'0.72rem',color:'#5a5448',margin:0,lineHeight:1.6}}>This opens your email app with your message pre-addressed to {EMAIL}. We never store form submissions on our servers.</p>
    </form>
  );
}
