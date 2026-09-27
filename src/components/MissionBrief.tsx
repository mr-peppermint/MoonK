import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useInView, useAnimatedCounter } from '../hooks/useAnimations';
import { Shield, Server, Users, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  inView: boolean;
  isFloat?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ target, prefix = '', suffix = '', label, inView, isFloat = false }) => {
  const count = useAnimatedCounter(target, 2000, inView);
  const displayValue = isFloat ? (count / 10).toFixed(1) : count;

  return (
    <div className={`flex flex-col items-center justify-center p-6 glass-panel border border-glow transition-all duration-700 hover:scale-105 hover:box-glow ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="text-4xl md:text-5xl font-bold mb-3 text-glow" style={{ color: 'var(--glow-color)' }}>
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-xs md:text-sm text-[#8888a0] uppercase tracking-wider text-center font-medium">{label}</div>
    </div>
  );
};

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay?: number;
  inView: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, desc, delay = 0, inView }) => {
  return (
    <div 
      className={`glass-panel p-8 border border-glow flex flex-col items-start gap-5 hover:-translate-y-2 hover:box-glow transition-all duration-700`}
      style={{ 
        transitionDelay: `${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(2rem)'
      }}
    >
      <div className="p-4 rounded-xl bg-[#0d0d18] border border-glow box-glow">
        <Icon size={32} style={{ color: 'var(--glow-color)' }} />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-[#e0e0e8]">{title}</h3>
      <p className="text-[#8888a0] leading-relaxed">{desc}</p>
    </div>
  );
};

export default function MissionBrief() {
  const { theme } = useTheme();
  const [ref, inView] = useInView(0.15);

  return (
    <section 
      id="mission" 
      className="py-24 relative overflow-hidden bg-[#050508] hud-grid"
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref as React.RefObject<HTMLDivElement>}>
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-[var(--glow-color)]"></div>
            <Shield size={32} style={{ color: 'var(--glow-color)' }} className="animate-pulse-glow" />
            <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-[var(--glow-color)]"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-glow text-[#e0e0e8] mb-6 tracking-wide">
            MISSION BRIEFING
          </h2>
          <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-glow bg-[#0d0d18]/80 text-[#8888a0] text-xs md:text-sm tracking-[0.2em] uppercase box-glow backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full mr-3 animate-pulse" style={{ backgroundColor: 'var(--glow-color)' }}></span>
            AVENGERS PROTOCOL ACTIVATED • CLASSIFIED LEVEL: OMEGA
          </div>
        </div>

        {/* Description */}
        <div 
          className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 delay-150 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-lg md:text-xl lg:text-2xl text-[#8888a0] leading-relaxed">
            The GeeksForGeeks Student Chapter at Bennett University presents <strong className="text-[#e0e0e8] text-glow font-bold">MULTIVERSE OF CODE</strong> — a 48-hour hackathon that transcends the boundaries of conventional coding. Teams of 2-4 will tackle challenges across AI, blockchain, cybersecurity, and next-gen web development. Powered by Stark-grade infrastructure and mentored by industry heroes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          <StatCard target={48} suffix="H" label="Non-Stop Hacking" inView={inView} />
          <StatCard target={500} suffix="+" label="Developers Expected" inView={inView} />
          <StatCard target={50} suffix="+" label="Colleges Nationwide" inView={inView} />
          <StatCard target={15} prefix="₹" suffix="L+" label="Prize Pool" inView={inView} isFloat={true} />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Server} 
            title="Stark-Grade Infrastructure" 
            desc="High-speed connectivity, cloud credits, and enterprise-level dev tools provided for every team." 
            delay={200}
            inView={inView}
          />
          <FeatureCard 
            icon={Users} 
            title="Industry Mentorship" 
            desc="Get real-time guidance from engineers at top tech companies and Marvel-tier problem solvers." 
            delay={400}
            inView={inView}
          />
          <FeatureCard 
            icon={Rocket} 
            title="Career Launchpad" 
            desc="Top performers receive internship referrals, LinkedIn badges, and exclusive recruitment access." 
            delay={600}
            inView={inView}
          />
        </div>

      </div>
    </section>
  );
}
