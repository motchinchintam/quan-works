import { useState, useRef, useEffect } from 'react';

const KEY_STORAGE = 'claude-api-key';
const MODEL       = 'claude-haiku-4-5-20251001'; // fast & cost-effective for personal use

interface Message { role: 'user' | 'assistant'; content: string; }

export default function ClaudeChat() {
  const [open,      setOpen]      = useState(false);
  const [apiKey,    setApiKey]    = useState(() => localStorage.getItem(KEY_STORAGE) ?? '');
  const [keyInput,  setKeyInput]  = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const [messages,  setMessages]  = useState<Message[]>([]);
  const [input,     setInput]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLTextAreaElement>(null);

  const hasKey = apiKey.trim().startsWith('sk-ant-');

  useEffect(() => {
    if (open && hasKey) inputRef.current?.focus();
  }, [open, hasKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function saveKey() {
    const k = keyInput.trim();
    if (!k.startsWith('sk-ant-')) { setError('Key must start with sk-ant-'); return; }
    localStorage.setItem(KEY_STORAGE, k);
    setApiKey(k);
    setKeyInput('');
    setShowSetup(false);
    setError('');
  }

  function clearKey() {
    localStorage.removeItem(KEY_STORAGE);
    setApiKey('');
    setMessages([]);
    setShowSetup(true);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setError('');
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key':                      apiKey,
          'anthropic-version':              '2023-06-01',
          'anthropic-dangerous-allow-browser': 'true',
          'content-type':                   'application/json',
        },
        body: JSON.stringify({
          model:      MODEL,
          max_tokens: 1024,
          system:     "You are a helpful personal assistant for Quân (Nguyen Thanh Quan), an HR & Sales Training professional based in Vietnam. Be concise and practical.",
          messages:   newMessages,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status}`);
      }

      const data = await res.json() as { content: { type: string; text: string }[] };
      const reply = data.content.find(b => b.type === 'text')?.text ?? '(no response)';
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {/* ── Floating bubble ─────────────────────────────────────────────── */}
      <button
        className={`cc-bubble${open ? ' cc-bubble--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        title="Ask Claude"
      >
        {open ? '✕' : '✦'}
      </button>

      {/* ── Chat panel ──────────────────────────────────────────────────── */}
      {open && (
        <div className="cc-panel">

          {/* Header */}
          <div className="cc-header">
            <div className="cc-header-left">
              <span className="cc-header-icon">✦</span>
              <div>
                <div className="cc-header-title">Ask Claude</div>
                <div className="cc-header-sub">{MODEL.includes('haiku') ? 'Haiku · Fast' : 'Sonnet'}</div>
              </div>
            </div>
            <div className="cc-header-actions">
              {hasKey && (
                <>
                  <button className="cc-hdr-btn" title="Clear chat" onClick={() => setMessages([])}>↺</button>
                  <button className="cc-hdr-btn" title="Change API key" onClick={() => { setShowSetup(true); setKeyInput(''); }}>⚙</button>
                </>
              )}
              <button className="cc-hdr-btn" onClick={() => setOpen(false)}>✕</button>
            </div>
          </div>

          {/* Setup screen — no key yet */}
          {(!hasKey || showSetup) ? (
            <div className="cc-setup">
              <div className="cc-setup-icon">🔑</div>
              <h3 className="cc-setup-title">{showSetup && hasKey ? 'Change API Key' : 'Connect Claude'}</h3>
              <p className="cc-setup-sub">
                Enter your Anthropic API key. It's stored only in your browser and never sent anywhere except Anthropic's API.
              </p>
              <input
                className="cc-setup-input"
                type="password"
                placeholder="sk-ant-api03-..."
                value={keyInput}
                onChange={e => { setKeyInput(e.target.value); setError(''); }}
                onKeyDown={e => { if (e.key === 'Enter') saveKey(); }}
                autoFocus
              />
              {error && <p className="cc-setup-error">{error}</p>}
              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button className="cc-setup-btn" onClick={saveKey}>Connect →</button>
                {showSetup && hasKey && (
                  <button className="cc-setup-btn cc-setup-btn--danger" onClick={clearKey}>Remove key</button>
                )}
              </div>
              <p className="cc-setup-hint">
                Get a key at <strong>console.anthropic.com</strong>
              </p>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="cc-messages">
                {messages.length === 0 && (
                  <div className="cc-empty">
                    <div className="cc-empty-icon">✦</div>
                    <p>Ask me anything — training ideas, HR advice, writing help, translations…</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`cc-msg cc-msg--${m.role}`}>
                    <div className="cc-msg-bubble">{m.content}</div>
                  </div>
                ))}
                {loading && (
                  <div className="cc-msg cc-msg--assistant">
                    <div className="cc-msg-bubble cc-msg-typing">
                      <span /><span /><span />
                    </div>
                  </div>
                )}
                {error && <p className="cc-error-inline">{error}</p>}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="cc-input-row">
                <textarea
                  ref={inputRef}
                  className="cc-input"
                  placeholder="Ask something… (Enter to send, Shift+Enter for newline)"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  disabled={loading}
                />
                <button
                  className="cc-send"
                  onClick={send}
                  disabled={loading || !input.trim()}
                  title="Send"
                >→</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
