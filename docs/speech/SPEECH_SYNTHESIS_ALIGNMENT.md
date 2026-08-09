# Web Speech API Synthesis & Alignment Matrix

This document defines the phonetic alignment, pitch modulation, and fallback cascade for the UniLang Speech Studio.

## 1. Engine Fallback Cascade

1. **Browser Native SpeechSynthesis (Client Tier):**
   - Direct low-latency execution using browser-embedded neural voices where available (`es-ES`, `fr-FR`, `de-DE`, `ja-JP`, `zh-CN`).
2. **Server-Side Fallback Tier:**
   - In environments where local voices are unavailable or speech synthesis permissions are restricted, requests route through the backend proxy.

## 2. Phonetic Alignment Calibration

- Pitch: Standardized at $1.0$, adjustable between $0.8$ (drill mode) and $1.2$.
- Rate / Speed: Calibrated to $0.85\times$ for A1/A2 learners, scaling up to natural $1.0\times$ for B2/C1.
- Levenshtein Pronunciation Scoring: Phonetic distance calculated against normalized target transcript with silence trimming.

