import { Flame, Zap, Globe } from "lucide-react";

export default function TopBar({ xp, streak }) {
  return (
    <div className="bg-background/80 backdrop-blur-2xl border-b border-white/[0.04] px-4 py-3 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
            <Globe className="w-[18px] h-[18px] text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            UniLang
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/10">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">{streak || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/10">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-semibold text-primary">{xp || 0} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}