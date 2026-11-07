import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Search,
  Tag,
  Download,
  Printer,
  FileSpreadsheet,
  Filter,
  Plus,
  Trash2,
  Volume2,
  Calendar,
  Layers,
  Sparkles,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/client";
import { toast } from "sonner";

export default function LibrarySection({ userProfile }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedDeck, setSelectedDeck] = useState("all");
  const [newTagInput, setNewTagInput] = useState("");
  const [taggingItemId, setTaggingItemId] = useState(null);

  // Load vocabulary
  useEffect(() => {
    async function loadVocab() {
      try {
        const res = await api.getVocabulary();
        if (res?.items) {
          setItems(res.items);
        }
      } catch (err) {
        // Fallback to local demo items if server unavailable
        const stored = localStorage.getItem("unilang_local_vocab");
        if (stored) {
          setItems(JSON.parse(stored));
        } else {
          const defaults = [
            { id: "1", term: "el billete", meaning: "ticket", langCode: "es", phonetic: "el bee-YEH-teh", deck: "Travel Phrasebook", tags: ["#RomeTrip", "#Transit"], easeFactor: 2.5, intervalDays: 3 },
            { id: "2", term: "la sobremesa", meaning: "after-dinner conversation", langCode: "es", phonetic: "soh-breh-MEH-sah", deck: "Culture", tags: ["#Food", "#Culture"], easeFactor: 2.6, intervalDays: 6 },
            { id: "3", term: "un croissant", meaning: "a croissant", langCode: "fr", phonetic: "kʁwa.sɑ̃", deck: "Reading", tags: ["#Food"], easeFactor: 2.5, intervalDays: 1 },
            { id: "4", term: "Pünktlichkeit", meaning: "punctuality", langCode: "de", phonetic: "ˈpʏŋktlɪçkaɪt", deck: "Culture", tags: ["#Business"], easeFactor: 2.4, intervalDays: 4 },
            { id: "5", term: "新幹線 (Shinkansen)", meaning: "bullet train", langCode: "ja", phonetic: "Shinkansen", deck: "Reading", tags: ["#Transit", "#Japan2026"], easeFactor: 2.7, intervalDays: 8 }
          ];
          setItems(defaults);
          localStorage.setItem("unilang_local_vocab", JSON.stringify(defaults));
        }
      } finally {
        setLoading(false);
      }
    }
    loadVocab();
  }, []);

  // Compute all unique tags
  const allTags = new Set();
  const allDecks = new Set();
  items.forEach(item => {
    if (item.tags && Array.isArray(item.tags)) {
      item.tags.forEach(t => allTags.add(t));
    }
    if (item.deck) allDecks.add(item.deck);
  });

  // Filter items
  const filteredItems = items.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !q ||
      item.term.toLowerCase().includes(q) ||
      item.meaning.toLowerCase().includes(q) ||
      (item.phonetic && item.phonetic.toLowerCase().includes(q)) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(q)));

    const matchesTag = selectedTag === "all" || (item.tags && item.tags.includes(selectedTag));
    const matchesDeck = selectedDeck === "all" || item.deck === selectedDeck;

    return matchesQuery && matchesTag && matchesDeck;
  });

  // Add custom tag to an item
  const handleAddTag = (itemId) => {
    if (!newTagInput.trim()) return;
    const formattedTag = newTagInput.startsWith("#") ? newTagInput.trim() : `#${newTagInput.trim()}`;

    setItems(prev => {
      const updated = prev.map(item => {
        if (item.id === itemId) {
          const currentTags = item.tags || [];
          if (!currentTags.includes(formattedTag)) {
            return { ...item, tags: [...currentTags, formattedTag] };
          }
        }
        return item;
      });
      localStorage.setItem("unilang_local_vocab", JSON.stringify(updated));
      return updated;
    });

    setNewTagInput("");
    setTaggingItemId(null);
    toast.success(`Tag ${formattedTag} added!`);
  };

  // Audio Playback
  const playAudio = (term, langCode) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(term);
      utterance.lang = langCode === "es" ? "es-ES" : langCode === "fr" ? "fr-FR" : langCode === "de" ? "de-DE" : langCode === "it" ? "it-IT" : langCode === "ja" ? "ja-JP" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // EXPORT: CSV
  const exportToCSV = () => {
    const headers = ["Term", "Meaning", "Language", "Phonetic", "Deck", "Tags", "Interval Days", "Ease Factor"];
    const rows = filteredItems.map(i => [
      `"${i.term.replace(/"/g, '""')}"`,
      `"${i.meaning.replace(/"/g, '""')}"`,
      `"${i.langCode || 'es'}"`,
      `"${(i.phonetic || '').replace(/"/g, '""')}"`,
      `"${(i.deck || 'General').replace(/"/g, '""')}"`,
      `"${(i.tags || []).join(';').replace(/"/g, '""')}"`,
      i.intervalDays || 1,
      i.easeFactor || 2.5
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `unilang_notebook_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Export generated successfully!");
  };

  // EXPORT: Anki TSV format
  const exportToAnki = () => {
    const tsvHeader = "#separator:Tab\n#html:true\n#tags column:5\n";
    const tsvRows = filteredItems.map(i => {
      const front = i.term;
      const back = `<b>${i.meaning}</b>${i.phonetic ? `<br><i>[${i.phonetic}]</i>` : ''}`;
      const deck = i.deck || "UniLang";
      const lang = i.langCode || "es";
      const tags = (i.tags || []).join(" ");
      return `${front}\t${back}\t${deck}\t${lang}\t${tags}`;
    });

    const content = tsvHeader + tsvRows.join("\n");
    const blob = new Blob([content], { type: "text/tab-separated-values;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `unilang_anki_deck_${new Date().toISOString().slice(0, 10)}.tsv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Anki-ready TSV Deck generated! Ready for 1-click import into Anki.");
  };

  // EXPORT: Printable HTML / PDF
  const printStudySheet = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Please allow popups to generate the printable study sheet.");
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>UniLang Personal Study Notebook</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #111; }
            h1 { font-size: 24px; margin-bottom: 4px; }
            p.sub { font-size: 13px; color: #666; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; font-size: 13px; }
            th { text-align: left; padding: 10px 12px; background: #f3f4f6; border-bottom: 2px solid #e5e7eb; font-weight: 600; }
            td { padding: 10px 12px; border-bottom: 1px solid #e5e7eb; }
            .tag { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-right: 4px; }
            .phonetic { font-family: monospace; color: #4b5563; font-style: italic; }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <h1>UniLang Study Notebook</h1>
          <p class="sub">Generated on ${new Date().toLocaleDateString()} · ${filteredItems.length} Terms Documented</p>
          <table>
            <thead>
              <tr>
                <th>Term</th>
                <th>Phonetic</th>
                <th>Meaning</th>
                <th>Deck</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              ${filteredItems.map(item => `
                <tr>
                  <td><strong>${item.term}</strong></td>
                  <td class="phonetic">${item.phonetic ? `[${item.phonetic}]` : '-'}</td>
                  <td>${item.meaning}</td>
                  <td>${item.deck || 'General'}</td>
                  <td>${(item.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-4xl mx-auto space-y-6 pb-16"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Centralized Personal Notebook
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {items.length} Saved Entries
            </span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span>Master Study Library</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Every word saved from Culture, Translator, Reading, Lessons & AI in one filterable space
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={exportToCSV}
            className="rounded-xl text-xs font-semibold flex items-center gap-1.5 border-white/[0.08] hover:bg-secondary/40"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>CSV</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={exportToAnki}
            className="rounded-xl text-xs font-semibold flex items-center gap-1.5 border-white/[0.08] hover:bg-secondary/40"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Anki (.tsv)</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={printStudySheet}
            className="rounded-xl text-xs font-semibold flex items-center gap-1.5 border-white/[0.08] hover:bg-secondary/40"
          >
            <Printer className="w-3.5 h-3.5 text-purple-400" />
            <span>Print Sheet</span>
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 rounded-2xl border border-white/[0.06] space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search notebook by term, meaning, phonetic, or #tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-secondary/30 border border-white/[0.08] text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Deck & Tag Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/[0.04]">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Filter className="w-3 h-3" /> Tags:
          </span>

          <button
            onClick={() => setSelectedTag("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedTag === "all"
                ? "bg-primary text-primary-foreground font-bold"
                : "bg-secondary/20 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Tags
          </button>

          {Array.from(allTags).map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedTag === t
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-secondary/20 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}

          {allDecks.size > 0 && (
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="text-[11px] text-muted-foreground">Deck:</span>
              <select
                value={selectedDeck}
                onChange={(e) => setSelectedDeck(e.target.value)}
                className="bg-secondary/30 border border-white/[0.08] text-xs rounded-lg px-2 py-1 text-foreground focus:outline-none"
              >
                <option value="all">All Decks ({items.length})</option>
                {Array.from(allDecks).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Vocabulary Table / Cards */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-2xl border border-white/[0.06] text-muted-foreground">
            <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-semibold">No vocabulary entries found.</p>
            <p className="text-xs mt-1">Bookmark words from Translator, Reading Studio, or Culture Hub to populate your library.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className="glass-card p-4 rounded-2xl border border-white/[0.06] hover:border-primary/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-heading font-bold text-foreground">{item.term}</h3>
                  {item.phonetic && (
                    <span className="text-xs font-mono text-primary italic">[{item.phonetic}]</span>
                  )}
                  <button
                    onClick={() => playAudio(item.term, item.langCode || "es")}
                    className="p-1 rounded-md text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{item.meaning}</p>

                {/* Tags and Deck pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {item.deck && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-secondary/50 text-foreground border border-white/[0.04]">
                      {item.deck}
                    </span>
                  )}
                  {item.tags?.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}

                  {/* Add tag button / input */}
                  {taggingItemId === item.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="#tag"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTag(item.id)}
                        className="w-20 px-1.5 py-0.5 rounded bg-secondary text-[10px] text-foreground border border-primary/40 focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => handleAddTag(item.id)}
                        className="p-1 rounded bg-primary text-primary-foreground text-[10px]"
                      >
                        <Check className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setTaggingItemId(item.id)}
                      className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors"
                    >
                      <Plus className="w-2.5 h-2.5" />
                      <span>Tag</span>
                    </button>
                  )}
                </div>
              </div>

              {/* SRS Memory metadata */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-white/[0.04] text-[11px] text-muted-foreground shrink-0 gap-1">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  Interval: {item.intervalDays || 1}d
                </span>
                <span className="text-[10px]">EF: {item.easeFactor ? item.easeFactor.toFixed(2) : "2.50"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

