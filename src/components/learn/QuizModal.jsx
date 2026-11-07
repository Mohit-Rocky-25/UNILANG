import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Volume2,
  Mic,
  MicOff,
  Trophy,
  Zap,
  ArrowRight,
  Sparkles,
  BookOpen,
  PlusCircle,
  Clock,
  RotateCcw
} from "lucide-react";
import confetti from "canvas-confetti";
import api from "@/api/client";
import { scorePronunciation, normalizeText } from "@/lib/pronunciation";

export default function QuizModal({ open, onClose, lesson, onComplete, userProfile }) {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Exercise Sub-States
  // Sentence Reorder
  const [placedTokens, setPlacedTokens] = useState([]);
  const [availableTokens, setAvailableTokens] = useState([]);

  // Fill in the Blank
  const [textInput, setTextInput] = useState("");
  const [accentWarning, setAccentWarning] = useState(false);

  // Listen & Transcribe
  const [audioSpeed, setAudioSpeed] = useState(1.0);

  // Speaking Match
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState("");
  const [speechScore, setSpeechScore] = useState(null);
  const [micError, setMicError] = useState(null);
  const recognitionRef = useRef(null);

  const currentExercise = exercises[currentIndex];
  const targetLang = userProfile?.target_languages?.[0] || "es";

  // Load lesson exercises
  useEffect(() => {
    if (open && lesson) {
      setStartTime(Date.now());
      setCurrentIndex(0);
      setScore(0);
      setFinished(false);
      setShowResult(false);

      if (lesson.exercises && lesson.exercises.length > 0) {
        setExercises(lesson.exercises);
      } else {
        // Fallback default exercises if opened from a minimal item
        setExercises([
          {
            id: 'fallback-1',
            type: 'multi_choice',
            prompt: `What does '${lesson.title || "Hola"}' mean?`,
            options: ['Hello', 'Goodbye', 'Please', 'Water'],
            correct: 0,
            explanation: 'Standard greeting.'
          }
        ]);
      }
    }
  }, [open, lesson]);

  // Reset exercise state when question index changes
  useEffect(() => {
    if (!currentExercise) return;

    setSelectedAnswer(null);
    setShowResult(false);
    setTextInput("");
    setAccentWarning(false);
    setSpokenTranscript("");
    setSpeechScore(null);
    setMicError(null);

    if (currentExercise.type === 'sentence_reorder') {
      const allTokens = [...(currentExercise.tokens || []), ...(currentExercise.distractors || [])];
      // Shuffle available tokens
      setAvailableTokens(allTokens.sort(() => Math.random() - 0.5));
      setPlacedTokens([]);
    }
  }, [currentIndex, currentExercise]);

  // Audio Playback
  const playAudio = (text, speed = 1.0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang === 'es' ? 'es-ES' : targetLang === 'fr' ? 'fr-FR' : targetLang === 'de' ? 'de-DE' : targetLang === 'it' ? 'it-IT' : targetLang === 'ja' ? 'ja-JP' : 'en-US';
      utterance.rate = speed;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Submit Answer Handlers
  const handleAnswerSubmit = (isCorrect) => {
    setShowResult(true);
    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        const totalDuration = Math.round((Date.now() - startTime) / 1000);
        setTimeSpentSeconds(totalDuration);
        setFinished(true);

        const xp = lesson.xp || lesson.xpReward || 30;
        onComplete?.(lesson, score + (isCorrect ? 1 : 0), exercises.length);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }, 1600);
  };

  // Sentence Reorder Click Handlers
  const handleSelectToken = (token, index) => {
    setPlacedTokens([...placedTokens, token]);
    setAvailableTokens(availableTokens.filter((_, i) => i !== index));
  };

  const handleRemoveToken = (token, index) => {
    setAvailableTokens([...availableTokens, token]);
    setPlacedTokens(placedTokens.filter((_, i) => i !== index));
  };

  const handleCheckSentence = () => {
    const constructed = placedTokens.join(' ').trim();
    const correct = currentExercise.correctSentence.trim();
    const isCorrect = normalizeText(constructed) === normalizeText(correct);
    handleAnswerSubmit(isCorrect);
  };

  // Fill in the Blank Check
  const handleCheckFillBlank = () => {
    const entered = textInput.trim();
    const target = (currentExercise.correctWord || "").trim();
    const isExact = entered.toLowerCase() === target.toLowerCase();
    const isNormalized = normalizeText(entered) === normalizeText(target);

    if (!isExact && isNormalized) {
      setAccentWarning(true);
    }

    handleAnswerSubmit(isNormalized);
  };

  // Speech Recognition
  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError("Web Speech API is not supported in this browser. You can skip this exercise.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = targetLang === 'es' ? 'es-ES' : targetLang === 'fr' ? 'fr-FR' : targetLang === 'de' ? 'de-DE' : targetLang === 'it' ? 'it-IT' : targetLang === 'ja' ? 'ja-JP' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setMicError(null);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSpokenTranscript(transcript);
        setIsRecording(false);

        const target = currentExercise.targetText || currentExercise.prompt;
        const res = scorePronunciation(transcript, target);
        setSpeechScore(res);
        handleAnswerSubmit(res.isMatch);
      };

      recognition.onerror = (e) => {
        setIsRecording(false);
        setMicError("Microphone input was not detected or permission was denied. You may skip.");
      };

      recognition.start();
      recognitionRef.current = recognition;
    } catch (err) {
      setIsRecording(false);
      setMicError("Could not access microphone.");
    }
  };

  const handleAddAllToDeck = async () => {
    if (!lesson.vocabulary) return;
    for (const v of lesson.vocabulary) {
      await api.addVocabulary({
        langCode: targetLang,
        term: v.term,
        meaning: v.meaning,
        phonetic: v.phonetic,
        deck: lesson.title || 'Lesson Words'
      }).catch(() => {});
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-white/[0.08] max-w-xl p-0 overflow-hidden rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="p-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{lesson?.emoji || "📝"}</span>
              <div>
                <h3 className="font-heading font-bold text-base">{lesson?.title || "Lesson Quiz"}</h3>
                <p className="text-xs text-muted-foreground capitalize">
                  {lesson?.level || "A1"} · +{lesson?.xp || lesson?.xpReward || 30} XP
                </p>
              </div>
            </div>
            {!finished && exercises.length > 0 && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary/50 border border-white/[0.06]">
                {currentIndex + 1} / {exercises.length}
              </span>
            )}
          </div>

          {!finished && currentExercise ? (
            <div>
              {/* Exercise Type Indicator */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                  {currentExercise.type.replace('_', ' ')}
                </span>
                {currentExercise.hint && (
                  <span className="text-xs text-muted-foreground italic">
                    Hint: {currentExercise.hint}
                  </span>
                )}
              </div>

              {/* Prompt Text */}
              <h4 className="text-base font-semibold text-foreground mb-4 leading-relaxed">
                {currentExercise.prompt}
              </h4>

              {/* 1. MULTIPLE CHOICE */}
              {currentExercise.type === 'multi_choice' && (
                <div className="space-y-2.5 mb-4">
                  {currentExercise.options?.map((opt, i) => {
                    let btnStyle = "bg-secondary/20 border-white/[0.06] hover:bg-secondary/40 text-foreground";
                    if (showResult) {
                      if (i === currentExercise.correct) {
                        btnStyle = "bg-emerald-500/20 border-emerald-500/40 text-emerald-400";
                      } else if (i === selectedAnswer) {
                        btnStyle = "bg-rose-500/20 border-rose-500/40 text-rose-400";
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={showResult}
                        onClick={() => {
                          setSelectedAnswer(i);
                          handleAnswerSubmit(i === currentExercise.correct);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border font-medium text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {showResult && i === currentExercise.correct && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        {showResult && i === selectedAnswer && i !== currentExercise.correct && (
                          <XCircle className="w-4 h-4 text-rose-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 2. SENTENCE REORDER */}
              {currentExercise.type === 'sentence_reorder' && (
                <div>
                  {/* Construction Area */}
                  <div className="min-h-14 p-3 rounded-xl bg-secondary/30 border border-dashed border-white/[0.12] mb-4 flex flex-wrap gap-2 items-center">
                    {placedTokens.length === 0 ? (
                      <span className="text-xs text-muted-foreground">Tap word chips below to build the sentence...</span>
                    ) : (
                      placedTokens.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveToken(t, idx)}
                          className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:opacity-90"
                        >
                          {t}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {availableTokens.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectToken(t, idx)}
                        className="px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary/80 border border-white/[0.08] text-sm font-medium"
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={handleCheckSentence}
                    disabled={placedTokens.length === 0 || showResult}
                    className="w-full py-4 rounded-xl font-semibold bg-primary text-primary-foreground"
                  >
                    Check Sentence
                  </Button>
                </div>
              )}

              {/* 3. FILL IN THE BLANK */}
              {currentExercise.type === 'fill_blank' && (
                <div>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleCheckFillBlank()}
                      placeholder="Type the missing word here..."
                      className="w-full p-3.5 rounded-xl bg-secondary/30 border border-white/[0.1] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>

                  {accentWarning && (
                    <p className="text-xs text-amber-400 mb-3">
                      Almost perfect! Keep in mind the accent mark (e.g. á, é, í, ó, ú).
                    </p>
                  )}

                  <Button
                    onClick={handleCheckFillBlank}
                    disabled={!textInput.trim() || showResult}
                    className="w-full py-4 rounded-xl font-semibold bg-primary text-primary-foreground"
                  >
                    Submit Word
                  </Button>
                </div>
              )}

              {/* 4. LISTEN & TRANSCRIBE */}
              {currentExercise.type === 'listen_transcribe' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => playAudio(currentExercise.audioText, audioSpeed)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Play Audio</span>
                    </button>
                    {/* Speed Controls */}
                    <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-lg border border-white/[0.06]">
                      {[0.75, 1.0, 1.25].map(spd => (
                        <button
                          key={spd}
                          onClick={() => setAudioSpeed(spd)}
                          className={`px-2 py-1 text-xs rounded font-medium ${
                            audioSpeed === spd ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {spd}×
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(normalizeText(textInput) === normalizeText(currentExercise.correctWord))}
                    placeholder="Type what you hear..."
                    className="w-full p-3.5 rounded-xl bg-secondary/30 border border-white/[0.1] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 mb-4"
                  />

                  <Button
                    onClick={() => handleAnswerSubmit(normalizeText(textInput) === normalizeText(currentExercise.correctWord))}
                    disabled={!textInput.trim() || showResult}
                    className="w-full py-4 rounded-xl font-semibold bg-primary text-primary-foreground"
                  >
                    Check Transcription
                  </Button>
                </div>
              )}

              {/* 5. SPEAKING MATCH */}
              {currentExercise.type === 'speak_match' && (
                <div className="text-center py-2">
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Target phrase:</p>
                    <p className="text-xl font-heading font-bold text-primary">
                      {currentExercise.targetText}
                    </p>
                    {currentExercise.phonetic && (
                      <p className="text-xs text-muted-foreground/80 mt-1 italic">
                        [{currentExercise.phonetic}]
                      </p>
                    )}
                  </div>

                  {micError && (
                    <div className="p-3 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                      {micError}
                    </div>
                  )}

                  {spokenTranscript && (
                    <div className="mb-4 p-3 rounded-xl bg-secondary/30 text-xs">
                      <span className="text-muted-foreground">Heard: </span>
                      <span className="font-semibold text-foreground">"{spokenTranscript}"</span>
                      {speechScore && (
                        <span className="ml-2 px-2 py-0.5 rounded bg-primary/20 text-primary font-bold">
                          {speechScore.score}% match
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 justify-center mb-3">
                    <button
                      onClick={startRecording}
                      disabled={isRecording || showResult}
                      className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                        isRecording
                          ? "bg-rose-500 text-white animate-pulse"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      <Mic className="w-5 h-5" />
                      <span>{isRecording ? "Listening..." : "Tap & Speak"}</span>
                    </button>
                    <button
                      onClick={() => handleAnswerSubmit(true)}
                      className="px-4 py-3.5 rounded-xl bg-secondary/40 hover:bg-secondary/70 border border-white/[0.08] text-xs font-semibold text-muted-foreground"
                    >
                      Skip Speaking
                    </button>
                  </div>
                </div>
              )}

              {/* Explanation Callout */}
              {showResult && currentExercise.explanation && (
                <div className="mt-4 p-3.5 rounded-xl bg-secondary/30 border border-white/[0.06] text-xs text-foreground/90">
                  <span className="font-bold text-primary">Explanation: </span>
                  {currentExercise.explanation}
                </div>
              )}

              {/* Progress bar */}
              <div className="w-full bg-secondary/30 h-1.5 rounded-full overflow-hidden mt-6">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            /* LESSON COMPLETION SCREEN */
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/20 text-white">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-heading font-bold mb-1">Lesson Completed!</h4>
              <p className="text-sm text-muted-foreground mb-6">
                Excellent effort mastering this material.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto">
                <div className="glass-card p-3 text-center">
                  <Zap className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold font-heading">+{lesson?.xp || lesson?.xpReward || 30}</p>
                  <p className="text-[10px] text-muted-foreground">XP Gained</p>
                </div>
                <div className="glass-card p-3 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-xl font-bold font-heading">
                    {Math.round((score / Math.max(1, exercises.length)) * 100)}%
                  </p>
                  <p className="text-[10px] text-muted-foreground">Accuracy</p>
                </div>
                <div className="glass-card p-3 text-center">
                  <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <p className="text-xl font-bold font-heading">{Math.max(1, Math.round(timeSpentSeconds / 60))}m</p>
                  <p className="text-[10px] text-muted-foreground">Study Time</p>
                </div>
              </div>

              {lesson?.vocabulary && lesson.vocabulary.length > 0 && (
                <div className="mb-6 text-left p-4 rounded-xl bg-secondary/30 border border-white/[0.06]">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Vocabulary Unlocked ({lesson.vocabulary.length} words)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {lesson.vocabulary.map((v, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/[0.06]">
                        <span className="font-semibold text-primary">{v.term}</span>: {v.meaning}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                {lesson?.vocabulary && (
                  <Button
                    onClick={handleAddAllToDeck}
                    className="w-full py-5 rounded-xl font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add All Words to SRS Deck & Finish</span>
                  </Button>
                )}
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full py-5 rounded-xl font-semibold border-white/[0.1] text-foreground"
                >
                  Return to Lessons
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
