import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createCarvedDoorTexture, createStoneArchTexture, createFanlightTexture, createPlaqueTexture } from '../../utils/textureGenerators';

export default function GrandArchedEntrance({ isOpen = false, onDoorClick }) {
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();

  // Procedural textures
  const doorTexture = useMemo(() => createCarvedDoorTexture(), []);
  const stoneTexture = useMemo(() => createStoneArchTexture(), []);
  const fanlightTexture = useMemo(() => createFanlightTexture(), []);
  const outdoorPlaqueTex = useMemo(() => createPlaqueTexture("THE GRAND MUSEUM"), []);
  const indoorPlaqueTex = useMemo(() => createPlaqueTexture("✦ GRAND ENTRANCE & EXIT ✦"), []);

  // Smooth door opening animation
  useFrame((state, delta) => {
    const targetAngle = isOpen ? Math.PI * 0.58 : 0;
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.damp(
        leftDoorRef.current.rotation.y,
        -targetAngle,
        4,
        delta
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.damp(
        rightDoorRef.current.rotation.y,
        targetAngle,
        4,
        delta
      );
    }
  });

  // Materials
  const stoneMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: stoneTexture,
    color: '#fbf7e8',
    roughness: 0.85,
    metalness: 0.05,
  }), [stoneTexture]);

  const doorMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: doorTexture,
    color: '#ffffff',
    roughness: 0.45,
    metalness: 0.15,
  }), [doorTexture]);

  const goldBrassMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d4af37',
    roughness: 0.3,
    metalness: 0.85,
  }), []);

  const outdoorPlaqueMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: outdoorPlaqueTex,
    roughness: 0.3,
    metalness: 0.6,
  }), [outdoorPlaqueTex]);

  const indoorPlaqueMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: indoorPlaqueTex,
    roughness: 0.3,
    metalness: 0.6,
  }), [indoorPlaqueTex]);

  const fanlightMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: fanlightTexture,
    transparent: true,
    opacity: 0.95,
    roughness: 0.2,
    metalness: 0.1,
    side: THREE.DoubleSide
  }), [fanlightTexture]);

  const warmInteriorTrimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#fbf7e8',
    roughness: 0.5,
    metalness: 0.1,
  }), []);

  return (
    <group position={[0, 0, 5]} name="GrandArchedEntrance">
      {/* ================= TRUE ARCHWAY WALL WITH ARCH CUTOUT ================= */}
      {/* Left Wall Segment */}
      <mesh position={[-3.7, 3.2, 0]} material={stoneMaterial} receiveShadow castShadow>
        <boxGeometry args={[2.8, 6.4, 0.4]} />
      </mesh>

      {/* Right Wall Segment */}
      <mesh position={[3.7, 3.2, 0]} material={stoneMaterial} receiveShadow castShadow>
        <boxGeometry args={[2.8, 6.4, 0.4]} />
      </mesh>

      {/* Top Lintel Wall Segment (above arch apex at y = 4.2) */}
      <mesh position={[0, 5.3, 0]} material={stoneMaterial} receiveShadow castShadow>
        <boxGeometry args={[4.6, 2.2, 0.4]} />
      </mesh>

      {/* ================= OUTDOOR FACADE (Facing +Z) ================= */}
      {/* Stone Base Plinths / Steps */}
      <mesh position={[0, -0.15, 0.35]} material={stoneMaterial} receiveShadow>
        <boxGeometry args={[5.2, 0.3, 1.2]} />
      </mesh>
      <mesh position={[0, -0.35, 0.65]} material={stoneMaterial} receiveShadow>
        <boxGeometry args={[6.0, 0.2, 1.6]} />
      </mesh>

      {/* Fluted Corinthian Left Column (Outdoor) */}
      <group position={[-1.75, 1.7, 0.28]}>
        <mesh position={[0, -1.5, 0]} material={stoneMaterial} castShadow>
          <boxGeometry args={[0.55, 0.4, 0.55]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={stoneMaterial} castShadow>
          <cylinderGeometry args={[0.2, 0.22, 2.6, 24]} />
        </mesh>
        <mesh position={[0, 1.45, 0]} material={stoneMaterial} castShadow>
          <boxGeometry args={[0.58, 0.35, 0.58]} />
        </mesh>
        <mesh position={[0, 1.65, 0]} material={stoneMaterial} castShadow>
          <boxGeometry args={[0.68, 0.15, 0.68]} />
        </mesh>
      </group>

      {/* Fluted Corinthian Right Column (Outdoor) */}
      <group position={[1.75, 1.7, 0.28]}>
        <mesh position={[0, -1.5, 0]} material={stoneMaterial} castShadow>
          <boxGeometry args={[0.55, 0.4, 0.55]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={stoneMaterial} castShadow>
          <cylinderGeometry args={[0.2, 0.22, 2.6, 24]} />
        </mesh>
        <mesh position={[0, 1.45, 0]} material={stoneMaterial} castShadow>
          <boxGeometry args={[0.58, 0.35, 0.58]} />
        </mesh>
        <mesh position={[0, 1.65, 0]} material={stoneMaterial} castShadow>
          <boxGeometry args={[0.68, 0.15, 0.68]} />
        </mesh>
      </group>

      {/* Classical Arch Molding Over Double Doors (Outdoor) */}
      <group position={[0, 2.8, 0.24]}>
        <mesh material={stoneMaterial} castShadow>
          <torusGeometry args={[1.4, 0.18, 16, 32, Math.PI]} />
        </mesh>
        {/* Ornate Keystone at Apex */}
        <mesh position={[0, 1.4, 0.08]} material={goldBrassMaterial} castShadow>
          <boxGeometry args={[0.42, 0.46, 0.25]} />
        </mesh>
        {/* Arch Spandrel Cornice */}
        <mesh position={[0, 1.75, 0.05]} material={stoneMaterial} castShadow>
          <boxGeometry args={[4.2, 0.25, 0.45]} />
        </mesh>
      </group>

      {/* Golden Engraved Entrance Plaque (Outdoor) */}
      <group position={[0, 4.85, 0.26]}>
        <mesh material={outdoorPlaqueMat} castShadow>
          <boxGeometry args={[3.2, 0.55, 0.06]} />
        </mesh>
      </group>

      {/* Outdoor Lantern Sconces */}
      <group position={[-2.4, 2.8, 0.38]}>
        <mesh material={goldBrassMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <octahedronGeometry args={[0.16]} />
          <meshStandardMaterial color="#fff4d0" emissive="#f5d0c6" emissiveIntensity={1.5} />
        </mesh>
        <pointLight color="#ffe8d6" intensity={15} distance={4} />
      </group>

      <group position={[2.4, 2.8, 0.38]}>
        <mesh material={goldBrassMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 12]} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <octahedronGeometry args={[0.16]} />
          <meshStandardMaterial color="#fff4d0" emissive="#f5d0c6" emissiveIntensity={1.5} />
        </mesh>
        <pointLight color="#ffe8d6" intensity={15} distance={4} />
      </group>

      {/* ================= INDOOR ARCHWAY & MOLDINGS (Facing -Z into Gallery) ================= */}
      {/* Interior Fluted Classical Pilasters */}
      <group position={[-1.65, 1.7, -0.22]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, -1.5, 0]} material={warmInteriorTrimMat}>
          <boxGeometry args={[0.42, 0.4, 0.12]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={warmInteriorTrimMat}>
          <boxGeometry args={[0.34, 2.6, 0.1]} />
        </mesh>
        <mesh position={[0, 1.45, 0]} material={goldBrassMaterial}>
          <boxGeometry args={[0.44, 0.25, 0.14]} />
        </mesh>
      </group>

      <group position={[1.65, 1.7, -0.22]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, -1.5, 0]} material={warmInteriorTrimMat}>
          <boxGeometry args={[0.42, 0.4, 0.12]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={warmInteriorTrimMat}>
          <boxGeometry args={[0.34, 2.6, 0.1]} />
        </mesh>
        <mesh position={[0, 1.45, 0]} material={goldBrassMaterial}>
          <boxGeometry args={[0.44, 0.25, 0.14]} />
        </mesh>
      </group>

      {/* Interior Arch Trim */}
      <group position={[0, 2.8, -0.22]} rotation={[0, Math.PI, 0]}>
        <mesh material={warmInteriorTrimMat}>
          <torusGeometry args={[1.4, 0.15, 16, 32, Math.PI]} />
        </mesh>
        {/* Interior Gold Keystone */}
        <mesh position={[0, 1.4, 0.04]} material={goldBrassMaterial}>
          <boxGeometry args={[0.38, 0.4, 0.16]} />
        </mesh>
        {/* Interior Crown Entablature */}
        <mesh position={[0, 1.7, 0.02]} material={warmInteriorTrimMat}>
          <boxGeometry args={[3.8, 0.2, 0.2]} />
        </mesh>
      </group>

      {/* Interior Golden Plaque Above Doorway */}
      <group position={[0, 4.75, -0.22]} rotation={[0, Math.PI, 0]}>
        <mesh material={indoorPlaqueMat}>
          <boxGeometry args={[2.8, 0.48, 0.04]} />
        </mesh>
      </group>

      {/* Interior Brass Wall Sconces Flanking Doorway */}
      <group position={[-2.4, 2.8, -0.22]}>
        <mesh material={goldBrassMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fff4d0" emissive="#f5d0c6" emissiveIntensity={1.2} />
        </mesh>
        <pointLight color="#ffe8d6" intensity={12} distance={3.5} />
      </group>

      <group position={[2.4, 2.8, -0.22]}>
        <mesh material={goldBrassMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fff4d0" emissive="#f5d0c6" emissiveIntensity={1.2} />
        </mesh>
        <pointLight color="#ffe8d6" intensity={12} distance={3.5} />
      </group>

      {/* ================= SEMICIRCULAR FANLIGHT / TRANSOM WINDOW ================= */}
      <mesh position={[0, 2.8, 0]} material={fanlightMaterial}>
        <circleGeometry args={[1.35, 32, 0, Math.PI]} />
      </mesh>

      {/* ================= GRAND DOUBLE WOODEN DOORS ================= */}
      <group position={[0, 1.4, 0]}>
        {/* Left Door Leaf with Pivot */}
        <group position={[-1.35, 0, 0]} ref={leftDoorRef}>
          {/* Main Door Slab */}
          <mesh
            position={[0.675, 0, 0]}
            material={doorMaterial}
            castShadow
            receiveShadow
            onClick={onDoorClick}
            cursor="pointer"
          >
            <boxGeometry args={[1.35, 2.8, 0.12]} />
          </mesh>

          {/* Outdoor Brass Ring Knocker (Facing +Z) */}
          <mesh position={[1.15, 0.1, 0.08]} material={goldBrassMaterial}>
            <torusGeometry args={[0.08, 0.02, 16, 24]} />
          </mesh>
          <mesh position={[1.15, 0.1, 0.065]} material={goldBrassMaterial}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>

          {/* Indoor Brass Handle & Escutcheon (Facing -Z) */}
          <mesh position={[1.15, 0.0, -0.075]} material={goldBrassMaterial}>
            <boxGeometry args={[0.06, 0.28, 0.02]} />
          </mesh>
          <mesh position={[1.15, 0.06, -0.1]} material={goldBrassMaterial}>
            <boxGeometry args={[0.14, 0.03, 0.04]} />
          </mesh>
        </group>

        {/* Right Door Leaf with Pivot */}
        <group position={[1.35, 0, 0]} ref={rightDoorRef}>
          {/* Main Door Slab */}
          <mesh
            position={[-0.675, 0, 0]}
            material={doorMaterial}
            castShadow
            receiveShadow
            onClick={onDoorClick}
            cursor="pointer"
          >
            <boxGeometry args={[1.35, 2.8, 0.12]} />
          </mesh>

          {/* Outdoor Brass Ring Knocker (Facing +Z) */}
          <mesh position={[-1.15, 0.1, 0.08]} material={goldBrassMaterial}>
            <torusGeometry args={[0.08, 0.02, 16, 24]} />
          </mesh>
          <mesh position={[-1.15, 0.1, 0.065]} material={goldBrassMaterial}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>

          {/* Indoor Brass Handle & Escutcheon (Facing -Z) */}
          <mesh position={[-1.15, 0.0, -0.075]} material={goldBrassMaterial}>
            <boxGeometry args={[0.06, 0.28, 0.02]} />
          </mesh>
          <mesh position={[-1.15, 0.06, -0.1]} material={goldBrassMaterial}>
            <boxGeometry args={[0.14, 0.03, 0.04]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

