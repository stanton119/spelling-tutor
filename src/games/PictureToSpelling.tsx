import React, { useState, useEffect } from 'react';
import { useTutorStats } from '../context/TutorContext';
import { getRandomWordForLevel } from '../utils/wordSelector';
import { generateDistractors } from '../utils/spellingDistractors';
import { type Word } from '../data/words';
import { playCorrect, playIncorrect } from '../utils/audio';
import './PictureToSpelling.css';

const PictureToSpelling: React.FC = () => {
  const { stats, updateStats } = useTutorStats();
  const currentLevel = stats.games.pictureToSpelling.level;
  
  const [targetWord, setTargetWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const setupRound = () => {
    const target = getRandomWordForLevel(currentLevel);
    const distractors = generateDistractors(target.word, 2);
    
    const allOptions = [...distractors, target.word].sort(() => 0.5 - Math.random());
    
    setTargetWord(target);
    setOptions(allOptions);
    setFeedback(null);
    setIsProcessing(false);
  };

  useEffect(() => {
    setupRound();
  }, [currentLevel]);

  const handleOptionClick = (word: string) => {
    if (isProcessing || feedback) return;
    
    const isCorrect = word === targetWord?.word;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setIsProcessing(true);

    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
    
    setTimeout(() => {
      updateStats('pictureToSpelling', isCorrect);
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
    <div className="game-container picture-to-spelling">
      <div className="image-display">
        <span className="emoji-huge">{targetWord.image}</span>
      </div>
      
      <div className="spelling-options">
        {options.map((option, index) => (
          <button
            key={`${option}-${index}`}
            className={`spelling-button ${feedback && option === targetWord.word ? 'highlight-correct' : ''} ${feedback === 'incorrect' && option !== targetWord.word ? 'dim' : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={isProcessing}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`feedback-overlay ${feedback}`}>
          {feedback === 'correct' ? '🦁 Grrr-eat! 🦁' : '🎋 Try again! 🎋'}
        </div>
      )}
      
      <div className="game-info">
        <p>Level: {currentLevel}</p>
        <p>Streak: {stats.games.pictureToSpelling.streak}</p>
      </div>
    </div>
  );
};

export default PictureToSpelling;
