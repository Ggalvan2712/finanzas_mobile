import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useState } from 'react';
import { PieChart, BarChart } from 'react-native-chart-kit';

import type { Colors } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

export interface ConceptItem {
  concepto: string;
  monto: number;
}

interface Props {
  items: ConceptItem[];
  colors: Colors;
}

export default function ConceptChart({ items, colors }: Props) {
  const [type, setType] = useState<'pie' | 'bar'>('pie');
  const { format } = useCurrency();
  const width = Dimensions.get('window').width - 64;
  const palette = [colors.primary, colors.accent, '#d04545', '#8b5cf6', '#10b981'];

  const pieData = items.map((i, idx) => ({
    name: i.concepto,
    amount: i.monto,
    color: palette[idx % palette.length],
    legendFontColor: colors.text,
    legendFontSize: 12,
  }));

  const barData = {
    labels: items.map((i) => i.concepto),
    datasets: [{ data: items.map((i) => i.monto) }],
  };

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: () => colors.primary,
    labelColor: () => colors.text,
  } as const;

  const total = items.reduce((sum, i) => sum + i.monto, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.menu}>
        <Pressable onPress={() => setType('pie')}>
          <Text style={[styles.menuItem, { color: type === 'pie' ? colors.primary : colors.text }]}>Pie</Text>
        </Pressable>
        <Pressable onPress={() => setType('bar')}>
          <Text style={[styles.menuItem, { color: type === 'bar' ? colors.primary : colors.text }]}>Barras</Text>
        </Pressable>
      </View>
      {items.length === 0 ? (
        <Text style={{ color: colors.text }}>Sin datos</Text>
      ) : type === 'pie' ? (
        <PieChart
          data={pieData}
          width={width}
          height={220}
          accessor="amount"
          backgroundColor="transparent"
          chartConfig={chartConfig}
          paddingLeft="15"
        />
      ) : (
        <BarChart
          data={barData}
          width={width}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          fromZero
          showValuesOnTopOfBars
        />
      )}
      <Text style={[styles.total, { color: colors.text }]}>Total: {format(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  menu: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  menuItem: {
    fontSize: 18,
  },
  total: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});
