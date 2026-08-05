# SuperMemo SM-2 Interval Expansion Algorithm

This specification formalizes the spaced repetition memory retention model implemented in the UniLang vocabulary study engine.

## 1. Mathematical Formulation

The SuperMemo SM-2 algorithm calculates inter-repetition intervals based on recall quality grades ($q \in \{0, 1, 2, 3, 4, 5\}$).

### Ease Factor Update
$$EF' = EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))$$
Where:
- $EF$ is bounded below at $1.3$: $EF' = \max(1.3, EF')$.
- Initial $EF_0 = 2.5$.

### Interval Progression
$$I(n) = \begin{cases} 
1 & \text{if } n = 1 \\
6 & \text{if } n = 2 \\
I(n-1) \times EF & \text{if } n > 2 
\end{cases}$$

If $q < 3$ (failure), the repetition sequence resets: $n = 0, I(1) = 1$.

## 2. Retention Decay Curves & Scheduling

- Flashcard cards due within the current calendar UTC day are batched for priority review.
- Overdue reviews apply an exponential decay penalty to current retention confidence score.

