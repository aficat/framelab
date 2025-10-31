'use client';

import { useEffect, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { usePhotoBoothStore } from '@/store/usePhotoBoothStore';
import { useCamera } from '@/hooks/useCamera';
import { useCountdown } from '@/hooks/useCountdown';
import { applyFilter } from '@/lib/imageProcessor';

export default function CameraCapture() {
  const {
    layout,
    selectedFrame,
    capturedPhotos,
    facingMode,
    filter,
    addCapturedPhoto,
    setCurrentStep,
    setFacingMode,
    setFilter,
  } = usePhotoBoothStore();

  const { webcamRef, capture, flipCamera: handleFlipCamera } = useCamera();
  const [isCapturing, setIsCapturing] = useState(false);

  const layoutConfig = layout === '3-strip' ? { count: 3 } : { count: 4 };
  const remainingPhotos = layoutConfig.count - capturedPhotos.length;
  const isComplete = remainingPhotos === 0;

  const handleCapture = useCallback(async () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    const imageSrc = capture();
    
    if (imageSrc) {
      // Apply filter if selected
      const processedImage = filter !== 'none' 
        ? await applyFilter(imageSrc, filter)
        : imageSrc;
      
      addCapturedPhoto({
        id: Date.now().toString(),
        dataUrl: processedImage,
        timestamp: Date.now(),
      });
    }
    
    setIsCapturing(false);
    
    // If more photos needed, reset countdown; otherwise go to review
    if (remainingPhotos > 1) {
      setTimeout(() => {
        resetCountdown();
        startCountdown();
      }, 1000);
    } else {
      setTimeout(() => {
        setCurrentStep('review');
      }, 1000);
    }
  }, [capture, filter, addCapturedPhoto, remainingPhotos, isCapturing, resetCountdown, startCountdown, setCurrentStep]);

  const { seconds, start: startCountdown, reset: resetCountdown } = useCountdown(3, handleCapture);

  const handleTakePhoto = () => {
    startCountdown();
  };

  // Set initial facing mode
  useEffect(() => {
    // This will be handled by the button click
  }, []);

  if (isComplete) {
    return null; // Should navigate to review
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
      {/* Camera View */}
      <div className="w-full h-full absolute inset-0">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: facingMode,
            width: 1280,
            height: 720,
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay UI */}
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4">
        {/* Countdown Display */}
        {seconds > 0 && seconds <= 3 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3, repeat: seconds > 0 ? true : false }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="text-9xl font-bold text-white drop-shadow-2xl">
              {seconds}
            </div>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-2">
            {Array.from({ length: layoutConfig.count }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < capturedPhotos.length
                    ? 'bg-green-400'
                    : i === capturedPhotos.length
                    ? 'bg-white animate-pulse'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-white text-center mt-2 font-semibold">
            Photo {capturedPhotos.length + 1} of {layoutConfig.count}
          </p>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <div className="flex justify-between items-center mb-6">
            {/* Camera Flip */}
            <button
              onClick={() => {
                handleFlipCamera();
                setFacingMode(facingMode === 'user' ? 'environment' : 'user');
              }}
              className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/30 transition-all"
              disabled={isCapturing}
            >
              🔄
            </button>

            {/* Capture Button */}
            <button
              onClick={handleTakePhoto}
              disabled={seconds > 0 || isCapturing}
              className="bg-white text-purple-600 w-20 h-20 rounded-full font-bold text-xl shadow-2xl hover:scale-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📸
            </button>

            {/* Filter Selector */}
            <div className="flex flex-col gap-2">
              {(['none', 'warm', 'cool', 'bw', 'film'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                    filter === f
                      ? 'bg-white text-purple-600'
                      : 'bg-white/20 backdrop-blur-md text-white hover:bg-white/30'
                  }`}
                  disabled={isCapturing}
                >
                  {f === 'none' ? '🔍' : f === 'warm' ? '🔥' : f === 'cool' ? '❄️' : f === 'bw' ? '⚫' : '🎞️'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => setCurrentStep('frame')}
          className="absolute top-8 left-8 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-all"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
