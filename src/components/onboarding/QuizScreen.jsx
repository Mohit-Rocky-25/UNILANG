import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

import { getRandomQuizQuestions } from "@/lib/languageData";

export default function QuizScreen({ onComplete, onBack, targetLanguages }) {
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Pick 5 random questions specific to the user's selected languages
    setQuestions(getRandomQuizQuestions(5, targetLanguages));
    setLoading(false);
  }, [targetLanguages]);

  const question = questions?.[current];

  const handleAnswer = (index) => {
    if (showResult || !question) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const newScore = score + (index === question.correct ? 1 : 0);
    if (index === question.correct) setScore(newScore);

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const finalScore = index === question.correct ? newScore : score;
        const level = finalScore >= 4 ? "intermediate" : finalScore >= 2 ? "beginner" : "beginner";
        onComplete(level, finalScore);
      }
    }, 1200);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        className="min-h-screen flex flex-col items-center pt-12 pb-24 px-6 justify-center"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Generating your placement quiz...</p>
      </motion.div>
    );
  }

  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col items-center pt-12 pb-24 px-6"
    >
      <h2 className="text-3xl font-heading font-bold text-center mb-2 tracking-tight">
        Placement Quiz
      </h2>
      <p className="text-muted-foreground mb-8">Let's find your starting level</p>

      {/* Progress */}
      <div className="w-full max-w-md flex gap-2 mb-8">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i < current ? "bg-green-500" : i === current ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>

      <div className="text-sm text-muted-foreground mb-4">
        Question {current + 1} of {questions.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-6 mb-6">
            <h3 className="text-xl font-semibold text-center">{question.question}</h3>
          </div>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              let bgClass = "bg-secondary/30 hover:bg-secondary/50 border-transparent";
              if (showResult) {
                if (i === question.correct) bgClass = "bg-green-500/15 border-green-500/40";
                else if (i === selectedAnswer) bgClass = "bg-red-500/15 border-red-500/40";
              } else if (i === selectedAnswer) {
                bgClass = "bg-primary/15 border-primary/40";
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${bgClass}`}
                >
                  <span className="w-8 h-8 rounded-full bg-background border border-white/[0.06] flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-medium">{option}</span>
                  {showResult && i === question.correct && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                  )}
                  {showResult && i === selectedAnswer && i !== question.correct && (
                    <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-8">
        <Button variant="outline" onClick={onBack} className="rounded-xl px-6">Back</Button>
      </div>
    </motion.div>
  );
}