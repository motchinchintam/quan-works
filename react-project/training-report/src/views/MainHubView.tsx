interface MainHubViewProps {
  onNavigate: (view: string) => void;
}

interface HubCard {
  view: string;
  icon: string;
  name: string;
  subtitle: string;
  desc: string;
  tools: string[];
  accent: string;
}

const HUBS: HubCard[] = [
  {
    view: 'hub',
    icon: '📊',
    name: 'Training Hub',
    subtitle: 'Reporting & Tracking',
    desc: 'Manage training programs end-to-end — attendance, test scores, KPIs, cohort pipeline, and print-ready reports.',
    tools: ['Test Tracker', 'Attendance', 'KPI Tracker', 'Cohort Dashboard', 'Print Report', 'Email Export'],
    accent: '#4A9EFF',
  },
  {
    view: 'learnhub',
    icon: '🎓',
    name: 'Learning Hub',
    subtitle: 'Skills · Languages',
    desc: 'Study SQL, TypeScript, English, and Chinese with flashcards, quizzes, Pomodoro timer, goals, and notes.',
    tools: ['Flashcards', 'Quiz Builder', 'Study Timer', 'Learning Goals', 'Study Notes'],
    accent: '#A78BFA',
  },
  {
    view: 'travelhub',
    icon: '✈️',
    name: 'Travel Hub',
    subtitle: 'Trips & Itineraries',
    desc: 'Save day-by-day itineraries, activity schedules, and trip notes. Export to Apple or Google Calendar.',
    tools: ['Taiwan 2026', 'Trip Templates'],
    accent: '#2DD4BF',
  },
  {
    view: 'financehub',
    icon: '💰',
    name: 'Finance Hub',
    subtitle: 'Budget & Expenses',
    desc: 'Track daily expenses, set trip budgets, and monitor savings goals — keep your finances clear and under control.',
    tools: ['Expense Tracker', 'Trip Budget', 'Savings Goals'],
    accent: '#FBBF24',
  },
  {
    view: 'journalhub',
    icon: '📔',
    name: 'Journal Hub',
    subtitle: 'Daily Log · Reflections',
    desc: 'Write daily journal entries, track your mood, and do weekly reviews — a quiet space for personal growth.',
    tools: ['Daily Journal', 'Mood Tracker', 'Weekly Review'],
    accent: '#F87171',
  },
];

const BOOKS = [
  { title: 'The Great Gatsby',        author: 'F. Scott Fitzgerald', emoji: '🟡' },
  { title: 'The Silence of the Lambs', author: 'Thomas Harris',       emoji: '🔴' },
];

const NEWS = [
  { name: 'ZNews',      url: 'https://znews.vn',      icon: '📰', color: '#E53935' },
  { name: 'VnExpress',  url: 'https://vnexpress.net', icon: '📖', color: '#1565C0' },
];

export default function MainHubView({ onNavigate }: MainHubViewProps) {
  const base = import.meta.env.BASE_URL;
  return (
    <div className="lp-page" style={{ backgroundImage: `url(${base}sloth-bg.jpg)` }}>
    <div className="lp-inner">

      {/* ── Hero ── */}
      <div className="lp-hero">

        {/* Left: info */}
        <div className="lp-hero-left">
          <div className="lp-available">
            <span className="lp-dot" />
            Software QA Engineer · Language Learner · Solo Traveler
          </div>
          <h1 className="lp-h1">
            Quân's<br />
            <span className="lp-h1-accent">Works</span>
          </h1>
          <p className="lp-sub">
            A personal workspace built from scratch — tools for work, study, and life, all saved in your browser.
          </p>

          {/* Social links */}
          <div className="lp-socials">
            <a
              href="https://www.facebook.com/availableeeeee/"
              target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-fb"
            >
              <span className="lp-social-icon">f</span> Facebook
            </a>
            <a
              href="https://www.instagram.com/motchinchintam"
              target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-ig"
            >
              <span className="lp-social-icon">◎</span> Instagram
            </a>
            <a
              href="https://zalo.me/0916366443"
              target="_blank" rel="noopener noreferrer"
              className="lp-social-btn lp-social-zalo"
            >
              <span className="lp-social-icon">Z</span> Zalo
            </a>
          </div>

          <button className="lp-cta" onClick={() => onNavigate('hub')}>
            Explore Tools <span className="lp-cta-arrow">→</span>
          </button>
        </div>

        {/* Right: avatar */}
        <div className="lp-hero-right">
          <div className="lp-avatar-wrap">
            <img
              src={`${base}avatar.jpg`}
              alt="Quân"
              className="lp-avatar"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="lp-divider">
        <span className="lp-divider-label">// HUBS</span>
        <div className="lp-divider-line" />
        <span className="lp-divider-count">{HUBS.length} workspaces</span>
      </div>

      {/* ── Hub Cards ── */}
      <div className="lp-hubs">
        {HUBS.map((hub, i) => (
          <div
            key={hub.view}
            className="lp-hub-card"
            style={{ '--hub-accent': hub.accent } as React.CSSProperties}
            onClick={() => onNavigate(hub.view)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onNavigate(hub.view)}
          >
            <div className="lp-hub-num">0{i + 1}</div>
            <div className="lp-hub-body">
              <div className="lp-hub-top">
                <span className="lp-hub-icon">{hub.icon}</span>
                <div>
                  <div className="lp-hub-name">{hub.name}</div>
                  <div className="lp-hub-subtitle">{hub.subtitle}</div>
                </div>
              </div>
              <p className="lp-hub-desc">{hub.desc}</p>
              <div className="lp-hub-tools">
                {hub.tools.map(t => <span key={t} className="lp-hub-chip">{t}</span>)}
              </div>
            </div>
            <div className="lp-hub-enter">Enter <span>→</span></div>
          </div>
        ))}
      </div>

      {/* ── Personal sections ── */}
      <div className="lp-divider" style={{ marginTop: '2rem' }}>
        <span className="lp-divider-label">// PERSONAL</span>
        <div className="lp-divider-line" />
      </div>

      <div className="lp-extras">

        {/* Favourite Books */}
        <div className="lp-extra-card">
          <div className="lp-extra-heading">📚 Favourite Books</div>
          <div className="lp-book-list">
            {BOOKS.map(b => (
              <div key={b.title} className="lp-book-row">
                <span className="lp-book-dot" style={{ background: b.emoji === '🟡' ? '#F59E0B' : '#EF4444' }} />
                <div>
                  <div className="lp-book-title">{b.title}</div>
                  <div className="lp-book-author">{b.author}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News */}
        <div className="lp-extra-card">
          <div className="lp-extra-heading">📰 Daily News</div>
          <p className="lp-extra-sub">Quick links to trusted Vietnamese news sources</p>
          <div className="lp-news-list">
            {NEWS.map(n => (
              <a
                key={n.name}
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lp-news-btn"
                style={{ '--news-color': n.color } as React.CSSProperties}
              >
                <span>{n.icon}</span>
                <span>{n.name}</span>
                <span className="lp-news-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="lp-footer">
        <span>Quân's Works</span>
        <span className="lp-footer-dot">·</span>
        <span>All data saved locally in your browser</span>
        <span className="lp-footer-dot">·</span>
        <span>Built with React + TypeScript</span>
      </div>
    </div>
    </div>
  );
}
