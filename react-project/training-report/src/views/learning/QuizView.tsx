import { useState } from 'react';

interface Option { id: number; text: string; }
interface Question { id: number; text: string; options: Option[]; correctId: number; explanation: string; }
interface Quiz { id: number; name: string; questions: Question[]; createdAt: string; }

const LS_KEY = 'lh_quizzes';
function load(): Quiz[] { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } }
function save(q: Quiz[]) { localStorage.setItem(LS_KEY, JSON.stringify(q)); }

const SAMPLE: Quiz[] = [
  {
    id: 1, name: 'SQL Fundamentals', createdAt: new Date().toISOString(),
    questions: [
      { id: 1, text: 'Which SQL clause is used to filter rows after grouping?', correctId: 3, explanation: 'HAVING filters groups produced by GROUP BY. WHERE filters individual rows before grouping.',
        options: [{ id: 1, text: 'WHERE' }, { id: 2, text: 'ORDER BY' }, { id: 3, text: 'HAVING' }, { id: 4, text: 'FILTER' }] },
      { id: 2, text: 'What does LEFT JOIN return?', correctId: 2, explanation: 'LEFT JOIN returns all rows from the left table and matched rows from the right. Unmatched right-side columns are NULL.',
        options: [{ id: 1, text: 'Only matching rows from both tables' }, { id: 2, text: 'All rows from the left table, NULLs for unmatched right rows' }, { id: 3, text: 'All rows from both tables' }, { id: 4, text: 'Only rows with no match' }] },
      { id: 3, text: 'Which aggregate function counts non-NULL values?', correctId: 1, explanation: 'COUNT(column) counts non-NULL values. COUNT(*) counts all rows including NULLs.',
        options: [{ id: 1, text: 'COUNT(column)' }, { id: 2, text: 'SUM(column)' }, { id: 3, text: 'AVG(column)' }, { id: 4, text: 'MAX(column)' }] },
    ],
  },
  {
    id: 2, name: 'TypeScript Basics', createdAt: new Date().toISOString(),
    questions: [
      { id: 1, text: 'What does the "readonly" keyword do in TypeScript?', correctId: 2, explanation: '"readonly" prevents a property from being reassigned after initialisation.',
        options: [{ id: 1, text: 'Makes the property optional' }, { id: 2, text: 'Prevents the property from being reassigned' }, { id: 3, text: 'Makes the type nullable' }, { id: 4, text: 'Hides the property from the compiler' }] },
      { id: 2, text: 'Which utility type makes all properties of T optional?', correctId: 3, explanation: 'Partial<T> constructs a type with all properties of T set to optional.',
        options: [{ id: 1, text: 'Required<T>' }, { id: 2, text: 'Pick<T, K>' }, { id: 3, text: 'Partial<T>' }, { id: 4, text: 'Omit<T, K>' }] },
      { id: 3, text: 'What symbol is used for a union type in TypeScript?', correctId: 1, explanation: 'The pipe | creates a union: string | number means the value can be either type.',
        options: [{ id: 1, text: '|' }, { id: 2, text: '&' }, { id: 3, text: '?' }, { id: 4, text: '~' }] },
    ],
  },
];

type Screen = 'list' | 'build' | 'taking' | 'result';

function uid() { return Date.now() + Math.random(); }

export default function QuizView() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => { const d = load(); return d.length ? d : SAMPLE; });
  const [screen, setScreen] = useState<Screen>('list');
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  // Builder state
  const [buildName, setBuildName] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  // Taking state
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<{ questionId: number; chosen: number; correct: boolean }[]>([]);

  function persist(updated: Quiz[]) { setQuizzes(updated); save(updated); }

  function deleteQuiz(id: number) {
    if (!confirm('Delete this quiz?')) return;
    persist(quizzes.filter(q => q.id !== id));
  }

  function startBuild() {
    setBuildName(''); setQuestions([]); setScreen('build');
  }

  function addQuestion() {
    const q: Question = {
      id: uid(), text: '', correctId: 1, explanation: '',
      options: [{ id: 1, text: '' }, { id: 2, text: '' }, { id: 3, text: '' }, { id: 4, text: '' }],
    };
    setQuestions(prev => [...prev, q]);
  }

  function updateQ(id: number, field: string, val: string) {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: field === 'correctId' ? Number(val) : val } : q));
  }

  function updateOption(qId: number, optId: number, val: string) {
    setQuestions(prev => prev.map(q => q.id === qId
      ? { ...q, options: q.options.map(o => o.id === optId ? { ...o, text: val } : o) } : q));
  }

  function removeQ(id: number) { setQuestions(prev => prev.filter(q => q.id !== id)); }

  function saveQuiz() {
    if (!buildName.trim() || questions.length === 0) return;
    const valid = questions.filter(q => q.text.trim() && q.options.every(o => o.text.trim()));
    if (valid.length === 0) return;
    const quiz: Quiz = { id: Date.now(), name: buildName.trim(), questions: valid, createdAt: new Date().toISOString() };
    persist([...quizzes, quiz]);
    setScreen('list');
  }

  function startQuiz(quiz: Quiz) {
    setActiveQuiz(quiz); setQIdx(0); setSelected(null); setConfirmed(false); setAnswers([]); setScreen('taking');
  }

  function confirmAnswer() {
    if (selected === null || !activeQuiz) return;
    const q = activeQuiz.questions[qIdx];
    setAnswers(prev => [...prev, { questionId: q.id, chosen: selected, correct: selected === q.correctId }]);
    setConfirmed(true);
  }

  function nextQ() {
    if (!activeQuiz) return;
    if (qIdx + 1 >= activeQuiz.questions.length) { setScreen('result'); return; }
    setQIdx(qIdx + 1); setSelected(null); setConfirmed(false);
  }

  // ── List
  if (screen === 'list') return (
    <div className="view">
      <div className="view-header">
        <h2 className="view-title">Quiz Builder</h2>
        <button className="tt-btn tt-btn-primary" style={{ flex: 'none' }} onClick={startBuild}>+ New quiz</button>
      </div>
      <div className="fc-decks-grid">
        {quizzes.map(q => (
          <div key={q.id} className="fc-deck-card" onClick={() => startQuiz(q)}>
            <div className="fc-deck-icon">🧠</div>
            <div className="fc-deck-info">
              <div className="fc-deck-name">{q.name}</div>
              <div className="fc-deck-meta">{q.questions.length} questions</div>
            </div>
            <button className="tt-del-btn" onClick={e => { e.stopPropagation(); deleteQuiz(q.id); }}>✕</button>
          </div>
        ))}
        {quizzes.length === 0 && <p style={{ color: 'var(--tx3)', fontSize: '14px' }}>No quizzes yet.</p>}
      </div>
    </div>
  );

  // ── Builder
  if (screen === 'build') return (
    <div className="view">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <button className="fc-back-btn" onClick={() => setScreen('list')}>← Back</button>
        <h2 className="view-title" style={{ margin: 0 }}>New Quiz</h2>
      </div>
      <div className="tt-card">
        <div className="tt-card-body">
          <div className="tt-field"><label>Quiz name</label>
            <input value={buildName} onChange={e => setBuildName(e.target.value)} placeholder="e.g. JavaScript Basics" /></div>
        </div>
      </div>
      {questions.map((q, qi) => (
        <div key={q.id} className="tt-card" style={{ marginBottom: '12px' }}>
          <div className="tt-card-header">
            <span className="tt-badge tt-badge-blue">Q{qi + 1}</span>
            <button className="tt-del-btn" style={{ marginLeft: 'auto' }} onClick={() => removeQ(q.id)}>✕</button>
          </div>
          <div className="tt-card-body">
            <div className="tt-field" style={{ marginBottom: '10px' }}>
              <label>Question</label>
              <input value={q.text} onChange={e => updateQ(q.id, 'text', e.target.value)} placeholder="Enter your question..." />
            </div>
            <div className="quiz-options-grid">
              {q.options.map(o => (
                <div key={o.id} className="quiz-option-row">
                  <input type="radio" name={`correct-${q.id}`} checked={q.correctId === o.id}
                    onChange={() => updateQ(q.id, 'correctId', String(o.id))} title="Mark as correct" />
                  <input className="quiz-opt-input" value={o.text} onChange={e => updateOption(q.id, o.id, e.target.value)} placeholder={`Option ${o.id}`} />
                </div>
              ))}
            </div>
            <div className="tt-field" style={{ marginTop: '10px' }}>
              <label>Explanation (optional)</label>
              <input value={q.explanation} onChange={e => updateQ(q.id, 'explanation', e.target.value)} placeholder="Why is this the correct answer?" />
            </div>
          </div>
        </div>
      ))}
      <button className="tt-add-btn" onClick={addQuestion}>+ Add question</button>
      <div className="tt-actions" style={{ marginTop: '1rem' }}>
        <button className="tt-btn tt-btn-outline" onClick={() => setScreen('list')}>Cancel</button>
        <button className="tt-btn tt-btn-primary" onClick={saveQuiz} disabled={!buildName.trim() || questions.length === 0}>Save quiz</button>
      </div>
    </div>
  );

  // ── Taking
  if (screen === 'taking' && activeQuiz) {
    const q = activeQuiz.questions[qIdx];
    const progress = Math.round(qIdx / activeQuiz.questions.length * 100);
    return (
      <div className="view">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <button className="fc-back-btn" onClick={() => setScreen('list')}>← Exit</button>
          <span style={{ fontSize: '13px', color: 'var(--tx2)', fontWeight: 500 }}>{activeQuiz.name}</span>
          <span style={{ fontSize: '13px', color: 'var(--tx3)', marginLeft: 'auto' }}>{qIdx + 1} / {activeQuiz.questions.length}</span>
        </div>
        <div className="fc-progress-bar-wrap"><div className="fc-progress-bar" style={{ width: progress + '%' }} /></div>

        <div className="quiz-question-card">
          <div className="quiz-q-label">Question {qIdx + 1}</div>
          <div className="quiz-q-text">{q.text}</div>
        </div>

        <div className="quiz-options-list">
          {q.options.map(o => {
            let cls = 'quiz-option-btn';
            if (confirmed) {
              if (o.id === q.correctId) cls += ' correct';
              else if (o.id === selected) cls += ' wrong';
            } else if (o.id === selected) cls += ' selected';
            return (
              <button key={o.id} className={cls} onClick={() => !confirmed && setSelected(o.id)}>
                <span className="quiz-opt-letter">{String.fromCharCode(64 + o.id)}</span>
                {o.text}
              </button>
            );
          })}
        </div>

        {confirmed && q.explanation && (
          <div className="quiz-explanation">💡 {q.explanation}</div>
        )}

        <div className="tt-actions">
          {!confirmed
            ? <button className="tt-btn tt-btn-primary" onClick={confirmAnswer} disabled={selected === null}>Check answer</button>
            : <button className="tt-btn tt-btn-primary" onClick={nextQ}>
                {qIdx + 1 >= activeQuiz.questions.length ? 'See results' : 'Next question →'}
              </button>
          }
        </div>
      </div>
    );
  }

  // ── Result
  if (screen === 'result' && activeQuiz) {
    const correct = answers.filter(a => a.correct).length;
    const pct = Math.round(correct / answers.length * 100);
    const grade = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '👍 Good job!' : '📚 Keep studying!';
    return (
      <div className="view">
        <div className="fc-done-screen">
          <div className="fc-done-icon" style={{ fontSize: '48px' }}>{grade.split(' ')[0]}</div>
          <h3>{grade.slice(2)}</h3>
          <p>You scored <strong>{correct} / {answers.length}</strong> ({pct}%)</p>
          <div className="fc-done-stats">
            <span className="fc-stat-chip fc-chip-know">✓ {correct} correct</span>
            <span className="fc-stat-chip fc-chip-review">✗ {answers.length - correct} wrong</span>
          </div>
          <div style={{ marginTop: '1.5rem', width: '100%' }}>
            {activeQuiz.questions.map((q, i) => {
              const a = answers.find(x => x.questionId === q.id);
              const isCorrect = a?.correct;
              return (
                <div key={q.id} className={`quiz-review-row ${isCorrect ? 'review-correct' : 'review-wrong'}`}>
                  <div className="quiz-review-q">{i + 1}. {q.text}</div>
                  <div className="quiz-review-ans">
                    {isCorrect ? '✓' : '✗'} {q.options.find(o => o.id === a?.chosen)?.text || '—'}
                    {!isCorrect && <span className="quiz-review-correct-ans"> → Correct: {q.options.find(o => o.id === q.correctId)?.text}</span>}
                  </div>
                  {q.explanation && <div className="quiz-review-exp">💡 {q.explanation}</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
            <button className="tt-btn tt-btn-primary" onClick={() => startQuiz(activeQuiz)}>Try again</button>
            <button className="tt-btn tt-btn-outline" onClick={() => setScreen('list')}>All quizzes</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
