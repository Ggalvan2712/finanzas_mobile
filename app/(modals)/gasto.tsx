import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import AppButton from '@/components/AppButton';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function AddGastoModal() {
  const { colors } = useAppTheme();
  const finance = useFinance();
  const router = useRouter();

  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');

  const handleSave = () => {
    const montoNum = parseFloat(monto);
    if (!concepto || isNaN(montoNum)) return;
    finance.agregarGasto({ concepto, monto: montoNum });
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.content, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>Nuevo Gasto</Text>
        <View style={styles.group}>
          <Text style={{ color: colors.text }}>Concepto</Text>
          <TextInput
            value={concepto}
            onChangeText={setConcepto}
            style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
          />
        </View>
        <View style={styles.group}>
          <Text style={{ color: colors.text }}>Monto</Text>
          <TextInput
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
            style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
          />
        </View>
        <AppButton title="Guardar" color={colors.primary} onPress={handleSave} />
        <AppButton title="Cancelar" color={colors.accent} onPress={() => router.back()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  content: { borderRadius: 8, padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  group: { marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 6, padding: 8, marginTop: 4 },
});
