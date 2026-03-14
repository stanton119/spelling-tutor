import React, { useState, useEffect } from 'react';
import { useTutorStats } from '../context/TutorContext';
import { getRandomWordForLevel } from '../utils/wordSelector';
import { type Word } from '../data/words';
import { playCorrect, playIncorrect } from '../utils/audio';
import './Hangman.css';

const MAX_WRONG = 6;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const Hangman: React.FC = () => {
  const { stats, updateStats } = useTutorStats();
  const currentLevel = stats.games.hangman.level;
  
  const [targetWord, setTargetWord] = useState<Word | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const setupRound = () => {
    const target = getRandomWordForLevel(currentLevel);
    setTargetWord(target);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
  };

  useEffect(() => {
    setupRound();
  }, [currentLevel]);

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters).add(letter);
    setGuessedLetters(newGuessed);

    if (!targetWord?.word.includes(letter)) {
      playIncorrect();
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= MAX_WRONG) {
        setGameStatus('lost');
        setTimeout(() => {
          updateStats('hangman', false);
          setupRound();
        }, 3000);
      }
    } else {
      playCorrect();
      const isWon = targetWord.word.split('').every(char => newGuessed.has(char));
      if (isWon) {
        setGameStatus('won');
        setTimeout(() => {
          updateStats('hangman', true);
          setupRound();
        }, 3000);
      }
    }
  };

  if (!targetWord) return <div>Loading...</div>;

  const displayWord = targetWord.word
    .split('')
    .map(char => (guessedLetters.has(char) || gameStatus === 'lost' ? char : '_'))
    .join(' ');

  return (
    <div className="game-container hangman">
      <div className="bridge-visual">
        <div className="river">🐊</div>
        <div className="bridge">
          {[...Array(MAX_WRONG)].map((_, i) => (
            <div 
              key={i} 
              className={`plank ${i < MAX_WRONG - wrongGuesses ? 'solid' : 'broken'}`}
            >
              🪵
            </div>
          ))}
        </div>
        <div className="character">🐒</div>
      </div>

      <div className="word-slots">
        {displayWord}
      </div>

      <div className="keyboard">
        {ALPHABET.map(letter => (
          <button
            key={letter}
            className={`key ${guessedLetters.has(letter) ? (targetWord.word.includes(letter) ? 'correct' : 'wrong') : ''}`}
            onClick={() => handleGuess(letter)}
            disabled={gameStatus !== 'playing' || guessedLetters.has(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      {gameStatus !== 'playing' && (
        <div className={`feedback-overlay ${gameStatus}`}>
          {gameStatus === 'won' ? '🍌 Banana-tastic! 🍌' : `🎋 Oh no! It was ${targetWord.word} 🎋`}
        </div>
      )}

      <div className="game-info">
        <p>Level: {currentLevel}</p>
        <p>Streak: {stats.games.hangman.streak}</p>
        <p>Planks Left: {MAX_WRONG - wrongGuesses}</p>
      </div>
    </div>
  );
};

export default Hangman;
