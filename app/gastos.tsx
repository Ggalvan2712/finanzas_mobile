import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ConceptChart from '@/components/finance/ConceptChart';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function GastosScreen() {
  const { gastos } = useFinance();
  const { colors } = useAppTheme();
  const { format } = useCurrency();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Gastos</Text>
        {gastos.map((g, idx) => (
          <View key={idx} style={styles.item}>
            <Text style={[styles.itemText, { color: colors.text }]}>{g.concepto}</Text>
            <Text style={[styles.itemText, { color: colors.text }]}>{format(g.monto)}</Text>
          </View>
        ))}
        <ConceptChart items={gastos} colors={colors} />
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
