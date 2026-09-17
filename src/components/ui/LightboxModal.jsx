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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-pink-900/30 backdrop-blur-md animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Lightbox Glass Card */}
      <div className="relative z-10 max-w-4xl w-full bg-white/90 backdrop-blur-2xl border-2 border-rose-gold/60 rounded-3xl overflow-hidden shadow-pink-glow flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-berry-rose rounded-full border border-rose-gold/40 hover:scale-110 transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Artwork Image in Rose Gold Frame */}
        <div className="md:w-1/2 p-6 sm:p-8 flex items-center justify-center bg-strawberry-cream/50 relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => onNavigateFrame(prevFrame)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 hover:bg-white text-berry-rose rounded-full border border-rose-gold/40 transition-all hover:scale-110 shadow-sm"
            title="Previous Memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => onNavigateFrame(nextFrame)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-white/80 hover:bg-white text-berry-rose rounded-full border border-rose-gold/40 transition-all hover:scale-110 shadow-sm"
            title="Next Memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Rose Gold Picture Frame Container */}
          <div className="relative p-3 bg-gradient-to-tr from-rose-gold-rich via-rose-gold-light to-pastel-pink rounded-2xl shadow-rose-glow max-w-full">
            <div className="p-1 bg-white rounded-xl">
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
              <span className="px-3 py-1 bg-strawberry-cream border border-rose-gold/40 text-berry-rose rounded-full text-xs font-cinzel font-bold tracking-wider uppercase">
                {frame.id.split('-')[0].toUpperCase()} WALL EXHIBIT
              </span>
              <span className="text-xs text-rose-gold-rich font-cinzel">
                Shape: {frame.shape.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-berry-rose mb-2 leading-tight">
              {frame.title}
            </h2>

            {/* Date & Location Badges */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-berry-rose/80 mb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-rose-gold-rich" />
                <span>{frame.date}</span>
              </div>
              {frame.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-gold-rich" />
                  <span>{frame.location}</span>
                </div>
              )}
            </div>

            <div className="h-px bg-gradient-to-r from-rose-gold via-rose-gold/20 to-transparent mb-6" />

            {/* Memory Story */}
            <div className="bg-strawberry-cream/70 border border-rose-gold/30 rounded-2xl p-4 sm:p-5 mb-6">
              <h4 className="text-xs font-cinzel text-berry-rose uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-rose-gold-rich" />
                Curator's Memory Note
              </h4>
              <p className="text-berry-rose font-serif text-base sm:text-lg italic leading-relaxed">
                "{frame.story}"
              </p>
            </div>
          </div>

          {/* Bottom Actions: Like Counter & Edit Button */}
          <div className="pt-4 border-t border-rose-gold/30 flex items-center justify-between gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${
                hasLiked
                  ? 'bg-pastel-pink text-berry-rose border-rose-gold font-bold shadow-sm'
                  : 'bg-white/80 hover:bg-white text-berry-rose border-rose-gold/40 shadow-sm'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-berry-rose text-berry-rose' : 'text-frosted-rose'}`} />
              <span className="text-sm font-cinzel">{likes} Loved</span>
            </button>

            <button
              onClick={() => onEditFrame(frame)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pastel-pink to-rose-gold-light border border-rose-gold/50 text-berry-rose rounded-xl text-sm font-cinzel font-bold transition-all hover:scale-105 shadow-sm"
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
