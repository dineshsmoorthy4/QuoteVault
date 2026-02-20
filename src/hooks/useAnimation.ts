import { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export const useFadeInAnimation = (delay: number = 0) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    const timeout = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      });
      scale.value = withSpring(1);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
};

export const useSlideInAnimation = (from: 'left' | 'right' | 'top' | 'bottom' = 'left') => {
  const translateValue = useSharedValue(0);

  useEffect(() => {
    const initialValue = from === 'left' ? -100 : from === 'right' ? 100 : from === 'top' ? -100 : 100;
    translateValue.value = initialValue;

    setTimeout(() => {
      translateValue.value = withSpring(0);
    }, 100);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const isHorizontal = from === 'left' || from === 'right';
    return isHorizontal
      ? { transform: [{ translateX: translateValue.value }] }
      : { transform: [{ translateY: translateValue.value }] };
  });

  return animatedStyle;
};

export const usePulseAnimation = () => {
  const scale = useSharedValue(1);

  useEffect(() => {
    const interval = setInterval(() => {
      scale.value = withTiming(1.1, { duration: 500 }, () => {
        scale.value = withTiming(1, { duration: 500 });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return animatedStyle;
};
