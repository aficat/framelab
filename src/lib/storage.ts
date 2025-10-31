const STORAGE_KEY = 'framelab_photos';

export interface StoredPhoto {
  id: string;
  dataUrl: string;
  timestamp: number;
  layout?: string;
  frameId?: string;
}

export const savePhotoToStorage = (photo: StoredPhoto): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const photos: StoredPhoto[] = stored ? JSON.parse(stored) : [];
    photos.push(photo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
  } catch (error) {
    console.error('Failed to save photo to storage:', error);
  }
};

export const getPhotosFromStorage = (): StoredPhoto[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get photos from storage:', error);
    return [];
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
};

