import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Faceted Origami Paper Star Geometry
function PaperStar({ position = [0, 0, 0], scale = 0.14, color = '#E8A598', seed = 0 }) {
  const starRef = useRef();

  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const points = 5;
    const outerRadius = 1.0;
    const innerRadius = 0.45;

    for (let i = 0; i < points * 2; i++) {
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.35,
    metalness: 0.65,
    side: THREE.DoubleSide,
  }), [color]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + seed;
    if (starRef.current) {
      starRef.current.rotation.y = Math.sin(t * 1.2) * 0.4;
      starRef.current.rotation.z = Math.cos(t * 1.5) * 0.15;
    }
  });

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Hanging delicate string */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 1.2, 8]} />
        <meshBasicMaterial color="#E8A598" />
      </mesh>

      {/* 3D Extruded Paper Star */}
      <mesh
        ref={starRef}
        material={material}
        castShadow
      >
        <extrudeGeometry
          args={[starShape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 2 }]}
        />
      </mesh>
    </group>
  );
}

// Single Wall Pennant & Star Garland Strand
function WallGarlandStrand({
  start = [-4.8, 4.3, 0],
  end = [4.8, 4.3, 0],
  sag = 0.65,
  flagCount = 14,
  includeStars = true
}) {
  const flags = useMemo(() => {
    const list = [];
    const colors = ['#FFB6C1', '#FFFDFE', '#E8D5EA', '#F3D299', '#D8F3DC', '#F8A5C2'];

    for (let i = 0; i <= flagCount; i++) {
      const t = i / flagCount;
      // Parabolic catenary sag curve
      const x = start[0] + (end[0] - start[0]) * t;
      const z = start[2] + (end[2] - start[2]) * t;
      const y = start[1] - 4 * sag * t * (1 - t);

      // Tangent angle
      const slope = -4 * sag * (1 - 2 * t);
      const angleZ = Math.atan(slope);

      list.push({
        position: [x, y, z],
        rotation: [0, 0, angleZ],
        color: colors[i % colors.length],
        scale: 0.22,
        seed: i * 0.8
      });
    }
    return list;
  }, [start, end, sag, flagCount]);

  // Triangular Pennant Flag Geometry
  const flagShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, 0);
    shape.lineTo(0.5, 0);
    shape.lineTo(0, -1.0);
    shape.closePath();
    return shape;
  }, []);

  const flagGeo = useMemo(() => new THREE.ShapeGeometry(flagShape), [flagShape]);

  // Star garland positions (staggered below pennants)
  const starList = useMemo(() => {
    if (!includeStars) return [];
    const stars = [];
    const starColors = ['#F3D299', '#E8A598', '#FFB6C1', '#FFFDFE'];
    const count = 7;
    for (let i = 1; i < count; i++) {
      const t = i / count;
      const x = start[0] + (end[0] - start[0]) * t;
      const z = start[2] + (end[2] - start[2]) * t;
      const y = start[1] - 0.4 - 4 * (sag * 0.8) * t * (1 - t);
      stars.push({
        position: [x, y, z],
        color: starColors[i % starColors.length],
        seed: i * 1.5,
        scale: 0.13 + (i % 2) * 0.04
      });
    }
    return stars;
  }, [start, end, sag, includeStars]);

  return (
    <group>
      {/* Pennant Flags */}
      {flags.map((flag, idx) => (
        <group key={`flag-${idx}`} position={flag.position} rotation={flag.rotation} scale={[flag.scale, flag.scale, flag.scale]}>
          <mesh geometry={flagGeo} castShadow>
            <meshStandardMaterial
              color={flag.color}
              roughness={0.4}
              metalness={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Top hanging fold seam */}
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[1.04, 0.04, 0.02]} />
            <meshStandardMaterial color="#E8A598" metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Hanging Shimmering 3D Paper Stars */}
      {starList.map((star, idx) => (
        <PaperStar
          key={`star-${idx}`}
          position={star.position}
          color={star.color}
          seed={star.seed}
          scale={star.scale}
        />
      ))}
    </group>
  );
}

// All 4 Walls Birthday Garlands (Back, Left, Right, Front)
export default function BirthdayGarlands() {
  const roomW = 10;
  const roomD = 10;
  const h = 4.35;

  return (
    <group name="BirthdayGarlands">
      {/* Back Wall (z = -4.85) */}
      <group position={[0, 0, -roomD / 2 + 0.15]}>
        <WallGarlandStrand
          start={[-4.7, h, 0]}
          end={[4.7, h, 0]}
          sag={0.6}
          flagCount={16}
          includeStars={true}
        />
      </group>

      {/* Left Wall (x = -4.85) */}
      <group position={[-roomW / 2 + 0.15, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <WallGarlandStrand
          start={[-4.7, h, 0]}
          end={[4.7, h, 0]}
          sag={0.6}
          flagCount={16}
          includeStars={true}
        />
      </group>

      {/* Right Wall (x = 4.85) */}
      <group position={[roomW / 2 - 0.15, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <WallGarlandStrand
          start={[-4.7, h, 0]}
          end={[4.7, h, 0]}
          sag={0.6}
          flagCount={16}
          includeStars={true}
        />
      </group>

      {/* Front Wall (z = 4.85) */}
      <group position={[0, 0, roomD / 2 - 0.15]} rotation={[0, Math.PI, 0]}>
        <WallGarlandStrand
          start={[-4.7, h, 0]}
          end={[4.7, h, 0]}
          sag={0.5}
          flagCount={14}
          includeStars={true}
        />
      </group>
    </group>
  );
}
