import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  Copy,
  Bookmark,
  Loader2,
  Sparkles,
  Volume2,
  BookMarked,
  MessageSquare,
  Check,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES } from "@/lib/languageData";
import { toast } from "sonner";
import api from "@/api/client";

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

export default function TranslateSection({ onBookmark, onExplainGrammar, onSendToConversation }) {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [mode, setMode] = useState("idiomatic");
  const [formality, setFormality] = useState("informal"); // 'informal' | 'formal'
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const supportsFormality = ["es", "de", "fr", "it", "ja", "ru"].includes(targetLang);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setIsSaved(false);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setIsSaved(false);
    try {
      // First attempt server translation adapter
      try {
        const serverRes = await api.translate(sourceText, sourceLang, targetLang, formality);
        if (serverRes?.translatedText) {
          setTranslatedText(serverRes.translatedText);
          setLoading(false);
          return;
        }
      } catch {
        // Fall back to direct Lingva
      }

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

  const playAudio = () => {
    if ("speechSynthesis" in window && translatedText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLang === "es" ? "es-ES" : targetLang === "it" ? "it-IT" : targetLang === "fr" ? "fr-FR" : targetLang === "de" ? "de-DE" : targetLang === "ja" ? "ja-JP" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleBookmark = () => {
    onBookmark?.({
      source_text: sourceText,
      translated_text: translatedText,
      source_language: sourceLang,
      target_language: targetLang,
      formality,
      cultural_notes: ""
    });

    // Also persist directly to Spaced Repetition (SRS) vocabulary deck
    api.addVocabulary({
      langCode: targetLang,
      term: translatedText,
      meaning: sourceText,
      deck: "Saved Translations"
    }).catch(() => {});

    setIsSaved(true);
    toast.success("Saved to SRS Vocabulary Deck!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-2xl mx-auto"
    >
      {/* Mode & Formality Toggles */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <div className="flex-1 flex gap-1 bg-secondary/30 p-1 rounded-xl border border-white/[0.04]">
          {[
            { id: "literal", label: "Literal" },
            { id: "idiomatic", label: "Cultural / Idiomatic" }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
                mode === m.id
                  ? "bg-white text-black shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Formality toggle when supported */}
        {supportsFormality && (
          <div className="flex gap-1 bg-secondary/30 p-1 rounded-xl border border-white/[0.04]">
            <button
              onClick={() => setFormality("informal")}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                formality === "informal"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Informal (tú/du)
            </button>
            <button
              onClick={() => setFormality("formal")}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                formality === "formal"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Formal (Ud./Sie)
            </button>
          </div>
        )}
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
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={playAudio}
                className="rounded-xl text-primary hover:text-primary/80"
                title="Listen"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="rounded-xl text-muted-foreground hover:text-foreground"
                title="Copy text"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className={`rounded-xl ${isSaved ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 hover:text-amber-300"}`}
                title="Save to SRS Vocabulary Deck"
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
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

        {/* 1-Tap Cross-Module Actions */}
        {translatedText && !loading && (
          <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-white/[0.04]">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onExplainGrammar?.(translatedText)}
              className="rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-secondary/20 border-white/[0.08] hover:bg-secondary/40"
            >
              <BookMarked className="w-3.5 h-3.5 text-primary" />
              <span>Explain Grammar</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onSendToConversation?.(translatedText)}
              className="rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-secondary/20 border-white/[0.08] hover:bg-secondary/40"
            >
              <MessageSquare className="w-3.5 h-3.5 text-primary" />
              <span>Send to Conversation Partner</span>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
