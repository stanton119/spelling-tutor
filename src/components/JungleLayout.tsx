import React, { type ReactNode } from 'react';
import { useTutorStats } from '../context/TutorContext';
import './JungleLayout.css';

interface JungleLayoutProps {
  children: ReactNode;
}

const JungleLayout: React.FC<JungleLayoutProps> = ({ children }) => {
  const { stats, resetStats } = useTutorStats();

  return (
    <div className="jungle-layout">
      <header className="jungle-header">
        <div className="logo">🌴 Spelling Tutor 🦜</div>
        <div className="user-stats">
          <div className="stat-pill">🌟 {stats.totalPoints} pts</div>
          <button className="reset-btn" onClick={() => {
            if (window.confirm('Reset all progress?')) resetStats();
          }}>🔄</button>
        </div>
      </header>

      <main className="game-area">
        {children}
      </main>

      <div className="parrot-mascot">
        <div className="bubble">Keep going! You're doing great!</div>
        <span className="parrot">🦜</span>
      </div>

      <footer className="vines-footer">
        <div className="vine">🌿</div>
        <div className="vine">🌿</div>
        <div className="vine">🌿</div>
        <div className="vine">🌿</div>
      </footer>
    </div>
  );
};

export default JungleLayout;
