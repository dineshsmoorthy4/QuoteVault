import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  error?: string;
  icon?: string;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  error,
  icon,
  secureTextEntry = false,
  containerStyle,
  onChangeText,
  testID,
  ...props
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const borderColor = error ? colors.error : isFocused ? colors.primary : colors.border;

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>
          {label}
          {props.returnKeyType && <Text style={{ color: colors.error }}>*</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: colors.surface,
          },
        ]}
      >
        {icon && (
          <Icon name={icon} size={20} color={colors.textSecondary} style={styles.icon} />
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              paddingLeft: icon ? 0 : SPACING.md,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={onChangeText}
          testID={testID}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.icon}
          >
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 56,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  icon: {
    marginRight: SPACING.md,
  },
  error: {
    fontSize: 12,
    marginTop: SPACING.sm,
    fontWeight: '500',
  },
});
