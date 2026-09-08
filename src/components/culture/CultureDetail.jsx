import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lightbulb, MapPin, BookOpen, Sparkles, Users, Image as ImageIcon, ImageOff, Utensils, Shirt, Landmark, Sunset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGalleryImages, GALLERY_CATEGORIES } from "@/lib/cultureImages";

const tabIcons = {
  origins: BookOpen,
  evolution: Sparkles,
  dialects: MapPin,
  funFacts: Lightbulb,
  etiquette: Users,
};

const categoryIcons = {
  food: Utensils,
  clothing: Shirt,
  monuments: Landmark,
  scenes: Sunset,
};

export default function CultureDetail({ data, langCode, activeTab, tabs, onTabChange, onBack }) {
  const [heroError, setHeroError] = useState(false);
  const [galleryCategory, setGalleryCategory] = useState("all");
  const [imgErrors, setImgErrors] = useState({});

  const allGalleryImages = getGalleryImages(langCode);
  const filteredImages = galleryCategory === "all"
    ? allGalleryImages
    : allGalleryImages.filter(img => img.category === galleryCategory);

  const handleImgError = (idx) => {
    setImgErrors(prev => ({ ...prev, [idx]: true }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "origins":
        return <p className="text-foreground/90 leading-relaxed text-[15px]">{data.origins}</p>;
      case "evolution":
        return <p className="text-foreground/90 leading-relaxed text-[15px]">{data.evolution}</p>;
      case "dialects":
        return (
          <div className="grid grid-cols-2 gap-3">
            {data.dialects?.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 400 }}
                className="glass-card p-4"
              >
                <MapPin className="w-4 h-4 text-purple-400 mb-2" />
                <p className="font-medium text-sm">{d}</p>
              </motion.div>
            ))}
          </div>
        );
      case "funFacts":
        return (
          <div className="space-y-3">
            {data.funFacts?.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 400 }}
                className="flex gap-3 bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl p-4 border border-amber-500/10"
              >
                <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/90">{fact}</p>
              </motion.div>
            ))}
          </div>
        );
      case "etiquette":
        return <p className="text-foreground/90 leading-relaxed text-[15px]">{data.etiquette}</p>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="px-4 py-6"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 rounded-xl text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Hero Image */}
      {data.image && !heroError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden mb-6 h-56 sm:h-72 group"
        >
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setHeroError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <span className="text-5xl drop-shadow-lg">{data.flag}</span>
            <div>
              <h2 className="text-3xl font-heading font-bold text-white drop-shadow-lg">{data.name}</h2>
              <p className="text-white/70 text-sm">Language & Culture</p>
            </div>
          </div>
        </motion.div>
      )}

      {(!data.image || heroError) && (
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{data.flag}</span>
          <div>
            <h2 className="text-3xl font-heading font-bold">{data.name}</h2>
            <p className="text-muted-foreground">Language & Culture</p>
          </div>
        </div>
      )}

      {/* Sub-tabs */}
      <div
        className="flex gap-2 overflow-x-auto pb-4 mb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map(tab => {
          const Icon = tabIcons[tab.id];
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Categorized Image Gallery */}
      {filteredImages.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Cultural Gallery</h3>
          </div>

          {/* Category Filter */}
          <div
            className="flex gap-2 overflow-x-auto pb-3 mb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {GALLERY_CATEGORIES.map(cat => {
              const Icon = categoryIcons[cat.id];
              const isActive = galleryCategory === cat.id;
              const count = cat.id === "all"
                ? allGalleryImages.length
                : allGalleryImages.filter(img => img.category === cat.id).length;
              if (cat.id !== "all" && count === 0) return null;
              return (
                <button
                  key={cat.id}
                  onClick={() => setGalleryCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  {cat.label}
                  <span className="opacity-60">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Grid Gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {filteredImages.map((img, i) => (
              <motion.div
                key={`${galleryCategory}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 400 }}
                className="relative rounded-xl overflow-hidden shadow-lg shadow-black/20 aspect-[4/3] group"
              >
                {!imgErrors[i] ? (
                  <>
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={() => handleImgError(i)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-[11px] font-medium leading-tight">{img.caption}</p>
                      <span className="text-white/60 text-[9px] uppercase tracking-wide">{img.category}</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <ImageOff className="w-6 h-6 text-white/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}