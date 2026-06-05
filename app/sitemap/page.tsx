import Link from 'next/link';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sitemap — Hunger Games Simulator',
  description: 'Full sitemap of the Hunger Games Simulator. Browse all simulator tools, tribute profiles, district guides, and blog content.',
  alternates: { canonical: '/sitemap' },
};
const PAGES = [
  {section:'Simulator',links:[{href:'/simulator',label:'Full Game Simulator'},{href:'/fight',label:'1v1 Fight Simulator'},{href:'/odds',label:'Odds Calculator'},{href:'/quiz',label:'Hunger Games Quiz'}]},
  {section:'Browse',links:[{href:'/tributes',label:'All Tributes'},{href:'/districts',label:'Districts of Panem'},{href:'/leaderboard',label:'Victor Leaderboard'},{href:'/blog',label:'Blog & Guides'}]},
  {section:'Info',links:[{href:'/about',label:'About'},{href:'/privacy',label:'Privacy Policy'}]},
];
export default function SitemapPage() {
  return (
    <div style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1rem'}}>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.75rem,4vw,2.5rem)',margin:'0 0 2rem'}}>Sitemap</h1>
      {PAGES.map(section => (
        <div key={section.section} style={{marginBottom:'1.5rem'}}>
          <h2 style={{fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.3em',color:'#d4a017',marginBottom:'0.75rem'}}>{section.section.toUpperCase()}</h2>
          {section.links.map(l => (
            <Link key={l.href} href={l.href} style={{display:'block',padding:'0.5rem 0',borderBottom:'1px solid #1e2818',color:'#a09880',textDecoration:'none',fontSize:'0.9rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>
              {l.label} <span style={{color:'#3a3a30',fontSize:'0.75rem'}}>{l.href}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
