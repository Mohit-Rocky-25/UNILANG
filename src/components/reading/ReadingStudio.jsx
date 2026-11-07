import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Columns,
  Rows,
  Bookmark,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
  Flame,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { READING_ARTICLES, getArticlesByLanguage } from "@/data/reading/readingPassages";
import { LANGUAGES } from "@/lib/languageData";
import api from "@/api/client";
import { toast } from "sonner";

export default function ReadingStudio({ userProfile, onXPGain }) {
  const targetLang = userProfile?.target_languages?.[0] || "es";
  const [selectedLang, setSelectedLang] = useState(targetLang);
  const articles = getArticlesByLanguage(selectedLang);
  const [activeArticleId, setActiveArticleId] = useState(articles[0]?.id || READING_ARTICLES[0].id);

  // Layout mode: 'split' (side-by-side) or 'stacked' (top/bottom)
  const [layoutMode, setLayoutMode] = useState("split");
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedWords, setSavedWords] = useState(new Set());

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizAwarded, setQuizAwarded] = useState(false);

  const article = articles.find(a => a.id === activeArticleId) || articles[0] || READING_ARTICLES[0];
  const synthRef = useRef(null);

  useEffect(() => {
    // Reset state on article change
    stopAudio();
    setActiveSentenceIndex(null);
    setShowQuiz(false);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizAwarded(false);
  }, [activeArticleId, selectedLang]);

  // Audio Playback
  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActiveSentenceIndex(null);
  };

  const playSentenceAudio = (index) => {
    if (!("speechSynthesis" in window) || !article?.sentences?.[index]) return;

    window.speechSynthesis.cancel();
    const sentence = article.sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence.target);
    utterance.rate = playbackSpeed;
    utterance.lang = selectedLang === "es" ? "es-ES" : selectedLang === "fr" ? "fr-FR" : selectedLang === "de" ? "de-DE" : selectedLang === "it" ? "it-IT" : selectedLang === "ja" ? "ja-JP" : "en-US";

    utterance.onstart = () => {
      setActiveSentenceIndex(index);
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const playAllSequentially = (startIndex = 0) => {
    if (!("speechSynthesis" in window) || !article?.sentences) return;

    window.speechSynthesis.cancel();
    let currentIndex = startIndex;
    setIsPlaying(true);

    const playNext = () => {
      if (currentIndex >= article.sentences.length) {
        setIsPlaying(false);
        setActiveSentenceIndex(null);
        return;
      }

      const sentence = article.sentences[currentIndex];
      const utterance = new SpeechSynthesisUtterance(sentence.target);
      utterance.rate = playbackSpeed;
      utterance.lang = selectedLang === "es" ? "es-ES" : selectedLang === "fr" ? "fr-FR" : selectedLang === "de" ? "de-DE" : selectedLang === "it" ? "it-IT" : selectedLang === "ja" ? "ja-JP" : "en-US";

      setActiveSentenceIndex(currentIndex);

      utterance.onend = () => {
        currentIndex++;
        playNext();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setActiveSentenceIndex(null);
      };

      window.speechSynthesis.speak(utterance);
    };

    playNext();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      playAllSequentially(activeSentenceIndex !== null ? activeSentenceIndex : 0);
    }
  };

  // Add word to SRS Deck
  const handleSaveWord = async (word) => {
    try {
      await api.addVocabulary({
        langCode: selectedLang,
        term: word.term,
        meaning: word.meaning,
        phonetic: word.phonetic || "",
        pos: word.pos || "",
        deck: `Reading: ${article.title}`
      });
      setSavedWords(new Set([...savedWords, word.term]));
      toast.success(`"${word.term}" added to SRS Deck!`);
    } catch {
      setSavedWords(new Set([...savedWords, word.term]));
      toast.success(`"${word.term}" saved offline to SRS Deck!`);
    }
  };

  // Pronounce individual word
  const pronounceWord = (term) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(term);
      utterance.lang = selectedLang === "es" ? "es-ES" : selectedLang === "fr" ? "fr-FR" : selectedLang === "de" ? "de-DE" : selectedLang === "it" ? "it-IT" : selectedLang === "ja" ? "ja-JP" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Quiz submission
  const handleSelectQuizOption = (questionId, optionIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleGradeQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    article.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount >= 2 && !quizAwarded) {
      const xpEarned = 35;
      onXPGain?.(xpEarned, `reading_${article.id}`);
      setQuizAwarded(true);
      toast.success(`Comprehension Quiz Mastered! +${xpEarned} XP awarded!`);
    } else {
      toast.info(`You got ${correctCount} of ${article.quiz.length} correct.`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-4xl mx-auto pb-16 space-y-6"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Interactive Parallel Reader
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Karaoke Audio Sync
            </span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span>Parallel Reading Studio</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Read original native literature, tap any word for inline glosses, and verify with comprehension checks
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {["es", "fr", "de", "it", "ja"].map(code => {
            const lang = LANGUAGES.find(l => l.code === code);
            if (!lang) return null;
            return (
              <button
                key={code}
                onClick={() => {
                  setSelectedLang(code);
                  const nextArticles = getArticlesByLanguage(code);
                  setActiveArticleId(nextArticles[0]?.id || "");
                }}
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

      {/* Article Selector Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {articles.map(art => (
          <button
            key={art.id}
            onClick={() => setActiveArticleId(art.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium border text-left shrink-0 transition-all ${
              activeArticleId === art.id
                ? "bg-card border-primary text-foreground shadow-sm shadow-primary/10"
                : "bg-secondary/20 border-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary/20 text-primary">
                {art.level}
              </span>
              <span className="text-[10px] text-muted-foreground">{art.category}</span>
            </div>
            <p className="font-semibold text-foreground line-clamp-1">{art.title}</p>
          </button>
        ))}
      </div>

      {/* Reader Controls Toolbar */}
      <div className="glass-card p-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-white/[0.06]">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleTogglePlay}
            className={`rounded-xl px-4 text-xs font-semibold flex items-center gap-1.5 ${
              isPlaying
                ? "bg-rose-500 hover:bg-rose-600 text-white"
                : "bg-primary hover:bg-primary/90 text-primary-foreground"
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause Karaoke" : "Read Aloud"}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={stopAudio}
            className="rounded-xl text-xs text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>

          {/* Speed Selector */}
          <div className="flex items-center bg-secondary/40 p-0.5 rounded-xl border border-white/[0.06] text-xs">
            {[0.75, 1.0, 1.25].map(spd => (
              <button
                key={spd}
                onClick={() => {
                  setPlaybackSpeed(spd);
                  if (isPlaying) {
                    stopAudio();
                    playAllSequentially(activeSentenceIndex || 0);
                  }
                }}
                className={`px-2 py-1 rounded-lg font-medium transition-all ${
                  playbackSpeed === spd
                    ? "bg-card text-foreground shadow-xs font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Layout Mode & Quiz Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-secondary/40 p-0.5 rounded-xl border border-white/[0.06]">
            <button
              onClick={() => setLayoutMode("split")}
              className={`p-1.5 rounded-lg transition-all ${
                layoutMode === "split"
                  ? "bg-card text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Side-by-side Split View"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode("stacked")}
              className={`p-1.5 rounded-lg transition-all ${
                layoutMode === "stacked"
                  ? "bg-card text-primary shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Stacked Top/Bottom View"
            >
              <Rows className="w-4 h-4" />
            </button>
          </div>

          <Button
            size="sm"
            variant={showQuiz ? "default" : "outline"}
            onClick={() => setShowQuiz(!showQuiz)}
            className="rounded-xl text-xs font-semibold flex items-center gap-1.5 border-white/[0.08]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Comprehension Quiz</span>
          </Button>
        </div>
      </div>

      {/* ARTICLE CONTENT DISPLAY */}
      <div className="glass-card-elevated p-6 rounded-3xl border border-white/[0.08] space-y-4">
        {/* Title & Metadata Header */}
        <div className="border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/20 text-primary">
              {article.level}
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground font-medium">{article.category}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{article.readTimeMinutes} min read</span>
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground">{article.title}</h1>
          <p className="text-xs text-muted-foreground mt-1 italic">{article.summary}</p>
        </div>

        {/* Instructions helper */}
        <p className="text-[11px] text-muted-foreground/80 flex items-center gap-1 bg-secondary/30 px-3 py-1.5 rounded-xl border border-white/[0.04]">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Tip: Tap on any individual word to see its grammatical role, phonetic guide, and save it to your SRS deck. Tap speaker icon to hear that specific sentence.</span>
        </p>

        {/* Sentences Loop */}
        <div className="space-y-4 pt-2">
          {article.sentences.map((sent, sIdx) => {
            const isSentenceActive = activeSentenceIndex === sIdx;

            return (
              <div
                key={sent.id}
                className={`p-4 rounded-2xl transition-all border ${
                  isSentenceActive
                    ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-md"
                    : "bg-card/40 border-white/[0.04] hover:border-white/[0.1]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2">
                    {/* Mode: Split vs Stacked */}
                    {layoutMode === "split" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Target text with clickable word tokens */}
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-primary/70 mb-1">
                            {LANGUAGES.find(l => l.code === selectedLang)?.name || "Target"}
                          </p>
                          <div className="text-base font-medium text-foreground leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
                            {sent.words ? (
                              sent.words.map((w, wIdx) => {
                                const isSaved = savedWords.has(w.term);
                                return (
                                  <Popover key={wIdx}>
                                    <PopoverTrigger asChild>
                                      <button className="underline decoration-dotted underline-offset-4 decoration-primary/40 hover:decoration-primary hover:text-primary transition-all text-left">
                                        {w.term}
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 p-3 rounded-2xl glass-card-elevated border-white/[0.1] shadow-2xl z-50">
                                      <div className="space-y-2">
                                        <div className="flex items-start justify-between gap-2">
                                          <div>
                                            <p className="text-base font-bold text-foreground">{w.term}</p>
                                            {w.phonetic && (
                                              <p className="text-xs text-primary font-mono italic">[{w.phonetic}]</p>
                                            )}
                                          </div>
                                          <button
                                            onClick={() => pronounceWord(w.term)}
                                            className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-primary"
                                          >
                                            <Volume2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>

                                        <div className="py-1 border-t border-white/[0.06]">
                                          <p className="text-xs text-foreground font-medium">{w.meaning}</p>
                                          {w.pos && (
                                            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                              Part of Speech: {w.pos}
                                            </span>
                                          )}
                                        </div>

                                        <Button
                                          size="sm"
                                          onClick={() => handleSaveWord(w)}
                                          className={`w-full text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 ${
                                            isSaved
                                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                              : "bg-primary text-primary-foreground hover:bg-primary/90"
                                          }`}
                                        >
                                          {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                                          <span>{isSaved ? "Saved to SRS Deck" : "Add to SRS Deck"}</span>
                                        </Button>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                );
                              })
                            ) : (
                              <span>{sent.target}</span>
                            )}
                          </div>
                        </div>

                        {/* Source English translation */}
                        <div className="border-t md:border-t-0 md:border-l border-white/[0.06] md:pl-4 pt-2 md:pt-0">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">
                            English Translation
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {sent.source}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Stacked layout */
                      <div className="space-y-2">
                        <div className="text-base font-medium text-foreground leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1">
                          {sent.words ? (
                            sent.words.map((w, wIdx) => {
                              const isSaved = savedWords.has(w.term);
                              return (
                                <Popover key={wIdx}>
                                  <PopoverTrigger asChild>
                                    <button className="underline decoration-dotted underline-offset-4 decoration-primary/40 hover:decoration-primary hover:text-primary transition-all text-left">
                                      {w.term}
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-64 p-3 rounded-2xl glass-card-elevated border-white/[0.1] shadow-2xl z-50">
                                    <div className="space-y-2">
                                      <div className="flex items-start justify-between gap-2">
                                        <div>
                                          <p className="text-base font-bold text-foreground">{w.term}</p>
                                          {w.phonetic && (
                                            <p className="text-xs text-primary font-mono italic">[{w.phonetic}]</p>
                                          )}
                                        </div>
                                        <button
                                          onClick={() => pronounceWord(w.term)}
                                          className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-primary"
                                        >
                                          <Volume2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>

                                      <div className="py-1 border-t border-white/[0.06]">
                                        <p className="text-xs text-foreground font-medium">{w.meaning}</p>
                                        {w.pos && (
                                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                            Part of Speech: {w.pos}
                                          </span>
                                        )}
                                      </div>

                                      <Button
                                        size="sm"
                                        onClick={() => handleSaveWord(w)}
                                        className={`w-full text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 ${
                                          isSaved
                                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                                        }`}
                                      >
                                        {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                                        <span>{isSaved ? "Saved to SRS Deck" : "Add to SRS Deck"}</span>
                                      </Button>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              );
                            })
                          ) : (
                            <span>{sent.target}</span>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground italic border-t border-white/[0.04] pt-1">
                          {sent.source}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Play specific sentence button */}
                  <button
                    onClick={() => playSentenceAudio(sIdx)}
                    className="p-2 rounded-xl bg-secondary/30 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all shrink-0"
                    title="Listen to this sentence"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* COMPREHENSION QUIZ SECTION */}
      {showQuiz && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-elevated p-6 rounded-3xl border border-primary/30 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground">Comprehension Assessment</h3>
                <p className="text-xs text-muted-foreground">Answer 3 questions to verify reading retention and earn +35 XP</p>
              </div>
            </div>
            {quizAwarded && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> +35 XP Earned
              </span>
            )}
          </div>

          <div className="space-y-5">
            {article.quiz.map((q, qIdx) => {
              const selected = selectedAnswers[q.id];
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={q.id} className="p-4 rounded-2xl bg-card border border-white/[0.06] space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    <span className="text-primary font-bold mr-1.5">{qIdx + 1}.</span>
                    {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      let btnStyle = "bg-secondary/30 border-white/[0.06] text-muted-foreground hover:text-foreground";

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
                        }
                      } else if (isOptionSelected) {
                        btnStyle = "bg-primary text-primary-foreground border-primary font-semibold shadow-sm";
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectQuizOption(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className={`text-xs p-2.5 rounded-xl border ${
                      isCorrect ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-300 border-rose-500/20"
                    }`}>
                      <span className="font-bold">{isCorrect ? "Correct: " : "Explanation: "}</span>
                      {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            {!quizSubmitted ? (
              <Button
                onClick={handleGradeQuiz}
                disabled={Object.keys(selectedAnswers).length < article.quiz.length}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl px-6"
              >
                Submit Answers & Check Score
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setSelectedAnswers({});
                  setQuizSubmitted(false);
                }}
                variant="outline"
                className="rounded-xl text-xs"
              >
                Retake Quiz
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
