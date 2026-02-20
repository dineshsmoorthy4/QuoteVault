import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
}) => {
  const { colors } = useTheme();

  const sizes = {
    sm: {
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
      borderRadius: BORDER_RADIUS.md,
      fontSize: 12,
    },
    md: {
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.lg,
      borderRadius: BORDER_RADIUS.lg,
      fontSize: 14,
    },
    lg: {
      paddingVertical: SPACING.lg,
      paddingHorizontal: SPACING.xl,
      borderRadius: BORDER_RADIUS.lg,
      fontSize: 16,
    },
  };

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      textColor: 'white',
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      textColor: 'white',
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      textColor: colors.primary,
      borderWidth: 1.5,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: colors.primary,
      borderWidth: 0,
    },
  };

  const selectedSize = sizes[size];
  const selectedVariant = variants[variant];

  const buttonStyle: ViewStyle = {
    ...selectedSize,
    backgroundColor: selectedVariant.backgroundColor,
    borderColor: selectedVariant.borderColor,
    borderWidth: selectedVariant.borderWidth || 0,
    opacity: disabled || loading ? 0.6 : 1,
  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={selectedVariant.textColor} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: selectedSize.fontSize,
              color: selectedVariant.textColor,
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
  },
});
