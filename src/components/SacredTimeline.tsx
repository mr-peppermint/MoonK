import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useInView } from '../hooks/useAnimations';
import { playHudClick } from '../audio/soundEffects';
import { Clock, Coffee, Code, Mic, CheckCircle, Users, Zap } from 'lucide-react';

type EventType = 'ceremony' | 'hack' | 'break' | 'mentor' | 'checkpoint';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  type: EventType;
}

const day1Events: TimelineEvent[] = [
  { time: '08:00', title: 'Portal Opening', description: 'Registration & Check-in', type: 'ceremony' },
  { time: '09:30', title: 'Avengers Briefing', description: 'Opening Ceremony & Keynote', type: 'ceremony' },
  { time: '10:30', title: 'Hackathon Begins', description: 'Start Building!', type: 'hack' },
  { time: '13:00', title: 'Refuel Station', description: 'Lunch Break', type: 'break' },
  { time: '15:00', title: 'Mentor Rounds Begin', description: 'Expert Guidance Sessions', type: 'mentor' },
  { time: '18:00', title: 'Mid-hack Checkpoint', description: 'Progress Review', type: 'checkpoint' },
  { time: '20:00', title: 'Night Fuel', description: 'Dinner & Networking', type: 'break' },
  { time: '22:00', title: 'Midnight Surge', description: 'Late Night Coding Sprint', type: 'hack' },
];

const day2Events: TimelineEvent[] = [
  { time: '02:00', title: 'Quantum Hours', description: 'Deep Focus Coding', type: 'hack' },
  { time: '08:00', title: 'Dawn Refuel', description: 'Breakfast', type: 'break' },
  { time: '10:00', title: 'Final Sprint', description: 'Last Coding Hours', type: 'hack' },
  { time: '12:00', title: 'Code Freeze', description: 'Submissions Close', type: 'checkpoint' },
  { time: '13:00', title: 'Lunch & Prep', description: 'Presentation Preparation', type: 'break' },
  { time: '14:00', title: 'Demo Day', description: 'Team Presentations Begin', type: 'ceremony' },
  { time: '16:30', title: 'Judgment Protocol', description: 'Judges Deliberation', type: 'checkpoint' },
  { time: '17:30', title: 'The Endgame', description: 'Awards Ceremony & Closing', type: 'ceremony' },
];

const getIcon = (type: EventType) => {
  switch (type) {
    case 'ceremony':
      return <Mic className="w-5 h-5" />;
    case 'hack':
      return <Code className="w-5 h-5" />;
    case 'break':
      return <Coffee className="w-5 h-5" />;
    case 'mentor':
      return <Users className="w-5 h-5" />;
    case 'checkpoint':
      return <CheckCircle className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

const getColorClass = (type: EventType, themeColor: string) => {
  switch (type) {
    case 'ceremony':
      return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    case 'hack':
      return 'text-green-400 border-green-400/30 bg-green-400/10';
    case 'break':
      return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    case 'mentor':
      return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
    case 'checkpoint':
      return 'text-red-400 border-red-400/30 bg-red-400/10';
    default:
      return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
  }
};

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const { theme, soundEnabled } = useTheme();
  const { ref, isVisible } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative flex items-start group transition-all duration-700 ease-out mb-12 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Connecting Line (for desktop and mobile) */}
      <div className="absolute left-6 md:left-1/2 top-10 bottom-[-3rem] w-0.5 bg-gradient-to-b from-[#1a1a2e] via-current to-[#1a1a2e] opacity-30 transform -translate-x-1/2 hidden last:block:hidden"></div>

      {/* Mobile Time */}
      <div className="md:hidden flex-shrink-0 w-16 pt-1">
        <div className="font-mono text-sm text-[var(--glow-color)] text-glow">{event.time}</div>
      </div>

      {/* Desktop Layout - Left Side (Time) */}
      <div className="hidden md:flex flex-1 justify-end pr-12 pt-1">
        <div className="font-mono text-xl text-[var(--glow-color)] text-glow">{event.time}</div>
      </div>

      {/* Timeline Node */}
      <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#1a1a2e] bg-[#0d0d18] z-10 group-hover:border-[var(--glow-color)] group-hover:box-glow transition-all duration-300">
        <div className="w-3 h-3 rounded-full bg-[var(--glow-color)] opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content - Right Side */}
      <div className="flex-1 pl-6 md:pl-12 pb-2">
        <div className={`glass-panel p-6 rounded-xl border border-[#1a1a2e] hover:border-[var(--glow-color)] transition-all duration-300 group-hover:bg-[#1a1a2e]/40 transform group-hover:-translate-y-1`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${getColorClass(event.type, theme.color)}`}>
              {getIcon(event.type)}
            </div>
            <h3 className="text-xl font-bold text-[#e0e0e8]">{event.title}</h3>
          </div>
          <p className="text-[#8888a0] font-medium">{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default function SacredTimeline() {
  const { theme, soundEnabled } = useTheme();
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const { ref, isVisible } = useInView();

  const handleTabClick = (day: 1 | 2) => {
    if (soundEnabled) playHudClick();
    setActiveDay(day);
  };

  const events = activeDay === 1 ? day1Events : day2Events;

  return (
    <section 
      id="timeline" 
      className="py-24 relative overflow-hidden hud-grid"
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider text-[#e0e0e8]">
            THE SACRED <span className="text-[var(--glow-color)] text-glow">TIMELINE</span>
          </h2>
          <p className="text-lg text-[#8888a0] max-w-2xl mx-auto">
            Every moment is accounted for. Follow the protocol.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center gap-4 mb-16">
          <button
            onClick={() => handleTabClick(1)}
            className={`px-8 py-4 rounded-xl font-bold tracking-wider transition-all duration-300 ${
              activeDay === 1
                ? 'bg-[var(--glow-color)] text-[#050508] box-glow'
                : 'glass-panel text-[#8888a0] hover:text-[#e0e0e8] border border-[#1a1a2e] hover:border-[var(--glow-color)]'
            }`}
          >
            DAY 1 • OCT 25
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`px-8 py-4 rounded-xl font-bold tracking-wider transition-all duration-300 ${
              activeDay === 2
                ? 'bg-[var(--glow-color)] text-[#050508] box-glow'
                : 'glass-panel text-[#8888a0] hover:text-[#e0e0e8] border border-[#1a1a2e] hover:border-[var(--glow-color)]'
            }`}
          >
            DAY 2 • OCT 26
          </button>
        </div>

        {/* Timeline Events */}
        <div className="relative">
          {/* Main vertical line */}
          <div className="absolute left-12 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#1a1a2e] to-transparent transform md:-translate-x-1/2"></div>
          
          <div className="relative flex flex-col pt-8">
            {events.map((event, index) => (
              <TimelineItem key={`${activeDay}-${index}`} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
