import React from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Mic,
  BookMarked,
  MapPin,
  BookText,
  Library,
  Trophy,
  Languages,
  Globe2
} from "lucide-react";

export const APP_TABS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "vocabulary", label: "Vocab", icon: Brain },
  { id: "speak", label: "Speak", icon: Mic },
  { id: "grammar", label: "Grammar", icon: BookMarked },
  { id: "phrasebook", label: "Phrasebook", icon: MapPin },
  { id: "reading", label: "Reading", icon: BookText },
  { id: "library", label: "Notebook", icon: Library },
  { id: "community", label: "Arena", icon: Trophy },
  { id: "translate", label: "Translate", icon: Languages },
  { id: "culture", label: "Culture", icon: Globe2 },
];

export default function TabBar({ active, onChange }) {
  return (
    <div className="bg-background/80 backdrop-blur-2xl border-b border-white/[0.06] sticky top-[57px] z-40 overflow-x-auto no-scrollbar">
      <div className="max-w-4xl mx-auto flex px-2 min-w-max md:min-w-0">
        {APP_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex-1 min-w-[65px] relative py-2.5 px-2 flex flex-col items-center gap-1 transition-all group"
            >
              <Icon className={`w-4 h-4 transition-all duration-300 ${
                isActive ? "text-primary scale-110" : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`} />
              <span className={`text-[11px] font-medium transition-all duration-300 ${
                isActive ? "text-foreground font-semibold" : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-primary shadow-sm shadow-primary/30"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
