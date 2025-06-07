import { View, Text, StyleSheet } from 'react-native';

import type { Colors } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  ingresos: number;
  deudas: number;
  gastos: number;
  colors: Colors;
}

export default function BalanceChart({ ingresos, deudas, gastos, colors }: Props) {
  // Placeholder for a chart library
  const { format } = useCurrency();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.text, { color: colors.text }]}>Grafico</Text>
      <Text style={{ color: colors.text }}>Ingresos: {format(ingresos)}</Text>
      <Text style={{ color: colors.text }}>Deudas: {format(deudas)}</Text>
      <Text style={{ color: colors.text }}>Gastos: {format(gastos)}</Text>
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
