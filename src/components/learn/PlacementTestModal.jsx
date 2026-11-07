import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Compass, CheckCircle2, XCircle, Volume2, Award, ArrowRight, Sparkles } from 'lucide-react';
import api from '@/api/client';
import confetti from 'canvas-confetti';

const PLACEMENT_QUESTIONS = [
  // A1 Questions (Questions 1-5)
  {
    id: 'pq-1',
    level: 'A1',
    category: 'Vocabulary',
    prompt: "Which word means 'Thank you' in Spanish?",
    options: ['Por favor', 'Gracias', 'De nada', 'Hola'],
    correct: 1,
    explanation: "'Gracias' means thank you."
  },
  {
    id: 'pq-2',
    level: 'A1',
    category: 'Grammar',
    prompt: "Choose the correct form: 'Yo _____ estudiante de idiomas.'",
    options: ['soy', 'eres', 'es', 'somos'],
    correct: 0,
    explanation: "'Yo soy' is the first person singular present of ser."
  },
  {
    id: 'pq-3',
    level: 'A1',
    category: 'Listening',
    prompt: "Listen and identify the item: 'Una botella de agua'",
    audioText: 'Una botella de agua',
    options: ['A bottle of water', 'A cup of tea', 'A glass of milk', 'A loaf of bread'],
    correct: 0
  },
  {
    id: 'pq-4',
    level: 'A1',
    category: 'Reading',
    prompt: "Read the sign: 'Abierto de 9:00 a 20:00'. What does this mean?",
    options: ['Open from 9:00 to 20:00', 'Closed until 20:00', 'Reserved from 9:00', 'Emergency exit'],
    correct: 0
  },
  {
    id: 'pq-5',
    level: 'A1',
    category: 'Vocabulary',
    prompt: "How do you ask 'How much is it?'",
    options: ['¿Cuánto cuesta?', '¿Dónde está?', '¿Qué hora es?', '¿Cómo te llamas?'],
    correct: 0
  },

  // A2 Questions (Questions 6-10)
  {
    id: 'pq-6',
    level: 'A2',
    category: 'Grammar',
    prompt: "Choose the correct past tense: 'Ayer nosotros _____ al cine.' (ir)",
    options: ['fuimos', 'vamos', 'íbamos', 'iremos'],
    correct: 0,
    explanation: "'Fuimos' is the preterite of ir for nosotros."
  },
  {
    id: 'pq-7',
    level: 'A2',
    category: 'Vocabulary',
    prompt: "What does 'un billete de ida y vuelta' mean at a train station?",
    options: ['A round-trip ticket', 'A one-way ticket', 'A delayed train', 'A platform pass'],
    correct: 0
  },
  {
    id: 'pq-8',
    level: 'A2',
    category: 'Reading',
    prompt: "Read: 'El paciente debe tomar este medicamento dos veces al día después de comer.' What is instructed?",
    options: ['Take this medicine twice a day after meals', 'Take this medicine once before sleeping', 'Only take when in severe pain', 'Avoid taking with water'],
    correct: 0
  },
  {
    id: 'pq-9',
    level: 'A2',
    category: 'Listening',
    prompt: "Listen and identify the time: 'El vuelo sale a las ocho y media'",
    audioText: 'El vuelo sale a las ocho y media',
    options: ['Flight leaves at 8:30', 'Flight arrives at 7:45', 'Flight is delayed by 8 hours', 'Flight leaves at 9:15'],
    correct: 0
  },
  {
    id: 'pq-10',
    level: 'A2',
    category: 'Grammar',
    prompt: "Choose the correct pronoun: '¿Has visto mi libro? No, no _____ he visto.'",
    options: ['lo', 'la', 'le', 'los'],
    correct: 0,
    explanation: "'Libro' is masculine singular direct object, so 'lo' is used."
  },

  // B1 / B2 Questions (Questions 11-15)
  {
    id: 'pq-11',
    level: 'B1',
    category: 'Grammar',
    prompt: "Complete with the correct subjunctive mood: 'Dudo que él _____ a tiempo.' (llegar)",
    options: ['llegue', 'llega', 'llegó', 'llegará'],
    correct: 0,
    explanation: "Doubt (dudo que) triggers the subjunctive 'llegue'."
  },
  {
    id: 'pq-12',
    level: 'B1',
    category: 'Reading',
    prompt: "Read: 'A pesar de las dificultades climáticas, la expedición logró alcanzar la cumbre.' What happened?",
    options: ['Despite the weather difficulties, they reached the summit', 'The expedition was cancelled due to snow', 'They had to turn back halfway', 'They are still waiting at basecamp'],
    correct: 0
  },
  {
    id: 'pq-13',
    level: 'B2',
    category: 'Grammar',
    prompt: "Select the hypothetical conditional: 'Si tuviera más tiempo libre, _____ más idiomas.' (aprender)",
    options: ['aprendería', 'aprenderé', 'aprendí', 'haya aprendido'],
    correct: 0,
    explanation: "Imperfect subjunctive (si tuviera) requires conditional (aprendería)."
  },
  {
    id: 'pq-14',
    level: 'B2',
    category: 'Vocabulary',
    prompt: "What does the Spanish idiom 'costar un ojo de la cara' signify?",
    options: ['To be extremely expensive', 'To require intense focus', 'To cause eye pain', 'To be very beautiful'],
    correct: 0
  },
  {
    id: 'pq-15',
    level: 'B2',
    category: 'Listening',
    prompt: "Listen and interpret: 'Es imprescindible que tomemos una decisión de inmediato'",
    audioText: 'Es imprescindible que tomemos una decisión de inmediato',
    options: ['It is essential that we make a decision immediately', 'We should postpone the decision until tomorrow', 'The decision has already been approved', 'Nobody wants to take responsibility'],
    correct: 0
  }
];

export default function PlacementTestModal({ open, onClose, onLevelAssigned, targetLang = 'es' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [assignedLevel, setAssignedLevel] = useState('A1');

  const currentQ = PLACEMENT_QUESTIONS[currentStep];

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelect = (idx) => {
    if (showFeedback) return;
    setSelectedOption(idx);
    setShowFeedback(true);

    const isCorrect = idx === currentQ.correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(() => {
      if (currentStep < PLACEMENT_QUESTIONS.length - 1) {
        setCurrentStep(c => c + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        // Compute assigned CEFR Level
        let level = 'A1';
        if (newScore >= 12) level = 'B2';
        else if (newScore >= 8) level = 'B1';
        else if (newScore >= 5) level = 'A2';
        else level = 'A1';

        setAssignedLevel(level);
        setFinished(true);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

        // Persist to backend API & local preferences
        api.updatePreferences({ cefrLevel: level }).catch(() => {});
        onLevelAssigned?.(level);
      }
    }, 1200);
  };

  const handleDone = () => {
    onClose();
    setCurrentStep(0);
    setScore(0);
    setFinished(false);
    setShowFeedback(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-white/[0.08] max-w-lg p-0 overflow-hidden rounded-2xl shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base">Adaptive Placement Assessment</h3>
                <p className="text-xs text-muted-foreground">Finding your ideal starting level</p>
              </div>
            </div>
            {!finished && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/50 border border-white/[0.06]">
                {currentStep + 1} / {PLACEMENT_QUESTIONS.length}
              </span>
            )}
          </div>

          {!finished ? (
            <div>
              {/* Category & Level Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                  {currentQ.level}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {currentQ.category}
                </span>
              </div>

              {/* Prompt */}
              <h4 className="text-base font-semibold text-foreground mb-4 leading-relaxed">
                {currentQ.prompt}
              </h4>

              {/* Audio button if listening question */}
              {currentQ.audioText && (
                <button
                  onClick={() => playAudio(currentQ.audioText)}
                  className="mb-4 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary/40 hover:bg-secondary/70 border border-white/[0.08] text-sm text-foreground transition-all"
                >
                  <Volume2 className="w-4 h-4 text-primary" />
                  <span>Play Audio Prompt</span>
                </button>
              )}

              {/* Options */}
              <div className="space-y-2.5 mb-4">
                {currentQ.options.map((opt, i) => {
                  let btnStyle = "bg-secondary/20 border-white/[0.06] hover:bg-secondary/40 text-foreground";
                  if (showFeedback) {
                    if (i === currentQ.correct) {
                      btnStyle = "bg-emerald-500/20 border-emerald-500/40 text-emerald-400";
                    } else if (i === selectedOption) {
                      btnStyle = "bg-rose-500/20 border-rose-500/40 text-rose-400";
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={showFeedback}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-3.5 rounded-xl border font-medium text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showFeedback && i === currentQ.correct && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                      {showFeedback && i === selectedOption && i !== currentQ.correct && (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-secondary/30 h-1.5 rounded-full overflow-hidden mt-6">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / PLACEMENT_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20 text-white">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-heading font-bold mb-1">Assessment Complete!</h4>
              <p className="text-sm text-muted-foreground mb-6">
                You scored {score} out of {PLACEMENT_QUESTIONS.length}
              </p>

              <div className="glass-card-elevated p-6 mb-6 text-center max-w-xs mx-auto">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Your CEFR Baseline
                </p>
                <p className="text-4xl font-heading font-black text-primary mb-1">
                  {assignedLevel}
                </p>
                <p className="text-xs text-foreground/80 font-medium">
                  {assignedLevel === 'A1' && 'Beginner · Foundations'}
                  {assignedLevel === 'A2' && 'Elementary · Waystage Explorer'}
                  {assignedLevel === 'B1' && 'Intermediate · Independent Speaker'}
                  {assignedLevel === 'B2' && 'Upper Intermediate · Fluent Communicator'}
                </p>
              </div>

              <Button
                onClick={handleDone}
                className="w-full py-5 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <span>Start Learning at {assignedLevel}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
