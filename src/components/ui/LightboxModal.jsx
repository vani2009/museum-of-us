import React, { useState } from 'react';
import { X, Heart, MapPin, Calendar, ChevronLeft, ChevronRight, Edit3, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LightboxModal({
  frame,
  allFrames = [],
  onClose,
  onNavigateFrame,
  onEditFrame
}) {
  if (!frame) return null;

  const [likes, setLikes] = useState(frame.likes || 12);
  const [hasLiked, setHasLiked] = useState(false);

  const currentIndex = allFrames.findIndex((f) => f.id === frame.id);
  const prevFrame = currentIndex > 0 ? allFrames[currentIndex - 1] : allFrames[allFrames.length - 1];
  const nextFrame = currentIndex < allFrames.length - 1 ? allFrames[currentIndex + 1] : allFrames[0];

  const handleLike = (e) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#f5d0c6', '#62202f', '#d4af37', '#fbf7e8']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Lightbox Glass Card */}
      <div className="relative z-10 max-w-4xl w-full bg-black/40 backdrop-blur-xl border-2 border-gold-antique/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-warm-white rounded-full border border-gold-antique/40 hover:scale-110 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Artwork Image in Gilded Frame */}
        <div className="md:w-1/2 p-6 sm:p-8 flex items-center justify-center bg-black/30 relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => onNavigateFrame(prevFrame)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-black/80 text-warm-white rounded-full border border-gold-antique/40 transition-all hover:scale-110"
            title="Previous Memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigateFrame(nextFrame)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-black/50 hover:bg-black/80 text-warm-white rounded-full border border-gold-antique/40 transition-all hover:scale-110"
            title="Next Memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Gilded Picture Frame Container */}
          <div className="relative p-3 bg-gradient-to-tr from-gold-rich via-gold-antique to-gold-light rounded-2xl shadow-gold-glow max-w-full">
            <div className="p-1 bg-black/60 rounded-xl">
              <img
                src={frame.image}
                alt={frame.title}
                className="max-h-[360px] md:max-h-[460px] w-auto object-cover rounded-lg shadow-inner"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Museum Placard & Story */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Museum Exhibition Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 bg-black/30 backdrop-blur-sm border border-gold-antique/40 text-pink-panther rounded-full text-xs font-cinzel font-semibold tracking-wider uppercase">
                {frame.id.split('-')[0].toUpperCase()} WALL EXHIBIT
              </span>
              <span className="text-xs text-warm-white/70 font-cinzel">
                Shape: {frame.shape.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-warm-white mb-2 leading-tight drop-shadow">
              {frame.title}
            </h2>

            {/* Date & Location Badges */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-pink-panther mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold-antique" />
                <span>{frame.date}</span>
              </div>
              {frame.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-antique" />
                  <span>{frame.location}</span>
                </div>
              )}
            </div>

            <div className="h-px bg-gradient-to-r from-gold-antique/60 via-gold-antique/20 to-transparent mb-6" />

            {/* Memory Story */}
            <div className="bg-black/30 backdrop-blur-sm border border-gold-antique/30 rounded-2xl p-4 sm:p-5 mb-6">
              <h4 className="text-xs font-cinzel text-gold-light uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Curator's Memory Note
              </h4>
              <p className="text-warm-white font-serif text-base sm:text-lg italic leading-relaxed">
                "{frame.story}"
              </p>
            </div>
          </div>

          {/* Bottom Actions: Like Counter & Edit Button */}
          <div className="pt-4 border-t border-gold-antique/30 flex items-center justify-between gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                hasLiked
                  ? 'bg-pink-panther text-dark-oak border-pink-panther font-bold'
                  : 'bg-black/30 hover:bg-black/50 text-warm-white border-gold-antique/40'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-dark-oak text-dark-oak' : 'text-pink-panther'}`} />
              <span className="text-sm font-cinzel">{likes} Loved</span>
            </button>

            <button
              onClick={() => onEditFrame(frame)}
              className="flex items-center gap-2 px-4 py-2.5 bg-black/40 hover:bg-black/60 border border-gold-antique/50 text-gold-light rounded-xl text-sm font-cinzel transition-all hover:scale-105"
            >
              <Edit3 className="w-4 h-4" />
              <span>Personalize This Photo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
