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

const ACCOMMODATION = {
  name: 'Room in Zhongshan District — "My Home"',
  address: 'No. 65, Tianjin Street, Zhongshan District, Taipei 10491',
  checkin: 'Wed Apr 29 · from 4:00 PM (keypad entry)',
  checkout: 'Sun May 3 · by 11:00 AM',
  note: 'Keypad lock — contact host in advance for the door code. You can leave at any time in the morning without waiting for staff.',
};

const ITINERARY: DayPlan[] = [
  {
    day: 1,
    date: 'April 29, 2026',
    weekday: 'Wednesday',
    emoji: '✈️',
    title: 'Departure & Late Arrival in Taipei',
    activities: [
      {
        time: '3:30–4:00 PM', text: 'Arrive at Tan Son Nhat Airport, Ho Chi Minh City', type: 'transport',
        sub: ['Allow at least 2–2.5 hours before departure for check-in & security']
      },
      {
        time: '6:05 PM', text: 'Flight departs Ho Chi Minh City → Taipei', type: 'flight',
        sub: ['Tan Son Nhat International Airport (SGN)']
      },
      {
        time: '10:35 PM', text: 'Arrival at Taoyuan International Airport, Taipei', type: 'transport'
      },
      {
        time: '~10:40 PM', text: 'Buy Easy Card at airport MRT station', type: 'transport',
        sub: ['Available at all MRT customer service counters in the airport', 'Load TWD 500–1000 for first few days (transport + convenience stores)']
      },
      {
        time: '~10:45 PM', text: 'Taoyuan Airport → Zhongshan Station (MRT)', type: 'transport',
        sub: [
          'Airport Express to Taipei Main Station: ~35–40 min',
          'Transfer at Taipei Main: take Songshan-Xindian Line (Green) 1 stop north to Zhongshan Station',
          'Total travel time: ~45–50 min, arrive ~11:30–11:35 PM'
        ]
      },
      {
        time: '~11:35 PM', text: 'Check-in: Room in Zhongshan District — No. 65, Tianjin Street', type: 'hotel',
        sub: [
          '📍 No. 65, Tianjin Street, Zhongshan District, Taipei 10491',
          'Hosted by "My Home" (Airbnb)',
          'Keypad entry — confirm code with host before departure!',
          '~5–8 min walk from Zhongshan MRT Station (Exit 3 or 4)'
        ]
      },
      {
        time: 'Late night', text: 'Optional: Quick late-night snack', type: 'optional',
        sub: [
          '7-Eleven & FamilyMart within 2 min walk — great for late-night snacks & drinks',
          'Ningxia Night Market (~10 min walk) — may still have some stalls open after midnight',
          'Rest up — full Day 2 tomorrow!'
        ]
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
        time: '6:00 AM', text: 'Optional Early Breakfast: Fuhang Soy Milk', type: 'food',
        sub: [
          '📍 Zhongzheng District — ~20 min from accommodation',
          'From Zhongshan Station: Green Line → Dongmen Station (5 stops), short walk',
          'Leave early — long line expected! Worth it for the soy milk & egg crepes'
        ]
      },
      {
        time: '8:00 AM', text: 'Chiang Kai-shek Memorial Hall', type: 'sightseeing',
        sub: [
          '📍 Zhongzheng District',
          'From Zhongshan Station: Green Line → CKS Memorial Hall Station (~20 min, 4 stops)',
          'Changing of the Guard ceremony every hour on the hour'
        ]
      },
      {
        time: '9:40 AM', text: 'Rongjin Gorgeous Time', type: 'sightseeing',
        sub: ['Historic Japanese-style photo spots', '~10 min walk from CKS Memorial Hall']
      },
      {
        time: '10:30 AM', text: 'Yongkang Street Food Trip', type: 'food',
        sub: [
          '📍 Da\'an District — 5 min walk from Rongjin',
          'Din Tai Fung (original), ice cream, bubble tea, street snacks'
        ]
      },
      {
        time: '', text: 'Optional: Walk to Daan Forest Park — relax & photos', type: 'optional',
        sub: ['~15 min walk from Yongkang Street, great for photos']
      },
      {
        time: '12:00 PM', text: 'Taipei 101 + Rainbow Walk', type: 'sightseeing',
        sub: [
          'Photo Spots: Taipei 101 Rainbow Walk, Taipei City Hall Bus Station Staircase, No. 88 Songao Road, Tao Zhu Yin Yuan, Takemura Izakaya Street',
          'Quick mall stroll (Taipei 101, GU, NET)',
          'Optional food: Ichiran Ramen, Cha Kee Noodle, HANNA Pasta Café, Kai Kai Dessert',
          'TIP: CKS → Taipei 101 route can be done via KLOOK Hop-On Hop-Off Bus'
        ]
      },
      {
        time: '2:30 PM', text: 'Travel to Tamsui', type: 'transport',
        sub: [
          'From Taipei 101/Taipei Main → Tamsui Station (Red Line, ~40–45 min)',
          'Tamsui is the last stop — easy to find'
        ]
      },
      {
        time: '3:30 PM', text: 'Tamsui Old Street', type: 'sightseeing',
        sub: [
          'Explore Tamsui Old Street and Baywalk',
          'Try: iron eggs (鐵蛋), fishball soup, A-Gei stuffed tofu',
          'Optional: 大塊牛排-淡水店 — steak restaurant ~5 min walk from station'
        ]
      },
      {
        time: '4:30 PM', text: "Sunset at Tamsui Fisherman's Wharf / Lover's Bridge", type: 'sightseeing',
        sub: [
          'Best golden hour photos — sunset is around 6:15 PM in late April',
          "Ferry from Tamsui Old Street to Fisherman's Wharf: ~15–20 min",
          'Or take Bus 836 (~30 min) — check schedule'
        ]
      },
      {
        time: '7:00 PM', text: 'Take Bus 947 to Banqiao Station Square', type: 'transport',
        sub: ['Or head directly back to Taipei Main if tired — Tamsui is the last Red Line stop']
      },
      {
        time: '8:30 PM', text: 'Banqiao Christmas Land (optional)', type: 'optional',
        sub: ['Giant Christmas tree and light shows', 'Head back home after — ~30 min back to Zhongshan']
      },
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
        time: 'Before 10 AM', text: 'Breakfast near accommodation — Zhongshan area', type: 'food',
        sub: [
          '📍 All within 5–10 min walk from No. 65 Tianjin Street:',
          '• Master of Rice Ball (飯糰) — 2 min walk',
          '• GooDonut — 8 min walk',
          '• Liu Shandong Beef Noodles (劉山東牛肉麵) — 5 min walk',
          '• Fuzhou Ancestral Pepper Cake (福州元祖胡椒餅) — 10 min walk',
          'All are famous local breakfast spots near Zhongshan / Taipei Main area'
        ]
      },
      {
        time: '~10:30 AM', text: 'Travel to Taipei Main Station for KLOOK tour', type: 'transport',
        sub: [
          'From Zhongshan Station: Green Line 1 stop south to Taipei Main Station',
          'Allow 15–20 min from accommodation to reach Taipei Main Station M4'
        ]
      },
      {
        time: '11:05 AM', text: 'KLOOK Yehliu, Shifen & Jiufen Day Tour', type: 'sightseeing',
        sub: [
          '📍 Departure: Taipei Main Station Exit M4',
          'Book in advance on KLOOK app!',
          '• Yehliu Geopark — alien rock formations, Queen\'s Head rock',
          '• Shifen Old Street — sky lanterns 🏮',
          '• Shifen Waterfall — Taiwan\'s widest waterfall',
          '• Jiufen Old Street — gold rush town, famous Spirited Away inspiration'
        ]
      },
      {
        time: '~8:30 PM', text: 'Drop-off at Taipei Main Station M3', type: 'transport',
        sub: ['Walk or take MRT 1 stop back to Zhongshan to drop luggage/freshen up']
      },
      {
        time: '9:00 PM', text: 'Ximending Night Stroll', type: 'sightseeing',
        sub: [
          '📍 ~15 min from Zhongshan by MRT (Blue Line to Ximen Station)',
          '• Xin Fu Tang brown sugar boba milk tea 🧋',
          '• Scallion pancake, Crispy Donut',
          '• The Red House (historic theater)',
          'Pasalubong shopping: Carrefour, Mr. Ho'
        ]
      },
      {
        time: '', text: 'Alternative: Ningxia Night Market instead of Ximending', type: 'optional',
        sub: [
          '📍 Only ~10 min walk from accommodation!',
          'Famous for: oyster vermicelli, braised pork rice, tangyuan',
          'Great option if tired from the long day tour — closer to home'
        ]
      },
    ],
  },
  {
    day: 4,
    date: 'May 2, 2026',
    weekday: 'Saturday',
    emoji: '☕',
    title: 'Maokong Gondola, Zhongshan Neighborhood & Huashan',
    activities: [
      {
        time: '7:30 AM', text: 'Travel to Maokong Gondola', type: 'transport',
        sub: [
          'From Zhongshan: MRT Green Line → Daan Station → transfer to Brown Line (Wenhu) → Taipei Zoo → Gondola',
          'Total: ~40–50 min — leave early to beat queues!',
          'Opens at 9:00 AM on weekends'
        ]
      },
      {
        time: '9:00 AM', text: 'Maokong Gondola Ride', type: 'sightseeing',
        sub: [
          '🚡 Scenic gondola ride up Maokong mountain (~25 min)',
          'Tea plantation views, Taipei skyline on clear days',
          'Spend 1–2 hrs exploring tea houses at the top',
          'Try: Alishan high mountain tea, tea-infused food'
        ]
      },
      {
        time: '~11:30 AM', text: 'Return to Zhongshan area — your neighborhood!', type: 'transport',
        sub: ['Take MRT back ~40–50 min', 'Drop bags at room, freshen up']
      },
      {
        time: '12:30 PM', text: 'Zhongshan District Café Hopping — right outside your door', type: 'food',
        sub: [
          '📍 All within 5–20 min walk from No. 65 Tianjin Street:',
          '• % Arabica — minimalist Japanese coffee brand',
          '• Coffee Dumbo — cozy local favourite',
          '• R9 Café — trendy specialty coffee',
          '• Coach Play Café — unique concept café',
          '• Fujin Tree Café — greenery-filled café',
          '• Jin Din Rou (金鼎輪) — classic Zhongshan dim sum spot',
          'Tianjin Street itself has several charming cafes to explore!'
        ]
      },
      {
        time: '', text: 'Optional: Zhongshan Underground Mall & bookstores', type: 'optional',
        sub: ['Under MRT Zhongshan station — boutique shops, art galleries, cafes']
      },
      {
        time: '3:00 PM', text: 'Huashan 1914 Creative Park', type: 'sightseeing',
        sub: [
          '📍 ~20–25 min from Zhongshan (MRT + short walk)',
          'Former brewery turned creative arts space',
          'Exhibits, photo areas, indie shops, live events'
        ]
      },
      {
        time: 'Evening', text: 'Optional Evening Activities', type: 'optional',
        sub: [
          'Miramar Entertainment Park → ferris wheel at night (20 min from Zhongshan)',
          'Taipei Sightseeing Bus (Klook) → night city tour',
          'Raohe Night Market → ~15–20 min by MRT'
        ]
      },
      {
        time: '⚠️ Tonight', text: 'Pack everything & prepare for very early airport departure', type: 'note',
        sub: [
          'Set alarm for 4:30 AM',
          'Flight is 7:40 AM — leave room by 5:00–5:15 AM',
          'KEYPAD ADVANTAGE: No need to wait for staff — just lock up and leave!',
          '⚠️ Message your host tonight to confirm early departure is noted',
          'Official checkout is 11 AM but you will be leaving at 5 AM — leave the key/door as instructed'
        ]
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
        time: '4:30 AM', text: 'Wake up, final check & leave room', type: 'hotel',
        sub: [
          '📍 No. 65, Tianjin Street, Zhongshan District',
          'Use keypad to lock up — no need to wait for host',
          'Official checkout is 11 AM but you are free to leave at any time',
          'Double-check: passport, Easy Card, phone, charger, luggage'
        ]
      },
      {
        time: '5:00 AM', text: 'Walk to Zhongshan MRT Station (~5–8 min)', type: 'transport',
        sub: ['Grab a convenience store breakfast on the way (7-Eleven / FamilyMart are open 24/7)']
      },
      {
        time: '5:08–5:15 AM', text: 'Zhongshan Station → Taipei Main Station (MRT, 1 stop)', type: 'transport',
        sub: ['Songshan-Xindian Green Line southbound — 1 stop, ~3 min']
      },
      {
        time: '5:20–5:25 AM', text: 'Taipei Main Station → Board Airport Express', type: 'transport',
        sub: [
          'Airport MRT Express departs every 15–30 min in early morning',
          'Check schedule at: metro.taipei',
          'Platform is on B1 of Taipei Main Station'
        ]
      },
      {
        time: '~6:00–6:05 AM', text: 'Arrive Taoyuan Airport Terminal 1 or 2', type: 'transport',
        sub: [
          'Airport Express: ~35–40 min from Taipei Main',
          'Confirm your terminal (T1 or T2) when booking — check your ticket'
        ]
      },
      {
        time: '6:05–6:30 AM', text: 'Check-in & Security', type: 'transport',
        sub: [
          'Allow ~1.5 hours before departure for check-in, immigration & security',
          'Arriving at 6:00 AM gives you a safe 1h40m buffer'
        ]
      },
      {
        time: '7:40 AM', text: 'Flight departs Taipei (Taoyuan) → Ho Chi Minh City', type: 'flight',
        sub: ['Taiwan Taoyuan International Airport (TPE)']
      },
      {
        time: '10:15 AM', text: 'Arrival at Tan Son Nhat Airport, Ho Chi Minh City', type: 'flight',
        sub: ['🏠 Welcome home! End of Taiwan trip — 4 amazing days in Taipei! 🇹🇼']
      },
    ],
  },
];

// ─── Accommodation Info Card ──────────────────────────────────────────────────
function AccomCard() {
  const [open, setOpen] = useState(false);
  return (
    <div className="itin-accom-card">
      <button className="itin-accom-toggle" onClick={() => setOpen(o => !o)}>
        <span>🏨 {ACCOMMODATION.name}</span>
        <span className="itin-accom-chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="itin-accom-body">
          <div className="itin-accom-row"><span>📍</span><span>{ACCOMMODATION.address}</span></div>
          <div className="itin-accom-row"><span>✅</span><span>Check-in: {ACCOMMODATION.checkin}</span></div>
          <div className="itin-accom-row"><span>🚪</span><span>Checkout: {ACCOMMODATION.checkout}</span></div>
          <div className="itin-accom-note">{ACCOMMODATION.note}</div>
        </div>
      )}
    </div>
  );
}

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
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Quan Works//Travel Hub//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
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

// Times in Ho Chi Minh (UTC+7). Taipei is UTC+8 (= HCM +1hr).
// To convert Taipei time to HCM: subtract 1 hour.
const CALENDAR_EVENTS: CalEvent[] = [
  // Day 1 — Apr 29
  { dtstart: toIcsDate(2026,4,29,18,5),  dtend: toIcsDate(2026,4,29,21,35), summary: '✈️ Flight — Ho Chi Minh City → Taipei', location: 'Tan Son Nhat International Airport, Ho Chi Minh City' },
  { dtstart: toIcsDate(2026,4,29,21,35), dtend: toIcsDate(2026,4,29,22,30), summary: '🚇 Taoyuan Airport → Zhongshan Station', description: 'Airport Express to Taipei Main (~40 min) + 1 stop Green Line to Zhongshan. Buy Easy Card at airport.' },
  { dtstart: toIcsDate(2026,4,29,22,30), dtend: toIcsDate(2026,4,29,23,15), summary: '🏨 Check-in: Room in Zhongshan District', description: 'No. 65, Tianjin Street, Zhongshan District. Keypad entry — confirm code with host before trip.', location: 'No. 65, Tianjin Street, Zhongshan District, Taipei 10491' },
  // Day 2 — Apr 30
  { dtstart: toIcsDate(2026,4,30,6,0),  dtend: toIcsDate(2026,4,30,7,0),  summary: '🥛 Fuhang Soy Milk Breakfast (Optional)', description: 'From Zhongshan: Green Line → Dongmen Station. Leave early — long line expected!', location: 'Fuhang Soy Milk, Zhongzheng District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,8,0),  dtend: toIcsDate(2026,4,30,9,30), summary: '🏛️ Chiang Kai-shek Memorial Hall', description: 'From Zhongshan Station: Green Line to CKS Memorial Hall Station (~20 min, 4 stops)', location: 'Chiang Kai-shek Memorial Hall, Zhongzheng, Taipei' },
  { dtstart: toIcsDate(2026,4,30,9,40), dtend: toIcsDate(2026,4,30,10,30),summary: '📸 Rongjin Gorgeous Time', description: 'Historic Japanese-style photo spots, ~10 min walk from CKS Memorial Hall.' },
  { dtstart: toIcsDate(2026,4,30,10,30),dtend: toIcsDate(2026,4,30,12,0), summary: '🍜 Yongkang Street Food Trip', location: 'Yongkang Street, Da\'an District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,12,0), dtend: toIcsDate(2026,4,30,14,30),summary: '🏙️ Taipei 101 + Rainbow Walk', location: 'Taipei 101, Xinyi District, Taipei' },
  { dtstart: toIcsDate(2026,4,30,14,30),dtend: toIcsDate(2026,4,30,15,30),summary: '🚇 Travel to Tamsui', description: 'Taipei Main → Tamsui Station (Red Line, ~40-45 min, last stop).' },
  { dtstart: toIcsDate(2026,4,30,15,30),dtend: toIcsDate(2026,4,30,16,30),summary: '🏘️ Tamsui Old Street', location: 'Tamsui Old Street, Tamsui District, New Taipei' },
  { dtstart: toIcsDate(2026,4,30,16,30),dtend: toIcsDate(2026,4,30,19,0), summary: "🌅 Sunset at Tamsui Fisherman's Wharf / Lover's Bridge", description: "Ferry from Tamsui Old Street ~15-20 min. Sunset ~6:15 PM in late April.", location: "Fisherman's Wharf, Tamsui, New Taipei" },
  { dtstart: toIcsDate(2026,4,30,20,30),dtend: toIcsDate(2026,4,30,22,0), summary: '🎄 Banqiao Christmas Land (Optional)', location: 'Banqiao Station Square, New Taipei' },
  // Day 3 — May 1
  { dtstart: toIcsDate(2026,5,1,11,5),  dtend: toIcsDate(2026,5,1,20,30), summary: '🗺️ KLOOK Tour: Yehliu + Shifen + Jiufen', description: 'Departure: Taipei Main Station M4. Book in advance on KLOOK! Includes: Yehliu Geopark, Shifen Old Street, Shifen Waterfall, Jiufen Old Street.', location: 'Taipei Main Station M4, Taipei' },
  { dtstart: toIcsDate(2026,5,1,21,0),  dtend: toIcsDate(2026,5,1,23,0),  summary: '🌃 Ximending Night Stroll', location: 'Ximending, Wanhua District, Taipei' },
  // Day 4 — May 2
  { dtstart: toIcsDate(2026,5,2,7,30),  dtend: toIcsDate(2026,5,2,8,0),   summary: '🚇 Travel to Maokong Gondola', description: 'From Zhongshan: Green Line → Daan → transfer to Brown Line → Taipei Zoo. ~40-50 min.' },
  { dtstart: toIcsDate(2026,5,2,8,0),   dtend: toIcsDate(2026,5,2,11,0),  summary: '🚡 Maokong Gondola & Tea Houses', description: 'Scenic gondola ride, tea plantation views, tea houses at top.', location: 'Maokong Gondola, Wenshan District, Taipei' },
  { dtstart: toIcsDate(2026,5,2,11,30), dtend: toIcsDate(2026,5,2,14,0),  summary: '☕ Zhongshan Café Hopping — your neighborhood!', description: '% Arabica, Coffee Dumbo, R9 Café, Coach Play Café, Fujin Tree Café. All within 5-20 min walk from accommodation.', location: 'Zhongshan District, Taipei' },
  { dtstart: toIcsDate(2026,5,2,15,0),  dtend: toIcsDate(2026,5,2,17,30), summary: '🎨 Huashan 1914 Creative Park', location: 'Huashan 1914 Creative Park, Taipei' },
  // Day 5 — May 3 (HCM time = Taipei -1hr)
  { dtstart: toIcsDate(2026,5,3,3,30),  dtend: toIcsDate(2026,5,3,4,0),   summary: '⏰ Wake up & Leave Room — Early Airport Departure', description: 'Keypad lock — no need to wait for host. Leave by 5:00 AM Taipei time. Grab 7-Eleven breakfast.', location: 'No. 65, Tianjin Street, Zhongshan District, Taipei' },
  { dtstart: toIcsDate(2026,5,3,4,0),   dtend: toIcsDate(2026,5,3,4,20),  summary: '🚇 Zhongshan → Taipei Main → Airport Express', description: '1 stop Green Line south to Taipei Main, then Airport Express (~35-40 min) to Taoyuan Airport.' },
  { dtstart: toIcsDate(2026,5,3,5,5),   dtend: toIcsDate(2026,5,3,6,40),  summary: '🛂 Taoyuan Airport — Check-in & Security', location: 'Taiwan Taoyuan International Airport' },
  { dtstart: toIcsDate(2026,5,3,6,40),  dtend: toIcsDate(2026,5,3,10,15), summary: '✈️ Flight — Taipei → Ho Chi Minh City', location: 'Taiwan Taoyuan International Airport (TPE)' },
  { dtstart: toIcsDate(2026,5,3,10,15), dtend: toIcsDate(2026,5,3,11,0),  summary: '🛬 Arrival in Ho Chi Minh City 🏠', location: 'Tan Son Nhat International Airport, Ho Chi Minh City' },
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

      <AccomCard />

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
