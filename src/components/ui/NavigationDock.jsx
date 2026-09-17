import React from 'react';
import {
  Compass,
  DoorClosed,
  Palette,
  Users,
  Camera,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Layers,
  Sparkles
} from 'lucide-react';

export default function NavigationDock({
  focusedWall,
  onSelectWall,
  onExitToEntrance,
  onOpenStudio,
  onOpenLegoCustomizer,
  onTakeSnapshot,
  lightingMode,
  onToggleLighting,
  audioPlaying,
  onToggleAudio,
}) {
  const walls = [
    { id: 'all', label: 'Gallery 360°', icon: Compass },
    { id: 'left', label: 'Left: Adventures', icon: Compass },
    { id: 'back', label: 'Back: Milestones', icon: Sparkles },
    { id: 'right', label: 'Right: Inside Jokes', icon: Layers },
    { id: 'front', label: 'Entrance Doors', icon: DoorClosed },
    { id: 'center', label: 'Gauri & Vani', icon: Users },
  ];

  return (
    <div className="absolute bottom-5 inset-x-0 mx-auto max-w-5xl px-4 pointer-events-none z-20 flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Wall Navigation Dock - Completely Transparent Minimalist Glass */}
      <div className="pointer-events-auto bg-black/20 backdrop-blur-md border border-white/20 p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto max-w-full">
        {walls.map((w) => {
          const Icon = w.icon;
          const isActive = focusedWall === w.id;
          return (
            <button
              key={w.id}
              onClick={() => onSelectWall(w.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-cinzel transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isActive
                  ? 'bg-white/20 text-warm-white border border-white/30 font-semibold'
                  : 'text-warm-white/70 hover:text-warm-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{w.label}</span>
            </button>
          );
        })}
      </div>

      {/* Action Tools & Controls - Transparent Minimalist Glass */}
      <div className="pointer-events-auto bg-black/20 backdrop-blur-md border border-white/20 p-1.5 rounded-2xl flex items-center gap-1">
        {/* Curator Studio */}
        <button
          onClick={onOpenStudio}
          className="p-2.5 rounded-xl text-warm-white/80 hover:text-warm-white hover:bg-white/10 transition-all flex items-center gap-1 text-xs font-cinzel"
          title="Curator Studio: Upload Photos & Custom Colors"
        >
          <Palette className="w-4 h-4" />
          <span className="hidden md:inline">Curator Studio</span>
        </button>

        {/* Gauri & Vani Mini Barbie Customizer */}
        <button
          onClick={onOpenLegoCustomizer}
          className="p-2.5 rounded-xl text-warm-white/80 hover:text-warm-white hover:bg-white/10 transition-all flex items-center gap-1 text-xs font-cinzel"
          title="Customize Gauri & Vani Mini Barbie Avatars"
        >
          <Users className="w-4 h-4" />
          <span className="hidden md:inline">Gauri & Vani</span>
        </button>

        {/* Polaroid Snapshot */}
        <button
          onClick={onTakeSnapshot}
          className="p-2.5 rounded-xl text-warm-white/80 hover:text-warm-white hover:bg-white/10 transition-all"
          title="Take a Polaroid Keepsake"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Lighting Mode */}
        <button
          onClick={onToggleLighting}
          className="p-2.5 rounded-xl text-warm-white/80 hover:text-warm-white hover:bg-white/10 transition-all"
          title={lightingMode === 'cozy' ? "Switch to Bright Mode" : "Switch to Cozy Mode"}
        >
          {lightingMode === 'cozy' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleAudio}
          className="p-2.5 rounded-xl text-warm-white/80 hover:text-warm-white hover:bg-white/10 transition-all"
          title={audioPlaying ? "Mute Music" : "Play Music"}
        >
          {audioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4 text-warm-white/50" />}
        </button>

        {/* Exit to Gates */}
        <button
          onClick={onExitToEntrance}
          className="p-2.5 rounded-xl text-warm-white/70 hover:text-warm-white hover:bg-white/10 transition-all"
          title="Return to Entrance Gates"
        >
          <DoorClosed className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
