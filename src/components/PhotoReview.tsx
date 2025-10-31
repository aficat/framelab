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
    selectedPhotoIds,
    setSelectedPhotoIds,
  } = usePhotoBoothStore();

  const [compositeUrl, setCompositeUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const generateComposite = async () => {
    if (!layout || !orientation) return;

    setIsGenerating(true);
    try {
      const picks = selectedPhotoIds.length === (layout === '3-strip' ? 3 : 4)
        ? capturedPhotos.filter((p) => selectedPhotoIds.includes(p.id))
        : capturedPhotos.slice(0, layout === '3-strip' ? 3 : 4);

      const composite = await createComposite({
        layout,
        orientation,
        photos: picks,
        frame: selectedFrame || undefined,
      });
      setCompositeUrl(composite);
    } catch (error) {
      console.error('Failed to generate composite:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Get required number of photos
  const requiredCount = layout === '3-strip' ? 3 : 4;
  
  // Auto-generate composite when enough photos are selected
  useEffect(() => {
    if (selectedPhotoIds.length === requiredCount) {
      generateComposite();
    } else {
      setCompositeUrl(null); // Clear preview if selection incomplete
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout, orientation, capturedPhotos, selectedFrame, selectedPhotoIds, requiredCount]);
  
  // Initialize selection with first N photos if none selected yet
  useEffect(() => {
    if (selectedPhotoIds.length === 0 && capturedPhotos.length >= requiredCount) {
      setSelectedPhotoIds(capturedPhotos.slice(0, requiredCount).map(p => p.id));
    }
  }, [capturedPhotos, requiredCount, selectedPhotoIds.length, setSelectedPhotoIds]);

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
        <p className="text-center text-gray-600 mb-4">
          Select your favorites ({requiredCount} photos) to create your strip
        </p>
        <p className="text-center text-sm text-gray-500 mb-8">
          Selected: {selectedPhotoIds.length}/{requiredCount}
        </p>

        {/* Preview */}
        {isGenerating ? (
          <div className="bg-white rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin text-6xl mb-4">✨</div>
              <p className="text-gray-600">Creating your photo strip...</p>
            </div>
          </div>
        ) : compositeUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl mb-6"
          >
            <img
              src={compositeUrl}
              alt="Photo strip"
              className="w-full h-auto rounded-2xl max-w-full"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />
          </motion.div>
        ) : selectedPhotoIds.length < requiredCount ? (
          <div className="bg-white/50 rounded-3xl p-12 flex items-center justify-center min-h-[400px] mb-6">
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                Select {requiredCount - selectedPhotoIds.length} more photo{requiredCount - selectedPhotoIds.length > 1 ? 's' : ''} below
              </p>
            </div>
          </div>
        ) : null}

        {/* Individual Photos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {capturedPhotos.map((photo, index) => {
            const isSelected = selectedPhotoIds.includes(photo.id);
            const canSelect = selectedPhotoIds.length < requiredCount || isSelected;
            
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative group cursor-pointer ${
                  isSelected ? 'ring-4 ring-purple-500 ring-offset-2' : ''
                }`}
                onClick={(e) => {
                  // Only handle selection if clicking on the photo itself, not buttons
                  if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'IMG') {
                    if (canSelect) {
                      const isPicked = selectedPhotoIds.includes(photo.id);
                      let next = isPicked
                        ? selectedPhotoIds.filter((id) => id !== photo.id)
                        : [...selectedPhotoIds, photo.id];
                      // Enforce max selection - remove oldest if over limit
                      if (next.length > requiredCount && !isPicked) {
                        next = next.slice(-requiredCount); // Keep last N
                      }
                      setSelectedPhotoIds(next);
                    }
                  }
                }}
              >
                <img
                  src={photo.dataUrl}
                  alt={`Photo ${index + 1}`}
                  className={`w-full aspect-square object-cover rounded-2xl shadow-lg transition-all ${
                    isSelected ? 'scale-95' : 'group-hover:scale-105'
                  }`}
                />
                
                {/* Selection Indicator */}
                <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  isSelected 
                    ? 'bg-purple-600 text-white scale-110' 
                    : 'bg-white/90 text-gray-400 group-hover:bg-purple-100'
                }`}>
                  {isSelected ? '✓' : '+'}
                </div>
                
                {/* Retake Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRetake(index);
                  }}
                  className="absolute bottom-2 left-2 bg-black/70 hover:bg-black/90 text-white px-3 py-1.5 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ↻ Retake
                </button>
                
                {/* Selection count overlay */}
                {isSelected && (
                  <div className="absolute inset-0 bg-purple-500/20 rounded-2xl pointer-events-none flex items-center justify-center">
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                      #{selectedPhotoIds.indexOf(photo.id) + 1}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Actions */}
        {selectedPhotoIds.length === requiredCount && compositeUrl && (
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
              onClick={() => {
                if (compositeUrl) {
                  setShowShare(true);
                }
              }}
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

