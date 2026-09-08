const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Copy, Bookmark, Loader2, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LANGUAGES } from "@/lib/languageData";

import { toast } from "sonner";

export default function TranslateSection({ onBookmark }) {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [mode, setMode] = useState("idiomatic");
  const [loading, setLoading] = useState(false);
  const [culturalNotes, setCulturalNotes] = useState(null);
  const [showNotes, setShowNotes] = useState(false);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    setCulturalNotes(null);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setLoading(true);
    setCulturalNotes(null);
    const sLang = LANGUAGES.find(l => l.code === sourceLang)?.name || sourceLang;
    const tLang = LANGUAGES.find(l => l.code === targetLang)?.name || targetLang;

    const res = await db.integrations.Core.InvokeLLM({
      prompt: `You are a professional ${sLang}-to-${tLang} translator. Translate the following text EXACTLY with ZERO added words, no conversational filler, no "here is the translation" or similar phrases.

CRITICAL RULES:
- NEVER add or remove meaning. Translate precisely.
- NEVER include meta-commentary like "This means..." or "Literally..."
- NEVER add your own opinions or interpretations.
- If ${mode === "literal" ? "translate word-for-word preserving exact structure" : "use natural, culturally appropriate expressions"}.
- Output ONLY the translation text.

Text to translate: "${sourceText}"

After translation, also provide structured cultural notes (separate from the translation):
- Any connotation or meaning shifts between the two cultures
- Regional variants that exist for this phrase
- Cultural context that affects understanding`,
      response_json_schema: {
        type: "object",
        properties: {
          translation: { type: "string" },
          cultural_notes: { type: "string" },
          connotation_shifts: { type: "string" },
          regional_variants: {
            type: "array",
            items: {
              type: "object",
              properties: {
                region: { type: "string" },
                variant: { type: "string" },
                note: { type: "string" }
              }
            }
          }
        }
      }
    });

    setTranslatedText(res.translation);
    setCulturalNotes(res);
    setLoading(false);
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
      cultural_notes: culturalNotes?.cultural_notes || ""
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

      {/* Cultural Notes */}
      <AnimatePresence>
        {culturalNotes && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/5 to-amber-500/5 border border-purple-500/10 rounded-2xl mb-2"
            >
              <span className="font-semibold text-sm">Cultural Notes & Context</span>
              {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showNotes && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-5 space-y-4"
              >
                {culturalNotes.cultural_notes && (
                  <div>
                    <h4 className="text-sm font-semibold text-purple-400 mb-1">Cultural Context</h4>
                    <p className="text-sm text-muted-foreground">{culturalNotes.cultural_notes}</p>
                  </div>
                )}
                {culturalNotes.connotation_shifts && (
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-1">Connotation Shifts</h4>
                    <p className="text-sm text-muted-foreground">{culturalNotes.connotation_shifts}</p>
                  </div>
                )}
                {culturalNotes.regional_variants?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-amber-400 mb-2">Regional Variants</h4>
                    <div className="space-y-2">
                      {culturalNotes.regional_variants.map((v, i) => (
                        <div key={i} className="bg-secondary/20 rounded-xl p-3 border border-white/[0.04]">
                          <p className="text-sm font-medium">{v.region}: {v.variant}</p>
                          {v.note && <p className="text-xs text-muted-foreground mt-1">{v.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}