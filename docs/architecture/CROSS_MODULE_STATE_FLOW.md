# Cross-Module State Flow & Offline Synchronization Architecture

This architectural document defines how data seamlessly transitions across UniLang's modules: Culture Explorer, Translator, Vocabulary SRS Deck, and AI Conversation Partner.

## 1. Unified Entity Propagation

1. **One-Tap Term Capture:**
   - Any term highlighted in Culture Explorer or Translator triggers a quick-action popover.
   - User tap dispatches an action to `SavedVocabulary`, instantiating an SM-2 flashcard with ease factor $2.5$.
2. **Contextual AI Ingestion:**
   - The AI Conversation Partner ingests terms flagged as "struggling" ($q < 3$) from the SRS deck, naturally weaving them into subsequent dialogue turns.

## 2. Offline Synchronization

- Client uses an IndexedDB persistent queue (`offlineStore.js`) for progress updates, quiz submissions, and SRS reviews.
- When network reconnects, transactions replay idempotently via UUID deduplication on the Fastify API gateway.

