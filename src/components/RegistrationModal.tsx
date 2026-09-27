import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { playHudClick, playQuantumSnap, playPowerSurge } from '../audio/soundEffects';
import { X, User, Mail, GraduationCap, Sword, Layers, Users, Download, Shield, Fingerprint } from 'lucide-react';

interface RegistrationData {
  fullName: string;
  email: string;
  college: string;
  codename: string;
  skillClass: string;
  track: string;
  teamSize: string;
}

export default function RegistrationModal() {
  const { theme, soundEnabled } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agentId, setAgentId] = useState('');
  
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    college: '',
    codename: '',
    skillClass: 'Frontend Sorcerer',
    track: 'Quantum Web Applications',
    teamSize: '1 (Solo Hero)'
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        college: '',
        codename: '',
        skillClass: 'Frontend Sorcerer',
        track: 'Quantum Web Applications',
        teamSize: '1 (Solo Hero)'
      });
      if (soundEnabled) playPowerSurge();
    };

    window.addEventListener('openRegistration', handleOpen);
    return () => window.removeEventListener('openRegistration', handleOpen);
  }, [soundEnabled]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    if (soundEnabled) playHudClick();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (soundEnabled) playQuantumSnap();
    
    // Generate Random Agent ID
    const randomHex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
    setAgentId(`AVG-2026-${randomHex}`);
    
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050508]/80 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      style={{ '--glow-color': theme.color } as React.CSSProperties}
    >
      <div 
        ref={modalRef}
        className="glass-panel border-glow w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-300 flex flex-col"
        style={{
          background: 'rgba(13, 13, 24, 0.95)',
        }}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#8888a0] hover:text-[#e0e0e8] transition-colors z-10"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <div className="p-6 md:p-8">
            <div className="mb-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: theme.color }} />
              <h2 className="text-2xl md:text-3xl font-black text-glow tracking-widest mb-2" style={{ color: theme.color }}>
                AGENT REGISTRATION PROTOCOL
              </h2>
              <p className="text-[#8888a0] uppercase tracking-wider text-sm">
                Initialize your mission credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-[#8888a0] uppercase flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input 
                    type="text" 
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1a1a2e] p-3 text-[#e0e0e8] outline-none focus:border-glow transition-all"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs text-[#8888a0] uppercase flex items-center gap-2">
                    <Mail size={14} /> Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1a1a2e] p-3 text-[#e0e0e8] outline-none focus:border-glow transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#8888a0] uppercase flex items-center gap-2">
                    <GraduationCap size={14} /> College/University
                  </label>
                  <input 
                    type="text" 
                    name="college"
                    required
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1a1a2e] p-3 text-[#e0e0e8] outline-none focus:border-glow transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#8888a0] uppercase flex items-center gap-2">
                    <Sword size={14} /> Superhero Codename
                  </label>
                  <input 
                    type="text" 
                    name="codename"
                    placeholder="e.g., CodeSlinger3000"
                    value={formData.codename}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1a1a2e] p-3 text-[#e0e0e8] outline-none focus:border-glow transition-all placeholder:text-[#8888a0]/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#8888a0] uppercase flex items-center gap-2">
                    <Layers size={14} /> Skill Class
                  </label>
                  <select 
                    name="skillClass"
                    value={formData.skillClass}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1a1a2e] p-3 text-[#e0e0e8] outline-none focus:border-glow transition-all appearance-none"
                  >
                    <option>Frontend Sorcerer</option>
                    <option>Backend Titan</option>
                    <option>AI Synthesizer</option>
                    <option>Full-Stack Avenger</option>
                    <option>UI/UX Illusionist</option>
                    <option>Security Sentinel</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#8888a0] uppercase flex items-center gap-2">
                    <Shield size={14} /> Preferred Track
                  </label>
                  <select 
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1a1a2e] p-3 text-[#e0e0e8] outline-none focus:border-glow transition-all appearance-none"
                  >
                    <option>Quantum Web Applications</option>
                    <option>Sentient AI Systems</option>
                    <option>Multiverse Mobile Apps</option>
                    <option>Cryptographic Defense</option>
                  </select>
                </div>
                
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-[#8888a0] uppercase flex items-center gap-2">
                    <Users size={14} /> Team Size
                  </label>
                  <select 
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1a1a2e] p-3 text-[#e0e0e8] outline-none focus:border-glow transition-all appearance-none"
                  >
                    <option>1 (Solo Hero)</option>
                    <option>2 (Dynamic Duo)</option>
                    <option>3 (Trinity Force)</option>
                    <option>4 (Full Squad)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full py-4 font-bold tracking-widest text-[#050508] transition-all relative overflow-hidden group uppercase"
                  style={{ backgroundColor: theme.color }}
                  onMouseEnter={() => {
                    if (soundEnabled) playHudClick();
                  }}
                >
                  <span className="relative z-10">Initialize Agent Protocol</span>
                  <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-black text-glow tracking-widest mb-8 text-center" style={{ color: theme.color }}>
              REGISTRATION COMPLETE
            </h2>
            
            <div 
              className="w-full max-w-sm border p-6 relative overflow-hidden bg-[#0a0a0f] shadow-lg mb-8 group"
              style={{ borderColor: theme.color, boxShadow: `0 0 20px ${theme.color}40` }}
            >
              <div className="absolute top-0 right-0 p-2 opacity-20">
                <Fingerprint size={80} style={{ color: theme.color }} />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="border-b border-[#1a1a2e] pb-4 mb-4">
                  <p className="text-[#8888a0] text-xs uppercase tracking-widest mb-1">Agent Identity</p>
                  <p className="text-2xl font-bold text-[#e0e0e8] uppercase">{formData.codename || formData.fullName}</p>
                  <p className="text-sm text-[#8888a0]">{formData.fullName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#8888a0] text-xs uppercase mb-1">Agent ID</p>
                    <p className="font-mono text-sm" style={{ color: theme.color }}>{agentId}</p>
                  </div>
                  <div>
                    <p className="text-[#8888a0] text-xs uppercase mb-1">Clearance</p>
                    <p className="font-bold text-[#e0e0e8]">OMEGA LEVEL</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#8888a0] text-xs uppercase mb-1">Designation</p>
                    <p className="text-[#e0e0e8] text-sm">{formData.skillClass}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#8888a0] text-xs uppercase mb-1">Primary Directive</p>
                    <p className="text-[#e0e0e8] text-sm">{formData.track}</p>
                  </div>
                </div>
                
                <div className="pt-4 mt-4 border-t border-[#1a1a2e]">
                  <div className="flex gap-1 h-8 opacity-70">
                    {[...Array(30)].map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-current" 
                        style={{ 
                          height: `${Math.max(20, Math.random() * 100)}%`,
                          color: i % 3 === 0 ? theme.color : '#8888a0',
                          opacity: Math.random() * 0.5 + 0.5
                        }}
                      ></div>
                    ))}
                  </div>
                  <p className="text-center font-mono text-xs mt-2 text-[#8888a0] tracking-widest">
                    {agentId.replace(/-/g, '')}
                  </p>
                </div>
              </div>
              
              {/* Scan line effect */}
              <div 
                className="absolute inset-0 h-full w-full pointer-events-none opacity-20"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${theme.color}, transparent)`,
                  animation: 'scan-line 2s linear infinite'
                }}
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm">
              <button 
                onClick={() => alert('Pass saved!')}
                className="flex-1 py-3 border flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-colors hover:bg-white/5"
                style={{ borderColor: theme.color, color: theme.color }}
              >
                <Download size={16} /> Download Pass
              </button>
              <button 
                onClick={closeModal}
                className="flex-1 py-3 border border-[#1a1a2e] text-[#e0e0e8] flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-colors hover:bg-white/5"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
