import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchQuotes, setCategory, resetQuotes } from '../../store/slices/quotesSlice';
import { fetchFavorites, addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { Header, QuoteCard, Loading, EmptyState, SegmentedControl } from '../../components';
import { SPACING, CATEGORIES } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { quotes, selectedCategory, isLoading, hasMore, currentPage } =
    useAppSelector((state) => state.quotes);
  const { user } = useAppSelector((state) => state.auth);
  const { favorites } = useAppSelector((state) => state.favorites);
  const [refreshing, setRefreshing] = useState(false);

  const categoryIndex = CATEGORIES.indexOf(selectedCategory as any);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id));
    }
  }, [user, dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchQuotes({ page: 1, category: selectedCategory }));
    }, [dispatch, selectedCategory])
  );

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(fetchQuotes({ page: currentPage + 1, category: selectedCategory }));
    }
  }, [dispatch, isLoading, hasMore, currentPage, selectedCategory]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(resetQuotes());
    await dispatch(fetchQuotes({ page: 1, category: selectedCategory }));
    setRefreshing(false);
  }, [dispatch, selectedCategory]);

  const handleCategoryChange = useCallback(
    (index: number) => {
      dispatch(setCategory(CATEGORIES[index] as any));
    },
    [dispatch]
  );

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

  if (isLoading && quotes.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="QuoteVault"
        subtitle="Daily inspiration"
        rightIcon="settings"
        onRightPress={() => navigation.navigate('Settings')}
      />

      <View style={styles.content}>
        <SegmentedControl
          options={Array.from(CATEGORIES)}
          selectedIndex={categoryIndex}
          onChangeIndex={handleCategoryChange}
          style={styles.categories}
        />

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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            !isLoading && quotes.length === 0 ? (
              <EmptyState
                title="No quotes found"
                description="Try selecting a different category"
                icon="inbox"
              />
            ) : null
          }
          contentContainerStyle={styles.listContent}
          scrollIndicatorInsets={{ right: 1 }}
        />
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
  },
  categories: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
});
