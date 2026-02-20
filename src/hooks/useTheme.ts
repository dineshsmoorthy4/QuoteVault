import { useAppSelector } from './redux';
import { COLORS } from '../constants/theme';

export const useTheme = () => {
  const theme = useAppSelector((state) => state.settings.theme);
  const accentColor = useAppSelector((state) => state.settings.accentColor);
  const colors = theme === 'light' ? COLORS.light : COLORS.dark;

  return {
    theme,
    colors,
    isDark: theme === 'dark',
    accentColor,
  };
};

export default useTheme;
