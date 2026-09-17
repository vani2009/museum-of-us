import React from 'react';
import { X, Heart, Sparkles, Cake, PartyPopper } from 'lucide-react';

export default function DialogueToast({ dialogue, onClose }) {
  if (!dialogue) return null;

  const isGauri = dialogue.name?.toLowerCase().includes('gauri');

  return (
    <div className="fixed top-6 inset-x-0 mx-auto max-w-lg w-[92%] z-50 animate-fadeIn pointer-events-auto">
      <div className="bg-white/35 backdrop-blur-2xl border border-white/60 p-4 sm:p-5 rounded-3xl shadow-2xl flex items-start justify-between gap-3 text-berry-rose">
        <div className="flex items-start gap-3.5 flex-1">
          {/* Avatar Icon Badge */}
          <div className="w-11 h-11 rounded-2xl border border-white/50 bg-white/40 flex items-center justify-center text-xl flex-shrink-0 shadow-sm backdrop-blur-md">
            {isGauri ? '🎂' : '🥳'}
          </div>

          {/* Dialogue Text */}
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-cinzel font-bold text-berry-rose flex items-center gap-1.5">
                {dialogue.name}
                <span className="text-[11px] font-sans font-semibold text-rose-gold-dark">
                  ({dialogue.role || (isGauri ? 'Birthday Girl' : 'Soul Sister')})
                </span>
              </h4>
            </div>

            <p className="text-sm font-serif italic text-berry-rose font-medium leading-relaxed">
              "{dialogue.quote}"
            </p>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="p-1.5 text-berry-rose/70 hover:text-berry-rose rounded-xl hover:bg-white/40 transition-colors"
          title="Close dialogue"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

