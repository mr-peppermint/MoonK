import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useInView } from '../hooks/useAnimations';
import { playHudClick } from '../audio/soundEffects';
import { Brain, Lock, Globe, ShieldCheck } from 'lucide-react';

const tracksData = [
  {
    id: 1,
    icon: Brain,
    title: 'STARK AI & AUTONOMOUS AGENTS',
    codename: 'Track Alpha',
    description: 'Build intelligent systems that think, learn, and act. From neural interfaces to autonomous agents, push the boundaries of artificial intelligence.',
    tags: ['Machine Learning', 'Neural Networks', 'LLMs', 'Computer Vision'],
  },
  {
    id: 2,
    icon: Lock,
    title: 'QUANTUM REALM CRYPTOGRAPHY',
    codename: 'Track Beta',
    description: 'Secure the multiverse with cutting-edge cryptographic solutions. Blockchain, zero-knowledge proofs, and quantum-resistant security protocols.',
    tags: ['Web3', 'Blockchain', 'Zero-Knowledge', 'Smart Contracts'],
  },
  {
    id: 3,
    icon: Globe,
    title: 'MULTIVERSE SPATIAL REALITIES',
    codename: 'Track Gamma',
    description: 'Craft immersive digital experiences that blur the line between dimensions. AR, VR, and spatial computing for the next generation of the web.',
    tags: ['AR/VR', 'WebXR', 'Cloud Native', '3D Web'],
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'S.H.I.E.L.D. CYBER DEFENSE',
    codename: 'Track Delta',
    description: 'Defend digital infrastructure against multiversal threats. High-throughput systems, penetration testing, and real-time threat detection.',
    tags: ['Cybersecurity', 'Pen Testing', 'DevSecOps', 'Threat Intel'],
  }
];

export default function Tracks() {
  const { theme, soundEnabled } = useTheme();
  const [ref, inView] = useInView<HTMLDivElement>(0.1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleHover = (index: number) => {
    if (hoveredCard !== index) {
      setHoveredCard(index);
      if (soundEnabled) playHudClick();
    }
  };

  const handleLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section 
      id="tracks" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10"
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      <div 
        ref={ref}
        className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider text-glow uppercase text-[#e0e0e8]">
          THE AVENGERS PROTOCOL
        </h2>
        <p className="text-xl max-w-3xl mx-auto font-mono text-[#8888a0]">
          Choose your track. Assemble your team. Save the multiverse.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tracksData.map((track, index) => {
          const Icon = track.icon;
          const isHovered = hoveredCard === index;
          
          return (
            <div
              key={track.id}
              className={`glass-panel p-6 rounded-lg transition-all duration-500 transform border border-[#1a1a2e] ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              } hover:-translate-y-2 hover:border-glow`}
              style={{ transitionDelay: `${index * 150}ms`, '--glow-color': theme.color } as React.CSSProperties}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={handleLeave}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className={`inline-flex p-3 rounded-md bg-[#0a0a0f] border border-[#1a1a2e] transition-all duration-300 ${isHovered ? 'box-glow scale-110' : ''}`}>
                    <Icon className="w-8 h-8" style={{ color: theme.color }} />
                  </div>
                </div>
                
                <div className="font-mono text-sm tracking-widest mb-2 font-bold" style={{ color: theme.color }}>
                  {track.codename}
                </div>
                
                <h3 className="text-xl font-bold mb-3 tracking-wide text-[#e0e0e8]">
                  {track.title}
                </h3>
                
                <p className="text-[#8888a0] text-sm mb-6 flex-grow leading-relaxed">
                  {track.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {track.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 rounded bg-[#0a0a0f] border border-[#1a1a2e] text-[#8888a0] transition-colors duration-300"
                      style={isHovered ? { borderColor: theme.color, color: '#e0e0e8' } : {}}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  className="w-full py-2 font-mono text-sm tracking-wider border rounded transition-all duration-300 relative overflow-hidden group"
                  style={{
                    borderColor: isHovered ? theme.color : '#1a1a2e',
                    color: isHovered ? theme.color : '#8888a0',
                    backgroundColor: isHovered ? `${theme.color}15` : 'transparent'
                  }}
                  onClick={() => {
                    if (soundEnabled) playHudClick();
                  }}
                >
                  <span className="relative z-10 group-hover:text-glow">SELECT TRACK</span>
                  {isHovered && (
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{ background: theme.bgGradient }}
                    />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
