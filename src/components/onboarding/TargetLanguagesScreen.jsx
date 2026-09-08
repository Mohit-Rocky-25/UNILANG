import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/languageData";

export default function TargetLanguagesScreen({ nativeLanguage, selected, onToggle, onNext, onBack }) {
  const available = LANGUAGES.filter(l => l.code !== nativeLanguage);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-24 px-6"
    >
      <h2 className="text-3xl font-heading font-bold text-center mb-2 tracking-tight">
        What do you want to learn?
      </h2>
      <p className="text-muted-foreground mb-8">Select one or more languages</p>

      <div className="w-full max-w-lg grid grid-cols-2 sm:grid-cols-3 gap-3">
        {available.map((lang, i) => {
          const isSelected = selected.includes(lang.code);
          return (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 400 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(lang.code)}
              className={`flex flex-col items-center gap-2 p-5 rounded-2xl transition-all duration-300 ${
                isSelected
                  ? "bg-primary/10 border border-primary/30 shadow-sm shadow-primary/5"
                  : "bg-secondary/20 border border-transparent hover:bg-secondary/40"
              }`}
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="font-medium text-xs">{lang.name}</span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <span className="text-white text-[10px]">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="fixed bottom-8 flex gap-3">
        <Button variant="outline" onClick={onBack} className="rounded-xl px-6 border-white/[0.08]">Back</Button>
        <Button
          onClick={onNext}
          disabled={selected.length === 0}
          className="bg-white text-black hover:bg-white/90 rounded-xl px-8 disabled:opacity-40 font-semibold shadow-lg"
        >
          Continue ({selected.length} selected)
        </Button>
      </div>
    </motion.div>
  );
}