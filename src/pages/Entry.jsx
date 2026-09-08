import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Sparkles, User, Mail } from "lucide-react";

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

  const handleSkip = () => {
    localStorage.setItem("unilang_temp_user", JSON.stringify({
      name: "Learner",
      email: "learner@unilang.app",
      xp_points: 0,
      streak_count: 0,
      level: "beginner",
      onboarding_complete: false,
    }));
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden px-4">
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
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/20"
          >
            <Globe className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            UniLang
          </h1>
          <p className="text-muted-foreground mt-2">Speak the world. Understand every culture.</p>
        </div>

        <form onSubmit={handleStart} className="glass-card p-6 space-y-4">
          <h2 className="font-heading font-bold text-lg text-center mb-2">Welcome! Let's get started</h2>
          
          <div className="space-y-3">
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="pl-10 bg-secondary/30 border-white/[0.06] h-11 rounded-xl"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Your email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-10 bg-secondary/30 border-white/[0.06] h-11 rounded-xl"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-white text-black hover:bg-white/90 rounded-xl py-6 text-base font-semibold shadow-lg transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Start Learning
          </Button>

          <button
            type="button"
            onClick={handleSkip}
            className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            Skip for now
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Your information is only stored on your device for personalization.
        </p>
      </motion.div>
    </div>
  );
}