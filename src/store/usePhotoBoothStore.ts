import { create } from 'zustand';
import { PhotoBoothState, Orientation, LayoutType, Frame, CapturedPhoto } from '@/types';

interface PhotoBoothStore extends PhotoBoothState {
  // Actions
  setLayout: (layout: LayoutType) => void;
  setOrientation: (orientation: Orientation) => void;
  setSelectedFrame: (frame: Frame) => void;
  addCapturedPhoto: (photo: CapturedPhoto) => void;
  removeCapturedPhoto: (id: string) => void;
  updatePhoto: (id: string, dataUrl: string) => void;
  setCurrentPhotoIndex: (index: number) => void;
  setRetakeIndex: (index: number | null) => void;
  setSelectedPhotoIds: (ids: string[]) => void;
  setMaxCaptures: (max: number) => void;
  setFacingMode: (mode: 'user' | 'environment') => void;
  setFilter: (filter: PhotoBoothState['filter']) => void;
  setCurrentStep: (step: PhotoBoothState['currentStep']) => void;
  reset: () => void;
}

const initialState: PhotoBoothState = {
  layout: null,
  orientation: null,
  selectedFrame: null,
  capturedPhotos: [],
  currentPhotoIndex: 0,
  retakeIndex: null,
  selectedPhotoIds: [],
  maxCaptures: 8,
  facingMode: 'user',
  filter: 'none',
  currentStep: 'layout',
};

export const usePhotoBoothStore = create<PhotoBoothStore>((set) => ({
  ...initialState,
  
  setLayout: (layout) => set({ layout }),
  setOrientation: (orientation) => set({ orientation }),
  setSelectedFrame: (frame) => set({ selectedFrame: frame }),
  
  addCapturedPhoto: (photo) => set((state) => ({
    capturedPhotos: [...state.capturedPhotos, photo],
    currentPhotoIndex: state.capturedPhotos.length,
  })),
  
  removeCapturedPhoto: (id) => set((state) => ({
    capturedPhotos: state.capturedPhotos.filter((p) => p.id !== id),
  })),
  
  updatePhoto: (id, dataUrl) => set((state) => ({
    capturedPhotos: state.capturedPhotos.map((p) =>
      p.id === id ? { ...p, dataUrl } : p
    ),
  })),
  
  setCurrentPhotoIndex: (index) => set({ currentPhotoIndex: index }),
  setRetakeIndex: (index) => set({ retakeIndex: index }),
  setSelectedPhotoIds: (ids) => set({ selectedPhotoIds: ids }),
  setMaxCaptures: (max) => set({ maxCaptures: max }),
  setFacingMode: (mode) => set({ facingMode: mode }),
  setFilter: (filter) => set({ filter }),
  setCurrentStep: (step) => set({ currentStep: step }),
  
  reset: () => set(initialState),
}));

