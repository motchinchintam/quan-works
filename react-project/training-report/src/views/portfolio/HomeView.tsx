import { useState } from 'react';
import { PROJECTS, TESTIMONIALS } from '../../data/portfolio';
import { useLang } from '../../i18n/index';
import CVGate from '../../components/CVGate';

interface HomeViewProps { onNavigate: (v: string) => void; }

const COMPANIES = [
  'Mango for Salon', 'Zota Brand', 'Global Liaison', 'Lotte Duty Free', 'MaxSport',
];

const TRUST_METRICS = [
  { metric: '700 → 4,000+', label: 'Merchant accounts scaled',   company: 'Global Liaison' },
  { metric: '20% → 5%',     label: 'Client churn reduced',       company: 'Zota Brand'     },
  { metric: '100+',         label: 'Staff trained & onboarded',  company: 'Multiple roles'  },
  { metric: '85%+',         label: 'Average training pass rate', company: 'Mango for Salon' },
];

const HELP_CARDS = [
  {
    icon: '📋',
    title: 'Build Training Systems',
    desc: 'Design structured onboarding programs, SOPs, and assessment frameworks that turn new hires into reliable performers — fast.',
    cta: 'See my work',
    view: 'work',
  },
  {
    icon: '📈',
    title: 'Grow Sales Performance',
    desc: 'Build sales training pipelines and retention programs that cut churn, raise close rates, and scale teams across new cities.',
    cta: 'See results',
    view: 'work',
  },
  {
    icon: '🎯',
    title: 'Develop Your People',
    desc: 'HR strategy, KPI frameworks, and coaching systems that give managers the tools to lead — and give people a reason to stay.',
    cta: 'Learn more',
    view: 'about',
  },
];

export default function HomeView({ onNavigate }: HomeViewProps) {
  const base = import.meta.env.BASE_URL;
  const { s } = useLang();
  const [cvOpen, setCvOpen] = useState(false);

  const projects = PROJECTS.slice(0, 3).map((p, i) => ({ ...p, ...s.data.projects[i] }));

  return (
    <>
    <div className="aa-page">

      {/* ══════════════════════════════════════════════════════════
          1. HERO — photo left, greeting right (Ali Abdaal style)
      ══════════════════════════════════════════════════════════ */}
      <section className="aa-hero">
        <div className="aa-hero-inner">

          {/* LEFT — photo with blob */}
          <div className="aa-hero-photo-col">
            <div className="aa-hero-blob-wrap">
              <div className="aa-hero-blob" />
              <img
                src={`${base}photo6.jpg`}
                alt="Nguyen Thanh Quan"
                className="aa-hero-img"
                onError={e => { (e.currentTarget as HTMLImageElement).style.visibility = 'hidden'; }}
              />
            </div>
          </div>

          {/* RIGHT — text */}
          <div className="aa-hero-text-col">
            <h1 className="aa-hero-heading">
              {(() => {
                const parts = s.home.greeting.split('Quân');
                return <>{parts[0]}<span className="aa-hero-name">Quân</span>{parts[1]}</>;
              })()}
            </h1>
            <p className="aa-hero-sub">{s.home.heroSub}</p>

            <div className="aa-hero-badges">
              <span className="aa-badge aa-badge--green">
                <span className="aa-badge-dot" />Open to opportunities
              </span>
              <span className="aa-badge aa-badge--neutral">🌏 Ho Chi Minh City</span>
            </div>

            <div className="aa-hero-stats">
              <div className="aa-stat"><span className="aa-stat-num">6+</span><span className="aa-stat-label">Years exp.</span></div>
              <div className="aa-stat-div" />
              <div className="aa-stat"><span className="aa-stat-num">100+</span><span className="aa-stat-label">Staff trained</span></div>
              <div className="aa-stat-div" />
              <div className="aa-stat"><span className="aa-stat-num">4K+</span><span className="aa-stat-label">Merchants scaled</span></div>
            </div>

            <div className="aa-hero-ctas">
              <button className="aa-btn-primary" onClick={() => onNavigate('work')}>See my work →</button>
              <button className="aa-btn-secondary" onClick={() => onNavigate('contact')}>Get in touch</button>
              <button className="aa-btn-ghost" onClick={() => setCvOpen(true)}>↓ Download CV</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. WORKED WITH — company strip
      ══════════════════════════════════════════════════════════ */}
      <div className="aa-companies-bar">
        <span className="aa-companies-label">Worked with</span>
        <div className="aa-companies-list">
          {COMPANIES.map(c => <span key={c} className="aa-company-chip">{c}</span>)}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          3. HOW CAN I HELP YOU?
      ══════════════════════════════════════════════════════════ */}
      <section className="aa-section aa-help-section">
        <div className="aa-section-inner">
          <h2 className="aa-help-heading">
            How Can I <span className="aa-underline-circle">Help You</span>?
          </h2>
          <div className="aa-help-grid">
            {HELP_CARDS.map(card => (
              <div key={card.title} className="aa-help-card" onClick={() => onNavigate(card.view)}>
                <div className="aa-help-card-icon">{card.icon}</div>
                <h3 className="aa-help-card-title">{card.title}</h3>
                <p className="aa-help-card-desc">{card.desc}</p>
                <span className="aa-help-card-cta">{card.cta} →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. KEY RESULTS BAR
      ══════════════════════════════════════════════════════════ */}
      <div className="aa-results-bar">
        <div className="aa-results-inner">
          <span className="aa-results-label">Key Results</span>
          <div className="aa-results-grid">
            {TRUST_METRICS.map(m => (
              <div key={m.metric} className="aa-result-item">
                <div className="aa-result-num">{m.metric}</div>
                <div className="aa-result-desc">{m.label}</div>
                <div className="aa-result-company">{m.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          5. SELECTED WORK
      ══════════════════════════════════════════════════════════ */}
      <section className="aa-section aa-section--cream">
        <div className="aa-section-inner">
          <div className="aa-section-header">
            <div>
              <p className="aa-eyebrow">Portfolio</p>
              <h2 className="aa-section-title">{s.home.selectedWork}</h2>
            </div>
            <button className="aa-link-btn" onClick={() => onNavigate('work')}>{s.common.seeAll}</button>
          </div>
          <div className="aa-work-list">
            {projects.map((p, i) => (
              <div key={p.id} className="aa-work-item" onClick={() => onNavigate('work')}>
                <span className="aa-work-num">0{i + 1}</span>
                <div className="aa-work-body">
                  <div className="aa-work-tags">
                    {p.tags.map(t => <span key={t} className="aa-tag">{t}</span>)}
                  </div>
                  <h3 className="aa-work-title">{p.title}</h3>
                  <p className="aa-work-context">{p.context}</p>
                </div>
                <div className="aa-work-result">
                  <div className="aa-work-result-label">Result</div>
                  <div className="aa-work-result-val">{p.result}</div>
                </div>
                <span className="aa-work-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section className="aa-section">
        <div className="aa-section-inner">
          <p className="aa-eyebrow">Social proof</p>
          <h2 className="aa-section-title">What People Say</h2>
          <div className="aa-testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="aa-testi-card">
                <div className="aa-testi-stars">★★★★★</div>
                <p className="aa-testi-body">"{t.quote}"</p>
                <div className="aa-testi-author">
                  <div className="aa-testi-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="aa-testi-name">{t.name}</div>
                    <div className="aa-testi-role">{t.role} · {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. ABOUT PREVIEW (Ali's "Hey, I'm" split section)
      ══════════════════════════════════════════════════════════ */}
      <section className="aa-section aa-section--cream">
        <div className="aa-section-inner aa-about-split">
          <div className="aa-about-text">
            <p className="aa-eyebrow">About me</p>
            <h2 className="aa-about-heading">
              Hey, I'm<br /><strong>Nguyen Thanh Quân.</strong>
            </h2>
            <p className="aa-about-body">{s.home.aboutBody}</p>
            <button className="aa-btn-primary" onClick={() => onNavigate('about')}>
              {s.home.fullAbout}
            </button>
          </div>
          <div className="aa-about-photos">
            <img src={`${base}photo1.jpg`} alt="" className="aa-about-photo aa-about-photo--main"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <img src={`${base}photo2.jpg`} alt="" className="aa-about-photo aa-about-photo--accent"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="aa-cta-banner">
        <div className="aa-section-inner aa-cta-inner">
          <h2 className="aa-cta-heading">{s.common.interestedWorking}</h2>
          <p className="aa-cta-sub">Based in Ho Chi Minh City · Available for remote collaboration</p>
          <div className="aa-cta-btns">
            <button className="aa-btn-primary" onClick={() => onNavigate('contact')}>Get in touch →</button>
            <a href="https://www.linkedin.com/in/motchinchintam/" target="_blank" rel="noopener noreferrer"
              className="aa-btn-secondary">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          9. FOOTER — multi-column with social circles
      ══════════════════════════════════════════════════════════ */}
      <footer className="aa-footer">
        <div className="aa-footer-top">
          <div className="aa-footer-brand">
            <div className="aa-footer-logo">Quân</div>
            <p className="aa-footer-copy">© Nguyen Thanh Quan 2025. All rights reserved.</p>
            <div className="aa-footer-socials">
              <a href="https://www.linkedin.com/in/motchinchintam/" target="_blank" rel="noopener noreferrer" className="aa-social-circle" aria-label="LinkedIn">in</a>
              <a href="https://www.facebook.com/availableeeeee/" target="_blank" rel="noopener noreferrer" className="aa-social-circle" aria-label="Facebook">f</a>
              <a href="https://www.instagram.com/motchinchintam" target="_blank" rel="noopener noreferrer" className="aa-social-circle" aria-label="Instagram">◎</a>
              <a href="https://zalo.me/0916366443" target="_blank" rel="noopener noreferrer" className="aa-social-circle" aria-label="Zalo">Z</a>
              <a href="mailto:motchinchiintam@gmail.com" className="aa-social-circle" aria-label="Email">✉</a>
            </div>
          </div>
          <div className="aa-footer-cols">
            <div className="aa-footer-col">
              <div className="aa-footer-col-title">Navigate</div>
              {(['work', 'about', 'insights', 'contact'] as const).map(p => (
                <button key={p} className="aa-footer-link" onClick={() => onNavigate(p)}>
                  {s.nav[p]}
                </button>
              ))}
            </div>
            <div className="aa-footer-col">
              <div className="aa-footer-col-title">Work</div>
              <button className="aa-footer-link" onClick={() => onNavigate('work')}>Case Studies</button>
              <button className="aa-footer-link" onClick={() => onNavigate('about')}>Experience</button>
              <button className="aa-footer-link" onClick={() => onNavigate('insights')}>Articles</button>
            </div>
            <div className="aa-footer-col">
              <div className="aa-footer-col-title">Contact</div>
              <a className="aa-footer-link" href="mailto:motchinchiintam@gmail.com">Email me</a>
              <a className="aa-footer-link" href="https://zalo.me/0916366443" target="_blank" rel="noopener noreferrer">Zalo</a>
              <button className="aa-footer-link" onClick={() => setCvOpen(true)}>Download CV</button>
            </div>
          </div>
        </div>
      </footer>

    </div>

    {cvOpen && <CVGate onClose={() => setCvOpen(false)} />}
    </>
  );
}
