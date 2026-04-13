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
}

const TRAVEL_TOOLS: ToolCard[] = [
  {
    view: 'itinerary',
    icon: '🗺️',
    name: 'Trip Itinerary',
    badge: 'Taiwan 2026',
    badgeColor: 'teal',
    desc: 'Day-by-day itinerary for Solo Taiwan Trip — Apr 29 to May 3, 2026. Includes flights, sightseeing, food stops, and calendar export.',
    color: 'teal',
  },
  {
    view: 'triptemplate',
    icon: '📋',
    name: 'Trip Templates',
    badge: 'Planning',
    badgeColor: 'blue',
    desc: 'Create and save itinerary templates for future trips. Add days, activities, times, and export to Apple or Google Calendar.',
    color: 'blue',
  },
];

function ToolCardItem({ card, onNavigate }: { card: ToolCard; onNavigate: (v: string) => void }) {
  return (
    <div className={`hub-card hub-${card.color}`} onClick={() => onNavigate(card.view)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onNavigate(card.view)}>
      <div className="hub-card-top">
        <span className="hub-icon">{card.icon}</span>
        <div>
          <div className="hub-card-name">{card.name}</div>
          <span className={`hub-badge hub-badge-${card.badgeColor}`}>{card.badge}</span>
        </div>
      </div>
      <p className="hub-card-desc">{card.desc}</p>
      <div className="hub-open-btn">Open →</div>
    </div>
  );
}

export default function TravelHubView({ onNavigate }: TravelHubViewProps) {
  return (
    <div className="hub-page">
      <div className="hub-hero hub-teal">
        <div className="hub-icon" style={{ fontSize: '2.5rem', background: 'var(--teal-bg)', color: 'var(--teal)', borderRadius: '16px', padding: '12px', marginBottom: '1rem' }}>✈️</div>
        <h1 className="hub-hero-title">Travel Hub</h1>
        <p className="hub-hero-sub">Plan your trips, save itineraries, and keep track of travel adventures — all in one place.</p>
      </div>

      <div className="hub-section-label">Trip Tools</div>
      <div className="hub-grid">
        {TRAVEL_TOOLS.map(c => <ToolCardItem key={c.view} card={c} onNavigate={onNavigate} />)}
      </div>

      <div className="hub-footer">Travel Hub · Plan your next adventure</div>
    </div>
  );
}
