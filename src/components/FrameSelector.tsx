'use client';

import { motion } from 'framer-motion';
import { Frame } from '@/types';
import { frames, getFramesByCategory } from '@/lib/frames';
import { usePhotoBoothStore } from '@/store/usePhotoBoothStore';
import { useState } from 'react';

const categories: Array<{ id: Frame['category']; name: string; emoji: string }> = [
  { id: 'gen-z', name: 'Gen Z Aesthetic', emoji: '✨' },
  { id: 'pop-icons', name: 'Pop Icons', emoji: '🎤' },
  { id: 'seasonal', name: 'Seasonal', emoji: '🎀' },
  { id: 'classic', name: 'Classic', emoji: '⚪' },
];

export default function FrameSelector() {
  const { setSelectedFrame, setCurrentStep, layout } = usePhotoBoothStore();
  const [selectedCategory, setSelectedCategory] = useState<Frame['category'] | 'all'>('all');

  const displayFrames = selectedCategory === 'all' 
    ? frames 
    : getFramesByCategory(selectedCategory);

  const handleSelectFrame = (frame: Frame) => {
    setSelectedFrame(frame);
    setCurrentStep('capture');
  };

  // Get theme-specific styling
  const getThemeStyle = (category: Frame['category']) => {
    switch (category) {
      case 'gen-z':
        return {
          border: 'border-2 border-purple-300',
          accent: '✨',
          gradient: 'from-purple-100 to-pink-100',
        };
      case 'pop-icons':
        return {
          border: 'border-2 border-yellow-300',
          accent: '⭐',
          gradient: 'from-yellow-100 to-pink-100',
        };
      case 'seasonal':
        return {
          border: 'border-2 border-red-300',
          accent: '🎀',
          gradient: 'from-red-100 to-pink-100',
        };
      default:
        return {
          border: 'border-2 border-gray-300',
          accent: '',
          gradient: 'from-gray-50 to-gray-100',
        };
    }
  };

  // Render photo strip preview based on selected layout
  const renderPhotoStripPreview = (frame: Frame) => {
    // Default to 3-strip if no layout selected
    const currentLayout = layout || '3-strip';
    const themeStyle = getThemeStyle(frame.category);
    
    if (currentLayout === '3-strip' || currentLayout === '4-strip') {
      const photoCount = currentLayout === '3-strip' ? 3 : 4;
      return (
        <div className={`aspect-[2/3] bg-gradient-to-br ${themeStyle.gradient} rounded-xl p-2 relative overflow-hidden ${themeStyle.border}`}>
          {/* Frame border/decorative elements */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
            {frame.category === 'gen-z' && (
              <div className="absolute top-2 text-2xl">🎀</div>
            )}
            {frame.category === 'pop-icons' && (
              <div className="absolute top-2 text-2xl">🎤</div>
            )}
          </div>
          {/* Photo strip layout */}
          <div className={`grid ${photoCount === 3 ? 'grid-rows-3' : 'grid-rows-4'} gap-1.5 h-full relative z-10`}>
            {Array.from({ length: photoCount }).map((_, i) => (
              <div key={i} className="bg-white/95 rounded-lg shadow-sm flex items-center justify-center relative overflow-hidden">
                {/* Photo placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-2xl opacity-50">📸</span>
                </div>
                {/* Theme accent */}
                {themeStyle.accent && (
                  <span className="absolute top-1 right-1 text-sm">{themeStyle.accent}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // 4-collage or 2x2-grid
      return (
        <div className={`aspect-square bg-gradient-to-br ${themeStyle.gradient} rounded-xl p-2 relative overflow-hidden ${themeStyle.border}`}>
          {/* Frame border/decorative elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            {frame.category === 'gen-z' && (
              <div className="text-xl">✨</div>
            )}
            {frame.category === 'pop-icons' && (
              <div className="text-xl">⭐</div>
            )}
          </div>
          {/* Photo grid layout */}
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5 h-full relative z-10">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white/95 rounded-lg shadow-sm flex items-center justify-center relative overflow-hidden">
                {/* Photo placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-sm opacity-50">📸</span>
                </div>
                {/* Theme accent */}
                {themeStyle.accent && (
                  <span className="absolute top-0.5 right-0.5 text-xs">{themeStyle.accent}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen gradient-pastel p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Pick Your Frame
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Choose a style that matches your vibe
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-white text-purple-600 shadow-lg'
                : 'bg-white/50 text-gray-600 hover:bg-white/80'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/50 text-gray-600 hover:bg-white/80'
              }`}
            >
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        {/* Frame Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayFrames.map((frame, index) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectFrame(frame)}
              className="bg-white rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-all relative"
            >
              {frame.premium && (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] px-2 py-1 rounded-full font-semibold tracking-wide uppercase z-10">
                  🌟 Limited Edition
                </div>
              )}
              {/* Photo Strip Preview */}
              <div className="mb-3">
                {renderPhotoStripPreview(frame)}
              </div>
              <h3 className="font-semibold text-sm text-center">{frame.name}</h3>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentStep('layout')}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to Layout
          </button>
        </div>
      </div>
    </div>
  );
}

