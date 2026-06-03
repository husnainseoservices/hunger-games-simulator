import Link from 'next/link';
export default function NotFound() {
  return (
    <div style={{maxWidth:'600px',margin:'4rem auto',padding:'2rem',textAlign:'center'}}>
      <div style={{fontSize:'4rem',marginBottom:'1rem'}}>💀</div>
      <h1 style={{fontFamily:'Cinzel, Georgia, serif',fontWeight:900,fontSize:'clamp(1.5rem,4vw,2.5rem)',color:'#d4a017',margin:'0 0 0.75rem'}}>Eliminated</h1>
      <p style={{color:'#a09880',fontSize:'1rem',lineHeight:1.7,margin:'0 0 2rem'}}>This tribute's page doesn't exist. The cannon has sounded — you've wandered off the map.</p>
      <div style={{display:'flex',gap:'0.875rem',justifyContent:'center',flexWrap:'wrap'}}>
        <Link href="/" style={{background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.75rem 1.5rem',borderRadius:'5px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:700,fontSize:'0.82rem'}}>← RETURN TO PANEM</Link>
        <Link href="/simulator" style={{background:'transparent',border:'1px solid rgba(212,160,23,0.3)',color:'#d4a017',padding:'0.75rem 1.5rem',borderRadius:'5px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontSize:'0.82rem'}}>ENTER ARENA</Link>
      </div>
    </div>
  );
}
