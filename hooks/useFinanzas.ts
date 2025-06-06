import { useState } from 'react';

export interface Ingreso {
  concepto: string;
  monto: number;
  meses: number;
}

export interface Deuda {
  concepto: string;
  monto: number;
  meses: number;
  aumento: number;
}

export interface Gasto {
  concepto: string;
  monto: number;
}

export function useFinanzas() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [deudas, setDeudas] = useState<Deuda[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);

  function agregarIngreso(ingreso: Ingreso) {
    setIngresos((prev) => [...prev, ingreso]);
  }

  function agregarDeuda(deuda: Deuda) {
    setDeudas((prev) => [...prev, deuda]);
  }

  function agregarGasto(gasto: Gasto) {
    setGastos((prev) => [...prev, gasto]);
  }

  const ingresoTotal = ingresos.reduce((sum, i) => sum + i.monto, 0);
  const deudaTotal = deudas.reduce((sum, d) => sum + d.monto, 0);
  const gastoTotal = gastos.reduce((sum, g) => sum + g.monto, 0);
  const balance = ingresoTotal - deudaTotal - gastoTotal;

  return {
    ingresos,
    deudas,
    gastos,
    agregarIngreso,
    agregarDeuda,
    agregarGasto,
    ingresoTotal,
    deudaTotal,
    gastoTotal,
    balance,
  };
}
