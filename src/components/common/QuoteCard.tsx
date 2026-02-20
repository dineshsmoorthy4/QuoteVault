import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Quote } from '../../types';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { Card } from './Card';

interface QuoteCardProps {
  quote: Quote;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  onShare?: () => void;
  onPress?: () => void;
  delay?: number;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  isFavorite = false,
  onFavoritePress,
  onShare,
  onPress,
  delay = 0,
}) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    try {
      setLoading(true);
      await Share.share({
        message: `"${quote.content}"\n\n— ${quote.author}`,
        title: 'Share Quote',
      });
      onShare?.();
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View entering={FadeInUp.delay(delay).duration(500)}>
      <Card style={{ ...styles.container, borderColor: colors.border }}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Text
            style={[
              styles.content,
              {
                color: colors.text,
                fontSize: 16,
              },
            ]}
            numberOfLines={4}
          >
            "{quote.content}"
          </Text>

          <Text
            style={[
              styles.author,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            — {quote.author}
          </Text>

          <View
            style={[
              styles.meta,
              {
                borderTopColor: colors.border,
              },
            ]}
          >
            <View style={styles.category}>
              <Text
                style={[
                  styles.categoryText,
                  {
                    color: colors.primary,
                    backgroundColor: `${colors.primary}20`,
                  },
                ]}
              >
                {quote.category}
              </Text>
            </View>

            <Text
              style={[
                styles.likes,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              ❤️ {quote.likes}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onFavoritePress}
            style={[
              styles.actionButton,
              {
                backgroundColor: isFavorite ? `${colors.secondary}20` : `${colors.border}`,
              },
            ]}
          >
            <Icon
              name="heart"
              size={18}
              color={isFavorite ? colors.secondary : colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleShare}
            disabled={loading}
            style={[
              styles.actionButton,
              {
                backgroundColor: `${colors.primary}20`,
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Icon name="share-2" size={18} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg,
  },
  content: {
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.lg,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  category: {
    flex: 1,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden',
  },
  likes: {
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
