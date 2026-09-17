import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import GrandArchedEntrance from './GrandArchedEntrance';
import GalleryRoom from './GalleryRoom';
import WallFrames from './WallFrames';
import MiniBarbieAvatars from './MiniBarbieAvatars';
import MuseumDecor from './MuseumDecor';
import MuseumLighting from './MuseumLighting';
import FloatingMotes from './FloatingMotes';

// Silky Smooth Spacious Camera Rig Controller
function CameraRig({
  viewMode,
  focusedWall,
  focusedFrame,
  isDoorsOpen,
  onEnterAnimationComplete
}) {
  const { camera } = useThree();
  const controlsRef = useRef();

  const isTransitioning = useRef(false);
  const targetPos = useRef(new THREE.Vector3(0, 2.2, 9.8));
  const targetLookAt = useRef(new THREE.Vector3(0, 2.4, 5.0));

  useEffect(() => {
    isTransitioning.current = true;

    if (viewMode === 'ENTRANCE') {
      targetPos.current.set(0, 2.2, 9.8);
      targetLookAt.current.set(0, 2.4, 5.0);
    } else if (viewMode === 'ENTERING') {
      // Smoothly glide through the open doors into the gallery
      targetPos.current.set(0, 2.4, 4.5);
      targetLookAt.current.set(0, 1.8, -1.0);
      const timer = setTimeout(() => {
        onEnterAnimationComplete();
        isTransitioning.current = false;
      }, 2200);
      return () => clearTimeout(timer);
    } else if (viewMode === 'GALLERY') {
      if (focusedWall === 'front') {
        // Spacious view of Front Wall
        targetPos.current.set(0, 2.2, -0.6);
        targetLookAt.current.set(0, 2.2, 5.0);
      } else if (focusedWall === 'left') {
        // Spacious view of Left Wall
        targetPos.current.set(0.6, 2.2, 0);
        targetLookAt.current.set(-5.0, 2.2, 0);
      } else if (focusedWall === 'back') {
        // Spacious view of Back Wall (showing all 5 golden frames)
        targetPos.current.set(0, 2.2, 0.6);
        targetLookAt.current.set(0, 2.2, -5.0);
      } else if (focusedWall === 'right') {
        // Spacious view of Right Wall
        targetPos.current.set(-0.6, 2.2, 0);
        targetLookAt.current.set(5.0, 2.2, 0);
      } else if (focusedWall === 'center') {
        // Aesthetic portrait view of Gauri & Vani
        targetPos.current.set(0, 0.9, 1.8);
        targetLookAt.current.set(0, 0.45, 0.35);
      } else {
        // Complete spacious gallery overview
        targetPos.current.set(0, 2.6, 5.2);
        targetLookAt.current.set(0, 1.6, -0.5);
      }
    } else if (viewMode === 'INSPECT_FRAME' && focusedFrame) {
      const roomD = 10;
      const roomW = 10;
      const wall = focusedFrame.id.split('-')[0];
      const fx = focusedFrame.x || 0;
      const fy = focusedFrame.y || 2.2;
      const inspectDistance = 2.6;

      if (wall === 'back') {
        targetPos.current.set(fx, fy, -roomD / 2 + inspectDistance);
        targetLookAt.current.set(fx, fy, -roomD / 2);
      } else if (wall === 'front') {
        targetPos.current.set(fx, fy, roomD / 2 - inspectDistance);
        targetLookAt.current.set(fx, fy, roomD / 2);
      } else if (wall === 'left') {
        targetPos.current.set(-roomW / 2 + inspectDistance, fy, fx);
        targetLookAt.current.set(-roomW / 2, fy, fx);
      } else if (wall === 'right') {
        targetPos.current.set(roomW / 2 - inspectDistance, fy, fx);
        targetLookAt.current.set(roomW / 2, fy, fx);
      }
    } else if (viewMode === 'OVERVIEW') {
      targetPos.current.set(0, 7.5, 4.8);
      targetLookAt.current.set(0, 0, 0);
    }

    const stopTimer = setTimeout(() => {
      isTransitioning.current = false;
    }, 900);
    return () => clearTimeout(stopTimer);
  }, [viewMode, focusedWall, focusedFrame]);

  useFrame((state, delta) => {
    if (isTransitioning.current) {
      const speed = viewMode === 'ENTERING' ? 2.0 : 4.2;
      camera.position.lerp(targetPos.current, speed * delta);

      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, speed * delta);
        controlsRef.current.update();
      } else {
        camera.lookAt(targetLookAt.current);
      }

      if (camera.position.distanceTo(targetPos.current) < 0.05) {
        isTransitioning.current = false;
      }
    } else if (controlsRef.current && (viewMode === 'GALLERY' || viewMode === 'OVERVIEW')) {
      controlsRef.current.update();
    }
  });

  const enableOrbit = viewMode === 'GALLERY' || viewMode === 'OVERVIEW';

  return enableOrbit ? (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      enableDamping={true}
      dampingFactor={0.06}
      rotateSpeed={0.65}
      zoomSpeed={0.8}
      panSpeed={0.5}
      minDistance={0.5}
      maxDistance={12.0}
      maxPolarAngle={Math.PI * 0.52}
      minPolarAngle={0.15}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  ) : null;
}

export default function MuseumScene({
  viewMode = 'ENTRANCE',
  focusedWall = 'all',
  focusedFrame = null,
  isDoorsOpen = false,
  wallMemories,
  avatarData,
  theme,
  lightingMode,
  onDoorClick,
  onSelectFrame,
  onInspectAvatars,
  onEnterAnimationComplete
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2.2, 9.8], fov: 60, near: 0.1, far: 50 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
    >
      <Suspense fallback={null}>
        <CameraRig
          viewMode={viewMode}
          focusedWall={focusedWall}
          focusedFrame={focusedFrame}
          isDoorsOpen={isDoorsOpen}
          onEnterAnimationComplete={onEnterAnimationComplete}
        />

        {/* Lighting Setup */}
        <MuseumLighting mode={lightingMode} />

        {/* Atmospheric Particles */}
        <FloatingMotes count={120} />

        {/* Neoclassical Arched Entrance Portal (Z = 5) */}
        <GrandArchedEntrance
          isOpen={isDoorsOpen}
          onDoorClick={onDoorClick}
        />

        {/* 4-Wall Museum Room */}
        <GalleryRoom
          wallColor={theme.wallColor}
          trimColor={theme.wallTrim}
          carpetColor={theme.carpetColor}
        >
          {/* Wall Picture Frames */}
          <WallFrames
            wallMemories={wallMemories}
            onSelectFrame={onSelectFrame}
            focusedFrameId={focusedFrame?.id}
          />

          {/* Gauri & Vani Mini Barbie Doll Avatars */}
          <MiniBarbieAvatars
            avatarData={avatarData}
            onInspectAvatars={onInspectAvatars}
          />

          {/* Museum Decor: Lemon tree in Delft urn, velvet bench, stanchions */}
          <MuseumDecor />
        </GalleryRoom>
      </Suspense>
    </Canvas>
  );
}
