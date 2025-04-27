export type CurrencyCode = "EUR" | "USD" | "CHF" | "GBP" | "JPY" | "CAD";

export interface ExchangeRates {
  [pair: string]: number;
}

interface Translation {
  amount: string;
  from: string;
  to: string;
}

export interface CurrencyConverterProps {
  rates?: ExchangeRates;
  currencies?: CurrencyCode[];
  inputValue?: number;
  onChange?: (value: number) => void;
  className?: string;
  labels?: {
    amount?: string;
    baseCurrency?: string;
    targetCurrency?: string;
    result?: string;
  };
  translation: Translation;
}
