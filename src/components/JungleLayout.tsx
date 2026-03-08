import React, { type ReactNode, useState, useEffect } from 'react';
import { useTutorStats } from '../context/TutorContext';
import './JungleLayout.css';

interface JungleLayoutProps {
  children: ReactNode;
}

const JungleLayout: React.FC<JungleLayoutProps> = ({ children }) => {
  const { stats, resetStats } = useTutorStats();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="jungle-layout">
      <div 
        className="foliage foliage-tl" 
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
      >🌿</div>
      <div 
        className="foliage foliage-tr" 
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.2}px)` }}
      >🍃</div>
      <div 
        className="foliage foliage-bl" 
        style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * 0.6}px)` }}
      >🌱</div>
      <div 
        className="foliage foliage-br" 
        style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * -0.4}px)` }}
      >🌿</div>

      <header className="jungle-header">
        <div className="logo">🌴 Spelling Tutor 🦜</div>
        <div className="user-stats">
          <div className="stat-pill">🌟 {stats.totalPoints} pts</div>
          <button className="reset-btn" title="Reset Progress" onClick={() => {
            if (window.confirm('Reset all progress?')) resetStats();
          }}>🔄</button>
        </div>
      </header>

      <main className="game-area">
        {children}
      </main>

      <div className="parrot-mascot">
        <div className="bubble">Keep going! You're doing great!</div>
        <span className="parrot" style={{ transform: `translateY(${mousePos.y * 0.1}px) rotate(${mousePos.x * 0.2}deg)` }}>🦜</span>
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
