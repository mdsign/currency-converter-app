export type CurrencyCode = "EUR" | "USD" | "CHF" | "GBP" | "JPY" | "CAD";

export interface ExchangeRates {
  [pair: string]: number;
}

export type Language = "en" | "de";

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
  language: Language;
}
