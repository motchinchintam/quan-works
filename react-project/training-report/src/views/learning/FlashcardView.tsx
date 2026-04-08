import { useState, useEffect } from 'react';

interface Card { id: number; front: string; back: string; status: 'new' | 'know' | 'review'; }
interface Deck { id: number; name: string; cards: Card[]; createdAt: string; }

const LS_KEY = 'lh_flashcard_decks';

function load(): Deck[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}
function save(d: Deck[]) { localStorage.setItem(LS_KEY, JSON.stringify(d)); }

const SAMPLE: Deck = {
  id: 1, name: 'Sample Deck',
  createdAt: new Date().toISOString(),
  cards: [
    { id: 1, front: 'What is the capital of France?', back: 'Paris', status: 'new' },
    { id: 2, front: 'What does HTML stand for?', back: 'HyperText Markup Language', status: 'new' },
    { id: 3, front: 'What is 12 × 8?', back: '96', status: 'new' },
  ],
};

type Screen = 'decks' | 'deck-view' | 'study';

export default function FlashcardView() {
  const [decks, setDecks] = useState<Deck[]>(() => {
    const d = load(); return d.length ? d : [SAMPLE];
  });
  const [screen, setScreen] = useState<Screen>('decks');
  const [activeDeck, setActiveDeck] = useState<Deck | null>(null);
  const [newDeckName, setNewDeckName] = useState('');
  const [addingCard, setAddingCard] = useState(false);
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  // Study mode
  const [studyIdx, setStudyIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [studyQueue, setStudyQueue] = useState<Card[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => { save(decks); }, [decks]);

  function persist(updated: Deck[]) { setDecks(updated); save(updated); }

  function addDeck() {
    if (!newDeckName.trim()) return;
    const d: Deck = { id: Date.now(), name: newDeckName.trim(), cards: [], createdAt: new Date().toISOString() };
    persist([...decks, d]);
    setNewDeckName('');
  }

  function deleteDeck(id: number) {
    if (!confirm('Delete this deck?')) return;
    persist(decks.filter(d => d.id !== id));
  }

  function openDeck(deck: Deck) { setActiveDeck(deck); setScreen('deck-view'); setAddingCard(false); }

  function addCard() {
    if (!cardFront.trim() || !cardBack.trim() || !activeDeck) return;
    const card: Card = { id: Date.now(), front: cardFront.trim(), back: cardBack.trim(), status: 'new' };
    const updated = decks.map(d => d.id === activeDeck.id ? { ...d, cards: [...d.cards, card] } : d);
    persist(updated);
    setActiveDeck({ ...activeDeck, cards: [...activeDeck.cards, card] });
    setCardFront(''); setCardBack(''); setAddingCard(false);
  }

  function deleteCard(cardId: number) {
    if (!activeDeck) return;
    const updated = decks.map(d => d.id === activeDeck.id
      ? { ...d, cards: d.cards.filter(c => c.id !== cardId) } : d);
    persist(updated);
    setActiveDeck({ ...activeDeck, cards: activeDeck.cards.filter(c => c.id !== cardId) });
  }

  function startStudy() {
    if (!activeDeck || !activeDeck.cards.length) return;
    const q = [...activeDeck.cards].sort(() => Math.random() - 0.5);
    setStudyQueue(q); setStudyIdx(0); setFlipped(false); setDone(false); setScreen('study');
  }

  function markCard(status: 'know' | 'review') {
    if (!activeDeck) return;
    const card = studyQueue[studyIdx];
    const updatedQueue = studyQueue.map((c, i) => i === studyIdx ? { ...c, status } : c);
    setStudyQueue(updatedQueue);
    const updatedDecks = decks.map(d => d.id === activeDeck.id
      ? { ...d, cards: d.cards.map(c => c.id === card.id ? { ...c, status } : c) } : d);
    persist(updatedDecks);
    setActiveDeck({ ...activeDeck, cards: activeDeck.cards.map(c => c.id === card.id ? { ...c, status } : c) });
    if (studyIdx + 1 >= studyQueue.length) { setDone(true); }
    else { setStudyIdx(studyIdx + 1); setFlipped(false); }
  }

  // ── Decks screen
  if (screen === 'decks') return (
    <div className="view">
      <h2 className="view-title">Flashcard Decks</h2>
      <div className="fc-add-deck-row">
        <input className="fc-input" value={newDeckName} onChange={e => setNewDeckName(e.target.value)}
          placeholder="New deck name..." onKeyDown={e => e.key === 'Enter' && addDeck()} />
        <button className="tt-btn tt-btn-primary" style={{ flex: 'none' }} onClick={addDeck}>+ Create deck</button>
      </div>
      <div className="fc-decks-grid">
        {decks.map(d => {
          const know = d.cards.filter(c => c.status === 'know').length;
          const total = d.cards.length;
          const pct = total ? Math.round(know / total * 100) : 0;
          return (
            <div key={d.id} className="fc-deck-card" onClick={() => openDeck(d)}>
              <div className="fc-deck-icon">🃏</div>
              <div className="fc-deck-info">
                <div className="fc-deck-name">{d.name}</div>
                <div className="fc-deck-meta">{total} cards · {know} mastered</div>
                <div className="fc-deck-bar-wrap">
                  <div className="fc-deck-bar" style={{ width: pct + '%' }} />
                </div>
              </div>
              <button className="tt-del-btn" onClick={e => { e.stopPropagation(); deleteDeck(d.id); }}>✕</button>
            </div>
          );
        })}
        {decks.length === 0 && <p style={{ color: 'var(--tx3)', fontSize: '14px' }}>No decks yet. Create one above.</p>}
      </div>
    </div>
  );

  // ── Deck view screen
  if (screen === 'deck-view' && activeDeck) {
    const know = activeDeck.cards.filter(c => c.status === 'know').length;
    const review = activeDeck.cards.filter(c => c.status === 'review').length;
    return (
      <div className="view">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <button className="fc-back-btn" onClick={() => setScreen('decks')}>← Back</button>
          <h2 className="view-title" style={{ margin: 0 }}>{activeDeck.name}</h2>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
            <button className="tt-btn tt-btn-outline" style={{ minWidth: 'unset', flex: 'none' }} onClick={() => setAddingCard(!addingCard)}>+ Add card</button>
            {activeDeck.cards.length > 0 && (
              <button className="tt-btn tt-btn-primary" style={{ minWidth: 'unset', flex: 'none' }} onClick={startStudy}>Study now →</button>
            )}
          </div>
        </div>
        <div className="fc-deck-stats">
          <span className="fc-stat-chip fc-chip-new">{activeDeck.cards.filter(c => c.status === 'new').length} New</span>
          <span className="fc-stat-chip fc-chip-review">{review} Review</span>
          <span className="fc-stat-chip fc-chip-know">{know} Mastered</span>
        </div>

        {addingCard && (
          <div className="tt-card" style={{ marginBottom: '1rem' }}>
            <div className="tt-card-header"><span className="tt-badge tt-badge-blue">New card</span></div>
            <div className="tt-card-body">
              <div className="tt-field" style={{ marginBottom: '10px' }}>
                <label>Front (question)</label>
                <textarea rows={2} value={cardFront} onChange={e => setCardFront(e.target.value)} placeholder="Enter question or term..." style={{ width: '100%', padding: '8px', border: '0.5px solid var(--border2)', borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--tx)', fontFamily: 'inherit', resize: 'vertical', fontSize: '13px' }} />
              </div>
              <div className="tt-field" style={{ marginBottom: '10px' }}>
                <label>Back (answer)</label>
                <textarea rows={2} value={cardBack} onChange={e => setCardBack(e.target.value)} placeholder="Enter answer or definition..." style={{ width: '100%', padding: '8px', border: '0.5px solid var(--border2)', borderRadius: 'var(--radius)', background: 'var(--bg)', color: 'var(--tx)', fontFamily: 'inherit', resize: 'vertical', fontSize: '13px' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="tt-btn tt-btn-primary" style={{ flex: 'none' }} onClick={addCard}>Add card</button>
                <button className="tt-btn tt-btn-outline" style={{ flex: 'none' }} onClick={() => { setAddingCard(false); setCardFront(''); setCardBack(''); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="fc-card-list">
          {activeDeck.cards.map((c, i) => (
            <div key={c.id} className="fc-card-row">
              <div className="fc-card-num">{i + 1}</div>
              <div className="fc-card-content">
                <div className="fc-card-front">{c.front}</div>
                <div className="fc-card-back">{c.back}</div>
              </div>
              <span className={`fc-card-status fc-chip-${c.status}`}>{c.status}</span>
              <button className="tt-del-btn" onClick={() => deleteCard(c.id)}>✕</button>
            </div>
          ))}
          {activeDeck.cards.length === 0 && <p style={{ color: 'var(--tx3)', fontSize: '14px', padding: '1rem 0' }}>No cards yet. Add one above.</p>}
        </div>
      </div>
    );
  }

  // ── Study mode
  if (screen === 'study' && activeDeck) {
    if (done) {
      const know = studyQueue.filter(c => c.status === 'know').length;
      const review = studyQueue.filter(c => c.status === 'review').length;
      return (
        <div className="view">
          <div className="fc-done-screen">
            <div className="fc-done-icon">🎉</div>
            <h3>Session complete!</h3>
            <p>You went through all {studyQueue.length} cards.</p>
            <div className="fc-done-stats">
              <span className="fc-stat-chip fc-chip-know">✓ {know} Know</span>
              <span className="fc-stat-chip fc-chip-review">↩ {review} Review</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
              <button className="tt-btn tt-btn-primary" onClick={startStudy}>Study again</button>
              <button className="tt-btn tt-btn-outline" onClick={() => setScreen('deck-view')}>Back to deck</button>
            </div>
          </div>
        </div>
      );
    }

    const card = studyQueue[studyIdx];
    const progress = Math.round(studyIdx / studyQueue.length * 100);
    return (
      <div className="view">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <button className="fc-back-btn" onClick={() => setScreen('deck-view')}>← Exit</button>
          <span style={{ fontSize: '13px', color: 'var(--tx3)', marginLeft: 'auto' }}>{studyIdx + 1} / {studyQueue.length}</span>
        </div>
        <div className="fc-progress-bar-wrap"><div className="fc-progress-bar" style={{ width: progress + '%' }} /></div>

        <div className="fc-study-card" onClick={() => setFlipped(!flipped)}>
          <div className={`fc-study-inner${flipped ? ' flipped' : ''}`}>
            <div className="fc-study-front">
              <div className="fc-study-side-label">Question</div>
              <div className="fc-study-text">{card.front}</div>
              <div className="fc-study-hint">Click to reveal answer</div>
            </div>
            <div className="fc-study-back">
              <div className="fc-study-side-label">Answer</div>
              <div className="fc-study-text">{card.back}</div>
            </div>
          </div>
        </div>

        {flipped && (
          <div className="fc-study-actions">
            <button className="fc-btn-review" onClick={() => markCard('review')}>↩ Review again</button>
            <button className="fc-btn-know" onClick={() => markCard('know')}>✓ I know this</button>
          </div>
        )}
        {!flipped && <p style={{ textAlign: 'center', color: 'var(--tx3)', fontSize: '13px', marginTop: '1rem' }}>Click the card to flip</p>}
      </div>
    );
  }

  return null;
}
