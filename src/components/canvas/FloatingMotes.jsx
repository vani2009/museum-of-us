import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingMotes({ count = 150 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const confettiPalette = [
      new THREE.Color('#FFB6C1'), // Pastel pink
      new THREE.Color('#E8D5EA'), // Lavender
      new THREE.Color('#FEE440'), // Yellow sparkle
      new THREE.Color('#D8F3DC'), // Mint
      new THREE.Color('#FFFDFE'), // Marshmallow white
      new THREE.Color('#E8A598'), // Rose gold
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8.5;
      pos[i * 3 + 1] = 0.4 + Math.random() * 4.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8.5;

      const c = confettiPalette[i % confettiPalette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      // Gentle floating downward and swirling party confetti drift
      pos[i * 3 + 1] -= delta * 0.16;
      pos[i * 3] += Math.sin(state.clock.elapsedTime * 0.8 + i) * 0.005;
      pos[i * 3 + 2] += Math.cos(state.clock.elapsedTime * 0.6 + i) * 0.005;

      if (pos[i * 3 + 1] < 0.2) {
        pos[i * 3 + 1] = 4.6;
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors={true}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

