import { UserPreferences } from '../types';

export const COLORS = {
  light: {
    primary: '#4F46E5',
    secondary: '#EC4899',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
  },
  dark: {
    primary: '#818CF8',
    secondary: '#F472B6',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#CBD5E1',
    border: '#334155',
    error: '#FCA5A5',
    success: '#86EFAC',
    warning: '#FCD34D',
  },
};

export const ACCENT_COLORS = {
  indigo: { light: '#4F46E5', dark: '#818CF8' },
  purple: { light: '#A855F7', dark: '#D8B4FE' },
  blue: { light: '#3B82F6', dark: '#93C5FD' },
  green: { light: '#10B981', dark: '#86EFAC' },
  red: { light: '#EF4444', dark: '#FCA5A5' },
};

export const TYPOGRAPHY = {
  sizes: {
    small: {
      xs: 10,
      sm: 12,
      base: 14,
      lg: 16,
      xl: 18,
      '2xl': 20,
      '3xl': 24,
      '4xl': 28,
    },
    medium: {
      xs: 11,
      sm: 13,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 32,
    },
    large: {
      xs: 12,
      sm: 14,
      base: 18,
      lg: 20,
      xl: 22,
      '2xl': 28,
      '3xl': 32,
      '4xl': 36,
    },
  },
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

export const SHADOWS = {
  light: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 5,
    },
  },
  dark: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 6,
    },
  },
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'auto',
  fontSize: 'medium',
  accentColor: 'indigo',
  notificationTime: '09:00',
  notificationsEnabled: true,
};

export const CATEGORIES = [
  'All',
  'Motivation',
  'Inspiration',
  'Success',
  'Life',
  'Love',
  'Humor',
  'Wisdom',
  'Leadership',
] as const;

export const QUOTE_TEMPLATES = [
  'minimal',
  'gradient',
  'elegant',
  'modern',
] as const;

export const PAGE_SIZE = 10;

export const ANIMATION_DURATION = {
  quick: 200,
  normal: 300,
  slow: 500,
  verySlow: 800,
};

export const STRINGS = {
  errors: {
    networkError: 'Network error. Please check your connection.',
    invalidEmail: 'Please enter a valid email address.',
    passwordTooShort: 'Password must be at least 8 characters.',
    passwordMismatch: "Passwords don't match.",
    userNotFound: 'User not found.',
    invalidCredentials: 'Invalid email or password.',
    userAlreadyExists: 'User already exists.',
    somethingWentWrong: 'Something went wrong. Please try again.',
    loadingFailed: 'Failed to load data.',
    saveFailed: 'Failed to save changes.',
    deleteFailed: 'Failed to delete item.',
  },
  success: {
    saved: 'Saved successfully.',
    deleted: 'Deleted successfully.',
    updated: 'Updated successfully.',
    shared: 'Shared successfully.',
  },
  auth: {
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    rememberMe: 'Remember me',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signUpNow: 'Sign up now',
    loginNow: 'Login now',
  },
  home: {
    title: 'Quotes',
    quoteOfTheDay: 'Quote of the Day',
    noQuotes: 'No quotes found.',
    loadMore: 'Load more quotes',
  },
  search: {
    title: 'Search',
    placeholder: 'Search quotes or authors...',
    noResults: 'No results found.',
    searching: 'Searching...',
  },
  favorites: {
    title: 'Favorites',
    empty: 'No favorites yet. Add quotes to get started!',
    addToFavorites: 'Add to favorites',
    removeFromFavorites: 'Remove from favorites',
  },
  collections: {
    title: 'Collections',
    empty: 'No collections yet. Create one to get started!',
    new: 'New Collection',
    createCollection: 'Create Collection',
    editCollection: 'Edit Collection',
    collectionName: 'Collection name',
    collectionDescription: 'Collection description (optional)',
    addToCollection: 'Add to collection',
    removeFromCollection: 'Remove from collection',
    delete: 'Delete collection',
  },
  profile: {
    title: 'Profile',
    settings: 'Settings',
    editProfile: 'Edit Profile',
    username: 'Username',
    email: 'Email',
    changePassword: 'Change Password',
    logout: 'Logout',
    version: 'App Version',
  },
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    theme: 'Theme',
    fontSize: 'Font Size',
    accentColor: 'Accent Color',
    notifications: 'Notifications',
    notificationsEnabled: 'Enable notifications',
    notificationTime: 'Notification time',
    daily: 'Daily Quote',
    about: 'About',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
  },
};
