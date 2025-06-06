import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function App() {
  const scheme = useColorScheme();
  const [ingresos, setIngresos] = useState([]);
  const [deudas, setDeudas] = useState([]);
  const [gastos, setGastos] = useState([]);

  const [ingresoConcepto, setIngresoConcepto] = useState('');
  const [ingresoMonto, setIngresoMonto] = useState('');
  const [ingresoMeses, setIngresoMeses] = useState('0');

  const [deudaConcepto, setDeudaConcepto] = useState('');
  const [deudaMonto, setDeudaMonto] = useState('');
  const [deudaMeses, setDeudaMeses] = useState('');
  const [deudaAumento, setDeudaAumento] = useState('0');

  const [gastoConcepto, setGastoConcepto] = useState('');
  const [gastoMonto, setGastoMonto] = useState('');

  const addIngreso = () => {
    setIngresos([...ingresos, { concepto: ingresoConcepto, monto: parseFloat(ingresoMonto) || 0, meses: parseInt(ingresoMeses) || 0 }]);
    setIngresoConcepto('');
    setIngresoMonto('');
  };

  const addDeuda = () => {
    setDeudas([...deudas, { concepto: deudaConcepto, monto: parseFloat(deudaMonto) || 0, meses: parseInt(deudaMeses) || 0, aumento: parseFloat(deudaAumento) || 0 }]);
    setDeudaConcepto('');
    setDeudaMonto('');
    setDeudaMeses('');
  };

  const addGasto = () => {
    setGastos([...gastos, { concepto: gastoConcepto, monto: parseFloat(gastoMonto) || 0 }]);
    setGastoConcepto('');
    setGastoMonto('');
  };

  const ingresoTotal = ingresos.reduce((s,i)=>s+i.monto,0);
  const deudaTotal = deudas.reduce((s,d)=>s+d.monto,0);
  const gastoTotal = gastos.reduce((s,g)=>s+g.monto,0);
  const disponible = ingresoTotal - deudaTotal - gastoTotal;

  const data = [
    { name: 'Ingresos', amount: ingresoTotal, color: '#00acac', legendFontColor: scheme==='dark'?'#fff':'#000', legendFontSize: 12 },
    { name: 'Deudas', amount: deudaTotal, color: '#e74c3c', legendFontColor: scheme==='dark'?'#fff':'#000', legendFontSize: 12 },
    { name: 'Gastos', amount: gastoTotal, color: '#f39c12', legendFontColor: scheme==='dark'?'#fff':'#000', legendFontSize: 12 }
  ];

  return (
    <ScrollView style={[styles.container, scheme==='dark' && styles.darkBg]}> 
      <Text style={[styles.header, scheme==='dark' && styles.darkText]}>Finanzas Personales</Text>
      <View style={styles.section}>
        <Text style={[styles.title, scheme==='dark' && styles.darkText]}>Ingresos</Text>
        <TextInput placeholder="Concepto" value={ingresoConcepto} onChangeText={setIngresoConcepto} style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <TextInput placeholder="Monto" value={ingresoMonto} onChangeText={setIngresoMonto} keyboardType="numeric" style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <TextInput placeholder="Recurrencia en meses (0 = único)" value={ingresoMeses} onChangeText={setIngresoMeses} keyboardType="numeric" style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <Button title="Agregar Ingreso" onPress={addIngreso} />
        {ingresos.map((i,idx)=>(<Text key={idx} style={styles.item}>+ ${i.monto.toFixed(2)} ({i.concepto})</Text>))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.title, scheme==='dark' && styles.darkText]}>Deudas</Text>
        <TextInput placeholder="Concepto" value={deudaConcepto} onChangeText={setDeudaConcepto} style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <TextInput placeholder="Monto" value={deudaMonto} onChangeText={setDeudaMonto} keyboardType="numeric" style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <TextInput placeholder="Duración en meses" value={deudaMeses} onChangeText={setDeudaMeses} keyboardType="numeric" style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <TextInput placeholder="Aumento % cada 3 meses" value={deudaAumento} onChangeText={setDeudaAumento} keyboardType="numeric" style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <Button title="Agregar Deuda" onPress={addDeuda} />
        {deudas.map((d,idx)=>(<Text key={idx} style={styles.item}>- ${d.monto.toFixed(2)} ({d.concepto})</Text>))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.title, scheme==='dark' && styles.darkText]}>Gastos Diarios</Text>
        <TextInput placeholder="Concepto" value={gastoConcepto} onChangeText={setGastoConcepto} style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <TextInput placeholder="Monto" value={gastoMonto} onChangeText={setGastoMonto} keyboardType="numeric" style={[styles.input, scheme==='dark' && styles.darkInput]} placeholderTextColor={scheme==='dark'?'#ccc':'#666'} />
        <Button title="Agregar Gasto" onPress={addGasto} />
        {gastos.map((g,idx)=>(<Text key={idx} style={styles.item}>- ${g.monto.toFixed(2)} ({g.concepto})</Text>))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.title, scheme==='dark' && styles.darkText]}>Saldo disponible: ${disponible.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <PieChart
          data={data}
          width={320}
          height={200}
          chartConfig={{ color: () => scheme==='dark'?'#fff':'#000' }}
          accessor="amount"
          paddingLeft="15"
          backgroundColor="transparent"
          center={[0,0]}
          hasLegend={true}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkBg: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  darkText: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderColor: '#666',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  darkInput: {
    backgroundColor: '#2c2c2c',
    color: '#fff',
  },
  item: {
    marginTop: 4,
  },
});
