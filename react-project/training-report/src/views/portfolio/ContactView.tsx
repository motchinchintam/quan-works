import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLang } from '../../i18n/index';
import CVGate from '../../components/CVGate';

interface ContactViewProps { onNavigate: (v: string) => void; }

const SERVICE_ID         = 'service_yh241na';
// ⚠ Create a second template in EmailJS for contact messages.
// Template variables to use: {{from_name}}, {{from_email}}, {{message}}
// Then replace the ID below with your new contact template ID.
const CONTACT_TEMPLATE_ID = 'template_vpsg51s';
const PUBLIC_KEY          = '3UnNkgBBIF_gnCUaA';

const CONTACTS = [
  { label: 'Email (primary)',  value: 'motchinchiintam@gmail.com',      href: 'mailto:motchinchiintam@gmail.com',            icon: '✉' },
  { label: 'Email (work)',     value: 'thanhquanvg98@yahoo.com',        href: 'mailto:thanhquanvg98@yahoo.com',              icon: '✉' },
  { label: 'Phone / Zalo',    value: '0916 366 443',                    href: 'https://zalo.me/0916366443',                  icon: '📞' },
  { label: 'LinkedIn',        value: 'linkedin.com/in/motchinchintam', href: 'https://www.linkedin.com/in/motchinchintam/', icon: '💼' },
  { label: 'Facebook',        value: 'fb.com/availableeeeee',           href: 'https://www.facebook.com/availableeeeee/',    icon: 'f' },
  { label: 'Instagram',       value: '@motchinchintam',                href: 'https://www.instagram.com/motchinchintam',    icon: '◎' },
];

function isValidEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
}

export default function ContactView({ onNavigate }: ContactViewProps) {
  const { s } = useLang();
  const [cvGateOpen, setCvGateOpen] = useState(false);

  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [errors,    setErrors]    = useState<{ name?: string; email?: string; message?: string }>({});
  const [status,    setStatus]    = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errDetail, setErrDetail] = useState('');

  function validate() {
    const e: typeof errors = {};
    if (!name.trim())         e.name    = 'Please enter your name.';
    if (!isValidEmail(email)) e.email   = 'Please enter a valid email.';
    if (!message.trim())      e.message = 'Please write a message.';
    return e;
  }

  async function handleSubmit(ev: { preventDefault(): void }) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus('loading');
    try {
      await emailjs.send(
        SERVICE_ID,
        CONTACT_TEMPLATE_ID,
        {
          from_name:  name.trim(),
          from_email: email.trim(),
          email:      email.trim(),
          reply_to:   email.trim(),
          name:       name.trim(),
          message:    message.trim(),
        },
        PUBLIC_KEY,
      );
      setStatus('done');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrDetail(msg);
      setStatus('error');
      console.error('[ContactForm] EmailJS error:', msg);
    }
  }

  return (
    <div className="pt-page">
      {cvGateOpen && <CVGate onClose={() => setCvGateOpen(false)} />}

      <div className="pt-page-hero">
        <div className="pt-section-inner">
          <span className="pt-eyebrow">Get in touch</span>
          <h1 className="pt-page-title">{s.contact.pageTitle}</h1>
          <p className="pt-page-sub">{s.contact.pageSub}</p>
          <button className="pt-cv-download" onClick={() => setCvGateOpen(true)}>
            ⬇ Download CV
          </button>
        </div>
      </div>

      {/* ── Contact cards ────────────────────────────────────────────────── */}
      <section className="pt-section">
        <div className="pt-section-inner">
          <div className="pt-contact-grid">
            {CONTACTS.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="pt-contact-card">
                <span className="pt-contact-icon">{c.icon}</span>
                <div>
                  <div className="pt-contact-label">{c.label}</div>
                  <div className="pt-contact-value">{c.value}</div>
                </div>
                <span className="pt-contact-arrow">↗</span>
              </a>
            ))}
          </div>
          <div className="pt-contact-note">{s.contact.note}</div>
          <div className="pt-contact-meta-row">
            <span className="pt-contact-meta-chip">⏱ Typically replies within 24 hours</span>
            <span className="pt-contact-meta-chip">🌏 Ho Chi Minh City · GMT+7</span>
            <span className="pt-contact-meta-chip">🟢 Open to remote work</span>
          </div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────────────── */}
      <section className="pt-section pt-section--alt">
        <div className="pt-section-inner">
          <div className="pt-contact-form-wrap">
            <h2 className="pt-contact-form-title">Send a message</h2>
            <p className="pt-contact-form-sub">
              Prefer to write directly? Fill in the form and Quân will get back to you.
            </p>

            {status === 'done' ? (
              <div className="pt-cf-success">
                <div className="pt-cf-success-icon">✅</div>
                <div className="pt-cf-success-msg">Message sent!</div>
                <div className="pt-cf-success-sub">Thanks {name} — Quân will reply to {email} shortly.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="pt-cf-group">
                  <label className="pt-cf-label">Your name</label>
                  <input
                    className={`pt-cf-input${errors.name ? ' pt-cf-input--error' : ''}`}
                    type="text"
                    placeholder="Nguyen Van A"
                    value={name}
                    onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                    disabled={status === 'loading'}
                  />
                  {errors.name && <p className="pt-cf-error">{errors.name}</p>}
                </div>

                <div className="pt-cf-group">
                  <label className="pt-cf-label">Email address</label>
                  <input
                    className={`pt-cf-input${errors.email ? ' pt-cf-input--error' : ''}`}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                    disabled={status === 'loading'}
                  />
                  {errors.email && <p className="pt-cf-error">{errors.email}</p>}
                </div>

                <div className="pt-cf-group">
                  <div className="pt-cf-label-row">
                    <label className="pt-cf-label">Message</label>
                    <span className={`pt-cf-char-count${message.length > 1000 ? ' over' : ''}`}>{message.length} / 1000</span>
                  </div>
                  <textarea
                    className={`pt-cf-textarea${errors.message ? ' pt-cf-textarea--error' : ''}`}
                    placeholder="Hi Quân, I'd like to discuss..."
                    value={message}
                    onChange={e => { setMessage(e.target.value); setErrors(p => ({ ...p, message: undefined })); }}
                    disabled={status === 'loading'}
                    maxLength={1000}
                  />
                  {errors.message && <p className="pt-cf-error">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="pt-cf-error" style={{ marginBottom: '.5rem' }}>
                    Failed: {errDetail || 'Unknown error'} — or email directly instead.
                  </p>
                )}

                <button type="submit" className="pt-cf-submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="pt-footer">
        <div className="pt-footer-inner">
          <div className="pt-footer-left">
            <span className="pt-footer-name">Quân</span>
            <span className="pt-footer-tag">{s.common.footerTag}</span>
          </div>
          <div className="pt-footer-links">
            {(['work', 'about', 'insights', 'contact'] as const).map(p => (
              <button key={p} className="pt-footer-link" onClick={() => onNavigate(p)}>
                {s.nav[p]}
              </button>
            ))}
          </div>
          <div className="pt-footer-contact">
            <a href="mailto:motchinchiintam@gmail.com">motchinchiintam@gmail.com</a>
          </div>
        </div>
        <div className="pt-footer-copy">{s.common.footerCopy}</div>
      </footer>

    </div>
  );
}
