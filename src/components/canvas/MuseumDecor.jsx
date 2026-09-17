import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createDelftPorcelainTexture } from '../../utils/textureGenerators';

export default function MuseumDecor() {
  const delftTexture = useMemo(() => createDelftPorcelainTexture(), []);

  // Materials
  const porcelainMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: delftTexture,
    roughness: 0.1,
    metalness: 0.15,
  }), [delftTexture]);

  const lemonMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffea00',
    roughness: 0.3,
    metalness: 0.05,
  }), []);

  const leafMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2d6a4f',
    roughness: 0.6,
    metalness: 0.05,
  }), []);

  const branchMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#5c4033',
    roughness: 0.8,
    metalness: 0.05,
  }), []);

  const goldBrassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d4af37',
    roughness: 0.25,
    metalness: 0.85,
  }), []);

  const velvetBenchMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#A37C76',
    roughness: 0.8,
    metalness: 0.05,
  }), []);

  const benchTrimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D9B382',
    roughness: 0.7,
    metalness: 0.05,
  }), []);

  const marblePedestalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#fbf7e8',
    roughness: 0.35,
    metalness: 0.1,
  }), []);

  return (
    <group name="MuseumDecorations">
      {/* ================= COMPACT POTTED LEMON TREE (Low Pedestal) ================= */}
      <group position={[-3.8, 0, 2.6]}>
        {/* Classical Low Marble Plinth / Pedestal */}
        <mesh position={[0, 0.15, 0]} material={marblePedestalMat} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.34, 0.3, 24]} />
        </mesh>
        <mesh position={[0, 0.31, 0]} material={marblePedestalMat} castShadow>
          <boxGeometry args={[0.65, 0.04, 0.65]} />
        </mesh>

        {/* Delft Porcelain Urn / Planter */}
        <group position={[0, 0.48, 0]}>
          <mesh material={porcelainMat} castShadow receiveShadow>
            <cylinderGeometry args={[0.24, 0.16, 0.32, 24]} />
          </mesh>
          <mesh position={[0, 0.16, 0]} material={porcelainMat} castShadow>
            <torusGeometry args={[0.24, 0.025, 16, 24]} />
          </mesh>
          {/* Handles */}
          <mesh position={[-0.23, 0.08, 0]} rotation={[0, 0, 0.3]} material={porcelainMat}>
            <torusGeometry args={[0.07, 0.02, 12, 16]} />
          </mesh>
          <mesh position={[0.23, 0.08, 0]} rotation={[0, 0, -0.3]} material={porcelainMat}>
            <torusGeometry args={[0.07, 0.02, 12, 16]} />
          </mesh>
          {/* Soil */}
          <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.22, 16]} />
            <meshStandardMaterial color="#2d1b0d" roughness={0.9} />
          </mesh>
        </group>

        {/* Compact Lemon Tree Trunk & Branches */}
        <group position={[0, 0.65, 0]}>
          <mesh position={[0, 0.18, 0]} material={branchMat} castShadow>
            <cylinderGeometry args={[0.03, 0.04, 0.36, 12]} />
          </mesh>

          {/* Dainty Lemon Foliage Canopy (Total top height ~1.15m, well below frames) */}
          <group position={[0, 0.42, 0]}>
            <mesh material={leafMat} castShadow>
              <sphereGeometry args={[0.3, 16, 16]} />
            </mesh>
            <mesh position={[-0.14, -0.06, 0.08]} material={leafMat} castShadow>
              <sphereGeometry args={[0.2, 12, 12]} />
            </mesh>
            <mesh position={[0.14, -0.05, -0.08]} material={leafMat} castShadow>
              <sphereGeometry args={[0.22, 12, 12]} />
            </mesh>
            <mesh position={[0.04, 0.12, 0.1]} material={leafMat} castShadow>
              <sphereGeometry args={[0.18, 12, 12]} />
            </mesh>

            {/* Bright Yellow Mini Lemons */}
            {[
              [-0.12, -0.1, 0.18],
              [0.15, -0.08, 0.14],
              [-0.1, 0.1, 0.2],
              [0.12, 0.12, -0.15],
              [-0.18, -0.02, -0.14],
              [0.02, -0.16, -0.18],
              [0.0, 0.2, 0.1],
            ].map(([lx, ly, lz], idx) => (
              <mesh key={idx} position={[lx, ly, lz]} material={lemonMat} castShadow>
                <sphereGeometry args={[0.045, 12, 12]} scale={[1, 1.3, 1]} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* ================= VELVET MUSEUM VIEWING BENCH (Center Back) ================= */}
      <group position={[0, 0, -1.8]}>
        {/* Bench Velvet Cushion */}
        <mesh position={[0, 0.32, 0]} material={velvetBenchMat} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.14, 0.7]} />
        </mesh>
        {/* Pink Panther Cushion Piping / Trim */}
        <mesh position={[0, 0.32, 0]} material={benchTrimMat}>
          <boxGeometry args={[2.04, 0.03, 0.74]} />
        </mesh>

        {/* 4 Carved Gold Legs */}
        {[
          [-0.85, 0.13, -0.26],
          [0.85, 0.13, -0.26],
          [-0.85, 0.13, 0.26],
          [0.85, 0.13, 0.26],
        ].map(([bx, by, bz], idx) => (
          <mesh key={idx} position={[bx, by, bz]} material={goldBrassMat} castShadow>
            <cylinderGeometry args={[0.03, 0.02, 0.26, 12]} />
          </mesh>
        ))}

        {/* Gold Frame Apron */}
        <mesh position={[0, 0.23, 0]} material={goldBrassMat} castShadow>
          <boxGeometry args={[1.8, 0.05, 0.6]} />
        </mesh>
      </group>

      {/* ================= BRASS MUSEUM STANCHIONS (Discreetly Widened) ================= */}
      <group position={[0, 0, 0]}>
        {[
          [-1.8, 0.3, 1.2],
          [1.8, 0.3, 1.2],
          [-1.8, 0.3, -1.2],
          [1.8, 0.3, -1.2],
        ].map(([sx, sy, sz], idx) => (
          <group key={idx} position={[sx, 0, sz]}>
            {/* Base */}
            <mesh position={[0, 0.015, 0]} material={goldBrassMat} castShadow>
              <cylinderGeometry args={[0.12, 0.14, 0.03, 16]} />
            </mesh>
            {/* Post */}
            <mesh position={[0, 0.3, 0]} material={goldBrassMat} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.58, 16]} />
            </mesh>
            {/* Top Sphere Finial */}
            <mesh position={[0, 0.62, 0]} material={goldBrassMat} castShadow>
              <sphereGeometry args={[0.045, 16, 16]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
