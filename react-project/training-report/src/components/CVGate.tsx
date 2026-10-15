import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface CVGateProps {
  onClose: () => void;
}

const SERVICE_ID  = 'service_yh241na';
const TEMPLATE_ID = 'template_er27wcf';
const PUBLIC_KEY  = '3UnNkgBBIF_gnCUaA';
const SENT_KEY    = 'cv-sent-emails'; // localStorage — one request per email

function hasSentBefore(email: string): boolean {
  try {
    const stored = JSON.parse(localStorage.getItem(SENT_KEY) || '[]') as string[];
    return stored.includes(email);
  } catch {
    return false;
  }
}

function markAsSent(email: string): void {
  try {
    const stored = JSON.parse(localStorage.getItem(SENT_KEY) || '[]') as string[];
    if (!stored.includes(email)) {
      stored.push(email);
      localStorage.setItem(SENT_KEY, JSON.stringify(stored));
    }
  } catch { /* ignore */ }
}

export default function CVGate({ onClose }: CVGateProps) {
  const [email,  setEmail]  = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'duplicate' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function isValid(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();

    if (!isValid(normalized)) { setErrMsg('Please enter a valid email address.'); return; }

    if (hasSentBefore(normalized)) { setStatus('duplicate'); return; }

    setStatus('loading');
    setErrMsg('');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // Match these variable names in your EmailJS template
          email:      normalized,
          from_email: normalized,
          message:    `CV requested by: ${normalized}\nTime: ${new Date().toLocaleString('en-GB')}`,
        },
        PUBLIC_KEY,
      );
      markAsSent(normalized);
      setStatus('done');
      setTimeout(onClose, 2500);
    } catch (_) {
      setStatus('error');
      setErrMsg('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="cvg-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cvg-card">

        {status === 'done' && (
          <>
            <div className="cvg-icon">✅</div>
            <h2 className="cvg-title">Request sent!</h2>
            <p className="cvg-sub">
              Quân will send his CV to <strong>{email.trim()}</strong> — check your inbox shortly.
            </p>
          </>
        )}

        {status === 'duplicate' && (
          <>
            <div className="cvg-icon">📬</div>
            <h2 className="cvg-title">Already requested</h2>
            <p className="cvg-sub">
              A request was already made from this email. Check your inbox, or contact Quân directly.
            </p>
            <button className="cvg-skip" onClick={onClose}>Close</button>
          </>
        )}

        {(status === 'idle' || status === 'loading' || status === 'error') && (
          <>
            <div className="cvg-icon">📄</div>
            <h2 className="cvg-title">Get Quân's CV</h2>
            <p className="cvg-sub">
              Enter your email and Quân will send his CV directly to you.
            </p>

            <form className="cvg-form" onSubmit={handleSubmit} noValidate>
              <input
                ref={inputRef}
                type="email"
                className={`cvg-input${errMsg ? ' cvg-input--error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrMsg(''); if (status === 'error') setStatus('idle'); }}
                disabled={status === 'loading'}
              />
              {errMsg && <p className="cvg-error">{errMsg}</p>}

              <button type="submit" className="cvg-submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Request CV →'}
              </button>
            </form>

            <button className="cvg-skip" onClick={onClose}>Cancel</button>
          </>
        )}

      </div>
    </div>
  );
}
