import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Zap,
  Flame,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  Medal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ALL_BADGES,
  BADGE_TIERS,
  DAILY_QUESTS,
  LEAGUE_TIERS,
  generateLeagueLeaderboard
} from "@/data/gamification/badgesAndLeagues";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function CommunitySection({ userProfile, onXPGain }) {
  const [activeTab, setActiveTab] = useState("league"); // 'league' | 'quests' | 'badges'
  const [selectedTier, setSelectedTier] = useState("ALL");
  const [claimedQuests, setClaimedQuests] = useState(new Set(["q3", "q4"]));

  const xp = userProfile?.xp_points || 450;
  const userName = userProfile?.name || "Alex Morgan";
  const leaderboard = generateLeagueLeaderboard(xp, userName, "Gold");

  const handleClaimQuest = (quest) => {
    if (claimedQuests.has(quest.id)) return;
    onXPGain?.(quest.rewardXp, `quest_${quest.id}`);
    setClaimedQuests(new Set([...claimedQuests, quest.id]));
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    toast.success(`Quest Completed! +${quest.rewardXp} XP awarded!`);
  };

  const filteredBadges = selectedTier === "ALL"
    ? ALL_BADGES
    : ALL_BADGES.filter(b => b.tier === selectedTier);

  // Compute mock unlocked badges based on user XP and streak
  const isBadgeUnlocked = (b) => {
    if (b.tier === "BRONZE") return true;
    if (b.tier === "SILVER" && xp >= 300) return true;
    if (b.tier === "GOLD" && xp >= 800) return true;
    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 max-w-4xl mx-auto space-y-6 pb-16"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Gold Tier League
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              Weekly Tournament
            </span>
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>Leagues & Community Arena</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Compete in 30-learner weekly leagues, finish quests, and collect 30+ achievement badges
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex bg-secondary/30 p-1 rounded-2xl border border-white/[0.06]">
          {[
            { id: "league", label: "League", icon: Trophy },
            { id: "quests", label: "Quests", icon: Zap },
            { id: "badges", label: "Badges", icon: Award }
          ].map(t => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? "bg-card text-foreground shadow-sm font-bold border border-white/[0.08]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : ""}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- TAB 1: WEEKLY LEAGUE LEADERBOARD --- */}
      {activeTab === "league" && (
        <div className="space-y-4">
          {/* League Promotion Rules Banner */}
          <div className="glass-card-elevated p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-card to-amber-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold">
                🥇
              </div>
              <div>
                <h4 className="text-sm font-heading font-bold text-foreground">
                  Gold League (Season 42)
                </h4>
                <p className="text-xs text-muted-foreground">
                  Top 5 promote to <span className="text-sky-400 font-semibold">Sapphire</span> · Bottom 5 demote to <span className="text-slate-400 font-semibold">Silver</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-xl border border-white/[0.06]">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Resets Sunday 23:59 UTC</span>
            </div>
          </div>

          {/* 30-Learner Leaderboard Table */}
          <div className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
            <div className="divide-y divide-white/[0.04]">
              {leaderboard.map(item => {
                const isTop3 = item.rank <= 3;
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
                      item.isUser
                        ? "bg-primary/10 border-l-4 border-l-primary font-semibold"
                        : item.zone === "promotion"
                        ? "bg-emerald-500/[0.02]"
                        : item.zone === "demotion"
                        ? "bg-rose-500/[0.02]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank Number / Medal */}
                      <div className="w-7 text-center font-heading font-bold text-sm">
                        {item.rank === 1 ? (
                          <span className="text-lg">🥇</span>
                        ) : item.rank === 2 ? (
                          <span className="text-lg">🥈</span>
                        ) : item.rank === 3 ? (
                          <span className="text-lg">🥉</span>
                        ) : (
                          <span className={item.isUser ? "text-primary" : "text-muted-foreground"}>
                            {item.rank}
                          </span>
                        )}
                      </div>

                      {/* Participant details */}
                      <span className="text-lg">{item.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`text-sm ${item.isUser ? "font-bold text-primary" : "font-medium text-foreground"}`}>
                            {item.name}
                          </p>
                          {item.isUser && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary/20 text-primary">
                              YOU
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>{item.streak} day streak</span>
                        </p>
                      </div>
                    </div>

                    {/* XP & Zone Indicator */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-heading font-bold text-foreground">
                        {item.xp.toLocaleString()} XP
                      </span>

                      {item.zone === "promotion" ? (
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs" title="Promotion Zone">
                          <ArrowUp className="w-3.5 h-3.5" />
                        </div>
                      ) : item.zone === "demotion" ? (
                        <div className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs" title="Demotion Zone">
                          <ArrowDown className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-secondary/30 text-muted-foreground flex items-center justify-center text-xs">
                          <Minus className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: DAILY & WEEKLY QUESTS --- */}
      {activeTab === "quests" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl glass-card border border-white/[0.06] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-heading font-bold text-foreground">Active Quests</h3>
              <p className="text-xs text-muted-foreground">Refresh every 24 hours at midnight local time</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              2 of 4 Completed
            </span>
          </div>

          <div className="space-y-3">
            {DAILY_QUESTS.map(quest => {
              const isDone = quest.current >= quest.target;
              const isClaimed = claimedQuests.has(quest.id);

              return (
                <div
                  key={quest.id}
                  className="glass-card p-4 rounded-2xl border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-secondary/40">{quest.icon}</span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-heading font-bold text-foreground">{quest.title}</h4>
                      <p className="text-xs text-muted-foreground">{quest.desc}</p>
                      <div className="flex items-center gap-2 pt-1">
                        <div className="w-32 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(100, (quest.current / quest.target) * 100)}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground font-semibold">
                          {quest.current}/{quest.target}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end sm:justify-center">
                    {isClaimed ? (
                      <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Claimed
                      </span>
                    ) : isDone ? (
                      <Button
                        size="sm"
                        onClick={() => handleClaimQuest(quest)}
                        className="bg-primary text-primary-foreground font-semibold text-xs rounded-xl shadow-md shadow-primary/20"
                      >
                        Claim +{quest.rewardXp} XP
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium px-3 py-1.5 rounded-xl bg-secondary/30">
                        In Progress (+{quest.rewardXp} XP)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB 3: 30+ ACHIEVEMENT BADGES GALLERY --- */}
      {activeTab === "badges" && (
        <div className="space-y-4">
          {/* Tier Filter Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setSelectedTier("ALL")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTier === "ALL"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              All Badges ({ALL_BADGES.length})
            </button>
            {Object.keys(BADGE_TIERS).map(tierKey => (
              <button
                key={tierKey}
                onClick={() => setSelectedTier(tierKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedTier === tierKey
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary/30 text-muted-foreground hover:text-foreground"
                }`}
              >
                {BADGE_TIERS[tierKey].label}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredBadges.map(badge => {
              const unlocked = isBadgeUnlocked(badge);
              const tierInfo = BADGE_TIERS[badge.tier];

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-2 ${
                    unlocked
                      ? "glass-card-elevated border-white/[0.1] hover:border-primary/40 shadow-sm"
                      : "bg-card/20 border-white/[0.02] opacity-40 grayscale"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-3xl block py-1">{badge.icon}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r ${tierInfo.color} text-white`}>
                      {tierInfo.label}
                    </span>
                    <h4 className="text-xs font-heading font-bold text-foreground mt-1">{badge.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">{badge.desc}</p>
                  </div>

                  <div className="w-full pt-1">
                    <span className={`text-[10px] font-bold ${unlocked ? "text-emerald-400" : "text-muted-foreground"}`}>
                      {unlocked ? "✓ Unlocked" : "Locked"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}

