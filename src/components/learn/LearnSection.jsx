import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Flame, Award } from "lucide-react";
import { LESSONS_DATA, LANGUAGES } from "@/lib/languageData";
import LessonCarousel from "./LessonCarousel";
import QuizModal from "./QuizModal";

export default function LearnSection({ userProfile, progress, onXPGain }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const targetLangs = userProfile?.target_languages || userProfile?.targetLanguages || [];

  const handleStartLesson = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleComplete = (lesson, score, total) => {
    onXPGain(lesson.xp || 50, lesson.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-8"
    >
      {/* Stats Bar */}
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
            <p className="text-2xl font-bold tracking-tight capitalize">{userProfile?.level || "Beginner"}</p>
            <p className="text-[11px] text-muted-foreground">Level</p>
          </div>
        </div>
      </div>

      {/* Learning Languages Summary */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Your Languages</h3>
        <div className="flex flex-wrap gap-2">
          {targetLangs.map(langCode => {
            const lang = LANGUAGES.find(l => l.code === langCode);
            if (!lang) return null;
            const hasLessons = !!LESSONS_DATA[langCode];
            return (
              <div key={langCode} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border ${
                hasLessons ? "bg-primary/10 border-primary/20 text-primary" : "bg-secondary/30 border-white/[0.04] text-muted-foreground"
              }`}>
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
                {hasLessons && <span className="w-1 h-1 rounded-full bg-primary ml-0.5" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Language Carousels */}
      {targetLangs.map(langCode => {
        const lang = LANGUAGES.find(l => l.code === langCode);
        const lessons = LESSONS_DATA[langCode] || [];
        if (!lang || lessons.length === 0) return null;
        return (
          <LessonCarousel
            key={langCode}
            language={lang}
            lessons={lessons}
            progress={progress.filter(p => p.language === langCode)}
            onStartLesson={handleStartLesson}
          />
        );
      })}

      {/* Show languages without lessons */}
      {targetLangs
        .filter(code => !LESSONS_DATA[code])
        .map(code => {
          const lang = LANGUAGES.find(l => l.code === code);
          if (!lang) return null;
          return (
            <div key={code} className="px-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lang.flag}</span>
                <h3 className="text-xl font-heading font-bold tracking-tight">{lang.name}</h3>
              </div>
              <div className="glass-card p-8 text-center">
                <p className="text-muted-foreground">Lessons coming soon!</p>
              </div>
            </div>
          );
        })}

      <QuizModal
        open={!!activeLesson}
        onClose={() => setActiveLesson(null)}
        lesson={activeLesson || {}}
        onComplete={handleComplete}
        userProfile={userProfile}
      />
    </motion.div>
  );
}