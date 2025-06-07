import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import ConceptChart from '@/components/finance/ConceptChart';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function IngresosScreen() {
  const { ingresos } = useFinance();
  const { colors } = useAppTheme();
  const { format } = useCurrency();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Ingresos</Text>
        {ingresos.map((i, idx) => (
          <View key={idx} style={styles.item}>
            <Text style={[styles.itemText, { color: colors.text }]}>{i.concepto}</Text>
            <Text style={[styles.itemText, { color: colors.text }]}>{format(i.monto)}</Text>
          </View>
        ))}
        <ConceptChart items={ingresos} colors={colors} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 16,
  },
});
