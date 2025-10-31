import { Layout } from '@/types';

export const layouts: Layout[] = [
  {
    id: '3-strip',
    name: 'Classic Strip',
    description: 'The iconic 3-photo vertical strip',
    orientation: 'portrait',
    photoCount: 3,
  },
  {
    id: '4-collage',
    name: 'Square Collage',
    description: 'Perfect 2x2 grid for Instagram',
    orientation: 'portrait',
    photoCount: 4,
  },
  {
    id: '2x2-grid',
    name: '2x2 Grid',
    description: 'Instagram-friendly square layout',
    orientation: 'landscape',
    photoCount: 4,
  },
];

export const getLayoutById = (id: string): Layout | undefined => {
  return layouts.find((layout) => layout.id === id);
};

