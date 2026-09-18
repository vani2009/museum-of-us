import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createStripedWallTexture, createHerringboneFloorTexture, createStoneArchTexture } from '../../utils/textureGenerators';
import BirthdayGarlands from './BirthdayGarlands';
import BirthdayBalloons from './BirthdayBalloons';

export default function GalleryRoom({
  wallColor = '#FFD1DC',
  trimColor = '#FFF8F6',
  carpetColor = '#F8A5C2',
  children
}) {
  const safeWallColor = wallColor || '#FFD1DC';
  const safeTrimColor = trimColor || '#FFF8F6';
  const safeCarpetColor = carpetColor || '#F8A5C2';

  const wallTexture = useMemo(() => createStripedWallTexture(safeWallColor, '#FFFDFE'), [safeWallColor]);
  const floorTexture = useMemo(() => createHerringboneFloorTexture(), []);
  const trimTexture = useMemo(() => createStoneArchTexture(), []);

  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: wallTexture,
    color: '#FFFFFF',
    roughness: 0.8,
    metalness: 0.05,
  }), [wallTexture]);

  const trimMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: trimTexture,
    color: safeTrimColor,
    roughness: 0.45,
    metalness: 0.08,
  }), [trimTexture, safeTrimColor]);

  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: floorTexture,
    color: '#FFFFFF',
    roughness: 0.28,
    metalness: 0.05,
  }), [floorTexture]);

  const carpetMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: carpetColor,
    roughness: 0.75,
    metalness: 0.02,
  }), [carpetColor]);

  const roseGoldTrimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E8A598',
    roughness: 0.25,
    metalness: 0.85,
  }), []);

  const ceilingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFF8FA',
    roughness: 0.8,
    metalness: 0.05,
  }), []);

  const roomW = 10;
  const roomD = 10;
  const roomH = 5.2;

  return (
    <group name="GalleryRoom">
      {/* Parquet Hardwood Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={floorMat} receiveShadow>
        <planeGeometry args={[roomW, roomD]} />
      </mesh>

      {/* Velvet Runner Rug / Carpet in Center */}
      <group position={[0, 0.005, 0]}>
        {/* Carpet Border */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} material={roseGoldTrimMat}>
          <planeGeometry args={[4.4, 7.4]} />
        </mesh>
        {/* Carpet Body */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.002]} material={carpetMat} receiveShadow>
          <planeGeometry args={[4.2, 7.2]} />
        </mesh>
      </group>

      {/* Classical Ceiling with Cornices */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomH, 0]} material={ceilingMat}>
        <planeGeometry args={[roomW, roomD]} />
      </mesh>

      {/* Birthday Garlands (Paper Bunting & Shimmering 3D Stars) */}
      <BirthdayGarlands />

      {/* Birthday Balloons (Striped & Polka-Dot Bouquets) */}
      <BirthdayBalloons />

      {/* ================= BACK WALL (z = -5) ================= */}
      <group position={[0, 0, -roomD / 2]}>
        <mesh position={[0, roomH / 2, 0]} material={wallMat} receiveShadow castShadow>
          <planeGeometry args={[roomW, roomH]} />
        </mesh>
        {/* Baseboard */}
        <mesh position={[0, 0.2, 0.04]} material={trimMat}>
          <boxGeometry args={[roomW, 0.4, 0.08]} />
        </mesh>
        {/* Chair Rail / Wainscoting Molding */}
        <mesh position={[0, 1.1, 0.03]} material={trimMat}>
          <boxGeometry args={[roomW, 0.1, 0.06]} />
        </mesh>
        {/* Crown Cornice Molding at Ceiling */}
        <mesh position={[0, roomH - 0.15, 0.06]} material={trimMat}>
          <boxGeometry args={[roomW, 0.3, 0.12]} />
        </mesh>
      </group>

      {/* ================= FRONT WALL (z = 5) ================= */}
      <group position={[0, 0, roomD / 2]} rotation={[0, Math.PI, 0]}>
        {/* Left and Right Wall segments around Entrance Arch */}
        <mesh position={[-3.6, roomH / 2, 0]} material={wallMat} receiveShadow>
          <planeGeometry args={[2.8, roomH]} />
        </mesh>
        <mesh position={[3.6, roomH / 2, 0]} material={wallMat} receiveShadow>
          <planeGeometry args={[2.8, roomH]} />
        </mesh>
        {/* Top lintel above arch */}
        <mesh position={[0, roomH - 0.5, 0]} material={wallMat} receiveShadow>
          <planeGeometry args={[4.4, 1.0]} />
        </mesh>
        {/* Baseboards */}
        <mesh position={[-3.6, 0.2, 0.04]} material={trimMat}>
          <boxGeometry args={[2.8, 0.4, 0.08]} />
        </mesh>
        <mesh position={[3.6, 0.2, 0.04]} material={trimMat}>
          <boxGeometry args={[2.8, 0.4, 0.08]} />
        </mesh>
        {/* Wainscoting Rails */}
        <mesh position={[-3.6, 1.1, 0.03]} material={trimMat}>
          <boxGeometry args={[2.8, 0.1, 0.06]} />
        </mesh>
        <mesh position={[3.6, 1.1, 0.03]} material={trimMat}>
          <boxGeometry args={[2.8, 0.1, 0.06]} />
        </mesh>
        {/* Crown Cornices */}
        <mesh position={[-3.6, roomH - 0.15, 0.06]} material={trimMat}>
          <boxGeometry args={[2.8, 0.3, 0.12]} />
        </mesh>
        <mesh position={[3.6, roomH - 0.15, 0.06]} material={trimMat}>
          <boxGeometry args={[2.8, 0.3, 0.12]} />
        </mesh>
      </group>

      {/* ================= LEFT WALL (x = -5) ================= */}
      <group position={[-roomW / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, roomH / 2, 0]} material={wallMat} receiveShadow castShadow>
          <planeGeometry args={[roomD, roomH]} />
        </mesh>
        {/* Baseboard */}
        <mesh position={[0, 0.2, 0.04]} material={trimMat}>
          <boxGeometry args={[roomD, 0.4, 0.08]} />
        </mesh>
        {/* Wainscoting Rail */}
        <mesh position={[0, 1.1, 0.03]} material={trimMat}>
          <boxGeometry args={[roomD, 0.1, 0.06]} />
        </mesh>
        {/* Crown Cornice */}
        <mesh position={[0, roomH - 0.15, 0.06]} material={trimMat}>
          <boxGeometry args={[roomD, 0.3, 0.12]} />
        </mesh>
      </group>

      {/* ================= RIGHT WALL (x = 5) ================= */}
      <group position={[roomW / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, roomH / 2, 0]} material={wallMat} receiveShadow castShadow>
          <planeGeometry args={[roomD, roomH]} />
        </mesh>
        {/* Baseboard */}
        <mesh position={[0, 0.2, 0.04]} material={trimMat}>
          <boxGeometry args={[roomD, 0.4, 0.08]} />
        </mesh>
        {/* Wainscoting Rail */}
        <mesh position={[0, 1.1, 0.03]} material={trimMat}>
          <boxGeometry args={[roomD, 0.1, 0.06]} />
        </mesh>
        {/* Crown Cornice */}
        <mesh position={[0, roomH - 0.15, 0.06]} material={trimMat}>
          <boxGeometry args={[roomD, 0.3, 0.12]} />
        </mesh>
      </group>

      {/* Nested Children (Frames, props, avatars) */}
      {children}
    </group>
  );
}
