import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingMotes({ count = 120 }) {
  const pointsRef = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = 0.5 + Math.random() * 4.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      sc[i] = 0.02 + Math.random() * 0.04;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      // Gentle floating upward drift with subtle swirl
      pos[i * 3 + 1] += delta * 0.12;
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.003;
      pos[i * 3 + 2] += Math.cos(state.clock.elapsedTime * 0.4 + i) * 0.003;

      if (pos[i * 3 + 1] > 4.8) {
        pos[i * 3 + 1] = 0.4;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffe2a0"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
