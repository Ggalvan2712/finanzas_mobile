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
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 22,
  },
});
