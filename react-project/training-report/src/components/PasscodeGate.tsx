import { useState } from 'react';
import emailjs from '@emailjs/browser';

const CODE        = '250798';
const SESSION_KEY = 'hub-unlocked';

const SERVICE_ID  = 'service_yh241na';
const TEMPLATE_ID = 'template_vpsg51s'; // contact template — has from_name, from_email, message
const PUBLIC_KEY  = '3UnNkgBBIF_gnCUaA';
const OWNER_EMAIL = 'motchinchiintam@gmail.com';

interface PasscodeGateProps { onUnlock: () => void; }

export function isHubUnlocked(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1';
}

export default function PasscodeGate({ onUnlock }: PasscodeGateProps) {
  const [digits,       setDigits]       = useState('');
  const [error,        setError]        = useState(false);
  const [shake,        setShake]        = useState(false);
  const [forgotStatus, setForgotStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [forgotErr,    setForgotErr]    = useState('');

  function press(d: string) {
    if (digits.length >= 6) return;
    const next = digits + d;
    setDigits(next);
    setError(false);
    if (next.length === 6) {
      if (next === CODE) {
        sessionStorage.setItem(SESSION_KEY, '1');
        onUnlock();
      } else {
        setShake(true);
        setError(true);
        setTimeout(() => { setDigits(''); setShake(false); }, 700);
      }
    }
  }

  function del() {
    setDigits(d => d.slice(0, -1));
    setError(false);
  }

  async function sendForgotEmail() {
    if (forgotStatus === 'sending' || forgotStatus === 'sent') return;
    setForgotStatus('sending');
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  'Hub Recovery',
          from_email: OWNER_EMAIL,
          email:      OWNER_EMAIL,
          message:    `Your hub passcode is: ${CODE}\n\nKeep this safe — do not share it.`,
        },
        PUBLIC_KEY,
      );
      setForgotStatus('sent');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setForgotErr(msg);
      setForgotStatus('error');
      console.error('[PasscodeGate] EmailJS error:', msg);
    }
  }

  const KEYS = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['','0','⌫'],
  ];

  return (
    <div className="pg-overlay">
      <div className="pg-card">
        <div className="pg-lock">🔒</div>
        <h2 className="pg-title">Enter Passcode</h2>
        <p className="pg-sub">This area is protected. Enter your 6-digit passcode to continue.</p>

        <div className={`pg-dots${shake ? ' pg-shake' : ''}`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`pg-dot${i < digits.length ? ' pg-dot--filled' : ''}${error ? ' pg-dot--error' : ''}`} />
          ))}
        </div>
        {error && <p className="pg-error">Incorrect passcode. Try again.</p>}

        <div className="pg-numpad">
          {KEYS.map((row, ri) => (
            <div key={ri} className="pg-numpad-row">
              {row.map((k, ki) => (
                k === '' ? (
                  <div key={ki} className="pg-key pg-key--empty" />
                ) : k === '⌫' ? (
                  <button key={ki} className="pg-key pg-key--del" onClick={del}>⌫</button>
                ) : (
                  <button key={ki} className="pg-key" onClick={() => press(k)}>{k}</button>
                )
              ))}
            </div>
          ))}
        </div>

        {/* Forgot passcode */}
        <div className="pg-forgot-wrap">
          {forgotStatus === 'idle' && (
            <button className="pg-forgot-btn" onClick={sendForgotEmail}>
              Forgot passcode?
            </button>
          )}
          {forgotStatus === 'sending' && <p className="pg-forgot-msg">Sending…</p>}
          {forgotStatus === 'sent'    && <p className="pg-forgot-msg pg-forgot-msg--ok">✓ Passcode sent to your email</p>}
          {forgotStatus === 'error'   && (
            <>
              <p className="pg-forgot-msg pg-forgot-msg--err">Failed: {forgotErr || 'Unknown error'}</p>
              <button className="pg-forgot-btn" style={{ marginTop: '.25rem' }} onClick={() => { setForgotStatus('idle'); setForgotErr(''); }}>
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
