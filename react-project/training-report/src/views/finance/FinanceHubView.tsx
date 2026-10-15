interface FinanceHubViewProps {
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

const FINANCE_TOOLS: ToolCard[] = [
  {
    view: 'expenses',
    icon: '💸',
    name: 'Expense Tracker',
    badge: 'Daily',
    badgeColor: 'amber',
    desc: 'Log daily expenses by category — food, transport, shopping, entertainment. See totals and breakdowns at a glance.',
    color: 'amber',
  },
  {
    view: 'tripbudget',
    icon: '🧾',
    name: 'Trip Budget',
    badge: 'Travel',
    badgeColor: 'teal',
    desc: 'Set a budget for each trip, log daily spending in any currency, and track exactly how much you have left.',
    color: 'teal',
  },
  {
    view: 'savings',
    icon: '🏦',
    name: 'Savings Goals',
    badge: 'Goals',
    badgeColor: 'green',
    desc: 'Define savings targets — next trip, gadget, emergency fund — and track progress toward each goal over time.',
    color: 'green',
  },
  {
    view: 'income',
    icon: '💼',
    name: 'Income Log',
    badge: 'Earnings',
    badgeColor: 'blue',
    desc: 'Record salary, freelance, and side income by month. Compare against expenses to see your real monthly surplus.',
    color: 'blue',
    soon: true,
  },
  {
    view: 'monthbudget',
    icon: '📅',
    name: 'Monthly Budget',
    badge: 'Planning',
    badgeColor: 'purple',
    desc: 'Set spending limits per category each month. Get a visual breakdown of where your money goes and where to cut back.',
    color: 'purple',
    soon: true,
  },
  {
    view: 'bills',
    icon: '🔔',
    name: 'Bill Reminders',
    badge: 'Recurring',
    badgeColor: 'coral',
    desc: 'Track recurring bills — rent, subscriptions, utilities. Get a clear view of fixed costs and upcoming due dates.',
    color: 'coral',
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

export default function FinanceHubView({ onNavigate }: FinanceHubViewProps) {
  const active = FINANCE_TOOLS.filter(t => !t.soon);
  const soon   = FINANCE_TOOLS.filter(t =>  t.soon);

  return (
    <div className="hub-page">

      {/* Hero */}
      <div className="hub-hero hub-amber">
        <div className="hub-icon" style={{ fontSize: '2.5rem', background: 'var(--amber-bg)', color: 'var(--amber)', borderRadius: '16px', padding: '12px', marginBottom: '1rem' }}>💰</div>
        <h1 className="hub-hero-title">Finance Hub</h1>
        <p className="hub-hero-sub">Track expenses, manage budgets, and work toward savings goals — stay on top of your money.</p>
      </div>

      {/* Active tools */}
      <div className="hub-section-label">Money Tools</div>
      <div className="hub-grid">
        {active.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      {/* Coming soon */}
      <div className="hub-section-label" style={{ marginTop: '1.5rem' }}>Coming Soon</div>
      <div className="hub-grid">
        {soon.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-footer">Finance Hub · Your money, your control</div>
    </div>
  );
}
