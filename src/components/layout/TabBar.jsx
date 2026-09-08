import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Languages, Globe2 } from "lucide-react";

const tabs = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "learn", label: "Learn", icon: BookOpen },
  { id: "translate", label: "Translate", icon: Languages },
  { id: "culture", label: "Culture", icon: Globe2 },
];

export default function TabBar({ active, onChange }) {
  return (
    <div className="bg-background/80 backdrop-blur-2xl border-b border-white/[0.04] sticky top-[57px] z-40">
      <div className="max-w-4xl mx-auto flex px-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex-1 relative py-3 px-2 flex flex-col items-center gap-1 transition-all group"
            >
              <Icon className={`w-5 h-5 transition-all duration-300 ${
                isActive ? "text-primary scale-110" : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`} />
              <span className={`text-[11px] font-medium transition-all duration-300 ${
                isActive ? "text-foreground" : "text-muted-foreground/60 group-hover:text-muted-foreground"
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary shadow-sm shadow-primary/30"
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