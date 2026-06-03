'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { quizQuestions, getMixedQuiz, getQuestionsByDifficulty } from '@/data/quiz';
import { QuizQuestion } from '@/types';

type Phase = 'menu' | 'playing' | 'results';
type Mode = 'mixed' | 'easy' | 'medium' | 'hard' | 'all';

const MODES: Record<Mode, { label: string; icon: string; questions: number; desc: string; color: string; time: number }> = {
  mixed:  { label: 'Mixed Arena',     icon: '⚔️', questions: 10, desc: '5 easy + 3 medium + 2 hard questions', color: '#d4a017', time: 20 },
  easy:   { label: 'Training Ground', icon: '🌿', questions: 10, desc: 'All easy questions — 10 pts each', color: '#70c870', time: 30 },
  medium: { label: 'The Games',       icon: '🔥', questions: 10, desc: 'Medium difficulty — 20 pts each', color: '#e8a030', time: 25 },
  hard:   { label: 'Quarter Quell',   icon: '👑', questions: 10, desc: 'Hard questions only — 30 pts each', color: '#e87070', time: 20 },
  all:    { label: 'Full Gauntlet',   icon: '🏆', questions: 30, desc: 'All 30 questions — ultimate test', color: '#c070e8', time: 60 },
};

const DIFF_COLORS = { easy: '#70c870', medium: '#e8a030', hard: '#e87070' };
const DIFF_ICONS = { easy: '🌿', medium: '🔥', hard: '👑' };

function buildQuiz(mode: Mode): QuizQuestion[] {
  switch (mode) {
    case 'easy':   return [...getQuestionsByDifficulty('easy')].sort(() => Math.random()-0.5).slice(0, 10);
    case 'medium': return [...getQuestionsByDifficulty('medium')].sort(() => Math.random()-0.5).slice(0, 10);
    case 'hard':   return [...getQuestionsByDifficulty('hard')].sort(() => Math.random()-0.5).slice(0, 10);
    case 'all':    return [...quizQuestions].sort(() => Math.random()-0.5);
    default:       return getMixedQuiz(5, 3, 2);
  }
}

function getVictor(score: number, max: number): { title: string; desc: string; icon: string } {
  const pct = score / max;
  if (pct >= 0.9) return { title: 'Capitol Victor', desc: 'You received a perfect training score. Even the Gamemakers are impressed.', icon: '🏆' };
  if (pct >= 0.75) return { title: 'Tribute Champion', desc: 'You know Panem inside out. Career tribute material.', icon: '👑' };
  if (pct >= 0.6) return { title: 'District Survivor', desc: 'Solid knowledge. You would have made it past Day 3.', icon: '⚔️' };
  if (pct >= 0.4) return { title: 'Reaping Volunteer', desc: 'You know the basics but the Careers have the edge.', icon: '🌿' };
  return { title: 'Fresh Tribute', desc: 'Study the districts before your next Reaping. Haymitch is disappointed.', icon: '😬' };
}

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>('menu');
  const [mode, setMode] = useState<Mode>('mixed');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ q: QuizQuestion; chosen: number; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const startQuiz = useCallback(() => {
    const qs = buildQuiz(mode);
    setQuestions(qs);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setAnswers([]);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(MODES[mode].time);
    setPhase('playing');
    setShowResults(false);
  }, [mode]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    if (phase === 'playing' && !revealed) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            stopTimer();
            setRevealed(true);
            setSelected(-1);
            setStreak(0);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return stopTimer;
  }, [phase, revealed, current, stopTimer]);

  const handleSelect = useCallback((optIdx: number) => {
    if (revealed) return;
    stopTimer();
    setSelected(optIdx);
    setRevealed(true);
    const q = questions[current];
    const correct = optIdx === q.correctAnswer;
    if (correct) {
      setScore(s => s + q.points);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak(b => Math.max(b, newStreak));
    } else {
      setStreak(0);
    }
    setAnswers(a => [...a, { q, chosen: optIdx, correct }]);
  }, [revealed, current, questions, streak, stopTimer]);

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setPhase('results');
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
      setTimeLeft(MODES[mode].time);
    }
  }, [current, questions.length, mode]);

  if (phase === 'menu') {
    return (
      <>
        <style>{`
          .quiz-modes-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem;}
          .quiz-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;}
          @media(max-width:600px){.quiz-stats-grid{grid-template-columns:repeat(2,1fr);}}
        `}</style>
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'2rem 1rem'}}>
          <nav style={{display:'flex',gap:'0.5rem',fontSize:'0.7rem',color:'#5a5448',marginBottom:'1.25rem'}}>
            <Link href="/" style={{color:'#d4a017',textDecoration:'none'}}>Home</Link><span>/</span><span style={{color:'#a09880'}}>Quiz</span>
          </nav>

          <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
            <p style={{color:'#d4a017',fontSize:'0.62rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',margin:'0 0 0.75rem'}}>🧠 TEST YOUR KNOWLEDGE</p>
            <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,margin:'0 0 0.75rem'}}>Hunger Games Quiz</h1>
            <p style={{color:'#a09880',margin:0,fontSize:'1rem'}}>30 questions · 5 modes · Timed rounds · Instant explanations</p>
          </div>

          {/* Stats row */}
          <div className="quiz-stats-grid" style={{marginBottom:'2rem'}}>
            {[['30','Questions','📚'],['5','Modes','🎮'],['10 pts','Min per Q','🌿'],['30 pts','Max per Q','👑']].map(([v,l,i]) => (
              <div key={l} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',padding:'1rem',textAlign:'center'}}>
                <div style={{fontSize:'1.2rem',marginBottom:'0.25rem'}}>{i}</div>
                <p style={{fontSize:'1.3rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',margin:'0 0 0.1rem'}}>{v}</p>
                <p style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.12em',color:'#5a5448',margin:0}}>{l.toUpperCase()}</p>
              </div>
            ))}
          </div>

          {/* Mode select */}
          <h2 style={{fontSize:'0.7rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.3em',color:'#5a5448',marginBottom:'1rem'}}>CHOOSE YOUR ARENA</h2>
          <div className="quiz-modes-grid" style={{marginBottom:'2rem'}}>
            {(Object.entries(MODES) as [Mode, typeof MODES[Mode]][]).map(([key, m]) => (
              <button key={key} onClick={() => setMode(key)} style={{background:mode===key?`${m.color}12`:'#0d1009',border:`1px solid ${mode===key?m.color:'#1e2818'}`,borderRadius:'10px',padding:'1.25rem',cursor:'pointer',textAlign:'left',transition:'all 0.2s',outline:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'0.5rem'}}>
                  <span style={{fontSize:'1.5rem'}}>{m.icon}</span>
                  {mode===key && <span style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:m.color,background:`${m.color}18`,border:`1px solid ${m.color}44`,padding:'0.1rem 0.4rem',borderRadius:'2px'}}>SELECTED</span>}
                </div>
                <h3 style={{fontSize:'1rem',fontFamily:'Cinzel, serif',fontWeight:700,color:mode===key?m.color:'#e8e0d0',margin:'0 0 0.3rem'}}>{m.label}</h3>
                <p style={{fontSize:'0.75rem',color:'#5a5448',margin:'0 0 0.5rem'}}>{m.desc}</p>
                <div style={{display:'flex',gap:'0.75rem',fontSize:'0.65rem',color:'#5a5448'}}>
                  <span>📚 {m.questions} questions</span>
                  <span>⏱️ {m.time}s per Q</span>
                </div>
              </button>
            ))}
          </div>

          <div style={{textAlign:'center'}}>
            <button onClick={startQuiz} style={{background:`linear-gradient(135deg,${MODES[mode].color},${MODES[mode].color}bb)`,color:'#080a06',padding:'1rem 3rem',borderRadius:'6px',border:'none',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.2em',fontWeight:700,fontSize:'1rem',boxShadow:`0 0 30px ${MODES[mode].color}44`}}>
              {MODES[mode].icon} ENTER THE {MODES[mode].label.toUpperCase()}
            </button>
          </div>
        </div>
      </>
    );
  }

  if (phase === 'results') {
    const maxScore = questions.reduce((s, q) => s + q.points, 0);
    const pct = Math.round((score / maxScore) * 100);
    const victor = getVictor(score, maxScore);
    const correct = answers.filter(a => a.correct).length;

    return (
      <>
        <style>{`.results-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;} @media(max-width:600px){.results-grid{grid-template-columns:1fr;}}`}</style>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'2rem 1rem'}}>
          {/* Victor banner */}
          <div style={{background:'linear-gradient(135deg,rgba(212,160,23,0.12),rgba(139,26,26,0.06))',border:'1px solid rgba(212,160,23,0.3)',borderRadius:'16px',padding:'2rem',textAlign:'center',marginBottom:'1.5rem'}}>
            <div style={{fontSize:'3rem',marginBottom:'0.75rem'}}>{victor.icon}</div>
            <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.4em',color:'#d4a017',margin:'0 0 0.5rem'}}>YOUR RANKING</p>
            <h1 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:900,color:'#d4a017',margin:'0 0 0.5rem'}}>{victor.title}</h1>
            <p style={{color:'#a09880',margin:'0 0 1.25rem',fontSize:'0.9rem'}}>{victor.desc}</p>
            <div style={{fontSize:'3rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',marginBottom:'0.25rem'}}>{score} pts</div>
            <div style={{color:'#5a5448',fontSize:'0.75rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em'}}>out of {maxScore} pts · {pct}%</div>
          </div>

          {/* Stats */}
          <div className="results-grid" style={{marginBottom:'1.5rem'}}>
            {[['Correct',`${correct}/${questions.length}`,'✅'],['Score',`${score}/${maxScore}`,'📊'],['Accuracy',`${pct}%`,'🎯'],['Best Streak',`${bestStreak}x`,'🔥']].map(([l,v,i]) => (
              <div key={l} style={{background:'#0d1009',border:'1px solid #1e2818',borderRadius:'8px',padding:'1rem',textAlign:'center'}}>
                <div style={{fontSize:'1.2rem',marginBottom:'0.3rem'}}>{i}</div>
                <p style={{fontSize:'1.4rem',fontFamily:'Cinzel, serif',fontWeight:900,color:'#d4a017',margin:'0 0 0.1rem'}}>{v}</p>
                <p style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#5a5448',margin:0}}>{l.toUpperCase()}</p>
              </div>
            ))}
          </div>

          {/* Review button */}
          <div style={{display:'flex',gap:'0.875rem',justifyContent:'center',marginBottom:'1.5rem',flexWrap:'wrap'}}>
            <button onClick={() => setShowResults(r => !r)} style={{background:'#0d1009',border:'1px solid rgba(212,160,23,0.3)',color:'#d4a017',padding:'0.75rem 1.5rem',borderRadius:'5px',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontSize:'0.8rem',fontWeight:600}}>
              {showResults ? 'HIDE' : 'REVIEW'} ANSWERS
            </button>
            <button onClick={startQuiz} style={{background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.75rem 1.5rem',borderRadius:'5px',border:'none',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontSize:'0.8rem',fontWeight:700}}>
              ⟳ PLAY AGAIN
            </button>
            <Link href="/quiz" onClick={() => setPhase('menu')} style={{background:'transparent',border:'1px solid #1e2818',color:'#a09880',padding:'0.75rem 1.5rem',borderRadius:'5px',textDecoration:'none',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontSize:'0.8rem'}}>
              CHANGE MODE
            </Link>
          </div>

          {/* Answer review */}
          {showResults && (
            <div style={{display:'flex',flexDirection:'column',gap:'0.875rem'}}>
              <h2 style={{fontSize:'0.7rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.3em',color:'#5a5448',marginBottom:'0.25rem'}}>QUESTION REVIEW</h2>
              {answers.map(({q, chosen, correct}, i) => (
                <div key={q.id} style={{background:'#0d1009',border:`1px solid ${correct?'rgba(112,200,112,0.25)':'rgba(232,112,112,0.25)'}`,borderRadius:'8px',padding:'1rem'}}>
                  <div style={{display:'flex',gap:'0.75rem',alignItems:'flex-start',marginBottom:'0.75rem'}}>
                    <span style={{fontSize:'1rem',flexShrink:0}}>{correct?'✅':'❌'}</span>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.4rem',flexWrap:'wrap'}}>
                        <span style={{fontSize:'0.55rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:DIFF_COLORS[q.difficulty],background:`${DIFF_COLORS[q.difficulty]}15`,border:`1px solid ${DIFF_COLORS[q.difficulty]}30`,padding:'0.1rem 0.4rem',borderRadius:'2px'}}>{DIFF_ICONS[q.difficulty]} {q.difficulty.toUpperCase()} · {q.points} pts</span>
                        <span style={{fontSize:'0.55rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>{q.category}</span>
                      </div>
                      <p style={{fontSize:'0.88rem',fontFamily:'Cinzel, serif',fontWeight:600,color:'#e8e0d0',margin:0,lineHeight:1.4}}>Q{i+1}. {q.question}</p>
                    </div>
                  </div>
                  <div style={{display:'flex',flexDirection:'column',gap:'0.3rem',marginBottom:'0.75rem'}}>
                    {q.options.map((opt, oi) => {
                      const isCorrect = oi === q.correctAnswer;
                      const isChosen = oi === chosen;
                      let bg = 'transparent', border = '#1e2818', color = '#5a5448';
                      if (isCorrect) { bg='rgba(112,200,112,0.08)'; border='rgba(112,200,112,0.4)'; color='#70c870'; }
                      if (isChosen && !isCorrect) { bg='rgba(232,112,112,0.08)'; border='rgba(232,112,112,0.4)'; color='#e87070'; }
                      return (
                        <div key={oi} style={{display:'flex',gap:'0.5rem',alignItems:'center',padding:'0.4rem 0.6rem',background:bg,border:`1px solid ${border}`,borderRadius:'4px'}}>
                          <span style={{fontSize:'0.7rem',fontWeight:700,color,width:'16px',flexShrink:0}}>{isCorrect?'✓':isChosen?'✗':'○'}</span>
                          <span style={{fontSize:'0.8rem',color}}>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                  {!correct && <div style={{background:'rgba(212,160,23,0.06)',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'4px',padding:'0.6rem 0.75rem'}}>
                    <p style={{fontSize:'0.75rem',color:'#a09880',lineHeight:1.6,margin:0}}><strong style={{color:'#d4a017'}}>📖 Explanation:</strong> {q.explanation}</p>
                  </div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  // PLAYING
  const q = questions[current];
  const modeConfig = MODES[mode];
  const progress = ((current) / questions.length) * 100;
  const timePct = (timeLeft / modeConfig.time) * 100;

  return (
    <>
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'1.5rem 1rem'}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.25rem',flexWrap:'wrap',gap:'0.5rem'}}>
          <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
            <span style={{fontSize:'1rem'}}>{modeConfig.icon}</span>
            <span style={{fontSize:'0.75rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#d4a017'}}>{modeConfig.label}</span>
          </div>
          <div style={{display:'flex',gap:'1rem',alignItems:'center'}}>
            {streak >= 2 && <span style={{fontSize:'0.68rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#e8a030'}}>🔥 {streak}x STREAK</span>}
            <span style={{fontSize:'0.85rem',fontFamily:'Cinzel, serif',fontWeight:700,color:'#d4a017'}}>{score} pts</span>
            <span style={{fontSize:'0.75rem',color:'#5a5448',fontFamily:'Oswald, sans-serif'}}>{current+1}/{questions.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{height:'4px',background:'#1e2818',borderRadius:'2px',overflow:'hidden',marginBottom:'1.5rem'}}>
          <div style={{height:'100%',width:`${progress}%`,background:'linear-gradient(90deg,#d4a017,#f0c842)',borderRadius:'2px',transition:'width 0.3s ease'}}/>
        </div>

        {/* Timer */}
        <div style={{marginBottom:'1.25rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.3rem'}}>
            <span style={{fontSize:'0.6rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:'#5a5448'}}>TIME REMAINING</span>
            <span style={{fontSize:'0.75rem',fontFamily:'Cinzel, serif',fontWeight:700,color:timeLeft<=5?'#e87070':'#d4a017'}}>{timeLeft}s</span>
          </div>
          <div style={{height:'6px',background:'#1e2818',borderRadius:'3px',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${timePct}%`,background:timeLeft<=5?'linear-gradient(90deg,#8b1a1a,#e87070)':'linear-gradient(90deg,#2d4a1e,#d4a017)',borderRadius:'3px',transition:'width 1s linear'}}/>
          </div>
        </div>

        {/* Question card */}
        <div style={{background:'#0d1009',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'14px',padding:'1.5rem',marginBottom:'1.25rem'}}>
          <div style={{display:'flex',gap:'0.5rem',marginBottom:'0.875rem',flexWrap:'wrap'}}>
            <span style={{fontSize:'0.58rem',fontFamily:'Oswald, sans-serif',letterSpacing:'0.1em',color:DIFF_COLORS[q.difficulty],background:`${DIFF_COLORS[q.difficulty]}15`,border:`1px solid ${DIFF_COLORS[q.difficulty]}30`,padding:'0.15rem 0.5rem',borderRadius:'2px'}}>{DIFF_ICONS[q.difficulty]} {q.difficulty.toUpperCase()} · +{q.points} pts</span>
            <span style={{fontSize:'0.58rem',color:'#5a5448',fontFamily:'Oswald, sans-serif',letterSpacing:'0.05em'}}>{q.category}</span>
          </div>
          <h2 style={{fontSize:'clamp(1rem,2.5vw,1.3rem)',fontFamily:'Cinzel, Georgia, serif',fontWeight:700,color:'#e8e0d0',lineHeight:1.4,margin:0}}>{q.question}</h2>
        </div>

        {/* Options */}
        <div style={{display:'flex',flexDirection:'column',gap:'0.625rem',marginBottom:'1.25rem'}}>
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctAnswer;
            const isChosen = i === selected;
            let bg = '#0d1009', border = '#1e2818', color = '#e8e0d0', cursor = 'pointer';
            if (revealed) {
              if (isCorrect) { bg='rgba(112,200,112,0.1)'; border='rgba(112,200,112,0.5)'; color='#70c870'; }
              else if (isChosen) { bg='rgba(232,112,112,0.1)'; border='rgba(232,112,112,0.5)'; color='#e87070'; }
              else { color='#5a5448'; cursor='default'; }
            } else {
              cursor = 'pointer';
            }
            const letters = ['A','B','C','D'];
            return (
              <button key={i} onClick={()=>handleSelect(i)} disabled={revealed} style={{background:bg,border:`1px solid ${border}`,borderRadius:'8px',padding:'0.875rem 1rem',cursor,textAlign:'left',display:'flex',gap:'0.875rem',alignItems:'center',transition:'all 0.15s',outline:'none',width:'100%'}}>
                <span style={{width:28,height:28,borderRadius:'50%',background:`${border}22`,border:`1px solid ${border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.75rem',fontFamily:'Cinzel, serif',fontWeight:700,color,flexShrink:0}}>{letters[i]}</span>
                <span style={{fontSize:'0.9rem',color,lineHeight:1.4}}>{opt}</span>
                {revealed && isCorrect && <span style={{marginLeft:'auto',fontSize:'1rem'}}>✓</span>}
                {revealed && isChosen && !isCorrect && <span style={{marginLeft:'auto',fontSize:'1rem'}}>✗</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {revealed && (
          <div>
            <div style={{background:'rgba(212,160,23,0.06)',border:'1px solid rgba(212,160,23,0.2)',borderRadius:'8px',padding:'0.875rem 1rem',marginBottom:'1rem'}}>
              <p style={{fontSize:'0.8rem',color:'#a09880',lineHeight:1.7,margin:0}}>
                <strong style={{color:'#d4a017'}}>📖 </strong>{q.explanation}
              </p>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:'0.75rem',color:selected===q.correctAnswer?'#70c870':'#e87070',fontFamily:'Oswald, sans-serif',fontWeight:700}}>
                {selected===-1 ? '⏰ TIME UP' : selected===q.correctAnswer ? `✅ +${q.points} points!` : '❌ Incorrect'}
              </div>
              <button onClick={handleNext} style={{background:'linear-gradient(135deg,#d4a017,#b8860b)',color:'#080a06',padding:'0.65rem 1.5rem',borderRadius:'5px',border:'none',cursor:'pointer',fontFamily:'Oswald, sans-serif',letterSpacing:'0.15em',fontWeight:700,fontSize:'0.8rem'}}>
                {current+1===questions.length?'VIEW RESULTS →':'NEXT →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
