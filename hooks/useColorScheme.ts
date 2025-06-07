import { useContext } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useAppTheme } from '@/context/ThemeContext';

export function useColorScheme() {
  const { theme } = useAppTheme();
  const system = useRNColorScheme();
  return theme ?? system ?? 'light';
}
