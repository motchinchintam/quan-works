interface LearningHubViewProps {
  onNavigate: (view: string) => void;
}

interface LearnCard {
  view: string;
  icon: string;
  name: string;
  desc: string;
  tags: string[];
  color: string;
  badge: string;
}

const TOOLS: LearnCard[] = [
  {
    view: 'flashcard',
    icon: '🃏',
    name: 'Flashcard Decks',
    badge: 'Memory',
    desc: 'Create decks of question/answer cards. Flip to reveal, mark Know or Review, track mastery per deck.',
    tags: ['flip cards', 'memorize', 'decks'],
    color: 'purple',
  },
  {
    view: 'quiz',
    icon: '🧠',
    name: 'Quiz Builder',
    badge: 'Assessment',
    desc: 'Build multiple-choice quizzes, take them with instant feedback, and see your final score.',
    tags: ['MCQ', 'self-test', 'score'],
    color: 'blue',
  },
  {
    view: 'studytimer',
    icon: '⏱',
    name: 'Study Timer',
    badge: 'Focus',
    desc: 'Pomodoro-style timer — 25 min focus + 5 min break. Counts your sessions and total study time.',
    tags: ['pomodoro', 'focus', 'breaks'],
    color: 'teal',
  },
  {
    view: 'goals',
    icon: '🎯',
    name: 'Learning Goals',
    badge: 'Planning',
    desc: 'Set learning goals with deadlines and progress. Mark milestones, track completion rate.',
    tags: ['goals', 'deadline', 'progress'],
    color: 'green',
  },
  {
    view: 'studynotes',
    icon: '📓',
    name: 'Study Notes',
    badge: 'Knowledge',
    desc: 'Write and organise notes by topic. Search, filter by category, and pin important notes.',
    tags: ['notes', 'topics', 'search'],
    color: 'amber',
  },
];

export default function LearningHubView({ onNavigate }: LearningHubViewProps) {
  return (
    <div className="hub-page">
      <div className="hub-hero">
        <span className="hub-hero-icon">🎓</span>
        <h1>Learning Hub</h1>
        <p>Tools to help you study smarter — flashcards, quizzes, timers, goals, and notes all in one place.</p>
      </div>

      <div className="hub-section-label">Study tools</div>
      <div className="hub-grid">
        {TOOLS.map(card => (
          <div
            key={card.view}
            className={`hub-card hub-${card.color}`}
            onClick={() => onNavigate(card.view)}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onNavigate(card.view)}
          >
            <div className="hub-card-top">
              <div className="hub-icon">{card.icon}</div>
              <div className="hub-info">
                <div className="hub-name">{card.name}</div>
                <span className={`hub-badge hub-badge-${card.color}`}>{card.badge}</span>
              </div>
            </div>
            <div className="hub-desc">{card.desc}</div>
            <div className="hub-tags">
              {card.tags.map(t => <span key={t} className="hub-tag">{t}</span>)}
            </div>
            <div className="hub-open-btn">Open tool →</div>
          </div>
        ))}
      </div>

      <div className="hub-footer">
        Learning Hub · All data saved locally in your browser
      </div>
    </div>
  );
}
