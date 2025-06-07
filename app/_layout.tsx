import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import { AppThemeProvider } from '@/context/ThemeContext';
import { FinanceProvider } from '@/context/FinanceContext';
import { CurrencyProvider } from '@/context/CurrencyContext';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppThemeProvider>
      <CurrencyProvider>
        <FinanceProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </FinanceProvider>
      </CurrencyProvider>
    </AppThemeProvider>
  );
}
