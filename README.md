# QuoteVault

- Discover inspirational quotes across multiple categories
- Save favorite quotes and organize them into custom collections
- Get daily quotes with push notifications
- Share beautiful quote cards on social media
- Personalize the app with themes and font sizes
- Sync data across devices with cloud storage
- Built with modern mobile development practices, QuoteVault demonstrates clean architecture, type safety, and seamless user experience

## Features

1. User Authentication System
   
- Email/Password signup and login
- Secure session persistence
- Password reset functionality
- User profile with avatar
- Account management

2. Quote Browsing & Discovery

- Infinite scroll home feed
- 5+ quote categories (Motivation, Love, Success, Wisdom, Humor)
- Keyword search
- Author filtering
- Pull-to-refresh
- Loading and empty states
- 100+ seeded quotes

3. Favorites & Collections

- Save quotes to favorites
- Dedicated favorites screen
- Custom collection creation
- Add/remove quotes from collections
- Cloud sync across devices

4. Daily Quote & Notifications

-  Quote of the Day widget
- Daily rotation logic
- Local push notifications
- Customizable notification time

5. Sharing & Export

- Share quotes as text
- Generate styled quote cards
- 3+ card templates
- Save images to device
- System share sheet integration

6. Personalization & Settings

- Dark/Light mode toggle
- 4 themes (Light, Dark, Ocean, Sunset)
- Font size adjustment
- Settings persistence

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dineshsmoorthy4/QuoteVault.git
   cd QuoteValut
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. For iOS, install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

4. Run the application:
   
   For iOS:
   ```bash
   npx react-native run-ios
   ```
   
   For Android:
   ```bash
   npx react-native run-android
   ```

## Architecture

┌─────────────────────────────────────┐
│            Mobile App               │
├─────────────────────────────────────┤
│         Presentation Layer          │
│  ┌──────────────┬──────────────┐    │
│  │   Screens     │  Components  │   │
│  └──────────────┴──────────────┘    │
├─────────────────────────────────────┤
│          State Management           │
│     ┌───────────────────────┐       │
│     │   Redux + Context     │       │
│     └───────────────────────┘       │
├─────────────────────────────────────┤
│           Services Layer            │
│  ┌──────────────┬──────────────┐    │
│  │   API Calls  │   Storage    │    │
│  └──────────────┴──────────────┘    │
├─────────────────────────────────────┤
│         Backend (Supabase)          │
│  ┌──────────────┬──────────────┐    │
│  │   Database   │    Auth      │    │
│  └──────────────┴──────────────┘    │
└─────────────────────────────────────┘

## Project Structure

```
quotevault/
├── src/
│   ├── assets/               # Static assets
│   │   ├── fonts/            # Custom fonts
│   │   ├── icons/            # SVG icons
│   │   └── images/           # PNG/JPG images
│   ├── components/           # Reusable components
│   │   ├── common/           # Button, Input, Loading
│   │   ├── quotes/           # QuoteCard, CategoryFilter
│   │   └── ui/               # ThemeToggle, FontSizeSlider
│   ├── constants/            # App constants
│   │   ├── app.ts            # App metadata
│   │   ├── strings.ts        # Localized strings
│   │   └── categories.ts     # Quote categories
│   ├── context/              # React Context
│   │   ├── AuthContext.tsx   # Authentication context
│   │   ├── ThemeContext.tsx  # Theme context
│   │   └── NotificationContext.tsx
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.ts        # Auth hook
│   │   ├── useQuotes.ts      # Quotes hook
│   │   ├── useDebounce.ts    # Debounce hook
│   │   └── useFavorites.ts   # Favorites hook
│   ├── navigation/           # Navigation config
│   │   ├── index.tsx         # Main navigator
│   │   ├── types.ts          # Navigation types
│   │   └── linking.ts        # Deep linking
│   ├── screens/              # Screen components
│   │   ├── auth/             # Login, Register, ForgotPassword
│   │   ├── home/             # HomeScreen
│   │   ├── search/           # SearchScreen
│   │   ├── quotes/           # QuoteDetailScreen
│   │   ├── favorites/        # FavoritesScreen
│   │   ├── collections/      # CollectionsScreen
│   │   ├── profile/          # ProfileScreen
│   │   └── settings/         # SettingsScreen
│   ├── services/             # API services
│   │   ├── supabase.ts       # Supabase client
│   │   ├── quotes.ts         # Quote service
│   │   ├── favorites.ts      # Favorite service
│   │   ├── collections.ts    # Collection service
│   │   └── notifications.ts  # Notification service
│   ├── store/                # Redux store
│   │   ├── index.ts          # Store configuration
│   │   └── slices/           # Redux slices
│   │       ├── authSlice.ts
│   │       ├── quotesSlice.ts
│   │       └── uiSlice.ts
│   ├── types/                # TypeScript types
│   │   ├── index.ts          # Global types
│   │   ├── navigation.ts     # Navigation types
│   │   └── supabase.ts       # Database types
│   ├── utils/                
```

### Frontend

Technology	Version	Purpose
React Native	0.72.6	Mobile framework
TypeScript	5.1.6	Type safety
React Navigation	6.x	Navigation
React Native Reanimated	3.5.4	Animations
Redux Toolkit	1.9.7	State management
React Native Vector Icons	10.0.0	Icons
React Native Share	9.3.4	Sharing
React Native View Shot	3.5.0	Image capture
React Native Push Notification	8.1.1	Notifications

## Backend

Technology	Version	Purpose
Supabase	2.39.0	Backend as a Service
PostgreSQL	15.x	Database
Supabase Auth	-	Authentication
Supabase Storage	-	Avatar storage

### Development Approach

- Component-Based Architecture: Built with reusable, modular components
- Type Safety: Comprehensive TypeScript integration throughout
- Performance Optimization: Memoization and efficient state updates
- Responsive Design: Adapts to various screen sizes and orientations
- Accessibility: Proper contrast ratios and touch targets

### TypeScript Implementation

- Used TypeScript for all components and services to ensure type safety and better developer experience
- Created dedicated type definitions for API responses, component props, and context states
- Properly typed React Context providers and consumers

### Theme Support

- Created a fully typed ThemeContext for managing dark/light mode preferences
- Used AsyncStorage to persist theme settings
- Applied type-safe theme styles throughout the app

### AsyncStorage

- Used AsyncStorage with TypeScript for type-safe data persistence
- Implemented proper error handling for async operations

### Quality Assurance

- Code Quality: ESLint and Prettier for consistent formatting
- Type Checking: Strict TypeScript configuration
- Testing: Unit tests for critical functionality
- User Experience: Intuitive navigation and clear feedback

## Benefits of TypeScript

- **Type Safety**: Catches common errors during development rather than at runtime
- **Improved IDE Support**: Better autocompletion, type checking, and refactoring capabilities
- **Self-Documenting Code**: Types serve as documentation for component props and function parameters
- **Easier Maintenance**: Type definitions make it easier to understand and refactor code
- **Better Team Collaboration**: Clear interfaces between components and modules

### Android APK link to download for device

[taskManageApp](https://www.upload-apk.com/pcjSCyUWz48fFUL)

## Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


## License
This project is licensed under the MIT © 2025 License.

## Developed with ❤️ by [Dinesh.Smoorthy](https://dineshsprofile.netlify.app/)
