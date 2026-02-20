import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  actionTitle?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'inbox',
  actionTitle,
  onAction,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <Icon
        name={icon}
        size={64}
        color={colors.textSecondary}
        style={styles.icon}
      />
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
      {description && (
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {description}
        </Text>
      )}
      {actionTitle && onAction && (
        <Button
          title={actionTitle}
          onPress={onAction}
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  icon: {
    marginBottom: SPACING.lg,
    opacity: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    marginBottom: SPACING.lg,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: SPACING.lg,
  },
});
