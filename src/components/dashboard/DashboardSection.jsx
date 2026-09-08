import { motion } from "framer-motion";
import { Flame, Trophy, Target, TrendingUp, Award, Star, Calendar } from "lucide-react";
import { LANGUAGES } from "@/lib/languageData";

const LEVELS = [
  { name: "Beginner", min: 0, color: "from-slate-400 to-slate-500", icon: "🌱" },
  { name: "Elementary", min: 200, color: "from-green-400 to-emerald-500", icon: "🌿" },
  { name: "Intermediate", min: 500, color: "from-blue-400 to-cyan-500", icon: "⚡" },
  { name: "Advanced", min: 1000, color: "from-purple-400 to-violet-500", icon: "🔥" },
  { name: "Fluent", min: 2000, color: "from-amber-400 to-orange-500", icon: "👑" },
];

function getLevelInfo(xp) {
  let current = LEVELS[0];
  let next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || LEVELS[i];
    }
  }
  const progress = next === current ? 100 : Math.min(100, ((xp - current.min) / (next.min - current.min)) * 100);
  return { current, next, progress };
}

function StreakVisual({ streak }) {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const activeCount = Math.min(streak, 7);
  return (
    <div className="flex items-center gap-1.5">
      {days.map((day, i) => {
        const isActive = i < activeCount;
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
              isActive
                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-lg shadow-amber-500/20"
                : "bg-secondary/30 text-muted-foreground/40"
            }`}>
              {isActive ? <Flame className="w-4 h-4" /> : day}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sublabel, gradient, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, delay }}
      className="glass-card-elevated p-5 relative overflow-hidden group"
    >
      <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.07] rounded-full blur-2xl group-hover:opacity-[0.12] transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="text-3xl font-heading font-bold tracking-tight">{value}</p>
        <p className="text-sm font-medium text-foreground/80 mt-0.5">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>}
      </div>
    </motion.div>
  );
}

export default function DashboardSection({ userProfile, progress }) {
  const xp = userProfile?.xp_points || 0;
  const streak = userProfile?.streak_count || 0;
  const completedLessons = progress.filter(p => p.status === "completed").length;
  const { current, next, progress: levelProgress } = getLevelInfo(xp);
  const targetLangs = userProfile?.target_languages || userProfile?.targetLanguages || [];
  const badges = userProfile?.badges || [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-8"
    >
      {/* Hero Level Card */}
      <div className="px-4 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="glass-card-elevated p-6 relative overflow-hidden"
        >
          {/* Ambient glow */}
          <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${current.color} opacity-[0.08] rounded-full blur-3xl`} />
          <div className={`absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-br ${current.color} opacity-[0.05] rounded-full blur-3xl`} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Level</span>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/[0.06]">
                <span className="text-base">{current.icon}</span>
                <span className="text-xs font-semibold">{current.name}</span>
              </div>
            </div>

            <div className="flex items-end gap-2 mb-4">
              <motion.h2
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
                className="text-5xl font-heading font-bold tracking-tight"
              >
                {xp.toLocaleString()}
              </motion.h2>
              <span className="text-sm text-muted-foreground mb-2 font-medium">Total XP</span>
            </div>

            {/* Progress to next level */}
            {next !== current && (
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-muted-foreground">Progress to {next.name} {next.icon}</span>
                  <span className="text-xs font-semibold text-muted-foreground">{Math.round(levelProgress)}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-secondary/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                    className={`h-full bg-gradient-to-r ${current.color} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {(next.min - xp).toLocaleString()} XP to reach {next.name}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Stat Cards */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-3">
        <StatCard
          icon={Flame}
          label="Day Streak"
          value={streak}
          sublabel={streak === 0 ? "Start today!" : streak < 3 ? "Keep going!" : streak < 7 ? "On fire!" : "Unstoppable!"}
          gradient="from-amber-400 to-orange-500"
          delay={0.15}
        />
        <StatCard
          icon={Trophy}
          label="Lessons Done"
          value={completedLessons}
          sublabel={completedLessons === 0 ? "Begin your journey" : completedLessons < 5 ? "Building momentum" : "Great progress!"}
          gradient="from-emerald-400 to-teal-500"
          delay={0.2}
        />
      </div>

      {/* Weekly Streak Tracker */}
      <div className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.25 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold">Weekly Activity</span>
            </div>
            <span className="text-xs text-muted-foreground">{streak} day streak</span>
          </div>
          <div className="flex justify-center">
            <StreakVisual streak={streak} />
          </div>
        </motion.div>
      </div>

      {/* Languages Learning */}
      <div className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.3 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold">Learning</span>
          </div>
          <div className="space-y-2.5">
            {targetLangs.map((code, i) => {
              const lang = LANGUAGES.find(l => l.code === code);
              if (!lang) return null;
              const langLessons = progress.filter(p => p.language === code && p.status === "completed").length;
              return (
                <motion.div
                  key={code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 border border-white/[0.03]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lang.flag}</span>
                    <div>
                      <p className="text-sm font-medium">{lang.name}</p>
                      <p className="text-xs text-muted-foreground">{langLessons} lessons completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10">
                    <Star className="w-3 h-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">{langLessons}</span>
                  </div>
                </motion.div>
              );
            })}
            {targetLangs.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No languages selected yet.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Badges / Achievements */}
      <div className="px-4 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.35 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold">Achievements</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { id: "first_lesson", label: "First Steps", icon: "🎯", req: completedLessons >= 1 },
              { id: "streak_3", label: "3-Day Streak", icon: "🔥", req: streak >= 3 },
              { id: "streak_7", label: "Week Warrior", icon: "⚡", req: streak >= 7 },
              { id: "xp_500", label: "Rising Star", icon: "⭐", req: xp >= 500 },
            ].map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                  badge.req
                    ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20"
                    : "bg-secondary/20 border-white/[0.03] opacity-40"
                }`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-[10px] font-medium text-center leading-tight">{badge.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Motivational Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="px-4 pt-6 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <TrendingUp className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium">
            {streak > 0
              ? `You're on a ${streak}-day streak. Keep it alive!`
              : "Ready to start your learning journey today?"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}