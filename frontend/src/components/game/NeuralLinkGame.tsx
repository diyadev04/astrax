import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface GameProps {
  onGameOver: (stats: any) => void;
  onVictory: (stats: any) => void;
}

const Node = ({ position, onClick, isRestored }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const color = isRestored ? '#00f0ff' : '#ff2a2a';
  
  useFrame((state) => {
    if (meshRef.current && !isRestored) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.03;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.01;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      scale={isRestored ? 1.5 : 1}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={!isRestored} 
        emissive={color}
        emissiveIntensity={isRestored ? 2 : 0.5}
      />
      <pointLight color={color} intensity={isRestored ? 2 : 0} distance={5} />
    </mesh>
  );
};

const NeuralLinkGame: React.FC<GameProps> = ({ onGameOver, onVictory }) => {
  const [nodes, setNodes] = useState<{ id: number; position: [number, number, number]; restored: boolean }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameState, setGameState] = useState<'playing' | 'ended'>('playing');

  // Initialize nodes
  useEffect(() => {
    const initialNodes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      restored: false
    }));
    setNodes(initialNodes);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    
    if (timeLeft <= 0) {
      setGameState('ended');
      if (score >= 10) {
        onVictory({ score: score * 100, signals: score, combo: 1, time: '00:00' });
      } else {
        onGameOver({ score: score * 100, signals: score, combo: 1 });
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState, score, onGameOver, onVictory]);

  const handleNodeClick = (id: number) => {
    if (gameState !== 'playing') return;

    setNodes(prev => prev.map(n => {
      if (n.id === id && !n.restored) {
        setScore(s => s + 1);
        return { ...n, restored: true };
      }
      return n;
    }));
  };

  return (
    <div className="w-full h-full relative cursor-crosshair">
      <div className="absolute top-8 left-8 z-10 font-mono text-xl text-astrax-white drop-shadow-[0_0_5px_#fff]">
        <div>RESTORED NODES: <span className="text-astrax-cyan font-bold">{score} / 20</span></div>
        <div>TIME LINK: <span className={timeLeft <= 10 ? 'text-astrax-red animate-pulse' : 'text-astrax-violet'}>{timeLeft}s</span></div>
      </div>
      
      {/* Target Reticle Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 w-12 h-12 border-2 border-astrax-cyan/30 rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-astrax-cyan rounded-full shadow-[0_0_10px_#00f0ff]"></div>
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {nodes.map(node => (
          <Node 
            key={node.id} 
            position={node.position} 
            isRestored={node.restored}
            onClick={() => handleNodeClick(node.id)} 
          />
        ))}

        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
};

export default NeuralLinkGame;
