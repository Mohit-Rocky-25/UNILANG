import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Target, BookOpen, Trophy } from "lucide-react";
import { LANGUAGES } from "@/lib/languageData";

export default function SummaryScreen({ data, onFinish }) {
  const nativeLang = LANGUAGES.find(l => l.code === data.nativeLanguage);
  const targetLangs = data.targetLanguages.map(c => LANGUAGES.find(l => l.code === c)).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-24 px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mb-6 shadow-lg shadow-green-500/20"
      >
        <Trophy className="w-10 h-10 text-white" />
      </motion.div>

      <h2 className="text-3xl font-heading font-bold text-center mb-2 tracking-tight">
        You're all set!
      </h2>
      <p className="text-muted-foreground mb-8 text-center">Here's your personalized learning plan</p>

      <div className="w-full max-w-md space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-sm">Native Language</span>
          </div>
          <p className="text-lg ml-13">{nativeLang?.flag} {nativeLang?.name}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 400 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <span className="font-semibold text-sm">Learning</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {targetLangs.map(lang => (
              <span key={lang.code} className="px-3 py-1.5 rounded-xl bg-secondary/50 border border-white/[0.04] text-sm font-medium">
                {lang.flag} {lang.name}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-semibold text-sm">Starting Level</span>
          </div>
          <p className="text-lg capitalize ml-13">{data.level} · Quiz Score: {data.quizScore}/5</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
        className="mt-10"
      >
        <Button
          onClick={onFinish}
          size="lg"
          className="bg-white text-black hover:bg-white/90 px-10 py-6 text-lg rounded-2xl shadow-xl shadow-white/5 hover:shadow-2xl hover:scale-105 transition-all font-semibold"
        >
          Enter UniLang
        </Button>
      </motion.div>
    </motion.div>
  );
}