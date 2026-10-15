import { useState } from 'react';
import {
  AGENTS, WORKFLOWS,
  PROVIDERS, type MktProvider,
  MKT_PROVIDER_STORAGE,
  getActiveProvider, getProviderKey, getProviderModel,
  setProviderKey, setProviderModel,
} from '../../data/mktHub';

interface Props { onNavigate: (v: string) => void; }

export default function MktHubView({ onNavigate }: Props) {
  const [provider, setProviderState] = useState<MktProvider>(getActiveProvider);
  const [keyDraft,   setKeyDraft]   = useState('');
  const [keySaved,   setKeySaved]   = useState(false);
  const [model,      setModelState] = useState(() => getProviderModel(getActiveProvider()));

  const providerCfg = PROVIDERS.find(p => p.id === provider)!;
  const currentKey  = getProviderKey(provider);

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

  return (
    <div className="mkt-hub">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mkt-hero">
        <div className="mkt-hero-badge">Marketing Hub</div>
        <h1 className="mkt-hero-title">
          AI Marketing<br />Campaign Engine
        </h1>
        <p className="mkt-hero-sub">
          16 skills · 4 specialist agents · 3 automated workflows<br />
          Powered by fullstack-mkt-skills — built for the Vietnamese market.
        </p>
        <div className={`mkt-key-badge ${currentKey ? 'mkt-key-badge--ok' : 'mkt-key-badge--warn'}`}>
          {currentKey
            ? `✓ ${providerCfg.name} connected · ${providerCfg.models.find(m => m.id === model)?.label.split(' —')[0] ?? model}`
            : `⚠ No API key — select a provider below and enter your key`}
        </div>
      </div>

      {/* ── Provider + Setup ────────────────────────────────────────── */}
      <section className="mkt-section">
        <h2 className="mkt-section-title">⚙ Setup — Choose your AI</h2>

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
        <h2 className="mkt-section-title">🤖 AI Agents</h2>
        <p className="mkt-section-sub">Choose a specialist agent to generate marketing documents.</p>
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
