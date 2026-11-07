// Gamification Engine: 30+ Badges across 5 Tiers, Quests & Weekly Leagues Leaderboard

export const BADGE_TIERS = {
  BRONZE: { label: 'Bronze', color: 'from-amber-700 to-amber-900', border: 'border-amber-700/50' },
  SILVER: { label: 'Silver', color: 'from-slate-300 to-slate-500', border: 'border-slate-400/50' },
  GOLD: { label: 'Gold', color: 'from-amber-300 to-amber-500', border: 'border-amber-400/50' },
  PLATINUM: { label: 'Platinum', color: 'from-cyan-300 to-blue-500', border: 'border-cyan-400/50' },
  DIAMOND: { label: 'Diamond', color: 'from-fuchsia-400 to-indigo-600', border: 'border-fuchsia-400/50' }
};

export const ALL_BADGES = [
  // --- BRONZE (Trivial / Starter) ---
  { id: 'b1', tier: 'BRONZE', title: 'First Step', icon: '🌱', desc: 'Complete your first lesson', reqType: 'lessons', reqVal: 1 },
  { id: 'b2', tier: 'BRONZE', title: 'Spark', icon: '🔥', desc: 'Reach a 3-day study streak', reqType: 'streak', reqVal: 3 },
  { id: 'b3', tier: 'BRONZE', title: 'Curious Mind', icon: '📖', desc: 'Save 5 words to your SRS vocabulary deck', reqType: 'vocab', reqVal: 5 },
  { id: 'b4', tier: 'BRONZE', title: 'First Voice', icon: '🎙️', desc: 'Complete 1 pronunciation drill', reqType: 'speech', reqVal: 1 },
  { id: 'b5', tier: 'BRONZE', title: 'Explorer', icon: '🗺️', desc: 'Explore your first cultural article', reqType: 'culture', reqVal: 1 },
  { id: 'b6', tier: 'BRONZE', title: 'Early Bird', icon: '🌅', desc: 'Complete a study session before 8:00 AM', reqType: 'time', reqVal: 1 },

  // --- SILVER (Consistent Habit) ---
  { id: 's1', tier: 'SILVER', title: 'Habitual Learner', icon: '⚡', desc: 'Reach a 7-day study streak', reqType: 'streak', reqVal: 7 },
  { id: 's2', tier: 'SILVER', title: 'Word Builder', icon: '🧠', desc: 'Master 25 words in your SRS queue', reqType: 'vocab', reqVal: 25 },
  { id: 's3', tier: 'SILVER', title: 'Grammar Apprentice', icon: '📝', desc: 'Complete 5 grammar conjugation exercises', reqType: 'grammar', reqVal: 5 },
  { id: 's4', tier: 'SILVER', title: 'Parallel Reader', icon: '📚', desc: 'Read 2 dual-language articles', reqType: 'reading', reqVal: 2 },
  { id: 's5', tier: 'SILVER', title: 'Century Club', icon: '💯', desc: 'Score 100% on any 3 lesson quizzes', reqType: 'score', reqVal: 3 },
  { id: 's6', tier: 'SILVER', title: 'Travel Ready', icon: '✈️', desc: 'Practice 10 phrases from the emergency phrasebook', reqType: 'phrasebook', reqVal: 10 },

  // --- GOLD (Substantial Mastery) ---
  { id: 'g1', tier: 'GOLD', title: 'Iron Will', icon: '🛡️', desc: 'Maintain a 30-day streak unbroken', reqType: 'streak', reqVal: 30 },
  { id: 'g2', tier: 'GOLD', title: 'Lexicon Master', icon: '🏛️', desc: 'Accumulate 100 active vocabulary words', reqType: 'vocab', reqVal: 100 },
  { id: 'g3', tier: 'GOLD', title: 'Polyglot Seed', icon: '🌐', desc: 'Study in 3 distinct languages', reqType: 'languages', reqVal: 3 },
  { id: 'g4', tier: 'GOLD', title: 'Acoustic Clarity', icon: '🎯', desc: 'Achieve 90%+ pronunciation accuracy on 5 drills', reqType: 'speech_acc', reqVal: 5 },
  { id: 'g5', tier: 'GOLD', title: 'Cultural Historian', icon: '🏺', desc: 'Complete 3 regional culture quizzes with full score', reqType: 'culture_quiz', reqVal: 3 },
  { id: 'g6', tier: 'GOLD', title: 'Speed Reader', icon: '⚡', desc: 'Finish 10 reading studio comprehension quizzes', reqType: 'reading', reqVal: 10 },

  // --- PLATINUM (Exceptional Dedication) ---
  { id: 'p1', tier: 'PLATINUM', title: 'Centurion', icon: '⚔️', desc: 'Achieve a 100-day study streak', reqType: 'streak', reqVal: 100 },
  { id: 'p2', tier: 'PLATINUM', title: 'Living Dictionary', icon: '📜', desc: 'Retain 300 words with >90% memory stability', reqType: 'vocab', reqVal: 300 },
  { id: 'p3', tier: 'PLATINUM', title: 'Fluent Diplomat', icon: '🤝', desc: 'Hold 10 full AI roleplay conversation sessions', reqType: 'ai_turns', reqVal: 10 },
  { id: 'p4', tier: 'PLATINUM', title: 'Night Owl Legend', icon: '🦉', desc: 'Complete 15 study sessions after 10:00 PM', reqType: 'time', reqVal: 15 },
  { id: 'p5', tier: 'PLATINUM', title: 'Grammar Architect', icon: '📐', desc: 'Analyze 50 complex sentences in the grammar studio', reqType: 'grammar', reqVal: 50 },
  { id: 'p6', tier: 'PLATINUM', title: 'League Champion', icon: '🏆', desc: 'Finish in the top 3 of your weekly league', reqType: 'league', reqVal: 3 },

  // --- DIAMOND (Pinnacle & Elite) ---
  { id: 'd1', tier: 'DIAMOND', title: '365 Legend', icon: '👑', desc: 'An unbroken 365-day year of daily learning', reqType: 'streak', reqVal: 365 },
  { id: 'd2', tier: 'DIAMOND', title: 'Polyglot Maestro', icon: '🌍', desc: 'Achieve CEFR A2 or higher across 5 languages', reqType: 'languages', reqVal: 5 },
  { id: 'd3', tier: 'DIAMOND', title: 'Flawless Orator', icon: '💎', desc: 'Attain 95%+ acoustic pronunciation score on 25 drills', reqType: 'speech_acc', reqVal: 25 },
  { id: 'd4', tier: 'DIAMOND', title: 'Universal Scholar', icon: '✨', desc: 'Earn 10,000 Total Lifetime XP', reqType: 'xp', reqVal: 10000 },
  { id: 'd5', tier: 'DIAMOND', title: 'Apex League Titan', icon: '🌌', desc: 'Promote into the Diamond League', reqType: 'league_tier', reqVal: 5 },
  { id: 'd6', tier: 'DIAMOND', title: 'Grandmaster of Culture', icon: '🏯', desc: 'Pass every cultural and etiquette assessment', reqType: 'culture_all', reqVal: 5 }
];

export const DAILY_QUESTS = [
  { id: 'q1', title: 'Daily Vocabulary Review', desc: 'Review 10 flashcards in Spaced Repetition', target: 10, current: 8, rewardXp: 20, icon: '🧠' },
  { id: 'q2', title: 'Acoustic Precision', desc: 'Complete 2 speech pronunciation drills', target: 2, current: 1, rewardXp: 15, icon: '🎙️' },
  { id: 'q3', title: 'Knowledge Sprint', desc: 'Earn 50 XP across any modules today', target: 50, current: 50, rewardXp: 25, icon: '⚡', completed: true },
  { id: 'q4', title: 'Cultural Immersion', desc: 'Read 1 parallel reading story or culture article', target: 1, current: 1, rewardXp: 15, icon: '📖', completed: true }
];

export const LEAGUE_TIERS = ['Bronze', 'Silver', 'Gold', 'Sapphire', 'Diamond'];

// Deterministic realistic leaderboard generation
export function generateLeagueLeaderboard(userXp = 450, userName = 'Alex Morgan', tier = 'Gold') {
  const BOT_NAMES = [
    { name: 'Elena Rostova', flag: '🇪🇸', base: 620 },
    { name: 'Kenji Sato', flag: '🇯🇵', base: 590 },
    { name: 'Lucas Martin', flag: '🇫🇷', base: 560 },
    { name: 'Sophie Weber', flag: '🇩🇪', base: 530 },
    { name: 'Marco Rossi', flag: '🇮🇹', base: 510 },
    { name: 'Priya Sharma', flag: '🇮🇳', base: 480 },
    { name: 'David Kim', flag: '🇰🇷', base: 460 },
    { name: 'Camila Silva', flag: '🇧🇷', base: 430 },
    { name: 'Lars Nygård', flag: '🇳🇴', base: 410 },
    { name: 'Chloe Dubois', flag: '🇫🇷', base: 390 },
    { name: 'Mateo Hernández', flag: '🇲🇽', base: 375 },
    { name: 'Fatima Al-Mansoor', flag: '🇦🇪', base: 360 },
    { name: 'Hans Gruber', flag: '🇦🇹', base: 340 },
    { name: 'Giulia Bianchi', flag: '🇮🇹', base: 320 },
    { name: 'Yuki Tanaka', flag: '🇯🇵', base: 305 },
    { name: 'Liam O’Connor', flag: '🇮🇪', base: 290 },
    { name: 'Zoya Ivanova', flag: '🇷🇺', base: 270 },
    { name: 'Chen Wei', flag: '🇨🇳', base: 250 },
    { name: 'Ananya Patel', flag: '🇮🇳', base: 235 },
    { name: 'Diego Torres', flag: '🇪🇸', base: 220 },
    { name: 'Emma Watson', flag: '🇬🇧', base: 200 },
    { name: 'Noah Müller', flag: '🇩🇪', base: 180 },
    { name: 'Mia Andersen', flag: '🇩🇰', base: 165 },
    { name: 'Carlos Mendez', flag: '🇨🇱', base: 150 },
    { name: 'Leila Benali', flag: '🇲🇦', base: 130 },
    { name: 'Oliver Smith', flag: '🇨🇦', base: 110 },
    { name: 'Sara Lind', flag: '🇸🇪', base: 95 },
    { name: 'Tariq Hassan', flag: '🇪🇬', base: 80 },
    { name: 'Katarina Novak', flag: '🇨🇿', base: 60 }
  ];

  // User participant
  const userEntry = {
    id: 'user_self',
    name: userName,
    flag: '⭐',
    xp: userXp,
    isUser: true,
    streak: 7
  };

  const allParticipants = [
    userEntry,
    ...BOT_NAMES.map((b, idx) => ({
      id: `bot_${idx}`,
      name: b.name,
      flag: b.flag,
      xp: b.base,
      isUser: false,
      streak: Math.max(1, (idx * 3) % 18 + 1)
    }))
  ];

  // Sort descending by XP
  allParticipants.sort((a, b) => b.xp - a.xp);

  // Assign ranks & promotion / demotion status (Top 5 promote, bottom 5 demote)
  return allParticipants.map((p, idx) => {
    const rank = idx + 1;
    let zone = 'safe';
    if (rank <= 5) zone = 'promotion';
    else if (rank >= 26) zone = 'demotion';

    return {
      ...p,
      rank,
      zone
    };
  });
}

