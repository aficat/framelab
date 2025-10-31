'use client';

import { usePhotoBoothStore } from '@/store/usePhotoBoothStore';
import LayoutPicker from '@/components/LayoutPicker';
import FrameSelector from '@/components/FrameSelector';
import CameraCapture from '@/components/CameraCapture';
import PhotoReview from '@/components/PhotoReview';

export default function PhotoBoothPage() {
  const { currentStep } = usePhotoBoothStore();

  switch (currentStep) {
    case 'layout':
      return <LayoutPicker />;
    case 'frame':
      return <FrameSelector />;
    case 'capture':
      return <CameraCapture />;
    case 'review':
      return <PhotoReview />;
    default:
      return <LayoutPicker />;
  }
}

