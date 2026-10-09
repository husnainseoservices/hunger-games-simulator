'use client';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/simulator', label: 'Simulator' },
  { href: '/fight', label: '1v1 Fight' },
  { href: '/tributes', label: 'Tributes' },
  { href: '/districts', label: 'Districts' },
  { href: '/odds', label: 'Odds' },
  { href: '/quiz', label: 'Quiz' },
  { href: '/simulation-lab', label: 'Simulation Lab' },
  { href: '/arena-builder', label: 'Arena Builder' },
  { href: '/custom-tributes', label: 'Create' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <style>{`
        .hg-nav-links { display: flex; }
        .hg-nav-cta { display: flex; }
        .hg-hamburger { display: none; }
        @media (max-width: 900px) {
          .hg-nav-links { display: none !important; }
          .hg-nav-cta { display: none !important; }
          .hg-hamburger { display: flex !important; }
        }
      `}</style>
      <header style={{ position: 'sticky', top: 0, zIndex: 200, backgroundColor: 'rgba(8,10,6,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,160,23,0.2)' }}>
        <nav style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.3rem' }}>⚔️</span>
            <div>
              <span style={{ fontSize: '1.1rem', fontWeight: 900, fontFamily: 'Cinzel, Georgia, serif', background: 'linear-gradient(135deg, #d4a017, #f0c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>HUNGER GAMES</span>
              <span style={{ display: 'block', fontSize: '0.5rem', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.4em', color: '#5a5448' }}>SIMULATOR</span>
            </div>
          </Link>
          <div className="hg-nav-links" style={{ gap: '1.75rem', alignItems: 'center' }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} style={{ color: '#a09880', textDecoration: 'none', fontSize: '0.78rem', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.12em', fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget.style.color = '#d4a017')}
                onMouseLeave={e => (e.currentTarget.style.color = '#a09880')}>
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/simulator" className="hg-nav-cta" style={{ background: 'linear-gradient(135deg, #d4a017, #b8860b)', color: '#0a0c06', padding: '0.5rem 1.25rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.75rem', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.15em', fontWeight: 700, alignItems: 'center' }}>
            ENTER THE ARENA
          </Link>
          <button className="hg-hamburger" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', flexDirection: 'column', gap: '5px', alignItems: 'center', justifyContent: 'center' }}>
            {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: '24px', height: '2px', backgroundColor: open ? '#d4a017' : '#a09880', transition: '0.2s' }} />)}
          </button>
        </nav>
        {open && (
          <div style={{ backgroundColor: '#0d1009', borderTop: '1px solid #1e2818', padding: '1rem 1.5rem 5rem' }}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '0.875rem 0', color: '#a09880', textDecoration: 'none', borderBottom: '1px solid #1e2818', fontFamily: 'Oswald, sans-serif', fontSize: '1rem', letterSpacing: '0.1em' }}>
                {link.label}
              </Link>
            ))}
            <Link href="/simulator" onClick={() => setOpen(false)} style={{ display: 'block', marginTop: '1rem', background: 'linear-gradient(135deg, #d4a017, #b8860b)', color: '#0a0c06', padding: '0.875rem', borderRadius: '4px', textAlign: 'center', textDecoration: 'none', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.15em', fontWeight: 700 }}>
              ENTER THE ARENA
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
