import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mic, Sparkles, Activity } from "lucide-react";
import ConversationPartner from "./ConversationPartner";
import SpeechStudio from "./SpeechStudio";

export default function SpeakSection({ userProfile, onXPGain }) {
  const [subTab, setSubTab] = useState("conversation");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-4xl mx-auto space-y-6"
    >
      {/* Subtab Navigation Pill Bar */}
      <div className="flex bg-secondary/30 p-1 rounded-2xl border border-white/[0.06] max-w-md mx-auto">
        <button
          onClick={() => setSubTab("conversation")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            subTab === "conversation"
              ? "bg-card text-foreground shadow-sm font-bold border border-white/[0.08]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <MessageSquare className="w-4 h-4 text-primary" />
          <span>AI Conversation Partner</span>
        </button>

        <button
          onClick={() => setSubTab("studio")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            subTab === "studio"
              ? "bg-card text-foreground shadow-sm font-bold border border-white/[0.08]"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Activity className="w-4 h-4 text-primary" />
          <span>Speech & Phoneme Studio</span>
        </button>
      </div>

      {/* Render Active View */}
      {subTab === "conversation" ? (
        <ConversationPartner userProfile={userProfile} onXPGain={onXPGain} />
      ) : (
        <SpeechStudio userProfile={userProfile} onXPGain={onXPGain} />
      )}
    </motion.div>
  );
}
