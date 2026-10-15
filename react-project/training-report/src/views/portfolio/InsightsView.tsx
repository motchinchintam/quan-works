import { useState, useEffect, useRef } from 'react';
import { INSIGHTS } from '../../data/portfolio';
import type { InsightPost } from '../../data/portfolio';
import { useLang } from '../../i18n/index';

interface InsightsViewProps { onNavigate: (v: string) => void; }

type MergedInsight = InsightPost & { title: string; excerpt: string; body: string[] };

export default function InsightsView({ onNavigate }: InsightsViewProps) {
  const { s } = useLang();
  const [selected,    setSelected]    = useState<MergedInsight | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [activeTag,   setActiveTag]   = useState<string>('All');

  const insights: MergedInsight[] = INSIGHTS.map((ins, i) => ({ ...ins, ...s.data.insights[i] }));

  /* Unique tags */
  const allTags = ['All', ...Array.from(new Set(insights.map(i => i.tag)))];
  const filtered = activeTag === 'All' ? insights : insights.filter(i => i.tag === activeTag);

  function openInsight(ins: MergedInsight, idx: number) {
    setSelected(ins);
    setSelectedIdx(idx);
  }

  function goNext() {
    const next = selectedIdx + 1;
    if (next < insights.length) { setSelected(insights[next]); setSelectedIdx(next); }
  }

  function goPrev() {
    const prev = selectedIdx - 1;
    if (prev >= 0) { setSelected(insights[prev]); setSelectedIdx(prev); }
  }

  if (selected) return (
    <InsightDetail
      post={selected}
      index={selectedIdx}
      total={insights.length}
      onBack={() => { setSelected(null); setSelectedIdx(-1); }}
      onNext={selectedIdx < insights.length - 1 ? goNext : undefined}
      onPrev={selectedIdx > 0 ? goPrev : undefined}
      onNavigate={onNavigate}
    />
  );

  return (
    <div className="pt-page">

      <div className="pt-page-hero">
        <div className="pt-section-inner">
          <h1 className="pt-page-title">{s.insights.pageTitle}</h1>
          <p className="pt-page-sub">{s.insights.pageSub}</p>
        </div>
      </div>

      {/* Tag filter bar */}
      <div className="pt-section-inner">
        <div className="pt-tag-filter">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`pt-tag-filter-btn${activeTag === tag ? ' active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
              {tag !== 'All' && (
                <span className="pt-tag-filter-count">
                  {insights.filter(i => i.tag === tag).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-section-inner pt-insights-list">
        {filtered.length === 0 && (
          <div className="pt-empty-state">No articles match this filter.</div>
        )}
        {filtered.map(ins => (
          <div key={ins.id} className="pt-insight-item" onClick={() => openInsight(ins, insights.indexOf(ins))}>
            <div className="pt-insight-item-meta">
              <span
                className={`pt-tag${ins.tag === activeTag && activeTag !== 'All' ? ' pt-tag--active' : ''}`}
                onClick={e => { e.stopPropagation(); setActiveTag(ins.tag); }}
              >
                {ins.tag}
              </span>
              <span className="pt-insight-time">{ins.readTime} · {ins.date}</span>
            </div>
            <h2 className="pt-insight-item-title">{ins.title}</h2>
            <p className="pt-insight-item-excerpt">{ins.excerpt}</p>
            <span className="pt-insight-read">{s.common.read}</span>
          </div>
        ))}
      </div>

      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <div className="pt-footer-left">
            <span className="pt-footer-name">Quân</span>
            <span className="pt-footer-tag">{s.common.footerTag}</span>
          </div>
          <div className="pt-footer-links">
            {(['work', 'about', 'insights', 'contact'] as const).map(p => (
              <button key={p} className="pt-footer-link" onClick={() => onNavigate(p)}>
                {s.nav[p]}
              </button>
            ))}
          </div>
          <div className="pt-footer-contact">
            <a href="mailto:motchinchiintam@gmail.com">motchinchiintam@gmail.com</a>
          </div>
        </div>
        <div className="pt-footer-copy">{s.common.footerCopy}</div>
      </footer>

    </div>
  );
}

/* ── Article detail with reading progress bar ─────────────────────── */
function InsightDetail({
  post, index, total, onBack, onNext, onPrev, onNavigate,
}: {
  post: MergedInsight;
  index: number;
  total: number;
  onBack: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onNavigate: (v: string) => void;
}) {
  const { s } = useLang();
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  /* Reading progress bar */
  useEffect(() => {
    function onScroll() {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pt-page" ref={articleRef}>

      {/* Reading progress bar */}
      <div className="pt-read-progress-track">
        <div className="pt-read-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="pt-detail-wrap">

        {/* Nav bar */}
        <div className="pt-detail-nav">
          <button className="pt-back-btn" onClick={onBack}>{s.common.backToInsights}</button>
          <div className="pt-detail-nav-right">
            <span className="pt-detail-counter">{index + 1} / {total}</span>
            <button className="pt-detail-prev" onClick={onPrev} disabled={!onPrev}>← Prev</button>
            <button className="pt-detail-next" onClick={onNext} disabled={!onNext}>Next →</button>
          </div>
        </div>

        <div className="pt-detail-header">
          <div className="pt-insight-item-meta">
            <span className="pt-tag">{post.tag}</span>
            <span className="pt-insight-time">{post.readTime} · {post.date}</span>
          </div>
          <h1 className="pt-detail-title">{post.title}</h1>
        </div>

        <div className="pt-article-body">
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {/* Bottom prev/next */}
        <div className="pt-detail-bottom-nav">
          <button className="pt-detail-nav-btn" onClick={onPrev} disabled={!onPrev}>← Previous article</button>
          <button className="pt-detail-nav-btn pt-detail-nav-btn--next" onClick={onNext} disabled={!onNext}>Next article →</button>
        </div>

      </div>

      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <div className="pt-footer-left">
            <span className="pt-footer-name">Quân</span>
            <span className="pt-footer-tag">{s.common.footerTag}</span>
          </div>
          <div className="pt-footer-links">
            {(['work', 'about', 'insights', 'contact'] as const).map(p => (
              <button key={p} className="pt-footer-link" onClick={() => onNavigate(p)}>
                {s.nav[p]}
              </button>
            ))}
          </div>
        </div>
        <div className="pt-footer-copy">{s.common.footerCopy}</div>
      </footer>

    </div>
  );
}
