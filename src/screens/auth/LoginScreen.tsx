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
import { loginUser, clearError } from '../../store/slices/authSlice';
import { Button, Input, Loading } from '../../components';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { STRINGS } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { validateEmail } from '../../utils/validators';

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = STRINGS.errors.invalidEmail;
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!validateForm()) return;

    try {
      dispatch(clearError());
      const result = await dispatch(
        loginUser({ email: email.toLowerCase().trim(), password })
      ).unwrap();

      if (result) {
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  }, [email, password, validateForm, dispatch]);

  const handleNavigateToSignUp = () => {
    navigation.replace('SignUp');
  };

  const handleNavigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  if (isLoading && !email) {
    return <Loading />;
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
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign in to your account to continue
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
              setValidationErrors((prev) => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={validationErrors.email}
            icon="mail"
            editable={!isLoading}
            testID="login-email-input"
          />

          <Input
            label={STRINGS.auth.password}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setValidationErrors((prev) => ({ ...prev, password: '' }));
            }}
            secureTextEntry
            error={validationErrors.password}
            icon="lock"
            editable={!isLoading}
            testID="login-password-input"
            containerStyle={styles.passwordInput}
          />

          <TouchableOpacity
            onPress={handleNavigateToForgotPassword}
            disabled={isLoading}
            style={styles.forgotButton}
          >
            <Text style={[styles.forgotText, { color: colors.primary }]}>
              {STRINGS.auth.forgotPassword}
            </Text>
          </TouchableOpacity>

          <Button
            title={isLoading ? 'Signing in...' : STRINGS.auth.login}
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            size="lg"
            style={styles.loginButton}
            testID="login-button"
          />

          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
              or
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>
              {STRINGS.auth.dontHaveAccount}
            </Text>
            <TouchableOpacity
              onPress={handleNavigateToSignUp}
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
                {STRINGS.auth.signUpNow}
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
  passwordInput: {
    marginTop: SPACING.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    paddingVertical: SPACING.sm,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: SPACING.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: SPACING.md,
    fontSize: 13,
    fontWeight: '600',
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
