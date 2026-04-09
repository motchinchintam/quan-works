import { useState } from 'react';
import { TSX_DECKS, TSX_QUIZZES, TSX_NOTES, TSX_GOALS } from './tsxCourseContent';

interface LearningHubViewProps {
  onNavigate: (view: string) => void;
}

interface LearnCard {
  view: string; icon: string; name: string;
  desc: string; tags: string[]; color: string; badge: string;
}

const TOOLS: LearnCard[] = [
  { view: 'flashcard', icon: '🃏', name: 'Flashcard Decks', badge: 'Memory',
    desc: 'Flip cards for SQL, TypeScript, English, and Chinese vocab. Mark Know or Review, track mastery per deck.',
    tags: ['SQL', 'vocabulary', 'TypeScript', 'Chinese'], color: 'purple' },
  { view: 'quiz', icon: '🧠', name: 'Quiz Builder', badge: 'Assessment',
    desc: 'Test yourself on SQL queries, TypeScript concepts, English grammar, or Chinese characters.',
    tags: ['SQL quiz', 'TSX', 'grammar', 'self-test'], color: 'blue' },
  { view: 'studytimer', icon: '⏱', name: 'Study Timer', badge: 'Focus',
    desc: 'Pomodoro-style timer — stay focused during SQL practice, coding, or language drills.',
    tags: ['pomodoro', 'focus', 'daily habit'], color: 'teal' },
  { view: 'goals', icon: '🎯', name: 'Learning Goals', badge: 'Planning',
    desc: 'Set goals like "Complete 50 SQL exercises" or "Learn 300 Chinese words". Track deadlines and progress.',
    tags: ['SQL', 'English', 'Chinese', 'TypeScript'], color: 'green' },
  { view: 'studynotes', icon: '📓', name: 'Study Notes', badge: 'Knowledge',
    desc: 'Organise notes by topic — SQL joins, TypeScript utility types, English grammar, Chinese HSK vocab.',
    tags: ['SQL', 'TSX notes', 'grammar', 'HSK'], color: 'amber' },
];

function loadLS<T extends { id: number }>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function saveLS(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

function isCourseLoaded(): boolean {
  const decks = loadLS<{ id: number }>('lh_flashcard_decks');
  return decks.some(d => d.id === 9001);
}

function loadTSXCourse(): string {
  if (isCourseLoaded()) return 'already';

  // Merge flashcard decks
  const decks = loadLS<(typeof TSX_DECKS)[0]>('lh_flashcard_decks');
  saveLS('lh_flashcard_decks', [...decks, ...TSX_DECKS]);

  // Merge quizzes
  const quizzes = loadLS<(typeof TSX_QUIZZES)[0]>('lh_quizzes');
  saveLS('lh_quizzes', [...quizzes, ...TSX_QUIZZES]);

  // Merge notes
  const notes = loadLS<(typeof TSX_NOTES)[0]>('lh_study_notes');
  saveLS('lh_study_notes', [...TSX_NOTES, ...notes]); // notes first so they appear at top

  // Merge goals
  const goals = loadLS<(typeof TSX_GOALS)[0]>('lh_goals');
  saveLS('lh_goals', [...TSX_GOALS, ...goals]);

  return 'done';
}

export default function LearningHubView({ onNavigate }: LearningHubViewProps) {
  const [courseLoaded, setCourseLoaded] = useState(isCourseLoaded);
  const [toast, setToast] = useState('');

  function handleLoadCourse() {
    const result = loadTSXCourse();
    if (result === 'already') {
      setToast('TSX course already loaded!');
    } else {
      setCourseLoaded(true);
      setToast('✅ TSX Course loaded — check Flashcards, Quizzes, Notes & Goals!');
    }
    setTimeout(() => setToast(''), 3500);
  }

  return (
    <div className="hub-page">
      <div className="hub-hero">
        <span className="hub-hero-icon">🎓</span>
        <h1>Learning Hub</h1>
        <p>Study tools built for <strong>Tester</strong> skills (SQL, TypeScript) and <strong>Language</strong> learning (English, Chinese).</p>
      </div>

      {/* TSX Course Banner */}
      <div className="lh-course-banner">
        <div className="lh-course-banner-left">
          <span className="lh-course-icon">📘</span>
          <div>
            <div className="lh-course-title">TypeScript + React (TSX) — Beginner to Master</div>
            <div className="lh-course-desc">
              8 study notes · 3 flashcard decks (36 cards) · 3 quizzes (18 questions) · 4 learning goals
            </div>
            <div className="lh-course-levels">
              <span className="lh-level lh-level-green">🟢 Beginner</span>
              <span className="lh-level lh-level-yellow">🟡 Intermediate</span>
              <span className="lh-level lh-level-red">🔴 Advanced</span>
              <span className="lh-level lh-level-black">⚫ Master</span>
            </div>
          </div>
        </div>
        <button
          className={`lh-course-btn${courseLoaded ? ' loaded' : ''}`}
          onClick={handleLoadCourse}
        >
          {courseLoaded ? '✓ Loaded' : '⬇ Load course'}
        </button>
      </div>

      <div className="hub-section-label" style={{ marginTop: '1.5rem' }}>Study tools</div>
      <div className="hub-grid">
        {TOOLS.map(card => (
          <div key={card.view} className={`hub-card hub-${card.color}`}
            onClick={() => onNavigate(card.view)} role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onNavigate(card.view)}>
            <div className="hub-card-top">
              <div className="hub-icon">{card.icon}</div>
              <div className="hub-info">
                <div className="hub-name">{card.name}</div>
                <span className={`hub-badge hub-badge-${card.color}`}>{card.badge}</span>
              </div>
            </div>
            <div className="hub-desc">{card.desc}</div>
            <div className="hub-tags">{card.tags.map(t => <span key={t} className="hub-tag">{t}</span>)}</div>
            <div className="hub-open-btn">Open tool →</div>
          </div>
        ))}
      </div>

      <div className="hub-section-label" style={{ marginTop: '1.5rem' }}>Learning tracks</div>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {[
          { icon: '🗄️', label: 'SQL', desc: 'Queries, joins, aggregation, indexing', color: 'blue' },
          { icon: '📘', label: 'TypeScript', desc: 'Types, interfaces, TSX, generics', color: 'purple' },
          { icon: '🇬🇧', label: 'English', desc: 'Grammar, vocabulary, writing', color: 'teal' },
          { icon: '🇨🇳', label: 'Chinese', desc: 'HSK vocab, characters, tones', color: 'amber' },
        ].map(track => (
          <div key={track.label} className={`hub-track-chip hub-track-${track.color}`}>
            <span>{track.icon}</span>
            <div>
              <div className="hub-track-label">{track.label}</div>
              <div className="hub-track-desc">{track.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hub-footer">Learning Hub · All data saved locally in your browser</div>

      {toast && <div className="tt-toast show">{toast}</div>}
    </div>
  );
}
