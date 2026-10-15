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
  const [open,      setOpen]      = useState(false);
  const [query,     setQuery]     = useState('');
  const [cursor,    setCursor]    = useState(-1);
  const inputRef  = useRef<HTMLInputElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  /* Reset cursor whenever results change */
  useEffect(() => { setCursor(-1); }, [query]);

  function close() { setOpen(false); setQuery(''); setCursor(-1); }

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

  function go(nav: string) { onNavigate(nav); close(); }

  function highlight(text: string): string {
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text;
    return (
      text.slice(0, idx) +
      `<mark class="nav-search-hl">${text.slice(idx, idx + q.length)}</mark>` +
      text.slice(idx + q.length)
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') { close(); return; }
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.min(cursor + 1, results.length - 1);
      setCursor(next);
      resultRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cursor <= 0) { setCursor(-1); inputRef.current?.focus(); return; }
      const prev = cursor - 1;
      setCursor(prev);
      resultRefs.current[prev]?.focus();
    } else if (e.key === 'Enter' && cursor === -1 && results.length > 0) {
      go(results[0].navigate);
    }
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
            onKeyDown={handleKeyDown}
            aria-label="Search site"
            aria-autocomplete="list"
          />
          <button className="nav-search-close" onClick={close}>✕</button>

          {results.length > 0 && (
            <div className="nav-search-dropdown" role="listbox">
              {results.map((r, i) => (
                <button
                  key={i}
                  ref={el => { resultRefs.current[i] = el; }}
                  className={`nav-search-result${cursor === i ? ' focused' : ''}`}
                  onClick={() => go(r.navigate)}
                  onKeyDown={e => {
                    if (e.key === 'ArrowDown') { e.preventDefault(); const next = Math.min(i + 1, results.length - 1); setCursor(next); resultRefs.current[next]?.focus(); }
                    if (e.key === 'ArrowUp')   { e.preventDefault(); if (i === 0) { setCursor(-1); inputRef.current?.focus(); } else { setCursor(i - 1); resultRefs.current[i - 1]?.focus(); } }
                    if (e.key === 'Escape')    { close(); }
                  }}
                  role="option"
                  aria-selected={cursor === i}
                >
                  <span className={`nav-search-badge nav-search-badge--${r.badge.toLowerCase()}`}>
                    {r.badge}
                  </span>
                  <div className="nav-search-result-info">
                    <span
                      className="nav-search-result-title"
                      dangerouslySetInnerHTML={{ __html: highlight(r.title) }}
                    />
                    {r.desc && (
                      <span
                        className="nav-search-result-desc"
                        dangerouslySetInnerHTML={{ __html: highlight(r.desc) }}
                      />
                    )}
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
          title="Search (type to find pages, projects, insights)"
          aria-label="Search"
        >
          🔍
        </button>
      )}
    </div>
  );
}
