import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';

import IncomeSection from '@/components/finance/IncomeSection';
import DebtSection from '@/components/finance/DebtSection';
import ExpenseSection from '@/components/finance/ExpenseSection';
import BalanceSummary from '@/components/finance/BalanceSummary';
import BalanceChart from '@/components/finance/BalanceChart';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function FinanzasScreen() {
  const finance = useFinance();
  const { colors, toggleTheme } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerText, { color: '#fff' }]}>Mis Finanzas Personales</Text>
        <Pressable onPress={toggleTheme}>
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
});
