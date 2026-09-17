import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshDistortMaterial, Stars, useTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

const BlueSmokeExplosion = () => {
  const smokeRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (smokeRef.current) {
      // Gentle floating dynamic movement (No Y rotation so it stays stretched horizontally across the bottom)
      smokeRef.current.position.y = -18 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={smokeRef} position={[0, -18, -25]} scale={1.2}>
      {/* Wide horizontal lights to illuminate the entire bottom edge */}
      <pointLight intensity={1.5} color="#EAFBFF" distance={50} position={[0, 0, 0]} />
      <pointLight intensity={2} color="#00D9FF" distance={60} position={[-20, 0, 0]} />
      <pointLight intensity={2} color="#00D9FF" distance={60} position={[20, 0, 0]} />
      
      {/* Billowing Blue Smoke Clouds spread completely horizontally across the bottom */}
      {[...Array(25)].map((_, i) => {
        // Spread from -30 to +30 on X axis
        const xOffset = -30 + (i * 2.5) + (Math.random() * 2 - 1);
        const zOffset = (Math.random() - 0.5) * 10;
        
        return (
          <mesh 
            key={i} 
            position={[xOffset, (Math.random() - 0.5) * 2, zOffset]}
          >
            <sphereGeometry args={[4 + Math.random() * 2, 32, 32]} />
            <MeshDistortMaterial 
              color={i % 2 === 0 ? "#00D9FF" : "#1F61AD"} 
              transparent 
              opacity={0.35} 
              distort={0.8} 
              speed={1.5 + Math.random()} 
              blending={THREE.NormalBlending}
              roughness={1}
            />
          </mesh>
        );
      })}

      {/* Dense Darker Smoke Core - also spread horizontally */}
      {[...Array(15)].map((_, i) => {
        const xOffset = -28 + (i * 4);
        return (
          <mesh 
            key={`dark-${i}`} 
            position={[xOffset, -1, (Math.random() - 0.5) * 5]}
          >
            <sphereGeometry args={[3.5 + Math.random(), 32, 32]} />
            <MeshDistortMaterial 
              color="#0B1B2B" 
              transparent 
              opacity={0.7} 
              distort={0.5} 
              speed={1} 
              roughness={1}
            />
          </mesh>
        );
      })}
      
      {/* Splatter / Droplets of smoke spread across the bottom */}
      <Sparkles count={800} scale={[70, 5, 20]} size={8} speed={1} opacity={0.4} color="#00D9FF" />
    </group>
  );
};

const GalaxyDome = () => {
  const domeRef = useRef<THREE.Mesh>(null);
  const auroraRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (domeRef.current) {
      domeRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
    if (auroraRef.current) {
      auroraRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      auroraRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={domeRef}>
      <mesh scale={80}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#050A14" side={THREE.BackSide} />
      </mesh>
      
      {/* Dense, Moving Starfield */}
      <group>
        <Stars radius={100} depth={100} count={2000} factor={3} saturation={1} fade speed={1} />
        <Stars radius={80} depth={50} count={1000} factor={2} saturation={1} fade speed={1.5} />
      </group>
      
      {/* Supernatural Nebula Layer 1 (Neon Magenta) */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <sphereGeometry args={[0.95, 64, 64]} />
        <MeshDistortMaterial color="#D946EF" transparent opacity={0.15} side={THREE.BackSide} blending={THREE.AdditiveBlending} distort={0.6} speed={0.8} />
      </mesh>
      
      {/* Supernatural Nebula Layer 2 (Electric Cyan) */}
      <mesh ref={auroraRef} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <MeshDistortMaterial color="#00D9FF" transparent opacity={0.15} side={THREE.BackSide} blending={THREE.AdditiveBlending} distort={0.7} speed={0.9} />
      </mesh>

      {/* Supernatural Nebula Layer 3 (Plasma Violet) */}
      <mesh rotation={[0, Math.PI / 3, 0]} scale={80}>
        <sphereGeometry args={[0.85, 64, 64]} />
        <MeshDistortMaterial color="#7C3AED" transparent opacity={0.2} side={THREE.BackSide} blending={THREE.AdditiveBlending} distort={0.8} speed={0.5} />
      </mesh>
    </group>
  );
};



const RightSideOrbits = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.x = t * 0.8;
    if (ring2Ref.current) ring2Ref.current.rotation.y = t * 0.6;
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -t * 0.5;
      ring3Ref.current.rotation.z = t * 0.3;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y = -t * 0.4;
      ring4Ref.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[15, 2, -15]} scale={0.8}>
      {/* Central Astra Signal Node */}
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#EAFBFF" wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#00D9FF" />
      </mesh>
      
      {/* Outer Holographic Glow */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial color="#00D9FF" transparent opacity={0.6} distort={0.5} speed={4} />
      </mesh>

      {/* 4 Revolving Orbits */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.5, 0.02, 32, 100]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.8} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[5.5, 0.02, 32, 100]} />
        <meshBasicMaterial color="#D946EF" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[7.5, 0.02, 32, 100]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring4Ref}>
        <torusGeometry args={[9.5, 0.02, 32, 100]} />
        <meshBasicMaterial color="#EAFBFF" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};


const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#050A14]">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <fog attach="fog" args={['#050A14', 15, 60]} />
        
        {/* Intense Cyber-Nebula Lighting */}
        <ambientLight intensity={0.5} color="#0B1B2B" />
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#00D9FF" />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#D946EF" />
        <pointLight position={[5, 0, -5]} intensity={4} color="#7C3AED" />
        <spotLight position={[0, 5, 0]} angle={0.8} penumbra={1} intensity={3} color="#EAFBFF" />
        
        <GalaxyDome />
        <BlueSmokeExplosion />
        <RightSideOrbits />
        
        {/* Magical Supernatural Fairy Dust */}
        <Sparkles count={2000} scale={40} size={1.5} speed={0.4} opacity={0.6} color="#00D9FF" />
        <Sparkles count={1500} scale={30} size={2.5} speed={0.6} opacity={0.8} color="#D946EF" />
        <Sparkles count={1000} scale={20} size={4} speed={0.3} opacity={0.9} color="#EAFBFF" />
      </Canvas>
    </div>
  );
};

export default HeroScene;
