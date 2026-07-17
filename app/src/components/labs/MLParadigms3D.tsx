import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

type Paradigm = 'supervised' | 'unsupervised' | 'reinforcement';

const paradigms: Record<Paradigm, { label: string; color: string; desc: string }> = {
  supervised: {
    label: 'Supervisado',
    color: '#2458ff',
    desc: 'Datos etiquetados. El modelo aprende a mapear entrada → salida con ejemplos resueltos.',
  },
  unsupervised: {
    label: 'No supervisado',
    color: '#0c8f6a',
    desc: 'Sin etiquetas. El modelo descubre patrones, grupos o estructuras ocultas en los datos.',
  },
  reinforcement: {
    label: 'Refuerzo',
    color: '#b45b18',
    desc: 'El agente aprende por prueba y error. Recibe recompensas o castigos según sus acciones.',
  },
};

const positions: Record<Paradigm, [number, number, number]> = {
  supervised: [-3.5, 0, 0],
  unsupervised: [0, 0, 0],
  reinforcement: [3.5, 0, 0],
};

function DataPoints({ paradigm }: { paradigm: Paradigm }) {
  const ref = useRef<THREE.Points>(null!);
  const colorMap: Record<Paradigm, string> = {
    supervised: '#2458ff',
    unsupervised: '#0c8f6a',
    reinforcement: '#b45b18',
  };
  const baseColor = new THREE.Color(colorMap[paradigm]);
  const count = 80;
  const positionsArr = new Float32Array(count * 3);
  const colorsArr = new Float32Array(count * 3);
  const center = positions[paradigm];

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 0.8 + Math.random() * 0.6;
    positionsArr[i * 3] = center[0] + r * Math.sin(phi) * Math.cos(theta);
    positionsArr[i * 3 + 1] = center[1] + r * Math.sin(phi) * Math.sin(theta);
    positionsArr[i * 3 + 2] = center[2] + r * Math.cos(phi);
    const c = baseColor.clone().multiplyScalar(0.5 + Math.random() * 0.5);
    colorsArr[i * 3] = c.r;
    colorsArr[i * 3 + 1] = c.g;
    colorsArr[i * 3 + 2] = c.b;
  }

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positionsArr, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorsArr, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors sizeAttenuation />
    </points>
  );
}

function Platform({ paradigm, active }: { paradigm: Paradigm; active: boolean }) {
  const pos = positions[paradigm];
  const p = paradigms[paradigm];
  return (
    <group position={pos}>
      <mesh>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
        <meshStandardMaterial
          color={p.color}
          transparent
          opacity={active ? 0.25 : 0.1}
          emissive={p.color}
          emissiveIntensity={active ? 0.15 : 0.03}
        />
      </mesh>
      <Text
        position={[0, 1.4, 0]}
        fontSize={0.25}
        color={active ? p.color : '#888'}
        anchorX="center"
        anchorY="middle"
      >
        {p.label}
      </Text>
    </group>
  );
}

function ConnectionLines() {
  const points: [number, number, number][] = [
    [-2.3, 0, 0], [-1.15, 0.2, 0], [1.15, -0.2, 0], [2.3, 0, 0],
  ];
  const lineRef = useRef<THREE.Line>(null!);

  useFrame((_, delta) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.15 + Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(...p))
  );

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#666" transparent opacity={0.15} />
    </line>
  );
}

export default function MLParadigms3D() {
  const [active, setActive] = useState<Paradigm>('supervised');

  return (
    <div className="lab-stack">
      <div className="lab-tabs" style={{ justifyContent: 'center' }}>
        {(Object.keys(paradigms) as Paradigm[]).map((key) => (
          <button
            key={key}
            className={`tab-button ${active === key ? 'active' : ''}`}
            onClick={() => setActive(key)}
            type="button"
          >
            {paradigms[key].label}
          </button>
        ))}
      </div>
      <div className="lab-canvas" style={{ minHeight: 420, height: 420 }}>
        <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -5, -10]} intensity={0.4} />
          {(Object.keys(paradigms) as Paradigm[]).map((key) => (
            <Platform key={key} paradigm={key} active={active === key} />
          ))}
          {(Object.keys(paradigms) as Paradigm[]).map((key) => (
            <DataPoints key={key} paradigm={key} />
          ))}
          <ConnectionLines />
          <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>
      <div className="answer-panel" aria-live="polite">
        <strong>{paradigms[active].label}</strong>
        <p>{paradigms[active].desc}</p>
      </div>
    </div>
  );
}
