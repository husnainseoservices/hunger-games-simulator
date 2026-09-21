import Link from 'next/link';

const LINKS = {
  Simulate: [
    { href: '/simulator', label: 'Game Simulator' },
    { href: '/fight', label: '1v1 Fight Simulator' },
    { href: '/odds', label: 'Odds Calculator' },
    { href: '/quiz', label: 'Hunger Games Quiz' },
  ],
  Explore: [
    { href: '/tributes', label: 'All Tributes' },
    { href: '/districts', label: 'Districts of Panem' },
    { href: '/leaderboard', label: 'Victor Leaderboard' },
  ],
  Learn: [
    { href: '/blog', label: 'Blog & Guides' },
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Disclaimer' },
    { href: '/contact', label: 'Contact' },
    { href: '/sitemap', label: 'Sitemap' },
  ],
};

export default function Footer() {
  return (
    <>
      <style>{`.footer-link{color:#5a5448;text-decoration:none;display:block;font-size:0.82rem;margin-bottom:0.4rem;font-family:'Oswald',sans-serif;letter-spacing:0.05em;transition:color 0.15s;} .footer-link:hover{color:#d4a017;}`}</style>
      <footer style={{ background: '#060806', borderTop: '1px solid #1e2818', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⚔️</span>
                <span style={{ fontSize: '1rem', fontFamily: 'Cinzel, Georgia, serif', fontWeight: 900, background: 'linear-gradient(135deg,#d4a017,#f0c842)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>HUNGER GAMES</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#5a5448', lineHeight: 1.7, marginBottom: '0.875rem' }}>The most advanced Hunger Games simulator. Run the 74th Games, Quarter Quell, or custom arenas. May the odds be ever in your favor.</p>
              <p style={{ fontSize: '0.62rem', color: '#3a3a30', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em' }}>FAN SITE · NOT AFFILIATED WITH LIONSGATE</p>
            </div>
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 style={{ fontSize: '0.6rem', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.3em', color: '#d4a017', marginBottom: '0.875rem' }}>{section.toUpperCase()}</h4>
                {links.map(l => <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>)}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #1e2818', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.68rem', color: '#3a3a30', margin: 0 }}>© 2025 Hunger Games Simulator. Fan project. The Hunger Games is property of Suzanne Collins & Lionsgate.</p>
            <p style={{ fontSize: '0.68rem', color: '#3a3a30', margin: 0, fontFamily: 'Cinzel, serif', fontStyle: 'italic' }}>May the odds be ever in your favor.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
