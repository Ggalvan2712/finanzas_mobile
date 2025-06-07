import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable } from 'react-native';

import AppButton from '../AppButton';

import type { Deuda } from '@/hooks/useFinanzas';
import type { Colors } from './IncomeSection';

interface Props {
  deudas: Deuda[];
  onAdd: (deuda: Deuda) => void;
  colors: Colors;
}

export default function DebtSection({ deudas, onAdd, colors }: Props) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [meses, setMeses] = useState('');
  const [aumento, setAumento] = useState('0');
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    const montoNum = parseFloat(monto);
    const mesesNum = parseInt(meses, 10);
    const aumentoNum = parseFloat(aumento);
    if (!concepto || isNaN(montoNum) || isNaN(mesesNum)) return;
    onAdd({ concepto, monto: montoNum, meses: mesesNum, aumento: isNaN(aumentoNum) ? 0 : aumentoNum });
    setConcepto('');
    setMonto('');
    setMeses('');
    setAumento('0');
    setShowModal(false);
  };

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Deudas</Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={[styles.add, { color: colors.primary }]}>＋</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {deudas.map((d, idx) => (
          <Text key={idx} style={{ color: colors.text }}>
            - ${d.monto.toFixed(2)} ({d.concepto})
          </Text>
        ))}
      </View>

      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Nueva Deuda</Text>
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
              <Text style={{ color: colors.text }}>Meses</Text>
              <TextInput
                value={meses}
                onChangeText={setMeses}
                keyboardType="numeric"
                style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
              />
            </View>
            <View style={styles.group}>
              <Text style={{ color: colors.text }}>Aumento % cada 3 meses</Text>
              <TextInput
                value={aumento}
                onChangeText={setAumento}
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
