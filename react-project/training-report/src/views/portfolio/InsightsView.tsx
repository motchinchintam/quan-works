import { useState } from 'react';
import { INSIGHTS } from '../../data/portfolio';
import type { InsightPost } from '../../data/portfolio';

interface InsightsViewProps { onNavigate: (v: string) => void; }

export default function InsightsView({ onNavigate }: InsightsViewProps) {
  const [selected, setSelected] = useState<InsightPost | null>(null);

  if (selected) return <InsightDetail post={selected} onBack={() => setSelected(null)} onNavigate={onNavigate} />;

  return (
    <div className="pt-page">

      <div className="pt-page-hero">
        <div className="pt-section-inner">
          <h1 className="pt-page-title">Insights</h1>
          <p className="pt-page-sub">Short pieces on training, operations, and what I'm learning.</p>
        </div>
      </div>

      <div className="pt-section-inner pt-insights-list">
        {INSIGHTS.map(ins => (
          <div key={ins.id} className="pt-insight-item" onClick={() => setSelected(ins)}>
            <div className="pt-insight-item-meta">
              <span className="pt-tag">{ins.tag}</span>
              <span className="pt-insight-time">{ins.readTime} · {ins.date}</span>
            </div>
            <h2 className="pt-insight-item-title">{ins.title}</h2>
            <p className="pt-insight-item-excerpt">{ins.excerpt}</p>
            <span className="pt-insight-read">Read →</span>
          </div>
        ))}
      </div>

      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <div className="pt-footer-left">
            <span className="pt-footer-name">Quân</span>
            <span className="pt-footer-tag">HR &amp; Sales Training · HRD</span>
          </div>
          <div className="pt-footer-links">
            {(['work', 'about', 'insights', 'contact'] as const).map(p => (
              <button key={p} className="pt-footer-link" onClick={() => onNavigate(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <div className="pt-footer-contact">
            <a href="mailto:motchinchiintam@gmail.com">motchinchiintam@gmail.com</a>
          </div>
        </div>
        <div className="pt-footer-copy">© 2026 Nguyen Thanh Quan</div>
      </footer>

    </div>
  );
}

function InsightDetail({ post, onBack, onNavigate }: { post: InsightPost; onBack: () => void; onNavigate: (v: string) => void }) {
  return (
    <div className="pt-page">
      <div className="pt-detail-wrap">

        <button className="pt-back-btn" onClick={onBack}>← Back to Insights</button>

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

      </div>

      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <div className="pt-footer-left">
            <span className="pt-footer-name">Quân</span>
            <span className="pt-footer-tag">HR &amp; Sales Training · HRD</span>
          </div>
          <div className="pt-footer-links">
            {(['work', 'about', 'insights', 'contact'] as const).map(p => (
              <button key={p} className="pt-footer-link" onClick={() => onNavigate(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="pt-footer-copy">© 2026 Nguyen Thanh Quan</div>
      </footer>

    </div>
  );
}
