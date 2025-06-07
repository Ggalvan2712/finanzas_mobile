import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native';

import AppButton from '../AppButton';

import type { Gasto } from '@/hooks/useFinanzas';
import type { Colors } from '@/context/ThemeContext';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  gastos: Gasto[];
  onAdd: (gasto: Gasto) => void;
  colors: Colors;
  autoOpen?: boolean;
}

export default function ExpenseSection({ gastos, onAdd, colors, autoOpen = false }: Props) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [showModal, setShowModal] = useState(autoOpen);
  const { format } = useCurrency();

  const handleAdd = () => {
    const montoNum = parseFloat(monto);
    if (!concepto || isNaN(montoNum)) return;
    onAdd({ concepto, monto: montoNum });
    setConcepto('');
    setMonto('');
    setShowModal(false);
  };

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Gastos Diarios</Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={[styles.add, { color: colors.primary }]}>＋</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {gastos.map((g, idx) => (
          <Text key={idx} style={{ color: colors.text }}>
            - {format(g.monto)} ({g.concepto})
          </Text>
        ))}
      </View>

      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Nuevo Gasto</Text>
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
            <AppButton title="Guardar" color={colors.primary} onPress={handleAdd} />
            <AppButton title="Cancelar" color={colors.accent} onPress={() => setShowModal(false)} />
          </View>
        </View>
      </Modal>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  add: {
    fontSize: 24,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
