import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignalRunGame from './SignalRunGame';
import NeuralLinkGame from './NeuralLinkGame';
import { useStore } from '../../store/useStore';

const GameLauncher = () => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover' | 'victory'>('menu');
  const [activeMission, setActiveMission] = useState<'signal' | 'neural' | null>(null);
  const { setActiveView, setGameScore } = useStore();
  const [stats, setStats] = useState({ score: 0, signals: 0, combo: 1, time: '00:00' });

  const startSignalRun = () => {
    setActiveMission('signal');
    setGameState('playing');
  };

  const startNeuralLink = () => {
    setActiveMission('neural');
    setGameState('playing');
  };

  const onGameOver = (finalStats: any) => {
    setStats(finalStats);
    setGameScore(finalStats.score);
    setGameState('gameover');
  };

  const onVictory = (finalStats: any) => {
    setStats(finalStats);
    setGameScore(finalStats.score);
    setGameState('victory');
  };

  if (gameState === 'playing') {
    return (
      <div className="absolute inset-0 z-50 bg-astrax-black">
        {activeMission === 'signal' && <SignalRunGame onGameOver={onGameOver} onVictory={onVictory} />}
        {activeMission === 'neural' && <NeuralLinkGame onGameOver={onGameOver} onVictory={onVictory} />}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center font-mono">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-12 relative overflow-hidden w-full">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLCAyNDAsIDI1NSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50 z-0"></div>
        
        <div className="relative z-10">
          {gameState === 'menu' && (
            <>
              <h1 className="text-5xl md:text-7xl font-bold tracking-[0.2em] mb-4 holographic-text">MISSION HUB</h1>
              <p className="text-xl tracking-widest text-astrax-white/80 mb-12">"AWAITING DEPLOYMENT PROTOCOL."</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto mb-12">
                {/* Mission 01 */}
                <div className="bg-black/40 border border-astrax-cyan/30 p-6 rounded-xl hover:border-astrax-cyan transition-colors text-left flex flex-col justify-between group">
                  <div>
                    <h3 className="text-2xl font-bold tracking-widest text-astrax-cyan mb-2 group-hover:text-white transition-colors">MISSION 01: SIGNAL RUN</h3>
                    <p className="text-astrax-white/60 text-sm mb-4">Navigate the grid. Recover lost signals. Avoid rogue AI.</p>
                    <div className="text-xs text-astrax-white/40 space-y-1 mb-6">
                      <p>TYPE: 2D EVASION</p>
                      <p>CONTROLS: W A S D</p>
                    </div>
                  </div>
                  <button onClick={startSignalRun} className="cinematic-btn text-xs w-full">
                    <span className="relative z-10">DEPLOY MISSION 01</span>
                  </button>
                </div>

                {/* Mission 02 */}
                <div className="bg-black/40 border border-astrax-violet/30 p-6 rounded-xl hover:border-astrax-violet transition-colors text-left flex flex-col justify-between group">
                  <div>
                    <h3 className="text-2xl font-bold tracking-widest text-astrax-violet mb-2 group-hover:text-white transition-colors">MISSION 02: NEURAL LINK</h3>
                    <p className="text-astrax-white/60 text-sm mb-4">Enter the 3D cyber-void. Restore corrupted neural nodes before time runs out.</p>
                    <div className="text-xs text-astrax-white/40 space-y-1 mb-6">
                      <p>TYPE: 3D INTERACTIVE</p>
                      <p>CONTROLS: MOUSE TARGETING</p>
                    </div>
                  </div>
                  <button onClick={startNeuralLink} className="cinematic-btn text-xs w-full border-astrax-violet/50 hover:border-astrax-violet hover:text-white">
                    <span className="relative z-10 text-astrax-violet group-hover:text-white">DEPLOY MISSION 02</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {gameState === 'gameover' && (
            <>
              <h2 className="text-5xl font-bold text-astrax-red mb-4 tracking-[0.2em]">CONNECTION LOST</h2>
              <p className="text-xl tracking-widest text-astrax-white/80 mb-12">THE SIGNAL DISAPPEARED.</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12 text-left bg-black/50 p-6 border border-astrax-red/30 rounded-xl">
                <span className="text-astrax-white/60">FINAL SCORE</span>
                <span className="text-right text-astrax-cyan font-bold">{stats.score}</span>
                <span className="text-astrax-white/60">SIGNALS</span>
                <span className="text-right text-astrax-cyan font-bold">{stats.signals}</span>
                <span className="text-astrax-white/60">MAX COMBO</span>
                <span className="text-right text-astrax-cyan font-bold">x{stats.combo}</span>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => setGameState('menu')} className="cinematic-btn text-xs">
                  <span className="relative z-10">MISSION SELECT</span>
                </button>
                <button onClick={() => setActiveView('home')} className="cinematic-btn text-xs border-astrax-violet/50 hover:border-astrax-violet">
                  <span className="relative z-10">RETURN TO BASE</span>
                </button>
              </div>
            </>
          )}

          {gameState === 'victory' && (
            <>
              <h2 className="text-5xl font-bold text-green-400 mb-4 tracking-[0.2em] drop-shadow-[0_0_10px_#4ade80]">MISSION COMPLETE</h2>
              <p className="text-xl tracking-widest text-astrax-white/80 mb-12">THE SIGNAL HAS BEEN RESTORED.</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12 text-left bg-black/50 p-6 border border-green-400/30 rounded-xl">
                <span className="text-astrax-white/60">FINAL SCORE</span>
                <span className="text-right text-green-400 font-bold">{stats.score}</span>
                <span className="text-astrax-white/60">SIGNALS</span>
                <span className="text-right text-green-400 font-bold">{stats.signals}</span>
                <span className="text-astrax-white/60">MAX COMBO</span>
                <span className="text-right text-green-400 font-bold">x{stats.combo}</span>
                <span className="text-astrax-white/60">TIME LEFT</span>
                <span className="text-right text-green-400 font-bold">{stats.time}</span>
              </div>

              <div className="flex justify-center gap-4">
                <button onClick={() => setGameState('menu')} className="cinematic-btn text-xs border-green-400/50 hover:border-green-400">
                  <span className="relative z-10">MISSION SELECT</span>
                </button>
                <button onClick={() => setActiveView('home')} className="cinematic-btn text-xs">
                  <span className="relative z-10">RETURN TO BASE</span>
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default GameLauncher;
