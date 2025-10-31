import { Frame } from '@/types';

export const frames: Frame[] = [
  // Gen Z Aesthetic
  {
    id: 'ribbon-pastel',
    name: 'Ribbon Pastel',
    category: 'gen-z',
    preview: '/frames/preview/ribbon-pastel.png',
    overlay: '/frames/ribbon-pastel.svg',
    premium: false,
  },
  {
    id: 'sparkle-dreams',
    name: 'Sparkle Dreams',
    category: 'gen-z',
    preview: '/frames/preview/sparkle-dreams.png',
    overlay: '/frames/sparkle-dreams.svg',
    premium: false,
  },
  {
    id: 'film-grain-vibe',
    name: 'Film Grain Vibe',
    category: 'gen-z',
    preview: '/frames/preview/film-grain.png',
    overlay: '/frames/film-grain.svg',
    premium: false,
  },
  
  // Pop Icons (Premium)
  {
    id: 'taylor-swift',
    name: 'Taylor Swift Era',
    category: 'pop-icons',
    preview: '/frames/preview/taylor-swift.png',
    overlay: '/frames/taylor-swift.svg',
    premium: true,
  },
  {
    id: 'sabrina-carpenter',
    name: 'Sabrina Carpenter',
    category: 'pop-icons',
    preview: '/frames/preview/sabrina.png',
    overlay: '/frames/sabrina.svg',
    premium: true,
  },
  {
    id: 'olivia-rodrigo',
    name: 'Olivia Rodrigo',
    category: 'pop-icons',
    preview: '/frames/preview/olivia.png',
    overlay: '/frames/olivia.svg',
    premium: true,
  },
  
  // Seasonal
  {
    id: 'valentines',
    name: 'Valentine\'s Day',
    category: 'seasonal',
    preview: '/frames/preview/valentines.png',
    overlay: '/frames/valentines.svg',
    premium: false,
  },
  {
    id: 'spotify-wrapped',
    name: 'Spotify Wrapped',
    category: 'seasonal',
    preview: '/frames/preview/spotify.png',
    overlay: '/frames/spotify.svg',
    premium: true,
  },
  
  // Classic
  {
    id: 'classic-white',
    name: 'Classic White',
    category: 'classic',
    preview: '/frames/preview/classic-white.png',
    overlay: '/frames/classic-white.svg',
    premium: false,
  },
];

export const getFramesByCategory = (category: Frame['category']): Frame[] => {
  return frames.filter((frame) => frame.category === category);
};

export const getFrameById = (id: string): Frame | undefined => {
  return frames.find((frame) => frame.id === id);
};

