import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface WordVec {
  word: string;
  pos: [number, number, number];
  group: number;
}

const groups = [
  { label: 'Ciencia', color: '#2458ff' },
  { label: 'Animales', color: '#0c8f6a' },
  { label: 'Emociones', color: '#b45b18' },
  { label: 'Tecnología', color: '#7c3aed' },
];

const wordVectors: WordVec[] = [
  { word: 'investigación', pos: [-1.2, 0.3, 0.5], group: 0 },
  { word: 'experimento', pos: [-0.8, -0.2, 1.2], group: 0 },
  { word: 'teoría', pos: [-1.5, -0.5, -0.2], group: 0 },
  { word: 'hipótesis', pos: [-0.5, 0.8, 0.8], group: 0 },
  { word: 'gato', pos: [1.3, 0.4, 0.6], group: 1 },
  { word: 'perro', pos: [1.5, -0.1, 0.2], group: 1 },
  { word: 'caballo', pos: [1.0, -0.6, 1.0], group: 1 },
  { word: 'pez', pos: [1.8, 0.2, -0.3], group: 1 },
  { word: 'felicidad', pos: [-0.3, 1.4, -0.5], group: 2 },
  { word: 'tristeza', pos: [0.4, 1.2, -0.8], group: 2 },
  { word: 'enojo', pos: [-0.6, 1.0, -1.2], group: 2 },
  { word: 'sorpresa', pos: [0.2, 1.8, -0.2], group: 2 },
  { word: 'algoritmo', pos: [-0.9, -0.8, -0.7], group: 3 },
  { word: 'datos', pos: [-0.3, -0.6, -1.0], group: 3 },
  { word: 'red', pos: [-1.3, -1.0, -0.3], group: 3 },
  { word: 'código', pos: [0.1, -1.2, -0.5], group: 3 },
];

function WordPoint({ word, pos, group }: WordVec) {
  const ref = useRef<THREE.Mesh>(null!);
  const color = groups[group].color;

  useFrame(({ clock }) => {
    if (ref.current) {
      const scale = 1 + 0.08 * Math.sin(clock.elapsedTime * 0.8 + pos[0] * 3);
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={pos}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Text fontSize={0.08} color={color} anchorX="center" anchorY="top" position={[0, 0.15, 0]}>
        {word}
      </Text>
    </group>
  );
}

export default function WordEmbedding3D() {
  return (
    <div className="lab-stack">
      <div className="lab-canvas" style={{ minHeight: 420, height: 420 }}>
        <Canvas camera={{ position: [2.5, 1.5, 3.5], fov: 40 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-3, -2, -3]} intensity={0.3} />

          {wordVectors.map((wv) => (
            <WordPoint key={wv.word} {...wv} />
          ))}

          <axesHelper args={[2.5]} />
          <OrbitControls enableZoom autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </div>
      <div className="lab-tabs" style={{ justifyContent: 'center' }}>
        {groups.map((g) => (
          <span key={g.label} className="legend-item" style={{ color: g.color, display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: g.color, display: 'inline-block' }} />
            {g.label}
          </span>
        ))}
      </div>
      <div className="answer-panel">
        <strong>Embeddings semánticos</strong>
        <p>Palabras con significado similar aparecen cerca unas de otras en el espacio vectorial. Los ejes representan dimensiones latentes aprendidas por el modelo.</p>
      </div>
    </div>
  );
}
