import React, { useState, useCallback } from 'react';
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
import { signUpUser, clearError } from '../../store/slices/authSlice';
import { Button, Input } from '../../components';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { STRINGS } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { validateEmail, validatePassword, validateUsername } from '../../utils/validators';

interface SignUpScreenProps {
  navigation: any;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!username.trim()) {
      errors.username = 'Username is required';
    } else if (!validateUsername(username)) {
      errors.username = 'Username must be 3-30 characters';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = STRINGS.errors.invalidEmail;
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      errors.password = STRINGS.errors.passwordTooShort;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = STRINGS.errors.passwordMismatch;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [username, email, password, confirmPassword]);

  const handleSignUp = useCallback(async () => {
    if (!validateForm()) return;

    try {
      dispatch(clearError());
      const result = await dispatch(
        signUpUser({
          username: username.trim(),
          email: email.toLowerCase().trim(),
          password,
        })
      ).unwrap();

      if (result) {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error('Sign up error:', err);
    }
  }, [username, email, password, confirmPassword, validateForm, dispatch]);

  const handleNavigateToLogin = () => {
    navigation.replace('Login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join us to explore amazing quotes
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
            label={STRINGS.auth.username}
            placeholder="Choose a username"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setValidationErrors((prev) => ({ ...prev, username: '' }));
            }}
            error={validationErrors.username}
            icon="user"
            editable={!isLoading}
            testID="signup-username-input"
          />

          <Input
            label={STRINGS.auth.email}
            placeholder="example@email.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setValidationErrors((prev) => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={validationErrors.email}
            icon="mail"
            editable={!isLoading}
            testID="signup-email-input"
            containerStyle={styles.input}
          />

          <Input
            label={STRINGS.auth.password}
            placeholder="At least 8 characters"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setValidationErrors((prev) => ({ ...prev, password: '' }));
            }}
            secureTextEntry
            error={validationErrors.password}
            icon="lock"
            editable={!isLoading}
            testID="signup-password-input"
            containerStyle={styles.input}
          />

          <Input
            label={STRINGS.auth.confirmPassword}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setValidationErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
            secureTextEntry
            error={validationErrors.confirmPassword}
            icon="lock"
            editable={!isLoading}
            testID="signup-confirm-password-input"
            containerStyle={styles.input}
          />

          <Button
            title={isLoading ? 'Creating account...' : STRINGS.auth.signup}
            onPress={handleSignUp}
            loading={isLoading}
            disabled={isLoading}
            size="lg"
            style={styles.signupButton}
            testID="signup-button"
          />

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {STRINGS.auth.alreadyHaveAccount}
            </Text>
            <TouchableOpacity
              onPress={handleNavigateToLogin}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.footerLink,
                  {
                    color: colors.primary,
                  },
                ]}
              >
                {STRINGS.auth.loginNow}
              </Text>
            </TouchableOpacity>
          </View>
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
  input: {
    marginTop: SPACING.md,
  },
  signupButton: {
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.md,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '700',
  },
});
