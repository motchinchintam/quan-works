import { useState } from 'react';
import {
  AGENTS, callAI, PROVIDERS,
  getActiveProvider, getProviderKey, getProviderModel,
} from '../../data/mktHub';
import type { MktSkill } from '../../data/mktHub';

interface Props { agentId: string; }

type Status = 'idle' | 'loading' | 'done' | 'error';

// ── Simple markdown renderer (no extra dependencies) ─────────────
function renderMd(raw: string): string {
  const lines = raw.split('\n');
  const out: string[] = [];
  let inUl = false;
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Tables
    if (line.trim().startsWith('|')) {
      if (!inTable) { if (inUl) { out.push('</ul>'); inUl = false; } out.push('<div class="mkt-out-table-wrap"><table class="mkt-out-table">'); inTable = true; }
      if (/^\|[-\s|:]+\|$/.test(line.trim())) continue; // separator
      const cells = line.split('|').slice(1, -1);
      const tag = (i === lines.findIndex(l => l.trim().startsWith('|'))) ? 'th' : 'td';
      out.push('<tr>' + cells.map(c => `<${tag}>${inlinemd(c.trim())}</${tag}>`).join('') + '</tr>');
      continue;
    }
    if (inTable) { out.push('</table></div>'); inTable = false; }

    // Headers
    if (line.startsWith('#### ')) { out.push(`<h5 class="mkt-out-h5">${inlinemd(line.slice(5))}</h5>`); continue; }
    if (line.startsWith('### '))  { out.push(`<h4 class="mkt-out-h4">${inlinemd(line.slice(4))}</h4>`); continue; }
    if (line.startsWith('## '))   { out.push(`<h3 class="mkt-out-h3">${inlinemd(line.slice(3))}</h3>`); continue; }
    if (line.startsWith('# '))    { out.push(`<h2 class="mkt-out-h2">${inlinemd(line.slice(2))}</h2>`); continue; }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) { out.push('<hr class="mkt-out-hr">'); continue; }

    // Bullet lists
    if (/^[-*] /.test(line)) {
      if (!inUl) { out.push('<ul class="mkt-out-ul">'); inUl = true; }
      out.push(`<li class="mkt-out-li">${inlinemd(line.slice(2))}</li>`);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      if (inUl) { out.push('</ul>'); inUl = false; }
      const text = line.replace(/^\d+\. /, '');
      out.push(`<li class="mkt-out-li mkt-out-li--num">${inlinemd(text)}</li>`);
      continue;
    }
    if (inUl) { out.push('</ul>'); inUl = false; }

    // Checkbox
    if (line.trim().startsWith('- [ ]') || line.trim().startsWith('- [x]')) {
      const done = line.includes('[x]');
      const text = line.replace(/- \[[ x]\] /, '');
      out.push(`<div class="mkt-out-check${done ? ' done' : ''}"><span>${done ? '☑' : '☐'}</span> ${inlinemd(text)}</div>`);
      continue;
    }

    // Empty line
    if (!line.trim()) { out.push('<div class="mkt-out-spacer"></div>'); continue; }

    out.push(`<p class="mkt-out-p">${inlinemd(line)}</p>`);
  }

  if (inUl)    out.push('</ul>');
  if (inTable) out.push('</table></div>');
  return out.join('\n');
}

function inlinemd(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code class="mkt-out-code">$1</code>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}

// ── Main component ───────────────────────────────────────────────
export default function MktAgentView({ agentId }: Props) {
  const agent = AGENTS.find(a => a.id === agentId);
  const [selected, setSelected] = useState<MktSkill | null>(null);
  const [answers,  setAnswers]  = useState<Record<string, string>>({});
  const [status,   setStatus]   = useState<Status>('idle');
  const [output,   setOutput]   = useState('');
  const [error,    setError]    = useState('');
  const [copied,   setCopied]   = useState(false);

  const provider    = getActiveProvider();
  const providerCfg = PROVIDERS.find(p => p.id === provider)!;
  const apiKey      = getProviderKey(provider);
  const model       = getProviderModel(provider);

  if (!agent) return <div className="mkt-err">Agent not found.</div>;

  function selectSkill(skill: MktSkill) {
    setSelected(skill);
    setAnswers({});
    setStatus('idle');
    setOutput('');
    setError('');
  }

  function back() {
    setSelected(null);
    setStatus('idle');
    setOutput('');
    setError('');
  }

  async function generate(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!apiKey) { setError(`Please set your ${providerCfg.name} API key on the Marketing Hub overview page.`); return; }
    if (!selected) return;

    setStatus('loading');
    setOutput('');
    setError('');

    try {
      const userMsg = selected.buildPrompt(answers);
      const result  = await callAI(provider, apiKey, model, selected.systemPrompt, userMsg);
      setOutput(result);
      setStatus('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus('error');
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadMd() {
    const blob = new Blob([output], { type: 'text/markdown' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${selected?.id ?? 'output'}-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Skill list ───────────────────────────────────────────────
  if (!selected) return (
    <div className="mkt-agent-page">
      {/* Agent header */}
      <div className="mkt-agent-header" style={{ '--agent-color': agent.color } as React.CSSProperties}>
        <div className="mkt-agent-header-icon">{agent.icon}</div>
        <div>
          <h1 className="mkt-agent-header-name">{agent.name}</h1>
          <div className="mkt-agent-header-role">{agent.role}</div>
          <p className="mkt-agent-header-desc">{agent.description}</p>
        </div>
      </div>

      {/* Capabilities */}
      <div className="mkt-caps-list">
        {agent.capabilities.map((c, i) => (
          <span key={i} className="mkt-cap-chip">✓ {c}</span>
        ))}
      </div>

      {/* API key warning */}
      {!apiKey && (
        <div className="mkt-warn-bar">
          ⚠ No {providerCfg.name} API key set. Go to <strong>Marketing Hub Overview</strong> and enter your key first.
        </div>
      )}

      {/* Skill grid */}
      <h2 className="mkt-skills-heading">Select a Skill</h2>
      <div className="mkt-skills-grid">
        {agent.skills.map(skill => (
          <button
            key={skill.id}
            className="mkt-skill-card"
            onClick={() => selectSkill(skill)}
          >
            <div className="mkt-skill-icon">{skill.icon}</div>
            <div className="mkt-skill-name">{skill.name}</div>
            <div className="mkt-skill-name-vi">{skill.nameVi}</div>
            <div className="mkt-skill-desc">{skill.description}</div>
            <div className="mkt-skill-cta">Use this skill →</div>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Skill form + output ──────────────────────────────────────
  return (
    <div className="mkt-agent-page">
      {/* Breadcrumb */}
      <div className="mkt-breadcrumb">
        <button className="mkt-back-btn" onClick={back}>← Back to {agent.name}</button>
        <span className="mkt-breadcrumb-sep">›</span>
        <span>{selected.icon} {selected.name}</span>
      </div>

      <div className="mkt-runner-layout">
        {/* ── Form panel ──────────────────────────────────────────── */}
        <div className="mkt-form-panel">
          <div className="mkt-form-skill-header">
            <span className="mkt-form-skill-icon">{selected.icon}</span>
            <div>
              <div className="mkt-form-skill-name">{selected.name}</div>
              <div className="mkt-form-skill-vi">{selected.nameVi}</div>
            </div>
          </div>
          <p className="mkt-form-skill-desc">{selected.description}</p>

          <form className="mkt-form" onSubmit={generate}>
            {selected.questions.map(q => (
              <div key={q.id} className="mkt-field">
                <label className="mkt-label">
                  {q.label}
                  {q.required && <span className="mkt-required">*</span>}
                </label>

                {q.type === 'select' ? (
                  <select
                    className="mkt-select"
                    value={answers[q.id] ?? ''}
                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    required={q.required}
                  >
                    <option value="">— choose —</option>
                    {q.options?.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : q.type === 'textarea' ? (
                  <textarea
                    className="mkt-textarea"
                    rows={q.rows ?? 3}
                    placeholder={q.placeholder}
                    value={answers[q.id] ?? ''}
                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    required={q.required}
                  />
                ) : (
                  <input
                    className="mkt-input"
                    type="text"
                    placeholder={q.placeholder}
                    value={answers[q.id] ?? ''}
                    onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                    required={q.required}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="mkt-generate-btn"
              disabled={status === 'loading' || !apiKey}
            >
              {status === 'loading' ? (
                <><span className="mkt-spinner" /> Generating...</>
              ) : (
                `⚡ Generate with ${providerCfg.name}`
              )}
            </button>

            {!apiKey && (
              <p className="mkt-field-warn">Set your {providerCfg.name} API key on the hub overview to enable generation.</p>
            )}
          </form>
        </div>

        {/* ── Output panel ────────────────────────────────────────── */}
        <div className="mkt-output-panel">
          {status === 'idle' && (
            <div className="mkt-output-empty">
              <div className="mkt-output-empty-icon">📄</div>
              <div className="mkt-output-empty-text">
                Fill in the form and click <strong>Generate</strong> to get your marketing document.
              </div>
              <div className="mkt-output-empty-hint">
                Output will be 1000–2500 words with tables, timelines, and specific numbers.
              </div>
            </div>
          )}

          {status === 'loading' && (
            <div className="mkt-output-loading">
              <div className="mkt-output-spinner-wrap">
                <div className="mkt-output-spinner" />
              </div>
              <div className="mkt-output-loading-text">{providerCfg.name} is generating your document…</div>
              <div className="mkt-output-loading-hint">This usually takes 15–45 seconds for full documents.</div>
            </div>
          )}

          {status === 'error' && (
            <div className="mkt-output-error">
              <div className="mkt-output-error-icon">⚠</div>
              <strong>Generation failed</strong>
              <p>{error}</p>
              <button className="mkt-retry-btn" onClick={() => setStatus('idle')}>Try again</button>
            </div>
          )}

          {status === 'done' && output && (
            <>
              {/* Toolbar */}
              <div className="mkt-output-toolbar">
                <div className="mkt-output-toolbar-label">
                  {selected.icon} {selected.name} — Generated {new Date().toLocaleDateString('vi-VN')}
                </div>
                <div className="mkt-output-toolbar-actions">
                  <button className="mkt-tool-btn" onClick={copy}>
                    {copied ? '✓ Copied!' : '📋 Copy'}
                  </button>
                  <button className="mkt-tool-btn" onClick={downloadMd}>
                    ⬇ Download .md
                  </button>
                  <button className="mkt-tool-btn" onClick={() => { setStatus('idle'); setOutput(''); }}>
                    ✕ Clear
                  </button>
                </div>
              </div>

              {/* Rendered output */}
              <div
                className="mkt-output-body"
                dangerouslySetInnerHTML={{ __html: renderMd(output) }}
              />

              {/* Raw text toggle */}
              <RawToggle raw={output} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function RawToggle({ raw }: { raw: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="mkt-raw-section">
      <button className="mkt-raw-toggle" onClick={() => setShow(s => !s)}>
        {show ? '▲ Hide raw markdown' : '▼ Show raw markdown'}
      </button>
      {show && <pre className="mkt-raw-block">{raw}</pre>}
    </div>
  );
}
