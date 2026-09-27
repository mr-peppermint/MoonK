import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useInView } from '../hooks/useAnimations';
import { playHudClick, playLaserSweep } from '../audio/soundEffects';

const ANOMALIES = ['█', '▓', '░', '§', 'Ω', 'Φ', 'Δ', 'ERROR'];

export default function MiniGame() {
  const { theme } = useTheme();
  const [ref, isInView] = useInView(0.2);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [anomalyChar, setAnomalyChar] = useState('█');
  
  const gridSize = 6;
  const totalCells = gridSize * gridSize;
  
  // Game loop
  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;
    let anomalyId: ReturnType<typeof setTimeout>;
    
    if (isPlaying && !isGameOver) {
      // Timer countdown
      timerId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsGameOver(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Anomaly spawning - speeds up as time goes down
      const spawnRate = Math.max(400, 1000 - (30 - timeLeft) * 20);
      
      anomalyId = setInterval(() => {
        const nextCell = Math.floor(Math.random() * totalCells);
        setActiveCell(nextCell);
        setAnomalyChar(ANOMALIES[Math.floor(Math.random() * ANOMALIES.length)]);
      }, spawnRate);
    }
    
    return () => {
      clearInterval(timerId);
      clearInterval(anomalyId);
    };
  }, [isPlaying, isGameOver, timeLeft, totalCells]);
  
  const startGame = () => {
    playHudClick();
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setActiveCell(null);
  };
  
  const handleCellClick = (index: number) => {
    if (!isPlaying || isGameOver) return;
    
    if (index === activeCell) {
      playLaserSweep();
      setScore((prev) => prev + 1);
      setActiveCell(null);
    }
  };
  
  return (
    <section 
      id="game" 
      ref={ref}
      className="py-20 relative overflow-hidden font-mono"
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      <div className="absolute inset-0 hud-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider text-glow">
            MULTIVERSE DEFENSE PROTOCOL
          </h2>
          <p className="text-lg text-gray-400 uppercase tracking-widest max-w-2xl mx-auto">
            Neutralize timeline anomalies before they spread.
          </p>
        </div>
        
        <div className={`bg-[#0a0a0f] border-2 border-[#1a1a2e] rounded-lg p-6 max-w-2xl mx-auto box-glow relative overflow-hidden transition-all duration-1000 delay-300 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2f8d46]/20 to-transparent h-10 w-full animate-[scan-line_4s_linear_infinite]" style={{ '--tw-gradient-via': `${theme.color}33` } as React.CSSProperties} />
          
          <div className="flex justify-between items-center mb-6 text-sm md:text-base border-b border-[#1a1a2e] pb-4">
            <div className="text-gray-300">
              STATUS: <span className={isPlaying ? 'text-green-500 blink' : 'text-amber-500'}>{isPlaying ? 'ACTIVE' : isGameOver ? 'COMPLETED' : 'STANDBY'}</span>
            </div>
            <div className="flex space-x-6">
              <div className="text-gray-300">
                TIME: <span className={timeLeft <= 10 ? 'text-red-500 blink' : 'text-blue-400'}>00:{timeLeft.toString().padStart(2, '0')}</span>
              </div>
              <div className="text-gray-300">
                SCORE: <span style={{ color: theme.color }}>{score.toString().padStart(3, '0')}</span>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-square w-full max-w-md mx-auto bg-black rounded border border-[#1a1a2e] p-2">
            {!isPlaying && !isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-4 text-center">
                <div className="mb-6 text-red-500 animate-pulse text-xl">WARNING: MULTIVERSE INSTABILITY DETECTED</div>
                <button 
                  onClick={startGame}
                  className="px-6 py-3 bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white border border-[#3a3a5e] transition-colors uppercase tracking-widest hover:border-glow group"
                >
                  INITIALIZE THREAT SCANNER
                </button>
              </div>
            )}
            
            {isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10 p-4 text-center">
                <div className="text-2xl mb-2 text-white">SIMULATION ENDED</div>
                <div className="text-4xl mb-6 text-glow" style={{ color: theme.color }}>{score} ANOMALIES NEUTRALIZED</div>
                <button 
                  onClick={startGame}
                  className="px-6 py-3 bg-[#1a1a2e] hover:bg-[#2a2a4e] text-white border border-[#3a3a5e] transition-colors uppercase tracking-widest hover:border-glow"
                >
                  REBOOT SYSTEM
                </button>
              </div>
            )}
            
            <div 
              className="grid gap-1 h-full w-full"
              style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: totalCells }).map((_, i) => (
                <div 
                  key={i}
                  onClick={() => handleCellClick(i)}
                  className={`
                    flex items-center justify-center border border-[#1a1a2e]/50 cursor-crosshair transition-colors duration-100
                    ${activeCell === i ? 'bg-red-900/40 border-red-500/50' : 'hover:bg-[#1a1a2e]'}
                  `}
                >
                  {activeCell === i && (
                    <span className="text-red-500 text-xl md:text-2xl animate-pulse font-bold">
                      {anomalyChar}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
