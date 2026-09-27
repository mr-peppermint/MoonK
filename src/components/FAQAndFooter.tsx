import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useInView } from '../hooks/useAnimations';
import { playHudClick } from '../audio/soundEffects';
import { Plus, Minus, GitBranch, ExternalLink, Camera, Link, Mail, MapPin, Heart, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Who can participate?',
    a: 'Any college student from India. Teams of 2-4 members. Individual participation is also welcome — we\'ll help you find a team at the event.'
  },
  {
    q: 'Is there a registration fee?',
    a: 'No! MULTIVERSE OF CODE is completely free for all participants. All meals, swag, and cloud credits are on us.'
  },
  {
    q: 'What should I bring?',
    a: 'Your laptop, charger, student ID, and an unstoppable desire to build. We provide the rest — Wi-Fi, power, snacks, and mentors.'
  },
  {
    q: 'Do I need prior hackathon experience?',
    a: 'Absolutely not. Whether you\'re a first-timer or a seasoned hacker, there\'s a track for everyone. We have mentors to guide you every step of the way.'
  },
  {
    q: 'What\'s the judging criteria?',
    a: 'Innovation (30%), Technical Complexity (25%), Design & UX (20%), Completeness (15%), and Presentation (10%). Judges include industry professionals and Bennett faculty.'
  },
  {
    q: 'Where is the venue?',
    a: 'Bennett University Campus, Greater Noida, Uttar Pradesh. Detailed directions and campus maps will be shared upon registration.'
  }
];

export default function FAQAndFooter() {
  const { theme } = useTheme();
  const [refFaq, isInViewFaq] = useInView(0.1);
  const [refFooter, isInViewFooter] = useInView(0.1);
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    playHudClick();
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <section 
        id="faq" 
        ref={refFaq}
        className="py-20 relative overflow-hidden"
        style={{ '--glow-color': theme.color } as React.CSSProperties}
      >
        <div className="absolute inset-0 hud-grid opacity-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isInViewFaq ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider text-glow font-mono uppercase">
              S.H.I.E.L.D. CLASSIFIED Q&A
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className={`glass-panel border transform transition-all duration-500 delay-${index * 100} ${isInViewFaq ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${isOpen ? 'border-glow bg-[#0d0d18]' : 'border-[#1a1a2e] bg-[#0a0a0f]'}`}
                  style={isOpen ? { borderColor: theme.color } : {}}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none group"
                  >
                    <span className="font-semibold text-lg text-gray-200 group-hover:text-white transition-colors">
                      {faq.q}
                    </span>
                    <span className="ml-4 flex-shrink-0" style={{ color: isOpen ? theme.color : '#8888a0' }}>
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="px-6 pb-5 text-gray-400">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer 
        ref={refFooter}
        className="bg-[#050508] border-t border-[#1a1a2e] pt-16 pb-8 relative overflow-hidden"
        style={{ '--glow-color': theme.color } as React.CSSProperties}
      >
        <div className="absolute inset-0 hud-grid opacity-5 pointer-events-none" />
        
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transform transition-all duration-1000 ${isInViewFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-4 font-mono uppercase tracking-wider text-glow">
                MULTIVERSE OF CODE
              </h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                A 36-hour hackathon where brilliant minds converge to build the future, one timeline at a time.
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">
                Organized by GFG Student Chapter, Bennett University
              </p>
            </div>
            
            {/* Column 2 */}
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#mission" className="hover:text-white transition-colors">Mission</a></li>
                <li><a href="#tracks" className="hover:text-white transition-colors">Tracks</a></li>
                <li><a href="#timeline" className="hover:text-white transition-colors">Timeline</a></li>
                <li><a href="#prizes" className="hover:text-white transition-colors">Prizes</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">Connect</h4>
              <div className="flex space-x-4 text-gray-400">
                <a href="#" className="hover:text-white hover:scale-110 transition-all"><GitBranch size={20} /></a>
                <a href="#" className="hover:text-white hover:scale-110 transition-all"><ExternalLink size={20} /></a>
                <a href="#" className="hover:text-white hover:scale-110 transition-all"><Camera size={20} /></a>
                <a href="#" className="hover:text-white hover:scale-110 transition-all"><Link size={20} /></a>
                <a href="#" className="hover:text-white hover:scale-110 transition-all"><MessageCircle size={20} /></a>
              </div>
            </div>
            
            {/* Column 4 */}
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 flex-shrink-0" style={{ color: theme.color }} />
                  <a href="mailto:gfg@bennett.edu.in" className="hover:text-white transition-colors">gfg@bennett.edu.in</a>
                </li>
                <li className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" style={{ color: theme.color }} />
                  <span>Bennett University, Greater Noida</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-[#1a1a2e] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
            <p>© 2026 GFG Student Chapter, Bennett University. All rights reserved.</p>
            <p className="flex items-center">
              Made with <Heart size={12} className="mx-1 text-red-500" fill="currentColor" /> and Vibranium
            </p>
          </div>
          
          <div className="mt-4 text-[10px] text-gray-700 text-center uppercase tracking-widest max-w-3xl mx-auto">
            This is a fan-made event website. Marvel, Avengers, and related characters are trademarks of Marvel Entertainment, LLC.
          </div>
        </div>
      </footer>
    </>
  );
}
