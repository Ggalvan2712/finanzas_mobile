import { Link } from 'expo-router';
import { StyleSheet, View, Pressable } from 'react-native';

import BalanceChart from '@/components/finance/BalanceChart';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const finance = useFinance();
  const { colors, toggleTheme } = useAppTheme();

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.menu}>
        <Link href="/finanzas" style={[styles.menuItem, { backgroundColor: colors.primary }]}>
          <ThemedText lightColor="#fff" darkColor="#fff">Finanzas</ThemedText>
        </Link>
        <Pressable onPress={toggleTheme} style={styles.menuItem}>
          <ThemedText>🌓</ThemedText>
        </Pressable>
      </View>
      <BalanceChart
        ingresos={finance.ingresoTotal}
        deudas={finance.deudaTotal}
        gastos={finance.gastoTotal}
        colors={colors}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  menu: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  menuItem: { padding: 8, borderRadius: 4 },
});
