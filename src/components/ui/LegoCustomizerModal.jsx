import React, { useState } from 'react';
import { X, Users, Sparkles, Heart, Save, Check } from 'lucide-react';

export default function LegoCustomizerModal({
  isOpen,
  onClose,
  avatarData,
  onSaveAvatarData,
}) {
  if (!isOpen) return null;

  const [activeFriend, setActiveFriend] = useState('friend1');
  const [localData, setLocalData] = useState(JSON.parse(JSON.stringify(avatarData)));
  const [showSaved, setShowSaved] = useState(false);

  const currentFriend = localData[activeFriend];

  const handleUpdate = (field, value) => {
    setLocalData((prev) => ({
      ...prev,
      [activeFriend]: {
        ...prev[activeFriend],
        [field]: value
      }
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

  const hairStyles = [
    { id: 'wavy-long', label: 'Wavy Long' },
    { id: 'short-side', label: 'Classic Short' },
    { id: 'curly', label: 'Curly Volume' },
    { id: 'bun', label: 'Top Knot Bun' },
  ];

  const hairColors = [
    { name: 'Auburn Ginger', hex: '#d97724' },
    { name: 'Dark Brown', hex: '#4a2810' },
    { name: 'Warm Blonde', hex: '#e6c35c' },
    { name: 'Jet Black', hex: '#1a1a1a' },
    { name: 'Blush Pink', hex: '#f5a5b5' },
    { name: 'Silver Slate', hex: '#d4d4d8' },
  ];

  const shirtColors = [
    { name: 'Forest Green', hex: '#2d6a4f' },
    { name: 'Dusty Merlot', hex: '#62202f' },
    { name: 'Pink Panther', hex: '#f5d0c6' },
    { name: 'Navy Blue', hex: '#1d3557' },
    { name: 'Warm White', hex: '#fbf7e8' },
    { name: 'Antique Gold', hex: '#d4af37' },
  ];

  const pantsColors = [
    { name: 'Deep Navy', hex: '#1d2d44' },
    { name: 'Charcoal Black', hex: '#2b2d42' },
    { name: 'Merlot Velvet', hex: '#42131e' },
    { name: 'Classic Denim', hex: '#457b9d' },
    { name: 'Warm Khaki', hex: '#c5a880' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 max-w-2xl w-full bg-dusty-merlot-deep/95 border-2 border-gold-antique/70 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gold-antique/40 bg-dusty-merlot-dark/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-dusty-merlot rounded-xl border border-gold-antique/50 text-gold-light shadow-gold-glow">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-warm-white">
                LEGO Avatar Studio
              </h2>
              <p className="text-xs text-pink-panther font-serif">
                Customize 3D minifigures of you and your best friend
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-dusty-merlot/80 hover:bg-dusty-merlot text-warm-white rounded-full border border-gold-antique/40 transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Friend 1 / Friend 2 Selector */}
        <div className="p-4 border-b border-gold-antique/20 bg-dusty-merlot-dark/40 flex gap-3">
          <button
            onClick={() => setActiveFriend('friend1')}
            className={`flex-1 py-3 px-4 rounded-2xl border text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
              activeFriend === 'friend1'
                ? 'bg-gradient-to-r from-gold-rich to-gold-antique text-dusty-merlot-deep border-gold-antique shadow-gold-glow'
                : 'bg-dusty-merlot/60 text-warm-white/80 border-gold-antique/30 hover:bg-dusty-merlot'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{localData.friend1.name || 'Friend 1'} (Left)</span>
          </button>

          <button
            onClick={() => setActiveFriend('friend2')}
            className={`flex-1 py-3 px-4 rounded-2xl border text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
              activeFriend === 'friend2'
                ? 'bg-gradient-to-r from-gold-rich to-gold-antique text-dusty-merlot-deep border-gold-antique shadow-gold-glow'
                : 'bg-dusty-merlot/60 text-warm-white/80 border-gold-antique/30 hover:bg-dusty-merlot'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>{localData.friend2.name || 'Friend 2'} (Right)</span>
          </button>
        </div>

        {/* Customizer Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Name & Quote */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-cinzel text-pink-panther mb-1.5">
                Avatar Name
              </label>
              <input
                type="text"
                value={currentFriend.name}
                onChange={(e) => handleUpdate('name', e.target.value)}
                className="w-full bg-dusty-merlot-dark border border-gold-antique/40 rounded-xl px-4 py-2 text-sm text-warm-white focus:outline-none focus:border-gold-antique"
              />
            </div>
            <div>
              <label className="block text-xs font-cinzel text-pink-panther mb-1.5">
                Quote / Speech Bubble
              </label>
              <input
                type="text"
                value={currentFriend.quote}
                onChange={(e) => handleUpdate('quote', e.target.value)}
                className="w-full bg-dusty-merlot-dark border border-gold-antique/40 rounded-xl px-4 py-2 text-sm text-warm-white focus:outline-none focus:border-gold-antique"
              />
            </div>
          </div>

          {/* Hairstyle Selection */}
          <div>
            <label className="block text-xs font-cinzel text-pink-panther mb-2">
              Hairstyle Shape
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {hairStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleUpdate('hairStyle', style.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-cinzel transition-all ${
                    currentFriend.hairStyle === style.id
                      ? 'bg-dusty-merlot border-gold-antique text-warm-white font-bold shadow-sm'
                      : 'bg-dusty-merlot-dark/50 border-gold-antique/30 text-warm-white/70 hover:border-gold-antique/60'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hair Color Selection */}
          <div>
            <label className="block text-xs font-cinzel text-pink-panther mb-2">
              Hair Color
            </label>
            <div className="flex flex-wrap gap-3">
              {hairColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleUpdate('hairColor', color.hex)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                    currentFriend.hairColor === color.hex
                      ? 'border-gold-antique scale-110 shadow-gold-glow'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {currentFriend.hairColor === color.hex && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Torso / Shirt Color Selection */}
          <div>
            <label className="block text-xs font-cinzel text-pink-panther mb-2">
              Torso / Outfit Color
            </label>
            <div className="flex flex-wrap gap-3">
              {shirtColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleUpdate('shirtColor', color.hex)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                    currentFriend.shirtColor === color.hex
                      ? 'border-gold-antique scale-110 shadow-gold-glow'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {currentFriend.shirtColor === color.hex && (
                    <Check className="w-4 h-4 text-dusty-merlot-deep drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pants Color Selection */}
          <div>
            <label className="block text-xs font-cinzel text-pink-panther mb-2">
              Pants Color
            </label>
            <div className="flex flex-wrap gap-3">
              {pantsColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleUpdate('pantsColor', color.hex)}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                    currentFriend.pantsColor === color.hex
                      ? 'border-gold-antique scale-110 shadow-gold-glow'
                      : 'border-white/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {currentFriend.pantsColor === color.hex && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gold-antique/40 bg-dusty-merlot-dark/80 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-warm-white/80 hover:text-warm-white font-cinzel text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gold-rich to-gold-antique text-dusty-merlot-deep font-cinzel font-bold text-sm rounded-xl shadow-gold-glow hover:scale-105 active:scale-95 transition-all"
          >
            {showSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{showSaved ? 'Saved!' : 'Save Avatars'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
