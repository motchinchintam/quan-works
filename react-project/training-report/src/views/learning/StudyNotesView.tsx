import { useState, useMemo } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

const LS_KEY = 'lh_study_notes';
function load(): Note[] { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } }
function save(n: Note[]) { localStorage.setItem(LS_KEY, JSON.stringify(n)); }

const CATEGORIES = ['All', 'SQL', 'TypeScript', 'English', 'Chinese', 'Other'];
const CAT_COLORS: Record<string, string> = {
  SQL: 'blue', TypeScript: 'purple', English: 'teal', Chinese: 'amber', Other: 'coral',
};

const SAMPLE: Note[] = [
  {
    id: 1, title: 'SQL JOIN Types', category: 'SQL',
    content: 'INNER JOIN  — returns rows with a match in BOTH tables.\nLEFT JOIN   — all rows from left + matched from right (NULL if no match).\nRIGHT JOIN  — all rows from right + matched from left.\nFULL JOIN   — all rows from both; NULLs where no match.\nCROSS JOIN  — every combination of rows (cartesian product).\n\nTip: LEFT JOIN is the most common in reports.',
    tags: 'joins, query, fundamentals', pinned: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 2, title: 'TypeScript Utility Types', category: 'TypeScript',
    content: 'Partial<T>       — all properties optional\nRequired<T>      — all properties required\nReadonly<T>      — all properties read-only\nPick<T, K>       — keep only keys K\nOmit<T, K>       — remove keys K\nRecord<K, V>     — map keys K to values V\nReturnType<T>    — extract return type of a function\n\nExample:\ntype UserPreview = Pick<User, "id" | "name">;',
    tags: 'generics, utility, types', pinned: true,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 3, title: 'Chinese Tones', category: 'Chinese',
    content: 'Mandarin has 4 tones + 1 neutral tone:\n\n1st tone (ˉ) — flat, high   e.g. mā (妈 mother)\n2nd tone (ˊ) — rising       e.g. má (麻 hemp)\n3rd tone (ˇ) — dip-rise     e.g. mǎ (马 horse)\n4th tone (ˋ) — falling      e.g. mà (骂 scold)\nNeutral tone  — short, light e.g. ma (吗 question)\n\nTip: get tones right early — they change meaning completely.',
    tags: 'tones, pronunciation, HSK', pinned: false,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 4, title: 'English — Collocations with "make" vs "do"', category: 'English',
    content: 'Common confusion: "make" vs "do"\n\nMAKE (create / produce):\n  make a decision, make a mistake, make progress,\n  make an effort, make a plan, make friends\n\nDO (perform an action / task):\n  do homework, do research, do a test,\n  do your best, do business, do exercise\n\nMemory trick: "make" = something new is created; "do" = activity/task.',
    tags: 'collocations, vocabulary, grammar', pinned: false,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

const blank = { title: '', content: '', category: 'SQL', tags: '', pinned: false };

export default function StudyNotesView() {
  const [notes, setNotes] = useState<Note[]>(() => { const d = load(); return d.length ? d : SAMPLE; });
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState<number | null>(null);
  const [viewNote, setViewNote] = useState<Note | null>(null);

  function persist(n: Note[]) { setNotes(n); save(n); }

  function submit() {
    if (!form.title.trim() || !form.content.trim()) return;
    const now = new Date().toISOString();
    if (editId !== null) {
      persist(notes.map(n => n.id === editId ? { ...n, ...form, updatedAt: now } : n));
      setEditId(null);
    } else {
      const note: Note = { ...form, id: Date.now(), createdAt: now, updatedAt: now };
      persist([note, ...notes]);
    }
    setForm(blank); setShowForm(false);
  }

  function deleteNote(id: number) {
    if (!confirm('Delete this note?')) return;
    if (viewNote?.id === id) setViewNote(null);
    persist(notes.filter(n => n.id !== id));
  }

  function togglePin(id: number) {
    persist(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
    if (viewNote?.id === id) setViewNote(v => v ? { ...v, pinned: !v.pinned } : v);
  }

  function startEdit(note: Note) {
    setForm({ title: note.title, content: note.content, category: note.category, tags: note.tags, pinned: note.pinned });
    setEditId(note.id); setShowForm(true); setViewNote(null);
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return notes
      .filter(n => catFilter === 'All' || n.category === catFilter)
      .filter(n => !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q) || n.tags.toLowerCase().includes(q))
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [notes, search, catFilter]);

  const pinned = notes.filter(n => n.pinned).length;

  return (
    <div className="view">
      <div className="view-header">
        <h2 className="view-title">Study Notes</h2>
        <button className="tt-btn tt-btn-primary" style={{ flex: 'none' }}
          onClick={() => { setForm(blank); setEditId(null); setShowForm(true); setViewNote(null); }}>
          + New note
        </button>
      </div>

      {/* Stats */}
      <div className="tt-summary-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="tt-stat"><div className="tt-stat-label">Total notes</div><div className="tt-stat-value">{notes.length}</div></div>
        <div className="tt-stat"><div className="tt-stat-label">Pinned</div><div className="tt-stat-value" style={{ color: 'var(--amber)' }}>{pinned}</div></div>
        <div className="tt-stat"><div className="tt-stat-label">Categories</div><div className="tt-stat-value" style={{ color: 'var(--purple)' }}>{new Set(notes.map(n => n.category)).size}</div></div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="tt-card" style={{ marginBottom: '1.25rem' }}>
          <div className="tt-card-header">
            <span className="tt-badge tt-badge-blue">{editId ? 'Edit note' : 'New note'}</span>
          </div>
          <div className="tt-card-body">
            <div className="note-form-top">
              <div className="tt-field" style={{ flex: 2 }}><label>Title</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Note title..." />
              </div>
              <div className="tt-field" style={{ flex: 1 }}><label>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="tt-field"><label>Content</label>
              <textarea className="note-textarea" rows={8} value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="Write your notes here..." />
            </div>
            <div className="note-form-bottom">
              <div className="tt-field" style={{ flex: 1 }}><label>Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="e.g. react, hooks, state" />
              </div>
              <label className="note-pin-toggle">
                <input type="checkbox" checked={form.pinned} onChange={e => setForm({ ...form, pinned: e.target.checked })} />
                📌 Pin this note
              </label>
            </div>
            <div className="form-actions" style={{ marginTop: '10px' }}>
              <button className="tt-btn tt-btn-primary" style={{ flex: 'none' }} onClick={submit}>{editId ? 'Save changes' : 'Add note'}</button>
              <button className="tt-btn tt-btn-outline" style={{ flex: 'none' }} onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="note-search" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search notes..." style={{ flex: 1, minWidth: '180px' }} />
      </div>
      <div className="filter-bar" style={{ marginBottom: '1rem' }}>
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn${catFilter === c ? ' active' : ''}`} onClick={() => setCatFilter(c)}>{c}</button>
        ))}
      </div>

      {/* Layout: list + viewer */}
      <div className="note-layout">
        {/* Notes list */}
        <div className="note-list">
          {filtered.map(note => {
            const catColor = CAT_COLORS[note.category] || 'blue';
            const preview = note.content.replace(/\n/g, ' ').slice(0, 90) + (note.content.length > 90 ? '…' : '');
            return (
              <div key={note.id}
                className={`note-card${viewNote?.id === note.id ? ' note-card-active' : ''}`}
                onClick={() => setViewNote(note)}>
                <div className="note-card-top">
                  {note.pinned && <span className="note-pin-indicator">📌</span>}
                  <div className="note-card-title">{note.title}</div>
                  <span className={`goal-cat-badge goal-cat-${catColor}`}>{note.category}</span>
                </div>
                <div className="note-card-preview">{preview}</div>
                {note.tags && (
                  <div className="note-tags-row">
                    {note.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                      <span key={t} className="hub-tag">{t}</span>
                    ))}
                  </div>
                )}
                <div className="note-card-date">{new Date(note.updatedAt).toLocaleDateString()}</div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p style={{ color: 'var(--tx3)', fontSize: '14px', padding: '1rem 0' }}>
              {search ? 'No notes match your search.' : 'No notes in this category.'}
            </p>
          )}
        </div>

        {/* Note viewer */}
        {viewNote ? (
          <div className="note-viewer">
            <div className="note-viewer-header">
              <div>
                <div className="note-viewer-title">{viewNote.title}</div>
                <div className="note-viewer-meta">
                  <span className={`goal-cat-badge goal-cat-${CAT_COLORS[viewNote.category] || 'blue'}`}>{viewNote.category}</span>
                  <span style={{ color: 'var(--tx3)', fontSize: '12px' }}>Updated {new Date(viewNote.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="note-viewer-actions">
                <button className="btn-icon" title={viewNote.pinned ? 'Unpin' : 'Pin'} onClick={() => togglePin(viewNote.id)}>
                  {viewNote.pinned ? '📌' : '📍'}
                </button>
                <button className="btn-icon" title="Edit" onClick={() => startEdit(viewNote)}>✏️</button>
                <button className="tt-del-btn" onClick={() => deleteNote(viewNote.id)}>✕</button>
              </div>
            </div>
            <pre className="note-viewer-content">{viewNote.content}</pre>
            {viewNote.tags && (
              <div className="note-tags-row" style={{ marginTop: '12px' }}>
                {viewNote.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                  <span key={t} className="hub-tag">{t}</span>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="note-viewer note-viewer-empty">
            <span>📓</span>
            <p>Select a note to read it</p>
          </div>
        )}
      </div>
    </div>
  );
}
