import type React from 'react';

interface MainHubViewProps {
  onNavigate: (view: string) => void;
  dark: boolean;
}

const HUBS: {
  view: string; icon: string; name: string; badge: string;
  accent: string; accentBg: string; desc: string;
  tools: string[]; isAI?: boolean; isNew?: boolean; href?: string;
}[] = [
  {
    view: 'hub', icon: '📊', name: 'Training', badge: 'Work tools',
    accent: '#185FA5', accentBg: '#EBF3FD',
    tools: ['Test Tracker', 'Attendance', 'KPI Targets', 'Cohort View', 'Print Report'],
    desc: 'Track cohort progress, run assessments, and generate formal reports.',
  },
  {
    view: 'learnhub', icon: '🎓', name: 'Learning', badge: 'Skills',
    accent: '#534AB7', accentBg: '#EEEDFE',
    tools: ['Flashcards', 'Quiz Mode', 'Study Timer', 'Goal Tracker', 'Study Notes'],
    desc: 'Language flashcards, quizzes, and a Pomodoro study timer.',
  },
  {
    view: 'travelhub', icon: '✈️', name: 'Travel', badge: 'Trips',
    accent: '#0F6E56', accentBg: '#E1F5EE',
    tools: ['Taiwan 2026', 'Trip Templates', 'Packing Lists'],
    desc: 'Plan trips and build day-by-day itineraries.',
  },
  {
    view: 'financehub', icon: '💰', name: 'Finance', badge: 'Budget',
    accent: '#854F0B', accentBg: '#FAEEDA',
    tools: ['Expense Log', 'Trip Budget', 'Savings Goals'],
    desc: 'Log expenses, track trip budgets, and monitor savings goals.',
  },
  {
    view: 'journalhub', icon: '📔', name: 'Journal', badge: 'Personal',
    accent: '#993C1D', accentBg: '#FAECE7',
    tools: ['Daily Journal', 'Mood Tracker', 'Weekly Review'],
    desc: 'A private space to log entries, track mood, and do weekly reflections.',
  },
  {
    view: 'mkthub', icon: '🧠', name: 'Marketing', badge: 'Marketing & Consulting bots',
    accent: '#6D28D9', accentBg: '#EDE9FE',
    tools: ['Strategy', 'Content', 'Local SEO', 'Campaign Briefs', 'Monthly Plans'],
    desc: 'Powered by a group of Marketing & Consulting bots — salon growth office for US nail salons.',
    isAI: true, isNew: true,
  },
  {
    view: 'mangohowto', icon: '📖', name: 'Mango How-To', badge: 'Work email',
    accent: '#BE185D', accentBg: '#FCE7F3',
    tools: ['Staff guides', 'Work email required'],
    desc: 'Staff how-to guides. Sign in with your Mango work email to open.',
    href: 'https://howto.motchinchintam.com',
  },
  {
    view: 'grokfolder', icon: '📁', name: 'GROK Folder', badge: 'Personal email',
    accent: '#1D4ED8', accentBg: '#DBEAFE',
    tools: ['Personal email approval', 'Opens after Quan approves'],
    desc: 'Personal GROK Chief of Staff workspace. Requires Quan\'s personal-email approval before opening; opens after Quan approves.',
    href: 'https://howto.motchinchintam.com/grok/',
  },
];

export default function MainHubView({ onNavigate }: MainHubViewProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="apps-page">

      {/* ── Dark header ─────────────────────────────────────────────── */}
      <div className="apps-header">
        <div className="apps-header-inner">
          <div>
            <div className="apps-greeting">
              {greeting}, Quân <span>— your workspace</span>
            </div>
            <div className="apps-subtitle">8 tools · Everything in one place</div>
          </div>
          <div className="apps-profile-badge">
            <div className="apps-profile-avatar">Q</div>
            <div>
              <div className="apps-profile-name">Nguyen Thanh Quan</div>
              <div className="apps-profile-role">HR & Sales Training HRD</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hub grid ────────────────────────────────────────────────── */}
      <div className="apps-grid-section">
        <div className="apps-grid-label">Workspaces</div>
        <div className="apps-grid">
          {HUBS.map(hub => (
            <div
              key={hub.view}
              className="hub-card"
              style={{ '--card-accent': hub.accent, '--card-accent-bg': hub.accentBg } as React.CSSProperties}
              onClick={() => {
                if (hub.href) {
                  window.open(hub.href, '_blank', 'noopener,noreferrer');
                  return;
                }
                onNavigate(hub.view);
              }}
            >
              <div className="hub-card-top">
                <div className="hub-icon-wrap">{hub.icon}</div>
                <div className="hub-card-info">
                  <div className="hub-card-name">
                    {hub.name}
                    {hub.isAI && (
                      <span className="hub-card-ai-badge">✦ AI</span>
                    )}
                  </div>
                  <div className="hub-card-badge">{hub.badge}</div>
                </div>
                {hub.isNew && <span className="hub-card-new-badge">NEW</span>}
              </div>
              <div className="hub-card-desc">{hub.desc}</div>
              <div className="hub-card-tools">
                {hub.tools.map(t => (
                  <span key={t} className="hub-tool-chip">{t}</span>
                ))}
              </div>
              <button className="hub-card-open">{hub.href ? 'Open ↗' : 'Open →'}</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
