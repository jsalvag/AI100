import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

const layerConfig = [4, 6, 5, 3];
const layerSpacing = 2.2;
const neuronSpacing = 0.7;

function getNeuronPos(layer: number, index: number, total: number): THREE.Vector3 {
  const x = (layer - (layerConfig.length - 1) / 2) * layerSpacing;
  const y = (index - (total - 1) / 2) * neuronSpacing;
  return new THREE.Vector3(x, y, 0);
}

function Neuron({ pos, active }: { pos: THREE.Vector3; active: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (ref.current) {
      const scale = active ? 1 + 0.15 * Math.sin(Date.now() * 0.005) : 1;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={active ? '#5ee0b0' : '#888'}
        emissive={active ? '#5ee0b0' : '#333'}
        emissiveIntensity={active ? 0.6 : 0.05}
      />
    </mesh>
  );
}

function Synapse({ from, to, active }: { from: THREE.Vector3; to: THREE.Vector3; active: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
  const direction = new THREE.Vector3().subVectors(to, from);
  const length = direction.length();
  direction.normalize();

  useFrame(() => {
    if (ref.current) {
      ref.current.material.opacity = active
        ? 0.3 + 0.3 * Math.sin(Date.now() * 0.003 + length * 2)
        : 0.08;
    }
  });

  return (
    <mesh ref={ref} position={mid}>
      <boxGeometry args={[0.02, 0.02, length]} />
      <meshStandardMaterial
        color={active ? '#5ee0b0' : '#555'}
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function SignalPulse({ from, to, progress }: { from: THREE.Vector3; to: THREE.Vector3; progress: number }) {
  const pos = new THREE.Vector3().lerpVectors(from, to, progress);
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#5ee0b0" transparent opacity={0.8} />
    </mesh>
  );
}

export default function NeuralNetwork3D() {
  const [firing, setFiring] = useState(false);
  const [pulseProgress, setPulseProgress] = useState<number | null>(null);
  const [activeNeurons, setActiveNeurons] = useState<Set<string>>(new Set());
  const [activeSynapses, setActiveSynapses] = useState<Set<string>>(new Set());

  const allPositions = useMemo(() => {
    const positions: THREE.Vector3[][] = [];
    layerConfig.forEach((count, layerIdx) => {
      const layer: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        layer.push(getNeuronPos(layerIdx, i, count));
      }
      positions.push(layer);
    });
    return positions;
  }, []);

  const synapses = useMemo(() => {
    const conns: Array<{ from: THREE.Vector3; to: THREE.Vector3; key: string }> = [];
    for (let l = 0; l < allPositions.length - 1; l++) {
      for (let i = 0; i < allPositions[l].length; i++) {
        for (let j = 0; j < allPositions[l + 1].length; j++) {
          conns.push({
            from: allPositions[l][i],
            to: allPositions[l + 1][j],
            key: `${l}-${i}-${j}`,
          });
        }
      }
    }
    return conns;
  }, [allPositions]);

  const fireForward = useCallback(() => {
    if (firing) return;
    setFiring(true);
    setPulseProgress(0);

    const allActive = new Set<string>();
    const allSynActive = new Set<string>();

    allPositions.forEach((layer, lIdx) => {
      layer.forEach((_, nIdx) => {
        if (lIdx === 0 || Math.random() > 0.4) {
          allActive.add(`${lIdx}-${nIdx}`);
        }
      });
    });

    synapses.forEach((s) => {
      if (Math.random() > 0.3) allSynActive.add(s.key);
    });

    setActiveNeurons(allActive);
    setActiveSynapses(allSynActive);

    let t = 0;
    const interval = setInterval(() => {
      t += 0.04;
      if (t >= 1) {
        clearInterval(interval);
        setPulseProgress(null);
        setFiring(false);
      } else {
        setPulseProgress(t);
      }
    }, 50);
  }, [firing, allPositions, synapses]);

  return (
    <div className="lab-stack">
      <div className="lab-canvas" style={{ minHeight: 440, height: 440 }}>
        <Canvas camera={{ position: [0, 1, 5.5], fov: 40 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <pointLight position={[-5, -3, -5]} intensity={0.3} />

          {synapses.map((s) => (
            <Synapse
              key={s.key}
              from={s.from}
              to={s.to}
              active={firing && activeSynapses.has(s.key)}
            />
          ))}

          {allPositions.map((layer, lIdx) =>
            layer.map((pos, nIdx) => (
              <Neuron
                key={`${lIdx}-${nIdx}`}
                pos={pos}
                active={firing && activeNeurons.has(`${lIdx}-${nIdx}`)}
              />
            ))
          )}

          {pulseProgress !== null &&
            synapses
              .filter(() => Math.random() > 0.7)
              .slice(0, 8)
              .map((s, i) => (
                <SignalPulse
                  key={i}
                  from={s.from}
                  to={s.to}
                  progress={pulseProgress}
                />
              ))}

          {layerConfig.map((count, lIdx) => (
            <Text
              key={lIdx}
              position={[getNeuronPos(lIdx, 0, count).x, getNeuronPos(lIdx, 0, count).y + count * 0.4 + 0.4, 0]}
              fontSize={0.15}
              color="#888"
              anchorX="center"
            >
              {lIdx === 0 ? 'Entrada' : lIdx === layerConfig.length - 1 ? 'Salida' : `Oculta ${lIdx}`}
            </Text>
          ))}

          <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.8} />
        </Canvas>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button className={`lab-button primary`} onClick={fireForward} disabled={firing} type="button">
          {firing ? 'Propagando...' : 'Propagación hacia adelante'}
        </button>
        <span className="muted" style={{ fontSize: '0.85rem' }}>
          Las neuronas activas se iluminan. Los pulsos viajan a través de las sinapsis.
        </span>
      </div>
    </div>
  );
}
