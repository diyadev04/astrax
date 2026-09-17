import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useStore } from './store/useStore';
import IntroSequence from './components/ui/IntroSequence';
import HUD from './components/ui/HUD';
import HeroScene from './components/3d/HeroScene';
import ChatBot from './components/ui/ChatBot';
import GameLauncher from './components/game/GameLauncher';
import OriginSection from './components/sections/OriginSection';
import PowerSystem from './components/sections/PowerSystem';

function App() {
  const { hasSeenIntro, activeView } = useStore();
  
  // Advanced Cursor State
  const cursorX = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorXOuter = useSpring(0, { stiffness: 100, damping: 30 });
  const cursorYOuter = useSpring(0, { stiffness: 100, damping: 30 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorXOuter.set(e.clientX);
      cursorYOuter.set(e.clientY);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === 'button' || 
          (e.target as HTMLElement).closest('button') ||
          (e.target as HTMLElement).tagName.toLowerCase() === 'a') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!hasSeenIntro) {
    return <IntroSequence />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-astrax-dark cursor-none">
      {/* Advanced Animated Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-astrax-cyan rounded-full pointer-events-none z-[9999] mix-blend-screen shadow-[0_0_10px_#00f0ff]"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 0 : 1 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 border-2 border-astrax-cyan/50 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{ x: cursorXOuter, y: cursorYOuter, translateX: '-50%', translateY: '-50%' }}
        animate={{ 
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? '#8a2be2' : 'rgba(0, 240, 255, 0.5)',
          rotate: isHovering ? 45 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-2 bg-astrax-violet absolute top-0"></div>
            <div className="w-1 h-2 bg-astrax-violet absolute bottom-0"></div>
            <div className="w-2 h-1 bg-astrax-violet absolute left-0"></div>
            <div className="w-2 h-1 bg-astrax-violet absolute right-0"></div>
          </div>
        )}
      </motion.div>
      
      {/* 3D Environment Background */}
      <HeroScene />
      
      {/* Overlay UI */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        <HUD />
        
        <main className="w-full h-full pt-24 px-8 pb-8 pointer-events-auto overflow-y-auto">
          {activeView === 'home' && (
            <div className="flex flex-col md:flex-row items-center justify-between h-full max-w-7xl mx-auto gap-12 mt-[-5vh]">
              
              {/* Left Side: Text and Buttons */}
              <div className="flex flex-col items-start justify-center flex-1 text-left z-10">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-astrax-cyan via-astrax-white to-astrax-violet drop-shadow-[0_0_20px_rgba(0,217,255,0.5)]">ASTRAX</h1>
                <p className="text-xl md:text-2xl text-astrax-white/80 font-mono tracking-widest max-w-xl mb-12 border-l-4 border-astrax-cyan pl-6">
                  "WHEN THE WORLD GOES DARK, I FOLLOW THE SIGNAL."
                </p>
                
                <div className="flex gap-6">
                  <button 
                    onClick={() => useStore.getState().setActiveView('game')}
                    className="cinematic-btn"
                  >
                    <span className="relative z-10">ENTER THE MISSION</span>
                  </button>
                  <button 
                    onClick={() => useStore.getState().setActiveView('chat')}
                    className="cinematic-btn border-astrax-violet/50 hover:border-astrax-violet"
                  >
                    <span className="relative z-10">TALK TO ASTRAX</span>
                  </button>
                </div>
              </div>

              {/* Right Side: ASTRAX Image and Video Panel */}
              <div 
                className="flex-1 relative flex justify-center items-center h-[60vh] w-full z-10 mt-12 md:mt-0"
                style={{ perspective: '1000px' }}
              >
                
                {/* Main ASTRAX Image with 3D Revolve */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    rotateY: [0, 360],
                    y: [-10, 10, -10]
                  }}
                  transition={{ 
                    opacity: { duration: 1 },
                    x: { duration: 1 },
                    rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                    y: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                  style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'visible' }}
                  className="relative z-20 w-3/4 h-full rounded-2xl overflow-hidden border border-astrax-cyan/30 shadow-[0_0_50px_rgba(77,184,255,0.3)]"
                >
                  <img src="/astrax-hero.jpg" alt="ASTRAX" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-astrax-black via-transparent to-transparent pointer-events-none"></div>
                </motion.div>

              </div>

            </div>
          )}

          {activeView === 'chat' && <ChatBot />}
          {activeView === 'game' && <GameLauncher />}
          {activeView === 'origin' && <OriginSection />}
          {activeView === 'powers' && <PowerSystem />}
          
        </main>
      </div>
    </div>
  );
}

export default App;
