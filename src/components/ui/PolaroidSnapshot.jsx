import React, { useState } from 'react';
import { X, Download, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PolaroidSnapshot({
  isOpen,
  onClose,
  museumTitle = "The Grand Museum of Us",
  friend1Name = "Gauri",
  friend2Name = "Vani",
}) {
  if (!isOpen) return null;

  const [snapshotUrl, setSnapshotUrl] = useState(() => {
    // Capture the WebGL canvas
    const canvas = document.querySelector('canvas');
    if (canvas) {
      try {
        return canvas.toDataURL('image/png');
      } catch (err) {
        console.warn('Canvas export error:', err);
        return null;
      }
    }
    return null;
  });

  const handleDownload = () => {
    if (!snapshotUrl) return;
    const a = document.createElement('a');
    a.href = snapshotUrl;
    a.download = `museum-of-us-birthday-${Date.now()}.png`;
    a.click();

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FF69B4', '#E8A598', '#FFF0F3', '#F3D299']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/20 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Transparent Glass Card */}
      <div className="relative z-10 max-w-md w-full bg-white/35 backdrop-blur-2xl border border-white/60 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/40 hover:bg-white/70 text-berry-rose rounded-full border border-white/50 transition-all hover:scale-110 shadow-md backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-cinzel font-bold text-berry-rose mb-1">
          Birthday Keepsake Polaroid
        </h3>
        <p className="text-xs text-berry-rose/75 font-serif mb-6">
          A timeless souvenir of Gauri's 3D Birthday Museum
        </p>

        {/* Vintage Polaroid Card Frame */}
        <div className="bg-white/95 p-4 pb-6 rounded-2xl shadow-xl border-4 border-white w-full max-w-sm flex flex-col items-center">
          <div className="w-full aspect-[4/3] bg-strawberry-cream/40 rounded-xl overflow-hidden border border-rose-gold/30 mb-4 flex items-center justify-center">
            {snapshotUrl ? (
              <img src={snapshotUrl} alt="Museum snapshot" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-berry-rose font-serif">Exhibition View</span>
            )}
          </div>

          <div className="text-center space-y-1">
            <h4 className="font-script text-2xl text-berry-rose font-bold">
              {friend1Name} & {friend2Name} 🎂
            </h4>
            <p className="text-[10px] font-cinzel text-berry-rose/80 tracking-widest uppercase font-semibold">
              {museumTitle} • Birthday Edition
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 w-full flex items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-white/60 to-pastel-pink/60 text-berry-rose font-cinzel font-bold text-sm rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all border border-white/60 backdrop-blur-md"
          >
            <Download className="w-4 h-4 text-rose-gold-dark" />
            <span>Download Keepsake</span>
          </button>
        </div>
      </div>
    </div>
  );
}
