'use client';
import { useState } from 'react';
import Link from 'next/link';
import { personalityQuestions } from '@/data/personality-quiz';
import { getTributeById } from '@/data/tributes';
import TributeAvatar from '@/components/TributeAvatar';

const STAT_LABELS: Record<string, string> = {
  strength: 'Strength', agility: 'Agility', survival: 'Survival', intelligence: 'Intelligence',
  charisma: 'Charisma', stealth: 'Stealth', weaponSkill: 'Weapon Skill', allianceLoyalty: 'Alliance Loyalty',
};

export default function PersonalityQuizContent() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const total = personalityQuestions.length;
  const q = personalityQuestions[current];

  const answer = (optionIdx: number) => {
    const weights = personalityQuestions[current].options[optionIdx].weights;
    const next = { ...scores };
    for (const [id, pts] of Object.entries(weights)) next[id] = (next[id] || 0) + pts;
    if (current + 1 >= total) {
      setScores(next);
      setDone(true);
    } else {
      setScores(next);
      setCurrent(current + 1);
    }
  };

  const reset = () => { setCurrent(0); setScores({}); setDone(false); setCopied(false); };

  const result = (() => {
    if (!done) return null;
    let bestId = '';
    let bestScore = -1;
    for (const [id, s] of Object.entries(scores)) {
      if (s > bestScore) { bestScore = s; bestId = id; }
    }
    return getTributeById(bestId) || null;
  })();

  const share = async () => {
    if (!result) return;
    const text = `I got ${result.name} on the Hunger Games Tribute Personality Quiz — which tribute are you? https://hungergamessimulators.com/personality-quiz`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (done && result) {
    const topStats = (Object.entries(result.stats) as [keyof typeof result.stats, number][])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    return (
      <div style={{maxWidth:'700px',margin:'0 auto',padding:'1.5rem 1rem 4rem'}}>
        <div style={{background:'linear-gradient(135deg, rgba(212,160,23,0.12), rgba(139,26,26,0.06))',border:'1px solid rgba(212,160,23,0.3)',borderRadius:'16px',padding:'2.5rem 2rem',textAlign:'center'}}>
          <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.35em',margin:'0 0 1rem'}}>🧬 YOUR RESULT</p>
          <div style={{display:'flex',justifyContent:'center',marginBottom:'1.25rem'}}>
            <TributeAvatar src={result.image} name={result.name} size={96} fontSize="2.4rem" />
          </div>
          <p style={{fontSize:'0.8rem',color:'#a09880',margin:'0 0 0.25rem'}}>You are</p>
          <h2 style={{fontSize:'clamp(1.8rem,5vw,2.6rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.5rem',color:'#e8e0d0'}}>{result.name}</h2>
          {result.nickname && <p style={{fontSize:'1rem',color:'#d4a017',fontFamily:'Cinzel, serif',fontStyle:'italic',margin:'0 0 1.25rem'}}>"{result.nickname}"</p>}
          <p style={{color:'#a09880',lineHeight:1.8,fontSize:'0.92rem',margin:'0 0 1.5rem',maxWidth:'520px',marginLeft:'auto',marginRight:'auto'}}>{result.bio}</p>
          <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap',marginBottom:'2rem'}}>
            {topStats.map(([key, val]) => (
              <div key={key} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',padding:'0.75rem 1.25rem',minWidth:'110px'}}>
                <p style={{fontSize:'1.25rem',fontWeight:700,color:'#d4a017',margin:'0 0 0.15rem',fontFamily:'Cinzel, serif'}}>{val}</p>
                <p style={{fontSize:'0.6rem',color:'#5a5448',margin:0,fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>{(STAT_LABELS[key] || key).toUpperCase()}</p>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:'0.75rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button onClick={share} style={{background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.8rem 1.6rem',borderRadius:'6px',border:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.12em',fontWeight:700,fontSize:'0.8rem',cursor:'pointer'}}>
              {copied ? '✓ COPIED!' : '📋 SHARE MY RESULT'}
            </button>
            <Link href={`/tributes/${result.id}`} style={{background:'transparent',color:'#d4a017',padding:'0.8rem 1.6rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.12em',fontSize:'0.8rem',border:'1px solid rgba(212,160,23,0.35)',display:'inline-block'}}>👤 VIEW PROFILE</Link>
            <Link href="/simulator" style={{background:'transparent',color:'#a09880',padding:'0.8rem 1.6rem',borderRadius:'6px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.12em',fontSize:'0.8rem',border:'1px solid #1e2818',display:'inline-block'}}>⚔️ RUN SIMULATOR</Link>
          </div>
          <button onClick={reset} style={{background:'transparent',border:'none',color:'#5a5448',marginTop:'1.5rem',cursor:'pointer',fontSize:'0.78rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',textDecoration:'underline'}}>↺ RETAKE QUIZ</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{maxWidth:'700px',margin:'0 auto',padding:'1.5rem 1rem 4rem'}}>
      {/* Progress */}
      <div style={{marginBottom:'2rem'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
          <span style={{fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',color:'#d4a017'}}>QUESTION {current + 1} OF {total}</span>
          <span style={{fontSize:'0.68rem',color:'#5a5448'}}>{Math.round(((current) / total) * 100)}%</span>
        </div>
        <div style={{height:'6px',background:'#1e2818',borderRadius:'3px',overflow:'hidden'}}>
          <div style={{height:'100%',width:`${(current / total) * 100}%`,background:'linear-gradient(90deg,#d4a017,#f0c842)',borderRadius:'3px',transition:'width 0.4s'}}/>
        </div>
      </div>

      {/* Question card */}
      <div key={q.id} style={{background:'#0d1009',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'14px',padding:'2rem'}}>
        <p style={{fontSize:'0.75rem',color:'#5a5448',fontStyle:'italic',margin:'0 0 0.75rem',lineHeight:1.6}}>{q.scenario}</p>
        <h2 style={{fontSize:'clamp(1.25rem,3.5vw,1.7rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,color:'#e8e0d0',margin:'0 0 1.75rem',lineHeight:1.35}}>{q.question}</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => answer(i)}
              style={{background:'#080a06',border:'1px solid #1e2818',borderRadius:'8px',padding:'1rem 1.25rem',cursor:'pointer',textAlign:'left',color:'#e8e0d0',fontSize:'0.92rem',lineHeight:1.6,transition:'all 0.15s',fontFamily:'inherit'}}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,160,23,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(212,160,23,0.05)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1e2818'; (e.currentTarget as HTMLElement).style.background = '#080a06'; }}
            >
              <span style={{color:'#d4a017',fontWeight:700,marginRight:'0.6rem',fontFamily:'Cinzel, serif'}}>{String.fromCharCode(65 + i)}.</span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
