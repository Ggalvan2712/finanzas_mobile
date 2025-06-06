import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import type { Gasto } from '@/hooks/useFinanzas';
import type { Colors } from '@/context/ThemeContext';

interface Props {
  gastos: Gasto[];
  onAdd: (gasto: Gasto) => void;
  colors: Colors;
}

export default function ExpenseSection({ gastos, onAdd, colors }: Props) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');

  const handleAdd = () => {
    const montoNum = parseFloat(monto);
    if (!concepto || isNaN(montoNum)) return;
    onAdd({ concepto, monto: montoNum });
    setConcepto('');
    setMonto('');
  };

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Gastos Diarios</Text>
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
      <Button title="Agregar Gasto" color={colors.primary} onPress={handleAdd} />
      <View style={styles.list}>
        {gastos.map((g, idx) => (
          <Text key={idx} style={{ color: colors.text }}>
            - ${g.monto.toFixed(2)} ({g.concepto})
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
  group: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  list: {
    marginTop: 8,
  },
});
