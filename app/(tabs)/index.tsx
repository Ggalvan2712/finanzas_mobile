import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import AppButton from '@/components/AppButton';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const finance = useFinance();
  const { colors, toggleTheme } = useAppTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <View style={styles.buttonWrapper}>
        <Link href="/finanzas" asChild>
          <AppButton title="Mis Finanzas" color="#004388" onPress={() => {}} />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  buttonWrapper: {
    width: '80%',
  },
});
