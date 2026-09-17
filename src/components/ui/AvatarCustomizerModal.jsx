import React, { useState } from 'react';
import { X, Sparkles, Heart, Save, Check, Glasses, ShoppingBag } from 'lucide-react';

export default function AvatarCustomizerModal({
  isOpen,
  onClose,
  avatarData,
  onSaveAvatarData,
}) {
  if (!isOpen) return null;

  const [activeDoll, setActiveDoll] = useState('gauri');
  const [localData, setLocalData] = useState(() => {
    const data = JSON.parse(JSON.stringify(avatarData));
    if (!data.gauri) data.gauri = data.friend1 || {};
    if (!data.vani) data.vani = data.friend2 || {};
    return data;
  });
  const [showSaved, setShowSaved] = useState(false);

  const currentDoll = localData[activeDoll] || {};

  const handleUpdate = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [activeDoll]: {
        ...prev[activeDoll],
        [field]: value
      },
      friend1: activeDoll === 'gauri' ? { ...prev.gauri, [field]: value } : prev.gauri,
      friend2: activeDoll === 'vani' ? { ...prev.vani, [field]: value } : prev.vani,
    }));
  };

  const handleSave = () => {
    onSaveAvatarData(localData);
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
      onClose();
    }, 800);
  };

  const topStyles = [
    { id: 'longsleeve-crop', label: 'Long-Sleeve Crop (Gauri)' },
    { id: 'tank-crop', label: 'Sleeveless Tank Crop (Vani)' },
  ];

  const bottomStyles = [
    { id: 'denim-shorts', label: 'Distressed Denim Shorts (Gauri)' },
    { id: 'baggy-jeans', label: 'High-Waist Baggy Jeans (Vani)' },
  ];

  const crocsColors = [
    { name: 'Marshmallow Cream', hex: '#FFFDFE' },
    { name: 'Pastel Lilac / Lavender', hex: '#E2D4F0' },
    { name: 'Bubblegum Pink', hex: '#FFB6C1' },
    { name: 'Rose Gold Shimmer', hex: '#E8A598' },
    { name: 'Classic Charcoal Black', hex: '#2A2426' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-berry-rose/40 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Frosted Strawberry Glass Card */}
      <div className="relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-2xl border-2 border-rose-gold/60 rounded-3xl overflow-hidden shadow-strawberry flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-rose-gold/30 bg-strawberry-cream/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/80 rounded-xl border border-rose-gold/60 text-berry-rose shadow-soft-pink">
              <Sparkles className="w-6 h-6 text-rose-gold" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-berry-rose">
                Mini Barbie Birthday Studio
              </h2>
              <p className="text-xs text-berry-rose/70 font-serif">
                Customize Gauri (in white) & Vani (in black) with party hats & accessories
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-white/60 hover:bg-white/90 text-berry-rose rounded-full border border-rose-gold/40 transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gauri & Vani Selector Tabs */}
        <div className="p-4 border-b border-rose-gold/20 bg-strawberry-cream/30 flex gap-3">
          <button
            onClick={() => setActiveDoll('gauri')}
            className={`flex-1 py-3 px-4 rounded-2xl border text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
              activeDoll === 'gauri'
                ? 'bg-gradient-to-r from-white to-strawberry-cream text-berry-rose border-rose-gold shadow-soft-pink'
                : 'bg-white/40 text-berry-rose/60 border-rose-gold/30 hover:bg-white/70'
            }`}
          >
            <Sparkles className="w-4 h-4 text-rose-gold" />
            <span>Gauri (Birthday Girl • In White)</span>
          </button>

          <button
            onClick={() => setActiveDoll('vani')}
            className={`flex-1 py-3 px-4 rounded-2xl border text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
              activeDoll === 'vani'
                ? 'bg-gradient-to-r from-white to-lavender-mist/40 text-berry-rose border-rose-gold shadow-soft-pink'
                : 'bg-white/40 text-berry-rose/60 border-rose-gold/30 hover:bg-white/70'
            }`}
          >
            <Heart className="w-4 h-4 text-pastel-pink-dark" />
            <span>Vani (In Black & Lilac)</span>
          </button>
        </div>

        {/* Customizer Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Name & Quote */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-cinzel text-berry-rose font-bold mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={currentDoll.name || ''}
                onChange={(e) => handleUpdate('name', e.target.value)}
                className="w-full bg-white/70 border border-rose-gold/40 rounded-xl px-4 py-2 text-sm text-berry-rose focus:outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-cinzel text-berry-rose font-bold mb-1.5">
                Quote & Birthday Vibe
              </label>
              <input
                type="text"
                value={currentDoll.quote || ''}
                onChange={(e) => handleUpdate('quote', e.target.value)}
                className="w-full bg-white/70 border border-rose-gold/40 rounded-xl px-4 py-2 text-sm text-berry-rose focus:outline-none focus:border-rose-gold focus:ring-1 focus:ring-rose-gold"
              />
            </div>
          </div>

          {/* Top Style */}
          <div>
            <label className="block text-xs font-cinzel text-berry-rose font-bold mb-2">
              Top Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {topStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleUpdate('topStyle', style.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-cinzel transition-all ${
                    currentDoll.topStyle === style.id
                      ? 'bg-rose-gold text-white font-bold border-rose-gold shadow-sm'
                      : 'bg-white/60 border-rose-gold/30 text-berry-rose/80 hover:border-rose-gold/60'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottoms Style */}
          <div>
            <label className="block text-xs font-cinzel text-berry-rose font-bold mb-2">
              Bottoms Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {bottomStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleUpdate('bottomStyle', style.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-cinzel transition-all ${
                    currentDoll.bottomStyle === style.id
                      ? 'bg-rose-gold text-white font-bold border-rose-gold shadow-sm'
                      : 'bg-white/60 border-rose-gold/30 text-berry-rose/80 hover:border-rose-gold/60'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crocs Footwear Color */}
          <div>
            <label className="block text-xs font-cinzel text-berry-rose font-bold mb-2">
              Crocs Color (Footwear)
            </label>
            <div className="flex flex-wrap gap-3">
              {crocsColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleUpdate('shoesColor', color.hex)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                    currentDoll.shoesColor === color.hex
                      ? 'border-berry-rose scale-110 shadow-soft-pink'
                      : 'border-rose-gold/30 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {currentDoll.shoesColor === color.hex && (
                    <Check className="w-4 h-4 text-berry-rose drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Accessories & Features */}
          <div className="pt-2 border-t border-rose-gold/20 flex flex-wrap items-center gap-4">
            {/* Glasses Toggle for Vani */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentDoll.hasGlasses || false}
                onChange={(e) => handleUpdate('hasGlasses', e.target.checked)}
                className="w-4 h-4 accent-rose-gold rounded"
              />
              <span className="text-xs font-cinzel text-berry-rose flex items-center gap-1.5 font-semibold">
                <Glasses className="w-4 h-4 text-rose-gold" />
                Chic Clear Glasses 👓
              </span>
            </label>

            {/* Bag Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentDoll.hasBag !== false}
                onChange={(e) => handleUpdate('hasBag', e.target.checked)}
                className="w-4 h-4 accent-rose-gold rounded"
              />
              <span className="text-xs font-cinzel text-berry-rose flex items-center gap-1.5 font-semibold">
                <ShoppingBag className="w-4 h-4 text-rose-gold" />
                Black Shoulder Bag
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-rose-gold/30 bg-strawberry-cream/40 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-berry-rose/70 hover:text-berry-rose font-cinzel text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-gold to-pastel-pink text-berry-rose font-cinzel font-bold text-sm rounded-xl shadow-soft-pink hover:scale-105 active:scale-95 transition-all border border-rose-gold/40"
          >
            {showSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{showSaved ? 'Saved!' : 'Save Avatars'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
