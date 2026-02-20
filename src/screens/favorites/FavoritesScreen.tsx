import React, { useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchFavorites,
  removeFromFavorites,
} from '../../store/slices/favoritesSlice';
import { Header, QuoteCard, Loading, EmptyState } from '../../components';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface FavoritesScreenProps {
  navigation: any;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { favorites, isLoading } = useAppSelector((state) => state.favorites);
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        dispatch(fetchFavorites(user.id));
      }
    }, [user, dispatch])
  );

  const handleRefresh = useCallback(async () => {
    if (!user) return;

    setRefreshing(true);
    await dispatch(fetchFavorites(user.id));
    setRefreshing(false);
  }, [user, dispatch]);

  const handleRemoveFavorite = useCallback(
    (quoteId: string) => {
      if (user) {
        dispatch(removeFromFavorites({ userId: user.id, quoteId }));
      }
    },
    [user, dispatch]
  );

  if (isLoading && favorites.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="My Favorites" />

      <View style={styles.content}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) =>
            item.quote ? (
              <QuoteCard
                quote={item.quote}
                isFavorite={true}
                onFavoritePress={() =>
                  handleRemoveFavorite(item.quoteId)
                }
                onPress={() =>
                  navigation.navigate('QuoteDetail', {
                    quoteId: item.quoteId,
                  })
                }
                delay={index * 50}
              />
            ) : null
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                title="No favorites yet"
                description="Add quotes to your favorites to see them here"
                icon="heart"
              />
            ) : null
          }
          contentContainerStyle={styles.listContent}
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
    paddingVertical: SPACING.lg,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
});
