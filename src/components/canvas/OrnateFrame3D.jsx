import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createGoldFiligreeTexture, createPlacardTexture, createPearlTexture, createRococoFrameTexture } from '../../utils/textureGenerators';

// Helper: Custom shape extruder for wavy baroque rectangle
function createWavyRectShape(w, h, r = 0.12) {
  const shape = new THREE.Shape();
  const halfW = w / 2;
  const halfH = h / 2;

  shape.moveTo(-halfW + r, halfH);
  shape.quadraticCurveTo(-halfW * 0.3, halfH + 0.04, 0, halfH);
  shape.quadraticCurveTo(halfW * 0.3, halfH + 0.04, halfW - r, halfH);
  shape.quadraticCurveTo(halfW + 0.04, halfH - r * 0.5, halfW, halfH - r);
  
  shape.quadraticCurveTo(halfW + 0.04, 0, halfW, -halfH + r);
  shape.quadraticCurveTo(halfW + 0.04, -halfH + r * 0.5, halfW - r, -halfH);

  shape.quadraticCurveTo(halfW * 0.3, -halfH - 0.04, 0, -halfH);
  shape.quadraticCurveTo(-halfW * 0.3, -halfH - 0.04, -halfW + r, -halfH);
  shape.quadraticCurveTo(-halfW - 0.04, -halfH + r * 0.5, -halfW, -halfH + r);

  shape.quadraticCurveTo(-halfW - 0.04, 0, -halfW, halfH - r);
  shape.quadraticCurveTo(-halfW - 0.04, halfH - r * 0.5, -halfW + r, halfH);

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

// Helper: Compute normalized [0, 1] UVs for any 2D ShapeGeometry
function createNormalizedShapeGeometry(shape) {
  const geom = new THREE.ShapeGeometry(shape, 32);
  geom.computeBoundingBox();
  const { min, max } = geom.boundingBox;
  const rangeX = max.x - min.x || 1;
  const rangeY = max.y - min.y || 1;
  const pos = geom.attributes.position;
  const uvs = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const u = (x - min.x) / rangeX;
    const v = (y - min.y) / rangeY;
    uvs.push(u, v);
  }
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.uvsNeedUpdate = true;
  return geom;
}

export default function OrnateFrame3D({
  frameData,
  onSelectFrame,
  isFocused = false
}) {
  const [hovered, setHovered] = useState(false);
  const [loadedTexture, setLoadedTexture] = useState(null);
  const groupRef = useRef();

  const {
    id,
    title,
    date,
    shape = 'rectangle',
    aspectRatio = 'portrait',
    scale = 0.7,
    x = 0,
    y = 2.0,
    image,
    likes = 0
  } = frameData;

  const isInteractive = frameData.interactive !== false && !frameData.isDecorative;

  // Dainty, compact frame proportions
  const width = aspectRatio === 'landscape' ? 1.15 : (aspectRatio === 'square' ? 0.95 : 0.85);
  const height = aspectRatio === 'landscape' ? 0.85 : (aspectRatio === 'square' ? 0.95 : 1.15);

  const goldFiligree = useMemo(() => createGoldFiligreeTexture(), []);
  const rococoTex = useMemo(() => createRococoFrameTexture('#FFD6DF', '#E8A598'), []);
  const pearlTex = useMemo(() => createPearlTexture(), []);
  const placardTex = useMemo(() => createPlacardTexture(title, date), [title, date]);

  // Robust image texture loading with React state
  useEffect(() => {
    if (!image) {
      setLoadedTexture(null);
      return;
    }
    let isMounted = true;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      image,
      (tex) => {
        if (isMounted) {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.needsUpdate = true;
          setLoadedTexture(tex);
        }
      },
      undefined,
      (err) => {
        console.warn('Failed to load image texture, using fallback:', image, err);
      }
    );
    return () => {
      isMounted = false;
    };
  }, [image]);

  // Whimsical Pastel Pink Lacquer, Rose Gold, Pearls & Roses Materials
  const pinkLacquerMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: rococoTex,
    color: '#FFF0F3',
    roughness: 0.3,
    metalness: 0.22,
  }), [rococoTex]);

  const goldLeafMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: goldFiligree,
    color: '#E8A598',
    metalness: 0.88,
    roughness: 0.2,
  }), [goldFiligree]);

  const pearlMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: pearlTex,
    color: '#FFFDFE',
    roughness: 0.1,
    metalness: 0.2,
  }), [pearlTex]);

  const roseMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFB6C1',
    roughness: 0.45,
    metalness: 0.1,
  }), []);

  // Razor-sharp, bright & vibrant photo material (toneMapped: false ensures no darkening from room lighting)
  const pictureMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    map: loadedTexture || null,
    color: loadedTexture ? '#FFFFFF' : '#FFD1DC',
    toneMapped: false,
    side: THREE.FrontSide,
  }), [loadedTexture]);

  const placardMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: placardTex,
    roughness: 0.35,
    metalness: 0.1,
  }), [placardTex]);

  // Pre-calculated normalized shape geometries
  const heartGeom = useMemo(() => createNormalizedShapeGeometry(createHeartShape(0.48)), []);
  const archGeom = useMemo(() => createNormalizedShapeGeometry(createArchShape(width - 0.14, height - 0.14)), [width, height]);
  const wavyGeom = useMemo(() => createNormalizedShapeGeometry(createWavyRectShape(width - 0.12, height - 0.12, 0.09)), [width, height]);

  // Smooth hover motion
  useFrame((state, delta) => {
    if (groupRef.current && isInteractive) {
      const targetZ = hovered ? 0.05 : 0;
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 10, delta);
    }
  });

  // Render whimsical rococo frame geometry matching the reference styles
  const renderFrameGeometry = () => {
    // 1. OVAL ROCOCO FRAME WITH BAROQUE CREST & PEARLS
    if (shape === 'oval' || shape === 'oval-crest') {
      const rX = width * 0.55;
      const rY = height * 0.55;
      return (
        <group>
          {/* Main Pastel Pink Torus Body */}
          <mesh material={pinkLacquerMat} castShadow receiveShadow>
            <torusGeometry args={[rY, 0.09, 16, 36]} scale={[rX / rY, 1, 1]} />
          </mesh>
          {/* Rose Gold Inner Trim Ring */}
          <mesh position={[0, 0, 0.02]} material={goldLeafMat}>
            <torusGeometry args={[rY - 0.04, 0.02, 12, 36]} scale={[rX / rY, 1, 1]} />
          </mesh>
          {/* Inner Picture Canvas */}
          <mesh position={[0, 0, 0.025]} material={pictureMaterial} castShadow>
            <circleGeometry args={[rY - 0.02, 36]} scale={[rX / rY, 1, 1]} />
          </mesh>
          {/* Baroque Crown Shell Finial on Top */}
          <group position={[0, rY + 0.1, 0.03]}>
            <mesh material={goldLeafMat}>
              <coneGeometry args={[0.13, 0.16, 7]} rotation={[0, 0, Math.PI]} scale={[1.2, 1, 0.5]} />
            </mesh>
            <mesh position={[0, -0.02, 0.03]} material={pearlMaterial}>
              <sphereGeometry args={[0.035, 14, 14]} />
            </mesh>
          </group>
          {/* Side Rosebud & Pearl Clusters */}
          {[-rX - 0.03, rX + 0.03].map((px, idx) => (
            <group key={`side-rose-${idx}`} position={[px, 0, 0.03]}>
              <mesh material={roseMat}>
                <sphereGeometry args={[0.032, 8, 8]} />
              </mesh>
              <mesh position={[0, 0, 0.02]} material={pearlMaterial}>
                <sphereGeometry args={[0.016, 8, 8]} />
              </mesh>
            </group>
          ))}
        </group>
      );
    }

    // 2. ROCOCO FAIRY-TALE HEART FRAME WITH PEARL CROWN & MINI ROSES
    if (shape === 'heart' || shape === 'rococo-heart') {
      const heartShape = createHeartShape(0.55);
      const innerHeart = createHeartShape(0.48);

      return (
        <group position={[0, 0.06, 0]}>
          {/* Pastel Pink Lacquer Extruded Heart Base */}
          <mesh material={pinkLacquerMat} castShadow receiveShadow>
            <extrudeGeometry
              args={[
                heartShape,
                { depth: 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.025, bevelSegments: 3 }
              ]}
            />
          </mesh>
          {/* Picture Plane with Normalized UV Mapping (in front of base plate) */}
          <mesh position={[0, 0, 0.065]} geometry={heartGeom} material={pictureMaterial} castShadow />

          {/* Rose Gold Bevel Inner Line framing photo */}
          <mesh position={[0, 0, 0.068]} material={goldLeafMat}>
            <extrudeGeometry
              args={[
                innerHeart,
                { depth: 0.01, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2 }
              ]}
            />
          </mesh>

          {/* Top Baroque Crown Crest with Pearl */}
          <group position={[0, 0.5, 0.08]}>
            <mesh material={goldLeafMat}>
              <coneGeometry args={[0.12, 0.15, 6]} rotation={[0, 0, Math.PI]} scale={[1.2, 1, 0.5]} />
            </mesh>
            <mesh position={[0, -0.02, 0.025]} material={pearlMaterial}>
              <sphereGeometry args={[0.038, 14, 14]} />
            </mesh>
          </group>

          {/* Miniature Pink Roses along outer contour */}
          {[
            [-0.3, 0.26],
            [0.3, 0.26],
            [-0.38, 0.1],
            [0.38, 0.1],
            [-0.22, -0.2],
            [0.22, -0.2],
            [0, -0.38],
          ].map(([rx, ry], idx) => (
            <mesh key={`heart-rose-${idx}`} position={[rx, ry, 0.085]} material={roseMat}>
              <sphereGeometry args={[0.024, 8, 8]} />
            </mesh>
          ))}
        </group>
      );
    }

    // 3. ARCHED CATHEDRAL FRAME WITH TOP SHELL CREST
    if (shape === 'arch' || shape === 'arched-cathedral') {
      const archShape = createArchShape(width, height);
      const innerArch = createArchShape(width - 0.14, height - 0.14);

      return (
        <group>
          {/* Main Pastel Pink Arched Frame Base */}
          <mesh material={pinkLacquerMat} castShadow receiveShadow>
            <extrudeGeometry
              args={[
                archShape,
                { depth: 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.025, bevelSegments: 3 }
              ]}
            />
          </mesh>

          {/* Picture Plane with Normalized UV Mapping */}
          <mesh position={[0, 0, 0.065]} geometry={archGeom} material={pictureMaterial} castShadow />

          {/* Rose Gold Inner Molding framing photo */}
          <mesh position={[0, 0, 0.068]} material={goldLeafMat}>
            <extrudeGeometry
              args={[
                innerArch,
                { depth: 0.01, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2 }
              ]}
            />
          </mesh>

          {/* Crown Shell Finial */}
          <group position={[0, height / 2 + 0.04, 0.08]}>
            <mesh material={goldLeafMat}>
              <coneGeometry args={[0.11, 0.14, 6]} rotation={[0, 0, Math.PI]} scale={[1.2, 1, 0.5]} />
            </mesh>
            <mesh position={[0, -0.02, 0.02]} material={pearlMaterial}>
              <sphereGeometry args={[0.028, 10, 10]} />
            </mesh>
          </group>
        </group>
      );
    }

    // 4. SCALLOPED ROUND FLORAL FRAME WITH 12 PEARL PETALS
    if (shape === 'round' || shape === 'circle' || shape === 'scalloped' || shape === 'scalloped-round') {
      const radius = width * 0.48;
      return (
        <group>
          <mesh material={pinkLacquerMat} castShadow receiveShadow>
            <torusGeometry args={[radius, 0.07, 16, 36]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={goldLeafMat}>
            <torusGeometry args={[radius - 0.035, 0.018, 12, 36]} />
          </mesh>
          <mesh position={[0, 0, 0.025]} material={pictureMaterial} castShadow>
            <circleGeometry args={[radius - 0.02, 36]} />
          </mesh>
          {/* 12 Scalloped Petals with Pearls */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const px = Math.cos(angle) * (radius + 0.07);
            const py = Math.sin(angle) * (radius + 0.07);
            return (
              <group key={`scallop-petal-${i}`} position={[px, py, 0.025]}>
                <mesh material={pinkLacquerMat}>
                  <sphereGeometry args={[0.045, 8, 8]} scale={[1, 1, 0.4]} />
                </mesh>
                <mesh position={[0, 0, 0.015]} material={pearlMaterial}>
                  <sphereGeometry args={[0.016, 8, 8]} />
                </mesh>
              </group>
            );
          })}
        </group>
      );
    }

    // 5. DEFAULT: WAVY BAROQUE SCALLOPED RECTANGULAR FRAME WITH ROSES & PEARLS
    const w = width;
    const h = height;
    const wavyShape = createWavyRectShape(w, h, 0.12);

    return (
      <group>
        {/* Pastel Pink Lacquer Extruded Wavy Border Base */}
        <mesh material={pinkLacquerMat} castShadow receiveShadow>
          <extrudeGeometry
            args={[
              wavyShape,
              { depth: 0.04, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.025, bevelSegments: 3 }
            ]}
          />
        </mesh>

        {/* Picture Canvas (Cleanly sitting on the frame surface) */}
        <mesh position={[0, 0, 0.065]} geometry={wavyGeom} material={pictureMaterial} castShadow />

        {/* Rose Gold Inner Trim */}
        <mesh position={[0, 0, 0.068]} material={goldLeafMat}>
          <extrudeGeometry
            args={[
              createWavyRectShape(w - 0.06, h - 0.06, 0.1),
              { depth: 0.01, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 2 }
            ]}
          />
        </mesh>

        {/* 4 Corner Ornate Rose Florets with Pearls */}
        {[
          [-w / 2 + 0.02, h / 2 - 0.02],
          [w / 2 - 0.02, h / 2 - 0.02],
          [-w / 2 + 0.02, -h / 2 + 0.02],
          [w / 2 - 0.02, -h / 2 + 0.02],
        ].map(([cx, cy], idx) => (
          <group key={`corner-rose-${idx}`} position={[cx, cy, 0.08]}>
            <mesh material={goldLeafMat}>
              <sphereGeometry args={[0.04, 8, 8]} scale={[1.2, 1, 0.4]} />
            </mesh>
            <mesh position={[0, 0, 0.015]} material={roseMat}>
              <sphereGeometry args={[0.025, 8, 8]} />
            </mesh>
            <mesh position={[0, 0, 0.03]} material={pearlMaterial}>
              <sphereGeometry args={[0.014, 8, 8]} />
            </mesh>
          </group>
        ))}

        {/* Top & Bottom Pearl Bead Accents */}
        {[-0.24, 0, 0.24].map((bx, idx) => (
          <group key={`bead-accent-${idx}`}>
            <mesh position={[bx, h / 2 + 0.025, 0.075]} material={pearlMaterial}>
              <sphereGeometry args={[0.015, 8, 8]} />
            </mesh>
            <mesh position={[bx, -h / 2 - 0.025, 0.075]} material={pearlMaterial}>
              <sphereGeometry args={[0.015, 8, 8]} />
            </mesh>
          </group>
        ))}
      </group>
    );
  };

  const placardY = -height * 0.5 - 0.2;

  return (
    <group
      ref={groupRef}
      position={[x, y, 0.08]}
      scale={[scale, scale, scale]}
      onPointerOver={isInteractive ? (e) => {
        e.stopPropagation();
        setHovered(true);
      } : undefined}
      onPointerOut={isInteractive ? () => {
        setHovered(false);
      } : undefined}
      onClick={isInteractive ? (e) => {
        e.stopPropagation();
        onSelectFrame?.(frameData);
      } : undefined}
    >
      {/* 3D Whimsical Pastel Pink Rococo Frame and Photo */}
      {renderFrameGeometry()}

      {/* Dainty Museum Placard */}
      {isInteractive && (
        <group position={[0, placardY, 0.02]}>
          <mesh material={placardMat} castShadow>
            <boxGeometry args={[0.7, 0.19, 0.015]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
