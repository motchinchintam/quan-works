import { PROJECTS, STRENGTHS, INSIGHTS } from '../../data/portfolio';

interface HomeViewProps { onNavigate: (v: string) => void; }

const FEATURED = PROJECTS.slice(0, 3);

export default function HomeView({ onNavigate }: HomeViewProps) {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="pt-page">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="pt-hero">
        <div className="pt-hero-text">
          <span className="pt-eyebrow">HR &amp; Sales Training · HRD</span>
          <h1 className="pt-hero-headline">
            I help teams grow through systems, training, and structured execution.
          </h1>
          <p className="pt-hero-sub">
            Sales &amp; HR Development professional with 6+ years building onboarding programs,
            reducing churn, and scaling teams across SaaS, retail, and duty-free environments.
          </p>
          <div className="pt-hero-ctas">
            <button className="pt-btn-primary"   onClick={() => onNavigate('work')}>View Work</button>
            <button className="pt-btn-secondary" onClick={() => onNavigate('contact')}>Contact</button>
          </div>
        </div>
        <div className="pt-hero-visual">
          <img
            src={`${base}newphoto.png`}
            alt="Nguyen Thanh Quan"
            className="pt-hero-photo"
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
          />
        </div>
      </section>

      {/* ── Selected Work ─────────────────────────────────────────────────── */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <div className="pt-section-header">
            <h2 className="pt-section-title">Selected Work</h2>
            <button className="pt-link-btn" onClick={() => onNavigate('work')}>See all →</button>
          </div>
          <div className="pt-projects-grid">
            {FEATURED.map(p => (
              <div key={p.id} className="pt-project-card" onClick={() => onNavigate('work')}>
                <div className="pt-project-tags">
                  {p.tags.map(t => <span key={t} className="pt-tag">{t}</span>)}
                </div>
                <h3 className="pt-project-title">{p.title}</h3>
                <p className="pt-project-context">{p.context}</p>
                <div className="pt-project-result">{p.result}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Snapshot ────────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner pt-about-snap">
          <div className="pt-about-snap-text">
            <span className="pt-eyebrow">About</span>
            <h2 className="pt-section-title">Mindset over title.</h2>
            <p className="pt-about-snap-body">
              I care more about building systems that last than hitting short-term numbers.
              Whether it's designing a training program from scratch, cutting churn through
              better client engagement, or scaling a team across multiple cities — I approach
              every problem by asking what the root cause is, not just what the symptom looks like.
            </p>
            <button className="pt-link-btn" onClick={() => onNavigate('about')}>Full About →</button>
          </div>
          <div className="pt-about-snap-visual">
            <div className="pt-about-snap-block">
              <div className="pt-about-snap-stat"><span className="pt-abs-num">6+</span><span className="pt-abs-label">Years Experience</span></div>
              <div className="pt-about-snap-stat"><span className="pt-abs-num">100+</span><span className="pt-abs-label">Staff Trained</span></div>
              <div className="pt-about-snap-stat"><span className="pt-abs-num">4K+</span><span className="pt-abs-label">Merchant Accounts</span></div>
              <div className="pt-about-snap-stat"><span className="pt-abs-num">85%+</span><span className="pt-abs-label">Avg Pass Rate</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Strengths ────────────────────────────────────────────────── */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">Core Strengths</h2>
          <p className="pt-section-sub">What I do best — and how I approach every engagement.</p>
          <div className="pt-strengths-grid">
            {STRENGTHS.map((s, i) => (
              <div key={s.title} className="pt-strength-card">
                <span className="pt-strength-num">0{i + 1}</span>
                <h3 className="pt-strength-title">{s.title}</h3>
                <p className="pt-strength-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insights ─────────────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner">
          <div className="pt-section-header">
            <h2 className="pt-section-title">Insights</h2>
            <button className="pt-link-btn" onClick={() => onNavigate('insights')}>See all →</button>
          </div>
          <div className="pt-insights-grid">
            {INSIGHTS.map(ins => (
              <div key={ins.id} className="pt-insight-card" onClick={() => onNavigate('insights')}>
                <div className="pt-insight-meta">
                  <span className="pt-tag">{ins.tag}</span>
                  <span className="pt-insight-time">{ins.readTime} · {ins.date}</span>
                </div>
                <h3 className="pt-insight-title">{ins.title}</h3>
                <p className="pt-insight-excerpt">{ins.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="pt-cta-section">
        <div className="pt-section-inner pt-cta-inner">
          <p className="pt-cta-line">Interested in working together?</p>
          <button className="pt-btn-primary" onClick={() => onNavigate('contact')}>Contact</button>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
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
            <a href="https://www.linkedin.com/in/motchinchintam/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <div className="pt-footer-copy">© 2026 Nguyen Thanh Quan</div>
      </footer>

    </div>
  );
}
