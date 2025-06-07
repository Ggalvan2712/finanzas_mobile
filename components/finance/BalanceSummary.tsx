import { View, Text, StyleSheet } from 'react-native';

import type { Colors } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  balance: number;
  colors: Colors;
}

export default function BalanceSummary({ balance, colors }: Props) {
  const { format } = useCurrency();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.balance, { color: colors.text }]}>Saldo disponible: {format(balance)}</Text>
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
