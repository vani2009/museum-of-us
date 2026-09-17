import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Billboard } from '@react-three/drei';
import confetti from 'canvas-confetti';
import { createNameTagTexture } from '../../utils/textureGenerators';

// Single 3D Mini Barbie Fashion Doll Component (Miniature Scale)
function MiniBarbieFigure({
  config,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onFigureClick,
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  const {
    id = "gauri",
    name = "Gauri",
    topStyle = "longsleeve-crop",
    topColor = "#fbf7e8",
    bottomStyle = "denim-shorts",
    bottomColor = "#6b8fae",
    shoesColor = "#fbf5e6",
    hairStyle = "long-straight",
    hairColor = "#1a1514",
    skinTone = "#d4a373",
    hasGlasses = false,
    glassesColor = "#e8d5ea",
    hasBag = true,
    bagColor = "#111111",
  } = config;

  // Materials
  const skinMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: skinTone,
    roughness: 0.45,
    metalness: 0.05,
  }), [skinTone]);

  const hairMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.35,
    metalness: 0.1,
  }), [hairColor]);

  const topMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: topColor,
    roughness: 0.55,
    metalness: 0.05,
  }), [topColor]);

  const denimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: bottomColor,
    roughness: 0.7,
    metalness: 0.05,
  }), [bottomColor]);

  const crocsMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: shoesColor,
    roughness: 0.3,
    metalness: 0.05,
  }), [shoesColor]);

  const bagMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: bagColor,
    roughness: 0.3,
    metalness: 0.4,
  }), [bagColor]);

  const silverJewelryMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e5e7eb',
    roughness: 0.15,
    metalness: 0.9,
  }), []);

  const glassesMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: glassesColor,
    transmission: 0.9,
    opacity: 0.85,
    transparent: true,
    roughness: 0.1,
    ior: 1.5,
  }), [glassesColor]);

  const clearStandMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    transmission: 0.92,
    opacity: 0.7,
    transparent: true,
    roughness: 0.1,
    ior: 1.45,
  }), []);

  const nameTagTexture = useMemo(() => createNameTagTexture(name), [name]);
  const nameTagMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: nameTagTexture,
    transparent: true,
  }), [nameTagTexture]);

  // Idle gentle breathing animation
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.8 + (id === 'gauri' ? 0 : 1.2)) * 0.008;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[0.46, 0.46, 0.46]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onFigureClick(config);
      }}
    >
      {/* Acrylic Clear Display Stand */}
      <mesh position={[0, 0.015, 0]} material={clearStandMat}>
        <cylinderGeometry args={[0.38, 0.38, 0.03, 32]} />
      </mesh>
      <mesh position={[0, 0.65, -0.12]} material={clearStandMat}>
        <cylinderGeometry args={[0.015, 0.015, 1.3, 16]} />
      </mesh>
      <mesh position={[0, 0.95, -0.06]} material={clearStandMat}>
        <torusGeometry args={[0.1, 0.012, 8, 24, Math.PI * 1.2]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Doll Head & Face */}
      <group position={[0, 1.48, 0]}>
        <mesh material={skinMat} castShadow>
          <sphereGeometry args={[0.11, 24, 24]} scale={[1, 1.2, 1]} />
        </mesh>
        <mesh position={[0, -0.12, 0]} material={skinMat} castShadow>
          <cylinderGeometry args={[0.04, 0.045, 0.12, 16]} />
        </mesh>

        <mesh position={[0, -0.13, 0.045]} material={silverJewelryMat}>
          <sphereGeometry args={[0.012, 8, 8]} />
        </mesh>

        <mesh position={[-0.105, 0.02, 0]} material={silverJewelryMat}>
          <torusGeometry args={[0.025, 0.005, 8, 16]} />
        </mesh>
        <mesh position={[0.105, 0.02, 0]} material={silverJewelryMat}>
          <torusGeometry args={[0.025, 0.005, 8, 16]} />
        </mesh>

        <mesh position={[-0.04, 0.02, 0.098]}>
          <sphereGeometry args={[0.014, 12, 12]} />
          <meshBasicMaterial color="#1a0f08" />
        </mesh>
        <mesh position={[0.04, 0.02, 0.098]}>
          <sphereGeometry args={[0.014, 12, 12]} />
          <meshBasicMaterial color="#1a0f08" />
        </mesh>

        <mesh position={[-0.04, 0.042, 0.098]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.032, 0.004, 0.005]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
        <mesh position={[0.04, 0.042, 0.098]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.032, 0.004, 0.005]} />
          <meshBasicMaterial color="#111111" />
        </mesh>

        <mesh position={[0, -0.04, 0.102]}>
          <capsuleGeometry args={[0.008, 0.022, 6, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#c46d6b" roughness={0.2} metalness={0.1} />
        </mesh>

        {hasGlasses && (
          <group position={[0, 0.02, 0.11]}>
            <mesh position={[-0.042, 0, 0]} material={glassesMat}>
              <boxGeometry args={[0.042, 0.03, 0.008]} />
            </mesh>
            <mesh position={[0.042, 0, 0]} material={glassesMat}>
              <boxGeometry args={[0.042, 0.03, 0.008]} />
            </mesh>
            <mesh position={[0, 0.005, 0]} material={glassesMat}>
              <boxGeometry args={[0.02, 0.006, 0.006]} />
            </mesh>
            <mesh position={[-0.068, 0, -0.05]} rotation={[0, -0.1, 0]} material={glassesMat}>
              <boxGeometry args={[0.006, 0.006, 0.1]} />
            </mesh>
            <mesh position={[0.068, 0, -0.05]} rotation={[0, 0.1, 0]} material={glassesMat}>
              <boxGeometry args={[0.006, 0.006, 0.1]} />
            </mesh>
          </group>
        )}

        {hairStyle === 'long-straight' ? (
          <group position={[0, 0.06, 0]}>
            <mesh material={hairMat} castShadow>
              <sphereGeometry args={[0.125, 20, 20]} />
            </mesh>
            <mesh position={[-0.09, -0.22, 0.04]} material={hairMat} castShadow>
              <capsuleGeometry args={[0.045, 0.42, 8, 12]} />
            </mesh>
            <mesh position={[0.09, -0.22, 0.04]} material={hairMat} castShadow>
              <capsuleGeometry args={[0.045, 0.42, 8, 12]} />
            </mesh>
            <mesh position={[0, -0.28, -0.06]} material={hairMat} castShadow>
              <capsuleGeometry args={[0.09, 0.55, 8, 12]} />
            </mesh>
          </group>
        ) : (
          <group position={[0, 0.06, 0]}>
            <mesh material={hairMat} castShadow>
              <sphereGeometry args={[0.13, 20, 20]} />
            </mesh>
            <mesh position={[-0.095, -0.18, 0.03]} rotation={[0, 0, 0.1]} material={hairMat} castShadow>
              <capsuleGeometry args={[0.048, 0.32, 8, 12]} />
            </mesh>
            <mesh position={[0.095, -0.18, 0.03]} rotation={[0, 0, -0.1]} material={hairMat} castShadow>
              <capsuleGeometry args={[0.048, 0.32, 8, 12]} />
            </mesh>
            <mesh position={[0, -0.22, -0.07]} material={hairMat} castShadow>
              <capsuleGeometry args={[0.085, 0.42, 8, 12]} />
            </mesh>
          </group>
        )}
      </group>

      {/* Torso & Top */}
      <group position={[0, 1.18, 0]}>
        <mesh position={[0, 0.11, 0]} material={skinMat} castShadow>
          <boxGeometry args={[0.26, 0.08, 0.13]} />
        </mesh>
        <mesh position={[0, 0.02, 0]} material={topMat} castShadow>
          <cylinderGeometry args={[0.12, 0.095, 0.16, 16]} />
        </mesh>
        <mesh position={[0, -0.1, 0]} material={skinMat} castShadow>
          <cylinderGeometry args={[0.092, 0.11, 0.08, 16]} />
        </mesh>

        {topStyle === 'longsleeve-crop' ? (
          <group>
            <mesh position={[-0.15, 0.02, 0]} rotation={[0, 0, 0.12]} material={topMat} castShadow>
              <capsuleGeometry args={[0.032, 0.28, 8, 12]} />
            </mesh>
            <mesh position={[-0.18, -0.16, 0]} material={skinMat} castShadow>
              <sphereGeometry args={[0.025, 8, 8]} scale={[1, 1.4, 0.6]} />
            </mesh>
            <mesh position={[0.15, 0.02, 0]} rotation={[0, 0, -0.12]} material={topMat} castShadow>
              <capsuleGeometry args={[0.032, 0.28, 8, 12]} />
            </mesh>
            <mesh position={[0.18, -0.16, 0]} material={skinMat} castShadow>
              <sphereGeometry args={[0.025, 8, 8]} scale={[1, 1.4, 0.6]} />
            </mesh>
          </group>
        ) : (
          <group>
            <mesh position={[-0.15, 0.02, 0]} rotation={[0, 0, 0.12]} material={skinMat} castShadow>
              <capsuleGeometry args={[0.028, 0.28, 8, 12]} />
            </mesh>
            <mesh position={[-0.18, -0.16, 0]} material={skinMat} castShadow>
              <sphereGeometry args={[0.025, 8, 8]} scale={[1, 1.4, 0.6]} />
            </mesh>
            <mesh position={[0.15, 0.02, 0]} rotation={[0, 0, -0.12]} material={skinMat} castShadow>
              <capsuleGeometry args={[0.028, 0.28, 8, 12]} />
            </mesh>
            <mesh position={[0.18, -0.16, 0]} material={skinMat} castShadow>
              <sphereGeometry args={[0.025, 8, 8]} scale={[1, 1.4, 0.6]} />
            </mesh>
          </group>
        )}

        {hasBag && (
          <group position={[-0.15, 0.02, 0.06]}>
            <mesh position={[-0.02, -0.12, 0]} material={bagMat} castShadow>
              <boxGeometry args={[0.08, 0.1, 0.05]} />
            </mesh>
            <mesh position={[0.02, 0.06, -0.02]} rotation={[0.4, 0, 0.2]} material={silverJewelryMat}>
              <torusGeometry args={[0.12, 0.008, 6, 16]} />
            </mesh>
          </group>
        )}
      </group>

      {/* Bottoms & Legs */}
      {bottomStyle === 'denim-shorts' ? (
        <group position={[0, 0.96, 0]}>
          <mesh position={[0, 0, 0]} material={denimMat} castShadow>
            <cylinderGeometry args={[0.115, 0.13, 0.12, 16]} />
          </mesh>
          <mesh position={[0, -0.06, 0]} material={denimMat}>
            <torusGeometry args={[0.13, 0.015, 8, 20]} rotation={[Math.PI / 2, 0, 0]} />
          </mesh>

          <group position={[-0.065, -0.42, 0]}>
            <mesh material={skinMat} castShadow>
              <cylinderGeometry args={[0.045, 0.03, 0.72, 16]} />
            </mesh>
            <mesh position={[0, 0.04, 0.02]} material={skinMat}>
              <sphereGeometry args={[0.032, 10, 10]} />
            </mesh>
            <group position={[0, -0.38, 0.04]}>
              <mesh material={crocsMat} castShadow>
                <boxGeometry args={[0.085, 0.055, 0.16]} />
              </mesh>
              <mesh position={[0, 0.02, -0.05]} material={crocsMat}>
                <torusGeometry args={[0.038, 0.008, 8, 16]} rotation={[0, Math.PI / 2, 0]} />
              </mesh>
            </group>
          </group>

          <group position={[0.065, -0.42, 0]}>
            <mesh material={skinMat} castShadow>
              <cylinderGeometry args={[0.045, 0.03, 0.72, 16]} />
            </mesh>
            <mesh position={[0, 0.04, 0.02]} material={skinMat}>
              <sphereGeometry args={[0.032, 10, 10]} />
            </mesh>
            <group position={[0, -0.38, 0.04]}>
              <mesh material={crocsMat} castShadow>
                <boxGeometry args={[0.085, 0.055, 0.16]} />
              </mesh>
              <mesh position={[0, 0.02, -0.05]} material={crocsMat}>
                <torusGeometry args={[0.038, 0.008, 8, 16]} rotation={[0, Math.PI / 2, 0]} />
              </mesh>
            </group>
          </group>
        </group>
      ) : (
        <group position={[0, 0.96, 0]}>
          <mesh position={[0, 0, 0]} material={denimMat} castShadow>
            <cylinderGeometry args={[0.115, 0.14, 0.14, 16]} />
          </mesh>

          <group position={[-0.075, -0.42, 0]}>
            <mesh material={denimMat} castShadow>
              <cylinderGeometry args={[0.065, 0.09, 0.72, 16]} />
            </mesh>
            <mesh position={[0, -0.34, 0]} material={denimMat}>
              <torusGeometry args={[0.088, 0.016, 8, 20]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            <group position={[0, -0.38, 0.04]}>
              <mesh material={crocsMat} castShadow>
                <boxGeometry args={[0.088, 0.055, 0.16]} />
              </mesh>
              <mesh position={[0, 0.02, -0.05]} material={crocsMat}>
                <torusGeometry args={[0.04, 0.008, 8, 16]} rotation={[0, Math.PI / 2, 0]} />
              </mesh>
            </group>
          </group>

          <group position={[0.075, -0.42, 0]}>
            <mesh material={denimMat} castShadow>
              <cylinderGeometry args={[0.065, 0.09, 0.72, 16]} />
            </mesh>
            <mesh position={[0, -0.34, 0]} material={denimMat}>
              <torusGeometry args={[0.088, 0.016, 8, 20]} rotation={[Math.PI / 2, 0, 0]} />
            </mesh>
            <group position={[0, -0.38, 0.04]}>
              <mesh material={crocsMat} castShadow>
                <boxGeometry args={[0.088, 0.055, 0.16]} />
              </mesh>
              <mesh position={[0, 0.02, -0.05]} material={crocsMat}>
                <torusGeometry args={[0.04, 0.008, 8, 16]} rotation={[0, Math.PI / 2, 0]} />
              </mesh>
            </group>
          </group>
        </group>
      )}

      {/* Floating Name Tag */}
      <Billboard position={[0, 1.76, 0]} follow={true}>
        <mesh material={nameTagMat}>
          <planeGeometry args={[0.62, 0.165]} />
        </mesh>
      </Billboard>
    </group>
  );
}

// Pair Component: Gauri & Vani side-by-side in Museum Center
export default function MiniBarbieAvatars({
  avatarData,
  onInspectAvatars
}) {
  const gauriConfig = avatarData.gauri || avatarData.friend1;
  const vaniConfig = avatarData.vani || avatarData.friend2;

  const handleDollClick = (config) => {
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.7 },
      colors: ['#f5d0c6', '#62202f', '#d4af37', '#c8b6e2', '#fbf7e8']
    });

    if (onInspectAvatars) {
      onInspectAvatars(config);
    }
  };

  return (
    <group position={[0, 0, 0.35]} name="GauriAndVaniAvatars">
      {/* Gauri: The one in white (Left) */}
      <MiniBarbieFigure
        config={{ ...gauriConfig, id: 'gauri' }}
        position={[-0.24, 0.0, 0]}
        rotation={[0, 0.15, 0]}
        onFigureClick={handleDollClick}
      />

      {/* Vani: The one in black (Right) */}
      <MiniBarbieFigure
        config={{ ...vaniConfig, id: 'vani' }}
        position={[0.24, 0.0, 0]}
        rotation={[0, -0.15, 0]}
        onFigureClick={handleDollClick}
      />
    </group>
  );
}
