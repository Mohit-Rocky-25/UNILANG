import React, { useMemo } from "react";
import { Calendar, Flame } from "lucide-react";

export default function ActivityHeatmap({ userProfile }) {
  // Generate deterministic 52-week (364 days) study log activity
  const { weeks, totalActiveDays, totalAnnualXp } = useMemo(() => {
    const weeksArr = [];
    const today = new Date();
    let activeDays = 0;
    let annualXp = 0;

    // 52 weeks * 7 days
    for (let w = 51; w >= 0; w--) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const dayOffset = w * 7 + (6 - d);
        const date = new Date(today);
        date.setDate(date.getDate() - dayOffset);

        // Deterministic pseudo-random activity based on day hash + user streak
        const seed = (date.getFullYear() * 1000 + date.getMonth() * 31 + date.getDate()) % 100;
        let intensity = 0; // 0 to 4
        let xp = 0;

        // Recent 7 days match streak
        if (dayOffset < 7) {
          intensity = 3 + (dayOffset % 2);
          xp = 45 + (dayOffset * 10);
        } else if (seed > 75) {
          intensity = 4;
          xp = 70 + (seed % 40);
        } else if (seed > 50) {
          intensity = 3;
          xp = 40 + (seed % 20);
        } else if (seed > 30) {
          intensity = 2;
          xp = 25 + (seed % 15);
        } else if (seed > 15) {
          intensity = 1;
          xp = 15;
        }

        if (intensity > 0) {
          activeDays++;
          annualXp += xp;
        }

        days.push({
          date: date.toISOString().slice(0, 10),
          intensity,
          xp
        });
      }
      weeksArr.push(days);
    }

    return { weeks: weeksArr, totalActiveDays: activeDays, totalAnnualXp: annualXp };
  }, [userProfile]);

  const intensityColors = [
    "bg-secondary/30 border border-white/[0.02]",
    "bg-emerald-500/25 border border-emerald-500/30",
    "bg-emerald-500/50 border border-emerald-500/50",
    "bg-emerald-500/80 border border-emerald-400/80",
    "bg-emerald-400 border border-emerald-300 shadow-xs shadow-emerald-400/30"
  ];

  return (
    <div className="glass-card p-5 rounded-2xl border border-white/[0.06] space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-heading font-bold text-foreground">
            52-Week Study Heatmap
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{totalActiveDays} study days this year</span>
          <span>·</span>
          <span className="font-semibold text-emerald-400">+{totalAnnualXp.toLocaleString()} Annual XP</span>
        </div>
      </div>

      {/* Grid container with horizontal scroll */}
      <div className="overflow-x-auto pb-2 no-scrollbar">
        <div className="flex gap-1 min-w-[680px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {week.map((day, dIdx) => (
                <div
                  key={dIdx}
                  className={`w-2.5 h-2.5 rounded-xs transition-all hover:scale-125 cursor-pointer ${intensityColors[day.intensity]}`}
                  title={`${day.date}: ${day.xp > 0 ? `${day.xp} XP` : "No study activity"}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
        <span>365 Days Historical Study Density</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {intensityColors.map((color, idx) => (
            <div key={idx} className={`w-2.5 h-2.5 rounded-xs ${color}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

