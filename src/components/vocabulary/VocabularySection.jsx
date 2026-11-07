import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Layers,
  Sparkles,
  Volume2,
  RotateCw,
  CheckCircle2,
  Flame,
  Search,
  Plus,
  Filter,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/client";
import { calculateSM2Review, RECALL_GRADES, isCardDue, calculateRetentionScore } from "@/lib/srs";
import { OfflineSRSStore } from "@/lib/offlineStore";
import confetti from "canvas-confetti";

export default function VocabularySection({ userProfile, onWordSaved }) {
  const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("review"); // review, deck, add
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDeckFilter, setSelectedDeckFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // New Word Form State
  const [newTerm, setNewTerm] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [newPhonetic, setNewPhonetic] = useState("");
  const [newExample, setNewExample] = useState("");
  const [newDeck, setNewDeck] = useState("Travel Essentials");
  const [isSaving, setIsSaving] = useState(false);

  const targetLang = userProfile?.target_languages?.[0] || "es";

  // Load vocabulary from backend with offline fallback
  const loadVocabulary = async () => {
    setLoading(true);
    try {
      const res = await api.getVocabulary();
      if (res && res.items) {
        const formatted = res.items.map(item => ({
          id: item.id,
          term: item.vocabulary?.term || item.term,
          meaning: item.vocabulary?.meaning || item.meaning,
          phonetic: item.vocabulary?.phonetic || item.phonetic,
          exampleSentence: item.vocabulary?.exampleSentence || item.exampleSentence,
          deck: item.deck || "Default",
          tags: item.tags || "",
          repetitionCount: item.repetitionCount || 0,
          intervalDays: item.intervalDays || 1,
          easeFactor: item.easeFactor || 2.5,
          dueDate: item.dueDate || new Date().toISOString(),
          retentionScore: item.retentionScore || 100
        }));
        setDeck(formatted);
        OfflineSRSStore.setDeck(formatted);
      }
    } catch (e) {
      // Offline fallback
      const cached = OfflineSRSStore.getDeck();
      if (cached && cached.length > 0) {
        setDeck(cached);
      } else {
        // Fallback starter cards if fresh
        const starter = [
          {
            id: 'card-1',
            term: 'Hola',
            meaning: 'Hello / Hi',
            phonetic: 'OH-lah',
            exampleSentence: 'Hola, ¿cómo estás hoy?',
            deck: 'Travel Essentials',
            repetitionCount: 1,
            intervalDays: 1,
            easeFactor: 2.5,
            dueDate: new Date().toISOString(),
            retentionScore: 95
          },
          {
            id: 'card-2',
            term: 'Gracias',
            meaning: 'Thank you',
            phonetic: 'GRAH-syahs',
            exampleSentence: 'Muchas gracias por su hospitalidad.',
            deck: 'Travel Essentials',
            repetitionCount: 0,
            intervalDays: 1,
            easeFactor: 2.5,
            dueDate: new Date().toISOString(),
            retentionScore: 80
          },
          {
            id: 'card-3',
            term: 'Por favor',
            meaning: 'Please',
            phonetic: 'por fah-VOR',
            exampleSentence: 'Un café con leche, por favor.',
            deck: 'Travel Essentials',
            repetitionCount: 2,
            intervalDays: 6,
            easeFactor: 2.6,
            dueDate: new Date().toISOString(),
            retentionScore: 100
          }
        ];
        setDeck(starter);
        OfflineSRSStore.setDeck(starter);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVocabulary();
    OfflineSRSStore.syncWithServer(api);
  }, []);

  // Filter due cards
  const dueCards = deck.filter(c => isCardDue(c));
  const currentCard = dueCards[currentCardIndex];

  // Play pronunciation audio
  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Keyboard shortcuts (Space = Flip, 1 = Again, 2 = Hard, 3 = Good, 4 = Easy)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== "review" || !currentCard) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped(f => !f);
      } else if (isFlipped) {
        if (e.key === "1") handleRateCard(RECALL_GRADES.AGAIN);
        if (e.key === "2") handleRateCard(RECALL_GRADES.HARD);
        if (e.key === "3") handleRateCard(RECALL_GRADES.GOOD);
        if (e.key === "4") handleRateCard(RECALL_GRADES.EASY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, isFlipped, currentCard]);

  // Handle rating with SuperMemo SM-2
  const handleRateCard = async (grade) => {
    if (!currentCard) return;

    const sm2 = calculateSM2Review(currentCard, grade);

    // Queue or submit review
    OfflineSRSStore.queueReview(currentCard.id, grade, sm2);
    api.reviewVocabulary(currentCard.id, grade).catch(() => {});

    // Update local deck state
    setDeck(prev => prev.map(c => c.id === currentCard.id ? { ...c, ...sm2 } : c));

    setIsFlipped(false);
    if (currentCardIndex < dueCards.length - 1) {
      setCurrentCardIndex(i => i + 1);
    } else {
      setCurrentCardIndex(0);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  // Save New Word
  const handleSaveWord = async (e) => {
    e.preventDefault();
    if (!newTerm.trim() || !newMeaning.trim()) return;

    setIsSaving(true);
    try {
      const payload = {
        langCode: targetLang,
        term: newTerm.trim(),
        meaning: newMeaning.trim(),
        phonetic: newPhonetic.trim(),
        exampleSentence: newExample.trim(),
        deck: newDeck
      };

      await api.addVocabulary(payload);
      await loadVocabulary();

      setNewTerm("");
      setNewMeaning("");
      setNewPhonetic("");
      setNewExample("");
      setActiveTab("deck");
      onWordSaved?.();
    } catch (err) {
      // Local fallback creation
      const localCard = {
        id: `local-${Date.now()}`,
        term: newTerm.trim(),
        meaning: newMeaning.trim(),
        phonetic: newPhonetic.trim(),
        exampleSentence: newExample.trim(),
        deck: newDeck,
        repetitionCount: 0,
        intervalDays: 1,
        easeFactor: 2.5,
        dueDate: new Date().toISOString(),
        retentionScore: 100
      };
      setDeck(prev => [localCard, ...prev]);
      OfflineSRSStore.setDeck([localCard, ...deck]);
      setActiveTab("deck");
    } finally {
      setIsSaving(false);
    }
  };

  const decksList = ["All", ...new Set(deck.map(c => c.deck))];
  const filteredDeck = deck.filter(c => {
    const matchesDeck = selectedDeckFilter === "All" || c.deck === selectedDeckFilter;
    const matchesSearch = !searchQuery ||
      c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.meaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDeck && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-4xl mx-auto pb-16"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Brain className="w-5 h-5" />
            </div>
            <span>Spaced Repetition Flashcards</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            SuperMemo SM-2 algorithmic memory retention engine
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-secondary/30 p-1 rounded-xl border border-white/[0.06] text-xs font-semibold">
          <button
            onClick={() => setActiveTab("review")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "review" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Review Queue</span>
            {dueCards.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === "review" ? "bg-white/20 text-white" : "bg-primary text-primary-foreground"
              }`}>
                {dueCards.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("deck")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "deck" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Master Deck</span>
            <span className="text-[10px] opacity-70">({deck.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all ${
              activeTab === "add" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Word</span>
          </button>
        </div>
      </div>

      {/* 1. REVIEW QUEUE TAB (3D FLIP CARD PLAYER) */}
      {activeTab === "review" && (
        <div className="max-w-lg mx-auto">
          {dueCards.length > 0 && currentCard ? (
            <div>
              {/* Card Meta Bar */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3 px-1">
                <span className="font-semibold uppercase tracking-wider text-[11px] px-2 py-0.5 rounded bg-secondary/50 border border-white/[0.06]">
                  {currentCard.deck}
                </span>
                <span>
                  Card {currentCardIndex + 1} of {dueCards.length}
                </span>
              </div>

              {/* 3D Flip Card Container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer perspective-[1000px] mb-6 min-h-[280px]"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full min-h-[280px] relative transform-style-preserve-3d"
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden glass-card-elevated p-8 rounded-2xl flex flex-col justify-between items-center text-center border-white/[0.08]">
                    <div className="w-full flex justify-between items-center text-muted-foreground">
                      <span className="text-xs font-semibold">Prompt</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio(currentCard.term);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-primary transition-all"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="my-auto">
                      <p className="text-4xl font-heading font-black text-foreground mb-2">
                        {currentCard.term}
                      </p>
                      {currentCard.phonetic && (
                        <p className="text-sm text-primary/80 italic font-mono">
                          [{currentCard.phonetic}]
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 opacity-70">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Tap or press Space to flip</span>
                    </p>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card-elevated p-8 rounded-2xl flex flex-col justify-between items-center text-center border-primary/30 bg-gradient-to-b from-card to-primary/5">
                    <div className="w-full flex justify-between items-center text-muted-foreground">
                      <span className="text-xs font-semibold text-primary">Meaning & Context</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playAudio(currentCard.term);
                        }}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-primary"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="my-auto space-y-3">
                      <p className="text-3xl font-heading font-bold text-foreground">
                        {currentCard.meaning}
                      </p>
                      {currentCard.exampleSentence && (
                        <div className="p-3 rounded-xl bg-secondary/40 border border-white/[0.06] text-xs text-foreground/90 max-w-sm">
                          <p className="italic font-medium">"{currentCard.exampleSentence}"</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                      <span>Ease Factor: {currentCard.easeFactor}</span>
                      <span>•</span>
                      <span>Streak: {currentCard.repetitionCount}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* SM-2 Recall Rating Buttons */}
              {isFlipped ? (
                <div className="space-y-2">
                  <p className="text-xs text-center text-muted-foreground font-medium mb-1">
                    Rate your recall quality (Keys: 1, 2, 3, 4)
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleRateCard(RECALL_GRADES.AGAIN)}
                      className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
                    >
                      <span>Again</span>
                      <span className="text-[10px] opacity-70">1 day</span>
                    </button>
                    <button
                      onClick={() => handleRateCard(RECALL_GRADES.HARD)}
                      className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
                    >
                      <span>Hard</span>
                      <span className="text-[10px] opacity-70">~2 days</span>
                    </button>
                    <button
                      onClick={() => handleRateCard(RECALL_GRADES.GOOD)}
                      className="p-3 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
                    >
                      <span>Good</span>
                      <span className="text-[10px] opacity-70">~4 days</span>
                    </button>
                    <button
                      onClick={() => handleRateCard(RECALL_GRADES.EASY)}
                      className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
                    >
                      <span>Easy</span>
                      <span className="text-[10px] opacity-70">~7+ days</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setIsFlipped(true)}
                  className="w-full py-5 rounded-xl font-semibold bg-primary text-primary-foreground shadow-md hover:bg-primary/90"
                >
                  Show Answer (Space)
                </Button>
              )}
            </div>
          ) : (
            /* ALL CAUGHT UP SCREEN */
            <div className="glass-card p-10 text-center rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-1">All Caught Up!</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-6">
                You have reviewed all cards scheduled for today. Your long-term memory consolidation is on track.
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => setActiveTab("deck")}
                  variant="outline"
                  className="border-white/[0.08] text-xs font-semibold"
                >
                  Browse Master Deck
                </Button>
                <Button
                  onClick={() => setActiveTab("add")}
                  className="bg-primary text-primary-foreground text-xs font-semibold gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Words</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. MASTER WORD DECK TAB */}
      {activeTab === "deck" && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search terms or meanings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-secondary/30 border border-white/[0.08] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Deck Category Selector */}
            <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
              {decksList.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDeckFilter(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedDeckFilter === d
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-secondary/20 hover:bg-secondary/40 text-muted-foreground border border-white/[0.04]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Master Deck Table */}
          <div className="glass-card rounded-2xl overflow-hidden border border-white/[0.06]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06] bg-secondary/30 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3 px-4">Term</th>
                  <th className="py-3 px-4">Meaning</th>
                  <th className="py-3 px-4">Deck</th>
                  <th className="py-3 px-4">Memory Retention</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs">
                {filteredDeck.map((item) => {
                  const isDue = isCardDue(item);
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => playAudio(item.term)}
                            className="p-1 rounded text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span>{item.term}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {item.meaning}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-secondary/50 text-[10px] font-medium border border-white/[0.04]">
                          {item.deck}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 max-w-[120px]">
                          <div className="w-full bg-secondary/40 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${item.retentionScore}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {item.retentionScore}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isDue ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20">
                            Due Today
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                            Memorized
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ADD WORD TAB */}
      {activeTab === "add" && (
        <div className="max-w-md mx-auto glass-card p-6 rounded-2xl border border-white/[0.06]">
          <h3 className="text-base font-heading font-bold text-foreground mb-1">
            Add Word to Vocabulary Deck
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Words saved here are automatically scheduled by the SuperMemo SM-2 algorithm.
          </p>

          <form onSubmit={handleSaveWord} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-foreground/80 block mb-1">
                Word or Phrase (Target Language) *
              </label>
              <Input
                required
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                placeholder="e.g. Desafortunadamente"
                className="bg-secondary/30 border-white/[0.08] text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/80 block mb-1">
                English Meaning *
              </label>
              <Input
                required
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                placeholder="e.g. Unfortunately"
                className="bg-secondary/30 border-white/[0.08] text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/80 block mb-1">
                Phonetic Pronunciation Guide (Optional)
              </label>
              <Input
                value={newPhonetic}
                onChange={(e) => setNewPhonetic(e.target.value)}
                placeholder="e.g. dehs-ah-for-too-nah-dah-MEN-teh"
                className="bg-secondary/30 border-white/[0.08] text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/80 block mb-1">
                Example Sentence (Optional)
              </label>
              <Input
                value={newExample}
                onChange={(e) => setNewExample(e.target.value)}
                placeholder="e.g. Desafortunadamente, no puedo ir."
                className="bg-secondary/30 border-white/[0.08] text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground/80 block mb-1">
                Deck Category
              </label>
              <select
                value={newDeck}
                onChange={(e) => setNewDeck(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-secondary/30 border border-white/[0.08] text-xs text-foreground focus:outline-none"
              >
                <option value="Travel Essentials">Travel Essentials</option>
                <option value="Top 1000 Words">Top 1000 Words</option>
                <option value="Business Verbs">Business Verbs</option>
                <option value="Food & Dining">Food & Dining</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isSaving}
              className="w-full py-5 rounded-xl font-semibold bg-primary text-primary-foreground mt-2"
            >
              {isSaving ? "Saving..." : "Add to SRS Deck"}
            </Button>
          </form>
        </div>
      )}
    </motion.div>
  );
}
