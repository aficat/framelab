import { Layout } from '@/types';

export const layouts: Layout[] = [
  {
    id: '3-strip',
    name: '3-CUT Strip',
    description: 'Classic 3-photo vertical strip (2" x 6")',
    orientation: 'portrait',
    photoCount: 3,
    dimensions: '2" x 6"', // Classic photobooth strip size
  },
  {
    id: '4-strip',
    name: '4-CUT Strip',
    description: 'Standard 4-photo vertical strip (2" x 8")',
    orientation: 'portrait',
    photoCount: 4,
    dimensions: '2" x 8"', // Standard 4-CUT photobooth strip (inspired by Solace Studios)
  },
  {
    id: '4-collage',
    name: '4-CUT Multi Frame',
    description: '4-photo square multi-frame (4" x 4")',
    orientation: 'portrait',
    photoCount: 4,
    dimensions: '4" x 4"', // Standard 4-CUT multi-frame (inspired by Solace Studios)
  },
  {
    id: '2x2-grid',
    name: '2x2 Grid',
    description: 'Instagram-friendly 2x2 grid (4" x 4")',
    orientation: 'landscape',
    photoCount: 4,
    dimensions: '4" x 4"', // Standard square photobooth size
  },
];

export const getLayoutById = (id: string): Layout | undefined => {
  return layouts.find((layout) => layout.id === id);
};

