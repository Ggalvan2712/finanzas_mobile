import React, { createContext, useContext, ReactNode } from 'react';
import { useFinanzas } from '@/hooks/useFinanzas';

const FinanceContext = createContext<ReturnType<typeof useFinanzas> | null>(null);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const finance = useFinanzas();
  return <FinanceContext.Provider value={finance}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return ctx;
}
