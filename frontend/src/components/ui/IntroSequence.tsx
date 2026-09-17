import React, { useState, useRef } from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const IntroSequence = () => {
  const setHasSeenIntro = useStore((state) => state.setHasSeenIntro);
  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStart = () => {
    setStarted(true);
    setIsPlaying(true);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setTimeout(() => setHasSeenIntro(true), 1000); // Wait for fade out
  };

  return (
    <AnimatePresence>
      {!started && (
        <motion.div 
          exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 bg-astrax-black z-[10000] flex flex-col items-center justify-center font-mono overflow-hidden"
        >
          {/* Animated Background Grid for depth */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

          {/* Highly Animated Professional Logo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              filter: ["hue-rotate(0deg)", "hue-rotate(15deg)", "hue-rotate(0deg)"]
            }}
            transition={{ duration: 1.5, ease: "easeOut", filter: { duration: 4, repeat: Infinity } }}
            className="relative z-10 mb-12 flex flex-col items-center"
          >
            <div className="relative">
              <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-astrax-cyan via-astrax-white to-astrax-violet tracking-[0.2em] drop-shadow-[0_0_25px_rgba(0,217,255,0.8)]">
                ASTRAX
              </h1>
              {/* 3D Holographic Glitch overlay on Logo */}
              <h1 className="absolute top-0 left-0 text-6xl md:text-9xl font-black text-astrax-cyan tracking-[0.2em] opacity-30 mix-blend-screen animate-pulse blur-[2px]">
                ASTRAX
              </h1>
              <h1 className="absolute -top-1 -left-1 text-6xl md:text-9xl font-black text-astrax-violet tracking-[0.2em] opacity-20 mix-blend-screen animate-ping blur-[4px]">
                ASTRAX
              </h1>
            </div>
            <div className="mt-4 flex gap-4 text-astrax-cyan/70 tracking-[0.5em] text-sm md:text-base font-bold">
              <span>CYBER</span>
              <span>//</span>
              <span>NEBULA</span>
              <span>//</span>
              <span>CORE</span>
            </div>
          </motion.div>

          <motion.button 
            onClick={handleStart}
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: [
                "0px 0px 30px rgba(0,217,255,0.2), inset 0px 0px 20px rgba(0,217,255,0.2)", 
                "0px 0px 70px rgba(0,217,255,0.6), inset 0px 0px 40px rgba(0,217,255,0.4)", 
                "0px 0px 30px rgba(0,217,255,0.2), inset 0px 0px 20px rgba(0,217,255,0.2)"
              ]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.5 },
              y: { duration: 1, delay: 0.5, ease: "easeOut" },
              boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(0,217,255,0.15)",
              textShadow: "0px 0px 12px rgba(0,217,255,1)",
              borderColor: "rgba(0,217,255,1)"
            }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 text-astrax-cyan text-sm md:text-2xl font-bold tracking-[0.4em] transition-colors border-[3px] border-astrax-cyan/60 px-10 py-5 rounded-sm overflow-hidden group backdrop-blur-md bg-astrax-dark/30 uppercase"
          >
            {/* Inner Glitch/Scanline effect on hover */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-astrax-cyan/20 to-transparent -translate-y-full group-hover:animate-[scan_1.5s_linear_infinite]" />
            ESCAPE TO THE WORLD OF ASTRAX
          </motion.button>
        </motion.div>
      )}

      {started && isPlaying && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center overflow-hidden group"
        >
          <video 
            ref={videoRef}
            autoPlay
            muted={false} // Sound works because they clicked!
            onEnded={handleVideoEnd}
            className="w-full h-full object-cover"
          >
            <source src="/astrax-rescue.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2021/08/04/83870-584758712_large.mp4" type="video/mp4" />
          </video>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroSequence;
