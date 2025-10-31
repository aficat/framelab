import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

export const useCamera = () => {
  const webcamRef = useRef<Webcam>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const requestPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setHasPermission(false);
      console.error('Camera permission denied:', error);
    }
  }, []);

  const capture = useCallback((): string | null => {
    const imageSrc = webcamRef.current?.getScreenshot();
    return imageSrc || null;
  }, []);

  const flipCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  return {
    webcamRef,
    hasPermission,
    facingMode,
    requestPermission,
    capture,
    flipCamera,
  };
};
