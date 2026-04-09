import { useState } from 'react';
import { TSX_DECKS, TSX_QUIZZES, TSX_NOTES, TSX_GOALS } from './tsxCourseContent';
import { EN_DECKS, EN_QUIZZES, EN_NOTES, EN_GOALS } from './englishCourseContent';
import { ZH_DECKS, ZH_QUIZZES, ZH_NOTES, ZH_GOALS } from './chineseCourseContent';
import type { Deck, Quiz, Note, Goal } from './tsxCourseContent';

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

function isCourseLoaded(checkId: number): boolean {
  const decks = loadLS<{ id: number }>('lh_flashcard_decks');
  return decks.some(d => d.id === checkId);
}

function mergeCourse(
  decks: Deck[], quizzes: Quiz[], notes: Note[], goals: Goal[]
) {
  const existingDecks = loadLS<Deck>('lh_flashcard_decks');
  saveLS('lh_flashcard_decks', [...existingDecks, ...decks]);

  const existingQuizzes = loadLS<Quiz>('lh_quizzes');
  saveLS('lh_quizzes', [...existingQuizzes, ...quizzes]);

  const existingNotes = loadLS<Note>('lh_study_notes');
  saveLS('lh_study_notes', [...notes, ...existingNotes]);

  const existingGoals = loadLS<Goal>('lh_goals');
  saveLS('lh_goals', [...goals, ...existingGoals]);
}

interface Course {
  id: string;
  checkId: number;
  icon: string;
  flag?: string;
  title: string;
  meta: string;
  levels: { label: string; cls: string }[];
  color: string;
  load: () => void;
}

export default function LearningHubView({ onNavigate }: LearningHubViewProps) {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({
    tsx: isCourseLoaded(9001),
    en:  isCourseLoaded(9101),
    zh:  isCourseLoaded(9201),
  });
  const [toast, setToast] = useState('');

  function showToast(msg: string) {
    setToast(msg); setTimeout(() => setToast(''), 3500);
  }

  const COURSES: Course[] = [
    {
      id: 'tsx', checkId: 9001,
      icon: '📘', title: 'TypeScript + React (TSX) — Beginner to Master',
      meta: '8 study notes · 3 flashcard decks (36 cards) · 3 quizzes (18 questions) · 4 goals',
      levels: [
        { label: '🟢 Beginner', cls: 'lh-level-green' },
        { label: '🟡 Intermediate', cls: 'lh-level-yellow' },
        { label: '🔴 Advanced', cls: 'lh-level-red' },
        { label: '⚫ Master', cls: 'lh-level-black' },
      ],
      color: 'purple',
      load: () => mergeCourse(TSX_DECKS, TSX_QUIZZES, TSX_NOTES, TSX_GOALS),
    },
    {
      id: 'en', checkId: 9101,
      icon: '🇬🇧', title: 'English — Beginner to Advanced',
      meta: '7 study notes · 5 flashcard decks (50 cards) · 3 quizzes (18 questions) · 4 goals',
      levels: [
        { label: '🟢 Beginner', cls: 'lh-level-green' },
        { label: '🟡 Intermediate', cls: 'lh-level-yellow' },
        { label: '🔴 Advanced', cls: 'lh-level-red' },
      ],
      color: 'teal',
      load: () => mergeCourse(EN_DECKS, EN_QUIZZES, EN_NOTES, EN_GOALS),
    },
    {
      id: 'zh', checkId: 9201,
      icon: '🇨🇳', title: 'Chinese (Mandarin) — Beginner to Advanced',
      meta: '7 study notes · 4 flashcard decks (75 cards) · 3 quizzes (18 questions) · 5 goals',
      levels: [
        { label: '🟢 HSK 1', cls: 'lh-level-green' },
        { label: '🟡 HSK 2', cls: 'lh-level-yellow' },
        { label: '🔴 Advanced', cls: 'lh-level-red' },
        { label: '⚫ Master', cls: 'lh-level-black' },
      ],
      color: 'amber',
      load: () => mergeCourse(ZH_DECKS, ZH_QUIZZES, ZH_NOTES, ZH_GOALS),
    },
  ];

  function handleLoad(course: Course) {
    if (loaded[course.id]) {
      showToast(`${course.icon} Course already loaded!`);
      return;
    }
    course.load();
    setLoaded(prev => ({ ...prev, [course.id]: true }));
    showToast(`✅ ${course.icon} Course loaded — check Flashcards, Quizzes, Notes & Goals!`);
  }

  return (
    <div className="hub-page">
      <div className="hub-hero">
        <span className="hub-hero-icon">🎓</span>
        <h1>Learning Hub</h1>
        <p>Study tools built for <strong>Tester</strong> skills (SQL, TypeScript) and <strong>Language</strong> learning (English, Chinese).</p>
      </div>

      {/* Course banners */}
      <div className="hub-section-label">Course library</div>
      <div className="lh-course-list">
        {COURSES.map(course => (
          <div key={course.id} className={`lh-course-banner lh-course-${course.color}`}>
            <div className="lh-course-banner-left">
              <span className="lh-course-icon">{course.icon}</span>
              <div>
                <div className="lh-course-title">{course.title}</div>
                <div className="lh-course-desc">{course.meta}</div>
                <div className="lh-course-levels">
                  {course.levels.map(l => (
                    <span key={l.label} className={`lh-level ${l.cls}`}>{l.label}</span>
                  ))}
                </div>
              </div>
            </div>
            <button
              className={`lh-course-btn lh-course-btn-${course.color}${loaded[course.id] ? ' loaded' : ''}`}
              onClick={() => handleLoad(course)}
            >
              {loaded[course.id] ? '✓ Loaded' : '⬇ Load course'}
            </button>
          </div>
        ))}
      </div>

      {/* Study tools */}
      <div className="hub-section-label" style={{ marginTop: '1.75rem' }}>Study tools</div>
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

      {/* Learning tracks */}
      <div className="hub-section-label" style={{ marginTop: '1.75rem' }}>Learning tracks</div>
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
