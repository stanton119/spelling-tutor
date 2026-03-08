import { words, Word } from '../data/words';

export const getWordsForLevel = (level: number): Word[] => {
  return words.filter(word => word.level === level);
};

export const getRandomWordForLevel = (level: number): Word => {
  const levelWords = getWordsForLevel(level);
  const randomIndex = Math.floor(Math.random() * levelWords.length);
  return levelWords[randomIndex];
};

export const getMultipleRandomWordsForLevel = (level: number, count: number): Word[] => {
  const levelWords = getWordsForLevel(level);
  const shuffled = [...levelWords].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
