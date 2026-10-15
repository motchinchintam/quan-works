import { useState, useRef, useEffect } from 'react';

export default function GoogleSearch() {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function search() {
    const q = query.trim();
    if (!q) return;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(q)}`, '_blank');
    setQuery('');
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') search();
    if (e.key === 'Escape') { setOpen(false); setQuery(''); }
  }

  return (
    <>
      {/* ── Floating bubble ──────────────────────────────────────────── */}
      <button
        className={`gs-bubble${open ? ' gs-bubble--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Google Search"
        aria-label="Open Google Search"
      >
        {open ? '✕' : (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2"/>
            <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* ── Search panel ─────────────────────────────────────────────── */}
      {open && (
        <div className="gs-panel">
          <div className="gs-header">
            <span className="gs-logo">
              <span style={{ color: '#4285F4' }}>G</span>
              <span style={{ color: '#EA4335' }}>o</span>
              <span style={{ color: '#FBBC05' }}>o</span>
              <span style={{ color: '#4285F4' }}>g</span>
              <span style={{ color: '#34A853' }}>l</span>
              <span style={{ color: '#EA4335' }}>e</span>
            </span>
            <span className="gs-header-sub">Search opens in new tab</span>
          </div>

          <div className="gs-input-row">
            <svg className="gs-input-icon" viewBox="0 0 24 24" width="16" height="16" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#aaa" strokeWidth="2"/>
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#aaa" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              className="gs-input"
              type="text"
              placeholder="Search Google…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
            />
            {query && (
              <button className="gs-clear" onClick={() => { setQuery(''); inputRef.current?.focus(); }}>✕</button>
            )}
          </div>

          <button className="gs-btn" onClick={search} disabled={!query.trim()}>
            Search →
          </button>
        </div>
      )}
    </>
  );
}
