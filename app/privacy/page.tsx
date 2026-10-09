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
        <p style={{marginBottom:'1.25rem'}}><strong>Last updated: October 9, 2026.</strong></p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>1. Information We Process</h2>
        <p style={{marginBottom:'1.25rem'}}>Hunger Games Simulator does not require an account or login. Simulation results, quiz answers, and many preferences are processed locally in your browser. If you contact us, we may receive the information you choose to provide, such as your email address and message.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>2. Cookies and Local Storage</h2>
        <p style={{marginBottom:'1.25rem'}}>The site may use local browser storage for functional preferences. If advertising or analytics services are enabled, those services may use cookies or similar technologies according to their own policies and applicable consent requirements.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>3. Google AdSense and Advertising</h2>
        <p style={{marginBottom:'1.25rem'}}>We may use Google AdSense to display advertising. Google and its advertising partners may process technical and advertising-related information, such as device and browser information, IP address, and advertising identifiers, and may use cookies or similar technologies where permitted.</p>
        <p style={{marginBottom:'1.25rem'}}>Google&rsquo;s use of advertising cookies enables it and its partners to serve ads based on your visits to this and other sites. You can learn more about how Google uses information from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{color:'#d4a017'}}>policies.google.com/technologies/partner-sites</a>, and you can opt out of personalized advertising through <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{color:'#d4a017'}}>Google&rsquo;s Ads Settings</a>.</p>
        <p style={{marginBottom:'1.25rem'}}>Where applicable law requires consent for advertising technologies or personalized advertising, the site will use the appropriate consent mechanism before processing for purposes that require consent. Advertising choices may also be available through Google's privacy and advertising settings.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>4. Analytics</h2>
        <p style={{marginBottom:'1.25rem'}}>If analytics services are enabled, they may collect information about visits and site usage to help us understand aggregate traffic and improve the site. The specific services used will be reflected in this policy when enabled.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>5. Third-Party Services</h2>
        <p style={{marginBottom:'1.25rem'}}>The site may use third-party services such as Google Fonts and Google advertising technology. Those providers may process technical information necessary to deliver their services under their own privacy policies.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>6. Your Choices</h2>
        <p style={{marginBottom:'1.25rem'}}>You can manage browser cookies and storage through your browser settings. Where a consent interface is presented, you can use it to manage applicable advertising choices. Disabling optional technologies may affect some functionality.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>7. Children's Privacy</h2>
        <p style={{marginBottom:'1.25rem'}}>The website is intended for a general audience and is not designed to knowingly collect personal information from children. Please do not submit personal information through the contact channel if you are not permitted to do so under applicable law.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>8. Data Retention</h2>
        <p style={{marginBottom:'1.25rem'}}>Information voluntarily sent to us may be retained for as long as reasonably necessary to respond, maintain records, resolve disputes, or meet legal obligations.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>9. Policy Changes</h2>
        <p style={{marginBottom:'1.25rem'}}>We may update this Privacy Policy when the site, services, or applicable requirements change. The updated date at the top of this page will be changed when material revisions are made.</p>

        <h2 style={{fontFamily:'Cinzel, serif',color:'#e8e0d0',fontSize:'1.1rem',margin:'1.5rem 0 0.75rem'}}>10. Contact</h2>
        <p style={{marginBottom:'1.25rem'}}>For privacy questions, copyright notices, or other site inquiries, please use our <Link href="/contact" style={{color:'#d4a017'}}>Contact page</Link>.</p>

        <p style={{marginTop:'2rem',paddingTop:'1rem',borderTop:'1px solid #1e2818',fontSize:'0.82rem'}}><strong>Note:</strong> This page is a general website privacy notice and should be reviewed against the actual services enabled on the deployed site and the laws applicable to its visitors.</p>
      </div>
    </div>
  );
}
