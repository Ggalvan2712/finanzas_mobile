import { ScrollView, View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import IncomeSection from '@/components/finance/IncomeSection';
import DebtSection from '@/components/finance/DebtSection';
import ExpenseSection from '@/components/finance/ExpenseSection';
import BalanceSummary from '@/components/finance/BalanceSummary';
import BalanceChart from '@/components/finance/BalanceChart';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';
import AppButton from '@/components/AppButton';

export default function FinanzasScreen() {
  const finance = useFinance();
  const { colors, toggleTheme } = useAppTheme();
  const { currency, setCurrency } = useCurrency();
  const [showCurrency, setShowCurrency] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={[styles.headerText, { color: '#fff' }]}>Mis Finanzas Personales</Text>
          <View style={styles.actions}>
            <Pressable onPress={() => setShowCurrency(true)}>
              <Text style={styles.toggle}>{currency}</Text>
            </Pressable>
            <Pressable onPress={() => toggleTheme()}>
              <Text style={styles.toggle}>🌓</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.content}>
          <IncomeSection ingresos={finance.ingresos} onAdd={finance.agregarIngreso} colors={colors} />
          <DebtSection deudas={finance.deudas} onAdd={finance.agregarDeuda} colors={colors} />
          <ExpenseSection gastos={finance.gastos} onAdd={finance.agregarGasto} colors={colors} />
          <BalanceSummary balance={finance.balance} colors={colors} />
          <BalanceChart ingresos={finance.ingresoTotal} deudas={finance.deudaTotal} gastos={finance.gastoTotal} colors={colors} />
        </View>
        <Modal transparent animationType="slide" visible={showCurrency}>
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Seleccionar Moneda</Text>
              {(['ARS', 'USD', 'EUR'] as CurrencyCode[]).map((c) => (
                <Pressable key={c} onPress={() => { setCurrency(c); setShowCurrency(false); }}>
                  <Text style={{ color: colors.text, paddingVertical: 4 }}>{c}</Text>
                </Pressable>
              ))}
              <AppButton title="Cerrar" color={colors.accent} onPress={() => setShowCurrency(false)} />
            </View>
          </View>
        </Modal>
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 16,
  },
});
