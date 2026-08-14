# Right-to-Left (RTL) Layout Standards & Bidirectional Text Specification

Guidelines for handling bidirectional script rendering across Arabic, Hebrew, Urdu, and Persian language modules in UniLang.

## 1. CSS Logical Properties

All layout components must use CSS logical properties instead of physical directions:
- `margin-inline-start` / `margin-inline-end` instead of `margin-left` / `margin-right`.
- `padding-inline-start` / `padding-inline-end` instead of `padding-left` / `padding-right`.
- `inset-inline-start` / `inset-inline-end` for absolute and relative positioning.

## 2. Dynamic Direction Switching

- When target language script direction is `rtl`, the main interactive container sets `dir="rtl"`.
- Code snippets, numeric scores, and Latin transcription phonetics retain explicit `dir="ltr"` boundaries using unicode-bidi isolation (`<bdi>`).

