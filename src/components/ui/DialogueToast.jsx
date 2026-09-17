import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';

export default function DialogueToast({ dialogue, onClose }) {
  if (!dialogue) return null;

  const isGauri = dialogue.name?.toLowerCase().includes('gauri');

  return (
    <div className="fixed top-6 inset-x-0 mx-auto max-w-lg w-[92%] z-50 animate-fadeIn pointer-events-auto">
      <div className="bg-black/40 backdrop-blur-xl border border-white/25 p-4 sm:p-5 rounded-2xl shadow-2xl flex items-start justify-between gap-3 text-warm-white">
        <div className="flex items-start gap-3.5 flex-1">
          {/* Avatar Icon Badge */}
          <div className="w-10 h-10 rounded-full border border-white/30 bg-black/30 flex items-center justify-center text-lg flex-shrink-0">
            {isGauri ? '🤍' : '🖤'}
          </div>

          {/* Dialogue Text */}
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-cinzel font-bold text-warm-white flex items-center gap-1.5">
                {dialogue.name}
                <span className="text-[11px] font-sans font-normal text-pink-panther/90">
                  ({dialogue.role || (isGauri ? 'The one in white' : 'The one in black')})
                </span>
              </h4>
            </div>

            <p className="text-sm font-serif italic text-warm-white/95 leading-relaxed">
              "{dialogue.quote}"
            </p>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="p-1.5 text-warm-white/60 hover:text-warm-white rounded-lg hover:bg-white/10 transition-colors"
          title="Close dialogue"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
