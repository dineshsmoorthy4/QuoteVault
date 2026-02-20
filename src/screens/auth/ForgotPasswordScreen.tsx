import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetPasswordEmail, clearError } from '../../store/slices/authSlice';
import { Button, Input, EmptyState } from '../../components';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { STRINGS } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { validateEmail } from '../../utils/validators';

interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(STRINGS.errors.invalidEmail);
      return;
    }

    try {
      dispatch(clearError());
      await dispatch(resetPasswordEmail(email.toLowerCase().trim())).unwrap();
      setSubmitted(true);
    } catch (err) {
      console.error('Reset password error:', err);
    }
  };

  const handleBackToLogin = () => {
    navigation.goBack();
  };

  if (submitted) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <EmptyState
          icon="mail-check"
          title="Check your email"
          description={`We've sent password reset instructions to ${email}`}
          actionTitle="Back to Login"
          onAction={handleBackToLogin}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          onPress={handleBackToLogin}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={[styles.backText, { color: colors.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Reset Password
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Enter your email to receive reset instructions
          </Text>
        </View>

        <View style={styles.form}>
          {error && (
            <View style={[styles.errorBanner, { backgroundColor: `${colors.error}20` }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>
                {error}
              </Text>
            </View>
          )}

          <Input
            label={STRINGS.auth.email}
            placeholder="example@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            icon="mail"
            editable={!isLoading}
            testID="reset-password-email-input"
          />

          <Button
            title={isLoading ? 'Sending...' : 'Send Reset Link'}
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={isLoading}
            size="lg"
            style={styles.button}
            testID="send-reset-link-button"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  form: {
    gap: SPACING.lg,
  },
  errorBanner: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    marginTop: SPACING.md,
  },
});
