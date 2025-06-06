import { View, Text, StyleSheet } from 'react-native';

import type { Colors } from './IncomeSection';

interface Props {
  ingresos: number;
  deudas: number;
  gastos: number;
  colors: Colors;
}

export default function BalanceChart({ ingresos, deudas, gastos, colors }: Props) {
  // Placeholder for a chart library
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.text, { color: colors.text }]}>Grafico</Text>
      <Text style={{ color: colors.text }}>Ingresos: {ingresos}</Text>
      <Text style={{ color: colors.text }}>Deudas: {deudas}</Text>
      <Text style={{ color: colors.text }}>Gastos: {gastos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
