const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'training-report', 'src', 'App.css');
const content = fs.readFileSync(cssPath, 'utf8');
const lines = content.split('\n');

// Find the SECOND occurrence of "APP V2" and truncate before it
let count = 0;
let cutLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('APP V2')) {
    count++;
    if (count === 2) { cutLine = i; break; }
  }
}

if (cutLine === -1) {
  console.log('No duplicate found, nothing to do.');
  process.exit(0);
}

console.log(`Removing duplicate block starting at line ${cutLine + 1}`);

// Keep only up to (but not including) the duplicate
const kept = lines.slice(0, cutLine);

// New LP personal section CSS to append
const lpCss = `
/* ── Hero two-column layout ── */
.lp-hero {
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 2.5rem 0 3rem;
}
.lp-hero-left { flex: 1; min-width: 0; }
.lp-hero-right { flex-shrink: 0; }

/* Avatar */
.lp-avatar-wrap {
  width: 200px; height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(92,122,60,0.3);
  box-shadow: 0 8px 32px rgba(45,82,40,0.18), 0 0 0 8px rgba(92,122,60,0.08);
  background: rgba(237,232,211,0.6);
}
.lp-avatar {
  width: 100%; height: 100%;
  object-fit: cover; object-position: top center;
  display: block;
}

/* Social links */
.lp-socials {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
}
.lp-social-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 16px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  border: 1.5px solid transparent;
  transition: all .18s;
  font-family: inherit;
}
.lp-social-icon { font-size: 14px; font-weight: 900; line-height: 1; }
.lp-social-fb {
  background: rgba(24,119,242,0.1); color: #1877F2; border-color: rgba(24,119,242,0.25);
}
.lp-social-fb:hover { background: #1877F2; color: #fff; border-color: #1877F2; }
.lp-social-ig {
  background: rgba(214,41,118,0.08); color: #D62976; border-color: rgba(214,41,118,0.22);
}
.lp-social-ig:hover { background: #D62976; color: #fff; border-color: #D62976; }
.lp-social-zalo {
  background: rgba(0,104,255,0.08); color: #0068FF; border-color: rgba(0,104,255,0.22);
}
.lp-social-zalo:hover { background: #0068FF; color: #fff; border-color: #0068FF; }

/* Personal extras grid */
.lp-extras {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 1rem;
  position: relative; z-index: 1;
}
.lp-extra-card {
  background: rgba(255,255,255,0.72);
  border: 1.5px solid rgba(92,122,60,0.18);
  border-radius: 14px;
  padding: 1.25rem 1.4rem;
  backdrop-filter: blur(4px);
}
.lp-extra-heading {
  font-size: 14px; font-weight: 800; color: #2D5228; margin-bottom: 1rem; letter-spacing: -.01em;
}
.lp-extra-sub { font-size: 12px; color: #7A9B5A; margin: -.5rem 0 1rem; line-height: 1.5; }

/* Books */
.lp-book-list { display: flex; flex-direction: column; gap: 12px; }
.lp-book-row { display: flex; align-items: flex-start; gap: 12px; }
.lp-book-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
.lp-book-title { font-size: 14px; font-weight: 700; color: #2D5228; line-height: 1.3; }
.lp-book-author { font-size: 11px; color: #7A9B5A; margin-top: 2px; font-weight: 500; }

/* News */
.lp-news-list { display: flex; flex-direction: column; gap: 10px; }
.lp-news-btn {
  display: flex; align-items: center; gap: 10px; padding: 10px 14px;
  border-radius: 10px; background: rgba(255,255,255,0.7);
  border: 1.5px solid rgba(92,122,60,0.15);
  text-decoration: none; font-size: 14px; font-weight: 700;
  color: var(--news-color, #2D5228); transition: all .15s;
}
.lp-news-btn:hover {
  background: rgba(255,255,255,0.95); border-color: var(--news-color, #2D5228); transform: translateX(3px);
}
.lp-news-arrow { margin-left: auto; font-size: 12px; opacity: .5; transition: opacity .15s; }
.lp-news-btn:hover .lp-news-arrow { opacity: 1; }

@media (max-width: 680px) {
  .lp-hero { flex-direction: column-reverse; align-items: flex-start; gap: 1.5rem; padding: 1.5rem 0 2rem; }
  .lp-hero-right { align-self: center; }
  .lp-avatar-wrap { width: 140px; height: 140px; }
  .lp-extras { grid-template-columns: 1fr; }
}
`;

const output = kept.join('\n') + lpCss;
fs.writeFileSync(cssPath, output, 'utf8');
const finalLines = output.split('\n').length;
console.log(`Done. ${cutLine} lines kept + LP CSS appended. Total: ${finalLines} lines.`);
