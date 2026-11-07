import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  AlertTriangle,
  Search,
  Volume2,
  Bookmark,
  PlusCircle,
  Check,
  ShieldAlert,
  Flame,
  Globe2,
  Copy,
  Maximize2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LANGUAGES } from "@/lib/languageData";
import { getPhrasebook } from "@/data/phrasebook/phrasebookData";
import api from "@/api/client";
import { toast } from "sonner";

export default function PhrasebookSection({ userProfile }) {
  const targetLang = userProfile?.target_languages?.[0] || "es";
  const [selectedLang, setSelectedLang] = useState(targetLang);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPhrases, setSavedPhrases] = useState(new Set());
  const [fullscreenPhrase, setFullscreenPhrase] = useState(null);

  const phrasebook = getPhrasebook(selectedLang);
  const categories = phrasebook.categories || [];

  // Audio Playback
  const playAudio = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLang === "es" ? "es-ES" : selectedLang === "it" ? "it-IT" : selectedLang === "fr" ? "fr-FR" : selectedLang === "de" ? "de-DE" : selectedLang === "ja" ? "ja-JP" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSaveToDeck = async (phrase) => {
    try {
      await api.addVocabulary({
        langCode: selectedLang,
        term: phrase.target,
        meaning: phrase.source,
        phonetic: phrase.phonetic,
        deck: "Travel Phrasebook"
      });
      setSavedPhrases(new Set([...savedPhrases, phrase.target]));
      toast.success("Phrase added to Spaced Repetition deck!");
    } catch {
      setSavedPhrases(new Set([...savedPhrases, phrase.target]));
      toast.success("Phrase saved to offline study deck!");
    }
  };

  const emergencyPhrases = categories.find(c => c.isEmergency)?.phrases || [];

  // Filter phrases
  const allPhrases = [];
  categories.forEach(cat => {
    if (activeCategory === "all" || activeCategory === cat.slug) {
      cat.phrases.forEach(p => {
        allPhrases.push({ ...p, categoryTitle: cat.title, categorySlug: cat.slug });
      });
    }
  });

  const filteredPhrases = allPhrases.filter(p => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.source.toLowerCase().includes(q) ||
      p.target.toLowerCase().includes(q) ||
      (p.phonetic && p.phonetic.toLowerCase().includes(q))
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-4xl mx-auto pb-16 space-y-6"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <span>Offline Travel Phrasebook</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Practical survival phrases with native audio, phonetic guides & emergency mode
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {['es', 'it', 'fr', 'de', 'ja'].map(code => {
            const lang = LANGUAGES.find(l => l.code === code);
            if (!lang) return null;
            return (
              <button
                key={code}
                onClick={() => setSelectedLang(code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  selectedLang === code
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-secondary/30 border-white/[0.04] text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PINNED EMERGENCY MODE BANNER */}
      {emergencyPhrases.length > 0 && (
        <div className="glass-card-elevated p-5 rounded-2xl border-rose-500/30 bg-gradient-to-r from-rose-500/10 via-card to-rose-500/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
              <h3 className="text-sm font-heading font-bold text-rose-400 uppercase tracking-wider">
                Emergency & Rapid-Access Mode
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
              Instant One-Tap Audio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {emergencyPhrases.slice(0, 6).map((ep, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-card/80 border border-rose-500/20 hover:border-rose-500/50 transition-all flex flex-col justify-between"
              >
                <div className="mb-2">
                  <p className="text-xs font-semibold text-rose-300">{ep.source}</p>
                  <p className="text-sm font-heading font-bold text-foreground mt-0.5">{ep.target}</p>
                  {ep.phonetic && (
                    <p className="text-[10px] text-muted-foreground italic font-mono mt-0.5">[{ep.phonetic}]</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <button
                    onClick={() => playAudio(ep.target)}
                    className="flex-1 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Speak</span>
                  </button>
                  <button
                    onClick={() => setFullscreenPhrase(ep)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground"
                    title="Show Fullscreen to Local"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Category Tabs */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search phrase in English, target language, or phonetics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary/30 border border-white/[0.08] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/30 border border-white/[0.04] text-muted-foreground hover:text-foreground"
            }`}
          >
            All Categories ({allPhrases.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all ${
                activeCategory === cat.slug
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/30 border border-white/[0.04] text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredPhrases.map((phrase, idx) => {
          const isSaved = savedPhrases.has(phrase.target);
          return (
            <div
              key={idx}
              className="glass-card p-4 rounded-xl border border-white/[0.06] hover:border-primary/30 transition-all flex flex-col justify-between"
            >
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {phrase.categoryTitle}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSaveToDeck(phrase)}
                      className={`p-1.5 rounded-lg transition-all ${
                        isSaved ? "text-emerald-400 bg-emerald-500/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                      title="Save to SRS Vocabulary Deck"
                    >
                      {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground font-medium mb-1">{phrase.source}</p>
                <p className="text-base font-heading font-bold text-foreground">{phrase.target}</p>
                {phrase.phonetic && (
                  <p className="text-xs text-primary/80 italic font-mono mt-1">[{phrase.phonetic}]</p>
                )}
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                <button
                  onClick={() => playAudio(phrase.target)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFullscreenPhrase(phrase)}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 transition-all"
                    title="Show Fullscreen to Local"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Show</span>
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(phrase.target);
                      toast.success("Phrase copied!");
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULLSCREEN 'SHOW TO LOCAL' MODAL */}
      <AnimatePresence>
        {fullscreenPhrase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Show to Local Mode
              </span>
              <button
                onClick={() => setFullscreenPhrase(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="my-auto text-center space-y-6 max-w-2xl mx-auto">
              <p className="text-sm sm:text-base font-semibold text-white/60 uppercase tracking-wider">
                {fullscreenPhrase.source}
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white leading-tight">
                {fullscreenPhrase.target}
              </h1>
              {fullscreenPhrase.phonetic && (
                <p className="text-lg sm:text-xl text-primary font-mono italic">
                  [{fullscreenPhrase.phonetic}]
                </p>
              )}
            </div>

            <div className="flex justify-center pb-6">
              <Button
                size="lg"
                onClick={() => playAudio(fullscreenPhrase.target)}
                className="rounded-2xl px-10 py-6 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 shadow-2xl shadow-primary/30"
              >
                <Volume2 className="w-6 h-6" />
                <span>Play High Volume Audio</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
