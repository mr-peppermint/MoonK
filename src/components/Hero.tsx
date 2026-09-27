import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCountdown } from '../hooks/useAnimations';
import { playHudClick } from '../audio/soundEffects';
import { ChevronDown, Zap, ArrowRight } from 'lucide-react';

const EVENT_DATE = new Date('2026-10-25T00:00:00');

export default function Hero() {
  const { theme, soundEnabled } = useTheme();
  const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

  const handleAssemble = () => {
    if (soundEnabled) playHudClick();
    window.dispatchEvent(new CustomEvent('openRegistration'));
  };

  const handleExplore = () => {
    if (soundEnabled) playHudClick();
    const missionSection = document.getElementById('mission');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 overflow-hidden"
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      <div className="z-10 flex flex-col items-center w-full max-w-6xl mx-auto text-center space-y-8 animate-fadeInUp">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-black/40 backdrop-blur-md animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <Zap size={16} className="text-[var(--glow-color)]" />
          <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-300">
            GeeksForGeeks Student Chapter • Bennett University
          </span>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center space-y-2 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-sm sm:text-xl font-bold tracking-[0.3em] sm:tracking-[0.5em] text-gray-400">
            MULTIVERSE OF
          </h2>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white text-glow leading-none py-2">
            CODE
          </h1>
          <div className="font-mono text-lg sm:text-2xl tracking-widest text-[var(--glow-color)] overflow-hidden whitespace-nowrap border-r-2 border-[var(--glow-color)] animate-typing pr-1" style={{ animationDelay: '0.8s' }}>
            INITIATIVE 2026
          </div>
        </div>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-gray-400 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          The ultimate 48-hour hackathon where developers assemble across infinite realities to build the impossible.
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mt-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          {[
            { label: 'DAYS', value: days },
            { label: 'HOURS', value: hours },
            { label: 'MINUTES', value: minutes },
            { label: 'SECONDS', value: seconds }
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center justify-center p-3 sm:p-6 rounded-xl border border-glow bg-black/30 backdrop-blur-sm shadow-[0_0_15px_rgba(var(--glow-color-rgb),0.1)]">
              <span className="text-3xl sm:text-5xl md:text-6xl font-black text-white text-glow font-mono">
                {item.value.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-gray-400 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={handleAssemble}
            className="group relative flex items-center gap-2 px-8 py-4 bg-[var(--glow-color)] text-black font-black uppercase tracking-wider rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:box-glow"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span>Assemble Your Team</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={handleExplore}
            className="group flex items-center gap-2 px-8 py-4 bg-transparent border border-gray-600 hover:border-[var(--glow-color)] text-white font-bold uppercase tracking-wider rounded-lg transition-all duration-300 hover:text-[var(--glow-color)]"
          >
            <span>Explore Mission Brief ↓</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
        <span className="text-xs font-mono text-gray-500 tracking-widest mb-2 uppercase">Scroll to initialize</span>
        <ChevronDown className="text-gray-500 animate-bounce" size={24} />
      </div>
    </section>
  );
}
