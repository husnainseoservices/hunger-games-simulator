'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Tribute } from '@/types';
import { getCustomTributes, saveCustomTribute, deleteCustomTribute, makeCustomTribute, MAX_CUSTOM_TRIBUTES } from '@/lib/custom-tributes';
import TributeAvatar from '@/components/TributeAvatar';

const STAT_DEFS: [keyof Tribute['stats'], string, string][] = [
  ['strength', 'Strength', '💪'],
  ['agility', 'Agility', '⚡'],
  ['survival', 'Survival', '🌿'],
  ['intelligence', 'Intelligence', '🧠'],
  ['charisma', 'Charisma', '✨'],
  ['stealth', 'Stealth', '👁️'],
  ['weaponSkill', 'Weapon Skill', '⚔️'],
  ['allianceLoyalty', 'Alliance Loyalty', '🤝'],
];

const DISTRICTS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
const DISTRICT_LABEL: Record<number,string> = { 0:'The Capitol', 13:'District 13' };

const inputStyle: React.CSSProperties = {
  width:'100%',background:'#080a06',border:'1px solid #1e2818',borderRadius:'6px',
  padding:'0.7rem 0.9rem',color:'#e8e0d0',fontSize:'0.9rem',boxSizing:'border-box',fontFamily:'inherit',
};
const labelStyle: React.CSSProperties = {
  display:'block',fontSize:'0.65rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',color:'#5a5448',marginBottom:'0.4rem',
};

const DEFAULT_STATS: Tribute['stats'] = {
  strength:50, agility:50, survival:50, intelligence:50,
  charisma:50, stealth:50, weaponSkill:50, allianceLoyalty:50,
};

function downscaleImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 256;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CustomTributesContent() {
  const [list, setList] = useState<Tribute[]>(() => getCustomTributes());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [districtNumber, setDistrictNumber] = useState(12);
  const [background, setBackground] = useState<Tribute['background']>('Reaped');
  const [gender, setGender] = useState<'male'|'female'>('female');
  const [age, setAge] = useState(18);
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [stats, setStats] = useState<Tribute['stats']>({...DEFAULT_STATS});
  const [weapon, setWeapon] = useState('');
  const [strategy, setStrategy] = useState('');
  const [catchphrase, setCatchphrase] = useState('');
  const [trainingScore, setTrainingScore] = useState(7);
  const [saved, setSaved] = useState(false);

  const resetForm = () => {
    setEditingId(null); setName(''); setDistrictNumber(12); setBackground('Reaped');
    setGender('female'); setAge(18); setImage(''); setBio('');
    setStats({...DEFAULT_STATS}); setWeapon(''); setStrategy('');
    setCatchphrase(''); setTrainingScore(7);
  };

  const startEdit = (t: Tribute) => {
    setEditingId(t.id); setName(t.name); setDistrictNumber(t.districtNumber);
    setBackground(t.background); setGender(t.gender); setAge(t.age);
    setImage(t.image); setBio(t.bio); setStats({...t.stats});
    setWeapon(t.weapon); setStrategy(t.strategy); setCatchphrase(t.catchphrase);
    setTrainingScore(t.trainingScore);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImage = async (f: File | undefined) => {
    if (!f) return;
    try { setImage(await downscaleImage(f)); }
    catch { alert('Could not read that image. Try a JPG or PNG file.'); }
  };

  const handleSave = () => {
    if (!name.trim()) { alert('Give your tribute a name.'); return; }
    if (!bio.trim()) { alert('Write a short bio for your tribute.'); return; }
    const t = makeCustomTribute({
      name, districtNumber, background, gender, age, image, bio,
      stats, weapon: weapon || 'Wits', strategy: strategy || 'Survive',
      trainingScore, catchphrase: catchphrase || 'May the odds be ever in my favor.',
    }, editingId || undefined);
    setList(saveCustomTribute(t));
    resetForm();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const handleDelete = (id: string, n: string) => {
    if (confirm(`Remove ${n} from your custom tributes?`)) setList(deleteCustomTribute(id));
  };

  const avg = Math.round(Object.values(stats).reduce((a,b)=>a+b,0)/8);

  return (
    <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 1rem 4rem'}}>
      {/* Creator form */}
      <div style={{background:'#0d1009',border:'1px solid rgba(212,160,23,0.25)',borderRadius:'12px',padding:'1.5rem',marginBottom:'2rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.25rem',flexWrap:'wrap',gap:'0.5rem'}}>
          <h2 style={{fontFamily:'Cinzel, serif',fontWeight:900,color:'#e8e0d0',margin:0,fontSize:'1.3rem'}}>
            {editingId ? '✏️ Edit Tribute' : '✨ Create a Tribute'}
          </h2>
          <span style={{fontSize:'0.7rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>
            {list.length}/{MAX_CUSTOM_TRIBUTES} CUSTOM TRIBUTES
          </span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'220px 1fr',gap:'1.5rem'}} className="creator-grid">
          {/* Portrait */}
          <div>
            <label style={labelStyle}>PORTRAIT</label>
            <div style={{width:'100%',aspectRatio:'1',borderRadius:'10px',border:'1px dashed #1e2818',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',background:'#080a06',marginBottom:'0.6rem'}}>
              {image
                ? <img src={image} alt="preview" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                : <span style={{fontSize:'3rem'}}>👤</span>}
            </div>
            <label style={{display:'block',textAlign:'center',background:'#111609',border:'1px solid #1e2818',borderRadius:'6px',padding:'0.6rem',cursor:'pointer',fontSize:'0.75rem',color:'#d4a017',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>
              📷 UPLOAD IMAGE
              <input type="file" accept="image/*" style={{display:'none'}} onChange={e => handleImage(e.target.files?.[0])} />
            </label>
            {image && <button onClick={()=>setImage('')} style={{width:'100%',marginTop:'0.4rem',background:'transparent',border:'none',color:'#5a5448',cursor:'pointer',fontSize:'0.7rem'}}>remove image</button>}
          </div>

          {/* Fields */}
          <div style={{display:'flex',flexDirection:'column',gap:'0.9rem'}}>
            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:'0.9rem'}} className="creator-grid-3">
              <div><label style={labelStyle}>NAME *</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Alex Rivers" maxLength={40} style={inputStyle}/></div>
              <div><label style={labelStyle}>DISTRICT</label>
                <select value={districtNumber} onChange={e=>setDistrictNumber(Number(e.target.value))} style={inputStyle}>
                  {DISTRICTS.map(d=><option key={d} value={d}>{DISTRICT_LABEL[d]||`District ${d}`}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>BACKGROUND</label>
                <select value={background} onChange={e=>setBackground(e.target.value as Tribute['background'])} style={inputStyle}>
                  <option>Reaped</option><option>Volunteer</option><option>Career</option><option>Victor</option>
                </select>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0.9rem'}} className="creator-grid-3">
              <div><label style={labelStyle}>GENDER</label>
                <select value={gender} onChange={e=>setGender(e.target.value as 'male'|'female')} style={inputStyle}>
                  <option value="female">Female</option><option value="male">Male</option>
                </select>
              </div>
              <div><label style={labelStyle}>AGE</label><input type="number" min={10} max={90} value={age} onChange={e=>setAge(Number(e.target.value))} style={inputStyle}/></div>
              <div><label style={labelStyle}>TRAINING SCORE (0–12)</label><input type="number" min={0} max={12} value={trainingScore} onChange={e=>setTrainingScore(Number(e.target.value))} style={inputStyle}/></div>
            </div>
            <div><label style={labelStyle}>BIO *</label><textarea value={bio} onChange={e=>setBio(e.target.value)} rows={2} maxLength={400} placeholder="Who are they? What makes them dangerous?" style={{...inputStyle,resize:'vertical'}}/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'0.9rem'}} className="creator-grid-3">
              <div><label style={labelStyle}>WEAPON</label><input value={weapon} onChange={e=>setWeapon(e.target.value)} placeholder="e.g. Bow, trident" maxLength={40} style={inputStyle}/></div>
              <div><label style={labelStyle}>STRATEGY</label><input value={strategy} onChange={e=>setStrategy(e.target.value)} placeholder="e.g. Hide, then strike" maxLength={60} style={inputStyle}/></div>
              <div><label style={labelStyle}>CATCHPHRASE</label><input value={catchphrase} onChange={e=>setCatchphrase(e.target.value)} placeholder="Famous last words…" maxLength={80} style={inputStyle}/></div>
            </div>

            {/* Stat sliders */}
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.6rem'}}>
                <label style={{...labelStyle,margin:0}}>STATS</label>
                <span style={{fontSize:'0.75rem',color:'#d4a017',fontFamily:'Cinzel, serif',fontWeight:700}}>Average: {avg}</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem 1.25rem'}} className="creator-grid-2">
                {STAT_DEFS.map(([key,label,icon])=>(
                  <div key={key}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.25rem'}}>
                      <span style={{fontSize:'0.75rem',color:'#a09880'}}>{icon} {label}</span>
                      <span style={{fontSize:'0.75rem',fontWeight:700,color:stats[key]>=80?'#d4a017':'#5a5448'}}>{stats[key]}</span>
                    </div>
                    <input type="range" min={1} max={100} value={stats[key]} onChange={e=>setStats({...stats,[key]:Number(e.target.value)})}
                      style={{width:'100%',accentColor:'#d4a017',cursor:'pointer'}}/>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',marginTop:'0.5rem'}}>
              <button onClick={handleSave} disabled={list.length>=MAX_CUSTOM_TRIBUTES && !editingId}
                style={{flex:1,minWidth:'200px',background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',border:'none',borderRadius:'6px',padding:'0.9rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:700,fontSize:'0.85rem',cursor:'pointer'}}>
                {editingId ? '💾 SAVE CHANGES' : '⚔️ CREATE TRIBUTE'}
              </button>
              {editingId && <button onClick={resetForm} style={{background:'transparent',border:'1px solid #1e2818',color:'#a09880',borderRadius:'6px',padding:'0.9rem 1.5rem',cursor:'pointer',fontFamily:'Oswald, sans-serif',fontSize:'0.8rem'}}>CANCEL</button>}
            </div>
            {saved && <p style={{color:'#70c870',fontSize:'0.8rem',margin:0}}>✓ Tribute saved! Use them in Custom Games or 1v1 Fights.</p>}
          </div>
        </div>
      </div>

      {/* List */}
      <h2 style={{fontFamily:'Cinzel, serif',fontWeight:900,color:'#e8e0d0',fontSize:'1.3rem',margin:'0 0 1rem'}}>Your Tributes ({list.length})</h2>
      {list.length === 0 ? (
        <div style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'2.5rem',textAlign:'center'}}>
          <div style={{fontSize:'2.5rem',marginBottom:'0.75rem'}}>🏟️</div>
          <p style={{color:'#a09880',margin:'0 0 0.25rem'}}>No custom tributes yet.</p>
          <p style={{color:'#5a5448',fontSize:'0.8rem',margin:0}}>Create your first tribute above — then pit them against Katniss in the simulator.</p>
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'1rem'}}>
          {list.map(t=>(
            <div key={t.id} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'10px',padding:'1.1rem'}}>
              <div style={{display:'flex',gap:'0.75rem',alignItems:'center',marginBottom:'0.75rem'}}>
                <TributeAvatar src={t.image} name={t.name} size={44}/>
                <div style={{minWidth:0}}>
                  <p style={{fontFamily:'Cinzel, serif',fontWeight:700,color:'#e8e0d0',margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.name}</p>
                  <p style={{fontSize:'0.65rem',color:'#5a5448',margin:0}}>{t.district} · {t.background}</p>
                </div>
              </div>
              <div style={{display:'flex',gap:'0.5rem'}}>
                <Link href="/simulator" style={{flex:1,textAlign:'center',background:'rgba(212,160,23,0.1)',border:'1px solid rgba(212,160,23,0.3)',color:'#d4a017',borderRadius:'4px',padding:'0.5rem',textDecoration:'none',fontSize:'0.72rem',fontFamily:'Oswald, sans-serif'}}>⚔️ SIMULATE</Link>
                <button onClick={()=>startEdit(t)} style={{flex:1,background:'transparent',border:'1px solid #1e2818',color:'#a09880',borderRadius:'4px',padding:'0.5rem',cursor:'pointer',fontSize:'0.72rem',fontFamily:'Oswald, sans-serif'}}>EDIT</button>
                <button onClick={()=>handleDelete(t.id,t.name)} style={{background:'transparent',border:'1px solid rgba(139,26,26,0.4)',color:'#e87070',borderRadius:'4px',padding:'0.5rem 0.75rem',cursor:'pointer',fontSize:'0.72rem'}}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:800px){
          .creator-grid{grid-template-columns:1fr !important;}
          .creator-grid-3{grid-template-columns:1fr !important;}
          .creator-grid-2{grid-template-columns:1fr !important;}
        }
      `}</style>
    </div>
  );
}
