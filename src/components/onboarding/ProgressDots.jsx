import { motion } from "framer-motion";

export default function ProgressDots({ total, current }) {
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-50">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === current ? 24 : 8,
            backgroundColor: i === current ? "hsl(217, 91%, 60%)" : i < current ? "hsl(142, 71%, 45%)" : "hsl(222, 30%, 22%)",
          }}
          className="h-2 rounded-full"
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}