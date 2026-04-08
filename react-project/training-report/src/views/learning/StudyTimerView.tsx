import { useState, useEffect, useRef } from 'react';

type Mode = 'focus' | 'short' | 'long';

const DEFAULTS: Record<Mode, number> = { focus: 25, short: 5, long: 15 };
const LABELS: Record<Mode, string> = { focus: 'Focus', short: 'Short break', long: 'Long break' };
const COLORS: Record<Mode, string> = { focus: 'var(--blue)', short: 'var(--green)', long: 'var(--teal)' };

const LS_SESSIONS = 'lh_timer_sessions';
function loadSessions(): number { return parseInt(localStorage.getItem(LS_SESSIONS) || '0'); }
function saveSessions(n: number) { localStorage.setItem(LS_SESSIONS, String(n)); }

export default function StudyTimerView() {
  const [mode, setMode] = useState<Mode>('focus');
  const [durations, setDurations] = useState<Record<Mode, number>>(DEFAULTS);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULTS.focus * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(loadSessions);
  const [totalStudied, setTotalStudied] = useState(0); // in seconds
  const [task, setTask] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);

  const total = durations[mode] * 60;
  const pct = Math.round((1 - secondsLeft / total) * 100);
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            if (mode === 'focus') {
              const ns = loadSessions() + 1;
              setSessions(ns);
              saveSessions(ns);
              setTotalStudied(t => t + durations.focus * 60);
              try { new Notification('⏱ Focus session complete! Take a break.'); } catch {}
            } else {
              try { new Notification('✅ Break over! Ready to focus again.'); } catch {}
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, mode]);

  function switchMode(m: Mode) {
    setMode(m); setRunning(false); setSecondsLeft(durations[m] * 60);
  }

  function toggleTimer() {
    if (!running && secondsLeft === 0) { setSecondsLeft(durations[mode] * 60); }
    setRunning(r => !r);
  }

  function resetTimer() { setRunning(false); setSecondsLeft(durations[mode] * 60); }

  function updateDuration(m: Mode, val: number) {
    const n = Math.max(1, Math.min(120, val));
    setDurations(prev => ({ ...prev, [m]: n }));
    if (m === mode && !running) setSecondsLeft(n * 60);
  }

  function requestNotifPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  const totalMins = Math.floor(totalStudied / 60);
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <div className="view">
      <h2 className="view-title">Study Timer</h2>

      {/* Mode tabs */}
      <div className="st-mode-tabs">
        {(['focus', 'short', 'long'] as Mode[]).map(m => (
          <button key={m} className={`st-mode-btn${mode === m ? ' active' : ''}`}
            style={mode === m ? { background: COLORS[m], borderColor: COLORS[m] } : {}}
            onClick={() => switchMode(m)}>
            {LABELS[m]}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="st-timer-wrap">
        <svg className="st-ring" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="var(--bg2)" strokeWidth="10" />
          <circle cx="100" cy="100" r="90" fill="none" stroke={COLORS[mode]} strokeWidth="10"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear', transformOrigin: 'center', transform: 'rotate(-90deg)' }} />
        </svg>
        <div className="st-timer-inner">
          <div className="st-time-display" style={{ color: COLORS[mode] }}>{display}</div>
          <div className="st-mode-label">{LABELS[mode]}</div>
          {task && <div className="st-task-label">{task}</div>}
        </div>
      </div>

      {/* Controls */}
      <div className="st-controls">
        <button className="st-btn-reset" onClick={resetTimer} title="Reset">↺</button>
        <button className="st-btn-main" style={{ background: COLORS[mode] }} onClick={toggleTimer}
          onPointerDown={requestNotifPermission}>
          {running ? '⏸ Pause' : secondsLeft === 0 ? '▶ Restart' : '▶ Start'}
        </button>
        <button className="st-btn-reset" onClick={() => switchMode(mode === 'focus' ? 'short' : 'focus')} title="Skip">⏭</button>
      </div>

      {/* Task */}
      <div className="st-task-wrap">
        <input className="st-task-input" value={task} onChange={e => setTask(e.target.value)}
          placeholder="What are you working on? (optional)" />
      </div>

      {/* Stats */}
      <div className="st-stats-grid">
        <div className="st-stat"><div className="st-stat-val" style={{ color: 'var(--blue)' }}>{sessions}</div><div className="st-stat-lbl">Sessions today</div></div>
        <div className="st-stat"><div className="st-stat-val" style={{ color: 'var(--green)' }}>{totalMins}m</div><div className="st-stat-lbl">Study time</div></div>
        <div className="st-stat"><div className="st-stat-val" style={{ color: 'var(--teal)' }}>{sessions * durations.short}m</div><div className="st-stat-lbl">Break time</div></div>
      </div>

      {/* Settings */}
      <div className="tt-card" style={{ marginTop: '1.5rem' }}>
        <div className="tt-card-header"><span className="tt-badge tt-badge-blue">Timer settings (minutes)</span></div>
        <div className="tt-card-body">
          <div className="st-settings-grid">
            {(['focus', 'short', 'long'] as Mode[]).map(m => (
              <div key={m} className="tt-field">
                <label>{LABELS[m]}</label>
                <input type="number" min={1} max={120} value={durations[m]}
                  onChange={e => updateDuration(m, parseInt(e.target.value) || DEFAULTS[m])} />
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--tx3)', marginTop: '8px' }}>
            💡 Classic Pomodoro: 25 min focus → 5 min break → every 4 sessions take a 15 min long break.
          </p>
        </div>
      </div>

      <div className="tt-actions">
        <button className="tt-btn tt-btn-outline" onClick={() => { setSessions(0); saveSessions(0); setTotalStudied(0); }}>Reset session count</button>
      </div>
    </div>
  );
}
