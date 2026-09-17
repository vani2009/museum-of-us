import React, { useState } from 'react';
import { X, Upload, Palette, Image as ImageIcon, Save, RotateCcw, Check, Sparkles, Layers } from 'lucide-react';
import { THEMES } from '../../data/palette';

export default function CuratorStudioModal({
  isOpen,
  onClose,
  wallMemories,
  onSaveMemories,
  currentTheme,
  onSelectTheme,
  museumMeta,
  onSaveMuseumMeta,
  onResetDefaults,
  initialTargetFrame = null
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(
    initialTargetFrame ? initialTargetFrame.id.split('-')[0] : 'left'
  );
  const [localMemories, setLocalMemories] = useState(JSON.parse(JSON.stringify(wallMemories)));
  const [localMeta, setLocalMeta] = useState({ ...museumMeta });
  const [showSavedToast, setShowSavedToast] = useState(false);

  const walls = [
    { id: 'left', label: 'Left Wall (Adventures)' },
    { id: 'back', label: 'Back Wall (Milestones)' },
    { id: 'right', label: 'Right Wall (Inside Jokes)' },
    { id: 'theme', label: '🎨 Aesthetics & Palette' },
  ];

  // Handle frame updates
  const handleFrameChange = (wallId, frameId, field, value) => {
    setLocalMemories((prev) => {
      const updated = { ...prev };
      const frameIdx = updated[wallId].frames.findIndex((f) => f.id === frameId);
      if (frameIdx !== -1) {
        updated[wallId].frames[frameIdx] = {
          ...updated[wallId].frames[frameIdx],
          [field]: value
        };
      }
      return updated;
    });
  };

  // Handle custom image file upload
  const handleImageUpload = (wallId, frameId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        handleFrameChange(wallId, frameId, 'image', uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSaveMemories(localMemories);
    onSaveMuseumMeta(localMeta);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Studio Modal - Transparent Glass */}
      <div className="relative z-10 max-w-5xl w-full bg-black/45 backdrop-blur-2xl border-2 border-gold-antique/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gold-antique/30 bg-black/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black/30 rounded-xl border border-gold-antique/50 text-gold-light shadow-gold-glow">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-warm-white">
                Curator Studio
              </h2>
              <p className="text-xs text-pink-panther font-serif">
                Upload your photos, write memory stories, and choose your color palette
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

        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-gold-antique/20 flex gap-2 overflow-x-auto bg-black/20">
          {walls.map((w) => (
            <button
              key={w.id}
              onClick={() => setActiveTab(w.id)}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-cinzel font-medium transition-all whitespace-nowrap ${
                activeTab === w.id
                  ? 'bg-black/60 border-t-2 border-x-2 border-gold-antique text-warm-white font-bold'
                  : 'text-warm-white/70 hover:text-warm-white hover:bg-black/30'
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'theme' ? (
            /* Theme & Aesthetic Tab */
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-cinzel font-bold text-warm-white mb-2">
                  Museum Exhibition Title & Subtitle
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-cinzel text-pink-panther mb-1.5">
                      Exhibition Title
                    </label>
                    <input
                      type="text"
                      value={localMeta.title}
                      onChange={(e) => setLocalMeta({ ...localMeta, title: e.target.value })}
                      className="w-full bg-black/35 border border-gold-antique/40 rounded-xl px-4 py-2.5 text-warm-white focus:outline-none focus:border-gold-antique"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-cinzel text-pink-panther mb-1.5">
                      Subtitle / Quote
                    </label>
                    <input
                      type="text"
                      value={localMeta.subtitle}
                      onChange={(e) => setLocalMeta({ ...localMeta, subtitle: e.target.value })}
                      className="w-full bg-black/35 border border-gold-antique/40 rounded-xl px-4 py-2.5 text-warm-white focus:outline-none focus:border-gold-antique"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-cinzel font-bold text-warm-white mb-3">
                  Color Palette & Wall Material Presets
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.values(THEMES).map((themeOption) => {
                    const isSelected = currentTheme.id === themeOption.id;
                    return (
                      <div
                        key={themeOption.id}
                        onClick={() => onSelectTheme(themeOption)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-gold-antique bg-black/55 shadow-gold-glow'
                            : 'border-gold-antique/30 bg-black/25 hover:border-gold-antique/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-cinzel font-bold text-warm-white text-sm sm:text-base">
                            {themeOption.name}
                          </h4>
                          {isSelected && <Check className="w-5 h-5 text-gold-light" />}
                        </div>
                        <p className="text-xs text-pink-panther/90 font-serif mb-4">
                          {themeOption.description}
                        </p>
                        {/* Swatches */}
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full border border-gold-antique/50 shadow-sm"
                            style={{ backgroundColor: themeOption.wallColor }}
                            title="Wall Velvet"
                          />
                          <div
                            className="w-6 h-6 rounded-full border border-gold-antique/50 shadow-sm"
                            style={{ backgroundColor: themeOption.wallTrim }}
                            title="Moldings"
                          />
                          <div
                            className="w-6 h-6 rounded-full border border-gold-antique/50 shadow-sm"
                            style={{ backgroundColor: themeOption.carpetColor }}
                            title="Runner Carpet"
                          />
                          <div
                            className="w-6 h-6 rounded-full border border-gold-antique/50 shadow-sm"
                            style={{ backgroundColor: themeOption.frameColor }}
                            title="Baroque Frame Gold"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Wall Frames Editor Tab */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gold-antique/20">
                <div>
                  <h3 className="text-lg font-cinzel font-bold text-warm-white">
                    {localMemories[activeTab]?.title}
                  </h3>
                  <p className="text-xs text-pink-panther font-serif">
                    {localMemories[activeTab]?.description}
                  </p>
                </div>
                <span className="text-xs font-cinzel text-gold-light bg-black/40 px-3 py-1.5 rounded-full border border-gold-antique/40">
                  {localMemories[activeTab]?.frames.length} Artworks
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {localMemories[activeTab]?.frames.map((frame, idx) => (
                  <div
                    key={frame.id}
                    className="bg-black/35 border border-gold-antique/30 rounded-2xl p-5 space-y-4 hover:border-gold-antique transition-all"
                  >
                    {/* Frame Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-gold-antique">
                        Frame #{idx + 1} ({frame.id})
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Shape Selector */}
                        <select
                          value={frame.shape}
                          onChange={(e) => handleFrameChange(activeTab, frame.id, 'shape', e.target.value)}
                          className="bg-black/50 border border-gold-antique/40 text-xs text-warm-white rounded-lg px-2 py-1 font-cinzel focus:outline-none"
                        >
                          <option value="rectangle">Rectangle Frame</option>
                          <option value="oval">Oval Baroque</option>
                          <option value="heart">Romantic Heart</option>
                        </select>
                      </div>
                    </div>

                    {/* Image Upload & Preview */}
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-gold-antique/60 bg-black/40 flex-shrink-0 relative group">
                        <img
                          src={frame.image}
                          alt={frame.title}
                          className="w-full h-full object-cover"
                        />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                          <Upload className="w-5 h-5 text-gold-light" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(activeTab, frame.id, e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="flex-1 space-y-2">
                        <label className="block text-xs font-cinzel text-pink-panther">
                          Upload Custom Photo
                        </label>
                        <label className="inline-flex items-center gap-2 px-3 py-2 bg-black/40 hover:bg-black/60 border border-gold-antique/40 rounded-xl text-xs font-cinzel text-warm-white cursor-pointer transition-all">
                          <Upload className="w-3.5 h-3.5 text-gold-light" />
                          <span>Choose File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(activeTab, frame.id, e)}
                            className="hidden"
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="Or paste image URL"
                          value={frame.image.startsWith('data:') ? 'Custom uploaded file' : frame.image}
                          onChange={(e) => handleFrameChange(activeTab, frame.id, 'image', e.target.value)}
                          className="w-full bg-black/35 border border-gold-antique/30 rounded-lg px-2.5 py-1 text-xs text-warm-white/80 focus:outline-none focus:border-gold-antique"
                        />
                      </div>
                    </div>

                    {/* Text Inputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-cinzel text-pink-panther mb-1">
                          Artwork Title
                        </label>
                        <input
                          type="text"
                          value={frame.title}
                          onChange={(e) => handleFrameChange(activeTab, frame.id, 'title', e.target.value)}
                          className="w-full bg-black/35 border border-gold-antique/30 rounded-lg px-3 py-1.5 text-xs text-warm-white focus:outline-none focus:border-gold-antique"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-cinzel text-pink-panther mb-1">
                          Date / Occasion
                        </label>
                        <input
                          type="text"
                          value={frame.date}
                          onChange={(e) => handleFrameChange(activeTab, frame.id, 'date', e.target.value)}
                          className="w-full bg-black/35 border border-gold-antique/30 rounded-lg px-3 py-1.5 text-xs text-warm-white focus:outline-none focus:border-gold-antique"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel text-pink-panther mb-1">
                        Location / Tag
                      </label>
                      <input
                        type="text"
                        value={frame.location || ''}
                        onChange={(e) => handleFrameChange(activeTab, frame.id, 'location', e.target.value)}
                        className="w-full bg-black/35 border border-gold-antique/30 rounded-lg px-3 py-1.5 text-xs text-warm-white focus:outline-none focus:border-gold-antique"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel text-pink-panther mb-1">
                        Curator's Memory Story
                      </label>
                      <textarea
                        rows={2}
                        value={frame.story}
                        onChange={(e) => handleFrameChange(activeTab, frame.id, 'story', e.target.value)}
                        className="w-full bg-black/35 border border-gold-antique/30 rounded-lg px-3 py-1.5 text-xs text-warm-white font-serif focus:outline-none focus:border-gold-antique"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="p-5 border-t border-gold-antique/30 bg-black/30 flex items-center justify-between">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-2 px-4 py-2.5 bg-black/40 hover:bg-black/60 text-warm-white/70 hover:text-warm-white border border-gold-antique/30 rounded-xl text-xs font-cinzel transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <div className="flex items-center gap-3">
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
              {showSavedToast ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{showSavedToast ? 'Saved!' : 'Save Exhibition'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
