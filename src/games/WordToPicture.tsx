import React, { useState, useEffect } from 'react';
import { useTutorStats } from '../context/TutorContext';
import { getMultipleRandomWordsForLevel, getRandomWordForLevel } from '../utils/wordSelector';
import { type Word } from '../data/words';
import { playCorrect, playIncorrect } from '../utils/audio';
import './WordToPicture.css';

const WordToPicture: React.FC = () => {
  const { stats, updateStats } = useTutorStats();
  const currentLevel = stats.games.wordToPicture.level;
  
  const [targetWord, setTargetWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const setupRound = () => {
    const target = getRandomWordForLevel(currentLevel);
    const others = getMultipleRandomWordsForLevel(currentLevel, 4)
      .filter(w => w.id !== target.id)
      .slice(0, 3);
    
    const allOptions = [...others, target].sort(() => 0.5 - Math.random());
    
    setTargetWord(target);
    setOptions(allOptions);
    setFeedback(null);
    setIsProcessing(false);
  };

  useEffect(() => {
    setupRound();
  }, [currentLevel]);

  const handleOptionClick = (word: Word) => {
    if (isProcessing || feedback) return;
    
    const isCorrect = word.id === targetWord?.id;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setIsProcessing(true);

    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
    
    setTimeout(() => {
      updateStats('wordToPicture', isCorrect);
      if (isCorrect) {
        setupRound();
      } else {
        setFeedback(null);
        setIsProcessing(false);
      }
    }, 1500);
  };

  if (!targetWord) return <div>Loading...</div>;

  return (
    <div className="game-container word-to-picture">
      <div className="jungle-frame">
        <h2 data-testid="target-word" className="target-word">{targetWord.word}</h2>
      </div>
      
      <div className="options-grid">
        {options.map((option) => (
          <button
            key={option.id}
            className={`option-button ${feedback && option.id === targetWord.id ? 'highlight-correct' : ''} ${feedback === 'incorrect' && option.id !== targetWord.id ? 'dim' : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={isProcessing}
          >
            <span className="emoji-large">{option.image}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <div data-testid="feedback" className={`feedback-overlay ${feedback}`}>
          {feedback === 'correct' ? '🌟 Awesome! 🌟' : '🍃 Try again! 🍃'}
        </div>
      )}
      
      <div className="game-info">
        <p>Level: {currentLevel}</p>
        <p>Streak: {stats.games.wordToPicture.streak}</p>
      </div>
    </div>
  );
};

export default WordToPicture;
