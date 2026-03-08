import React from 'react';
import { type GameType } from '../context/TutorContext';
import './GameSelector.css';

interface GameSelectorProps {
  activeGame: GameType;
  onSelectGame: (game: GameType) => void;
}

const games: { id: GameType; label: string; icon: string }[] = [
  { id: 'wordToPicture', label: 'Word to Picture', icon: '🖼️' },
  { id: 'pictureToSpelling', label: 'Picture to Spelling', icon: '✏️' },
  { id: 'missingLetter', label: 'Missing Letter', icon: '❓' },
  { id: 'hangman', label: 'Jungle Bridge', icon: '🌉' },
];

const GameSelector: React.FC<GameSelectorProps> = ({ activeGame, onSelectGame }) => {
  return (
    <div className="game-selector">
      {games.map((game) => (
        <button
          key={game.id}
          className={`selector-button ${activeGame === game.id ? 'active' : ''}`}
          onClick={() => onSelectGame(game.id)}
        >
          <span className="game-icon">{game.icon}</span>
          <span className="game-label">{game.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GameSelector;
