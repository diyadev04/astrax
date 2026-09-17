import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';

interface GameProps {
  onGameOver: (stats: any) => void;
  onVictory: (stats: any) => void;
}

const SignalRunGame: React.FC<GameProps> = ({ onGameOver, onVictory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Game state
    let animationId: number;
    let score = 0;
    let signalsCollected = 0;
    let combo = 1;
    let maxCombo = 1;
    let comboTimer = 0;
    let health = 100;
    let timeRemaining = 60; // 60 seconds to win
    let lastTime = performance.now();
    let secondTimer = 0;

    // Input
    const keys = { w: false, a: false, s: false, d: false };
    const handleKeyDown = (e: KeyboardEvent) => { if (keys.hasOwnProperty(e.key.toLowerCase())) keys[e.key.toLowerCase() as keyof typeof keys] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { if (keys.hasOwnProperty(e.key.toLowerCase())) keys[e.key.toLowerCase() as keyof typeof keys] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Entities
    const player = { x: canvas.width / 2, y: canvas.height / 2, size: 15, speed: 5, color: '#00f0ff' };
    const signals: { x: number, y: number, active: boolean }[] = [];
    const enemies: { x: number, y: number, vx: number, vy: number, active: boolean }[] = [];

    const spawnSignal = () => {
      signals.push({
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        active: true
      });
    };

    const spawnEnemy = () => {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0, vx = 0, vy = 0;
      const speed = 2 + Math.random() * 2;
      
      if (side === 0) { x = Math.random() * canvas.width; y = -50; vx = (Math.random() - 0.5) * speed; vy = speed; }
      else if (side === 1) { x = canvas.width + 50; y = Math.random() * canvas.height; vx = -speed; vy = (Math.random() - 0.5) * speed; }
      else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + 50; vx = (Math.random() - 0.5) * speed; vy = -speed; }
      else { x = -50; y = Math.random() * canvas.height; vx = speed; vy = (Math.random() - 0.5) * speed; }
      
      enemies.push({ x, y, vx, vy, active: true });
    };

    // Initial Spawns
    for (let i=0; i<5; i++) spawnSignal();
    for (let i=0; i<3; i++) spawnEnemy();

    // Game Loop
    const update = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      secondTimer += dt;
      comboTimer -= dt;

      if (comboTimer <= 0) {
        combo = 1;
      }

      if (secondTimer >= 1000) {
        timeRemaining--;
        secondTimer = 0;
        if (Math.random() > 0.3) spawnEnemy();
        if (Math.random() > 0.5) spawnSignal();

        if (timeRemaining <= 0) {
          cancelAnimationFrame(animationId);
          onVictory({ score, signals: signalsCollected, combo: maxCombo, time: '00:00' });
          return;
        }
      }

      // Player Movement
      if (keys.w) player.y -= player.speed;
      if (keys.s) player.y += player.speed;
      if (keys.a) player.x -= player.speed;
      if (keys.d) player.x += player.speed;

      // Bounds
      player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));
      player.y = Math.max(player.size, Math.min(canvas.height - player.size, player.y));

      // Draw Background
      ctx.fillStyle = 'rgba(5, 5, 5, 0.3)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let i=0; i<canvas.width; i+=50) { ctx.moveTo(i,0); ctx.lineTo(i, canvas.height); }
      for(let i=0; i<canvas.height; i+=50) { ctx.moveTo(0,i); ctx.lineTo(canvas.width, i); }
      ctx.stroke();

      // Update & Draw Signals
      signals.forEach(s => {
        if (!s.active) return;
        
        const dist = Math.hypot(player.x - s.x, player.y - s.y);
        if (dist < player.size + 10) {
          s.active = false;
          signalsCollected++;
          score += 100 * combo;
          combo++;
          if (combo > maxCombo) maxCombo = combo;
          comboTimer = 3000;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#8a2be2';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#8a2be2';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update & Draw Enemies
      enemies.forEach(e => {
        if (!e.active) return;
        e.x += e.vx;
        e.y += e.vy;

        const dist = Math.hypot(player.x - e.x, player.y - e.y);
        if (dist < player.size + 10) {
          e.active = false;
          health -= 25;
          combo = 1;
          
          if (health <= 0) {
            cancelAnimationFrame(animationId);
            onGameOver({ score, signals: signalsCollected, combo: maxCombo });
            return;
          }
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#ff2a2a';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff2a2a';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Player
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.shadowBlur = 20;
      ctx.shadowColor = player.color;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw UI
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px "Space Mono", monospace';
      ctx.fillText(`SCORE: ${score}`, 20, 40);
      ctx.fillText(`COMBO: x${combo}`, 20, 70);
      
      ctx.textAlign = 'right';
      ctx.fillText(`TIME: ${timeRemaining}s`, canvas.width - 20, 40);
      
      // Health Bar
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ff2a2a';
      ctx.fillRect(20, canvas.height - 40, 200, 20);
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(20, canvas.height - 40, health * 2, 20);
      ctx.strokeStyle = '#ffffff';
      ctx.strokeRect(20, canvas.height - 40, 200, 20);

      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onGameOver, onVictory]);

  return <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />;
};

export default SignalRunGame;
