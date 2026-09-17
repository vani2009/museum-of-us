import React, { useMemo, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createRococoFrameTexture, createPearlTexture, createPlacardTexture } from '../../utils/textureGenerators';

// Helper: Custom shape extruder for wavy baroque rectangle
function createWavyRectShape(w, h, r = 0.15) {
  const shape = new THREE.Shape();
  const halfW = w / 2;
  const halfH = h / 2;

  shape.moveTo(-halfW + r, halfH);
  shape.quadraticCurveTo(-halfW * 0.3, halfH + 0.05, 0, halfH);
  shape.quadraticCurveTo(halfW * 0.3, halfH + 0.05, halfW - r, halfH);
  shape.quadraticCurveTo(halfW + 0.05, halfH - r * 0.5, halfW, halfH - r);
  
  shape.quadraticCurveTo(halfW + 0.05, 0, halfW, -halfH + r);
  shape.quadraticCurveTo(halfW + 0.05, -halfH + r * 0.5, halfW - r, -halfH);

  shape.quadraticCurveTo(halfW * 0.3, -halfH - 0.05, 0, -halfH);
  shape.quadraticCurveTo(-halfW * 0.3, -halfH - 0.05, -halfW + r, -halfH);
  shape.quadraticCurveTo(-halfW - 0.05, -halfH + r * 0.5, -halfW, -halfH + r);

  shape.quadraticCurveTo(-halfW - 0.05, 0, -halfW, halfH - r);
  shape.quadraticCurveTo(-halfW - 0.05, halfH - r * 0.5, -halfW + r, halfH);

  return shape;
}

// Helper: Heart Shape
function createHeartShape(s = 0.5) {
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, s * 0.35);
  heartShape.bezierCurveTo(s * 0.1, s * 0.85, s * 0.8, s * 0.85, s * 0.8, s * 0.35);
  heartShape.bezierCurveTo(s * 0.8, -0.05, s * 0.3, -s * 0.45, 0, -s * 0.75);
  heartShape.bezierCurveTo(-s * 0.3, -s * 0.45, -s * 0.8, -0.05, -s * 0.8, s * 0.35);
  heartShape.bezierCurveTo(-s * 0.8, s * 0.85, -s * 0.1, s * 0.85, 0, s * 0.35);
  return heartShape;
}

// Helper: Arched Cathedral Shape
function createArchShape(w = 0.8, h = 1.1) {
  const shape = new THREE.Shape();
  const halfW = w / 2;
  const archR = halfW;
  const bottomH = h - archR;

  shape.moveTo(-halfW, -h / 2);
  shape.lineTo(halfW, -h / 2);
  shape.lineTo(halfW, -h / 2 + bottomH);
  shape.absarc(0, -h / 2 + bottomH, archR, 0, Math.PI, false);
  shape.lineTo(-halfW, -h / 2);

  return shape;
}

// -------------------------------------------------------------
// Whimsical Frame Base Wrapper
// -------------------------------------------------------------
function WhimsicalFrameWrapper({
  frameType = 'wavy-baroque', // 'wavy-baroque' | 'rococo-heart' | 'arched-cathedral' | 'scalloped-round' | 'shield-crest'
  imageUrl,
  title = "Whimsical Keepsake",
  subtitle = "Permanent Whimsical Collection",
  position = [0, 2, 0],
  rotation = [0, 0, 0],
  scale = 0.85,
  aspectRatio = "square",
  onSelectFrame
}) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Procedural Materials
  const rococoTex = useMemo(() => createRococoFrameTexture('#FFD6DF', '#E8A598'), []);
  const pearlTex = useMemo(() => createPearlTexture(), []);
  const placardTex = useMemo(() => createPlacardTexture(title, subtitle), [title, subtitle]);

  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: rococoTex,
    color: '#FFF0F3',
    roughness: 0.3,
    metalness: 0.25,
  }), [rococoTex]);

  const goldLeafMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E8A598',
    metalness: 0.88,
    roughness: 0.2,
  }), []);

  const pearlMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: pearlTex,
    color: '#FFFDFE',
    roughness: 0.12,
    metalness: 0.2,
  }), [pearlTex]);

  const roseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFB6C1',
    roughness: 0.45,
    metalness: 0.1,
  }), []);

  const placardMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: placardTex,
    roughness: 0.35,
    metalness: 0.1,
  }), [placardTex]);

  // Load Art Image
  const artTexture = useMemo(() => {
    if (!imageUrl) return null;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    return loader.load(imageUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
    });
  }, [imageUrl]);

  const pictureMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: artTexture,
    color: artTexture ? '#FFFFFF' : '#FFF0F3',
    roughness: 0.25,
    metalness: 0.05,
  }), [artTexture]);

  // Hover animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetZ = hovered ? position[2] + 0.06 : position[2];
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 8, delta);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (onSelectFrame) {
      onSelectFrame({
        id: `whimsical-${title.toLowerCase().replace(/\s+/g, '-')}`,
        title,
        date: "Whimsical Collection",
        location: "The Friendship Gallery",
        image: imageUrl,
        story: `${title}: A whimsical artpiece in the Grand Museum celebrating girlhood, sweet memories, and everlasting friendship. ✨`,
        shape: frameType,
        aspectRatio: aspectRatio,
        likes: 199
      });
    }
  };

  // Render Frame Variations
  const renderFrameBody = () => {
    if (frameType === 'wavy-baroque') {
      const w = 1.05;
      const h = 0.88;
      const wavyShape = createWavyRectShape(w, h, 0.12);

      return (
        <group>
          {/* Extruded Wavy Scalloped Outer Frame */}
          <mesh material={frameMat} castShadow receiveShadow>
            <extrudeGeometry
              args={[
                wavyShape,
                { depth: 0.06, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04, bevelSegments: 3 }
              ]}
            />
          </mesh>

          {/* Rose Gold Inner Bezel Ring */}
          <mesh position={[0, 0, 0.065]} material={goldLeafMat}>
            <extrudeGeometry
              args={[
                createWavyRectShape(w - 0.06, h - 0.06, 0.1),
                { depth: 0.015, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }
              ]}
            />
          </mesh>

          {/* Picture Plane */}
          <mesh position={[0, 0, 0.082]} material={pictureMat} castShadow>
            <planeGeometry args={[w - 0.14, h - 0.14]} />
          </mesh>

          {/* 4 Corner Ornate Rose Florets with Pearls */}
          {[
            [-w / 2 + 0.02, h / 2 - 0.02],
            [w / 2 - 0.02, h / 2 - 0.02],
            [-w / 2 + 0.02, -h / 2 + 0.02],
            [w / 2 - 0.02, -h / 2 + 0.02],
          ].map(([cx, cy], idx) => (
            <group key={`rosette-${idx}`} position={[cx, cy, 0.09]}>
              {/* Gold backing leaf */}
              <mesh material={goldLeafMat}>
                <sphereGeometry args={[0.045, 8, 8]} scale={[1.2, 1, 0.4]} />
              </mesh>
              {/* Pink Rose Bud */}
              <mesh position={[0, 0, 0.02]} material={roseMat}>
                <sphereGeometry args={[0.03, 10, 10]} />
              </mesh>
              {/* Center Pearl */}
              <mesh position={[0, 0, 0.04]} material={pearlMat}>
                <sphereGeometry args={[0.015, 8, 8]} />
              </mesh>
            </group>
          ))}

          {/* Pearl Bead Row on Top and Bottom */}
          {[-0.32, -0.16, 0, 0.16, 0.32].map((bx, idx) => (
            <group key={`bead-row-${idx}`}>
              <mesh position={[bx, h / 2 + 0.03, 0.075]} material={pearlMat}>
                <sphereGeometry args={[0.016, 8, 8]} />
              </mesh>
              <mesh position={[bx, -h / 2 - 0.03, 0.075]} material={pearlMat}>
                <sphereGeometry args={[0.016, 8, 8]} />
              </mesh>
            </group>
          ))}
        </group>
      );
    }

    if (frameType === 'rococo-heart') {
      const heartShape = createHeartShape(0.58);
      const innerHeart = createHeartShape(0.48);

      return (
        <group position={[0, 0.06, 0]}>
          {/* Main Extruded Rococo Heart Body */}
          <mesh material={frameMat} castShadow receiveShadow>
            <extrudeGeometry
              args={[
                heartShape,
                { depth: 0.06, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04, bevelSegments: 3 }
              ]}
            />
          </mesh>

          {/* Gold Leaf Filigree Border */}
          <mesh position={[0, 0, 0.065]} material={goldLeafMat}>
            <extrudeGeometry
              args={[
                innerHeart,
                { depth: 0.015, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }
              ]}
            />
          </mesh>

          {/* Picture Plane */}
          <mesh position={[0, 0, 0.082]} material={pictureMat} castShadow>
            <shapeGeometry args={[innerHeart]} />
          </mesh>

          {/* Baroque Crown Pearl Crest on Top */}
          <group position={[0, 0.52, 0.08]}>
            {/* Shell Fan Finial */}
            <mesh material={goldLeafMat}>
              <coneGeometry args={[0.13, 0.16, 7]} rotation={[0, 0, Math.PI]} scale={[1.2, 1, 0.5]} />
            </mesh>
            {/* Large Center Pearl */}
            <mesh position={[0, -0.02, 0.03]} material={pearlMat}>
              <sphereGeometry args={[0.04, 16, 16]} />
            </mesh>
            {/* Flanking Small Pearls */}
            <mesh position={[-0.07, -0.04, 0.02]} material={pearlMat}>
              <sphereGeometry args={[0.022, 10, 10]} />
            </mesh>
            <mesh position={[0.07, -0.04, 0.02]} material={pearlMat}>
              <sphereGeometry args={[0.022, 10, 10]} />
            </mesh>
          </group>

          {/* Miniature Pink Roses along outer heart perimeter */}
          {[
            [-0.32, 0.28],
            [0.32, 0.28],
            [-0.42, 0.12],
            [0.42, 0.12],
            [-0.24, -0.22],
            [0.24, -0.22],
            [0, -0.42],
          ].map(([rx, ry], idx) => (
            <mesh key={`rose-${idx}`} position={[rx, ry, 0.085]} material={roseMat}>
              <sphereGeometry args={[0.026, 8, 8]} />
            </mesh>
          ))}
        </group>
      );
    }

    if (frameType === 'arched-cathedral') {
      const archShape = createArchShape(0.85, 1.15);
      const innerArch = createArchShape(0.72, 1.02);

      return (
        <group>
          {/* Main Arched Frame */}
          <mesh material={frameMat} castShadow receiveShadow>
            <extrudeGeometry
              args={[
                archShape,
                { depth: 0.06, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.035, bevelSegments: 3 }
              ]}
            />
          </mesh>

          {/* Rose Gold Inner Molding */}
          <mesh position={[0, 0, 0.065]} material={goldLeafMat}>
            <extrudeGeometry
              args={[
                innerArch,
                { depth: 0.015, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }
              ]}
            />
          </mesh>

          {/* Picture Plane */}
          <mesh position={[0, 0, 0.082]} material={pictureMat} castShadow>
            <shapeGeometry args={[innerArch]} />
          </mesh>

          {/* Crown Baroque Shell Finial */}
          <group position={[0, 0.62, 0.08]}>
            <mesh material={goldLeafMat}>
              <coneGeometry args={[0.12, 0.15, 6]} rotation={[0, 0, Math.PI]} scale={[1.2, 1, 0.5]} />
            </mesh>
            <mesh position={[0, -0.03, 0.02]} material={pearlMat}>
              <sphereGeometry args={[0.032, 12, 12]} />
            </mesh>
          </group>

          {/* Side Pillar Floral Rosettes */}
          {[-0.42, 0.42].map((px, pIdx) => (
            <group key={`pillar-${pIdx}`}>
              <mesh position={[px, 0.1, 0.085]} material={roseMat}>
                <sphereGeometry args={[0.035, 8, 8]} />
              </mesh>
              <mesh position={[px, -0.3, 0.085]} material={roseMat}>
                <sphereGeometry args={[0.035, 8, 8]} />
              </mesh>
            </group>
          ))}
        </group>
      );
    }

    // Default: Scalloped Round Floral Frame (12 Petal Rosettes with Pearls)
    const radius = 0.44;
    return (
      <group>
        {/* Central Circular Torus Bezel */}
        <mesh material={frameMat} castShadow receiveShadow>
          <torusGeometry args={[radius, 0.08, 16, 36]} />
        </mesh>

        {/* Gold Inner Trim Ring */}
        <mesh position={[0, 0, 0.02]} material={goldLeafMat}>
          <torusGeometry args={[radius - 0.04, 0.02, 12, 36]} />
        </mesh>

        {/* Picture Circular Plane */}
        <mesh position={[0, 0, 0.025]} material={pictureMat} castShadow>
          <circleGeometry args={[radius - 0.02, 36]} />
        </mesh>

        {/* 12 Scalloped Petal Rosettes with Pearls around the circumference */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const px = Math.cos(angle) * (radius + 0.08);
          const py = Math.sin(angle) * (radius + 0.08);

          return (
            <group key={`scallop-${i}`} position={[px, py, 0.03]}>
              {/* Petal Shell */}
              <mesh material={frameMat}>
                <sphereGeometry args={[0.05, 10, 10]} scale={[1, 1, 0.4]} />
              </mesh>
              {/* Gold Ring */}
              <mesh material={goldLeafMat}>
                <torusGeometry args={[0.032, 0.008, 8, 12]} />
              </mesh>
              {/* Center Pearl */}
              <mesh position={[0, 0, 0.015]} material={pearlMat}>
                <sphereGeometry args={[0.02, 10, 10]} />
              </mesh>
            </group>
          );
        })}

        {/* Top Ornate Baroque Crest */}
        <group position={[0, radius + 0.16, 0.04]}>
          <mesh material={goldLeafMat}>
            <coneGeometry args={[0.12, 0.14, 6]} rotation={[0, 0, Math.PI]} scale={[1.3, 1, 0.5]} />
          </mesh>
          <mesh position={[0, -0.02, 0.02]} material={pearlMat}>
            <sphereGeometry args={[0.03, 12, 12]} />
          </mesh>
        </group>
      </group>
    );
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
      onClick={handleClick}
    >
      {/* 3D Whimsical Rococo Frame and Art */}
      {renderFrameBody()}

      {/* Dainty Placard */}
      <group position={[0, -0.72, 0.02]}>
        <mesh material={placardMat} castShadow>
          <boxGeometry args={[0.74, 0.2, 0.015]} />
        </mesh>
      </group>
    </group>
  );
}

// -------------------------------------------------------------
// Complete Whimsical Gallery Artframes Component
// -------------------------------------------------------------
export default function WhimsicalArtFrames({ onSelectFrame }) {
  const roomW = 10;
  const roomD = 10;

  return (
    <group name="WhimsicalArtFrames">
      {/* ================= FRONT WALL (Beside Entrance Doors) ================= */}
      {/* 1. Left of Doors: "The Girlhood Files" in Wavy Baroque Scalloped Frame */}
      <WhimsicalFrameWrapper
        frameType="wavy-baroque"
        imageUrl="/images/whimsical/the_girlhood_files.png"
        title="The Girlhood Files"
        subtitle="Whimsical Archives • Vol. 1"
        position={[-3.3, 2.3, roomD / 2 - 0.08]}
        rotation={[0, Math.PI, 0]}
        scale={0.92}
        aspectRatio="landscape"
        onSelectFrame={onSelectFrame}
      />

      {/* 2. Right of Doors: "I AM A MUSEUM OF EVERYTHING I'VE LOVED" in Rococo Heart & Pearl Frame */}
      <WhimsicalFrameWrapper
        frameType="rococo-heart"
        imageUrl="/images/whimsical/museum_of_everything.png"
        title="Museum of Loved Things"
        subtitle="Everlasting Love & Memories"
        position={[3.3, 2.3, roomD / 2 - 0.08]}
        rotation={[0, Math.PI, 0]}
        scale={0.92}
        aspectRatio="portrait"
        onSelectFrame={onSelectFrame}
      />

      {/* ================= LEFT WALL (Accent Art Frame) ================= */}
      {/* 3. "Fairy Tale Castle" in Arched Cathedral Frame */}
      <WhimsicalFrameWrapper
        frameType="arched-cathedral"
        imageUrl="/images/whimsical/fairytale_castle.png"
        title="The Enchanted Castle"
        subtitle="Dreamy Horizons & Pink Vines"
        position={[-roomW / 2 + 0.08, 2.2, -3.4]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.88}
        aspectRatio="portrait"
        onSelectFrame={onSelectFrame}
      />

      {/* ================= RIGHT WALL (Accent Art Frame) ================= */}
      {/* 4. "Vintage Melody Gramophone" in Scalloped Round Floral Frame */}
      <WhimsicalFrameWrapper
        frameType="scalloped-round"
        imageUrl="/images/whimsical/pink_gramophone.png"
        title="Vintage Melody Gramophone"
        subtitle="Sweet Serenades & Shared Laughs"
        position={[roomW / 2 - 0.08, 2.2, -3.4]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.88}
        aspectRatio="square"
        onSelectFrame={onSelectFrame}
      />
    </group>
  );
}
