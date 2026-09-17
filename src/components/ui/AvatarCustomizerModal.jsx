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
    { name: 'Cream / Off-White', hex: '#fbf5e6' },
    { name: 'Pastel Purple / Lavender', hex: '#c8b6e2' },
    { name: 'Dusty Merlot', hex: '#62202f' },
    { name: 'Pink Panther', hex: '#f5d0c6' },
    { name: 'Classic Black', hex: '#181818' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Glass Card */}
      <div className="relative z-10 max-w-2xl w-full bg-black/45 backdrop-blur-2xl border-2 border-gold-antique/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gold-antique/30 bg-black/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black/30 rounded-xl border border-gold-antique/50 text-pink-panther shadow-gold-glow">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-warm-white">
                Mini Barbie Avatar Studio
              </h2>
              <p className="text-xs text-pink-panther font-serif">
                Customize Gauri (in white) & Vani (in black)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-black/40 hover:bg-black/60 text-warm-white rounded-full border border-gold-antique/40 transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gauri & Vani Selector Tabs */}
        <div className="p-4 border-b border-gold-antique/20 bg-black/20 flex gap-3">
          <button
            onClick={() => setActiveDoll('gauri')}
            className={`flex-1 py-3 px-4 rounded-2xl border text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
              activeDoll === 'gauri'
                ? 'bg-gradient-to-r from-warm-white to-warm-white-dark text-dusty-merlot-deep border-gold-antique shadow-gold-glow'
                : 'bg-black/30 text-warm-white/80 border-gold-antique/30 hover:bg-black/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-gold-rich" />
            <span>Gauri (In White)</span>
          </button>

          <button
            onClick={() => setActiveDoll('vani')}
            className={`flex-1 py-3 px-4 rounded-2xl border text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
              activeDoll === 'vani'
                ? 'bg-gradient-to-r from-dusty-merlot via-dusty-merlot-dark to-black text-pink-panther border-gold-antique shadow-gold-glow'
                : 'bg-black/30 text-warm-white/80 border-gold-antique/30 hover:bg-black/50'
            }`}
          >
            <Heart className="w-4 h-4 text-pink-panther" />
            <span>Vani (In Black)</span>
          </button>
        </div>

        {/* Customizer Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Name & Quote */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-cinzel text-pink-panther mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={currentDoll.name || ''}
                onChange={(e) => handleUpdate('name', e.target.value)}
                className="w-full bg-black/35 border border-gold-antique/40 rounded-xl px-4 py-2 text-sm text-warm-white focus:outline-none focus:border-gold-antique"
              />
            </div>
            <div>
              <label className="block text-xs font-cinzel text-pink-panther mb-1.5">
                Quote & Vibe
              </label>
              <input
                type="text"
                value={currentDoll.quote || ''}
                onChange={(e) => handleUpdate('quote', e.target.value)}
                className="w-full bg-black/35 border border-gold-antique/40 rounded-xl px-4 py-2 text-sm text-warm-white focus:outline-none focus:border-gold-antique"
              />
            </div>
          </div>

          {/* Top Style */}
          <div>
            <label className="block text-xs font-cinzel text-pink-panther mb-2">
              Top Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {topStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleUpdate('topStyle', style.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-cinzel transition-all ${
                    currentDoll.topStyle === style.id
                      ? 'bg-black/60 border-gold-antique text-warm-white font-bold shadow-sm'
                      : 'bg-black/25 border-gold-antique/30 text-warm-white/70 hover:border-gold-antique/60'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottoms Style */}
          <div>
            <label className="block text-xs font-cinzel text-pink-panther mb-2">
              Bottoms Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {bottomStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleUpdate('bottomStyle', style.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-cinzel transition-all ${
                    currentDoll.bottomStyle === style.id
                      ? 'bg-black/60 border-gold-antique text-warm-white font-bold shadow-sm'
                      : 'bg-black/25 border-gold-antique/30 text-warm-white/70 hover:border-gold-antique/60'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Crocs Footwear Color */}
          <div>
            <label className="block text-xs font-cinzel text-pink-panther mb-2">
              Crocs Color (Footwear)
            </label>
            <div className="flex flex-wrap gap-3">
              {crocsColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleUpdate('shoesColor', color.hex)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                    currentDoll.shoesColor === color.hex
                      ? 'border-gold-antique scale-110 shadow-gold-glow'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {currentDoll.shoesColor === color.hex && (
                    <Check className="w-4 h-4 text-dusty-merlot drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Accessories & Features */}
          <div className="pt-2 border-t border-gold-antique/20 flex flex-wrap items-center gap-4">
            {/* Glasses Toggle for Vani */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentDoll.hasGlasses || false}
                onChange={(e) => handleUpdate('hasGlasses', e.target.checked)}
                className="w-4 h-4 accent-gold-antique rounded"
              />
              <span className="text-xs font-cinzel text-warm-white flex items-center gap-1.5">
                <Glasses className="w-4 h-4 text-pink-panther" />
                Chic Clear Glasses 👓
              </span>
            </label>

            {/* Bag Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentDoll.hasBag !== false}
                onChange={(e) => handleUpdate('hasBag', e.target.checked)}
                className="w-4 h-4 accent-gold-antique rounded"
              />
              <span className="text-xs font-cinzel text-warm-white flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-gold-light" />
                Black Shoulder Bag
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gold-antique/30 bg-black/30 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-warm-white/80 hover:text-warm-white font-cinzel text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold-rich to-gold-antique text-dark-oak font-cinzel font-bold text-sm rounded-xl shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            {showSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{showSaved ? 'Saved!' : 'Save Avatars'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
