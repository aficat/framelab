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
  const { setSelectedFrame, setCurrentStep } = usePhotoBoothStore();
  const [selectedCategory, setSelectedCategory] = useState<Frame['category'] | 'all'>('all');

  const displayFrames = selectedCategory === 'all' 
    ? frames 
    : getFramesByCategory(selectedCategory);

  const handleSelectFrame = (frame: Frame) => {
    setSelectedFrame(frame);
    setCurrentStep('capture');
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
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  ⭐ Premium
                </div>
              )}
              <div className="aspect-square bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-xl mb-3 flex items-center justify-center">
                <span className="text-4xl">🖼️</span>
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

