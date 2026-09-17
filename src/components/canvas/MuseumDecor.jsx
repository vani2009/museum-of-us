import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createDelftPorcelainTexture, createCakeFrostingTexture } from '../../utils/textureGenerators';

// 3D Birthday Cake with Glowing Flickering Candles
function BirthdayCake({ position = [0, 0, 0] }) {
  const flameRef = useRef();
  const cakeFrostingTex = useMemo(() => createCakeFrostingTexture(), []);

  const cakeMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: cakeFrostingTex,
    roughness: 0.35,
    metalness: 0.05,
  }), [cakeFrostingTex]);

  const creamMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFFDFE',
    roughness: 0.2,
    metalness: 0.05,
  }), []);

  const candleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFB6C1',
    roughness: 0.3,
  }), []);

  const standMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E8A598',
    metalness: 0.85,
    roughness: 0.2,
  }), []);

  const marbleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFF8F6',
    roughness: 0.25,
  }), []);

  // Flickering candle flame
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(t * 12) * 0.15;
      flameRef.current.scale.x = 1 + Math.cos(t * 10) * 0.12;
    }
  });

  return (
    <group position={position}>
      {/* Rose Gold Pedestal Stand */}
      <mesh position={[0, 0.2, 0]} material={standMat} castShadow>
        <cylinderGeometry args={[0.32, 0.38, 0.4, 24]} />
      </mesh>
      <mesh position={[0, 0.42, 0]} material={marbleMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.48, 0.04, 32]} />
      </mesh>

      {/* Tier 1 (Bottom) */}
      <mesh position={[0, 0.54, 0]} material={cakeMat} castShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.2, 28]} />
      </mesh>
      {/* Piped Cream Border 1 */}
      <mesh position={[0, 0.64, 0]} material={creamMat}>
        <torusGeometry args={[0.38, 0.02, 12, 28]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Tier 2 (Middle) */}
      <mesh position={[0, 0.72, 0]} material={cakeMat} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.16, 24]} />
      </mesh>
      {/* Piped Cream Border 2 */}
      <mesh position={[0, 0.8, 0]} material={creamMat}>
        <torusGeometry args={[0.26, 0.018, 12, 24]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Tier 3 (Top) */}
      <mesh position={[0, 0.87, 0]} material={cakeMat} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.14, 20]} />
      </mesh>

      {/* Birthday Candles */}
      {[
        [-0.05, 0.98, -0.05],
        [0.05, 0.98, -0.05],
        [0, 0.98, 0.06],
      ].map(([cx, cy, cz], idx) => (
        <group key={idx} position={[cx, cy, cz]}>
          {/* Candle wax stick */}
          <mesh material={candleMat} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.12, 12]} />
          </mesh>
          {/* Wick */}
          <mesh position={[0, 0.065, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 0.02, 8]} />
            <meshBasicMaterial color="#111111" />
          </mesh>
          {/* Flame */}
          <mesh ref={idx === 0 ? flameRef : null} position={[0, 0.09, 0]}>
            <sphereGeometry args={[0.016, 12, 12]} scale={[1, 1.8, 1]} />
            <meshBasicMaterial color="#FFD166" />
          </mesh>
          <pointLight color="#FFE8D6" intensity={idx === 0 ? 3 : 0} distance={1.8} />
        </group>
      ))}
    </group>
  );
}

// 3D Wrapped Birthday Gift Box with Ribbon & Bow
function GiftBox({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = [0.35, 0.35, 0.35],
  boxColor = '#FFB6C1',
  ribbonColor = '#FFFDFE'
}) {
  const [w, h, d] = size;

  const boxMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: boxColor,
    roughness: 0.3,
    metalness: 0.05,
  }), [boxColor]);

  const ribbonMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: ribbonColor,
    roughness: 0.2,
    metalness: 0.25,
  }), [ribbonColor]);

  return (
    <group position={position} rotation={rotation}>
      {/* Box Body */}
      <mesh material={boxMat} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>

      {/* Horizontal Ribbon */}
      <mesh material={ribbonMat} castShadow>
        <boxGeometry args={[w + 0.005, h + 0.005, d * 0.2]} />
      </mesh>

      {/* Vertical Ribbon */}
      <mesh material={ribbonMat} castShadow>
        <boxGeometry args={[w * 0.2, h + 0.005, d + 0.005]} />
      </mesh>

      {/* Top Bow Loops */}
      <group position={[0, h / 2 + 0.02, 0]}>
        <mesh rotation={[0, 0.4, Math.PI / 4]} material={ribbonMat}>
          <torusGeometry args={[0.06, 0.015, 8, 16]} />
        </mesh>
        <mesh rotation={[0, -0.4, -Math.PI / 4]} material={ribbonMat}>
          <torusGeometry args={[0.06, 0.015, 8, 16]} />
        </mesh>
        <mesh material={ribbonMat}>
          <sphereGeometry args={[0.025, 10, 10]} />
        </mesh>
      </group>
    </group>
  );
}

export default function MuseumDecor() {
  const delftTexture = useMemo(() => createDelftPorcelainTexture(), []);

  // Materials
  const porcelainMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: delftTexture,
    roughness: 0.1,
    metalness: 0.15,
  }), [delftTexture]);

  const lemonMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FEE440',
    roughness: 0.3,
    metalness: 0.05,
  }), []);

  const leafMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#40916C',
    roughness: 0.6,
    metalness: 0.05,
  }), []);

  const branchMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B5A2B',
    roughness: 0.8,
    metalness: 0.05,
  }), []);

  const roseGoldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E8A598',
    roughness: 0.25,
    metalness: 0.85,
  }), []);

  const strawberryVelvetMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFB6C1',
    roughness: 0.75,
    metalness: 0.05,
  }), []);

  const benchTrimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFFDFE',
    roughness: 0.4,
    metalness: 0.1,
  }), []);

  const marblePedestalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFF8F6',
    roughness: 0.3,
    metalness: 0.1,
  }), []);

  return (
    <group name="MuseumDecorations">
      {/* ================= 3D FESTIVE BIRTHDAY CAKE (Front Right) ================= */}
      <BirthdayCake position={[3.2, 0, 2.2]} />

      {/* ================= WRAPPED BIRTHDAY GIFT BOXES ================= */}
      <GiftBox
        position={[3.2, 0.16, 2.8]}
        rotation={[0, 0.3, 0]}
        size={[0.34, 0.32, 0.34]}
        boxColor="#FFB6C1"
        ribbonColor="#FFFDFE"
      />
      <GiftBox
        position={[3.65, 0.12, 2.4]}
        rotation={[0, -0.2, 0]}
        size={[0.26, 0.24, 0.26]}
        boxColor="#E8D5EA"
        ribbonColor="#F3D299"
      />
      <GiftBox
        position={[2.7, 0.1, 2.4]}
        rotation={[0, 0.6, 0]}
        size={[0.22, 0.2, 0.22]}
        boxColor="#D8F3DC"
        ribbonColor="#FFB6C1"
      />

      {/* ================= POTTED LEMON TREE IN ROSE PORCELAIN URN ================= */}
      <group position={[-3.8, 0, 2.6]}>
        <mesh position={[0, 0.15, 0]} material={marblePedestalMat} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.34, 0.3, 24]} />
        </mesh>
        <mesh position={[0, 0.31, 0]} material={marblePedestalMat} castShadow>
          <boxGeometry args={[0.65, 0.04, 0.65]} />
        </mesh>

        {/* Planter Urn */}
        <group position={[0, 0.48, 0]}>
          <mesh material={porcelainMat} castShadow receiveShadow>
            <cylinderGeometry args={[0.24, 0.16, 0.32, 24]} />
          </mesh>
          <mesh position={[0, 0.16, 0]} material={porcelainMat} castShadow>
            <torusGeometry args={[0.24, 0.025, 16, 24]} />
          </mesh>
          <mesh position={[-0.23, 0.08, 0]} rotation={[0, 0, 0.3]} material={porcelainMat}>
            <torusGeometry args={[0.07, 0.02, 12, 16]} />
          </mesh>
          <mesh position={[0.23, 0.08, 0]} rotation={[0, 0, -0.3]} material={porcelainMat}>
            <torusGeometry args={[0.07, 0.02, 12, 16]} />
          </mesh>
          <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.22, 16]} />
            <meshStandardMaterial color="#4A2E18" roughness={0.9} />
          </mesh>
        </group>

        {/* Lemon Tree Trunk & Foliage */}
        <group position={[0, 0.65, 0]}>
          <mesh position={[0, 0.18, 0]} material={branchMat} castShadow>
            <cylinderGeometry args={[0.03, 0.04, 0.36, 12]} />
          </mesh>

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

      {/* Extra Gift Boxes under Lemon Tree */}
      <GiftBox
        position={[-3.3, 0.14, 2.3]}
        rotation={[0, -0.3, 0]}
        size={[0.3, 0.28, 0.3]}
        boxColor="#F8A5C2"
        ribbonColor="#FFFDFE"
      />
      <GiftBox
        position={[-3.6, 0.1, 1.9]}
        rotation={[0, 0.4, 0]}
        size={[0.22, 0.2, 0.22]}
        boxColor="#E8D5EA"
        ribbonColor="#E8A598"
      />

      {/* ================= STRAWBERRY VELVET VIEWING BENCH ================= */}
      <group position={[0, 0, -1.8]}>
        {/* Bench Cushion */}
        <mesh position={[0, 0.32, 0]} material={strawberryVelvetMat} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.14, 0.7]} />
        </mesh>
        {/* Piping Trim */}
        <mesh position={[0, 0.32, 0]} material={benchTrimMat}>
          <boxGeometry args={[2.04, 0.03, 0.74]} />
        </mesh>

        {/* 4 Rose Gold Legs */}
        {[
          [-0.85, 0.13, -0.26],
          [0.85, 0.13, -0.26],
          [-0.85, 0.13, 0.26],
          [0.85, 0.13, 0.26],
        ].map(([bx, by, bz], idx) => (
          <mesh key={idx} position={[bx, by, bz]} material={roseGoldMat} castShadow>
            <cylinderGeometry args={[0.03, 0.02, 0.26, 12]} />
          </mesh>
        ))}

        {/* Apron */}
        <mesh position={[0, 0.23, 0]} material={roseGoldMat} castShadow>
          <boxGeometry args={[1.8, 0.05, 0.6]} />
        </mesh>
      </group>

      {/* ================= ROSE GOLD STANCHIONS ================= */}
      <group position={[0, 0, 0]}>
        {[
          [-1.8, 0.3, 1.2],
          [1.8, 0.3, 1.2],
          [-1.8, 0.3, -1.2],
          [1.8, 0.3, -1.2],
        ].map(([sx, sy, sz], idx) => (
          <group key={idx} position={[sx, 0, sz]}>
            <mesh position={[0, 0.015, 0]} material={roseGoldMat} castShadow>
              <cylinderGeometry args={[0.12, 0.14, 0.03, 16]} />
            </mesh>
            <mesh position={[0, 0.3, 0]} material={roseGoldMat} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.58, 16]} />
            </mesh>
            <mesh position={[0, 0.62, 0]} material={roseGoldMat} castShadow>
              <sphereGeometry args={[0.045, 16, 16]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

