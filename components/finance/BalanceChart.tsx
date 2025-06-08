import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Animated,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { PieChart, BarChart } from 'react-native-chart-kit';

import type { Colors } from '@/context/ThemeContext';
import type { Ingreso, Deuda, Gasto } from '@/hooks/useFinanzas';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  ingresos: Ingreso[];
  deudas: Deuda[];
  gastos: Gasto[];
  colors: Colors;
}

export default function BalanceChart({ ingresos, deudas, gastos, colors }: Props) {
  const [view, setView] = useState<'general' | 'ingresos' | 'deudas' | 'gastos'>('general');
  const [chart, setChart] = useState<'pie' | 'bar'>('pie');
  const submenuAnim = useRef(new Animated.Value(0)).current;
  const { format } = useCurrency();
  const width = Dimensions.get('window').width - 64;

  useEffect(() => {
    Animated.timing(submenuAnim, {
      toValue: view === 'general' ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [view, submenuAnim]);

  const ingresoTotal = ingresos.reduce((s, i) => s + i.monto, 0);
  const deudaTotal = deudas.reduce((s, d) => s + d.monto, 0);
  const gastoTotal = gastos.reduce((s, g) => s + g.monto, 0);

  const palette = [colors.primary, colors.accent, '#d04545', '#8b5cf6', '#10b981'];

  const pieDataGeneral = [
    { name: 'Ingresos', amount: ingresoTotal, color: colors.primary },
    { name: 'Deudas', amount: deudaTotal, color: '#d04545' },
    { name: 'Gastos', amount: gastoTotal, color: colors.accent },
  ].map((d) => ({ ...d, legendFontColor: colors.text, legendFontSize: 12 }));

  const barDataGeneral = {
    labels: ['Ingresos', 'Deudas', 'Gastos'],
    datasets: [{ data: [ingresoTotal, deudaTotal, gastoTotal] }],
  } as const;

  const selectedItems = view === 'ingresos' ? ingresos : view === 'deudas' ? deudas : gastos;

  const pieDataItems = selectedItems.map((i, idx) => ({
    name: i.concepto,
    amount: i.monto,
    color: palette[idx % palette.length],
    legendFontColor: colors.text,
    legendFontSize: 12,
  }));

  const barDataItems = {
    labels: selectedItems.map((i) => i.concepto),
    datasets: [{ data: selectedItems.map((i) => i.monto) }],
  } as const;

  const currentBarData = view === 'general' ? barDataGeneral : barDataItems;

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: () => colors.primary,
    labelColor: () => colors.text,
  } as const;

  const showPie = view === 'general' || chart === 'pie';

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.menu}>
        {(['general', 'ingresos', 'deudas', 'gastos'] as const).map((m) => (
          <Pressable
            key={m}
            onPress={() => {
              setView(m);
              setChart('pie');
            }}
            style={({ pressed }) => [
              styles.menuButton,
              {
                backgroundColor: view === m ? colors.primary : 'transparent',
                opacity: pressed ? 0.75 : 1,
              },
            ]}
          >
            <Text
              style={[
                styles.menuItem,
                { color: view === m ? '#fff' : colors.text },
              ]}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
      <Animated.View
        pointerEvents={view === 'general' ? 'none' : 'auto'}
        style={[
          styles.submenu,
          {
            opacity: submenuAnim,
            transform: [{ scale: submenuAnim }],
          },
        ]}
      >
        <Pressable
          onPress={() => setChart('pie')}
          style={({ pressed }) => [
            styles.menuButton,
            {
              backgroundColor: chart === 'pie' ? colors.primary : 'transparent',
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <Text style={[styles.menuItem, { color: chart === 'pie' ? '#fff' : colors.text }]}>Pie</Text>
        </Pressable>
        <Pressable
          onPress={() => setChart('bar')}
          style={({ pressed }) => [
            styles.menuButton,
            {
              backgroundColor: chart === 'bar' ? colors.primary : 'transparent',
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          <Text style={[styles.menuItem, { color: chart === 'bar' ? '#fff' : colors.text }]}>Barras</Text>
        </Pressable>
      </Animated.View>
      {showPie ? (
        <PieChart
          data={view === 'general' ? pieDataGeneral : pieDataItems}
          width={width}
          height={220}
          accessor="amount"
          backgroundColor="transparent"
          chartConfig={chartConfig}
          paddingLeft="15"
        />
      ) : (
        <BarChart
          data={currentBarData}
          width={width}
          height={220}
          chartConfig={chartConfig}
          withInnerLines={false}
          fromZero
          showValuesOnTopOfBars
          verticalLabelRotation={30}
        />
      )}
      {view === 'general' && (
        <>
          <Text style={[styles.total, { color: colors.text }]}>Ingresos: {format(ingresoTotal)}</Text>
          <Text style={[styles.total, { color: colors.text }]}>Deudas: {format(deudaTotal)}</Text>
          <Text style={[styles.total, { color: colors.text }]}>Gastos: {format(gastoTotal)}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    position: 'relative',
  },
  menu: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  submenu: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  menuButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: '500',
  },
  total: {
    fontWeight: 'bold',
    marginTop: 8,
  },
});
