import type { MetadataRoute } from 'next';

export default function Manifest(): MetadataRoute.Manifest {
  return {
    name: 'Avasar — Scholarships in Nepal and beyond',
    short_name: 'Avasar',
    description:
      'Discover, match, apply, and track scholarships in Nepal and abroad.',
    start_url: '/',
    display: 'standalone',
    background_color: '#faf7f4',
    theme_color: '#6f4e37',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
    categories: ['education', 'productivity'],
  };
}