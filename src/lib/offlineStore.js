// Offline Storage & Synchronization Store for UniLang SRS Decks

const STORE_KEY_VOCAB = 'unilang_srs_deck';
const STORE_KEY_PENDING = 'unilang_srs_pending_reviews';

export class OfflineSRSStore {
  static getDeck() {
    try {
      const stored = localStorage.getItem(STORE_KEY_VOCAB);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static setDeck(deck) {
    try {
      localStorage.setItem(STORE_KEY_VOCAB, JSON.stringify(deck));
    } catch (e) {
      console.warn('Failed to cache deck offline:', e);
    }
  }

  static getPendingReviews() {
    try {
      const stored = localStorage.getItem(STORE_KEY_PENDING);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  static queueReview(cardId, grade, sm2State) {
    const pending = this.getPendingReviews();
    pending.push({
      cardId,
      grade,
      sm2State,
      timestamp: Date.now()
    });
    localStorage.setItem(STORE_KEY_PENDING, JSON.stringify(pending));

    // Also update local deck state immediately so user sees their progress
    const deck = this.getDeck();
    const updatedDeck = deck.map(item => {
      if (item.id === cardId) {
        return {
          ...item,
          ...sm2State,
          lastReviewedAt: new Date().toISOString()
        };
      }
      return item;
    });
    this.setDeck(updatedDeck);
  }

  static async syncWithServer(api) {
    if (!navigator.onLine) return;
    const pending = this.getPendingReviews();
    if (pending.length === 0) return;

    console.log(`[UniLang Offline] Syncing ${pending.length} pending reviews...`);
    const failed = [];

    for (const item of pending) {
      try {
        await api.reviewVocabulary(item.cardId, item.grade);
      } catch (err) {
        failed.push(item);
      }
    }

    localStorage.setItem(STORE_KEY_PENDING, JSON.stringify(failed));
  }
}
