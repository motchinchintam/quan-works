import { useState, useEffect } from 'react';

const SESSION_KEY = 'welcome-shown';

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      // Small delay so the page renders first
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    setClosing(true);
    sessionStorage.setItem(SESSION_KEY, '1');
    setTimeout(() => setVisible(false), 350);
  }

  if (!visible) return null;

  return (
    <div className={`wm-overlay${closing ? ' wm-overlay--out' : ''}`} onClick={dismiss}>
      <div className={`wm-card${closing ? ' wm-card--out' : ''}`} onClick={e => e.stopPropagation()}>

        <div className="wm-wave">✦</div>
        <h2 className="wm-title">Welcome</h2>
        <p className="wm-greeting">
          Xin chào — I'm <strong>Quân</strong>.
        </p>
        <p className="wm-sub">
          Thank you for stopping by. I'm glad you're here.
          <br />
          Feel free to explore my work, read my story, or reach out directly.
        </p>

        <button className="wm-btn" onClick={dismiss}>
          Let's go →
        </button>

        <button className="wm-close" onClick={dismiss} aria-label="Close">✕</button>
      </div>
    </div>
  );
}
