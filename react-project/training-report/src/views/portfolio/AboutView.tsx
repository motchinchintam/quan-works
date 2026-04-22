import { STRENGTHS, TIMELINE } from '../../data/portfolio';

interface AboutViewProps { onNavigate: (v: string) => void; }

const HOW_I_WORK = [
  { label: 'Start with the root cause',     desc: "I don't treat symptoms. Before designing a solution, I ask what's actually causing the problem — and whether my assumption is correct." },
  { label: 'Build for the team, not myself', desc: "The best system is one that runs without me in the room. I design processes people can follow and improve on their own." },
  { label: 'Measure what matters',           desc: "KPIs only work when connected to outcomes people care about. I build frameworks that make performance visible and purposeful." },
  { label: 'Execution over theory',          desc: "Ideas are easy. What separates good work from great work is follow-through. I close the loop — every time." },
];

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="pt-page">

      {/* Page intro */}
      <div className="pt-page-hero pt-page-hero--about">
        <div className="pt-section-inner">
          <span className="pt-eyebrow">About</span>
          <h1 className="pt-page-title">Nguyen Thanh Quan</h1>
          <p className="pt-page-sub">
            HR &amp; Sales Training HRD · Language Learner · Traveler
          </p>
        </div>
      </div>

      {/* Background */}
      <section className="pt-section">
        <div className="pt-section-inner pt-about-body">
          <div className="pt-about-bio">
            <span className="pt-eyebrow">Background</span>
            <p>
              I'm a Sales &amp; HR Development professional with 6+ years of experience driving revenue growth,
              building client portfolios, and leading high-performing teams across SaaS, retail, and duty-free
              environments. I've scaled merchant accounts from hundreds to thousands, cut churn rates in half,
              and built training systems that consistently turn new hires into top performers.
            </p>
            <p>
              I thrive in fast-paced, target-driven environments and bring a sharp analytical mindset to every
              problem — combining hands-on selling experience with the discipline of building systems and processes
              that outlast my direct involvement.
            </p>
            <p>
              Outside of work, I'm learning Mandarin and English, planning to travel abroad, and working through
              a reading list that keeps getting longer.
            </p>
          </div>

          {/* Certifications */}
          <div className="pt-about-certs">
            <span className="pt-eyebrow">Certifications</span>
            <div className="pt-cert-card">
              <div className="pt-cert-name">IELTS – Score 6.0 (B2)</div>
              <div className="pt-cert-issuer">British Council · 2018</div>
            </div>
            <div className="pt-cert-card">
              <div className="pt-cert-name">Mid-Level Management &amp; Leadership</div>
              <div className="pt-cert-issuer">HUREDIN Institute · K13 · Excellent · 2025</div>
            </div>
            <div className="pt-cert-card">
              <div className="pt-cert-name">English Pedagogy</div>
              <div className="pt-cert-issuer">University of Khanh Hoa · Merit Scholarship × 4</div>
            </div>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">How I work</h2>
          <p className="pt-section-sub">The principles that guide how I approach every project.</p>
          <div className="pt-howwork-grid">
            {HOW_I_WORK.map(h => (
              <div key={h.label} className="pt-howwork-card">
                <h3 className="pt-howwork-title">{h.label}</h3>
                <p className="pt-howwork-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="pt-section">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">Core Strengths</h2>
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

      {/* Timeline */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <h2 className="pt-section-title">Experience</h2>
          <div className="pt-timeline">
            {TIMELINE.map(t => (
              <div key={t.period} className="pt-timeline-item">
                <div className="pt-timeline-period">{t.period}</div>
                <div className="pt-timeline-content">
                  <div className="pt-timeline-role">{t.role}</div>
                  <div className="pt-timeline-company">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-cta-section">
        <div className="pt-section-inner pt-cta-inner">
          <p className="pt-cta-line">Interested in working together?</p>
          <button className="pt-btn-primary" onClick={() => onNavigate('contact')}>Contact</button>
        </div>
      </section>

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
