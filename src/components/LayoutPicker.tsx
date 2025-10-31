'use client';

import { motion } from 'framer-motion';
import { Layout } from '@/types';
import { layouts } from '@/lib/layouts';
import { usePhotoBoothStore } from '@/store/usePhotoBoothStore';

export default function LayoutPicker() {
  const { setLayout, setOrientation, setCurrentStep } = usePhotoBoothStore();

  const handleSelectLayout = (layout: Layout) => {
    setLayout(layout.id);
    setOrientation(layout.orientation);
    setCurrentStep('frame');
  };

  return (
    <div className="min-h-screen gradient-pastel p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Choose Your Layout
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Pick the perfect format for your photo strip
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {layouts.map((layout, index) => (
            <motion.div
              key={layout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectLayout(layout)}
              className="bg-white rounded-3xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-all"
            >
              <div className="aspect-[2/3] bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-2xl mb-4 flex items-center justify-center">
                <div className="grid grid-cols-1 gap-2 w-full p-4">
                  {Array.from({ length: layout.photoCount }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white/80 rounded-lg h-full flex items-center justify-center"
                    >
                      <span className="text-2xl">📷</span>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{layout.name}</h3>
              <p className="text-sm text-gray-600">{layout.description}</p>
              <div className="mt-4 text-xs text-gray-500">
                {layout.photoCount} photos • {layout.orientation}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

