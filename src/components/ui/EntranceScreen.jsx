import React from 'react';
import { DoorOpen, Sparkles, Volume2, VolumeX, Palette } from 'lucide-react';

export default function EntranceScreen({
  title = "The Grand Museum of Us",
  subtitle = "An Exhibition of Everlasting Friendship & Shared Adventures",
  onEnter,
  audioPlaying,
  onToggleAudio,
  onOpenStudio
}) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 z-20">
      {/* Top Header Plaque */}
      <div className="w-full flex justify-between items-start pointer-events-auto">
        <div className="bg-black/25 backdrop-blur-md border border-gold-antique/50 px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-gold-antique animate-pulse" />
          <span className="text-xs sm:text-sm font-cinzel text-warm-white tracking-widest uppercase drop-shadow">
            Special Exhibition • Admission Open
          </span>
        </div>

        {/* Quick Audio & Settings */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAudio}
            className="p-3 bg-black/25 hover:bg-black/45 backdrop-blur-md border border-gold-antique/40 hover:border-gold-antique rounded-full text-warm-white transition-all shadow-lg hover:scale-105 active:scale-95"
            title={audioPlaying ? "Mute Background Soundtrack" : "Play Ambient Soundtrack"}
          >
            {audioPlaying ? <Volume2 className="w-5 h-5 text-gold-light animate-pulse" /> : <VolumeX className="w-5 h-5 text-warm-white/70" />}
          </button>
          <button
            onClick={onOpenStudio}
            className="p-3 bg-black/25 hover:bg-black/45 backdrop-blur-md border border-gold-antique/40 hover:border-gold-antique rounded-full text-warm-white transition-all shadow-lg hover:scale-105 active:scale-95"
            title="Curator Studio (Personalize Photos & Theme)"
          >
            <Palette className="w-5 h-5 text-pink-panther" />
          </button>
        </div>
      </div>

      {/* Main Entrance Transparent Glass Card */}
      <div className="max-w-2xl mx-auto w-full text-center pointer-events-auto bg-black/25 backdrop-blur-md border border-gold-antique/60 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden my-auto">
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-gold-antique" />
        <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold-antique" />
        <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold-antique" />
        <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-gold-antique" />

        {/* Arch Monogram / Emblem */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/35 backdrop-blur-sm border-2 border-gold-antique text-gold-light mb-5 shadow-gold-glow">
          <Sparkles className="w-8 h-8" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-warm-white tracking-wider mb-3 leading-tight drop-shadow-md">
          {title}
        </h1>

        <div className="h-0.5 w-36 bg-gradient-to-r from-transparent via-gold-antique to-transparent mx-auto mb-4" />

        <p className="text-sm sm:text-base text-pink-panther font-serif italic max-w-lg mx-auto mb-8 leading-relaxed drop-shadow">
          "{subtitle}"
        </p>

        {/* Enter Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="group relative px-8 py-4 bg-gradient-to-r from-gold-rich via-gold-antique to-gold-light text-dark-oak font-cinzel font-bold text-base sm:text-lg rounded-xl shadow-gold-glow hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <DoorOpen className="w-6 h-6 transition-transform group-hover:rotate-12" />
            <span>Open Doors & Enter</span>
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={onOpenStudio}
            className="px-6 py-4 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-gold-antique/50 text-warm-white font-cinzel text-sm sm:text-base rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-pink-panther" />
            <span>Personalize Photos</span>
          </button>
        </div>

        <p className="text-xs text-warm-white/80 mt-6 font-sans drop-shadow">
          💡 Drag cursor to look in 360° • Click any photo frame to inspect • Click Gauri & Vani to talk
        </p>
      </div>

      {/* Bottom Footer Attribution */}
      <div className="w-full text-center text-xs text-warm-white/75 font-serif pointer-events-auto drop-shadow">
        Curated with love in Warm White, Pink Panther & Dusty Merlot
      </div>
    </div>
  );
}
