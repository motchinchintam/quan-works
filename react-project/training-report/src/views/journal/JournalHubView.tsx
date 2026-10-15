interface JournalHubViewProps {
  onNavigate: (view: string) => void;
}

interface ToolCard {
  view: string;
  icon: string;
  name: string;
  badge: string;
  badgeColor: string;
  desc: string;
  color: string;
  soon?: boolean;
}

const JOURNAL_TOOLS: ToolCard[] = [
  {
    view: 'dailyjournal',
    icon: '✍️',
    name: 'Daily Journal',
    badge: 'Writing',
    badgeColor: 'coral',
    desc: 'Write daily entries — what happened, what you felt, what you learned. Build a quiet habit of reflection.',
    color: 'coral',
  },
  {
    view: 'moodtracker',
    icon: '🌡️',
    name: 'Mood Tracker',
    badge: 'Wellbeing',
    badgeColor: 'amber',
    desc: 'Log your daily mood and energy levels. Spot patterns over time and understand what affects you most.',
    color: 'amber',
  },
  {
    view: 'weeklyreview',
    icon: '📊',
    name: 'Weekly Review',
    badge: 'Reflection',
    badgeColor: 'blue',
    desc: 'End each week with a structured review — wins, struggles, lessons learned, and intentions for next week.',
    color: 'blue',
  },
  {
    view: 'habittracker',
    icon: '🔁',
    name: 'Habit Tracker',
    badge: 'Consistency',
    badgeColor: 'green',
    desc: 'Track daily habits and streaks — exercise, reading, language practice. Build the routines that matter.',
    color: 'green',
    soon: true,
  },
  {
    view: 'gratitude',
    icon: '🌱',
    name: 'Gratitude Log',
    badge: 'Mindfulness',
    badgeColor: 'teal',
    desc: 'Write three things you are grateful for each day. A small practice with a measurable effect on wellbeing.',
    color: 'teal',
    soon: true,
  },
  {
    view: 'yearreview',
    icon: '🗓️',
    name: 'Year in Review',
    badge: 'Annual',
    badgeColor: 'purple',
    desc: 'An annual guided reflection — highlights, lessons, goals completed, and intentions for the year ahead.',
    color: 'purple',
    soon: true,
  },
];

function ToolCardItem({ card, onNavigate }: { card: ToolCard; onNavigate: (v: string) => void }) {
  return (
    <div
      className={`hub-card hub-${card.color}`}
      onClick={() => !card.soon && onNavigate(card.view)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && !card.soon && onNavigate(card.view)}
      style={card.soon ? { opacity: .55, cursor: 'default' } : {}}
    >
      <div className="hub-card-top">
        <span className="hub-icon">{card.icon}</span>
        <div>
          <div className="hub-card-name">{card.name}</div>
          <span className={`hub-badge hub-badge-${card.badgeColor}`}>
            {card.soon ? '🔒 Coming Soon' : card.badge}
          </span>
        </div>
      </div>
      <p className="hub-card-desc">{card.desc}</p>
      {!card.soon && <div className="hub-open-btn">Open →</div>}
    </div>
  );
}

export default function JournalHubView({ onNavigate }: JournalHubViewProps) {
  const active = JOURNAL_TOOLS.filter(t => !t.soon);
  const soon   = JOURNAL_TOOLS.filter(t =>  t.soon);

  return (
    <div className="hub-page">

      {/* Hero */}
      <div className="hub-hero hub-coral">
        <div className="hub-icon" style={{ fontSize: '2.5rem', background: 'var(--coral-bg)', color: 'var(--coral)', borderRadius: '16px', padding: '12px', marginBottom: '1rem' }}>📔</div>
        <h1 className="hub-hero-title">Journal Hub</h1>
        <p className="hub-hero-sub">A quiet space for daily writing, mood tracking, and weekly reflection — personal growth one entry at a time.</p>
      </div>

      {/* Active tools */}
      <div className="hub-section-label">Reflection Tools</div>
      <div className="hub-grid">
        {active.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      {/* Coming soon */}
      <div className="hub-section-label" style={{ marginTop: '1.5rem' }}>Coming Soon</div>
      <div className="hub-grid">
        {soon.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-footer">Journal Hub · Write it down, grow from it</div>
    </div>
  );
}
