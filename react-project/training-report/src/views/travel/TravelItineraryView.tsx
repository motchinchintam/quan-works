import { useState } from 'react';

interface Activity {
  time?: string;
  text: string;
  type?: 'transport' | 'food' | 'sightseeing' | 'hotel' | 'note' | 'optional' | 'flight';
  sub?: string[];
}

interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  emoji: string;
  title: string;
  activities: Activity[];
}

const ITINERARY: DayPlan[] = [
  {
    day: 1,
    date: 'April 29, 2026',
    weekday: 'Wednesday',
    emoji: '✈️',
    title: 'Departure & Late Arrival',
    activities: [
      {
        time: '6:05 PM', text: 'Flight departs Ho Chi Minh City (Tan Son Nhat Airport)', type: 'flight',
        sub: ['Arrive at airport at least 2–2.5 hours early (~3:30–4:00 PM)']
      },
      { time: '10:35 PM', text: 'Arrival at Taoyuan Airport, Taipei', type: 'transport' },
      {
        time: '~11:20 PM', text: 'Taoyuan Airport → Taipei Main Station', type: 'transport',
        sub: ['MRT Airport Express: ~35–40 min', 'Buy Easy Card at airport MRT station']
      },
      {
        time: '~11:40 PM', text: 'Hostel Check-in: Taiwan Youth Hostel — Zhongzheng District',
        type: 'hotel',
        sub: ['~2 min walk from Taipei Main Station via exit M8', 'Also available at nearby 7/11 and FamilyMart: Easy Card top-up, late-night snacks']
      },
      {
        time: 'Late night', text: 'Optional: Quick snack near hostel', type: 'optional',
        sub: ['FamilyMart / 7-Eleven right outside Taipei Main Station', 'Ximending (10–15 min) may still be open late — boba, scallion pancake', 'Rest early — big Day 2 ahead!']
      },
    ],
  },
  {
    day: 2,
    date: 'April 30, 2026',
    weekday: 'Thursday',
    emoji: '🌸',
    title: 'CKS Memorial, Food Trip & Tamsui Sunset',
    activities: [
      {
        time: '6:00 AM', text: 'Optional Breakfast: Fuhang Soy Milk (Zhongzheng District)',
        type: 'food',
        sub: ['12 min walk from hostel', 'Leave early — long line is expected!']
      },
      { time: '8:00 AM', text: 'Chiang Kai-shek Memorial Hall (Zhongzheng District)', type: 'sightseeing', sub: ['12 min walk from hostel'] },
      { time: '9:40 AM', text: 'Rongjin Gorgeous Time', type: 'sightseeing', sub: ['Historic Japanese style photo spots'] },
      {
        time: '10:30 AM', text: 'Yongkang Street Food Trip', type: 'food',
        sub: ['5 min walk from Rongjin Gorgeous Time']
      },
      { time: '', text: 'Optional: Walk to Daan Forest Park — relax & photos (15 min walk from Yongkang Street)', type: 'optional' },
      {
        time: '12:00 PM', text: 'Taipei 101 + Rainbow Walk', type: 'sightseeing',
        sub: [
          'Photo Spots: Taipei 101 Rainbow Walk, Taipei City Hall Bus Station Staircase, No. 88 Songao Road, Tao Zhu Yin Yuan, Takemura Izakaya Street',
          'Quick mall stroll (Taipei 101, GU, NET)',
          'Optional food stop: Ichiran Ramen, Cha Kee Noodle, HANNA Pasta Café, Kai Kai Dessert',
          'NOTE: CKS to Taipei 101 route may be done via KLOOK Tour Bus'
        ]
      },
      {
        time: '2:30 PM', text: 'Travel to Tamsui', type: 'transport',
        sub: ['Taipei 101 / Taipei Main → Tamsui Station', 'Travel time: 40–45 min']
      },
      {
        time: '3:30 PM', text: 'Tamsui Old Street', type: 'sightseeing',
        sub: ['Explore Tamsui Old Street and Baywalk', 'Optional Food Stop: 大塊牛排-淡水店 — Steak near Tamsui Station (~5 min walk)']
      },
      {
        time: '4:30 PM', text: "Sunset at Tamsui Fisherman's Wharf / Lover's Bridge / Bali", type: 'sightseeing',
        sub: [
          'Best golden hour photos',
          "Take a ferry from Tamsui Old Street to Fisherman's Wharf (~15–20 min), or bus (~30–45 min)"
        ]
      },
      { time: '7:00 PM', text: 'Take Bus 947 to Banqiao Station Square', type: 'transport' },
      { time: '8:30 PM', text: 'Banqiao Christmas Land', type: 'sightseeing', sub: ['Giant Christmas tree and light shows'] },
    ],
  },
  {
    day: 3,
    date: 'May 1, 2026',
    weekday: 'Friday',
    emoji: '🚌',
    title: 'Yehliu + Shifen + Jiufen KLOOK Tour + Ximending',
    activities: [
      {
        time: 'Morning', text: 'Optional Food Stops (1–8 min walk from hostel)', type: 'food',
        sub: ['Master of Rice Ball', 'GooDonut', 'Liu Shandong Beef Noodles', 'Fuzhou Ancestral Pepper Cake']
      },
      {
        time: '11:05 AM', text: 'KLOOK Yehliu, Shifen & Jiufen Night Tour', type: 'sightseeing',
        sub: [
          'Departure: Taipei Main Station M4',
          '• Yehliu Geopark',
          '• Shifen Old Street',
          '• Shifen Waterfall',
          '• Jiufen Old Street'
        ]
      },
      { time: '8:30 PM', text: 'Drop-off at Taipei Main Station M3', type: 'transport' },
      {
        time: '9:00 PM', text: 'Ximending Night Stroll', type: 'sightseeing',
        sub: [
          '• Xin Fu Tang brown sugar boba milk tea',
          '• Scallion pancake',
          '• Crispy Donut',
          '• The Red House',
          'Pasalubong Shops: Carrefour, Mr. Ho'
        ]
      },
      {
        time: '', text: 'Raohe Night Market (moved from Day 1)', type: 'optional',
        sub: ['Try famous street food', 'Songshan Ciyou Temple', '~30 min from hostel']
      },
    ],
  },
  {
    day: 4,
    date: 'May 2, 2026',
    weekday: 'Saturday',
    emoji: '☕',
    title: 'Maokong Gondola, Zhongshan Cafés & Huashan',
    activities: [
      {
        time: '8:00 AM', text: 'Maokong Gondola', type: 'sightseeing',
        sub: ['Scenic ride', 'Tea spots']
      },
      {
        time: '11:00 AM', text: 'Zhongshan District Café Hopping', type: 'food',
        sub: ['% Arabica', 'Coffee Dumbo', 'R9 Café', 'Coach Play Café', 'Fujin Tree Café', 'Jin Din Rou → 15 min walk from Fujin Tree Café']
      },
      {
        time: '', text: "Optional Food Stop: Ajito Ramen, Comfort Burger Company, I'm donut?, Fourninetine Bakery",
        type: 'optional'
      },
      {
        time: '2:30 PM', text: 'Huashan 1914 Creative Park', type: 'sightseeing',
        sub: ['Exhibits', 'Photo areas', 'Indie shops']
      },
      {
        time: '', text: 'Optional Evening Activities', type: 'optional',
        sub: [
          'Miramar Entertainment Park → ferris wheel at night',
          'Taipei Sightseeing Bus (Klook) → city tour at night',
          'Return to hostel by 8:00–9:00 PM (early start tomorrow!)'
        ]
      },
      {
        time: '⚠️ Tonight', text: 'Pack & prepare for early morning airport trip', type: 'note',
        sub: ['Set alarm for 4:30–5:00 AM', 'Flight departs at 7:40 AM — leave hostel by 5:00–5:15 AM']
      },
    ],
  },
  {
    day: 5,
    date: 'May 3, 2026',
    weekday: 'Sunday',
    emoji: '🛫',
    title: 'Early Departure — Flight Back to Ho Chi Minh City',
    activities: [
      {
        time: '4:30 AM', text: 'Wake up & check out of hostel', type: 'hotel',
        sub: ['Check out, collect luggage', 'Grab convenience store breakfast on the way']
      },
      {
        time: '5:00–5:15 AM', text: 'Depart hostel → Taipei Main Station', type: 'transport',
        sub: ['Walk ~2 min to Taipei Main Station via exit M8']
      },
      {
        time: '5:15–5:20 AM', text: 'Taipei Main Station → Taoyuan Airport (MRT)', type: 'transport',
        sub: ['Airport Express: ~35–40 min', 'Arrive airport ~6:00 AM']
      },
      {
        time: '6:00 AM', text: 'Airport check-in & security', type: 'transport',
        sub: ['Allow 1.5 hours before departure for check-in and security']
      },
      {
        time: '7:40 AM', text: 'Flight departs Taipei (Taoyuan Airport) → Ho Chi Minh City', type: 'flight'
      },
      {
        time: '10:15 AM', text: 'Arrival at Tan Son Nhat Airport, Ho Chi Minh City', type: 'flight',
        sub: ['End of Taiwan trip!']
      },
    ],
  },
];

// ─── ICS Export ───────────────────────────────────────────────────────────────
interface CalEvent {
  dtstart: string;
  dtend: string;
  summary: string;
  description?: string;
  location?: string;
}

function pad(n: number) { return String(n).padStart(2, '0'); }
function toIcsDate(year: number, month: number, day: number, hour: number, min: number) {
  return `${year}${pad(month)}${pad(day)}T${pad(hour)}${pad(min)}00`;
}

function generateICS(events: CalEvent[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Quan Works//Travel Hub//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Taiwan Trip 2026',
    'X-WR-TIMEZONE:Asia/Ho_Chi_Minh',
  ];
  for (const ev of events) {
    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART;TZID=Asia/Ho_Chi_Minh:${ev.dtstart}`);
    lines.push(`DTEND;TZID=Asia/Ho_Chi_Minh:${ev.dtend}`);
    lines.push(`SUMMARY:${ev.summary}`);
    if (ev.description) lines.push(`DESCRIPTION:${ev.description.replace(/\n/g, '\\n')}`);
    if (ev.location) lines.push(`LOCATION:${ev.location}`);
    lines.push(`UID:taiwan-2026-${ev.dtstart}-${Math.random().toString(36).slice(2)}@quanworks`);
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

// All times in Ho Chi Minh City local time (UTC+7), Taipei is UTC+8 (+1 hr)
// Flight HCM→TPE: departs 18:05 HCM (UTC+7) = arrives 22:35 TPE (UTC+8) — 3.5 hrs flight
// Flight TPE→HCM: departs 07:40 TPE (UTC+8) = arrives 10:15 HCM (UTC+7) — 3h35m flight
const CALENDAR_EVENTS: CalEvent[] = [
  // Day 1 — Apr 29
  { dtstart: toIcsDate(2026,4,29,18,5),  dtend: toIcsDate(2026,4,29,21,35), summary: '✈️ Flight — Ho Chi Minh City → Taipei', location: 'Tan Son Nhat International Airport, Ho Chi Minh City' },
  { dtstart: toIcsDate(2026,4,29,21,35), dtend: toIcsDate(2026,4,29,22,20), summary: '🛬 Arrival at Taoyuan Airport', description: 'Take MRT Airport Express to Taipei Main Station (~40 min). Buy Easy Card.', location: 'Taiwan Taoyuan International Airport' },
  { dtstart: toIcsDate(2026,4,29,22,20), dtend: toIcsDate(2026,4,29,23,0),  summary: '🚇 Airport → Taipei Main Station (MRT)', description: 'Airport Express ~35-40 min. Buy Easy Card at MRT station.' },
  { dtstart: toIcsDate(2026,4,29,23,0),  dtend: toIcsDate(2026,4,29,23,30), summary: '🏨 Check-in: Taiwan Youth Hostel', location: 'Taiwan Youth Hostel, Zhongzheng District, Taipei' },
  // Day 2 — Apr 30
  { dtstart: toIcsDate(2026,4,30,6,0),  dtend: toIcsDate(2026,4,30,7,0),  summary: '🥛 Fuhang Soy Milk Breakfast (Optional)', description: 'Leave early — long line expected!', location: 'Fuhang Soy Milk, Zhongzheng District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,8,0),  dtend: toIcsDate(2026,4,30,9,30), summary: '🏛️ Chiang Kai-shek Memorial Hall', location: 'Chiang Kai-shek Memorial Hall, Zhongzheng, Taipei' },
  { dtstart: toIcsDate(2026,4,30,9,40), dtend: toIcsDate(2026,4,30,10,30),summary: '📸 Rongjin Gorgeous Time', description: 'Historic Japanese style photo spots.' },
  { dtstart: toIcsDate(2026,4,30,10,30),dtend: toIcsDate(2026,4,30,12,0), summary: '🍜 Yongkang Street Food Trip', location: 'Yongkang Street, Da\'an District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,12,0), dtend: toIcsDate(2026,4,30,14,30),summary: '🏙️ Taipei 101 + Rainbow Walk', location: 'Taipei 101, Xinyi District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,14,30),dtend: toIcsDate(2026,4,30,15,30),summary: '🚇 Travel to Tamsui', description: 'Taipei Main → Tamsui Station. ~40-45 min.' },
  { dtstart: toIcsDate(2026,4,30,15,30),dtend: toIcsDate(2026,4,30,16,30),summary: '🏘️ Tamsui Old Street', location: 'Tamsui Old Street, Tamsui District, New Taipei' },
  { dtstart: toIcsDate(2026,4,30,16,30),dtend: toIcsDate(2026,4,30,19,0), summary: "🌅 Sunset at Tamsui Fisherman's Wharf", location: "Fisherman's Wharf, Tamsui, New Taipei" },
  { dtstart: toIcsDate(2026,4,30,19,0), dtend: toIcsDate(2026,4,30,19,30),summary: '🚌 Bus 947 to Banqiao Station Square' },
  { dtstart: toIcsDate(2026,4,30,20,30),dtend: toIcsDate(2026,4,30,22,0), summary: '🎄 Banqiao Christmas Land', location: 'Banqiao Station Square, New Taipei' },
  // Day 3 — May 1
  { dtstart: toIcsDate(2026,5,1,11,5),  dtend: toIcsDate(2026,5,1,20,30), summary: '🗺️ KLOOK Tour: Yehliu + Shifen + Jiufen', description: 'Departure: Taipei Main Station M4. Yehliu Geopark, Shifen Old Street, Shifen Waterfall, Jiufen Old Street.', location: 'Taipei Main Station M4, Taipei' },
  { dtstart: toIcsDate(2026,5,1,21,0),  dtend: toIcsDate(2026,5,1,23,0),  summary: '🌃 Ximending Night Stroll', location: 'Ximending, Wanhua District, Taipei' },
  // Day 4 — May 2
  { dtstart: toIcsDate(2026,5,2,8,0),   dtend: toIcsDate(2026,5,2,10,0),  summary: '🚡 Maokong Gondola', location: 'Maokong Gondola, Wenshan District, Taipei' },
  { dtstart: toIcsDate(2026,5,2,11,0),  dtend: toIcsDate(2026,5,2,14,0),  summary: '☕ Zhongshan District Café Hopping', location: 'Zhongshan District, Taipei' },
  { dtstart: toIcsDate(2026,5,2,14,30), dtend: toIcsDate(2026,5,2,17,0),  summary: '🎨 Huashan 1914 Creative Park', location: 'Huashan 1914 Creative Park, Taipei' },
  // Day 5 — May 3 (times shown in HCM = Taipei -1hr)
  { dtstart: toIcsDate(2026,5,3,3,30),  dtend: toIcsDate(2026,5,3,4,15),  summary: '⏰ Wake up & Check out — Early Airport Departure', description: 'Depart hostel by 5:00-5:15 AM Taipei time. Grab convenience store breakfast.', location: 'Taiwan Youth Hostel, Zhongzheng District, Taipei' },
  { dtstart: toIcsDate(2026,5,3,4,15),  dtend: toIcsDate(2026,5,3,5,0),   summary: '🚇 Taipei Main Station → Taoyuan Airport (MRT)', description: 'Airport Express ~35-40 min. Arrive airport ~6:00 AM Taipei time.' },
  { dtstart: toIcsDate(2026,5,3,6,40),  dtend: toIcsDate(2026,5,3,10,15), summary: '✈️ Flight — Taipei → Ho Chi Minh City', location: 'Taiwan Taoyuan International Airport' },
  { dtstart: toIcsDate(2026,5,3,10,15), dtend: toIcsDate(2026,5,3,11,0),  summary: '🛬 Arrival in Ho Chi Minh City', location: 'Tan Son Nhat International Airport, Ho Chi Minh City' },
];

function downloadICS() {
  const content = generateICS(CALENDAR_EVENTS);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'taiwan-trip-2026.ics';
  a.click();
  URL.revokeObjectURL(url);
}

// ─── UI ───────────────────────────────────────────────────────────────────────
const TYPE_ICON: Record<string, string> = {
  flight: '✈️', transport: '🚌', food: '🍜',
  sightseeing: '📸', hotel: '🏨', note: '📋', optional: '💡',
};
const TYPE_COLOR: Record<string, string> = {
  flight: 'act-flight', transport: 'act-transport', food: 'act-food',
  sightseeing: 'act-sight', hotel: 'act-hotel', note: 'act-note', optional: 'act-optional',
};

export default function TravelItineraryView() {
  const [activeDay, setActiveDay] = useState(0);
  const day = ITINERARY[activeDay];

  return (
    <div className="itin-page">
      <div className="itin-header">
        <div className="itin-flag">🇹🇼</div>
        <div style={{ flex: 1 }}>
          <h1 className="itin-title">Solo Taiwan Trip</h1>
          <div className="itin-dates">April 29 – May 3, 2026 · Taipei</div>
        </div>
        <button className="itin-export-btn" onClick={downloadICS} title="Download .ics for Apple Calendar, Google Calendar, or Outlook">
          📅 Export to Calendar
        </button>
      </div>

      <div className="itin-tabs">
        {ITINERARY.map((d, i) => (
          <button key={d.day} className={`itin-tab ${activeDay === i ? 'active' : ''}`} onClick={() => setActiveDay(i)}>
            <span className="itin-tab-emoji">{d.emoji}</span>
            <span className="itin-tab-day">Day {d.day}</span>
            <span className="itin-tab-date">{d.date.split(',')[0]}</span>
          </button>
        ))}
      </div>

      <div className="itin-day-header">
        <span className="itin-day-emoji">{day.emoji}</span>
        <div>
          <div className="itin-day-label">Day {day.day} — {day.date} ({day.weekday})</div>
          <div className="itin-day-title">{day.title}</div>
        </div>
      </div>

      <div className="itin-timeline">
        {day.activities.map((act, i) => (
          <div key={i} className={`itin-item ${TYPE_COLOR[act.type || 'note'] || ''}`}>
            <div className="itin-item-left">
              <span className="itin-item-icon">{TYPE_ICON[act.type || 'note'] || '📌'}</span>
              {i < day.activities.length - 1 && <div className="itin-item-line" />}
            </div>
            <div className="itin-item-body">
              {act.time && <div className="itin-item-time">{act.time}</div>}
              <div className="itin-item-text">{act.text}</div>
              {act.sub && (
                <ul className="itin-item-sub">
                  {act.sub.map((s, j) => <li key={j}>{s}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="itin-nav">
        <button className="itin-nav-btn" onClick={() => setActiveDay(d => Math.max(0, d - 1))} disabled={activeDay === 0}>← Previous Day</button>
        <span className="itin-nav-count">{activeDay + 1} / {ITINERARY.length}</span>
        <button className="itin-nav-btn" onClick={() => setActiveDay(d => Math.min(ITINERARY.length - 1, d + 1))} disabled={activeDay === ITINERARY.length - 1}>Next Day →</button>
      </div>
    </div>
  );
}
