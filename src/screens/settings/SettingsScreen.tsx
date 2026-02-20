import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  setTheme,
  setFontSize,
  setAccentColor,
  setNotificationTime,
  setNotificationsEnabled,
} from '../../store/slices/settingsSlice';
import { Header, Card, SegmentedControl } from '../../components';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { STRINGS } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface SettingsScreenProps {
  navigation: any;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { colors, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { theme, fontSize, accentColor, notificationTime, notificationsEnabled } =
    useAppSelector((state) => state.settings);

  const themeIndex = theme === 'dark' ? 1 : 0;
  const fontSizeIndex = fontSize === 'small' ? 0 : fontSize === 'medium' ? 1 : 2;
  const accentIndex = ['indigo', 'purple', 'blue', 'green', 'red'].indexOf(accentColor);

  const handleThemeChange = (index: number) => {
    dispatch(setTheme(index === 0 ? 'light' : 'dark'));
  };

  const handleFontSizeChange = (index: number) => {
    const sizes = ['small', 'medium', 'large'] as const;
    dispatch(setFontSize(sizes[index]));
  };

  const handleAccentColorChange = (index: number) => {
    const colors = ['indigo', 'purple', 'blue', 'green', 'red'] as const;
    dispatch(setAccentColor(colors[index]));
  };

  const handleNotificationsToggle = (value: boolean) => {
    dispatch(setNotificationsEnabled(value));
  };

  const handleTimeChange = (newTime: string) => {
    dispatch(setNotificationTime(newTime));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={STRINGS.settings.title}
        leftIcon="arrow-left"
        onLeftPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {STRINGS.settings.appearance}
          </Text>

          <Card>
            <View style={styles.settingItem}>
              <Text style={[styles.label, { color: colors.text }]}>
                {STRINGS.settings.theme}
              </Text>
              <SegmentedControl
                options={['Light', 'Dark']}
                selectedIndex={themeIndex}
                onChangeIndex={handleThemeChange}
                horizontal={true}
                style={styles.segmentedControl}
              />
            </View>
          </Card>

          <Card style={{ marginTop: SPACING.md }}>
            <View style={styles.settingItem}>
              <Text style={[styles.label, { color: colors.text }]}>
                {STRINGS.settings.fontSize}
              </Text>
              <SegmentedControl
                options={['Small', 'Medium', 'Large']}
                selectedIndex={fontSizeIndex}
                onChangeIndex={handleFontSizeChange}
                horizontal={true}
                style={styles.segmentedControl}
              />
            </View>
          </Card>

          <Card style={{ marginTop: SPACING.md }}>
            <View style={styles.settingItem}>
              <Text style={[styles.label, { color: colors.text }]}>
                {STRINGS.settings.accentColor}
              </Text>
              <SegmentedControl
                options={['Indigo', 'Purple', 'Blue', 'Green', 'Red']}
                selectedIndex={accentIndex}
                onChangeIndex={handleAccentColorChange}
                horizontal={true}
                style={styles.segmentedControl}
              />
            </View>
          </Card>
        </View>

        {/* <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {STRINGS.settings.notifications}
          </Text>

          <Card>
            <View style={styles.settingItemRow}>
              <Text style={[styles.label, { color: colors.text }]}>
                {STRINGS.settings.notificationsEnabled}
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={notificationsEnabled ? colors.primary : colors.textSecondary}
              />
            </View>
          </Card>

          {notificationsEnabled && (
            <Card style={{ marginTop: SPACING.md }}>
              <View style={styles.settingItemRow}>
                <View>
                  <Text style={[styles.label, { color: colors.text }]}>
                    {STRINGS.settings.notificationTime}
                  </Text>
                  <Text
                    style={[
                      styles.sublabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {notificationTime}
                  </Text>
                </View>
                <Icon
                  name="clock"
                  size={20}
                  color={colors.primary}
                />
              </View>
            </Card>
          )}
        </View> */}

        {/* <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {STRINGS.settings.about}
          </Text>

          <Card>
            <TouchableOpacity style={styles.settingItemRow}>
              <Text style={[styles.label, { color: colors.text }]}>
                Privacy Policy
              </Text>
              <Icon
                name="arrow-right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </Card>

          <Card style={{ marginTop: SPACING.md }}>
            <TouchableOpacity style={styles.settingItemRow}>
              <Text style={[styles.label, { color: colors.text }]}>
                Terms of Service
              </Text>
              <Icon
                name="arrow-right"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </Card>
        </View> */}

        <View style={styles.footer}>
          <Text style={[styles.versionText, { color: colors.textSecondary }]}>
            QuoteVault v1.0.0
          </Text>
        </View>
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
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  settingItem: {
    gap: SPACING.md,
  },
  settingItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  sublabel: {
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  segmentedControl: {
    marginTop: 0,
    marginBottom: 0,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
