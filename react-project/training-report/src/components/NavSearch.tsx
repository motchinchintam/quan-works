import { useState, useRef, useEffect } from 'react';
import { PROJECTS, INSIGHTS } from '../data/portfolio';
import { useLang } from '../i18n/index';

interface NavSearchProps { onNavigate: (v: string) => void; }

type Result = {
  title: string;
  desc?: string;
  badge: string;
  navigate: string;
};

export default function NavSearch({ onNavigate }: NavSearchProps) {
  const { s } = useLang();
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  function close() { setOpen(false); setQuery(''); }

  /* ── build search corpus from current language ── */
  const corpus: Result[] = [
    { title: s.nav.work,     badge: 'Page',    navigate: 'work'     },
    { title: s.nav.about,    badge: 'Page',    navigate: 'about'    },
    { title: s.nav.insights, badge: 'Page',    navigate: 'insights' },
    { title: s.nav.contact,  badge: 'Page',    navigate: 'contact'  },
    ...s.data.projects.map((p, i) => ({
      title:    p.title,
      desc:     p.context,
      badge:    'Project',
      navigate: 'work',
      _id:      PROJECTS[i]?.id,
    })),
    ...s.data.insights.map((ins, i) => ({
      title:    ins.title,
      desc:     ins.excerpt,
      badge:    'Insight',
      navigate: 'insights',
      _id:      INSIGHTS[i]?.id,
    })),
    ...s.data.strengths.map(st => ({
      title:    st.title,
      desc:     st.desc,
      badge:    'Strength',
      navigate: 'about',
    })),
  ];

  const q = query.trim().toLowerCase();
  const results = q.length < 1
    ? []
    : corpus
        .filter(r =>
          r.title.toLowerCase().includes(q) ||
          r.badge.toLowerCase().includes(q)  ||
          r.desc?.toLowerCase().includes(q)
        )
        .slice(0, 8);

  function go(nav: string) {
    onNavigate(nav);
    close();
  }

  return (
    <div className="nav-search-wrap" ref={wrapRef}>
      {open ? (
        <div className="nav-search-expanded">
          <span className="nav-search-icon-inline">🔍</span>
          <input
            ref={inputRef}
            className="nav-search-input"
            placeholder="Search pages, projects, insights…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') close(); }}
          />
          <button className="nav-search-close" onClick={close}>✕</button>

          {results.length > 0 && (
            <div className="nav-search-dropdown">
              {results.map((r, i) => (
                <button key={i} className="nav-search-result" onClick={() => go(r.navigate)}>
                  <span className={`nav-search-badge nav-search-badge--${r.badge.toLowerCase()}`}>
                    {r.badge}
                  </span>
                  <div className="nav-search-result-info">
                    <span className="nav-search-result-title">{r.title}</span>
                    {r.desc && <span className="nav-search-result-desc">{r.desc}</span>}
                  </div>
                  <span className="nav-search-result-arrow">→</span>
                </button>
              ))}
            </div>
          )}

          {q.length > 0 && results.length === 0 && (
            <div className="nav-search-dropdown nav-search-empty">
              No results for "<strong>{query}</strong>"
            </div>
          )}
        </div>
      ) : (
        <button
          className="nav-search-trigger"
          onClick={() => setOpen(true)}
          title="Search"
          aria-label="Search"
        >
          🔍
        </button>
      )}
    </div>
  );
}
