import React, { useState, useEffect, useMemo } from 'react';
import MuseumScene from './components/canvas/MuseumScene';
import EntranceScreen from './components/ui/EntranceScreen';
import NavigationDock from './components/ui/NavigationDock';
import LightboxModal from './components/ui/LightboxModal';
import CuratorStudioModal from './components/ui/CuratorStudioModal';
import AvatarCustomizerModal from './components/ui/AvatarCustomizerModal';
import PolaroidSnapshot from './components/ui/PolaroidSnapshot';
import DialogueToast from './components/ui/DialogueToast';

import { DEFAULT_WALL_MEMORIES, DEFAULT_AVATARS } from './data/defaultMemories';
import { THEMES } from './data/palette';
import { museumAudio } from './utils/museumAudio';

export default function App() {
  // Navigation & Camera States
  const [viewMode, setViewMode] = useState('ENTRANCE'); // 'ENTRANCE' | 'ENTERING' | 'GALLERY' | 'INSPECT_FRAME' | 'OVERVIEW'
  const [focusedWall, setFocusedWall] = useState('all'); // 'all' | 'front' | 'left' | 'back' | 'right' | 'center'
  const [focusedFrame, setFocusedFrame] = useState(null);
  const [isDoorsOpen, setIsDoorsOpen] = useState(false);

  // Settings & Lighting
  const [lightingMode, setLightingMode] = useState('cozy'); // 'cozy' | 'bright'
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Modals
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isLegoCustomizerOpen, setIsLegoCustomizerOpen] = useState(false);
  const [isSnapshotOpen, setIsSnapshotOpen] = useState(false);
  const [targetFrameForEdit, setTargetFrameForEdit] = useState(null);
  const [activeDialogue, setActiveDialogue] = useState(null);

  // Persistent Exhibition Data
  const [wallMemories, setWallMemories] = useState(() => {
    try {
      const saved = localStorage.getItem('3d_museum_memories');
      return saved ? JSON.parse(saved) : DEFAULT_WALL_MEMORIES;
    } catch {
      return DEFAULT_WALL_MEMORIES;
    }
  });

  const [avatarData, setAvatarData] = useState(() => {
    try {
      const saved = localStorage.getItem('3d_museum_avatars');
      return saved ? JSON.parse(saved) : DEFAULT_AVATARS;
    } catch {
      return DEFAULT_AVATARS;
    }
  });

  const [currentTheme, setCurrentTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('3d_museum_theme');
      return saved ? JSON.parse(saved) : THEMES.merlotLuxe;
    } catch {
      return THEMES.merlotLuxe;
    }
  });

  const [museumMeta, setMuseumMeta] = useState(() => {
    return {
      title: avatarData.museumTitle || "The Grand Museum of Us",
      subtitle: avatarData.subtitle || "An Exhibition of Friendship & Adventures",
    };
  });

  // Flatten all frames for easy prev/next lightbox traversal
  const allFramesList = useMemo(() => {
    const list = [];
    ['front', 'left', 'back', 'right'].forEach((w) => {
      if (wallMemories[w]?.frames) {
        list.push(...wallMemories[w].frames);
      }
    });
    return list;
  }, [wallMemories]);

  // Audio Handler
  const handleToggleAudio = () => {
    const isNowPlaying = museumAudio.toggle();
    setAudioPlaying(isNowPlaying);
  };

  // Enter Exhibition Trigger
  const handleEnterExhibition = () => {
    setIsDoorsOpen(true);
    setViewMode('ENTERING');
    if (!audioPlaying) {
      const isNowPlaying = museumAudio.toggle();
      setAudioPlaying(isNowPlaying);
    }
  };

  const handleEnterComplete = () => {
    setViewMode('GALLERY');
    setFocusedWall('all');
  };

  // Wall Selection
  const handleSelectWall = (wallId) => {
    setFocusedWall(wallId);
    setFocusedFrame(null);
    setViewMode('GALLERY');
  };

  // Frame Inspection
  const handleSelectFrame = (frame) => {
    setFocusedFrame(frame);
    setViewMode('INSPECT_FRAME');
  };

  const handleCloseLightbox = () => {
    setFocusedFrame(null);
    setViewMode('GALLERY');
  };

  const handleInspectAvatars = (dollConfig) => {
    setFocusedWall('center');
    setViewMode('GALLERY');
    if (dollConfig) {
      setActiveDialogue(dollConfig);
    }
  };

  // Exit to Gates
  const handleExitToEntrance = () => {
    setIsDoorsOpen(false);
    setViewMode('ENTRANCE');
    setFocusedWall('all');
    setFocusedFrame(null);
  };

  // Save Handlers
  const handleSaveMemories = (newMemories) => {
    setWallMemories(newMemories);
    try {
      localStorage.setItem('3d_museum_memories', JSON.stringify(newMemories));
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
  };

  const handleSaveAvatarData = (newAvatars) => {
    setAvatarData(newAvatars);
    try {
      localStorage.setItem('3d_museum_avatars', JSON.stringify(newAvatars));
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
  };

  const handleSelectTheme = (newTheme) => {
    setCurrentTheme(newTheme);
    try {
      localStorage.setItem('3d_museum_theme', JSON.stringify(newTheme));
    } catch (e) {
      console.warn('localStorage save failed:', e);
    }
  };

  const handleSaveMuseumMeta = (newMeta) => {
    setMuseumMeta(newMeta);
    setAvatarData((prev) => ({
      ...prev,
      museumTitle: newMeta.title,
      subtitle: newMeta.subtitle,
    }));
  };

  const handleResetDefaults = () => {
    setWallMemories(DEFAULT_WALL_MEMORIES);
    setAvatarData(DEFAULT_AVATARS);
    setCurrentTheme(THEMES.merlotLuxe);
    setMuseumMeta({
      title: DEFAULT_AVATARS.museumTitle,
      subtitle: DEFAULT_AVATARS.subtitle,
    });
    localStorage.removeItem('3d_museum_memories');
    localStorage.removeItem('3d_museum_avatars');
    localStorage.removeItem('3d_museum_theme');
    setIsStudioOpen(false);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-dusty-mauve-deep select-none">
      {/* 3D WebGL Canvas Scene */}
      <MuseumScene
        viewMode={viewMode}
        focusedWall={focusedWall}
        focusedFrame={focusedFrame}
        isDoorsOpen={isDoorsOpen}
        wallMemories={wallMemories}
        avatarData={avatarData}
        theme={currentTheme}
        lightingMode={lightingMode}
        onDoorClick={viewMode === 'ENTRANCE' ? handleEnterExhibition : handleExitToEntrance}
        onSelectFrame={handleSelectFrame}
        onInspectAvatars={handleInspectAvatars}
        onEnterAnimationComplete={handleEnterComplete}
      />

      {/* Opening Entrance Gate UI (Only when outside) */}
      {viewMode === 'ENTRANCE' && (
        <EntranceScreen
          title={museumMeta.title}
          subtitle={museumMeta.subtitle}
          onEnter={handleEnterExhibition}
          audioPlaying={audioPlaying}
          onToggleAudio={handleToggleAudio}
          onOpenStudio={() => setIsStudioOpen(true)}
        />
      )}

      {/* Gallery Navigation Dock (When inside) */}
      {viewMode !== 'ENTRANCE' && (
        <NavigationDock
          focusedWall={focusedWall}
          onSelectWall={handleSelectWall}
          onExitToEntrance={handleExitToEntrance}
          onOpenStudio={() => {
            setTargetFrameForEdit(null);
            setIsStudioOpen(true);
          }}
          onOpenLegoCustomizer={() => setIsLegoCustomizerOpen(true)}
          onTakeSnapshot={() => setIsSnapshotOpen(true)}
          lightingMode={lightingMode}
          onToggleLighting={() => setLightingMode((prev) => (prev === 'cozy' ? 'bright' : 'cozy'))}
          audioPlaying={audioPlaying}
          onToggleAudio={handleToggleAudio}
        />
      )}

      {/* Artwork Inspection Lightbox Modal */}
      {focusedFrame && (
        <LightboxModal
          frame={focusedFrame}
          allFrames={allFramesList}
          onClose={handleCloseLightbox}
          onNavigateFrame={(f) => setFocusedFrame(f)}
          onEditFrame={(f) => {
            setTargetFrameForEdit(f);
            setIsStudioOpen(true);
          }}
        />
      )}

      {/* Curator Studio (Photo Uploads & Theme Customization) */}
      <CuratorStudioModal
        isOpen={isStudioOpen}
        onClose={() => {
          setIsStudioOpen(false);
          setTargetFrameForEdit(null);
        }}
        wallMemories={wallMemories}
        onSaveMemories={handleSaveMemories}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        museumMeta={museumMeta}
        onSaveMuseumMeta={handleSaveMuseumMeta}
        onResetDefaults={handleResetDefaults}
        initialTargetFrame={targetFrameForEdit}
      />

      {/* Gauri & Vani Mini Barbie Avatars Customizer */}
      <AvatarCustomizerModal
        isOpen={isLegoCustomizerOpen}
        onClose={() => setIsLegoCustomizerOpen(false)}
        avatarData={avatarData}
        onSaveAvatarData={handleSaveAvatarData}
      />

      {/* Keepsake Polaroid Snapshot */}
      <PolaroidSnapshot
        isOpen={isSnapshotOpen}
        onClose={() => setIsSnapshotOpen(false)}
        museumTitle={museumMeta.title}
        friend1Name={avatarData.gauri?.name || avatarData.friend1?.name || "Gauri"}
        friend2Name={avatarData.vani?.name || avatarData.friend2?.name || "Vani"}
      />

      {/* Gauri & Vani Dialogue Box Toast (Crystal-clear and visible) */}
      <DialogueToast
        dialogue={activeDialogue}
        onClose={() => setActiveDialogue(null)}
      />
    </main>
  );
}
