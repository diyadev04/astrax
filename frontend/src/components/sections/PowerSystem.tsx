import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Activity, Zap, Shield, RotateCcw, AlertTriangle } from 'lucide-react';

const powers = [
  { id: 'vision', name: 'SIGNAL VISION', desc: 'See what others cannot. Detect hidden patterns in the noise.', icon: Eye, color: '#00f0ff', anim: 'pulse' },
  { id: 'link', name: 'NEURAL LINK', desc: 'Connect to the hidden signal. Synchronize with the network.', icon: Activity, color: '#8a2be2', anim: 'wave' },
  { id: 'energy', name: 'ENERGY CONTROL', desc: 'Convert signal into force. Manipulate kinetic output.', icon: Zap, color: '#f5d300', anim: 'shake' },
  { id: 'shield', name: 'SHIELD MATRIX', desc: 'Protect the people behind the signal. Deploy quantum barriers.', icon: Shield, color: '#4ade80', anim: 'expand' },
  { id: 'quantum', name: 'QUANTUM SHIFT', desc: 'Move beyond conventional limits. Spatial repositioning.', icon: RotateCcw, color: '#ff2a2a', anim: 'spin' },
  { id: 'threat', name: 'THREAT DETECTION', desc: 'Recognize danger before it arrives. Predictive analysis.', icon: AlertTriangle, color: '#ff9900', anim: 'ping' },
];

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
};

const playPowerSound = (powerName: string) => {
  // 1. Hammer Hit Sound (Sharp, loud metallic impact)
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const t = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    osc.type = 'square'; // Harsh metallic tone
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(50, t + 0.1); // Fast drop like a hammer strike
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(3, t); // VERY loud punch
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3); // Quick decay
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.3);
  } catch (e) {
    console.error("Audio playback failed", e);
  }

  // 2. Bold Loud Voice Announcer
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const msg = new SpeechSynthesisUtterance(`${powerName} INITIATED`);
    
    // Configure for a bold, commanding, deep AI voice
    msg.pitch = 0.1; 
    msg.rate = 0.85;
    msg.volume = 1;
    
    // Attempt to find a deep/robotic voice if the OS supports it
    const voices = window.speechSynthesis.getVoices();
    const deepVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('bold'));
    if (deepVoice) {
      msg.voice = deepVoice;
    }
    
    window.speechSynthesis.speak(msg);
  }
};

const PowerSystem = () => {
  const [activePower, setActivePower] = useState(powers[0]);

  const getAnimaticVariants = (animType: string): any => {
    switch (animType) {
      case 'pulse': return { animate: { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5], transition: { repeat: Infinity, duration: 2 } } };
      case 'wave': return { animate: { y: [0, -15, 0], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } } };
      case 'shake': return { animate: { x: [-5, 5, -5, 5, 0], transition: { repeat: Infinity, duration: 0.5, repeatDelay: 1 } } };
      case 'expand': return { animate: { scale: [1, 1.5], opacity: [1, 0], transition: { repeat: Infinity, duration: 1.5 } } };
      case 'spin': return { animate: { rotate: [0, 360], transition: { repeat: Infinity, duration: 3, ease: "linear" } } };
      case 'ping': return { animate: { scale: [1, 2], opacity: [1, 0], transition: { repeat: Infinity, duration: 1 } } };
      default: return {};
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-7xl mx-auto py-12 font-mono relative z-10">
      <h2 className="text-sm tracking-[0.5em] text-astrax-cyan mb-12 text-center">SYSTEM CAPABILITIES</h2>
      
      <div className="flex flex-col lg:flex-row gap-12 w-full px-8 items-center lg:items-start">
        
        {/* Power Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full lg:w-1/2">
          {powers.map((power) => {
            const Icon = power.icon;
            const isActive = activePower.id === power.id;
            
            return (
              <motion.div
                key={power.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setActivePower(power);
                  playPowerSound(power.name);
                }}
                className={`cursor-pointer glass-panel p-6 relative overflow-hidden group transition-all duration-300 ${isActive ? 'border-astrax-cyan scale-105' : 'border-white/10 hover:border-white/30'}`}
                style={{ 
                  boxShadow: isActive ? `0 0 20px ${power.color}40, inset 0 0 20px ${power.color}20` : 'none',
                  backgroundColor: isActive ? `${power.color}10` : ''
                }}
              >
                <div className="relative z-10 flex flex-col items-center text-center gap-3">
                  <Icon size={24} style={{ color: isActive ? power.color : 'rgba(255,255,255,0.5)' }} className="transition-colors" />
                  <h3 className="font-bold tracking-widest text-[10px]" style={{ color: isActive ? power.color : 'white' }}>{power.name}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animatic Display Center */}
        <div className="w-full lg:w-1/2 relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePower.id}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 glass-panel p-10 flex flex-col items-center justify-center border-l-4"
              style={{ borderLeftColor: activePower.color }}
            >
              
              {/* Animatic Visualizer */}
              <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                {/* Background effect based on anim type */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-dashed"
                  style={{ borderColor: activePower.color }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute inset-4 rounded-full border border-white/20"
                />
                
                {/* The Core Animatic */}
                <div className="relative z-10 p-8 rounded-full bg-astrax-black/50 backdrop-blur-md">
                  <motion.div {...getAnimaticVariants(activePower.anim)}>
                    <activePower.icon size={64} style={{ color: activePower.color, filter: `drop-shadow(0 0 15px ${activePower.color})` }} />
                  </motion.div>
                  
                  {/* Extra shield visual specifically for shield */}
                  {activePower.id === 'shield' && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border-4"
                      style={{ borderColor: activePower.color }}
                      {...getAnimaticVariants('expand')}
                    />
                  )}
                </div>
              </div>

              {/* Data Readout */}
              <div className="w-full text-left bg-black/40 p-6 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-4 text-xs text-astrax-white/50">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: activePower.color }}></span>
                  DATA_STREAM_ACTIVE
                </div>
                <h3 className="text-2xl font-bold tracking-[0.2em] mb-4" style={{ color: activePower.color, textShadow: `0 0 10px ${activePower.color}80` }}>
                  {activePower.name}
                </h3>
                <p className="text-sm text-astrax-white/80 tracking-wide leading-relaxed min-h-[60px]">
                  <TypewriterText text={activePower.desc} />
                </p>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PowerSystem;
