import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Shield, ShieldCheck, Clock, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function StreakEngineCard({ streak = 7, userProfile }) {
  const [freezeCount, setFreezeCount] = useState(2);
  const [timeLeft, setTimeLeft] = useState("");

  // Calculate time remaining until midnight local time
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight - now;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleEquipFreeze = () => {
    if (freezeCount >= 2) {
      toast.info("Streak Freeze storage full (Max 2 freezers).");
      return;
    }
    setFreezeCount(prev => prev + 1);
    toast.success("Streak Freeze equipped! Your streak is safely shielded.");
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const activeCount = Math.min(streak, 7);

  return (
    <div className="glass-card-elevated p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-card to-orange-500/5 space-y-4">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black shadow-lg shadow-amber-500/25">
            <Flame className="w-7 h-7 fill-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-heading font-black text-foreground">{streak} Days</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Resets in {timeLeft} at midnight</span>
            </p>
          </div>
        </div>

        {/* Streak Freeze Shield pill */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-card border border-white/[0.06]">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <div className="text-left">
            <p className="text-xs font-bold text-foreground">{freezeCount} / 2 Freezes Active</p>
            <p className="text-[10px] text-muted-foreground">Streak protected if a day is missed</p>
          </div>
        </div>
      </div>

      {/* 7-Day Visual Calendar Pill Bar */}
      <div className="grid grid-cols-7 gap-1.5 pt-2 border-t border-white/[0.04]">
        {days.map((day, idx) => {
          const isStudied = idx < activeCount;
          return (
            <div
              key={day}
              className={`py-2 px-1 rounded-xl text-center flex flex-col items-center gap-1 transition-all ${
                isStudied
                  ? "bg-gradient-to-b from-amber-400/20 to-orange-500/20 border border-amber-500/40 text-amber-300 shadow-xs"
                  : "bg-secondary/20 border border-white/[0.02] text-muted-foreground/40"
              }`}
            >
              <span className="text-[10px] font-semibold">{day}</span>
              {isStudied ? (
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
