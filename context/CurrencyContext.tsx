import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CurrencyCode = 'ARS' | 'USD' | 'EUR';

interface CurrencyContextValue {
  currency: CurrencyCode;
  format: (value: number) => string;
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'ARS',
  format: (v) => v.toString(),
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('ARS');

  const format = (value: number) =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value);

  return (
    <CurrencyContext.Provider value={{ currency, format, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
