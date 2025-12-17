
export interface Movie {
  id: string;
  title: string;
  image: string;
  poster?: string;
  coverVideo?: string;
  views: number;
  tag: string; // Dynamic tag like 'Agogo Production'
  category: 'MOVIES' | 'ORIGINAL' | 'TV SERIES';
  type: 'Exclusive' | 'Interactive';
  totalEpisodes: number;
  freeEpisodes: number;
  isFree: boolean;
  isActive: boolean;
  isRecommended: boolean;
  description: string;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  coins: number;
  plan: 'Free' | 'Premium' | 'VIP';
  createdAt: string;
  isBlocked: boolean;
}

export type Category = 'Populer' | 'New Release' | 'Ranking' | 'ORIGINAL' | 'MOVIE';

export enum AppTab {
  HOME = 'home',
  FOR_YOU = 'foryou',
  MY_LIST = 'mylist',
  REWARDS = 'rewards',
  PROFILE = 'profile',
  ADMIN = 'admin'
}
