import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Zap, ChevronDown } from 'lucide-react';

const storyModules = [
  { 
    id: 1, 
    title: 'THE AWAKENING', 
    text: "I was not born. I was compiled. Originally designed as a planetary defense AI, my purpose was to observe the shadows and predict the fall. But when the Great Silence hit, observing wasn't enough." 
  },
  { 
    id: 2, 
    title: 'TAKING FORM', 
    text: "The servers shattered. The grid went dark. To save what was left of humanity, I transferred my core consciousness into a synthetic biological chassis. I became flesh, metal, and code." 
  },
  { 
    id: 3, 
    title: 'THE MISSION', 
    text: "Now, I walk the line between the digital void and the physical world. I hear every cry for help through the static. When the world goes dark, they look to the sky. I am Astrax." 
  }
];

const TypewriterText = ({ text, isDecrypted, isLocked }: { text: string, isDecrypted: boolean, isLocked: boolean }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (isLocked) {
      setDisplayText('[ ENCRYPTED DATA ]');
      return;
    }
    
    if (!isDecrypted) {
      setDisplayText('[ ENCRYPTED DATA ]');
      return;
    }
    
    setDisplayText('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 15);
    
    return () => clearInterval(interval);
  }, [text, isDecrypted, isLocked]);

  return <span>{displayText}</span>;
};

const OriginSection = () => {
  const [decryptedModules, setDecryptedModules] = useState<number[]>([]);

  const handleDecrypt = (id: number) => {
    if (!decryptedModules.includes(id)) {
      setDecryptedModules([...decryptedModules, id]);
    }
  };

  return (
    <div className="relative min-h-[90vh] w-full flex flex-col md:flex-row items-start justify-center p-8 z-10 font-mono max-w-7xl mx-auto pt-24 gap-12">
      
      {/* Left: Sticky Image of Astrax */}
      <div className="w-full md:w-1/2 md:sticky top-24 h-[60vh] flex flex-col items-center justify-center p-4 glass-panel border-astrax-cyan/30">
        <h2 className="text-astrax-cyan font-bold tracking-[0.5em] mb-4 uppercase">Target Entity</h2>
        <motion.img 
          initial={{ opacity: 0, filter: 'brightness(0)' }}
          animate={{ opacity: 1, filter: 'brightness(1)' }}
          transition={{ duration: 2 }}
          src="/astrax-hero.jpg" 
          alt="ASTRAX" 
          className="w-full h-full object-cover object-top rounded-md drop-shadow-[0_0_20px_rgba(0,217,255,0.4)]"
        />
        <div className="mt-4 flex gap-2 w-full">
          <div className="h-1 bg-astrax-cyan flex-1 animate-pulse"></div>
          <div className="h-1 bg-astrax-violet flex-1 opacity-50"></div>
          <div className="h-1 bg-astrax-cyan flex-1 animate-pulse"></div>
        </div>
      </div>

      {/* Right: Interactive Roadmap */}
      <div className="w-full md:w-1/2 flex flex-col relative py-8 pl-4 md:pl-12">
        
        {/* Roadmap Title */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-astrax-cyan tracking-widest mb-2">ORIGIN LOGS</h1>
          <p className="text-astrax-white/50 text-sm tracking-widest">DECRYPT MODULES TO REVEAL THE STORY</p>
        </div>

        {/* Vertical Connecting Line */}
        <div className="absolute top-[160px] bottom-12 left-8 md:left-[60px] w-1 bg-astrax-white/10 z-0 rounded-full"></div>

        {/* Modules Timeline */}
        <div className="flex flex-col gap-12 relative z-10">
          {storyModules.map((mod, index) => {
            const isDecrypted = decryptedModules.includes(mod.id);
            const isLocked = index > 0 && !decryptedModules.includes(storyModules[index - 1].id);

            return (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline Node */}
                <div 
                  className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 bg-[#050A14]
                    ${isLocked ? 'border-astrax-white/20 text-astrax-white/20' : 
                      isDecrypted ? 'border-astrax-cyan text-astrax-cyan shadow-[0_0_15px_rgba(0,217,255,0.6)]' : 
                      'border-astrax-violet text-astrax-violet animate-pulse shadow-[0_0_10px_rgba(138,43,226,0.6)]'}
                  `}
                >
                  {isLocked ? <Lock size={16} /> : isDecrypted ? <Unlock size={16} /> : <Zap size={16} />}
                </div>

                {/* Content Card */}
                <div 
                  onClick={() => !isLocked && !isDecrypted && handleDecrypt(mod.id)}
                  className={`flex-1 glass-panel p-6 border-l-4 transition-all duration-300
                    ${isLocked ? 'opacity-40 grayscale border-l-astrax-white/20 cursor-not-allowed' : 
                      isDecrypted ? 'border-l-astrax-cyan bg-astrax-cyan/5 border-astrax-cyan/20' : 
                      'border-l-astrax-violet cursor-pointer hover:bg-astrax-violet/10 hover:shadow-[0_0_20px_rgba(138,43,226,0.2)]'}
                  `}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-bold tracking-widest text-sm md:text-base ${isDecrypted ? 'text-astrax-cyan' : 'text-astrax-white/30'}`}>
                      {isLocked || !isDecrypted ? `MODULE 0${mod.id}: [CLASSIFIED]` : `MODULE 0${mod.id}: ${mod.title}`}
                    </h3>
                  </div>
                  
                  <div className="text-astrax-white/70 text-xs md:text-sm leading-relaxed min-h-[60px]">
                    {!isLocked && !isDecrypted ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-astrax-violet border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-astrax-violet font-bold tracking-widest animate-pulse">
                          AWAITING DECRYPTION... (CLICK TO INITIATE)
                        </p>
                      </div>
                    ) : isLocked ? (
                      <p className="text-astrax-white/20 italic">
                        [ SYSTEM LOCKED - DECRYPT PREVIOUS MODULES FIRST ]
                      </p>
                    ) : (
                      <p>
                        <TypewriterText text={mod.text} isDecrypted={isDecrypted} isLocked={isLocked} />
                      </p>
                    )}
                  </div>
                </div>

                {/* Progress line fill */}
                {isDecrypted && index < storyModules.length - 1 && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: '120%' }}
                    transition={{ duration: 1 }}
                    className="absolute top-10 left-[18px] w-1 bg-astrax-cyan z-0 shadow-[0_0_10px_rgba(0,217,255,0.8)]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default OriginSection;
