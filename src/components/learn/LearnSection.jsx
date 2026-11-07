import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Flame, Award, Compass, Sparkles, ChevronRight, CheckCircle2, Lock, BookOpen } from "lucide-react";
import { LANGUAGES } from "@/lib/languageData";
import { CURRICULA, getAllLessonsForLang } from "@/data/curriculum";
import QuizModal from "./QuizModal";
import PlacementTestModal from "./PlacementTestModal";

export default function LearnSection({ userProfile, progress = [], onXPGain }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const [showPlacementModal, setShowPlacementModal] = useState(false);
  const targetLangs = userProfile?.target_languages || userProfile?.targetLanguages || ["es"];
  const [selectedLang, setSelectedLang] = useState(targetLangs[0] || "es");

  const handleStartLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleComplete = (lesson, score, total) => {
    onXPGain(lesson.xp || lesson.xpReward || 30, lesson.id);
  };

  const currentCurriculum = CURRICULA[selectedLang] || CURRICULA.es;
  const allCurriculumLessons = getAllLessonsForLang(selectedLang);

  const completedLessonIds = new Set(
    progress.filter(p => p.status === "completed").map(p => p.lesson_id)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-12"
    >
      {/* Top Stats Bar */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <div className="glass-card p-4 text-center">
            <Zap className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <p className="text-2xl font-bold tracking-tight">{userProfile?.xp_points || 0}</p>
            <p className="text-[11px] text-muted-foreground">Total XP</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
            <p className="text-2xl font-bold tracking-tight">{userProfile?.streak_count || 0}</p>
            <p className="text-[11px] text-muted-foreground">Day Streak</p>
          </div>
          <div className="glass-card p-4 text-center">
            <Award className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
            <p className="text-2xl font-bold tracking-tight uppercase">{userProfile?.level || "A1"}</p>
            <p className="text-[11px] text-muted-foreground">CEFR Level</p>
          </div>
        </div>
      </div>

      {/* Adaptive Placement Assessment Banner */}
      <div className="px-4 mb-6">
        <div className="glass-card-elevated p-5 relative overflow-hidden group border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/20 to-primary/5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-sm">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-foreground flex items-center gap-2">
                  <span>Take Adaptive Placement Test</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                    15 Questions
                  </span>
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Calibrate your starting CEFR baseline (A1–B2) and unlock advanced paths.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPlacementModal(true)}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-md shadow-primary/20"
            >
              <span>Assess</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Language Selector Pills */}
      <div className="px-4 mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
          Target Language Curriculum
        </h3>
        <div className="flex flex-wrap gap-2">
          {['es', 'fr', 'de', 'it', 'ja'].map(code => {
            const lang = LANGUAGES.find(l => l.code === code);
            if (!lang) return null;
            const isSelected = selectedLang === code;
            return (
              <button
                key={code}
                onClick={() => setSelectedLang(code)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-105"
                    : "bg-secondary/30 border-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CEFR Curriculum Progression Graph */}
      <div className="px-4 space-y-6">
        {['A1', 'A2'].map(levelKey => {
          const levelData = currentCurriculum.levels?.[levelKey];
          if (!levelData) return null;

          return (
            <div key={levelKey} className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-black">
                      {levelKey}
                    </span>
                    <span>{levelData.title}</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {levelData.description}
                  </p>
                </div>
              </div>

              {/* Modules & Lessons */}
              <div className="space-y-4">
                {levelData.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="glass-card p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-semibold text-foreground font-heading">
                          {mod.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/[0.06] text-muted-foreground">
                        {mod.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mod.lessons.map((lesson, lIdx) => {
                        const isCompleted = completedLessonIds.has(lesson.id);
                        // Node graph dependency: first lesson of A1 unlocked, others require completion
                        const isUnlocked = mod.unlockedByDefault || lIdx === 0 || completedLessonIds.has(mod.lessons[lIdx - 1]?.id);

                        return (
                          <div
                            key={lesson.id}
                            className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                              isCompleted
                                ? "bg-emerald-500/5 border-emerald-500/20"
                                : isUnlocked
                                ? "bg-secondary/20 border-white/[0.08] hover:border-primary/40 hover:bg-secondary/40"
                                : "bg-secondary/10 border-white/[0.03] opacity-60"
                            }`}
                          >
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-semibold text-sm text-foreground">
                                  {lesson.title}
                                </h5>
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : !isUnlocked ? (
                                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                                ) : (
                                  <span className="text-xs font-bold text-primary">+{lesson.xp} XP</span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {lesson.summary}
                              </p>
                            </div>

                            <button
                              disabled={!isUnlocked}
                              onClick={() => handleStartLesson(lesson)}
                              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                                isCompleted
                                  ? "bg-secondary/40 text-foreground hover:bg-secondary/60"
                                  : isUnlocked
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                                  : "bg-secondary/20 text-muted-foreground cursor-not-allowed"
                              }`}
                            >
                              <span>{isCompleted ? "Practice Again" : isUnlocked ? "Start Lesson" : "Locked"}</span>
                              {isUnlocked && <ChevronRight className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz Modal */}
      <QuizModal
        open={!!activeLesson}
        onClose={() => setActiveLesson(null)}
        lesson={activeLesson || {}}
        onComplete={handleComplete}
        userProfile={userProfile}
      />

      {/* Placement Test Modal */}
      <PlacementTestModal
        open={showPlacementModal}
        onClose={() => setShowPlacementModal(false)}
        targetLang={selectedLang}
        onLevelAssigned={(lvl) => {
          setShowPlacementModal(false);
        }}
      />
    </motion.div>
  );
}
