import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type GameType = 'wordToPicture' | 'pictureToSpelling' | 'missingLetter' | 'hangman';

export interface GameStats {
  level: number;
  streak: number;
  highScore: number;
}

export interface Stats {
  games: {
    [key in GameType]: GameStats;
  };
  totalPoints: number;
}

interface TutorContextType {
  stats: Stats;
  updateStats: (game: GameType, correct: boolean) => void;
  resetStats: () => void;
}

const defaultStats: Stats = {
  games: {
    wordToPicture: { level: 1, streak: 0, highScore: 0 },
    pictureToSpelling: { level: 1, streak: 0, highScore: 0 },
    missingLetter: { level: 1, streak: 0, highScore: 0 },
    hangman: { level: 1, streak: 0, highScore: 0 },
  },
  totalPoints: 0,
};

const TutorContext = createContext<TutorContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'spelling-tutor-stats';

export const TutorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const updateStats = (game: GameType, correct: boolean) => {
    setStats((prev) => {
      const gameStats = prev.games[game];
      const newStreak = correct ? gameStats.streak + 1 : 0;
      
      // Level up every 5 correct answers in a row, or something similar
      let newLevel = gameStats.level;
      if (correct && newStreak > 0 && newStreak % 5 === 0) {
        newLevel = Math.min(newLevel + 1, 5);
      }

      const newHighScore = Math.max(gameStats.highScore, newStreak);

      return {
        ...prev,
        games: {
          ...prev.games,
          [game]: {
            level: newLevel,
            streak: newStreak,
            highScore: newHighScore,
          },
        },
        totalPoints: correct ? prev.totalPoints + 10 : prev.totalPoints,
      };
    });
  };

  const resetStats = () => {
    setStats(defaultStats);
  };

  return (
    <TutorContext.Provider value={{ stats, updateStats, resetStats }}>
      {children}
    </TutorContext.Provider>
  );
};

export const useTutorStats = () => {
  const context = useContext(TutorContext);
  if (context === undefined) {
    throw new Error('useTutorStats must be used within a TutorProvider');
  }
  return context;
};
