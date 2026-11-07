import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  Sparkles,
  Award,
  ChevronRight,
  RotateCcw,
  BookOpen,
  PlusCircle,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  X,
  MessageSquare,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/client";
import { SCENARIOS } from "@/data/scenarios";
import confetti from "canvas-confetti";

export default function ConversationPartner({ userProfile }) {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showFeedbackDrawer, setShowFeedbackDrawer] = useState(false);
  const [activeCorrections, setActiveCorrections] = useState([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const messagesEndRef = useRef(null);

  // Initialize scenario dialogue
  useEffect(() => {
    setSessionId(null);
    setMessages([
      {
        id: "msg-0",
        role: "ai",
        text: selectedScenario.openingLine,
        translation: selectedScenario.openingTranslation,
        phonetic: selectedScenario.openingPhonetic,
        timestamp: new Date()
      }
    ]);
    setActiveCorrections([]);
  }, [selectedScenario]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Audio Playback
  const playAudio = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedScenario.lang === "es" ? "es-ES" : selectedScenario.lang === "de" ? "de-DE" : selectedScenario.lang === "fr" ? "fr-FR" : selectedScenario.lang === "it" ? "it-IT" : selectedScenario.lang === "ja" ? "ja-JP" : "en-US";
      utterance.rate = audioSpeed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speech-to-text recording
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedScenario.lang === "es" ? "es-ES" : selectedScenario.lang === "de" ? "de-DE" : selectedScenario.lang === "fr" ? "fr-FR" : selectedScenario.lang === "it" ? "it-IT" : selectedScenario.lang === "ja" ? "ja-JP" : "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInputText(transcript);
        setIsRecording(false);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  // Send Message
  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isSending) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsSending(true);

    try {
      const res = await api.aiChat(
        selectedScenario.key,
        selectedScenario.lang,
        selectedScenario.cefrLevel,
        text.trim(),
        sessionId
      );

      if (res.sessionId) setSessionId(res.sessionId);

      // Check if AI provided grammar feedback
      if (res.correction && res.correction.hasError) {
        setActiveCorrections(prev => [res.correction, ...prev]);
        setShowFeedbackDrawer(true);
      }

      const aiMsg = {
        id: `ai-${Date.now()}`,
        role: "ai",
        text: res.reply,
        translation: res.translation,
        phonetic: res.phonetic,
        recommendedReplies: res.recommendedReplies || [],
        correction: res.correction,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // Local fallback in case server is starting
      const aiFallback = {
        id: `ai-${Date.now()}`,
        role: "ai",
        text: "¡Comprendo perfectamente! ¿Podría decirme más sobre eso?",
        translation: "I understand completely! Could you tell me more about that?",
        phonetic: "Kohm-PREHN-doh pehr-fehk-tah-MEN-teh...",
        recommendedReplies: ["Sí, por supuesto.", "No hay problema.", "Muchas gracias."],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiFallback]);
    } finally {
      setIsSending(false);
    }
  };

  const handleEndSession = () => {
    setShowSummaryModal(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  const turnsCount = messages.filter(m => m.role === "user").length;
  const errorCount = activeCorrections.length;
  const accuracyScore = Math.max(70, Math.round(100 - (errorCount / Math.max(1, turnsCount)) * 30));

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Scenario Selector Carousel */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
          Select Roleplay Immersion Scenario
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {SCENARIOS.map(sc => (
            <button
              key={sc.key}
              onClick={() => setSelectedScenario(sc)}
              className={`p-3 rounded-xl border text-left shrink-0 transition-all ${
                selectedScenario.key === sc.key
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                  : "bg-secondary/30 hover:bg-secondary/60 border-white/[0.06] text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white/10 uppercase">
                  {sc.cefrLevel}
                </span>
                <span className="text-xs font-semibold">{sc.title}</span>
              </div>
              <p className="text-[10px] opacity-75">
                AI: {sc.aiRole} · You: {sc.userRole}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Window */}
        <div className="lg:col-span-2 glass-card rounded-2xl flex flex-col h-[520px] border border-white/[0.06] overflow-hidden">
          {/* Top Chat Bar */}
          <div className="p-3.5 border-b border-white/[0.06] bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-foreground">{selectedScenario.title}</span>
              <span className="text-[11px] text-muted-foreground">({selectedScenario.aiRole})</span>
            </div>

            <div className="flex items-center gap-2">
              {activeCorrections.length > 0 && (
                <button
                  onClick={() => setShowFeedbackDrawer(!showFeedbackDrawer)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{activeCorrections.length} Corrections</span>
                </button>
              )}
              {turnsCount >= 3 && (
                <button
                  onClick={handleEndSession}
                  className="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
                >
                  Finish Session
                </button>
              )}
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-xs shadow-md"
                      : "bg-secondary/50 text-foreground border border-white/[0.06] rounded-bl-xs"
                  }`}
                >
                  <p className="font-medium leading-relaxed">{m.text}</p>

                  {/* AI Extra Data (Phonetics, Translation) */}
                  {m.role === "ai" && (
                    <div className="mt-2 pt-2 border-t border-white/[0.08] space-y-1">
                      {m.phonetic && (
                        <p className="text-[11px] text-muted-foreground italic font-mono">
                          [{m.phonetic}]
                        </p>
                      )}
                      {m.translation && (
                        <p className="text-xs text-foreground/80 font-medium">
                          {m.translation}
                        </p>
                      )}
                      <button
                        onClick={() => playAudio(m.text)}
                        className="mt-1 text-primary hover:text-primary/80 flex items-center gap-1 text-[11px] font-semibold"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Quick-reply chips attached to latest AI turn */}
                {m.recommendedReplies && m.recommendedReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.recommendedReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(qr)}
                        className="px-2.5 py-1 rounded-full bg-secondary/30 hover:bg-secondary/60 border border-white/[0.06] text-[11px] font-medium text-muted-foreground hover:text-foreground transition-all"
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isSending && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>{selectedScenario.aiRole} is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 border-t border-white/[0.06] bg-secondary/20 flex items-center gap-2">
            <button
              onClick={startRecording}
              className={`p-2.5 rounded-xl transition-all ${
                isRecording ? "bg-rose-500 text-white animate-pulse" : "bg-secondary/40 text-foreground hover:bg-secondary/70"
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={`Respond as ${selectedScenario.userRole} in ${selectedScenario.lang.toUpperCase()}...`}
              className="flex-1 bg-secondary/30 border border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isSending}
              className="p-2.5 rounded-xl bg-primary text-primary-foreground shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Expandable Grammar Coach Feedback Sidebar */}
        <div className="glass-card p-5 rounded-2xl border border-white/[0.06] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
              <h4 className="text-sm font-heading font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Grammar Coach Sidebar</span>
              </h4>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                Live Analysis
              </span>
            </div>

            {activeCorrections.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-semibold text-foreground">Clean Conversational Flow</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Grammar slips, agreement issues, and register mismatches (e.g. du vs Sie) will appear here non-intrusively.
                </p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-[360px]">
                {activeCorrections.map((corr, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="text-rose-400 line-through">{corr.userMistake}</span>
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                      <span className="text-emerald-400">{corr.correctedPhrase}</span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed text-[11px]">
                      {corr.explanation}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <p className="text-[11px] text-muted-foreground text-center">
              Target Level: <span className="font-bold text-primary">{selectedScenario.cefrLevel}</span> · Turns: {turnsCount}
            </p>
          </div>
        </div>
      </div>

      {/* End-of-Session Performance Summary Modal */}
      <AnimatePresence>
        {showSummaryModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-card border border-white/[0.1] rounded-2xl max-w-md w-full p-6 shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-orange-500/20">
                  <Award className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-heading font-bold text-foreground">
                  Session Performance Report
                </h4>
                <p className="text-xs text-muted-foreground">
                  {selectedScenario.title} ({selectedScenario.cefrLevel})
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3 text-center">
                  <p className="text-2xl font-heading font-black text-primary">{turnsCount}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Turns</p>
                </div>
                <div className="glass-card p-3 text-center">
                  <p className="text-2xl font-heading font-black text-emerald-400">{accuracyScore}%</p>
                  <p className="text-[10px] text-muted-foreground uppercase">Accuracy</p>
                </div>
                <div className="glass-card p-3 text-center">
                  <p className="text-2xl font-heading font-black text-purple-400">+{turnsCount * 15}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">XP Earned</p>
                </div>
              </div>

              <Button
                onClick={() => setShowSummaryModal(false)}
                className="w-full py-5 rounded-xl font-semibold bg-primary text-primary-foreground"
              >
                Continue Learning
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
