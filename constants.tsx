
import { Movie } from './types';

// Updated MOCK_MOVIES to match the Movie interface defined in types.ts
export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Anak SMA Ternyata CEO',
    image: 'https://picsum.photos/seed/ceo/400/600',
    views: 147,
    tag: 'ORIGINAL',
    category: 'ORIGINAL',
    type: 'Exclusive',
    totalEpisodes: 80,
    freeEpisodes: 5,
    isFree: false,
    isActive: true,
    isRecommended: true,
    description: 'Seorang anak SMA yang pendiam ternyata adalah CEO dari perusahaan teknologi raksasa.',
    createdAt: 'November 22, 2025'
  },
  {
    id: '2',
    title: 'Rajalangit Penguasa Malino',
    image: 'https://picsum.photos/seed/king/400/600',
    views: 105,
    tag: 'MOVIES',
    category: 'MOVIES',
    type: 'Exclusive',
    totalEpisodes: 1,
    freeEpisodes: 0,
    isFree: false,
    isActive: true,
    isRecommended: false,
    description: 'Kisah perjuangan seorang pemuda desa menjadi penguasa di tanah kelahirannya.',
    createdAt: 'November 21, 2025'
  },
  {
    id: '3',
    title: 'Ayahku Ternyata CEO Tersembunyi',
    image: 'https://picsum.photos/seed/dad/400/600',
    views: 61,
    tag: 'ORIGINAL',
    category: 'ORIGINAL',
    type: 'Exclusive',
    totalEpisodes: 60,
    freeEpisodes: 10,
    isFree: false,
    isActive: true,
    isRecommended: true,
    description: 'Keluarga yang harmonis dikejutkan dengan identitas asli sang ayah yang merupakan konglomerat.',
    createdAt: 'November 20, 2025'
  },
  {
    id: '4',
    title: 'Cinta di Balik Layar',
    image: 'https://picsum.photos/seed/love/400/600',
    views: 890,
    tag: 'HOT',
    category: 'TV SERIES',
    type: 'Interactive',
    totalEpisodes: 100,
    freeEpisodes: 20,
    isFree: true,
    isActive: true,
    isRecommended: false,
    description: 'Drama romantis antara seorang produser dan aktor pendatang baru.',
    createdAt: 'November 19, 2025'
  },
  {
    id: '5',
    title: 'Misteri Kost 13',
    image: 'https://picsum.photos/seed/mystery/400/600',
    views: 230,
    tag: 'ORIGINAL',
    category: 'ORIGINAL',
    type: 'Exclusive',
    totalEpisodes: 12,
    freeEpisodes: 1,
    isFree: false,
    isActive: true,
    isRecommended: false,
    description: 'Penghuni kost nomor 13 mulai mengalami kejadian aneh sejak kedatangan mahasiswa baru.',
    createdAt: 'November 18, 2025'
  },
  {
    id: '6',
    title: 'Boss Galak vs Sekretaris',
    image: 'https://picsum.photos/seed/office/400/600',
    views: 452,
    tag: 'MOVIES',
    category: 'MOVIES',
    type: 'Exclusive',
    totalEpisodes: 1,
    freeEpisodes: 0,
    isFree: false,
    isActive: true,
    isRecommended: true,
    description: 'Persaingan dan romansa di dunia korporat yang penuh dengan intrik.',
    createdAt: 'November 17, 2025'
  }
];

export const CATEGORIES = ['Populer', 'New Release', 'Ranking', 'ORIGINAL', 'MOVIE'];
