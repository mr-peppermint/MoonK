import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useInView, useAnimatedCounter } from '../hooks/useAnimations';
import { Medal, Award, Star, Check, Crown, Sparkles } from 'lucide-react';

const PrizeVault: React.FC = () => {
  const { theme } = useTheme();
  const [sectionRef, isInView] = useInView(0.1);

  // Counters for main prizes
  const champPrize = useAnimatedCounter(75000, 2000, isInView);
  const runnerPrize = useAnimatedCounter(50000, 2000, isInView);
  const thirdPrize = useAnimatedCounter(25000, 2000, isInView);

  return (
    <section 
      id="prizes" 
      ref={sectionRef}
      className="relative py-24 px-6 md:px-12 w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 hud-grid"></div>
      
      {/* Total Prize Pool Banner */}
      <div className={`relative z-10 mb-8 inline-flex items-center gap-2 px-6 py-2 rounded-full border border-glow glass-panel text-glow transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <span className="font-bold tracking-widest uppercase">₹1,50,000+ Total Prize Pool</span>
        <Sparkles className="w-5 h-5 text-yellow-400" />
      </div>

      {/* Header */}
      <div className={`relative z-10 text-center mb-16 transition-all duration-1000 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter text-glow uppercase">Vibranium Prize Vault</h2>
        <p className="text-xl text-[#8888a0] max-w-2xl mx-auto">The spoils of victory await the worthy.</p>
      </div>

      {/* Main Prize Cards */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-center">
        
        {/* Runner Up */}
        <div className={`glass-panel p-8 rounded-2xl border border-[#c0c0c0]/30 relative group overflow-hidden transition-all duration-700 delay-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(192,192,192,0.3)] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c0c0c0] to-transparent shimmer opacity-50 group-hover:opacity-100"></div>
          
          <div className="flex flex-col items-center text-center">
            <Medal className="w-12 h-12 text-[#c0c0c0] mb-4 group-hover:rotate-slow" />
            <h3 className="text-sm uppercase tracking-widest text-[#8888a0] mb-2 font-semibold">2nd Place</h3>
            <h4 className="text-2xl font-bold mb-4 text-[#e0e0e8]">Cosmic Warrior</h4>
            
            <div className="text-4xl font-bold text-[#c0c0c0] mb-8 drop-shadow-[0_0_10px_rgba(192,192,192,0.5)]">
              ₹{runnerPrize.toLocaleString()}
            </div>
            
            <ul className="w-full space-y-3 text-left">
              {['Cash Prize', 'GFG Premium Access', 'Swag Kit', 'LinkedIn Badge'].map((perk, i) => (
                <li key={i} className="flex items-start text-sm text-[#8888a0] group-hover:text-[#e0e0e8] transition-colors">
                  <Check className="w-4 h-4 text-[#c0c0c0] mr-2 mt-0.5 shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Champion */}
        <div className={`glass-panel p-10 rounded-2xl border border-yellow-500/50 relative group overflow-hidden transition-all duration-700 delay-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] z-20 md:-mt-8 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shimmer opacity-80"></div>
          <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex flex-col items-center text-center relative z-10">
            <Crown className="w-16 h-16 text-yellow-400 mb-4 group-hover:rotate-slow drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            <h3 className="text-sm uppercase tracking-widest text-yellow-400/80 mb-2 font-bold">Grand Prize</h3>
            <h4 className="text-3xl font-bold mb-4 text-white">Infinity Champion</h4>
            
            <div className="text-5xl font-black text-yellow-400 mb-8 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] tracking-tight">
              ₹{champPrize.toLocaleString()}
            </div>
            
            <ul className="w-full space-y-4 text-left">
              {['Cash Prize', 'Internship Referrals', 'Marvel x GFG Swag Box', 'Bennett Trophy'].map((perk, i) => (
                <li key={i} className="flex items-start text-base text-[#e0e0e8]">
                  <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 shrink-0" />
                  <span className="font-medium">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Third Place */}
        <div className={`glass-panel p-8 rounded-2xl border border-[#cd7f32]/30 relative group overflow-hidden transition-all duration-700 delay-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(205,127,50,0.3)] ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#cd7f32] to-transparent shimmer opacity-50 group-hover:opacity-100"></div>
          
          <div className="flex flex-col items-center text-center">
            <Award className="w-12 h-12 text-[#cd7f32] mb-4 group-hover:rotate-slow" />
            <h3 className="text-sm uppercase tracking-widest text-[#8888a0] mb-2 font-semibold">3rd Place</h3>
            <h4 className="text-2xl font-bold mb-4 text-[#e0e0e8]">Rising Hero</h4>
            
            <div className="text-4xl font-bold text-[#cd7f32] mb-8 drop-shadow-[0_0_10px_rgba(205,127,50,0.5)]">
              ₹{thirdPrize.toLocaleString()}
            </div>
            
            <ul className="w-full space-y-3 text-left">
              {['Cash Prize', 'Course Vouchers', 'Swag Kit', 'Certificate'].map((perk, i) => (
                <li key={i} className="flex items-start text-sm text-[#8888a0] group-hover:text-[#e0e0e8] transition-colors">
                  <Check className="w-4 h-4 text-[#cd7f32] mr-2 mt-0.5 shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Special Category Prizes */}
      <div className={`relative z-10 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {[
          { title: 'Best AI Innovation', prize: '₹10,000' },
          { title: 'Best UI/UX Design', prize: '₹10,000' },
          { title: 'Best Security Hack', prize: '₹10,000' },
          { title: "People's Choice", prize: '₹5,000' }
        ].map((cat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-xl border border-glow flex items-center justify-between group hover:bg-[#1a1a2e]/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-glow flex items-center justify-center bg-black/30 group-hover:rotate-12 transition-transform">
                <Star className="w-5 h-5 text-glow" />
              </div>
              <span className="font-semibold text-[#e0e0e8]">{cat.title}</span>
            </div>
            <span className="font-bold text-xl text-glow">{cat.prize}</span>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default PrizeVault;
