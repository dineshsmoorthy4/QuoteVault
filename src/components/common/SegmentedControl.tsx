import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  ViewStyle,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SPACING, BORDER_RADIUS } from '../../constants/theme';
import { useTheme } from '../../hooks';

interface SegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onChangeIndex: (index: number) => void;
  style?: ViewStyle;
  horizontal?: boolean;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onChangeIndex,
  style,
  horizontal = true,
}) => {
  const { colors } = useTheme();

  const containerStyle = horizontal ? styles.horizontal : styles.vertical;

  return (
    <Animated.View entering={FadeIn} style={containerStyle}>
      {horizontal ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.container, { backgroundColor: colors.surface }, style]}
          contentContainerStyle={styles.contentContainer}
        >
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onChangeIndex(index)}
              style={[
                styles.segment,
                {
                  backgroundColor:
                    selectedIndex === index ? colors.primary : 'transparent',
                  borderColor: colors.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: selectedIndex === index ? 'white' : colors.text,
                    fontWeight: selectedIndex === index ? '700' : '600',
                  },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={[styles.container, { backgroundColor: colors.surface }, style]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onChangeIndex(index)}
              style={[
                styles.verticalSegment,
                {
                  backgroundColor:
                    selectedIndex === index ? colors.primary : colors.surface,
                  borderBottomColor: selectedIndex === index ? colors.primary : colors.border,
                },
              ]}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.segmentText,
                  {
                    color: selectedIndex === index ? colors.primary : colors.text,
                    fontWeight: selectedIndex === index ? '700' : '600',
                  },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.sm,
  },
  contentContainer: {
    paddingHorizontal: SPACING.sm,
  },
  horizontal: {
    marginBottom: SPACING.md,
  },
  vertical: {
    marginBottom: SPACING.md,
  },
  segment: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
    borderWidth: 1.5,
  },
  verticalSegment: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 3,
    flex: 1,
    alignItems: 'center',
  },
  segmentText: {
    fontSize: 13,
  },
});
