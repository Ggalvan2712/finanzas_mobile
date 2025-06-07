import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
    <SafeAreaProvider>
      <AppThemeProvider>
        <CurrencyProvider>
          <FinanceProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(modals)" options={{ presentation: 'modal', headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </FinanceProvider>
        </CurrencyProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
