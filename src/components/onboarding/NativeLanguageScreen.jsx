import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/languageData";

export default function NativeLanguageScreen({ selected, onSelect, onNext, onBack }) {
  const [search, setSearch] = useState("");
  const filtered = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-24 px-6"
    >
      <h2 className="text-3xl font-heading font-bold text-center mb-2 tracking-tight">
        What's your native language?
      </h2>
      <p className="text-muted-foreground mb-8">Choose the language you speak best</p>

      <div className="relative w-full max-w-md mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search languages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 bg-secondary/40 border-white/[0.06] h-12 rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:border-primary/30"
        />
      </div>

      <div className="w-full max-w-md space-y-2 overflow-y-auto max-h-[50vh] pr-1"
           style={{ scrollbarWidth: 'thin' }}>
        {filtered.map(lang => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(lang.code)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
              selected === lang.code
                ? "bg-primary/10 border border-primary/30 shadow-sm shadow-primary/5"
                : "bg-secondary/20 border border-transparent hover:bg-secondary/40"
            }`}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="font-medium text-[15px]">{lang.name}</span>
            {selected === lang.code && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="ml-auto w-5 h-5 rounded-full bg-primary flex items-center justify-center"
              >
                <span className="text-white text-[10px]">✓</span>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="fixed bottom-8 flex gap-3">
        <Button variant="outline" onClick={onBack} className="rounded-xl px-6 border-white/[0.08]">Back</Button>
        <Button
          onClick={onNext}
          disabled={!selected}
          className="bg-white text-black hover:bg-white/90 rounded-xl px-8 disabled:opacity-40 font-semibold shadow-lg"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}