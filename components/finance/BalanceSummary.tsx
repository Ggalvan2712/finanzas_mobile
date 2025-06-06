import { View, Text, StyleSheet } from 'react-native';

import type { Colors } from './IncomeSection';

interface Props {
  balance: number;
  colors: Colors;
}

export default function BalanceSummary({ balance, colors }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.balance, { color: colors.text }]}>Saldo disponible: ${balance.toFixed(2)}</Text>
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
  balance: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
