import { Flame, Zap, Globe, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({ xp, streak, userProfile }) {
  const navigate = useNavigate();
  const userName = userProfile?.name || "Demo User";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("unilang_profile");
    localStorage.removeItem("unilang_temp_user");
    navigate("/");
  };

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
        
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/10">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs sm:text-sm font-semibold text-amber-400">{streak || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/10">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">{xp || 0} XP</span>
          </div>

          {/* User Profile & Quick Logout / Switch Pill */}
          <div className="flex items-center gap-1.5 pl-1.5 sm:pl-2 border-l border-white/10">
            <div className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-xl bg-secondary/50 border border-white/5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                {userInitial}
              </div>
              <span className="text-xs font-medium text-white/90 hidden md:inline max-w-[100px] truncate">
                {userName}
              </span>
            </div>

            <button
              onClick={handleLogout}
              title="Logout / Switch User"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
