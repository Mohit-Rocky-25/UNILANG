import { motion } from "framer-motion";
import { ChevronRight, MapPin, ImageOff, Star } from "lucide-react";
import { useState } from "react";

const gradients = [
  "from-purple-700/50 to-orange-600/40",
  "from-blue-700/50 to-cyan-600/40",
  "from-rose-700/50 to-pink-600/40",
  "from-emerald-700/50 to-teal-600/40",
  "from-indigo-700/50 to-violet-600/40",
  "from-amber-700/50 to-red-600/40",
];

export default function CultureCard({ lang, data, index, isUserLang, onClick }) {
  const grad = gradients[index % gradients.length];
  const [imgError, setImgError] = useState(false);

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl shadow-black/20 aspect-[3/4]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {!imgError ? (
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <ImageOff className="w-10 h-10 text-white/30" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${grad} via-black/40 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* User Language Badge */}
      {isUserLang && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold shadow-lg">
          <Star className="w-2.5 h-2.5 fill-white" />
          <span>Learning</span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{lang.flag}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 flex items-center gap-1 font-medium">
            <MapPin className="w-2.5 h-2.5" />
            {lang.region}
          </span>
        </div>
        <h3 className="text-lg font-heading font-bold text-white mb-1 leading-tight">{data.name}</h3>
        <p className="text-[11px] text-white/60 mb-2 line-clamp-2 hidden sm:block">
          {data.origins?.substring(0, 80)}...
        </p>
        <div className="flex items-center gap-1 text-[11px] text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.button>
  );
}