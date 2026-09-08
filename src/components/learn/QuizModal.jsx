import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Zap, Trophy, BookOpen, Lightbulb } from "lucide-react";
import { getLessonContent } from "@/lib/lessonContent";
import confetti from "canvas-confetti";

export default function QuizModal({ open, onClose, lesson, onComplete, userProfile }) {
  const [phase, setPhase] = useState("learning"); // learning → quiz → results
  const [learningCards, setLearningCards] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);

  const targetLang = userProfile?.target_languages?.[0] || userProfile?.targetLanguages?.[0] || "es";

  const loadContent = () => {
    setLoading(true);
    const content = getLessonContent(targetLang);
    // Shuffle questions and pick 8
    const shuffledQuestions = [...content.questions].sort(() => Math.random() - 0.5).slice(0, 8);
    setLearningCards(content.learningCards);
    setQuestions(shuffledQuestions);
    setLoading(false);
  };

  if (open && !learningCards && !loading) {
    loadContent();
  }

  const resetState = () => {
    setPhase("learning");
    setLearningCards(null);
    setCurrentCard(0);
    setQuestions(null);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
  };

  const handleAnswer = (index) => {
    if (showResult || !questions) return;
    setSelected(index);
    setShowResult(true);
    if (index === questions[current].correct) setScore(s => s + 1);

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setFinished(true);
        if (score + (index === questions[current].correct ? 1 : 0) >= 6) {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
      }
    }, 1800);
  };

  const handleClose = () => {
    const finalScore = score + (finished ? 0 : 0);
    onComplete(lesson, finalScore, questions?.length || 10);
    resetState();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-white/[0.06] max-w-lg p-0 overflow-hidden rounded-2xl shadow-2xl shadow-black/40 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{lesson?.emoji || "📝"}</span>
            <div>
              <h3 className="font-heading font-bold text-lg">{lesson?.title || "Lesson"}</h3>
              <p className="text-sm text-muted-foreground capitalize">{lesson?.level || "beginner"} · +{lesson?.xp || 0} XP</p>
            </div>
          </div>

          {loading && (
            <div className="flex flex-col items-center py-12 gap-4">
              <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm">Creating your personalized lesson...</p>
            </div>
          )}

          {/* LEARNING PHASE */}
          {!loading && phase === "learning" && learningCards && (
            <>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">Learning Phase</span>
                <span className="text-xs text-muted-foreground ml-auto">{currentCard + 1} of {learningCards.length}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCard}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="glass-card p-6 mb-4"
                >
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">English</p>
                  <p className="text-xl font-bold mb-4">{learningCards[currentCard].english}</p>
                  
                  <p className="text-xs text-primary mb-2 uppercase tracking-wider">Translation</p>
                  <p className="text-2xl font-heading font-bold mb-4 text-primary">{learningCards[currentCard].target}</p>
                  
                  <p className="text-xs text-amber-400 mb-2 uppercase tracking-wider">Pronunciation</p>
                  <p className="text-lg text-amber-300 mb-4">{learningCards[currentCard].pronunciation}</p>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{learningCards[currentCard].tip}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3">
                {currentCard > 0 && (
                  <Button variant="outline" onClick={() => setCurrentCard(c => c - 1)} className="flex-1 rounded-xl border-white/[0.08]">
                    Previous
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (currentCard < learningCards.length - 1) {
                      setCurrentCard(c => c + 1);
                    } else {
                      setPhase("quiz");
                      setCurrent(0);
                    }
                  }}
                  className="flex-1 bg-white text-black hover:bg-white/90 rounded-xl font-semibold"
                >
                  {currentCard < learningCards.length - 1 ? "Next Card" : "Start Quiz →"}
                </Button>
              </div>
            </>
          )}

          {/* QUIZ PHASE */}
          {!loading && phase === "quiz" && questions && !finished && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold text-amber-400">Quiz</span>
                <span className="text-xs text-muted-foreground ml-auto">{current + 1} of {questions.length}</span>
              </div>
              <div className="flex gap-1 mb-6">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i < current ? "bg-green-500" : i === current ? "bg-primary" : "bg-muted"
                  }`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <p className="text-lg font-semibold mb-5 leading-relaxed">{questions[current].question}</p>
                  <div className="space-y-2.5">
                    {questions[current].options.map((opt, i) => {
                      let cls = "bg-secondary/30 border-transparent hover:bg-secondary/50";
                      if (showResult) {
                        if (i === questions[current].correct) cls = "bg-green-500/15 border-green-500/40";
                        else if (i === selected) cls = "bg-red-500/15 border-red-500/40";
                      }
                      return (
                        <motion.button
                          key={i}
                          whileHover={!showResult ? { scale: 1.01 } : {}}
                          onClick={() => handleAnswer(i)}
                          className={`w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all ${cls}`}
                        >
                          <span className="w-7 h-7 rounded-full bg-background border border-white/[0.06] flex items-center justify-center text-xs font-medium flex-shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm">{opt}</span>
                          {showResult && i === questions[current].correct && <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />}
                          {showResult && i === selected && i !== questions[current].correct && <XCircle className="w-4 h-4 text-red-500 ml-auto flex-shrink-0" />}
                        </motion.button>
                      );
                    })}
                  </div>
                  {showResult && questions[current].explanation && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm text-muted-foreground bg-muted/30 p-3 rounded-xl border border-white/[0.04]"
                    >
                      {questions[current].explanation}
                    </motion.p>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {/* RESULTS */}
          {finished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
                <Trophy className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-2">Lesson Complete!</h3>
              <p className="text-muted-foreground mb-1">You scored {score} out of {questions.length}</p>
              <p className="text-xs text-muted-foreground mb-4">
                {score >= 8 ? "Excellent! You're a natural!" : score >= 5 ? "Good job! Keep practicing!" : "Keep learning, you'll improve!"}
              </p>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary">+{lesson?.xp || 50} XP earned</span>
              </div>
              <Button
                onClick={handleClose}
                className="bg-white text-black hover:bg-white/90 rounded-xl px-8 font-semibold shadow-lg transition-all hover:scale-105"
              >
                Continue
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}