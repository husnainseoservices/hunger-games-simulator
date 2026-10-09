'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Home', icon: '🏛️' },
  { href: '/simulator', label: 'Arena', icon: '⚔️' },
  { href: '/fight', label: 'Fight', icon: '👊' },
  { href: '/odds', label: 'Odds', icon: '📊' },
  { href: '/quiz', label: 'Quiz', icon: '🧠' },
];

export default function MobileNav() {
  const path = usePathname();
  return (
    <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 300, background: 'rgba(6,8,6,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(212,160,23,0.2)', display: 'none', gridTemplateColumns: 'repeat(5,1fr)', padding: '0.5rem 0' }} className="mobile-nav">
      <style>{`@media(max-width:900px){.mobile-nav{display:grid !important;}}`}</style>
      {TABS.map(t => {
        const active = path === t.href || (t.href !== '/' && path.startsWith(t.href));
        return (
          <Link key={t.href} href={t.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', padding: '0.4rem 0.25rem', textDecoration: 'none', color: active ? '#d4a017' : '#5a5448', transition: 'color 0.15s' }}>
            <span style={{ fontSize: '1.1rem' }}>{t.icon}</span>
            <span style={{ fontSize: '0.55rem', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', fontWeight: active ? 600 : 400 }}>{t.label.toUpperCase()}</span>
          </Link>
        );
      })}
    </nav>
  );
}
