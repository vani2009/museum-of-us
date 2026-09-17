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
    a.download = `museum-of-us-${Date.now()}.png`;
    a.click();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f5d0c6', '#62202f', '#d4af37', '#fbf7e8']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Glass Card */}
      <div className="relative z-10 max-w-md w-full bg-black/45 backdrop-blur-2xl border-2 border-gold-antique/60 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-warm-white rounded-full border border-gold-antique/40 transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-cinzel font-bold text-warm-white mb-1 drop-shadow">
          Museum Keepsake Polaroid
        </h3>
        <p className="text-xs text-pink-panther font-serif mb-6">
          A timeless souvenir of your 3D gallery
        </p>

        {/* Vintage Polaroid Card Frame */}
        <div className="bg-warm-white p-4 pb-6 rounded-2xl shadow-2xl border-4 border-warm-white-dark w-full max-w-sm flex flex-col items-center">
          <div className="w-full aspect-[4/3] bg-black/80 rounded-xl overflow-hidden border border-gold-antique/40 mb-4 flex items-center justify-center">
            {snapshotUrl ? (
              <img src={snapshotUrl} alt="Museum snapshot" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-warm-white font-serif">Exhibition View</span>
            )}
          </div>

          <div className="text-center space-y-1">
            <h4 className="font-script text-2xl text-dark-oak">
              {friend1Name} & {friend2Name}
            </h4>
            <p className="text-[10px] font-cinzel text-dark-oak/80 tracking-widest uppercase">
              {museumTitle} • Permanent Collection
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 w-full flex items-center justify-center gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gold-rich to-gold-antique text-dark-oak font-cinzel font-bold text-sm rounded-xl shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Keepsake</span>
          </button>
        </div>
      </div>
    </div>
  );
}
