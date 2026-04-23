import { useState, useRef, useEffect } from 'react';

interface CVGateProps {
  onClose: () => void;
}

// ── Web3Forms API key ────────────────────────────────────────────────────────
// 1. Go to https://web3forms.com  →  enter your email  →  get free API key
// 2. Replace the string below with your key
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

export default function CVGate({ onClose }: CVGateProps) {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errMsg,  setErrMsg]  = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function isValid(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid(email)) { setErrMsg('Please enter a valid email address.'); return; }

    setStatus('loading');
    setErrMsg('');

    try {
      // Send email to Quân via Web3Forms (free, no backend needed)
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: '📄 CV Download — New Lead',
          from_name: 'motchinchintam.com',
          email: email.trim(),
          message: `Someone downloaded your CV.\n\nEmail: ${email.trim()}\nTime: ${new Date().toLocaleString()}`,
        }),
      });
    } catch (_) {
      // Silently fail — download still proceeds
    }

    setStatus('done');

    // Trigger the actual file download
    const link = document.createElement('a');
    link.href = '/quan-resume.pdf';
    link.download = 'Nguyen_Thanh_Quan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close modal after short delay
    setTimeout(onClose, 1800);
  }

  return (
    <div className="cvg-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cvg-card">

        {status === 'done' ? (
          <>
            <div className="cvg-icon">✅</div>
            <h2 className="cvg-title">Download started!</h2>
            <p className="cvg-sub">Thanks — your download should begin automatically.</p>
          </>
        ) : (
          <>
            <div className="cvg-icon">📄</div>
            <h2 className="cvg-title">Download CV</h2>
            <p className="cvg-sub">
              Enter your email to download. I'll only use it to follow up if relevant.
            </p>

            <form className="cvg-form" onSubmit={handleSubmit} noValidate>
              <input
                ref={inputRef}
                type="email"
                className={`cvg-input${errMsg ? ' cvg-input--error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrMsg(''); }}
                disabled={status === 'loading'}
              />
              {errMsg && <p className="cvg-error">{errMsg}</p>}

              <button
                type="submit"
                className="cvg-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : '⬇ Download CV'}
              </button>
            </form>

            <button className="cvg-skip" onClick={onClose}>Cancel</button>
          </>
        )}

      </div>
    </div>
  );
}
