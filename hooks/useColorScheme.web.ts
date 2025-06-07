import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { useAppTheme } from '@/context/ThemeContext';

export function useColorScheme() {
  const { theme } = useAppTheme();
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const system = useRNColorScheme();

  if (hasHydrated) {
    return theme ?? system ?? 'light';
  }

  return 'light';
}
