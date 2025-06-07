import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Pressable, Switch } from 'react-native';

import AppButton from '../AppButton';
import { useCurrency } from '@/context/CurrencyContext';

import type { Ingreso } from '@/hooks/useFinanzas';
import type { Colors } from '@/context/ThemeContext';

interface Props {
  ingresos: Ingreso[];
  onAdd: (ingreso: Ingreso) => void;
  colors: Colors;
  autoOpen?: boolean;
}

export default function IncomeSection({ ingresos, onAdd, colors, autoOpen = false }: Props) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [meses, setMeses] = useState('');
  const [indefinido, setIndefinido] = useState(true);
  const [tieneAumento, setTieneAumento] = useState(false);
  const [aumento, setAumento] = useState('');
  const [aumentoMeses, setAumentoMeses] = useState('');
  const [showModal, setShowModal] = useState(autoOpen);
  const { format } = useCurrency();

  const handleAdd = () => {
    const montoNum = parseFloat(monto);
    const mesesNum = parseInt(meses, 10);
    const aumentoNum = parseFloat(aumento);
    const aumentoMesNum = parseInt(aumentoMeses, 10);
    if (!concepto || isNaN(montoNum)) return;
    onAdd({
      concepto,
      monto: montoNum,
      meses: indefinido || isNaN(mesesNum) ? 0 : mesesNum,
      aumento: tieneAumento && !isNaN(aumentoNum) ? aumentoNum : undefined,
      aumentoFrecuencia:
        tieneAumento && !isNaN(aumentoMesNum) ? aumentoMesNum : undefined,
    });
    setConcepto('');
    setMonto('');
    setMeses('');
    setAumento('');
    setAumentoMeses('');
    setIndefinido(true);
    setTieneAumento(false);
    setShowModal(false);
  };

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Ingresos</Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={[styles.add, { color: colors.primary }]}>＋</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {ingresos.map((i, idx) => (
          <Text key={idx} style={{ color: colors.text }}>
            + {format(i.monto)} ({i.concepto})
          </Text>
        ))}
      </View>

      <Modal transparent animationType="slide" visible={showModal}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Nuevo Ingreso</Text>
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
