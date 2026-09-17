import React, { useState, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createGoldFiligreeTexture, createPlacardTexture, createPearlTexture, createRococoFrameTexture } from '../../utils/textureGenerators';

export default function OrnateFrame3D({
  frameData,
  onSelectFrame,
  isFocused = false
}) {
  const [hovered, setHovered] = useState(false);
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

  // Dainty, compact frame proportions
  const width = aspectRatio === 'landscape' ? 1.15 : (aspectRatio === 'square' ? 0.95 : 0.85);
  const height = aspectRatio === 'landscape' ? 0.85 : (aspectRatio === 'square' ? 0.95 : 1.15);

  const goldFiligree = useMemo(() => createGoldFiligreeTexture(), []);
  const rococoTex = useMemo(() => createRococoFrameTexture('#FFD6DF', '#E8A598'), []);
  const pearlTex = useMemo(() => createPearlTexture(), []);
  const placardTex = useMemo(() => createPlacardTexture(title, date), [title, date]);

  // Image texture loader with safe fallback
  const texture = useMemo(() => {
    if (!image) return null;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    return loader.load(
      image,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
      },
      undefined,
      (err) => {
        console.warn('Failed to load image texture, using fallback:', image);
      }
    );
  }, [image]);

  // Shimmering Rose Gold & Image Materials
  const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: goldFiligree,
    color: '#E8A598',
    metalness: 0.82,
    roughness: 0.22,
  }), [goldFiligree]);

  const frameLacquerMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: rococoTex,
    color: '#FFF0F3',
    roughness: 0.32,
    metalness: 0.2,
  }), [rococoTex]);

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

  const pictureMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    map: texture,
    color: texture ? '#FFFFFF' : '#FFD1DC',
    roughness: 0.2,
    metalness: 0.05,
  }), [texture]);

  const placardMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: placardTex,
    roughness: 0.35,
    metalness: 0.1,
  }), [placardTex]);

  // Smooth hover motion
  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetZ = hovered ? 0.05 : 0;
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 10, delta);
    }
  });

  // Render dainty frame geometry
  const renderFrameGeometry = () => {
    const frameThickness = 0.09;
    const borderDepth = 0.05;

    if (shape === 'oval') {
      const rX = width * 0.55;
      const rY = height * 0.55;
      return (
        <group>
          {/* Outer Baroque Oval Bezel */}
          <mesh material={goldMaterial} castShadow>
            <torusGeometry args={[rY, frameThickness, 14, 32]} scale={[rX / rY, 1, 1]} />
          </mesh>
          {/* Inner Picture */}
          <mesh position={[0, 0, -0.008]} material={pictureMaterial}>
            <circleGeometry args={[rY - 0.05, 32]} scale={[rX / rY, 1, 1]} />
          </mesh>
          {/* Dainty Filigree Crest on Top */}
          <mesh position={[0, rY + 0.08, 0.015]} material={goldMaterial}>
            <coneGeometry args={[0.14, 0.18, 5]} rotation={[0, 0, Math.PI]} />
          </mesh>
          <mesh position={[0, rY + 0.06, 0.03]} material={pearlMaterial}>
            <sphereGeometry args={[0.025, 10, 10]} />
          </mesh>
        </group>
      );
    }

    if (shape === 'heart') {
      const heartShape = new THREE.Shape();
      const s = 0.48;
      heartShape.moveTo(0, s * 0.4);
      heartShape.bezierCurveTo(s * 0.1, s * 0.9, s * 0.8, s * 0.9, s * 0.8, s * 0.4);
      heartShape.bezierCurveTo(s * 0.8, 0, s * 0.3, -s * 0.4, 0, -s * 0.7);
      heartShape.bezierCurveTo(-s * 0.3, -s * 0.4, -s * 0.8, 0, -s * 0.8, s * 0.4);
      heartShape.bezierCurveTo(-s * 0.8, s * 0.9, -s * 0.1, s * 0.9, 0, s * 0.4);

      return (
        <group>
          <mesh material={goldMaterial} castShadow position={[0, 0.08, 0]}>
            <extrudeGeometry args={[heartShape, { depth: 0.05, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }]} />
          </mesh>
          <mesh material={pictureMaterial} position={[0, 0.08, 0.035]}>
            <shapeGeometry args={[heartShape]} />
          </mesh>
          {/* Pearl accents at heart crown */}
          <mesh position={[0, 0.44, 0.06]} material={pearlMaterial}>
            <sphereGeometry args={[0.028, 10, 10]} />
          </mesh>
        </group>
      );
    }

    // Default: Small Rectangular Baroque Frame
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    return (
      <group>
        {/* Top bar */}
        <mesh position={[0, halfH, 0]} material={frameLacquerMat} castShadow>
          <boxGeometry args={[width + frameThickness * 2, frameThickness, borderDepth]} />
        </mesh>
        {/* Bottom bar */}
        <mesh position={[0, -halfH, 0]} material={frameLacquerMat} castShadow>
          <boxGeometry args={[width + frameThickness * 2, frameThickness, borderDepth]} />
        </mesh>
        {/* Left bar */}
        <mesh position={[-halfW, 0, 0]} material={frameLacquerMat} castShadow>
          <boxGeometry args={[frameThickness, height, borderDepth]} />
        </mesh>
        {/* Right bar */}
        <mesh position={[halfW, 0, 0]} material={frameLacquerMat} castShadow>
          <boxGeometry args={[frameThickness, height, borderDepth]} />
        </mesh>

        {/* Rose Gold Inner Beading */}
        <mesh position={[0, halfH - 0.03, 0.02]} material={goldMaterial}>
          <boxGeometry args={[width, 0.02, 0.02]} />
        </mesh>
        <mesh position={[0, -halfH + 0.03, 0.02]} material={goldMaterial}>
          <boxGeometry args={[width, 0.02, 0.02]} />
        </mesh>

        {/* 4 Corner Rosettes with Pearls and Pink Petals */}
        {[
          [-halfW, halfH],
          [halfW, halfH],
          [-halfW, -halfH],
          [halfW, -halfH]
        ].map(([cx, cy], idx) => (
          <group key={idx} position={[cx, cy, 0.02]}>
            <mesh material={goldMaterial}>
              <sphereGeometry args={[0.05, 10, 10]} scale={[1, 1, 0.4]} />
            </mesh>
            <mesh position={[0, 0, 0.015]} material={roseMat}>
              <sphereGeometry args={[0.025, 8, 8]} />
            </mesh>
            <mesh position={[0, 0, 0.025]} material={pearlMaterial}>
              <sphereGeometry args={[0.015, 8, 8]} />
            </mesh>
          </group>
        ))}

        {/* Picture Canvas */}
        <mesh position={[0, 0, -0.008]} material={pictureMaterial} castShadow>
          <planeGeometry args={[width, height]} />
        </mesh>
      </group>
    );
  };

  const placardY = -height * 0.5 - 0.2;

  return (
    <group
      ref={groupRef}
      position={[x, y, 0.08]}
      scale={[scale, scale, scale]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => {
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelectFrame(frameData);
      }}
    >
      {/* 3D Dainty Frame and Photo */}
      {renderFrameGeometry()}

      {/* Dainty Museum Placard */}
      <group position={[0, placardY, 0.02]}>
        <mesh material={placardMat} castShadow>
          <boxGeometry args={[0.7, 0.19, 0.015]} />
        </mesh>
      </group>
    </group>
  );
}
