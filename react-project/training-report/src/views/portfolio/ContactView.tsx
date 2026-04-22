interface ContactViewProps { onNavigate: (v: string) => void; }

const CONTACTS = [
  { label: 'Email',     value: 'motchinchiintam@gmail.com',              href: 'mailto:motchinchiintam@gmail.com',                   icon: '✉' },
  { label: 'LinkedIn',  value: 'linkedin.com/in/motchinchintam',         href: 'https://www.linkedin.com/in/motchinchintam/',        icon: '💼' },
  { label: 'Facebook',  value: 'fb.com/availableeeeee',                  href: 'https://www.facebook.com/availableeeeee/',           icon: 'f' },
  { label: 'Instagram', value: '@motchinchintam',                        href: 'https://www.instagram.com/motchinchintam',           icon: '◎' },
  { label: 'Zalo',      value: '0916 366 443',                           href: 'https://zalo.me/0916366443',                        icon: 'Z' },
];

export default function ContactView({ onNavigate }: ContactViewProps) {
  return (
    <div className="pt-page">

      <div className="pt-page-hero">
        <div className="pt-section-inner">
          <h1 className="pt-page-title">Contact</h1>
          <p className="pt-page-sub">
            Open to collaboration, conversations, and new opportunities.
            Reach out through any of the channels below.
          </p>
        </div>
      </div>

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

          <div className="pt-contact-note">
            Based in Ho Chi Minh City, Vietnam · Available for remote collaboration
          </div>
        </div>
      </section>

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
