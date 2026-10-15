import { useState } from 'react';
import type React from 'react';
import {
  AGENTS, WORKFLOWS,
  PROVIDERS, type MktProvider,
  MKT_PROVIDER_STORAGE,
  getActiveProvider, getProviderKey, getProviderModel,
  setProviderKey, setProviderModel,
} from '../../data/mktHub';

interface Props { onNavigate: (v: string) => void; }

/** Replace with your n8n / Make / Zapier / Cloudflare Worker webhook once wired. */
const WEBHOOK_URL = 'https://api2.cursor.sh/automations/webhook/c118f6f2-91f7-5219-beef-5f373974ea6b';

/** Optional shared secret — leave empty until Quan sets one. Form stays usable for demo UI. */
const MKT_WEBHOOK_AUTH = "Bearer 250798";
const TASK_GATE_CODE = '86dmmp';

const BOT_TEAM = [
  {
    id: 'yuzu',
    name: 'Yuzu',
    icon: '🍊',
    role: 'Office lead',
    blurb: 'Client profiles, growth strategy, monthly plans, and approval routing for the Marketing Office.',
  },
  {
    id: 'noodle',
    name: 'Noodle',
    icon: '🍜',
    role: 'Content & creative',
    blurb: 'Captions, campaign briefs, content calendars, and Canva-ready design directions.',
  },
  {
    id: 'toto',
    name: 'Toto',
    icon: '⭐',
    role: 'Reputation & local SEO',
    blurb: 'Review reply drafts, Google Business Profile tips, and local search hygiene for salons.',
  },
];

const TASK_TYPES = [
  'Monthly plan',
  'Campaign brief',
  'Content / captions',
  'Canva design direction',
  'Review reply batch',
  'GBP / local SEO check',
  'Strategy consult',
  'Other',
] as const;

type TaskStatus = 'idle' | 'loading' | 'done' | 'error' | 'noop';

export default function MktHubView({ onNavigate }: Props) {
  const [provider, setProviderState] = useState<MktProvider>(getActiveProvider);
  const [keyDraft,   setKeyDraft]   = useState('');
  const [keySaved,   setKeySaved]   = useState(false);
  const [model,      setModelState] = useState(() => getProviderModel(getActiveProvider()));

  // Task request → webhook (triggers Marketing Office bot routine)
  const [clientName, setClientName] = useState('');
  const [taskType,   setTaskType]   = useState('');
  const [details,    setDetails]    = useState('');
  const [dueDate,    setDueDate]    = useState('');
  const [gateCode,   setGateCode]   = useState('');
  const [taskStatus, setTaskStatus] = useState<TaskStatus>('idle');
  const [taskError,  setTaskError]  = useState('');

  const providerCfg = PROVIDERS.find(p => p.id === provider)!;
  const currentKey  = getProviderKey(provider);
  const webhookReady = !WEBHOOK_URL.includes('hooks.example.com');

  function switchProvider(p: MktProvider) {
    sessionStorage.setItem(MKT_PROVIDER_STORAGE, p);
    setProviderState(p);
    setModelState(getProviderModel(p));
    setKeyDraft('');
    setKeySaved(false);
  }

  function saveKey() {
    const trimmed = keyDraft.trim();
    if (!trimmed) return;
    setProviderKey(provider, trimmed);
    setKeyDraft('');
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  }

  function saveModel(m: string) {
    setProviderModel(provider, m);
    setModelState(m);
  }

  async function submitTask(e: { preventDefault(): void }) {
    e.preventDefault();
    setTaskError('');

    if (TASK_GATE_CODE && gateCode.trim() !== TASK_GATE_CODE) {
      setTaskError('Access code required to dispatch work to the Marketing Office.');
      setTaskStatus('error');
      return;
    }
    if (!clientName.trim() || !taskType || !details.trim()) {
      setTaskError('Client, task type, and details are required.');
      setTaskStatus('error');
      return;
    }
    // Public-safe: no PII fields beyond a salon/display name; remind operator in UI.
    if (!webhookReady) {
      setTaskStatus('noop');
      return;
    }

    setTaskStatus('loading');
    try {
      const payload = {
        salon: clientName.trim(),
        taskType,
        details: details.trim(),
        dueDate: dueDate || null,
        gateCode: gateCode.trim(),
        source: 'motchinchintam.com marketing workspace',
      };
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': MKT_WEBHOOK_AUTH,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      setTaskStatus('done');
      setClientName('');
      setTaskType('');
      setDetails('');
      setDueDate('');
      setGateCode('');
    } catch (err) {
      setTaskError(err instanceof Error ? err.message : String(err));
      setTaskStatus('error');
    }
  }

  return (
    <div className="mkt-hub">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mkt-hero">
        <div className="mkt-hero-badge">Marketing Office</div>
        <h1 className="mkt-hero-title">
          Salon Marketing<br />&amp; Consulting
        </h1>
        <p className="mkt-hero-sub">
          Powered by a group of Marketing &amp; Consulting bots<br />
          Freelance growth office for US nail salons — strategy, content, reputation &amp; local SEO.
        </p>
        <div className="mkt-hero-chip-row">
          <span className="mkt-hero-chip">Yuzu · office lead</span>
          <span className="mkt-hero-chip">Noodle · content</span>
          <span className="mkt-hero-chip">Toto · reputation &amp; SEO</span>
        </div>
        <div className={`mkt-key-badge ${currentKey ? 'mkt-key-badge--ok' : 'mkt-key-badge--warn'}`}>
          {currentKey
            ? `✓ DIY skills ready · ${providerCfg.name} · ${providerCfg.models.find(m => m.id === model)?.label.split(' —')[0] ?? model}`
            : `Optional: add your own AI key below for on-page skill tools`}
        </div>
      </div>

      {/* ── Bot team ───────────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">🤝 Marketing &amp; Consulting bot team</h2>
        <p className="mkt-section-sub">
          The Marketing Office group. Submit a task below and the right bots pick it up — no public chat required.
        </p>
        <div className="mkt-team-grid">
          {BOT_TEAM.map(bot => (
            <div key={bot.id} className="mkt-team-card">
              <div className="mkt-team-icon">{bot.icon}</div>
              <div className="mkt-team-name">{bot.name}</div>
              <div className="mkt-team-role">{bot.role}</div>
              <p className="mkt-team-blurb">{bot.blurb}</p>
            </div>
          ))}
          <div className="mkt-team-card mkt-team-card--group">
            <div className="mkt-team-icon">🏢</div>
            <div className="mkt-team-name">Marketing Office</div>
            <div className="mkt-team-role">Group desk</div>
            <p className="mkt-team-blurb">
              Shared inbox for salon growth work. Task forms land here and kick off the bot routine automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ── Dispatch task → webhook ────────────────────────────────── */}
      <section className="mkt-section" id="mkt-dispatch">
        <h2 className="mkt-section-title">📋 Dispatch a task to the bots</h2>
        <p className="mkt-section-sub">
          Fill this in and submit — it POSTs to the Marketing Office webhook so Yuzu / Noodle / Toto can start work.
          Use a salon display name only (no card numbers, passwords, or private client lists).
        </p>

        {taskStatus === 'done' ? (
          <div className="mkt-dispatch-success">
            <div className="mkt-dispatch-success-icon">✅</div>
            <div className="mkt-dispatch-success-title">Task sent to the Marketing Office</div>
            <p className="mkt-dispatch-success-sub">The bot team will pick this up from the webhook routine.</p>
            <button type="button" className="mkt-dispatch-again" onClick={() => setTaskStatus('idle')}>
              Send another task
            </button>
          </div>
        ) : (
          <form className="mkt-dispatch-form" onSubmit={submitTask}>
            <div className="mkt-dispatch-grid">
              <div className="mkt-field">
                <label className="mkt-label">Salon / client label <span className="mkt-required">*</span></label>
                <input
                  className="mkt-input"
                  type="text"
                  placeholder="e.g. Sunny Nails — Midtown"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  required
                  maxLength={80}
                  disabled={taskStatus === 'loading'}
                />
              </div>
              <div className="mkt-field">
                <label className="mkt-label">Task type <span className="mkt-required">*</span></label>
                <select
                  className="mkt-select"
                  value={taskType}
                  onChange={e => setTaskType(e.target.value)}
                  required
                  disabled={taskStatus === 'loading'}
                >
                  <option value="">— choose —</option>
                  {TASK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="mkt-field">
                <label className="mkt-label">Due date</label>
                <input
                  className="mkt-input"
                  type="date"
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                  disabled={taskStatus === 'loading'}
                />
              </div>
              {TASK_GATE_CODE ? (
                <div className="mkt-field">
                  <label className="mkt-label">Access code <span className="mkt-required">*</span></label>
                  <input
                    className="mkt-input"
                    type="password"
                    placeholder="Office access code"
                    value={gateCode}
                    onChange={e => setGateCode(e.target.value)}
                    autoComplete="off"
                    disabled={taskStatus === 'loading'}
                  />
                </div>
              ) : null}
            </div>
            <div className="mkt-field">
              <label className="mkt-label">Details <span className="mkt-required">*</span></label>
              <textarea
                className="mkt-textarea"
                rows={4}
                placeholder="What should the bots do? Goals, channels, tone, constraints — keep it public-safe."
                value={details}
                onChange={e => setDetails(e.target.value)}
                required
                maxLength={2000}
                disabled={taskStatus === 'loading'}
              />
            </div>

            {!webhookReady && (
              <div className="mkt-dispatch-note">
                Webhook not wired yet (<code>WEBHOOK_URL</code> is still the placeholder). Submit will show a dry-run message until Quan replaces it.
              </div>
            )}

            {taskStatus === 'noop' && (
              <div className="mkt-dispatch-noop">
                Dry run OK — form validated. Set <code>WEBHOOK_URL</code> in <code>MktHubView.tsx</code> to go live.
              </div>
            )}
            {taskStatus === 'error' && taskError && (
              <p className="mkt-field-warn">{taskError}</p>
            )}

            <button type="submit" className="mkt-generate-btn" disabled={taskStatus === 'loading'}>
              {taskStatus === 'loading' ? (
                <><span className="mkt-spinner" /> Dispatching…</>
              ) : (
                '🚀 Send to Marketing Office bots'
              )}
            </button>
          </form>
        )}
      </section>

      {/* ── Services ───────────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">✨ What the office does</h2>
        <p className="mkt-section-sub">Public overview of the freelance salon marketing practice — no merchant data on this page.</p>
        <div className="mkt-services-grid">
          {[
            { icon: '🗺️', title: 'Strategy & monthly plans', desc: 'Positioning, offer focus, and a clear month plan Yuzu can route for approval.' },
            { icon: '✍️', title: 'Content & campaigns', desc: 'Captions, briefs, calendars, and creative direction from Noodle.' },
            { icon: '📍', title: 'Reputation & local SEO', desc: 'Review reply drafts and Google Business Profile hygiene from Toto.' },
            { icon: '📣', title: 'Paid & organic assist', desc: 'Ad copy angles, landing messaging, and channel setup checklists via the skill tools below.' },
            { icon: '📈', title: 'Performance readouts', desc: 'Simple monthly readouts — what worked, what to cut, what to double down on.' },
            { icon: '🤝', title: 'Partner-ready ops', desc: 'Built for a small office workflow: intake → bots → human review → deliver.' },
          ].map(s => (
            <div key={s.title} className="mkt-service-card">
              <div className="mkt-service-icon">{s.icon}</div>
              <div className="mkt-service-title">{s.title}</div>
              <p className="mkt-service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">🔁 How work flows</h2>
        <div className="mkt-process-row">
          {[
            { n: '1', t: 'Intake', d: 'Submit a task form (or Quan dispatches from the office).' },
            { n: '2', t: 'Route', d: 'Webhook wakes the Marketing Office; Yuzu triages by task type.' },
            { n: '3', t: 'Produce', d: 'Noodle / Toto / skill tools draft the deliverable.' },
            { n: '4', t: 'Approve', d: 'Human review before anything goes live for a salon.' },
            { n: '5', t: 'Ship', d: 'Final assets handed off — captions, plans, replies, or briefs.' },
          ].map(step => (
            <div key={step.n} className="mkt-process-step">
              <div className="mkt-process-num">{step.n}</div>
              <div className="mkt-process-title">{step.t}</div>
              <p className="mkt-process-desc">{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages (no $) ────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">📦 Engagement shapes</h2>
        <p className="mkt-section-sub">High-level packages — pricing stays offline / private.</p>
        <div className="mkt-packages-grid">
          {[
            { name: 'Starter month', items: ['Monthly plan', 'Content calendar seed', 'Review-reply starter set'] },
            { name: 'Growth retainer', items: ['Ongoing strategy', 'Weekly content batch', 'GBP + reputation cadence'] },
            { name: 'Campaign sprint', items: ['One campaign brief', 'Ad + organic copy pack', 'Landing / offer messaging'] },
          ].map(pkg => (
            <div key={pkg.name} className="mkt-package-card">
              <div className="mkt-package-name">{pkg.name}</div>
              <ul className="mkt-package-list">
                {pkg.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sample deliverables ────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">📄 Sample deliverables</h2>
        <div className="mkt-deliverables-grid">
          {[
            { icon: '📝', title: 'Monthly marketing plan', note: 'Goals, channels, weekly themes' },
            { icon: '🎬', title: 'Caption / Reel batch', note: 'Hooks + CTAs for salon posts' },
            { icon: '📋', title: 'Campaign brief', note: 'Audience, offer, creative angles' },
            { icon: '⭐', title: 'Review reply pack', note: 'Tone-matched draft responses' },
            { icon: '🗺️', title: 'GBP checklist', note: 'Photos, categories, posts hygiene' },
            { icon: '📊', title: 'Month-end readout', note: 'Wins, cuts, next experiments' },
          ].map(d => (
            <div key={d.title} className="mkt-deliverable-card">
              <span className="mkt-deliverable-icon">{d.icon}</span>
              <div>
                <div className="mkt-deliverable-title">{d.title}</div>
                <div className="mkt-deliverable-note">{d.note}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who it's for ───────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">🎯 Built for</h2>
        <div className="mkt-audience-grid">
          {[
            'US nail salons that want steady local demand',
            'Owners who prefer a small office over a big agency',
            'Teams that want bots + human approval, not black-box ads',
            'Partner-led operations that need clear monthly rhythm',
          ].map(line => (
            <div key={line} className="mkt-audience-chip">✓ {line}</div>
          ))}
        </div>
      </section>

      {/* ── Provider + Setup ────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">⚙ DIY skill tools — choose your AI</h2>
        <p className="mkt-section-sub">
          Optional on-page generators (bring your own key). Separate from the Marketing Office bot dispatch above.
        </p>

        {/* Provider tabs */}
        <div className="mkt-provider-tabs">
          {PROVIDERS.map(p => (
            <button
              key={p.id}
              className={`mkt-provider-tab${provider === p.id ? ' active' : ''}`}
              onClick={() => switchProvider(p.id)}
            >
              <span className="mkt-provider-tab-icon">{p.icon}</span>
              <span className="mkt-provider-tab-name">{p.name}</span>
              <span className={`mkt-provider-tab-badge${p.badgeFree ? ' free' : ''}`}>{p.badge}</span>
            </button>
          ))}
        </div>

        {/* Provider settings panel */}
        <div className="mkt-provider-panel">
          <div className="mkt-setup-grid">

            {/* API key card */}
            <div className="mkt-setup-card">
              <div className="mkt-setup-card-label">{providerCfg.keyLabel}</div>
              <p className="mkt-setup-card-desc">
                Get your key at <strong>{providerCfg.keyHint}</strong>
                {providerCfg.badgeFree && <span className="mkt-free-note"> — has a free tier</span>}.<br />
                Stored in session only — cleared when you close the tab.
              </p>
              {currentKey && (
                <div className="mkt-key-set-indicator">✓ Key set</div>
              )}
              <div className="mkt-key-form">
                <input
                  type="password"
                  className="mkt-key-input"
                  placeholder={currentKey ? '••••••••• (re-enter to update)' : providerCfg.keyPlaceholder}
                  value={keyDraft}
                  onChange={e => setKeyDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') saveKey(); }}
                  autoComplete="off"
                />
                <button className="mkt-key-save-btn" onClick={saveKey}>
                  {keySaved ? '✓ Saved' : 'Save Key'}
                </button>
              </div>
            </div>

            {/* Model selector */}
            <div className="mkt-setup-card">
              <div className="mkt-setup-card-label">Model</div>
              <p className="mkt-setup-card-desc">
                {provider === 'gemini' && 'Gemini 1.5 Flash is free with no credit card needed.'}
                {provider === 'groq'   && 'All Groq models are free — Llama 3.3 70B gives the best output.'}
                {provider === 'claude' && 'Sonnet is the best balance of speed and quality.'}
                {provider === 'openai' && 'GPT-4o-mini is the cheapest. GPT-4o for better results.'}
              </p>
              <div className="mkt-model-list">
                {providerCfg.models.map(m => (
                  <button
                    key={m.id}
                    className={`mkt-model-btn${model === m.id ? ' active' : ''}`}
                    onClick={() => saveModel(m.id)}
                  >
                    <span className="mkt-model-dot" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Agents ───────────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">🤖 On-page specialist agents</h2>
        <p className="mkt-section-sub">BYO-key tools for drafting docs yourself. For office-routed work, use Dispatch above.</p>
        <div className="mkt-agents-grid">
          {AGENTS.map(agent => (
            <button
              key={agent.id}
              className="mkt-agent-card"
              style={{ '--agent-color': agent.color } as React.CSSProperties}
              onClick={() => onNavigate(agent.id)}
            >
              <div className="mkt-agent-icon">{agent.icon}</div>
              <div className="mkt-agent-name">{agent.name}</div>
              <div className="mkt-agent-role">{agent.role}</div>
              <div className="mkt-agent-desc">{agent.description}</div>
              <div className="mkt-agent-skills">
                {agent.skills.map(s => (
                  <span key={s.id} className="mkt-agent-skill-chip">{s.icon} {s.name}</span>
                ))}
              </div>
              <div className="mkt-agent-cta">Open Agent →</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Workflows ──────────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">🔄 Automated Workflows</h2>
        <p className="mkt-section-sub">Multi-step processes that chain agents together for complete campaign execution.</p>
        <div className="mkt-workflows-grid">
          {WORKFLOWS.map(wf => (
            <div key={wf.id} className="mkt-workflow-card">
              <div className="mkt-wf-header">
                <span className="mkt-wf-icon">{wf.icon}</span>
                <div>
                  <div className="mkt-wf-name">{wf.name}</div>
                  <div className="mkt-wf-duration">{wf.duration}</div>
                </div>
              </div>
              <p className="mkt-wf-desc">{wf.description}</p>
              <div className="mkt-wf-steps">
                {wf.steps.map((step, i) => {
                  const agent = AGENTS.find(a => a.id === step.agent);
                  return (
                    <div key={i} className="mkt-wf-step">
                      <span className="mkt-wf-step-num">{i + 1}</span>
                      <span className="mkt-wf-step-icon">{agent?.icon}</span>
                      <span className="mkt-wf-step-label">{step.label}</span>
                    </div>
                  );
                })}
              </div>
              <button
                className="mkt-wf-start-btn"
                onClick={() => { const first = wf.steps[0]?.agent; if (first) onNavigate(first); }}
              >
                Start Workflow →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vietnam Market Benchmarks ───────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">📊 Vietnam Market Benchmarks 2025–2026</h2>
        <div className="mkt-benchmarks-grid">
          {[
            { label: 'CPM Meta',          value: '25K–40K VND', note: 'Facebook & Instagram' },
            { label: 'CPM TikTok',        value: '28K–45K VND', note: 'TikTok Ads'           },
            { label: 'Lead/Booking Rate', value: '40–60%',      note: 'From paid leads'       },
            { label: 'ROAS Target',       value: '2–4x',        note: 'Service businesses'    },
            { label: 'Email Open Rate',   value: '15–25%',      note: 'Vietnamese list'       },
            { label: 'Zalo OA Read',      value: '40–60%',      note: 'Broadcast messages'    },
          ].map(b => (
            <div key={b.label} className="mkt-benchmark-card">
              <div className="mkt-bm-value">{b.value}</div>
              <div className="mkt-bm-label">{b.label}</div>
              <div className="mkt-bm-note">{b.note}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
