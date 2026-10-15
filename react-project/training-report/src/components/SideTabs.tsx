interface SideTabsProps { onNavigate: (v: string) => void; }

const SOCIALS = [
  {
    href: 'https://www.linkedin.com/in/motchinchintam/',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45z"/>
      </svg>
    ),
  },
  {
    href: 'mailto:motchinchiintam@gmail.com',
    label: 'Email',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <polyline points="2,4 12,13 22,4"/>
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/availableeeeee/',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.instagram.com/motchinchintam',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: 'https://zalo.me/0916366443',
    label: 'Zalo',
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <text x="4" y="17" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif">Z</text>
      </svg>
    ),
  },
];

export default function SideTabs({ onNavigate }: SideTabsProps) {
  return (
    <>
      {/* ── LEFT — social icon strip ─────────────────────────────────── */}
      <aside className="st-left">
        <div className="st-icons">
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="st-icon"
              aria-label={s.label}
            >
              {s.icon}
              <span className="st-tooltip">{s.label}</span>
            </a>
          ))}
        </div>
        <div className="st-stem" />
      </aside>

      {/* ── RIGHT — "Available for Work" sliding tab ─────────────────── */}
      <aside className="st-right">
        <div className="st-stem" />
        <button
          className="st-hire"
          onClick={() => onNavigate('contact')}
        >
          <span className="st-hire-dot" />
          <span className="st-hire-label">Available for Work</span>
        </button>
      </aside>
    </>
  );
}
