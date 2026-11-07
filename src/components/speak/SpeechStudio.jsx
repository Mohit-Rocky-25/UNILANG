import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  Award,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scorePronunciation } from "@/lib/pronunciation";
import { PHONEME_DRILLS } from "@/data/speech/phonemeDrills";
import { toast } from "sonner";

export default function SpeechStudio({ userProfile, onXPGain }) {
  const targetLang = userProfile?.target_languages?.[0] || "es";
  const [selectedLang, setSelectedLang] = useState(targetLang);
  const drills = PHONEME_DRILLS[selectedLang] || PHONEME_DRILLS.es;
  const [activeDrillId, setActiveDrillId] = useState(drills[0]?.id);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(0.85);

  // Audio & Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [pronunciationResult, setPronunciationResult] = useState(null);
  const [isMicAvailable, setIsMicAvailable] = useState(true);

  // Canvas visualizer refs
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const recognitionRef = useRef(null);

  const activeDrill = drills.find(d => d.id === activeDrillId) || drills[0];
  const activeItem = activeDrill?.items?.[activeItemIndex] || activeDrill?.items?.[0];

  useEffect(() => {
    // Reset selection when language switches
    const nextDrills = PHONEME_DRILLS[selectedLang] || PHONEME_DRILLS.es;
    setActiveDrillId(nextDrills[0]?.id);
    setActiveItemIndex(0);
    setPronunciationResult(null);
    setRecognizedText("");
  }, [selectedLang]);

  // Clean up audio context on unmount
  useEffect(() => {
    return () => {
      stopAudioVisualizer();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  // Native Speech Playback
  const playNativeAudio = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed;
      utterance.lang = selectedLang === "es" ? "es-ES" : selectedLang === "fr" ? "fr-FR" : selectedLang === "de" ? "de-DE" : selectedLang === "it" ? "it-IT" : selectedLang === "ja" ? "ja-JP" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  // Audio Visualizer Setup
  const startAudioVisualizer = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      drawVisualizer();
      setIsMicAvailable(true);
      return true;
    } catch (err) {
      console.warn("Microphone access denied or unavailable for visualizer:", err);
      setIsMicAvailable(false);
      return false;
    }
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.fillStyle = "rgba(15, 23, 42, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

        // Gradient color: Cyan to Purple
        const r = Math.min(255, 60 + barHeight * 1.5);
        const g = Math.min(255, 120 + barHeight * 0.5);
        const b = 240;

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    renderFrame();
  };

  const stopAudioVisualizer = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
    }
  };

  // Start Recognition & Recording
  const handleStartRecording = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Web Speech Recognition is not supported in this browser.");
      return;
    }

    setRecognizedText("");
    setPronunciationResult(null);

    // Initialize Canvas visualizer
    await startAudioVisualizer();

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = selectedLang === "es" ? "es-ES" : selectedLang === "fr" ? "fr-FR" : selectedLang === "de" ? "de-DE" : selectedLang === "it" ? "it-IT" : selectedLang === "ja" ? "ja-JP" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);

      // Score pronunciation using Levenshtein distance
      const result = scorePronunciation(transcript, activeItem.word);
      setPronunciationResult(result);

      if (result.score >= 70) {
        onXPGain?.(15, `speech_${activeItem.word}`);
        toast.success(`Accurate Pronunciation! +15 XP (${result.score}%)`);
      } else {
        toast.info(`Accuracy: ${result.score}%. Listen to the native audio and retry!`);
      }
    };

    recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e.error);
      setIsRecording(false);
      stopAudioVisualizer();
      if (e.error === "not-allowed") {
        toast.error("Microphone permission denied.");
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      stopAudioVisualizer();
    };

    try {
      recognition.start();
    } catch (err) {
      console.warn("Failed to start speech recognition:", err);
      setIsRecording(false);
      stopAudioVisualizer();
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsRecording(false);
    stopAudioVisualizer();
  };

  return (
    <div className="space-y-6">
      {/* Phoneme selector tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {drills.map(drill => (
          <button
            key={drill.id}
            onClick={() => {
              setActiveDrillId(drill.id);
              setActiveItemIndex(0);
              setPronunciationResult(null);
              setRecognizedText("");
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border shrink-0 text-left transition-all ${
              activeDrillId === drill.id
                ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                : "bg-secondary/30 border-white/[0.04] text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            <span className="font-mono text-sm block font-bold">{drill.phoneme}</span>
            <span className="text-[11px] opacity-80">{drill.title}</span>
          </button>
        ))}
      </div>

      {/* Main Practice Studio Card */}
      <div className="glass-card-elevated p-6 rounded-3xl border border-white/[0.08] space-y-6">
        {/* Phoneme Guidance Tip */}
        <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-heading font-bold text-foreground">
              Articulation Coach: {activeDrill.title} ({activeDrill.phoneme})
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {activeDrill.tip}
            </p>
          </div>
        </div>

        {/* Word Carousel / Drill Selector */}
        <div className="flex gap-2">
          {activeDrill.items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveItemIndex(idx);
                setPronunciationResult(null);
                setRecognizedText("");
              }}
              className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                activeItemIndex === idx
                  ? "bg-card border-primary text-foreground shadow-sm"
                  : "bg-secondary/20 border-white/[0.04] text-muted-foreground hover:text-foreground"
              }`}
            >
              <p className="font-heading font-bold text-sm">{item.word}</p>
              <p className="text-[10px] text-muted-foreground italic font-mono">[{item.phonetic}]</p>
            </button>
          ))}
        </div>

        {/* Target Word Focus Banner */}
        <div className="text-center py-6 border-y border-white/[0.06] space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Target Expression
          </span>
          <h2 className="text-4xl font-heading font-black text-foreground tracking-tight">
            {activeItem.word}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/20">
              [{activeItem.phonetic}]
            </span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground italic">{activeItem.translation}</span>
          </div>

          <p className="text-xs text-muted-foreground/90 max-w-md mx-auto pt-1">
            "{activeItem.sentence}"
          </p>

          {/* Speed & Listen Controls */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              size="sm"
              onClick={() => playNativeAudio(activeItem.word)}
              className="rounded-xl px-5 text-xs font-semibold bg-white text-black hover:bg-white/90 shadow-sm flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4 text-primary" />
              <span>Listen to Model</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => playNativeAudio(activeItem.sentence)}
              className="rounded-xl text-xs font-medium border-white/[0.08] hover:bg-secondary/40"
            >
              <Play className="w-3.5 h-3.5 mr-1" />
              <span>Full Sentence</span>
            </Button>

            {/* Speed control */}
            <div className="flex items-center bg-secondary/40 p-0.5 rounded-xl border border-white/[0.06] text-xs">
              {[0.5, 0.75, 1.0].map(s => (
                <button
                  key={s}
                  onClick={() => setPlaybackSpeed(s)}
                  className={`px-2 py-0.5 rounded-lg font-medium transition-all ${
                    playbackSpeed === s ? "bg-card text-foreground font-bold shadow-xs" : "text-muted-foreground"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-Time Waveform Visualizer Canvas */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950/80 border border-white/[0.08] h-24 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={600}
            height={96}
            className="w-full h-full object-cover"
          />

          {!isRecording && !pronunciationResult && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-muted-foreground/60 text-xs">
              <span>Canvas audio visualizer activates when recording</span>
            </div>
          )}

          {isRecording && (
            <div className="absolute top-2 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-[10px] font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>LISTENING...</span>
            </div>
          )}
        </div>

        {/* Recording Action Button */}
        <div className="flex flex-col items-center justify-center gap-3">
          {!isRecording ? (
            <Button
              size="lg"
              onClick={handleStartRecording}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-bold rounded-2xl px-8 shadow-lg shadow-primary/25 flex items-center gap-2"
            >
              <Mic className="w-5 h-5 animate-bounce" />
              <span>Press & Speak "{activeItem.word}"</span>
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleStopRecording}
              className="bg-rose-500 hover:bg-rose-600 text-white font-heading font-bold rounded-2xl px-8 shadow-lg shadow-rose-500/25 flex items-center gap-2"
            >
              <MicOff className="w-5 h-5" />
              <span>Stop Recording & Evaluate</span>
            </Button>
          )}

          <span className="text-[11px] text-muted-foreground">
            Requires microphone permission · Powered by Web Audio API & Levenshtein Acoustic Alignment
          </span>
        </div>

        {/* Scoring & Feedback Drawer */}
        {pronunciationResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-5 rounded-2xl border ${
              pronunciationResult.score >= 75
                ? "bg-emerald-500/10 border-emerald-500/30"
                : pronunciationResult.score >= 50
                ? "bg-amber-500/10 border-amber-500/30"
                : "bg-rose-500/10 border-rose-500/30"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {pronunciationResult.score >= 75 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400" />
                )}
                <h4 className="text-base font-heading font-bold text-foreground">
                  Acoustic Similarity Score: {pronunciationResult.score}%
                </h4>
              </div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                pronunciationResult.score >= 75
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-amber-500/20 text-amber-300"
              }`}>
                {pronunciationResult.score >= 75 ? "Native Articulation" : "Approaching Accuracy"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-card border border-white/[0.06]">
                <p className="text-muted-foreground mb-0.5">Expected Target</p>
                <p className="font-heading font-bold text-foreground text-sm">{activeItem.word}</p>
                <p className="text-primary font-mono text-[11px] mt-0.5">[{activeItem.phonetic}]</p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-white/[0.06]">
                <p className="text-muted-foreground mb-0.5">Recognized Audio</p>
                <p className="font-heading font-bold text-foreground text-sm">
                  {recognizedText || "(silence or unrecognized)"}
                </p>
                <p className="text-muted-foreground text-[11px] mt-0.5">
                  Levenshtein distance: {pronunciationResult.distance}
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              {pronunciationResult.score >= 80
                ? "Excellent! Your articulation matches the native phoneme model with high precision."
                : pronunciationResult.score >= 60
                ? "Good attempt! Pay attention to the tongue position described in the articulation coach above."
                : "Listen closely to the 0.5x slow-motion model audio, exaggerate the mouth movement, and try again!"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
