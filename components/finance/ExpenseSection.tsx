import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import type { Gasto } from '@/hooks/useFinanzas';
import type { Colors } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  gastos: Gasto[];
  colors: Colors;
}

export default function ExpenseSection({ gastos, colors }: Props) {
  const { format } = useCurrency();
  const router = useRouter();

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Gastos Diarios</Text>
        <Pressable onPress={() => router.push('/(modals)/gasto')}>
          <Text style={[styles.add, { color: colors.primary }]}>＋</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {gastos.map((g, idx) => (
          <Text key={idx} style={{ color: colors.text }}>
            - {format(g.monto)} ({g.concepto})
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  list: {
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  add: {
    fontSize: 24,
    fontWeight: '600',
  },
  
});
