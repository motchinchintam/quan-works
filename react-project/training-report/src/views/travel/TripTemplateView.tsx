import { useState, useEffect } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type ActivityType = 'flight' | 'transport' | 'food' | 'sightseeing' | 'hotel' | 'note' | 'optional';

interface TripActivity {
  id: string;
  time: string;
  text: string;
  type: ActivityType;
  notes: string;
}

interface TripDay {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  activities: TripActivity[];
}

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  emoji: string;
  notes: string;
  days: TripDay[];
  createdAt: string;
}

// ─── Storage ──────────────────────────────────────────────────────────────────
const LS_KEY = 'travel_hub_trips';
function loadTrips(): Trip[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function saveTrips(trips: Trip[]) { localStorage.setItem(LS_KEY, JSON.stringify(trips)); }
function uid() { return Math.random().toString(36).slice(2, 10); }

// ─── Constants ────────────────────────────────────────────────────────────────
const ACTIVITY_TYPES: { value: ActivityType; label: string; icon: string }[] = [
  { value: 'flight',      label: 'Flight',      icon: '✈️' },
  { value: 'transport',   label: 'Transport',   icon: '🚌' },
  { value: 'food',        label: 'Food',        icon: '🍜' },
  { value: 'sightseeing', label: 'Sightseeing', icon: '📸' },
  { value: 'hotel',       label: 'Hotel',       icon: '🏨' },
  { value: 'optional',    label: 'Optional',    icon: '💡' },
  { value: 'note',        label: 'Note',        icon: '📋' },
];

const TYPE_ICON: Record<ActivityType, string> = {
  flight: '✈️', transport: '🚌', food: '🍜',
  sightseeing: '📸', hotel: '🏨', optional: '💡', note: '📋',
};

const EMOJIS = ['✈️','🗺️','🏖️','🏔️','🌏','🎌','🇻🇳','🇯🇵','🇰🇷','🇹🇭','🇸🇬','🇪🇺','🌴','🏝️','🗼'];

// ─── ICS Export ───────────────────────────────────────────────────────────────
function exportTripICS(trip: Trip) {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Quan Works//Travel Hub//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    `X-WR-CALNAME:${trip.title}`,
  ];
  for (const day of trip.days) {
    for (const act of day.activities) {
      if (!act.text.trim()) continue;
      const d = day.date.replace(/-/g, '');
      const timeStr = act.time.replace(':', '') || '0800';
      const dtstart = `${d}T${timeStr.padStart(4,'0')}00`;
      const [hh, mm] = [parseInt(timeStr.slice(0,2)||'8'), parseInt(timeStr.slice(2,4)||'0')];
      const endMin = hh * 60 + mm + 60;
      const endStr = `${String(Math.floor(endMin/60)).padStart(2,'0')}${String(endMin%60).padStart(2,'0')}`;
      const dtend = `${d}T${endStr}00`;
      lines.push('BEGIN:VEVENT');
      lines.push(`DTSTART:${dtstart}`);
      lines.push(`DTEND:${dtend}`);
      lines.push(`SUMMARY:${TYPE_ICON[act.type]} ${act.text}`);
      if (act.notes) lines.push(`DESCRIPTION:${act.notes.replace(/\n/g,'\\n')}`);
      lines.push(`UID:trip-${trip.id}-${act.id}@quanworks`);
      lines.push('END:VEVENT');
    }
  }
  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${trip.title.toLowerCase().replace(/\s+/g,'-')}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function TripCard({ trip, onOpen, onDelete }: { trip: Trip; onOpen: () => void; onDelete: () => void }) {
  const totalActs = trip.days.reduce((s, d) => s + d.activities.length, 0);
  return (
    <div className="tpl-card">
      <div className="tpl-card-top">
        <span className="tpl-card-emoji">{trip.emoji}</span>
        <div className="tpl-card-info">
          <div className="tpl-card-title">{trip.title}</div>
          <div className="tpl-card-dest">📍 {trip.destination}</div>
        </div>
        <button className="btn-icon" onClick={e => { e.stopPropagation(); onDelete(); }} title="Delete trip">🗑</button>
      </div>
      <div className="tpl-card-meta">
        {trip.startDate && <span>📅 {trip.startDate}{trip.endDate ? ` → ${trip.endDate}` : ''}</span>}
        <span>🗓 {trip.days.length} day{trip.days.length !== 1 ? 's' : ''}</span>
        <span>📌 {totalActs} activit{totalActs !== 1 ? 'ies' : 'y'}</span>
      </div>
      {trip.notes && <p className="tpl-card-notes">{trip.notes}</p>}
      <button className="tpl-open-btn" onClick={onOpen}>Open Trip →</button>
    </div>
  );
}

function ActivityRow({
  act, onChange, onDelete,
}: {
  act: TripActivity;
  onChange: (updated: TripActivity) => void;
  onDelete: () => void;
}) {
  return (
    <div className="tpl-act-row">
      <span className="tpl-act-icon">{TYPE_ICON[act.type]}</span>
      <input
        className="tpl-input tpl-input-time"
        placeholder="Time"
        value={act.time}
        onChange={e => onChange({ ...act, time: e.target.value })}
      />
      <input
        className="tpl-input tpl-input-text"
        placeholder="Activity description..."
        value={act.text}
        onChange={e => onChange({ ...act, text: e.target.value })}
      />
      <select
        className="tpl-select"
        value={act.type}
        onChange={e => onChange({ ...act, type: e.target.value as ActivityType })}
      >
        {ACTIVITY_TYPES.map(t => (
          <option key={t.value} value={t.value}>{t.icon} {t.label}</option>
        ))}
      </select>
      <input
        className="tpl-input tpl-input-notes"
        placeholder="Notes (optional)"
        value={act.notes}
        onChange={e => onChange({ ...act, notes: e.target.value })}
      />
      <button className="btn-icon" onClick={onDelete} title="Remove activity">✕</button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TripTemplateView() {
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips());
  const [screen, setScreen] = useState<'list' | 'new' | 'edit'>('list');
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => { saveTrips(trips); }, [trips]);

  // ── New trip form state
  const blankForm = { title: '', destination: '', startDate: '', endDate: '', emoji: '✈️', notes: '' };
  const [form, setForm] = useState(blankForm);

  function createTrip() {
    if (!form.title.trim()) return;
    const newTrip: Trip = {
      id: uid(),
      ...form,
      days: [],
      createdAt: new Date().toISOString(),
    };
    const updated = [newTrip, ...trips];
    setTrips(updated);
    setActiveTrip(newTrip);
    setScreen('edit');
    setForm(blankForm);
  }

  function deleteTrip(id: string) {
    if (!confirm('Delete this trip?')) return;
    setTrips(trips.filter(t => t.id !== id));
  }

  function updateTrip(updated: Trip) {
    setTrips(trips.map(t => t.id === updated.id ? updated : t));
    setActiveTrip(updated);
  }

  function addDay(trip: Trip) {
    const day: TripDay = {
      id: uid(),
      dayNumber: trip.days.length + 1,
      date: '',
      title: `Day ${trip.days.length + 1}`,
      activities: [],
    };
    updateTrip({ ...trip, days: [...trip.days, day] });
  }

  function updateDay(trip: Trip, dayId: string, updated: Partial<TripDay>) {
    updateTrip({ ...trip, days: trip.days.map(d => d.id === dayId ? { ...d, ...updated } : d) });
  }

  function deleteDay(trip: Trip, dayId: string) {
    updateTrip({ ...trip, days: trip.days.filter(d => d.id !== dayId) });
  }

  function addActivity(trip: Trip, dayId: string) {
    const act: TripActivity = { id: uid(), time: '', text: '', type: 'sightseeing', notes: '' };
    updateTrip({
      ...trip,
      days: trip.days.map(d => d.id === dayId ? { ...d, activities: [...d.activities, act] } : d),
    });
  }

  function updateActivity(trip: Trip, dayId: string, updated: TripActivity) {
    updateTrip({
      ...trip,
      days: trip.days.map(d =>
        d.id === dayId
          ? { ...d, activities: d.activities.map(a => a.id === updated.id ? updated : a) }
          : d
      ),
    });
  }

  function deleteActivity(trip: Trip, dayId: string, actId: string) {
    updateTrip({
      ...trip,
      days: trip.days.map(d =>
        d.id === dayId ? { ...d, activities: d.activities.filter(a => a.id !== actId) } : d
      ),
    });
  }

  // ── Screens ──
  if (screen === 'new') {
    return (
      <div className="tpl-page">
        <div className="tpl-page-header">
          <button className="itin-nav-btn" onClick={() => setScreen('list')}>← Back</button>
          <h2 className="tpl-page-title">New Trip</h2>
        </div>

        <div className="tpl-form-card">
          <div className="tpl-emoji-row">
            <button className="tpl-emoji-btn" onClick={() => setShowEmojiPicker(p => !p)}>{form.emoji}</button>
            {showEmojiPicker && (
              <div className="tpl-emoji-picker">
                {EMOJIS.map(e => (
                  <button key={e} className="tpl-emoji-opt" onClick={() => { setForm(f => ({ ...f, emoji: e })); setShowEmojiPicker(false); }}>{e}</button>
                ))}
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div className="tpl-form-label">Trip Name *</div>
              <input className="tpl-input" placeholder="e.g. Japan Spring 2026" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
          </div>

          <div className="tpl-form-grid">
            <div>
              <div className="tpl-form-label">Destination</div>
              <input className="tpl-input" placeholder="e.g. Tokyo, Japan" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
            </div>
            <div>
              <div className="tpl-form-label">Start Date</div>
              <input type="date" className="tpl-input" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div>
              <div className="tpl-form-label">End Date</div>
              <input type="date" className="tpl-input" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} />
            </div>
          </div>

          <div>
            <div className="tpl-form-label">Notes / Description</div>
            <textarea className="note-textarea" rows={3} placeholder="Trip overview, budget, packing reminders..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>

          <div className="tpl-form-actions">
            <button className="tpl-create-btn" onClick={createTrip} disabled={!form.title.trim()}>Create Trip & Add Days →</button>
            <button className="btn-ghost" onClick={() => setScreen('list')}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'edit' && activeTrip) {
    const trip = trips.find(t => t.id === activeTrip.id) ?? activeTrip;
    return (
      <div className="tpl-page">
        <div className="tpl-page-header">
          <button className="itin-nav-btn" onClick={() => setScreen('list')}>← All Trips</button>
          <div style={{ flex: 1 }}>
            <h2 className="tpl-page-title">{trip.emoji} {trip.title}</h2>
            {trip.destination && <div className="tpl-card-dest">📍 {trip.destination} {trip.startDate && `· ${trip.startDate}${trip.endDate ? ` – ${trip.endDate}` : ''}`}</div>}
          </div>
          <button className="itin-export-btn" onClick={() => exportTripICS(trip)} title="Export to Apple/Google Calendar">📅 Export</button>
        </div>

        {/* Trip-level notes */}
        {trip.notes && <div className="tpl-trip-notes">{trip.notes}</div>}

        {/* Days */}
        {trip.days.map(day => (
          <div key={day.id} className="tpl-day-block">
            <div className="tpl-day-header">
              <span className="tpl-day-num">Day {day.dayNumber}</span>
              <input
                className="tpl-input tpl-day-title-input"
                placeholder="Day title..."
                value={day.title}
                onChange={e => updateDay(trip, day.id, { title: e.target.value })}
              />
              <input
                type="date"
                className="tpl-input tpl-day-date-input"
                value={day.date}
                onChange={e => updateDay(trip, day.id, { date: e.target.value })}
              />
              <button className="btn-icon" onClick={() => deleteDay(trip, day.id)} title="Delete day">🗑</button>
            </div>

            <div className="tpl-activities">
              {day.activities.map(act => (
                <ActivityRow
                  key={act.id}
                  act={act}
                  onChange={updated => updateActivity(trip, day.id, updated)}
                  onDelete={() => deleteActivity(trip, day.id, act.id)}
                />
              ))}
              {day.activities.length === 0 && (
                <div className="tpl-empty-day">No activities yet — add one below</div>
              )}
            </div>

            <button className="tpl-add-act-btn" onClick={() => addActivity(trip, day.id)}>+ Add Activity</button>
          </div>
        ))}

        <button className="tpl-add-day-btn" onClick={() => addDay(trip)}>+ Add Day</button>

        {trip.days.length === 0 && (
          <div className="tpl-empty-trip">
            <span style={{ fontSize: '2.5rem' }}>🗓</span>
            <p>No days yet. Click <strong>+ Add Day</strong> to start building your itinerary.</p>
          </div>
        )}
      </div>
    );
  }

  // ── List screen (default)
  return (
    <div className="tpl-page">
      <div className="tpl-page-header">
        <div>
          <h2 className="tpl-page-title">Trip Templates</h2>
          <div className="tpl-page-sub">Plan and save itineraries for future trips</div>
        </div>
        <button className="tpl-create-btn" onClick={() => setScreen('new')}>+ New Trip</button>
      </div>

      {trips.length === 0 ? (
        <div className="tpl-empty-trip">
          <span style={{ fontSize: '3rem' }}>✈️</span>
          <p>No trips saved yet.</p>
          <button className="tpl-create-btn" onClick={() => setScreen('new')}>Plan Your First Trip</button>
        </div>
      ) : (
        <div className="tpl-grid">
          {trips.map(trip => (
            <TripCard
              key={trip.id}
              trip={trip}
              onOpen={() => { setActiveTrip(trip); setScreen('edit'); }}
              onDelete={() => deleteTrip(trip.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
