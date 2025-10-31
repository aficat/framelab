'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePhotoBoothStore } from '@/store/usePhotoBoothStore';
import { createComposite } from '@/lib/imageProcessor';
import ShareOptions from './ShareOptions';

export default function PhotoReview() {
  const {
    layout,
    orientation,
    capturedPhotos,
    selectedFrame,
    setCurrentStep,
    removeCapturedPhoto,
    setRetakeIndex,
  } = usePhotoBoothStore();

  const [compositeUrl, setCompositeUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const generateComposite = async () => {
    if (!layout || !orientation) return;

    setIsGenerating(true);
    try {
      const composite = await createComposite({
        layout,
        orientation,
        photos: capturedPhotos,
        frame: selectedFrame || undefined,
      });
      setCompositeUrl(composite);
    } catch (error) {
      console.error('Failed to generate composite:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    generateComposite();
  }, [layout, orientation, capturedPhotos, selectedFrame]);

  const handleRetake = (index: number) => {
    setRetakeIndex(index);
    setCurrentStep('capture');
  };

  const handleDownload = () => {
    if (!compositeUrl) return;

    const link = document.createElement('a');
    link.href = compositeUrl;
    link.download = `framelab-${Date.now()}.jpg`;
    link.click();
  };

  if (showShare && compositeUrl) {
    return <ShareOptions compositeUrl={compositeUrl} onBack={() => setShowShare(false)} />;
  }

  return (
    <div className="min-h-screen gradient-pastel p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Review Your Photos
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Tap any photo to retake it
        </p>

        {/* Preview */}
        {isGenerating ? (
          <div className="bg-white rounded-3xl p-12 flex items-center justify-center min-h-[600px]">
            <div className="text-center">
              <div className="animate-spin text-6xl mb-4">✨</div>
              <p className="text-gray-600">Creating your photo strip...</p>
            </div>
          </div>
        ) : compositeUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 shadow-2xl mb-6"
          >
            <img
              src={compositeUrl}
              alt="Photo strip"
              className="w-full rounded-2xl"
            />
          </motion.div>
        ) : null}

        {/* Individual Photos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {capturedPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <img
                src={photo.dataUrl}
                alt={`Photo ${index + 1}`}
                className="w-full aspect-square object-cover rounded-2xl shadow-lg"
              />
              <button
                onClick={() => handleRetake(index)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white font-semibold"
              >
                Retake
              </button>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        {compositeUrl && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              📥 Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShare(true)}
              className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              📤 Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentStep('layout');
              }}
              className="bg-white/50 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-white/80 transition-all"
            >
              🎨 New Strip
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

