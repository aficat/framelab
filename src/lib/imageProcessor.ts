import { LayoutType, Frame, CapturedPhoto } from '@/types';
import { getLayoutById } from './layouts';

export interface CompositeOptions {
  layout: LayoutType;
  orientation: 'portrait' | 'landscape';
  photos: CapturedPhoto[];
  frame?: Frame;
  width?: number;
  height?: number;
}

export const createComposite = async (
  options: CompositeOptions
): Promise<string> => {
  const { layout, orientation, photos, frame, width = 1080, height = 1920 } = options;
  
  const layoutConfig = getLayoutById(layout);
  if (!layoutConfig) {
    throw new Error(`Layout ${layout} not found`);
  }

  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = orientation === 'portrait' ? width : height;
  canvas.height = orientation === 'portrait' ? height : width;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // Fill background with pastel color
  ctx.fillStyle = '#FFF5F5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Layout-specific photo placement
  if (layout === '3-strip') {
    const photoWidth = canvas.width * 0.85;
    const photoHeight = photoWidth * 1.2;
    const spacing = canvas.height / 4;
    const startY = spacing;

    // Load all images in parallel
    const imagePromises = photos.map((photo, index) => {
      return new Promise<{ img: HTMLImageElement; index: number }>((resolve) => {
        const img = new Image();
        img.src = photo.dataUrl;
        img.onload = () => resolve({ img, index });
        img.onerror = () => resolve({ img, index });
      });
    });

    const loadedImages = await Promise.all(imagePromises);

    // Draw images in sequence
    for (const { img, index } of loadedImages) {
      const x = (canvas.width - photoWidth) / 2;
      const y = startY + index * (photoHeight + spacing / 2);
      
      // Draw photo with rounded corners
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, photoWidth, photoHeight, 20);
      ctx.clip();
      ctx.drawImage(img, x, y, photoWidth, photoHeight);
      ctx.restore();
    }
  } else if (layout === '4-collage' || layout === '2x2-grid') {
    const cols = 2;
    const rows = 2;
    const photoWidth = (canvas.width * 0.9) / cols;
    const photoHeight = (canvas.height * 0.9) / rows;
    const padding = canvas.width * 0.05;

    // Load all images in parallel
    const imagePromises = photos.map((photo, index) => {
      return new Promise<{ img: HTMLImageElement; index: number }>((resolve) => {
        const img = new Image();
        img.src = photo.dataUrl;
        img.onload = () => resolve({ img, index });
        img.onerror = () => resolve({ img, index });
      });
    });

    const loadedImages = await Promise.all(imagePromises);

    // Draw images in grid
    for (const { img, index } of loadedImages) {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = padding + col * photoWidth;
      const y = padding + row * photoHeight;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, photoWidth - padding / 2, photoHeight - padding / 2, 15);
      ctx.clip();
      ctx.drawImage(img, x, y, photoWidth - padding / 2, photoHeight - padding / 2);
      ctx.restore();
    }
  }

  // Apply frame overlay if provided
  if (frame?.overlay) {
    const frameImg = new Image();
    frameImg.src = frame.overlay;
    await new Promise((resolve) => {
      frameImg.onload = () => {
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        resolve(null);
      };
      frameImg.onerror = () => {
        console.warn(`Failed to load frame overlay: ${frame.overlay}`);
        resolve(null);
      };
    });
  }

  return canvas.toDataURL('image/jpeg', 0.95);
};

export const applyFilter = (
  imageData: string,
  filter: 'none' | 'warm' | 'cool' | 'bw' | 'film'
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageData;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve(imageData);
        return;
      }

      ctx.drawImage(img, 0, 0);
      
      if (filter === 'bw') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          data[i] = gray;
          data[i + 1] = gray;
          data[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (filter === 'warm') {
        ctx.fillStyle = 'rgba(255, 200, 150, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (filter === 'cool') {
        ctx.fillStyle = 'rgba(150, 200, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (filter === 'film') {
        // Add film grain effect
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const grain = (Math.random() - 0.5) * 20;
          data[i] = Math.max(0, Math.min(255, data[i] + grain));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain));
        }
        ctx.putImageData(imageData, 0, 0);
      }
      
      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.onerror = () => resolve(imageData);
  });
};

