import { useState } from 'react';
import { PROJECTS } from '../../data/portfolio';
import type { Project } from '../../data/portfolio';

interface WorkViewProps { onNavigate: (v: string) => void; }

export default function WorkView({ onNavigate }: WorkViewProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (selected) return <ProjectDetail project={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="pt-page">

      {/* Page intro */}
      <div className="pt-page-hero">
        <div className="pt-section-inner">
          <h1 className="pt-page-title">Work</h1>
          <p className="pt-page-sub">
            Selected projects in training design, team building, and operational improvement.
            Click any project to see the full breakdown.
          </p>
        </div>
      </div>

      {/* Project list */}
      <div className="pt-section-inner pt-work-list">
        {PROJECTS.map((p, i) => (
          <div key={p.id} className="pt-work-item" onClick={() => setSelected(p)}>
            <span className="pt-work-num">0{i + 1}</span>
            <div className="pt-work-info">
              <div className="pt-work-tags">
                {p.tags.map(t => <span key={t} className="pt-tag">{t}</span>)}
              </div>
              <h2 className="pt-work-title">{p.title}</h2>
              <p className="pt-work-meta">{p.company} · {p.period}</p>
              <p className="pt-work-context">{p.context}</p>
            </div>
            <div className="pt-work-result-block">
              <span className="pt-work-result-label">Result</span>
              <span className="pt-work-result-value">{p.result}</span>
            </div>
            <span className="pt-work-arrow">→</span>
          </div>
        ))}
      </div>

      {/* Footer */}
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

/* ── Project detail view ────────────────────────────────────────────── */
function ProjectDetail({ project: p, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div className="pt-page">
      <div className="pt-detail-wrap">

        <button className="pt-back-btn" onClick={onBack}>← Back to Work</button>

        <div className="pt-detail-header">
          <div className="pt-work-tags">
            {p.tags.map(t => <span key={t} className="pt-tag">{t}</span>)}
          </div>
          <h1 className="pt-detail-title">{p.title}</h1>
          <p className="pt-detail-meta">{p.company} · {p.period}</p>
          <div className="pt-detail-result-bar">
            <span className="pt-detail-result-label">Result</span>
            <span className="pt-detail-result-value">{p.result}</span>
          </div>
        </div>

        <div className="pt-detail-body">
          {[
            { label: 'Overview', content: p.detail.overview },
            { label: 'Problem',  content: p.detail.problem  },
            { label: 'Goal',     content: p.detail.goal     },
            { label: 'Solution', content: p.detail.solution },
          ].map(sec => (
            <div key={sec.label} className="pt-detail-section">
              <h2 className="pt-detail-section-title">{sec.label}</h2>
              <p className="pt-detail-section-body">{sec.content}</p>
            </div>
          ))}

          <div className="pt-detail-section">
            <h2 className="pt-detail-section-title">Approach</h2>
            <ul className="pt-detail-list">
              {p.detail.approach.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div className="pt-detail-section pt-detail-section--impact">
            <h2 className="pt-detail-section-title">Impact</h2>
            <ul className="pt-detail-list pt-detail-list--impact">
              {p.detail.impact.map((imp, i) => <li key={i}>{imp}</li>)}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
