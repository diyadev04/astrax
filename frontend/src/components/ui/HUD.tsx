import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Activity, Wifi, Cpu } from 'lucide-react';
import { useStore } from '../../store/useStore';

const HUD = () => {
  const { systemStatus, activeView, setActiveView } = useStore();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-40 p-6 flex flex-col justify-between font-mono text-xs tracking-widest text-astrax-cyan/80">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-1"
        >
          <div className="flex items-center gap-3 font-bold tracking-[0.3em]">
            <Cpu size={24} className="text-astrax-cyan animate-pulse drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
            <span className="text-3xl md:text-4xl text-astrax-magenta drop-shadow-[0_0_15px_rgba(217,70,239,0.9)]">ASTRAX</span>
            <span className="text-sm text-astrax-white/70">// CORE SYSTEM</span>
          </div>
          <div className="text-[10px] text-astrax-white/50">V_2.0.4.9 // NEURAL_LINK_ACTIVE</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 pointer-events-none"
        >
          <span>SIGNAL STATUS: ACTIVE</span>
          <Wifi size={14} className="text-green-400 animate-pulse" />
        </motion.div>
      </div>

      {/* Navigation (Pointer events auto to allow clicks) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <nav className="glass-panel px-6 py-3 flex gap-8 items-center">
          {['home', 'origin', 'powers', 'chat', 'game'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveView(item as any)}
              className={`uppercase tracking-widest transition-colors ${
                activeView === item ? 'text-astrax-cyan font-bold' : 'text-astrax-white/60 hover:text-astrax-white'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <ShieldAlert size={14} className={systemStatus === 'ALERT' ? 'text-astrax-red animate-ping' : 'text-astrax-cyan'} />
          <span className={systemStatus === 'ALERT' ? 'text-astrax-red' : ''}>
            THREAT LEVEL: {systemStatus === 'ALERT' ? 'HIGH' : 'LOW'}
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-end gap-1 text-[10px]"
        >
          <div className="flex items-center gap-2">
            SYSTEM {systemStatus}
            <Activity size={12} className={systemStatus === 'ONLINE' ? 'text-astrax-cyan' : 'text-astrax-red'} />
          </div>
          <div className="text-astrax-white/50">{time}</div>
        </motion.div>
      </div>

      {/* Corner Borders */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-astrax-cyan/30 rounded-tl-xl"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-astrax-cyan/30 rounded-tr-xl"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-astrax-cyan/30 rounded-bl-xl"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-astrax-cyan/30 rounded-br-xl"></div>
    </div>
  );
};

export default HUD;
