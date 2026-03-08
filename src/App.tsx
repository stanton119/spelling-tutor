import { useState } from 'react';
import { TutorProvider, type GameType } from './context/TutorContext';
import JungleLayout from './components/JungleLayout';
import GameSelector from './components/GameSelector';
import WordToPicture from './games/WordToPicture';
import PictureToSpelling from './games/PictureToSpelling';
import MissingLetter from './games/MissingLetter';
import Hangman from './games/Hangman';
import './App.css';

function App() {
  const [activeGame, setActiveGame] = useState<GameType>('wordToPicture');

  const renderGame = () => {
    switch (activeGame) {
      case 'wordToPicture':
        return <WordToPicture />;
      case 'pictureToSpelling':
        return <PictureToSpelling />;
      case 'missingLetter':
        return <MissingLetter />;
      case 'hangman':
        return <Hangman />;
      default:
        return <WordToPicture />;
    }
  };

  return (
    <TutorProvider>
      <JungleLayout>
        <GameSelector activeGame={activeGame} onSelectGame={setActiveGame} />
        <div className="game-wrapper">
          {renderGame()}
        </div>
      </JungleLayout>
    </TutorProvider>
  );
}

export default App;
