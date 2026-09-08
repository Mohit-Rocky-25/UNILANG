import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { INTERESTS } from "@/lib/languageData";

export default function InterestsScreen({ selected, onToggle, onNext, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-24 px-6"
    >
      <h2 className="text-3xl font-heading font-bold text-center mb-2 tracking-tight">
        Pick your interests
      </h2>
      <p className="text-muted-foreground mb-8">We'll personalize your learning journey</p>

      <div className="w-full max-w-md flex flex-wrap justify-center gap-3">
        {INTERESTS.map((interest, i) => {
          const isSelected = selected.includes(interest.id);
          return (
            <motion.button
              key={interest.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 400 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggle(interest.id)}
              className={`px-6 py-3 rounded-2xl font-medium text-base transition-all duration-300 ${
                isSelected
                  ? `bg-gradient-to-r ${interest.color} text-white shadow-lg`
                  : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground border border-white/[0.04]"
              }`}
            >
              {interest.label}
            </motion.button>
          );
        })}
      </div>

      <div className="fixed bottom-8 flex gap-3">
        <Button variant="outline" onClick={onBack} className="rounded-xl px-6 border-white/[0.08]">
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={selected.length === 0}
          className="bg-white text-black hover:bg-white/90 rounded-xl px-8 disabled:opacity-40 font-semibold shadow-lg"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}