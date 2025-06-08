import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FloatingAddMenu from '@/components/FloatingAddMenu';
import { useRouter } from 'expo-router';
import BalanceChart from '@/components/finance/BalanceChart';
import BalanceSummary from '@/components/finance/BalanceSummary';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const finance = useFinance();
  const router = useRouter();
  const { colors } = useAppTheme();

  const hasData =
    finance.ingresos.length > 0 ||
    finance.deudas.length > 0 ||
    finance.gastos.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <Text style={[styles.headerText, { color: '#fff' }]}>Inicio</Text>
        </View>
        <View style={styles.content}>
          {hasData ? (
            <>
              <BalanceSummary balance={finance.balance} colors={colors} />
              <BalanceChart
                ingresos={finance.ingresos}
                deudas={finance.deudas}
                gastos={finance.gastos}
                colors={colors}
              />
            </>
          ) : (
            <>
              <BalanceSummary balance={0} colors={colors} />
              <BalanceChart
                ingresos={[
                  { concepto: 'Salario', monto: 2000, meses: 0 },
                  { concepto: 'Freelance', monto: 1200, meses: 0 },
                ]}
                deudas={[
                  { concepto: 'Préstamo', monto: 500, meses: 0 },
                  { concepto: 'Hipoteca', monto: 1000, meses: 0 },
                ]}
                gastos={[
                  { concepto: 'Alquiler', monto: 800 },
                  { concepto: 'Comida', monto: 300 },
                  { concepto: 'Transporte', monto: 150 },
                ]}
                colors={colors}
              />
              <Text style={[styles.message, { color: colors.text }]}> 
                Agrega información en la página de finanzas para ver tus propias
                gráficas. Los gráficos mostrados son ejemplos de lo que puedes
                obtener.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
      <FloatingAddMenu
        colors={colors}
        onIngreso={() => router.push('/(modals)/ingreso')}
        onDeuda={() => router.push('/(modals)/deuda')}
        onGasto={() => router.push('/(modals)/gasto')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  message: {
    textAlign: 'center',
    marginTop: 8,
  },
});
