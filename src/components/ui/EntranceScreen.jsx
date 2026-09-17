import React from 'react';
import { DoorOpen, Sparkles, Volume2, VolumeX, Palette, Cake, Heart } from 'lucide-react';

export default function EntranceScreen({
  title = "The Grand Museum of Us",
  subtitle = "A Birthday Retrospective of Everlasting Friendship & Shared Adventures",
  onEnter,
  audioPlaying,
  onToggleAudio,
  onOpenStudio
}) {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10 z-20">
      {/* Top Header Plaque */}
      <div className="w-full flex justify-between items-start pointer-events-auto">
        <div className="bg-white/35 backdrop-blur-xl border border-white/60 px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-berry-rose">
          <div className="w-2.5 h-2.5 rounded-full bg-pastel-pink animate-ping" />
          <span className="text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase text-berry-rose">
            🎂 Birthday Edition • Admission Open 🎈
          </span>
        </div>

        {/* Quick Audio & Settings */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleAudio}
            className="p-3 bg-white/35 hover:bg-white/60 backdrop-blur-xl border border-white/60 rounded-full text-berry-rose transition-all shadow-xl hover:scale-105 active:scale-95"
            title={audioPlaying ? "Mute Birthday Soundtrack" : "Play Ambient Soundtrack"}
          >
            {audioPlaying ? <Volume2 className="w-5 h-5 text-rose-gold-dark animate-pulse" /> : <VolumeX className="w-5 h-5 text-berry-rose/70" />}
          </button>
          <button
            onClick={onOpenStudio}
            className="p-3 bg-white/35 hover:bg-white/60 backdrop-blur-xl border border-white/60 rounded-full text-berry-rose transition-all shadow-xl hover:scale-105 active:scale-95"
            title="Curator Studio (Personalize Photos & Theme)"
          >
            <Palette className="w-5 h-5 text-rose-gold-dark" />
          </button>
        </div>
      </div>

      {/* Main Entrance Transparent Crystal Glass Card */}
      <div className="max-w-2xl mx-auto w-full text-center pointer-events-auto bg-white/35 backdrop-blur-2xl border border-white/60 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden my-auto">
        {/* Decorative Rose Gold Corner Accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-rose-gold/60" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-rose-gold/60" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-rose-gold/60" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-rose-gold/60" />

        {/* Arch Monogram / Emblem */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/50 backdrop-blur-md border-2 border-white/70 text-rose-gold-dark mb-4 shadow-md">
          <Cake className="w-8 h-8 animate-bounce" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-berry-rose tracking-wide mb-3 leading-tight drop-shadow-sm">
          {title}
        </h1>

        <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-rose-gold/70 to-transparent mx-auto mb-4" />

        <p className="text-sm sm:text-base text-berry-rose font-serif italic max-w-lg mx-auto mb-8 leading-relaxed font-medium">
          "{subtitle}"
        </p>

        {/* Enter Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="group relative px-8 py-4 bg-gradient-to-r from-white/70 via-pastel-pink/70 to-white/70 backdrop-blur-md text-berry-rose font-cinzel font-bold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 border border-white/70"
          >
            <DoorOpen className="w-6 h-6 transition-transform group-hover:rotate-12 text-berry-rose" />
            <span>Open Doors & Enter 🎂</span>
            <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={onOpenStudio}
            className="px-6 py-4 bg-white/40 hover:bg-white/70 backdrop-blur-md border border-white/60 text-berry-rose font-cinzel font-bold text-sm sm:text-base rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md"
          >
            <Palette className="w-4 h-4 text-rose-gold-dark" />
            <span>Curator Studio</span>
          </button>
        </div>

        <p className="text-xs text-berry-rose/80 mt-6 font-sans font-medium">
          💡 Drag cursor to look around in 360° • Click photo frames to inspect • Click Gauri & Vani to talk 🥳
        </p>
      </div>

      {/* Bottom Footer Attribution */}
      <div className="w-full text-center text-xs text-berry-rose/90 font-serif font-semibold pointer-events-auto drop-shadow-sm">
        ✦ Made with love for Gauri • Happy Birthday! ✦
      </div>
    </div>
  );
}

