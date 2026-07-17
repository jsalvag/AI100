import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const gridSize = 6;
const cellSize = 0.45;

function InputGrid({ activeKernel }: { activeKernel: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);

  const cells = useMemo(() => {
    const result: { x: number; y: number; active: boolean }[] = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const center = i === 2 && j === 2;
        const near = Math.abs(i - 2) <= 1 && Math.abs(j - 2) <= 1;
        result.push({ x: i, y: j, active: center || (near && activeKernel) });
      }
    }
    return result;
  }, [activeKernel]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.15) * 0.2;
      groupRef.current.position.y = 0.2 + Math.sin(clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {cells.map((c) => {
        const x = (c.x - 2.5) * cellSize;
        const y = (c.y - 2.5) * cellSize;
        const isActive = c.active;
        return (
          <mesh key={`${c.x}-${c.y}`} position={[x, y, 0]}>
            <planeGeometry args={[cellSize * 0.85, cellSize * 0.85]} />
            <meshStandardMaterial
              color={isActive ? '#2458ff' : '#888'}
              transparent
              opacity={isActive ? 0.9 : 0.15}
              emissive={isActive ? '#2458ff' : '#000'}
              emissiveIntensity={isActive ? 0.2 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Kernel({ activeKernel }: { activeKernel: boolean }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.2) * 0.15;
      ref.current.position.y = 0.3 + Math.sin(clock.elapsedTime * 0.25) * 0.05;
    }
  });

  return (
    <group ref={ref} position={[-2.8, 0, 1.2]}>
      {[[-0.4, 0.4], [0.0, 0.4], [0.4, 0.4], [-0.4, 0.0], [0.0, 0.0], [0.4, 0.0], [-0.4, -0.4], [0.0, -0.4], [0.4, -0.4]].map(([dx, dz], i) => (
        <mesh key={i} position={[dx, 0, dz]}>
          <boxGeometry args={[0.18, 0.08, 0.18]} />
          <meshStandardMaterial color={activeKernel ? '#0c8f6a' : '#666'} transparent opacity={activeKernel ? 0.95 : 0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.15, 0]}>
        <planeGeometry args={[0.6, 0.6]} />
        <meshBasicMaterial transparent opacity={activeKernel ? 1 : 0} side={THREE.DoubleSide}>
          <primitive object={new THREE.PlaneGeometry(0.6, 0.6)} attach="geometry" />
        </meshBasicMaterial>
      </mesh>
    </group>
  );
}

function OutputMap({ activeKernel }: { activeKernel: boolean }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = 0.15 + Math.sin(clock.elapsedTime * 0.35 + 1) * 0.04;
    }
  });

  const outCells = useMemo(() => {
    const cells: { x: number; y: number; val: number }[] = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        cells.push({ x: i, y: j, val: activeKernel ? 0.5 + Math.random() * 0.5 : 0.1 });
      }
    }
    return cells;
  }, [activeKernel]);

  return (
    <group ref={ref} position={[3.0, 0, 0]}>
      {outCells.map((c, i) => (
        <mesh key={i} position={[(c.x - 1.5) * cellSize * 0.8, 0, (c.y - 1.5) * cellSize * 0.8]}>
          <planeGeometry args={[cellSize * 0.7, cellSize * 0.7]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.6 - c.val * 0.5, 0.8, 0.15 + c.val * 0.5)}
            transparent
            opacity={0.7 + c.val * 0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Convolution3D() {
  const [activeKernel, setActiveKernel] = useState(false);

  return (
    <div className="lab-stack">
      <div className="lab-tabs">
        <button
          className={`tab ${!activeKernel ? 'active' : ''}`}
          onClick={() => setActiveKernel(false)}
        >
          En reposo
        </button>
        <button
          className={`tab ${activeKernel ? 'active' : ''}`}
          onClick={() => setActiveKernel(true)}
        >
          Convolución activa
        </button>
      </div>
      <div className="lab-canvas" style={{ minHeight: 380, height: 380 }}>
        <Canvas camera={{ position: [4, 2.5, 5], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[3, 4, 3]} intensity={0.8} />
          <pointLight position={[-2, -1, -3]} intensity={0.3} />

          <InputGrid activeKernel={activeKernel} />
          <Kernel activeKernel={activeKernel} />
          <OutputMap activeKernel={activeKernel} />

          <gridHelper args={[8, 8, '#444', '#222']} position={[0, -0.8, 0]} />
          <OrbitControls enableZoom autoRotate={!activeKernel} autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      <div className="answer-panel">
        <strong>Convolución 3×3</strong>
        <p>Un kernel (filtro) se desliza sobre la imagen de entrada. Cada posición produce un valor en el mapa de activación de salida. Las convoluciones aprenden detectores de bordes, texturas y formas.</p>
      </div>
    </div>
  );
}
