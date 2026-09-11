import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Copy, Bookmark, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES } from "@/lib/languageData";
import { toast } from "sonner";

// Lingva Translate API — free, no API key required
const LINGVA_INSTANCES = [
  "https://lingva.ml",
  "https://lingva.thedaviddelta.com",
  "https://translate.plausibility.cloud",
];

async function translateWithLingva(source, target, text) {
  const encoded = encodeURIComponent(text);
  let lastError = null;

  for (const baseUrl of LINGVA_INSTANCES) {
    try {
      const res = await fetch(`${baseUrl}/api/v1/${source}/${target}/${encoded}`);
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status}`);
        continue;
      }
      const data = await res.json();
      if (data.translation) return data.translation;
      lastError = new Error("Empty translation response");
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("All translation instances failed");
}

export default function TranslateSection({ onBookmark }) {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [mode, setMode] = useState("idiomatic");
  const [loading, setLoading] = useState(false);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    try {
      const result = await translateWithLingva(sourceLang, targetLang, sourceText);
      setTranslatedText(result);
    } catch (err) {
      console.error("Translation error:", err);
      toast.error("Translation failed. Please try again.");
      setTranslatedText("");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    toast.success("Copied to clipboard!");
  };

  const handleBookmark = () => {
    onBookmark({
      source_text: sourceText,
      translated_text: translatedText,
      source_language: sourceLang,
      target_language: targetLang,
      cultural_notes: ""
    });
    toast.success("Saved to phrasebook!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-2xl mx-auto"
    >
      {/* Mode Toggle */}
      <div className="flex gap-1.5 mb-6 bg-secondary/30 p-1 rounded-xl border border-white/[0.04]">
        {[
          { id: "literal", label: "Literal" },
          { id: "idiomatic", label: "Cultural / Idiomatic" }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              mode === m.id
                ? "bg-white text-black shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Source */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Select value={sourceLang} onValueChange={setSourceLang}>
            <SelectTrigger className="w-40 bg-secondary/30 border-white/[0.06] rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(l => (
                <SelectItem key={l.code} value={l.code}>{l.flag} {l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Textarea
          value={sourceText}
          onChange={e => setSourceText(e.target.value)}
          placeholder="Enter text to translate..."
          className="bg-secondary/20 border-white/[0.06] rounded-2xl min-h-[120px] text-[15px] resize-none placeholder:text-muted-foreground/50 focus:border-primary/30"
        />
      </div>

      {/* Swap & Translate */}
      <div className="flex items-center justify-center gap-4 my-4">
        <motion.button
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={handleSwap}
          className="w-10 h-10 rounded-full bg-secondary/40 border border-white/[0.06] flex items-center justify-center hover:bg-secondary/60 transition-colors"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </motion.button>
        <Button
          onClick={handleTranslate}
          disabled={loading || !sourceText.trim()}
          className="bg-white text-black hover:bg-white/90 rounded-xl px-8 shadow-sm disabled:opacity-40 font-medium transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Translate
        </Button>
      </div>

      {/* Target */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <Select value={targetLang} onValueChange={setTargetLang}>
            <SelectTrigger className="w-40 bg-secondary/30 border-white/[0.06] rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(l => (
                <SelectItem key={l.code} value={l.code}>{l.flag} {l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {translatedText && (
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={handleCopy} className="rounded-xl text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleBookmark} className="rounded-xl text-amber-400 hover:text-amber-300">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="glass-card min-h-[120px] p-4 text-[15px] leading-relaxed">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Translating...
            </div>
          ) : (
            translatedText || <span className="text-muted-foreground/50">Translation will appear here...</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}