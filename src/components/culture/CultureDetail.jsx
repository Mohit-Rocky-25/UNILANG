import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lightbulb,
  MapPin,
  BookOpen,
  Sparkles,
  Users,
  Image as ImageIcon,
  ImageOff,
  Utensils,
  Shirt,
  Landmark,
  Sunset,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGalleryImages, GALLERY_CATEGORIES } from "@/lib/cultureImages";
import { getCultureExtended } from "@/data/culture/cultureExtendedData";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Clock, Award, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

const tabIcons = {
  origins: BookOpen,
  evolution: Sparkles,
  dialects: MapPin,
  funFacts: Lightbulb,
  timeline: Clock,
  etiquette: Users,
  quiz: Award,
};

const categoryIcons = {
  food: Utensils,
  clothing: Shirt,
  monuments: Landmark,
  scenes: Sunset,
};

export default function CultureDetail({ data, langCode, activeTab, tabs, onTabChange, onBack, onXPGain }) {
  const extended = getCultureExtended(langCode);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [heroError, setHeroError] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState("all");
  const [imgErrors, setImgErrors] = useState({});
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const allGalleryImages = getGalleryImages(langCode);
  const filteredImages = galleryCategory === "all"
    ? allGalleryImages
    : allGalleryImages.filter(img => img.category === galleryCategory);

  const handleImgError = (idx) => {
    setImgErrors(prev => ({ ...prev, [idx]: true }));
  };

  useEffect(() => {
    if (activeModalIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setActiveModalIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveModalIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveModalIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, filteredImages.length]);

  const renderContent = () => {
    switch (activeTab) {
      case "origins":
        return <p className="text-foreground/90 leading-relaxed text-[15px]">{data.origins}</p>;
      case "evolution":
        return <p className="text-foreground/90 leading-relaxed text-[15px]">{data.evolution}</p>;
      case "dialects":
        return (
          <div className="grid grid-cols-2 gap-3">
            {data.dialects?.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 400 }}
                className="glass-card p-4"
              >
                <MapPin className="w-4 h-4 text-purple-400 mb-2" />
                <p className="font-medium text-sm">{d}</p>
              </motion.div>
            ))}
          </div>
        );
      case "funFacts":
        return (
          <div className="space-y-3">
            {data.funFacts?.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
                className="flex gap-3 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl p-4 border border-amber-500/10"
              >
                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/90">{fact}</p>
              </motion.div>
            ))}
          </div>
        );
      case "timeline":
        return (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground mb-4">
              5 monumental milestones that shaped the history, grammar, and literature of {data.name}.
            </p>
            <div className="relative border-l-2 border-primary/30 ml-3 space-y-6 pl-6">
              {extended.timeline?.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="glass-card p-4 rounded-2xl border border-white/[0.06] hover:border-primary/40 transition-all">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/20 text-primary">
                      {item.year}
                    </span>
                    <h4 className="text-base font-heading font-bold text-foreground mt-1.5">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case "etiquette":
        return (
          <div className="space-y-6">
            <p className="text-foreground/90 leading-relaxed text-[15px] glass-card p-4 rounded-2xl border border-white/[0.06]">
              {data.etiquette}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 5 Dos */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-heading font-bold text-emerald-400 uppercase tracking-wider">
                    5 Cultural Dos
                  </h4>
                </div>
                {extended.etiquette?.dos?.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                    <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {item.rule}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed pl-3">{item.context}</p>
                  </div>
                ))}
              </div>

              {/* 5 Don'ts */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <h4 className="text-sm font-heading font-bold text-rose-400 uppercase tracking-wider">
                    5 Cultural Don'ts
                  </h4>
                </div>
                {extended.etiquette?.donts?.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-1">
                    <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                      {item.rule}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed pl-3">{item.context}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "quiz":
        const quiz = extended.quiz;
        const allAnswered = Object.keys(quizAnswers).length >= quiz.questions.length;

        const handleGradeCulturalQuiz = () => {
          setQuizSubmitted(true);
          let correct = 0;
          quiz.questions.forEach(q => {
            if (quizAnswers[q.id] === q.correctIndex) correct++;
          });

          if (correct >= 4 && !badgeUnlocked) {
            onXPGain?.(quiz.xpReward, `culture_quiz_${langCode}`);
            setBadgeUnlocked(true);
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
            toast.success(`Badge Unlocked: ${quiz.badgeTitle}! +${quiz.xpReward} Culture XP!`);
          } else {
            toast.info(`You scored ${correct} of ${quiz.questions.length} correct.`);
          }
        };

        return (
          <div className="space-y-6">
            <div className="glass-card-elevated p-4 rounded-2xl border border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{quiz.badgeIcon}</span>
                <div>
                  <h4 className="text-sm font-heading font-bold text-foreground">
                    Regional Mastery Assessment
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Score 80%+ to unlock the "{quiz.badgeTitle}" badge and earn +{quiz.xpReward} XP
                  </p>
                </div>
              </div>
              {badgeUnlocked && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Badge Earned
                </span>
              )}
            </div>

            <div className="space-y-4">
              {quiz.questions.map((q, idx) => {
                const selected = quizAnswers[q.id];
                const isCorrect = selected === q.correctIndex;

                return (
                  <div key={q.id} className="p-4 rounded-2xl glass-card border border-white/[0.06] space-y-3">
                    <p className="text-sm font-semibold text-foreground">
                      <span className="text-primary font-bold mr-1.5">{idx + 1}.</span>
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isOptionSelected = selected === optIdx;
                        let btnClass = "bg-secondary/30 border-white/[0.06] text-muted-foreground hover:text-foreground";

                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold";
                          } else if (isOptionSelected && !isCorrect) {
                            btnClass = "bg-rose-500/20 border-rose-500 text-rose-300";
                          }
                        } else if (isOptionSelected) {
                          btnClass = "bg-primary text-primary-foreground border-primary font-semibold shadow-sm";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              if (!quizSubmitted) {
                                setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                              }
                            }}
                            className={`p-3 rounded-xl border text-xs text-left transition-all ${btnClass}`}
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
                  onClick={handleGradeCulturalQuiz}
                  disabled={!allAnswered}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl px-6"
                >
                  Submit Culture Quiz
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="rounded-xl text-xs"
                >
                  Retake Quiz
                </Button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 py-6"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 rounded-xl text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Hero Image */}
      {data.image && !heroError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden mb-6 h-56 sm:h-72 group"
        >
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setHeroError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <span className="text-5xl drop-shadow-lg">{data.flag}</span>
            <div>
              <h2 className="text-3xl font-heading font-bold text-white drop-shadow-lg">{data.name}</h2>
              <p className="text-white/70 text-sm">Language & Culture</p>
            </div>
          </div>
        </motion.div>
      )}

      {(!data.image || heroError) && (
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{data.flag}</span>
          <div>
            <h2 className="text-3xl font-heading font-bold">{data.name}</h2>
            <p className="text-muted-foreground">Language & Culture</p>
          </div>
        </div>
      )}

      {/* Sub-tabs */}
      <div
        className="flex gap-2 overflow-x-auto pb-4 mb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map(tab => {
          const Icon = tabIcons[tab.id];
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Categorized Image Gallery */}
      {filteredImages.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Cultural Gallery</h3>
            </div>
            <span className="text-xs text-muted-foreground">Click photo to view high-res</span>
          </div>

          {/* Category Filter */}
          <div
            className="flex gap-2 overflow-x-auto pb-3 mb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {GALLERY_CATEGORIES.map(cat => {
              const Icon = categoryIcons[cat.id];
              const isActive = galleryCategory === cat.id;
              const count = cat.id === "all"
                ? allGalleryImages.length
                : allGalleryImages.filter(img => img.category === cat.id).length;
              if (cat.id !== "all" && count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setGalleryCategory(cat.id);
                    setActiveModalIndex(null);
                  }}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  {cat.label}
                  <span className="opacity-60">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {filteredImages.map((img, i) => (
              <motion.div
                key={`${galleryCategory}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 400 }}
                onClick={() => !imgErrors[i] && setActiveModalIndex(i)}
                className="relative rounded-xl overflow-hidden shadow-lg shadow-black/20 aspect-[4/3] group cursor-pointer border border-white/5 hover:border-primary/40 transition-all duration-300"
              >
                {!imgErrors[i] ? (
                  <>
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={() => handleImgError(i)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Expand icon on hover */}
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    {/* Image Caption & Category */}
                    <div className="absolute bottom-0 left-0 right-0 p-2.5">
                      <p className="text-white text-xs font-medium leading-tight line-clamp-1">{img.caption}</p>
                      <span className="text-white/60 text-[10px] uppercase tracking-wide">{img.category}</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <ImageOff className="w-6 h-6 text-white/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox High-Resolution Modal */}
      <AnimatePresence>
        {activeModalIndex !== null && filteredImages[activeModalIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setActiveModalIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center bg-card/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="w-full flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/40">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{data.flag}</span>
                  <span className="text-sm font-semibold text-white">{data.name} Culture</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 uppercase tracking-wider font-semibold">
                    {filteredImages[activeModalIndex].category}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalIndex(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image & Navigation */}
              <div className="relative w-full flex items-center justify-center bg-black/70 p-2 sm:p-4 max-h-[65vh] overflow-hidden">
                <img
                  src={filteredImages[activeModalIndex].url}
                  alt={filteredImages[activeModalIndex].caption}
                  className="max-h-[60vh] max-w-full w-auto object-contain rounded-xl shadow-lg"
                />

                {filteredImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1));
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0));
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all backdrop-blur-sm border border-white/10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className="w-full flex items-center justify-between px-5 py-3 border-t border-white/10 bg-black/40">
                <p className="text-sm font-medium text-white/95">
                  {filteredImages[activeModalIndex].caption}
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {activeModalIndex + 1} of {filteredImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
