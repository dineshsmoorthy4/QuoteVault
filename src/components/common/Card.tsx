import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

export const Card: React.FC<CardProps> = ({ children, style, shadow = 'md' }) => {
  const { colors, isDark } = useTheme();

  const shadowStyle = shadow === 'none' ? {} : SHADOWS[isDark ? 'dark' : 'light'][shadow];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        shadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.lg,
    overflow: 'hidden',
  },
});
