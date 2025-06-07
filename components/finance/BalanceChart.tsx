import { View, Text, StyleSheet, Pressable } from 'react-native';

import type { Colors } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  ingresos: number;
  deudas: number;
  gastos: number;
  colors: Colors;
  onAddPress?: () => void;
}

export default function BalanceChart({ ingresos, deudas, gastos, colors, onAddPress }: Props) {
  // Placeholder for a chart library
  const { format } = useCurrency();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {onAddPress && (
        <Pressable style={styles.addButton} onPress={onAddPress} accessibilityLabel="Agregar dato">
          <Text style={[styles.addText, { color: colors.primary }]}>＋</Text>
        </Pressable>
      )}
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
    position: 'relative',
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  addText: {
    fontSize: 24,
    fontWeight: '600',
  },
});
