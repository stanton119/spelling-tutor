import React, { useState, useEffect } from 'react';
import { useTutorStats } from '../context/TutorContext';
import { getRandomWordForLevel } from '../utils/wordSelector';
import { type Word } from '../data/words';
import { playCorrect, playIncorrect } from '../utils/audio';
import './MissingLetter.css';

const MissingLetter: React.FC = () => {
  const { stats, updateStats } = useTutorStats();
  const currentLevel = stats.games.missingLetter.level;
  
  const [targetWord, setTargetWord] = useState<Word | null>(null);
  const [missingIndex, setMissingIndex] = useState(-1);
  const [options, setOptions] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const setupRound = () => {
    const target = getRandomWordForLevel(currentLevel);
    const index = Math.floor(Math.random() * target.word.length);
    const correctLetter = target.word[index];
    
    // Generate 2 random letters as distractors
    const distractors: string[] = [];
    while (distractors.length < 2) {
      const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      if (char !== correctLetter && !distractors.includes(char)) {
        distractors.push(char);
      }
    }
    
    const allOptions = [...distractors, correctLetter].sort(() => 0.5 - Math.random());
    
    setTargetWord(target);
    setMissingIndex(index);
    setOptions(allOptions);
    setFeedback(null);
    setIsProcessing(false);
  };

  useEffect(() => {
    setupRound();
  }, [currentLevel]);

  const handleOptionClick = (letter: string) => {
    if (isProcessing || feedback) return;
    
    const isCorrect = letter === targetWord?.word[missingIndex];
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    setIsProcessing(true);

    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
    
    setTimeout(() => {
      updateStats('missingLetter', isCorrect);
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
    <div className="game-container missing-letter">
      <div className="image-preview">
        <span className="emoji-large">{targetWord.image}</span>
      </div>

      <div className="word-display">
        {targetWord.word.split('').map((char, i) => (
          <span key={i} className={`letter-box ${i === missingIndex ? 'missing' : ''}`}>
            {i === missingIndex ? (feedback === 'correct' ? char : '_') : char}
          </span>
        ))}
      </div>
      
      <div className="letter-options">
        {options.map((option, index) => (
          <button
            key={`${option}-${index}`}
            className={`letter-bubble ${feedback && option === targetWord.word[missingIndex] ? 'highlight-correct' : ''} ${feedback === 'incorrect' && option !== targetWord.word[missingIndex] ? 'dim' : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={isProcessing}
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`feedback-overlay ${feedback}`}>
          {feedback === 'correct' ? '🦜 POLY-TASTIC! 🦜' : '🥥 TRY AGAIN! 🥥'}
        </div>
      )}
      
      <div className="game-info">
        <p>Level: {currentLevel}</p>
        <p>Streak: {stats.games.missingLetter.streak}</p>
      </div>
    </div>
  );
};

export default MissingLetter;
