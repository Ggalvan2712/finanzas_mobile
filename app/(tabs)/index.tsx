import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import AppButton from '@/components/AppButton';
import BalanceChart from '@/components/finance/BalanceChart';
import BalanceSummary from '@/components/finance/BalanceSummary';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const finance = useFinance();
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
                ingresos={finance.ingresoTotal}
                deudas={finance.deudaTotal}
                gastos={finance.gastoTotal}
                colors={colors}
              />
            </>
          ) : (
            <>
              <BalanceSummary balance={0} colors={colors} />
              <BalanceChart ingresos={2000} deudas={500} gastos={800} colors={colors} />
              <Text style={[styles.message, { color: colors.text }]}> 
                Agrega información en la página de finanzas para ver tus propias
                gráficas. Los gráficos mostrados son ejemplos de lo que puedes
                obtener.
              </Text>
            </>
          )}
          <View style={styles.buttonWrapper}>
            <Link href="/finanzas" asChild>
              <AppButton title="Mis Finanzas" color={colors.accent} onPress={() => {}} />
            </Link>
          </View>
        </View>
      </ScrollView>
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
  buttonWrapper: {
    marginTop: 16,
    width: '100%',
  },
  message: {
    textAlign: 'center',
    marginTop: 8,
  },
});
