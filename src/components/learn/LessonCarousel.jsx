import { motion } from "framer-motion";
import { Lock, CheckCircle2, Play } from "lucide-react";

const levelColors = {
  beginner: { bg: "from-emerald-500/10 to-green-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  intermediate: { bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  advanced: { bg: "from-purple-500/10 to-pink-500/10", border: "border-purple-500/20", text: "text-purple-400" },
  fluent: { bg: "from-amber-500/10 to-orange-500/10", border: "border-amber-500/20", text: "text-amber-400" },
};

const statusConfig = {
  completed: { icon: CheckCircle2, color: "text-green-500", label: "Completed" },
  in_progress: { icon: Play, color: "text-blue-400", label: "Continue" },
  available: { icon: Play, color: "text-foreground", label: "Start" },
  locked: { icon: Lock, color: "text-muted-foreground", label: "Locked" },
};

export default function LessonCarousel({ language, lessons, progress, onStartLesson }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4 px-4">
        <span className="text-2xl">{language.flag}</span>
        <h3 className="text-xl font-heading font-bold tracking-tight">{language.name}</h3>
        <span className="text-xs text-muted-foreground ml-auto">{lessons.length} lessons</span>
      </div>
      <div
        className="flex gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {lessons.map((lesson, i) => {
          const prog = progress?.find(p => p.lesson_id === lesson.id);
          const status = prog?.status || (i === 0 ? "available" : "locked");
          const { icon: StatusIcon, color, label } = statusConfig[status];
          const colors = levelColors[lesson.level];
          const isLocked = status === "locked";

          return (
            <motion.button
              key={lesson.id}
              whileHover={!isLocked ? { scale: 1.04, y: -4 } : {}}
              whileTap={!isLocked ? { scale: 0.96 } : {}}
              onClick={() => !isLocked && onStartLesson(lesson)}
              className={`snap-start flex-shrink-0 w-44 rounded-2xl p-4 border bg-gradient-to-br ${colors.bg} ${colors.border} transition-all ${
                isLocked ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:shadow-xl hover:shadow-black/20"
              }`}
            >
              <div className="text-2xl mb-3">{lesson.emoji}</div>
              <h4 className="font-semibold text-sm mb-1 text-left leading-snug">{lesson.title}</h4>
              <p className={`text-[11px] capitalize ${colors.text} mb-3 font-medium`}>{lesson.level}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">+{lesson.xp} XP</span>
                <StatusIcon className={`w-4 h-4 ${color}`} />
              </div>
              {status === "in_progress" && prog?.score > 0 && (
                <div className="mt-2 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${prog.score}%` }} />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}