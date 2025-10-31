import { Frame } from '@/types';

export const frames: Frame[] = [
  // Gen Z Aesthetic (inspired by Solace Studios artistic styles)
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
  {
    id: 'doodle-whimsy',
    name: 'Doodle Whimsy',
    category: 'gen-z',
    preview: '/frames/preview/doodle.png',
    overlay: '/frames/doodle.svg',
    premium: false,
    description: 'Inspired by illustrator collaborations',
  },
  
  // Pop Icons / Fan Events (inspired by Solace Studios fan events)
  {
    id: 'k-pop-vibe',
    name: 'K-Pop Vibes',
    category: 'pop-icons',
    preview: '/frames/preview/kpop.png',
    overlay: '/frames/kpop.svg',
    premium: true,
    description: 'Inspired by NCT Dream, ITZY, Enhypen events',
  },
  {
    id: 'bts-inspired',
    name: 'BTS Purple',
    category: 'pop-icons',
    preview: '/frames/preview/bts.png',
    overlay: '/frames/bts.svg',
    premium: true,
    description: 'Inspired by BTS Taehyung birthday events',
  },
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
  
  // Holiday Frames (inspired by Solace Studios holiday events)
  {
    id: 'valentines',
    name: 'Valentine\'s Day',
    category: 'seasonal',
    preview: '/frames/preview/valentines.png',
    overlay: '/frames/valentines.svg',
    premium: false,
    description: 'Inspired by Solace Studios Valentine\'s events',
  },
  {
    id: 'christmas',
    name: 'Christmas Cheer',
    category: 'seasonal',
    preview: '/frames/preview/christmas.png',
    overlay: '/frames/christmas.svg',
    premium: false,
    description: 'Inspired by Solace Studios Christmas frames',
  },
  {
    id: 'hari-raya',
    name: 'Hari Raya',
    category: 'seasonal',
    preview: '/frames/preview/hari-raya.png',
    overlay: '/frames/hari-raya.svg',
    premium: false,
    description: 'Inspired by Solace Studios Hari Raya events',
  },
  {
    id: 'halloween',
    name: 'Halloween Spooky',
    category: 'seasonal',
    preview: '/frames/preview/halloween.png',
    overlay: '/frames/halloween.svg',
    premium: false,
  },
  {
    id: 'mothers-day',
    name: 'Mother\'s Day',
    category: 'seasonal',
    preview: '/frames/preview/mothers-day.png',
    overlay: '/frames/mothers-day.svg',
    premium: false,
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

