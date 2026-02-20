export interface User {
  id: string;
  email: string;
  username: string;
  profilePicture?: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  accentColor: 'indigo' | 'purple' | 'blue' | 'green' | 'red';
  notificationTime: string;
  notificationsEnabled: boolean;
}

export interface Quote {
  id: string;
  content: string;
  author: string;
  category: QuoteCategory;
  likes: number;
  imageUrl?: string;
  createdAt: string;
}

export type QuoteCategory = 
  | 'Motivation'
  | 'Inspiration'
  | 'Success'
  | 'Life'
  | 'Love'
  | 'Humor'
  | 'Wisdom'
  | 'Leadership';

export interface Favorite {
  id: string;
  userId: string;
  quoteId: string;
  quote?: Quote;
  createdAt: string;
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description?: string;
  quoteCount?: number;
  createdAt: string;
}

export interface CollectionQuote {
  id: string;
  collectionId: string;
  quoteId: string;
  quote?: Quote;
  addedAt: string;
}

export interface QuoteCard {
  template: 'minimal' | 'gradient' | 'elegant' | 'modern';
  fontSize: 'small' | 'medium' | 'large';
  backgroundColor: string;
  textColor: string;
}

export interface NotificationPayload {
  id: string;
  title: string;
  message: string;
  quote: string;
  author: string;
  timestamp: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  lastAuthCheck: number;
}

export interface QuotesState {
  quotes: Quote[];
  filteredQuotes: Quote[];
  selectedCategory: QuoteCategory | 'All';
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  searchQuery: string;
}

export interface FavoritesState {
  favorites: Favorite[];
  isLoading: boolean;
  error: string | null;
}

export interface CollectionsState {
  collections: Collection[];
  selectedCollection: Collection | null;
  collectionQuotes: CollectionQuote[];
  isLoading: boolean;
  error: string | null;
}

export interface SettingsState {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  accentColor: 'indigo' | 'purple' | 'blue' | 'green' | 'red';
  notificationTime: string;
  notificationsEnabled: boolean;
}

export interface NotificationState {
  isEnabled: boolean;
  time: string;
  nextQuoteId?: string;
}
