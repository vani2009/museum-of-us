import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createStripedBalloonTexture, createPolkaDotBalloonTexture } from '../../utils/textureGenerators';

// Single 3D Balloon with Ribbon
function SingleBalloon({
  pattern = 'striped-pink', // 'striped-pink' | 'polka-pink' | 'polka-lavender' | 'solid-white' | 'solid-rosegold'
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  seed = 0
}) {
  const balloonRef = useRef();

  // Procedural textures
  const stripedPinkTex = useMemo(() => createStripedBalloonTexture('#FFB6C1', '#FFFDFE'), []);
  const polkaPinkTex = useMemo(() => createPolkaDotBalloonTexture('#FFB6C1', '#FFFDFE'), []);
  const polkaLavTex = useMemo(() => createPolkaDotBalloonTexture('#E8D5EA', '#FFFDFE'), []);

  // Materials
  const material = useMemo(() => {
    if (pattern === 'striped-pink') {
      return new THREE.MeshStandardMaterial({
        map: stripedPinkTex,
        roughness: 0.15,
        metalness: 0.08,
      });
    }
    if (pattern === 'polka-pink') {
      return new THREE.MeshStandardMaterial({
        map: polkaPinkTex,
        roughness: 0.15,
        metalness: 0.08,
      });
    }
    if (pattern === 'polka-lavender') {
      return new THREE.MeshStandardMaterial({
        map: polkaLavTex,
        roughness: 0.15,
        metalness: 0.08,
      });
    }
    if (pattern === 'solid-rosegold') {
      return new THREE.MeshStandardMaterial({
        color: '#E8A598',
        roughness: 0.22,
        metalness: 0.88,
      });
    }
    // Default: Shiny Marshmallow Pearl White
    return new THREE.MeshStandardMaterial({
      color: '#FFFDFE',
      roughness: 0.12,
      metalness: 0.1,
    });
  }, [pattern, stripedPinkTex, polkaPinkTex, polkaLavTex]);

  const roseGoldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E8A598',
    roughness: 0.3,
    metalness: 0.8,
  }), []);

  // Curved Ribbon String
  const ribbonCurve = useMemo(() => {
    const points = [];
    const height = 1.6;
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const y = -t * height;
      const x = Math.sin(t * Math.PI * 4 + seed) * 0.04 * (1 - t * 0.4);
      const z = Math.cos(t * Math.PI * 3 + seed) * 0.03 * (1 - t * 0.4);
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [seed]);

  const ribbonGeo = useMemo(() => new THREE.TubeGeometry(ribbonCurve, 20, 0.005, 6, false), [ribbonCurve]);

  // Gentle floating and swaying motion
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime() + seed;
    if (balloonRef.current) {
      balloonRef.current.position.y = position[1] + Math.sin(t * 1.8) * 0.04;
      balloonRef.current.rotation.z = rotation[2] + Math.sin(t * 1.2) * 0.06;
      balloonRef.current.rotation.x = rotation[0] + Math.cos(t * 1.4) * 0.04;
    }
  });

  return (
    <group ref={balloonRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Balloon Body */}
      <mesh material={material} castShadow receiveShadow>
        <sphereGeometry args={[0.32, 24, 24]} scale={[1, 1.25, 1]} />
      </mesh>

      {/* Balloon Bottom Knot */}
      <mesh position={[0, -0.38, 0]} material={material}>
        <coneGeometry args={[0.05, 0.07, 12]} rotation={[0, 0, Math.PI]} />
      </mesh>

      {/* Rose Gold Tie Ring */}
      <mesh position={[0, -0.39, 0]} material={roseGoldMat}>
        <torusGeometry args={[0.035, 0.008, 8, 16]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Hanging Curling Ribbon */}
      <mesh geometry={ribbonGeo} position={[0, -0.4, 0]} material={roseGoldMat} />
    </group>
  );
}

// Clustered Balloon Bouquet
export function BalloonBouquet({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Balloon 1: Top Center Striped Pink */}
      <SingleBalloon
        pattern="striped-pink"
        position={[0, 2.6, 0]}
        scale={1.1}
        rotation={[0.05, 0.2, 0.02]}
        seed={1.1}
      />

      {/* Balloon 2: High Left Polka Pink */}
      <SingleBalloon
        pattern="polka-pink"
        position={[-0.26, 2.3, 0.15]}
        scale={1.0}
        rotation={[0.1, -0.4, -0.15]}
        seed={2.4}
      />

      {/* Balloon 3: High Right Solid Rose Gold */}
      <SingleBalloon
        pattern="solid-rosegold"
        position={[0.26, 2.35, -0.1]}
        scale={0.95}
        rotation={[-0.1, 0.5, 0.12]}
        seed={3.7}
      />

      {/* Balloon 4: Mid Left Solid Pearl White */}
      <SingleBalloon
        pattern="solid-white"
        position={[-0.28, 1.85, -0.18]}
        scale={1.05}
        rotation={[-0.15, -0.3, -0.18]}
        seed={4.9}
      />

      {/* Balloon 5: Mid Right Polka Lavender */}
      <SingleBalloon
        pattern="polka-lavender"
        position={[0.28, 1.8, 0.18]}
        scale={1.02}
        rotation={[0.15, 0.3, 0.18]}
        seed={5.8}
      />

      {/* Balloon 6: Front Center Striped Pink */}
      <SingleBalloon
        pattern="striped-pink"
        position={[0.05, 1.45, 0.22]}
        scale={0.92}
        rotation={[0.2, 0, 0.05]}
        seed={6.3}
      />

      {/* Balloon 7: Back Center Rose Gold */}
      <SingleBalloon
        pattern="solid-rosegold"
        position={[-0.05, 1.5, -0.22]}
        scale={0.9}
        rotation={[-0.2, 0.6, -0.05]}
        seed={7.1}
      />

      {/* Weighted Base Plinth with Rose Gold Ribbon Bow */}
      <group position={[0, 0.1, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#E8A598" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#FFB6C1" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// Complete Birthday Balloons Component in Scene
export default function BirthdayBalloons() {
  return (
    <group name="BirthdayBalloons">
      {/* 4 Gallery Room Corners */}
      <BalloonBouquet position={[-4.1, 0, -4.1]} scale={1.05} />
      <BalloonBouquet position={[4.1, 0, -4.1]} scale={1.05} />
      <BalloonBouquet position={[-4.1, 0, 4.1]} scale={1.05} />
      <BalloonBouquet position={[4.1, 0, 4.1]} scale={1.05} />

      {/* 2 Floating Bouquets beside Center Avatars */}
      <BalloonBouquet position={[-1.6, 0, 0.5]} scale={0.88} />
      <BalloonBouquet position={[1.6, 0, 0.5]} scale={0.88} />
    </group>
  );
}
