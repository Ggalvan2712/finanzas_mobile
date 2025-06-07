import { Link } from 'expo-router';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppTheme } from '@/context/ThemeContext';

export default function MenuScreen() {
  const { colors } = useAppTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.content}>
        <Link href="/finanzas" asChild>
          <View style={[styles.iconButton, { backgroundColor: colors.surface }]}>
            <IconSymbol name="chart.pie.fill" size={40} color={colors.primary} />
          </View>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    gap: 16,
  },
  iconButton: {
    padding: 16,
    borderRadius: 8,
  },
});
