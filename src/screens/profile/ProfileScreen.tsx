import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutUser } from '../../store/slices/authSlice';
import { Header, Card, Button } from '../../components';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../hooks';
import { getInitials } from '../../utils/formatters';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [dispatch, navigation]);

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Profile" />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View
              style={[
                styles.avatar,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <Text style={styles.avatarText}>
                {getInitials(user.username)}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={[styles.username, { color: colors.text }]}>
                {user.username}
              </Text>
              <Text style={[styles.email, { color: colors.textSecondary }]}>
                {user.email}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Settings
          </Text>

          <TouchableOpacity
            onPress={handleSettings}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.menuItemContent}>
              <Icon name="settings" size={20} color={colors.textSecondary} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                App Settings
              </Text>
            </View>
            <Icon
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About
          </Text>

          <Card style={{ marginBottom: SPACING.md }}>
            <View style={styles.aboutItem}>
              <Text style={[styles.aboutLabel, { color: colors.textSecondary }]}>
                Version
              </Text>
              <Text style={[styles.aboutValue, { color: colors.text }]}>
                1.0.0
              </Text>
            </View>
          </Card>
        </View>

        <Button
          title={isLoading ? 'Logging out...' : 'Logout'}
          variant="outline"
          onPress={handleLogout}
          loading={isLoading}
          disabled={isLoading}
          size="lg"
          style={styles.logoutButton}
          testID="logout-button"
        />
      </ScrollView>
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
  profileCard: {
    marginBottom: SPACING.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: 13,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: SPACING.lg,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  logoutButton: {
    marginBottom: SPACING.xl,
  },
});
