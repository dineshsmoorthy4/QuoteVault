import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchQuotes, setSearchQuery, resetQuotes } from '../../store/slices/quotesSlice';
import { fetchFavorites, addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { Header, QuoteCard, Loading, EmptyState, Input } from '../../components';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { useDebounce } from '../../hooks';

interface SearchScreenProps {
  navigation: any;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { quotes, searchQuery, isLoading, hasMore } = useAppSelector(
    (state) => state.quotes
  );
  const { user } = useAppSelector((state) => state.auth);
  const { favorites } = useAppSelector((state) => state.favorites);
  const [localQuery, setLocalQuery] = useState('');

  const debouncedQuery = useDebounce(localQuery, 300);

  React.useEffect(() => {
    if (user && favorites.length === 0) {
      dispatch(fetchFavorites(user.id));
    }
  }, [user, dispatch]);

  React.useEffect(() => {
    if (debouncedQuery) {
      dispatch(resetQuotes());
      dispatch(fetchQuotes({ page: 1, search: debouncedQuery }));
    } else {
      dispatch(resetQuotes());
    }
  }, [debouncedQuery, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore && debouncedQuery) {
      dispatch(fetchQuotes({ page: 1, search: debouncedQuery }));
    }
  }, [dispatch, isLoading, hasMore, debouncedQuery]);

  const isFavorite = (quoteId: string) => {
    return favorites.some((fav) => fav.quoteId === quoteId);
  };

  const handleFavoritePress = useCallback(
    (quoteId: string) => {
      if (!user) return;

      if (isFavorite(quoteId)) {
        dispatch(removeFromFavorites({ userId: user.id, quoteId }));
      } else {
        dispatch(addToFavorites({ userId: user.id, quoteId }));
      }
    },
    [user, dispatch, favorites]
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Search Quotes" />

      <View style={styles.content}>
        <Input
          placeholder="Search quotes or authors..."
          value={localQuery}
          onChangeText={setLocalQuery}
          icon="search"
          containerStyle={styles.searchInput}
          testID="search-input"
        />

        {isLoading && quotes.length === 0 ? (
          <Loading />
        ) : quotes.length === 0 && localQuery ? (
          <EmptyState
            title="No quotes found"
            description={`No results for "${localQuery}"`}
            icon="search"
          />
        ) : (
          <FlatList
            data={quotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <QuoteCard
                quote={item}
                isFavorite={isFavorite(item.id)}
                onFavoritePress={() => handleFavoritePress(item.id)}
                onPress={() =>
                  navigation.navigate('QuoteDetail', { quoteId: item.id })
                }
                delay={index * 50}
              />
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  searchInput: {
    marginBottom: SPACING.lg,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
});
