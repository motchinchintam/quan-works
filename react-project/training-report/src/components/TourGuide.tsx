import { useState, useEffect } from 'react';

const TOUR_KEY = 'site-tour-done-v1';

interface Step {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  color: string;
  view: string;   // which page to navigate to when this step shows
  hint?: string;
}

const STEPS: Step[] = [
  {
    icon: '👋',
    tag: 'Welcome',
    title: "Hi, I'm Quân's site",
    desc: "This quick tour shows you what's here and where to find things. Takes about 30 seconds.",
    color: '#1F3D2B',
    view: 'home',
  },
  {
    icon: '🗂',
    tag: 'Work',
    title: 'See the Work',
    desc: 'Real case studies — onboarding systems, churn reduction, team scaling. Every project shows the context, approach, and actual result.',
    color: '#2d5a3f',
    view: 'work',
    hint: 'You\'re now on the Work page — click any project to read the full case study.',
  },
  {
    icon: '👤',
    tag: 'About',
    title: 'Read the Background',
    desc: "Quân's story, certifications, how he works, his core strengths, and the experience timeline. Plus his key achievements and a CV download.",
    color: '#3d6b50',
    view: 'about',
    hint: 'You\'re now on the About page — scroll down to explore.',
  },
  {
    icon: '✍️',
    tag: 'Insights',
    title: 'Explore the Writing',
    desc: 'Short, practical articles on HR, training design, and management — written from real experience, not theory.',
    color: '#4a7a5a',
    view: 'insights',
    hint: 'You\'re now on the Insights page — click any article to read it.',
  },
  {
    icon: '✉️',
    tag: 'Contact',
    title: 'Get in Touch',
    desc: 'Reach Quân by email, phone, Zalo, or LinkedIn. You can also send a message directly from this page or request his CV.',
    color: '#1F3D2B',
    view: 'contact',
    hint: 'You\'re now on the Contact page — the form is at the bottom.',
  },
  {
    icon: '🔗',
    tag: 'Social & Search',
    title: 'Quick Access',
    desc: 'The left sidebar has one-click links to LinkedIn, Email, and social profiles. The search button (bottom-left) opens Google in a new tab.',
    color: '#2d5a3f',
    view: 'home',
    hint: 'Back on Home — social icons are on the left edge (wide screens only).',
  },
];

interface TourGuideProps { onNavigate: (v: string) => void; }

export default function TourGuide({ onNavigate }: TourGuideProps) {
  const [step,    setStep]    = useState(0);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) {
      const t = setTimeout(() => setVisible(true), 3200);
      return () => clearTimeout(t);
    }
  }, []);

  // Navigate to the current step's view whenever step changes
  useEffect(() => {
    if (visible) {
      onNavigate(STEPS[step].view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step, visible]); // eslint-disable-line react-hooks/exhaustive-deps

  function dismiss() {
    setLeaving(true);
    localStorage.setItem(TOUR_KEY, '1');
    onNavigate('home');
    setTimeout(() => setVisible(false), 320);
  }

  function goTo(nextStep: number) {
    setLeaving(true);
    setTimeout(() => {
      setStep(nextStep);
      setLeaving(false);
    }, 200);
  }

  function next() {
    if (step < STEPS.length - 1) goTo(step + 1);
    else dismiss();
  }

  function prev() {
    if (step > 0) goTo(step - 1);
  }

  if (!visible) return null;

  const current = STEPS[step];
  const isLast  = step === STEPS.length - 1;

  return (
    <div className="tg-backdrop" onClick={dismiss}>
      <div
        className={`tg-card${leaving ? ' tg-card--out' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress pips */}
        <div className="tg-progress">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`tg-pip${i === step ? ' tg-pip--active' : i < step ? ' tg-pip--done' : ''}`}
              onClick={() => goTo(i)}
              title={STEPS[i].tag}
            />
          ))}
        </div>

        {/* Tag + skip */}
        <div className="tg-meta">
          <span className="tg-tag">{current.tag}</span>
          <button className="tg-skip" onClick={dismiss}>Skip tour</button>
        </div>

        {/* Content */}
        <div className="tg-body">
          <div className="tg-icon" style={{ background: current.color + '18' }}>
            {current.icon}
          </div>
          <div>
            <h3 className="tg-title">{current.title}</h3>
            <p className="tg-desc">{current.desc}</p>
            {current.hint && (
              <p className="tg-hint">
                <span className="tg-hint-arrow">→</span> {current.hint}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="tg-actions">
          <button className="tg-btn-prev" onClick={prev} disabled={step === 0}>
            ← Prev
          </button>
          <span className="tg-counter">{step + 1} / {STEPS.length}</span>
          <button className="tg-btn-next" onClick={next}>
            {isLast ? 'Done ✓' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
