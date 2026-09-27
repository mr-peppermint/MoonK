import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Shield } from 'lucide-react';
import { useTheme, STONE_THEMES, type InfinityStone } from '../context/ThemeContext';
import { playHudClick, playStoneSwitch } from '../audio/soundEffects';

const navLinks = [
  { name: 'Mission', href: '#mission' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Prizes', href: '#prizes' },
  { name: 'FAQ', href: '#faq' },
];

const Navbar: React.FC = () => {
  const { stone, theme, setStone, soundEnabled, toggleSound } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (soundEnabled) playHudClick();
    setMobileMenuOpen(false);
    
    // Simple smooth scroll implementation
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRegisterClick = () => {
    if (soundEnabled) playHudClick();
    window.dispatchEvent(new CustomEvent('openRegistration'));
    setMobileMenuOpen(false);
  };

  const handleStoneClick = (stoneId: InfinityStone) => {
    if (stoneId !== stone && soundEnabled) playStoneSwitch();
    setStone(stoneId);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-glow'
          : 'bg-transparent pt-4'
      }`}
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('#home')}>
            <Shield className="w-6 h-6 text-[#2f8d46]" />
            <span className="font-bold tracking-wider text-[#2f8d46] text-lg uppercase hidden sm:block">
              GFG × BENNETT
            </span>
            <span className="font-bold tracking-wider text-[#2f8d46] text-lg uppercase sm:hidden">
              GFG
            </span>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex space-x-1 border border-[#1a1a2e] rounded-full px-2 py-1 bg-[#0d0d18]/50 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-[#8888a0] hover:text-[#e0e0e8] hover:text-glow px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right: Controls & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Sound Toggle */}
            <button
              onClick={() => {
                if (!soundEnabled) playHudClick();
                toggleSound();
              }}
              className="text-[#8888a0] hover:text-[#e0e0e8] transition-colors hover:scale-110"
              aria-label="Toggle sound"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Infinity Stone Switcher */}
            <div className="flex items-center space-x-2 bg-[#0d0d18] rounded-full p-1 border border-[#1a1a2e]">
              {Object.keys(STONE_THEMES).map((s) => {
                const sId = s as InfinityStone;
                const sTheme = STONE_THEMES[sId];
                const isActive = stone === sId;
                return (
                  <button
                    key={sId}
                    onClick={() => handleStoneClick(sId)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      isActive ? 'scale-125 ring-2 ring-white box-glow' : 'opacity-50 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ 
                      backgroundColor: sTheme.color,
                      boxShadow: isActive ? `0 0 10px ${sTheme.color}, 0 0 20px ${sTheme.color}` : 'none'
                    }}
                    title={sTheme.name}
                    aria-label={`Select ${sTheme.name} theme`}
                  />
                );
              })}
            </div>

            {/* Register CTA */}
            <button
              onClick={handleRegisterClick}
              className="px-6 py-2 rounded border border-glow text-glow font-bold uppercase tracking-wider hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Register</span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center z-50">
            <button
              onClick={() => {
                if (soundEnabled) playHudClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="text-[#e0e0e8] hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-[#050508]/95 backdrop-blur-xl transition-all duration-300 ease-in-out flex flex-col pt-20 ${
          mobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-8 flex-1 pb-20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-2xl font-bold tracking-widest uppercase text-[#8888a0] hover:text-[#e0e0e8] hover:text-glow transition-all"
            >
              {link.name}
            </a>
          ))}
          
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[#1a1a2e] to-transparent my-6" />

          {/* Mobile Stone Switcher */}
          <div className="flex items-center space-x-4">
            {Object.keys(STONE_THEMES).map((s) => {
              const sId = s as InfinityStone;
              const sTheme = STONE_THEMES[sId];
              const isActive = stone === sId;
              return (
                <button
                  key={sId}
                  onClick={() => handleStoneClick(sId)}
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    isActive ? 'scale-125 ring-2 ring-white box-glow' : 'opacity-50 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ 
                    backgroundColor: sTheme.color,
                    boxShadow: isActive ? `0 0 10px ${sTheme.color}, 0 0 20px ${sTheme.color}` : 'none'
                  }}
                />
              );
            })}
          </div>

          <div className="flex items-center space-x-8 mt-6">
            <button
              onClick={() => {
                if (!soundEnabled) playHudClick();
                toggleSound();
              }}
              className="flex items-center gap-2 text-[#8888a0] hover:text-white transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              <span className="uppercase tracking-wider text-sm">Sound</span>
            </button>
          </div>

          <button
            onClick={handleRegisterClick}
            className="mt-8 px-10 py-3 rounded border border-glow text-glow font-bold uppercase tracking-wider hover:bg-white/10 transition-all text-xl"
          >
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
