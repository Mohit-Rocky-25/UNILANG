import { useState } from "react";
import { motion } from "framer-motion";
import { CULTURE_DATA, LANGUAGES } from "@/lib/languageData";
import CultureCard from "./CultureCard";
import CultureDetail from "./CultureDetail";

const SUB_TABS = [
  { id: "origins", label: "Origins" },
  { id: "evolution", label: "Evolution" },
  { id: "dialects", label: "Dialects" },
  { id: "funFacts", label: "Fun Facts" },
  { id: "etiquette", label: "Etiquette" },
];

export default function CultureSection({ targetLanguages }) {
  const [selectedLang, setSelectedLang] = useState(null);
  const [activeTab, setActiveTab] = useState("origins");

  // Show user's target languages first, then the rest
  const allCultureCodes = Object.keys(CULTURE_DATA);
  const userFirst = [...new Set([...(targetLanguages || []).filter(c => CULTURE_DATA[c]), ...allCultureCodes])];

  if (selectedLang) {
    const data = CULTURE_DATA[selectedLang];
    if (!data) return null;
    return (
      <CultureDetail
        data={data}
        langCode={selectedLang}
        activeTab={activeTab}
        tabs={SUB_TABS}
        onTabChange={setActiveTab}
        onBack={() => setSelectedLang(null)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6"
    >
      <h2 className="text-3xl font-heading font-bold mb-1 tracking-tight">Culture Hub</h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">Discover the soul of every language — food, fashion, monuments & traditions</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {userFirst.map((code, i) => {
          const lang = LANGUAGES.find(l => l.code === code);
          const data = CULTURE_DATA[code];
          if (!lang || !data) return null;
          const isUserLang = (targetLanguages || []).includes(code);
          return (
            <CultureCard
              key={code}
              lang={lang}
              data={data}
              index={i}
              isUserLang={isUserLang}
              onClick={() => setSelectedLang(code)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}