import { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import IncomeSection, { Colors } from '@/components/finance/IncomeSection';
import DebtSection from '@/components/finance/DebtSection';
import ExpenseSection from '@/components/finance/ExpenseSection';
import BalanceSummary from '@/components/finance/BalanceSummary';
import BalanceChart from '@/components/finance/BalanceChart';
import { useFinanzas } from '@/hooks/useFinanzas';

const lightColors: Colors = {
  bg: '#f4f4f4',
  text: '#222',
  surface: '#ffffff',
  primary: '#004388',
  accent: '#00acac',
};

const darkColors: Colors = {
  bg: '#1e1e1e',
  text: '#f4f4f4',
  surface: '#2c2c2c',
  primary: '#00acac',
  accent: '#8ec89a',
};

export default function FinanzasScreen() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const colors = theme === 'dark' ? darkColors : lightColors;
  const finance = useFinanzas();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={[styles.headerText, { color: '#fff' }]}>Mis Finanzas Personales</Text>
          <Pressable onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Text style={styles.toggle}>🌓</Text>
          </Pressable>
        </View>
        <View style={styles.content}>
          <IncomeSection ingresos={finance.ingresos} onAdd={finance.agregarIngreso} colors={colors} />
          <DebtSection deudas={finance.deudas} onAdd={finance.agregarDeuda} colors={colors} />
          <ExpenseSection gastos={finance.gastos} onAdd={finance.agregarGasto} colors={colors} />
          <BalanceSummary balance={finance.balance} colors={colors} />
          <BalanceChart ingresos={finance.ingresoTotal} deudas={finance.deudaTotal} gastos={finance.gastoTotal} colors={colors} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggle: {
    marginLeft: 8,
    fontSize: 18,
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
