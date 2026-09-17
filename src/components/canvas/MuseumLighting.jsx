import React, { useMemo } from 'react';
import * as THREE from 'three';

function ChandelierFixture({ position = [0, 4.8, 0] }) {
  const brassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d4af37',
    metalness: 0.9,
    roughness: 0.2,
  }), []);

  const crystalMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 0.9,
    opacity: 1,
    transparent: true,
    roughness: 0.1,
    ior: 1.5,
  }), []);

  const glowingBulbMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#fff5d6',
    emissive: '#ffd88a',
    emissiveIntensity: 2.0,
  }), []);

  return (
    <group position={position}>
      {/* Ceiling Mount */}
      <mesh position={[0, 0.2, 0]} material={brassMat} castShadow>
        <cylinderGeometry args={[0.35, 0.4, 0.1, 24]} />
      </mesh>
      {/* Hanging Brass Rod */}
      <mesh position={[0, -0.15, 0]} material={brassMat}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 12]} />
      </mesh>
      {/* Chandelier Ring */}
      <mesh position={[0, -0.45, 0]} material={brassMat}>
        <torusGeometry args={[0.42, 0.03, 16, 32]} />
      </mesh>

      {/* Crystal Drops around the ring */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        const cx = Math.cos(rad) * 0.42;
        const cz = Math.sin(rad) * 0.42;
        return (
          <group key={idx} position={[cx, -0.48, cz]}>
            <mesh material={crystalMat}>
              <octahedronGeometry args={[0.045]} />
            </mesh>
            <mesh position={[0, -0.06, 0]} material={crystalMat}>
              <coneGeometry args={[0.03, 0.08, 6]} rotation={[Math.PI, 0, 0]} />
            </mesh>
          </group>
        );
      })}

      {/* Glowing Central Bulb */}
      <mesh position={[0, -0.45, 0]} material={glowingBulbMat}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Downward Warm Spotlight Beam */}
      <spotLight
        color="#fff0d0"
        intensity={28}
        distance={9}
        angle={0.7}
        penumbra={0.6}
        position={[0, -0.46, 0]}
        target-position={[position[0], 0, position[2]]}
        castShadow
        shadow-bias={-0.0001}
      />
      <pointLight color="#ffdfad" intensity={10} distance={5} position={[0, -0.5, 0]} />
    </group>
  );
}

export default function MuseumLighting({ mode = 'cozy' }) {
  return (
    <group name="MuseumLighting">
      {/* Clean Soft Ambient Fill */}
      <ambientLight color="#fff0ee" intensity={mode === 'cozy' ? 0.75 : 1.15} />

      {/* Warm White Directional Sun/Sky Rim */}
      <directionalLight
        color="#fffbf7"
        intensity={mode === 'cozy' ? 0.85 : 1.35}
        position={[4, 8, 4]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* 3 Main Museum Ceiling Chandeliers */}
      <ChandelierFixture position={[-2.4, 4.9, 0]} />
      <ChandelierFixture position={[0, 4.9, 0]} />
      <ChandelierFixture position={[2.4, 4.9, 0]} />

      {/* Wall Spotlights for Back Wall */}
      <spotLight
        color="#fff5eb"
        intensity={18}
        distance={8}
        angle={0.8}
        penumbra={0.5}
        position={[0, 4.5, -2]}
        target-position={[0, 2.5, -4.9]}
      />

      {/* Wall Spotlights for Left Wall */}
      <spotLight
        color="#fff5eb"
        intensity={15}
        distance={8}
        angle={0.8}
        penumbra={0.5}
        position={[-2, 4.5, 0]}
        target-position={[-4.9, 2.5, 0]}
      />

      {/* Wall Spotlights for Right Wall */}
      <spotLight
        color="#fff5eb"
        intensity={15}
        distance={8}
        angle={0.8}
        penumbra={0.5}
        position={[2, 4.5, 0]}
        target-position={[4.9, 2.5, 0]}
      />

      {/* Entrance Gate Warm Backlight */}
      <pointLight color="#ffe3cc" intensity={12} distance={6} position={[0, 2.5, 4.8]} />
    </group>
  );
}
