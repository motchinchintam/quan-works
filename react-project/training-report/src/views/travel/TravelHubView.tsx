interface TravelHubViewProps {
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

const TRAVEL_TOOLS: ToolCard[] = [
  {
    view: 'itinerary',
    icon: '🗺️',
    name: 'Taiwan 2026 Itinerary',
    badge: 'Apr 29 – May 3',
    badgeColor: 'teal',
    desc: 'Day-by-day plan for the solo Taiwan trip — flights, sightseeing, food stops, and .ics export for Apple or Google Calendar.',
    color: 'teal',
  },
  {
    view: 'triptemplate',
    icon: '📋',
    name: 'Trip Templates',
    badge: 'Planning',
    badgeColor: 'blue',
    desc: 'Build reusable itinerary templates for future trips. Add days, activities, and times — then export to your calendar.',
    color: 'blue',
  },
  {
    view: 'packinglist',
    icon: '🎒',
    name: 'Packing List',
    badge: 'Organise',
    badgeColor: 'purple',
    desc: 'Build and save packing checklists by trip type — weekend, beach, business, backpacking. Never forget essentials again.',
    color: 'purple',
    soon: true,
  },
  {
    view: 'travelnotes',
    icon: '📓',
    name: 'Travel Notes',
    badge: 'Journal',
    badgeColor: 'coral',
    desc: 'Capture memories, tips, and impressions from each destination. Attach notes to specific days in your itinerary.',
    color: 'coral',
    soon: true,
  },
  {
    view: 'travelbudget',
    icon: '💱',
    name: 'Currency & Budget',
    badge: 'Money',
    badgeColor: 'amber',
    desc: 'Track daily spending in foreign currency, convert on the fly, and see how your trip budget holds up in real time.',
    color: 'amber',
    soon: true,
  },
];

const UPCOMING_TRIP = {
  destination: '🇹🇼 Taiwan',
  dates: 'Apr 29 – May 3, 2026',
  days: Math.max(0, Math.ceil((new Date('2026-04-29').getTime() - Date.now()) / 86_400_000)),
  status: 'Itinerary ready',
};

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

export default function TravelHubView({ onNavigate }: TravelHubViewProps) {
  const active = TRAVEL_TOOLS.filter(t => !t.soon);
  const soon   = TRAVEL_TOOLS.filter(t =>  t.soon);

  return (
    <div className="hub-page">

      {/* Hero */}
      <div className="hub-hero hub-teal">
        <div className="hub-icon" style={{ fontSize: '2.5rem', background: 'var(--teal-bg)', color: 'var(--teal)', borderRadius: '16px', padding: '12px', marginBottom: '1rem' }}>✈️</div>
        <h1 className="hub-hero-title">Travel Hub</h1>
        <p className="hub-hero-sub">Plan trips, save itineraries, track spending, and capture travel memories — all in one place.</p>
      </div>

      {/* Upcoming trip callout */}
      <div className="th-upcoming">
        <div className="th-upcoming-left">
          <div className="th-upcoming-label">Next Trip</div>
          <div className="th-upcoming-dest">{UPCOMING_TRIP.destination}</div>
          <div className="th-upcoming-dates">{UPCOMING_TRIP.dates}</div>
        </div>
        <div className="th-upcoming-right">
          {UPCOMING_TRIP.days > 0 ? (
            <>
              <div className="th-upcoming-countdown">{UPCOMING_TRIP.days}</div>
              <div className="th-upcoming-unit">days away</div>
            </>
          ) : (
            <div className="th-upcoming-unit">Trip completed ✓</div>
          )}
        </div>
        <button className="th-upcoming-btn" onClick={() => onNavigate('itinerary')}>
          View Itinerary →
        </button>
      </div>

      {/* Active tools */}
      <div className="hub-section-label">Trip Tools</div>
      <div className="hub-grid">
        {active.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      {/* Coming soon */}
      <div className="hub-section-label" style={{ marginTop: '1.5rem' }}>Coming Soon</div>
      <div className="hub-grid">
        {soon.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-footer">Travel Hub · Plan your next adventure</div>
    </div>
  );
}
