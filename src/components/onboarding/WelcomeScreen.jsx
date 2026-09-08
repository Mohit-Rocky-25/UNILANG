import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WelcomeScreen({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Refined dark background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/3 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
        className="relative z-10 flex flex-col items-center gap-8 px-6 text-center"
      >
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary via-purple-600 to-amber-500 flex items-center justify-center shadow-2xl shadow-primary/20">
            <Globe className="w-14 h-14 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-3 rounded-3xl border border-white/[0.06]"
          />
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
            UniLang
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
            Speak the world. Understand every culture.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onNext}
            size="lg"
            className="bg-white text-black hover:bg-white/90 px-10 py-6 text-lg rounded-2xl shadow-xl shadow-white/5 transition-all hover:shadow-2xl hover:shadow-white/10 hover:scale-105 font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started
          </Button>
        </motion.div>

        <div className="flex gap-2 mt-4">
          {["🇪🇸", "🇫🇷", "🇯🇵", "🇩🇪", "🇮🇳", "🇰🇷", "🇨🇳", "🇮🇹"].map((flag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08, type: "spring", stiffness: 300 }}
              className="text-2xl"
            >
              {flag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}