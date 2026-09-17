import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Billboard } from '@react-three/drei';
import confetti from 'canvas-confetti';
import { createNameTagTexture } from '../../utils/textureGenerators';

// Single 3D LEGO Minifigure Component
function LegoMinifigure({
  config,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isHoldingHand = false,
  handSide = 'right', // 'left' or 'right'
  onFigureClick,
}) {
  const groupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const [hovered, setHovered] = useState(false);

  const {
    name = "Friend",
    hairStyle = "short-side",
    hairColor = "#4a2810",
    shirtColor = "#62202f",
    pantsColor = "#1d2d44",
    skinTone = "#ffd100", // Classic LEGO yellow or skin tone
    accessory = "camera",
  } = config;

  // Materials
  const yellowSkinMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: skinTone,
    roughness: 0.35,
    metalness: 0.05,
  }), [skinTone]);

  const hairMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: hairColor,
    roughness: 0.4,
    metalness: 0.1,
  }), [hairColor]);

  const shirtMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: shirtColor,
    roughness: 0.5,
    metalness: 0.05,
  }), [shirtColor]);

  const pantsMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: pantsColor,
    roughness: 0.55,
    metalness: 0.05,
  }), [pantsColor]);

  const hipMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#15202b',
    roughness: 0.5,
    metalness: 0.05,
  }), []);

  const blackDetailsMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#111111',
  }), []);

  const nameTagTexture = useMemo(() => createNameTagTexture(name), [name]);
  const nameTagMat = useMemo(() => new THREE.MeshBasicMaterial({
    map: nameTagTexture,
    transparent: true,
  }), [nameTagTexture]);

  // Idle gentle breathing & hand holding animation
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 2 + (handSide === 'left' ? 0 : 1)) * 0.015;
    }
  });

  // Render customizable LEGO hair
  const renderHair = () => {
    if (hairStyle === 'wavy-long') {
      return (
        <group position={[0, 0.76, 0]}>
          <mesh material={hairMat} castShadow>
            <sphereGeometry args={[0.22, 16, 16]} />
          </mesh>
          {/* Side cascading waves */}
          <mesh position={[-0.14, -0.15, 0.02]} material={hairMat} castShadow>
            <capsuleGeometry args={[0.07, 0.32, 8, 12]} />
          </mesh>
          <mesh position={[0.14, -0.15, 0.02]} material={hairMat} castShadow>
            <capsuleGeometry args={[0.07, 0.32, 8, 12]} />
          </mesh>
          {/* Back hair */}
          <mesh position={[0, -0.18, -0.12]} material={hairMat} castShadow>
            <boxGeometry args={[0.3, 0.38, 0.14]} />
          </mesh>
        </group>
      );
    }
    if (hairStyle === 'curly') {
      return (
        <group position={[0, 0.77, 0]}>
          <mesh material={hairMat} castShadow>
            <dodecahedronGeometry args={[0.23, 1]} />
          </mesh>
        </group>
      );
    }
    if (hairStyle === 'bun') {
      return (
        <group position={[0, 0.76, 0]}>
          <mesh material={hairMat} castShadow>
            <sphereGeometry args={[0.2, 16, 16]} />
          </mesh>
          {/* Top knot bun */}
          <mesh position={[0, 0.18, -0.05]} material={hairMat} castShadow>
            <sphereGeometry args={[0.1, 12, 12]} />
          </mesh>
        </group>
      );
    }
    // Default: Side parted short hair
    return (
      <group position={[0, 0.76, 0]}>
        <mesh material={hairMat} castShadow>
          <cylinderGeometry args={[0.19, 0.2, 0.16, 16]} />
        </mesh>
        {/* Hair swoop */}
        <mesh position={[-0.05, 0.08, 0.06]} rotation={[0, 0.3, -0.2]} material={hairMat} castShadow>
          <boxGeometry args={[0.25, 0.08, 0.22]} />
        </mesh>
      </group>
    );
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[0.9, 0.9, 0.9]}
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
      {/* ================= LEGO HEAD ================= */}
      <group position={[0, 0.65, 0]}>
        {/* Head Cylinder */}
        <mesh material={yellowSkinMat} castShadow>
          <cylinderGeometry args={[0.17, 0.17, 0.24, 20]} />
        </mesh>
        {/* Top LEGO Stud */}
        <mesh position={[0, 0.15, 0]} material={yellowSkinMat} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.07, 16]} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.06, 0.02, 0.165]} material={blackDetailsMat}>
          <circleGeometry args={[0.022, 12]} />
        </mesh>
        <mesh position={[0.06, 0.02, 0.165]} material={blackDetailsMat}>
          <circleGeometry args={[0.022, 12]} />
        </mesh>
        {/* Gentle Smile Curve */}
        <mesh position={[0, -0.05, 0.166]} material={blackDetailsMat}>
          <ringGeometry args={[0.04, 0.05, 16, 1, Math.PI * 1.1, Math.PI * 0.8]} />
        </mesh>
        {/* Cute blush cheeks */}
        <mesh position={[-0.08, -0.03, 0.164]}>
          <circleGeometry args={[0.024, 12]} />
          <meshBasicMaterial color="#f5d0c6" />
        </mesh>
        <mesh position={[0.08, -0.03, 0.164]}>
          <circleGeometry args={[0.024, 12]} />
          <meshBasicMaterial color="#f5d0c6" />
        </mesh>
        {/* Hair */}
        {renderHair()}
      </group>

      {/* ================= LEGO TORSO ================= */}
      <group position={[0, 0.38, 0]}>
        {/* Torso Trapezoid Body */}
        <mesh material={shirtMat} castShadow>
          <cylinderGeometry args={[0.26, 0.32, 0.36, 4]} rotation={[0, Math.PI / 4, 0]} />
        </mesh>
        {/* Neck Post */}
        <mesh position={[0, 0.2, 0]} material={shirtMat}>
          <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
        </mesh>

        {/* Left Arm & Hand */}
        <group position={[-0.24, 0.06, 0]} ref={leftArmRef} rotation={[0.1, 0, handSide === 'left' && isHoldingHand ? -0.4 : 0.15]}>
          <mesh material={shirtMat} castShadow>
            <capsuleGeometry args={[0.065, 0.22, 8, 12]} />
          </mesh>
          {/* Left Yellow C-Hand */}
          <group position={[0, -0.17, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <mesh material={yellowSkinMat} castShadow>
              <torusGeometry args={[0.045, 0.02, 12, 16, Math.PI * 1.4]} />
            </mesh>
          </group>
        </group>

        {/* Right Arm & Hand */}
        <group position={[0.24, 0.06, 0]} ref={rightArmRef} rotation={[0.1, 0, handSide === 'right' && isHoldingHand ? 0.4 : -0.15]}>
          <mesh material={shirtMat} castShadow>
            <capsuleGeometry args={[0.065, 0.22, 8, 12]} />
          </mesh>
          {/* Right Yellow C-Hand */}
          <group position={[0, -0.17, 0.04]} rotation={[0, 0, -Math.PI / 2]}>
            <mesh material={yellowSkinMat} castShadow>
              <torusGeometry args={[0.045, 0.02, 12, 16, Math.PI * 1.4]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ================= LEGO HIPS & LEGS ================= */}
      <group position={[0, 0.1, 0]}>
        {/* Hip Joint */}
        <mesh material={hipMat} castShadow>
          <boxGeometry args={[0.42, 0.09, 0.2]} />
        </mesh>
        {/* Left Leg */}
        <group position={[-0.11, -0.13, 0]}>
          <mesh material={pantsMat} castShadow>
            <boxGeometry args={[0.18, 0.22, 0.2]} />
          </mesh>
          {/* Left Foot */}
          <mesh position={[0, -0.06, 0.04]} material={pantsMat} castShadow>
            <boxGeometry args={[0.18, 0.1, 0.28]} />
          </mesh>
        </group>
        {/* Right Leg */}
        <group position={[0.11, -0.13, 0]}>
          <mesh material={pantsMat} castShadow>
            <boxGeometry args={[0.18, 0.22, 0.2]} />
          </mesh>
          {/* Right Foot */}
          <mesh position={[0, -0.06, 0.04]} material={pantsMat} castShadow>
            <boxGeometry args={[0.18, 0.1, 0.28]} />
          </mesh>
        </group>
      </group>

      {/* Floating Name Tag Billboard */}
      <Billboard position={[0, 1.15, 0]} follow={true}>
        <mesh material={nameTagMat}>
          <planeGeometry args={[0.6, 0.16]} />
        </mesh>
      </Billboard>
    </group>
  );
}

// LEGO Minifigure Couple Group Component
export default function LegoAvatars({
  avatarData,
  onInspectAvatars
}) {
  const [activeQuote, setActiveQuote] = useState(null);

  const handleFigureClick = (config) => {
    setActiveQuote({
      name: config.name,
      quote: config.quote,
    });

    // Trigger romantic / joyful heart confetti
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f5d0c6', '#62202f', '#d4af37', '#fbf7e8']
    });

    if (onInspectAvatars) {
      onInspectAvatars(config);
    }
  };

  return (
    <group position={[0, 0, 0.2]} name="LegoCouple">
      {/* Friend 1 Minifigure (Auburn hair / Left side) */}
      <LegoMinifigure
        config={avatarData.friend1}
        position={[-0.32, 0.22, 0]}
        rotation={[0, 0.15, 0]}
        isHoldingHand={true}
        handSide="right"
        onFigureClick={handleFigureClick}
      />

      {/* Friend 2 Minifigure (Right side) */}
      <LegoMinifigure
        config={avatarData.friend2}
        position={[0.32, 0.22, 0]}
        rotation={[0, -0.15, 0]}
        isHoldingHand={true}
        handSide="left"
        onFigureClick={handleFigureClick}
      />

      {/* Floating Quote Speech Bubble handled via 2D UI DialogueToast */}
    </group>
  );
}
