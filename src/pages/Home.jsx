const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import api from "@/api/client";
import TopBar from "@/components/layout/TopBar";
import TabBar from "@/components/layout/TabBar";
import LearnSection from "@/components/learn/LearnSection";
import TranslateSection from "@/components/translate/TranslateSection";
import CultureSection from "@/components/culture/CultureSection";
import DashboardSection from "@/components/dashboard/DashboardSection";
import VocabularySection from "@/components/vocabulary/VocabularySection";
import SpeakSection from "@/components/speak/SpeakSection";
import GrammarSection from "@/components/grammar/GrammarSection";
import PhrasebookSection from "@/components/phrasebook/PhrasebookSection";
import ReadingStudio from "@/components/reading/ReadingStudio";
import LibrarySection from "@/components/library/LibrarySection";
import CommunitySection from "@/components/community/CommunitySection";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    let stored = localStorage.getItem("unilang_profile");
    let currentProfile = stored ? JSON.parse(stored) : null;

    if (!currentProfile) {
      currentProfile = {
        name: "Alex Morgan",
        email: "demo@unilang.app",
        native_language: "en",
        target_languages: ["es", "ja", "fr", "te", "hi"],
        interests: ["culture", "travel", "food", "business"],
        level: "intermediate",
        xp_points: 450,
        streak_count: 7,
        onboarding_complete: true,
        isDemoUser: true
      };
      localStorage.setItem("unilang_profile", JSON.stringify(currentProfile));
    }
    setProfile(currentProfile);

    // Sync with live backend API
    async function syncWithBackend() {
      try {
        const meData = await api.getMe();
        if (meData?.user) {
          const u = meData.user;
          const merged = {
            ...currentProfile,
            name: u.displayName || currentProfile.name,
            email: u.email,
            xp_points: u.stats?.totalXp ?? currentProfile.xp_points,
            streak_count: u.stats?.currentStreak ?? currentProfile.streak_count,
            target_languages: u.preference?.targetLang ? [u.preference.targetLang] : currentProfile.target_languages,
            level: u.preference?.cefrLevel || currentProfile.level
          };
          setProfile(merged);
          localStorage.setItem("unilang_profile", JSON.stringify(merged));
        }

        const progressData = await api.getProgress();
        if (progressData?.progress) {
          setProgress(progressData.progress.map(p => ({
            lesson_id: p.lessonId,
            status: p.status,
            score: p.bestScore
          })));
        }
      } catch (err) {
        // Server unreachable or offline — keep local profile
        console.debug("Backend sync skipped, operating in offline/local mode.");
      }
    }
    syncWithBackend();
  }, [navigate]);

  const handleXPGain = (xp, lessonId) => {
    setProfile(prev => {
      const updated = { ...prev, xp_points: (prev.xp_points || 0) + xp };
      localStorage.setItem("unilang_profile", JSON.stringify(updated));
      return updated;
    });
    setProgress(prev => {
      const existing = prev.find(p => p.lesson_id === lessonId);
      if (existing) {
        return prev.map(p => p.lesson_id === lessonId ? { ...p, status: "completed", score: 100 } : p);
      }
      return [...prev, { lesson_id: lessonId, status: "completed", score: 100 }];
    });

    // Record to live backend if available
    api.recordProgress(lessonId, 100, xp).catch(() => {
      // Handled by offline queue in ApiClient
    });
  };

  const handleBookmark = async (bookmarkData) => {
    await db.entities.Bookmark.create(bookmarkData);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar xp={profile.xp_points || 0} streak={profile.streak_count || 0} userProfile={profile} />
      <TabBar active={activeTab} onChange={setActiveTab} />

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <DashboardSection
                userProfile={profile}
                progress={progress}
                onNavigateTab={setActiveTab}
              />
            </motion.div>
          )}
          {activeTab === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <LearnSection
                userProfile={profile}
                progress={progress}
                onXPGain={handleXPGain}
              />
            </motion.div>
          )}
          {activeTab === "vocabulary" && (
            <motion.div
              key="vocabulary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <VocabularySection userProfile={profile} />
            </motion.div>
          )}
          {activeTab === "speak" && (
            <motion.div
              key="speak"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <SpeakSection userProfile={profile} onXPGain={handleXPGain} />
            </motion.div>
          )}
          {activeTab === "grammar" && (
            <motion.div
              key="grammar"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <GrammarSection userProfile={profile} />
            </motion.div>
          )}
          {activeTab === "phrasebook" && (
            <motion.div
              key="phrasebook"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <PhrasebookSection userProfile={profile} />
            </motion.div>
          )}
          {activeTab === "reading" && (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ReadingStudio userProfile={profile} onXPGain={handleXPGain} />
            </motion.div>
          )}
          {activeTab === "library" && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <LibrarySection userProfile={profile} />
            </motion.div>
          )}
          {activeTab === "community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <CommunitySection userProfile={profile} onXPGain={handleXPGain} />
            </motion.div>
          )}
          {activeTab === "translate" && (
            <motion.div
              key="translate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <TranslateSection
                onBookmark={handleBookmark}
                onExplainGrammar={(txt) => setActiveTab("grammar")}
                onSendToConversation={(txt) => setActiveTab("speak")}
              />
            </motion.div>
          )}
          {activeTab === "culture" && (
            <motion.div
              key="culture"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <CultureSection
                targetLanguages={profile.target_languages || []}
                onXPGain={handleXPGain}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
