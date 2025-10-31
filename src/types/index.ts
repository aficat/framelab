export type Orientation = 'portrait' | 'landscape';

export type LayoutType = '3-strip' | '4-collage' | '2x2-grid';

export interface Layout {
  id: LayoutType;
  name: string;
  description: string;
  orientation: Orientation;
  photoCount: number;
}

export interface Frame {
  id: string;
  name: string;
  category: 'pop-icons' | 'gen-z' | 'seasonal' | 'classic';
  preview: string;
  overlay: string; // Path to SVG/PNG overlay
  premium?: boolean;
}

export interface CapturedPhoto {
  id: string;
  dataUrl: string;
  timestamp: number;
}

export interface PhotoBoothState {
  // Layout
  layout: LayoutType | null;
  orientation: Orientation | null;
  
  // Frame
  selectedFrame: Frame | null;
  
  // Photos
  capturedPhotos: CapturedPhoto[];
  currentPhotoIndex: number;
  
  // Camera
  facingMode: 'user' | 'environment';
  filter: 'none' | 'warm' | 'cool' | 'bw' | 'film';
  
  // UI
  currentStep: 'layout' | 'frame' | 'capture' | 'review' | 'share';
}

