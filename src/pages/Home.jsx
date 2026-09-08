const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "@/components/layout/TopBar";
import TabBar from "@/components/layout/TabBar";
import LearnSection from "@/components/learn/LearnSection";
import TranslateSection from "@/components/translate/TranslateSection";
import CultureSection from "@/components/culture/CultureSection";
import DashboardSection from "@/components/dashboard/DashboardSection";

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("unilang_profile");
    const tempUser = localStorage.getItem("unilang_temp_user");
    if (!stored) {
      if (!tempUser) {
        navigate("/");
        return;
      }
      navigate("/onboarding");
      return;
    }
    setProfile(JSON.parse(stored));
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
      <TopBar xp={profile.xp_points || 0} streak={profile.streak_count || 0} />
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
          {activeTab === "translate" && (
            <motion.div
              key="translate"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <TranslateSection onBookmark={handleBookmark} />
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
              <CultureSection targetLanguages={profile.target_languages || []} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}