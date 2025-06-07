import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';

import AppButton from '@/components/AppButton';
import { useFinance } from '@/context/FinanceContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function AddIngresoModal() {
  const { colors } = useAppTheme();
  const finance = useFinance();
  const router = useRouter();

  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [meses, setMeses] = useState('');
  const [indefinido, setIndefinido] = useState(true);
  const [tieneAumento, setTieneAumento] = useState(false);
  const [aumento, setAumento] = useState('');
  const [aumentoMeses, setAumentoMeses] = useState('');

  const handleSave = () => {
    const montoNum = parseFloat(monto);
    const mesesNum = parseInt(meses, 10);
    const aumentoNum = parseFloat(aumento);
    const aumentoMesNum = parseInt(aumentoMeses, 10);
    if (!concepto || isNaN(montoNum)) return;
    finance.agregarIngreso({
      concepto,
      monto: montoNum,
      meses: indefinido || isNaN(mesesNum) ? 0 : mesesNum,
      aumento: tieneAumento && !isNaN(aumentoNum) ? aumentoNum : undefined,
      aumentoFrecuencia: tieneAumento && !isNaN(aumentoMesNum) ? aumentoMesNum : undefined,
    });
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={[styles.content, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.text }]}>Nuevo Ingreso</Text>
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
        <View style={styles.group}>
          <View style={styles.switchRow}>
            <Text style={{ color: colors.text }}>Indefinido</Text>
            <Switch value={indefinido} onValueChange={setIndefinido} />
          </View>
        </View>
        {!indefinido && (
          <View style={styles.group}>
            <Text style={{ color: colors.text }}>Meses</Text>
            <TextInput
              value={meses}
              onChangeText={setMeses}
              keyboardType="numeric"
              style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
            />
          </View>
        )}
        <View style={styles.group}>
          <View style={styles.switchRow}>
            <Text style={{ color: colors.text }}>Aumento pactado</Text>
            <Switch value={tieneAumento} onValueChange={setTieneAumento} />
          </View>
        </View>
        {tieneAumento && (
          <>
            <View style={styles.group}>
              <Text style={{ color: colors.text }}>Porcentaje de aumento</Text>
              <TextInput
                value={aumento}
                onChangeText={setAumento}
                keyboardType="numeric"
                style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
              />
            </View>
            <View style={styles.group}>
              <Text style={{ color: colors.text }}>Cada cuantos meses</Text>
              <TextInput
                value={aumentoMeses}
                onChangeText={setAumentoMeses}
                keyboardType="numeric"
                style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
              />
            </View>
          </>
        )}
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
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
