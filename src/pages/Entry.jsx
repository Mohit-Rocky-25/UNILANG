import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Sparkles, User, Mail, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function EntryPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleStart = (e) => {
    e.preventDefault();
    const profile = {
      name: name || "Learner",
      email: email || "learner@unilang.app",
      xp_points: 0,
      streak_count: 0,
      level: "beginner",
      onboarding_complete: false,
    };
    localStorage.setItem("unilang_temp_user", JSON.stringify(profile));
    navigate("/onboarding");
  };

  const handleQuickDemo = () => {
    const demoProfile = {
      name: "Alex Morgan",
      email: "demo@unilang.app",
      native_language: "en",
      target_languages: ["es", "ja", "fr", "te", "hi"],
      interests: ["culture", "travel", "food", "business"],
      level: "intermediate",
      xp_points: 450,
      streak_count: 7,
      onboarding_complete: true,
      isDemoUser: true
    };
    localStorage.setItem("unilang_profile", JSON.stringify(demoProfile));
    navigate("/home");
  };

  const handleSkip = () => {
    const quickProfile = {
      name: "Learner",
      email: "learner@unilang.app",
      native_language: "en",
      target_languages: ["es", "ja", "fr", "te"],
      interests: ["culture", "travel", "food"],
      level: "beginner",
      xp_points: 50,
      streak_count: 1,
      onboarding_complete: true,
    };
    localStorage.setItem("unilang_profile", JSON.stringify(quickProfile));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4 py-8">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-primary/20"
          >
            <Globe className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            UniLang
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Speak the world. Understand every culture.</p>
        </div>

        <div className="glass-card p-6 space-y-4">
          {/* Quick Demo Access Header Card */}
          <div className="bg-primary/10 border border-primary/25 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Demo Account Details
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full font-semibold">
                No Login Required
              </span>
            </div>

            <div className="bg-black/40 rounded-xl p-3 text-xs space-y-1 border border-white/5 font-mono">
              <div className="flex justify-between items-center text-white/70">
                <span>Demo ID:</span>
                <span className="text-white font-semibold select-all">demo@unilang.app</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Password:</span>
                <span className="text-white font-semibold select-all">demo1234</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>User:</span>
                <span className="text-emerald-400 font-semibold">Alex Morgan (Active Polyglot)</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleQuickDemo}
              size="lg"
              className="w-full bg-gradient-to-r from-primary via-purple-600 to-indigo-600 hover:opacity-95 text-white font-semibold py-5 rounded-xl text-sm shadow-xl shadow-primary/30 transition-all hover:scale-[1.01]"
            >
              <Zap className="w-4 h-4 mr-2" />
              1-Click Demo Login (Direct Access)
            </Button>
          </div>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background/90 px-3 text-muted-foreground text-[10px] tracking-wider">or custom setup</span>
            </div>
          </div>

          <form onSubmit={handleStart} className="space-y-3">
            <div className="space-y-2.5">
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="pl-10 bg-secondary/30 border-white/[0.06] h-10 rounded-xl text-sm"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Your email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 bg-secondary/30 border-white/[0.06] h-10 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                type="submit"
                className="flex-1 bg-white text-black hover:bg-white/90 rounded-xl h-10 text-xs font-semibold shadow-md transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Custom Start
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="border-white/10 text-xs h-10 px-4 rounded-xl text-muted-foreground hover:text-white hover:bg-white/5"
              >
                Fast Pass
              </Button>
            </div>
          </form>

          <div className="pt-2 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              <span>Already have an account? Regular Login</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          All progress and culture discoveries are securely saved on your device.
        </p>
      </motion.div>
    </div>
  );
}
