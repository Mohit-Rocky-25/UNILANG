import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

export default function SkillRadarChart({ skills }) {
  // 5 dimensions: Vocabulary, Grammar, Listening, Speaking, Culture
  const defaultSkills = {
    Vocabulary: 78,
    Grammar: 64,
    Listening: 72,
    Speaking: 60,
    Culture: 85,
    ...skills
  };

  const dimensions = [
    { key: "Vocabulary", label: "Vocabulary", value: defaultSkills.Vocabulary, color: "#38bdf8" },
    { key: "Grammar", label: "Grammar", value: defaultSkills.Grammar, color: "#a855f7" },
    { key: "Listening", label: "Listening", value: defaultSkills.Listening, color: "#34d399" },
    { key: "Speaking", label: "Speaking", value: defaultSkills.Speaking, color: "#f43f5e" },
    { key: "Culture", label: "Culture", value: defaultSkills.Culture, color: "#fbbf24" }
  ];

  const size = 260;
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = dimensions.length;

  // Calculate coordinates on regular pentagon
  const getCoordinates = (index, valuePercent) => {
    // Start from top (-90 degrees)
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = radius * (valuePercent / 100);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Grid levels (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [20, 40, 60, 80, 100];

  // User polygon points
  const polygonPoints = dimensions
    .map((dim, i) => {
      const { x, y } = getCoordinates(i, dim.value);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="glass-card p-5 rounded-2xl border border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Radar SVG */}
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background concentric pentagons */}
          {gridLevels.map(level => {
            const points = dimensions
              .map((_, i) => {
                const { x, y } = getCoordinates(i, level);
                return `${x},${y}`;
              })
              .join(" ");

            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth={level === 100 ? "1.5" : "1"}
                strokeDasharray={level === 100 ? "none" : "3,3"}
              />
            );
          })}

          {/* Radial Axis Lines */}
          {dimensions.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* User Skill Polygon */}
          <motion.polygon
            points={polygonPoints}
            fill="url(#radarGradient)"
            stroke="#6366f1"
            strokeWidth="2.5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />

          {/* Vertex Points & Labels */}
          {dimensions.map((dim, i) => {
            const pt = getCoordinates(i, dim.value);
            const labelPt = getCoordinates(i, 122);

            return (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4.5"
                  fill={dim.color}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="shadow-sm"
                />
                <text
                  x={labelPt.x}
                  y={labelPt.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[10px] font-semibold fill-foreground/90 font-heading"
                >
                  {dim.label}
                </text>
              </g>
            );
          })}

          {/* SVG Gradient Definition */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.15" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Skill Metric Badges */}
      <div className="flex-1 w-full space-y-2.5">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
          <span className="text-xs font-heading font-bold text-foreground uppercase tracking-wider">
            Holistic Competency Radar
          </span>
          <span className="text-xs text-primary font-bold">CEFR A2 Balanced</span>
        </div>

        {dimensions.map(dim => (
          <div key={dim.key} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dim.color }} />
                {dim.label}
              </span>
              <span className="font-bold text-foreground">{dim.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary/40 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${dim.value}%`, backgroundColor: dim.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
