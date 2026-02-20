import React, { useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  fetchCollectionQuotes,
  removeQuoteFromCollection,
} from '../../store/slices/collectionsSlice';
import { Header, QuoteCard, Loading, EmptyState } from '../../components';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface CollectionDetailScreenProps {
  route: any;
  navigation: any;
}

export const CollectionDetailScreen: React.FC<CollectionDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { collectionId } = route.params;
  const { collectionQuotes, isLoading, selectedCollection } = useAppSelector(
    (state) => state.collections
  );

  useEffect(() => {
    dispatch(fetchCollectionQuotes(collectionId));
  }, [collectionId, dispatch]);

  const handleRemoveQuote = useCallback(
    (quoteId: string) => {
      dispatch(removeQuoteFromCollection({ collectionId, quoteId }));
    },
    [collectionId, dispatch]
  );

  if (isLoading && collectionQuotes.length === 0) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={selectedCollection?.name || 'Collection'}
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <FlatList
          data={collectionQuotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) =>
            item.quote ? (
              <QuoteCard
                quote={item.quote}
                onFavoritePress={() =>
                  handleRemoveQuote(item.quoteId)
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
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                title="No quotes in this collection"
                description="Add quotes to get started"
                icon="inbox"
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
