import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  Modal,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addToFavorites, removeFromFavorites } from '../../store/slices/favoritesSlice';
import { Header, Button, Card, Loading } from '../../components';
import { SPACING, BORDER_RADIUS, QUOTE_TEMPLATES } from '../../constants/theme';
import { useTheme } from '../../hooks';
import * as quotesService from '../../services/quotesService';

interface QuoteDetailScreenProps {
  route: any;
  navigation: any;
}

export const QuoteDetailScreen: React.FC<QuoteDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { favorites } = useAppSelector((state) => state.favorites);
  const { quotes } = useAppSelector((state) => state.quotes);

  const { quoteId } = route.params;
  const quote = quotes.find((q) => q.id === quoteId);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>('minimal');
  const [loading, setLoading] = useState(false);

  const isFavorite = favorites.some((fav) => fav.quoteId === quoteId);

  const handleFavoritePress = () => {
    if (!user) return;

    if (isFavorite) {
      dispatch(removeFromFavorites({ userId: user.id, quoteId }));
    } else {
      dispatch(addToFavorites({ userId: user.id, quoteId }));
    }
  };

  const handleShare = async () => {
    if (!quote) return;

    try {
      setLoading(true);
      await Share.share({
        message: `"${quote.content}"\n\n— ${quote.author}`,
        title: 'Share Quote',
      });
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setLoading(false);
      setShareModalVisible(false);
    }
  };

  if (!quote) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Quote Details"
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
        rightIcon="share-2"
        onRightPress={() => setShareModalVisible(true)}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.quoteCard}>
          <Text
            style={[
              styles.quoteContent,
              {
                color: colors.text,
              },
            ]}
          >
            "{quote.content}"
          </Text>

          <Text
            style={[
              styles.quoteAuthor,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            — {quote.author}
          </Text>

          <View
            style={[
              styles.metadata,
              {
                borderTopColor: colors.border,
              },
            ]}
          >
            <View>
              <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>
                Category
              </Text>
              <Text
                style={[
                  styles.metaValue,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                {quote.category}
              </Text>
            </View>

            <View style={styles.metaDivider} />

            <View>
              <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>
                Likes
              </Text>
              <Text
                style={[
                  styles.metaValue,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {quote.likes}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            variant={isFavorite ? 'outline' : 'primary'}
            onPress={handleFavoritePress}
            size="lg"
            style={styles.actionButton}
          />

          <Button
            title="Share Quote"
            variant="secondary"
            onPress={() => setShareModalVisible(true)}
            size="lg"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>

      <Modal
        visible={shareModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setShareModalVisible(false)}
      >
        <SafeAreaView
          style={[styles.modal, { backgroundColor: colors.background }]}
        >
          <Header
            title="Share Quote"
            leftIcon="x"
            onLeftPress={() => setShareModalVisible(false)}
          />

          <View style={styles.templateList}>
            <FlatList
              data={QUOTE_TEMPLATES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.templateItem,
                    {
                      borderColor: selectedTemplate === item ? colors.primary : colors.border,
                      backgroundColor: colors.surface,
                    },
                  ]}
                  onPress={() => setSelectedTemplate(item)}
                >
                  <Text
                    style={[
                      styles.templateName,
                      {
                        color: selectedTemplate === item ? colors.primary : colors.text,
                        fontWeight: selectedTemplate === item ? '700' : '600',
                      },
                    ]}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
              scrollEnabled={false}
            />
          </View>

          <Button
            title={loading ? 'Sharing...' : 'Share'}
            onPress={handleShare}
            loading={loading}
            disabled={loading}
            size="lg"
            style={styles.shareButton}
          />
        </SafeAreaView>
      </Modal>
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
  quoteCard: {
    marginBottom: SPACING.xl,
  },
  quoteContent: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: SPACING.lg,
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: SPACING.lg,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: SPACING.lg,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  metaDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  actions: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  actionButton: {
    marginBottom: SPACING.md,
  },
  modal: {
    flex: 1,
  },
  templateList: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  templateItem: {
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  templateName: {
    fontSize: 16,
  },
  shareButton: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
});
