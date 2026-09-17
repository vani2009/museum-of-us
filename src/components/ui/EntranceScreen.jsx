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
        <div className="bg-white/70 backdrop-blur-xl border border-rose-gold/50 px-5 py-2.5 rounded-2xl shadow-lg flex items-center gap-2.5 text-berry-rose">
          <div className="w-2.5 h-2.5 rounded-full bg-pastel-pink animate-ping" />
          <span className="text-xs sm:text-sm font-cinzel font-bold tracking-wider uppercase text-berry-rose">
            🎂 Birthday Edition • Admission Open 🎈
          </span>
        </div>

        {/* Quick Audio & Settings */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleAudio}
            className="p-3 bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-rose-gold/50 rounded-full text-berry-rose transition-all shadow-md hover:scale-105 active:scale-95"
            title={audioPlaying ? "Mute Birthday Soundtrack" : "Play Ambient Soundtrack"}
          >
            {audioPlaying ? <Volume2 className="w-5 h-5 text-rose-gold-rich animate-pulse" /> : <VolumeX className="w-5 h-5 text-berry-rose/60" />}
          </button>
          <button
            onClick={onOpenStudio}
            className="p-3 bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-rose-gold/50 rounded-full text-berry-rose transition-all shadow-md hover:scale-105 active:scale-95"
            title="Curator Studio (Personalize Photos & Theme)"
          >
            <Palette className="w-5 h-5 text-frosted-rose" />
          </button>
        </div>
      </div>

      {/* Main Entrance Frosted Strawberry Glass Card */}
      <div className="max-w-2xl mx-auto w-full text-center pointer-events-auto bg-white/75 backdrop-blur-2xl border-2 border-rose-gold/60 p-8 sm:p-12 rounded-3xl shadow-pink-glow relative overflow-hidden my-auto">
        {/* Decorative Rose Gold Corner Accents */}
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-rose-gold" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-rose-gold" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-rose-gold" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-rose-gold" />

        {/* Arch Monogram / Emblem */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-strawberry-cream/90 backdrop-blur-sm border-2 border-rose-gold text-rose-gold-rich mb-4 shadow-rose-glow">
          <Cake className="w-8 h-8 animate-bounce" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-berry-rose tracking-wide mb-3 leading-tight drop-shadow-sm">
          {title}
        </h1>

        <div className="h-0.5 w-40 bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mb-4" />

        <p className="text-sm sm:text-base text-berry-rose/90 font-serif italic max-w-lg mx-auto mb-8 leading-relaxed">
          "{subtitle}"
        </p>

        {/* Enter Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onEnter}
            className="group relative px-8 py-4 bg-gradient-to-r from-pastel-pink via-rose-gold-light to-pastel-pink text-berry-rose font-cinzel font-bold text-base sm:text-lg rounded-2xl shadow-rose-glow hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 border border-rose-gold/40"
          >
            <DoorOpen className="w-6 h-6 transition-transform group-hover:rotate-12 text-berry-rose" />
            <span>Open Doors & Enter 🎂</span>
            <div className="absolute inset-0 rounded-2xl bg-white/25 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={onOpenStudio}
            className="px-6 py-4 bg-white/80 hover:bg-white backdrop-blur-sm border border-rose-gold/50 text-berry-rose font-cinzel font-semibold text-sm sm:text-base rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-sm"
          >
            <Palette className="w-4 h-4 text-frosted-rose" />
            <span>Curator Studio</span>
          </button>
        </div>

        <p className="text-xs text-berry-rose/70 mt-6 font-sans">
          💡 Drag cursor to look around in 360° • Click photo frames to inspect • Click Gauri & Vani to talk 🥳
        </p>
      </div>

      {/* Bottom Footer Attribution */}
      <div className="w-full text-center text-xs text-berry-rose/80 font-serif pointer-events-auto">
        ✦ Made with love for Gauri • Happy Birthday! ✦
      </div>
    </div>
  );
}

