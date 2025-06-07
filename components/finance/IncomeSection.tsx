import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { useCurrency } from '@/context/CurrencyContext';

import type { Ingreso } from '@/hooks/useFinanzas';
import type { Colors } from '@/context/ThemeContext';

interface Props {
  ingresos: Ingreso[];
  colors: Colors;
}

export default function IncomeSection({ ingresos, colors }: Props) {
  const { format } = useCurrency();
  const router = useRouter();

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Ingresos</Text>
        <Pressable onPress={() => router.push('/(modals)/ingreso')}>
          <Text style={[styles.add, { color: colors.primary }]}>＋</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {ingresos.map((i, idx) => (
          <Text key={idx} style={{ color: colors.text }}>
            + {format(i.monto)} ({i.concepto})
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
