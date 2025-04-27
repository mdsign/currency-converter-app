import { CurrencyCode } from "../components/CurrencyConverter/types";

export const defaultRates = {
  "EUR-USD": 1.0766,
  "EUR-CHF": 0.9769,
  "EUR-GBP": 0.8583,
  "USD-JPY": 154.527,
  "CHF-USD": 1.1021,
  "GBP-CAD": 1.7162,
};

export const defaultCurrencies = [
  "EUR",
  "USD",
  "CHF",
  "GBP",
  "JPY",
  "CAD",
] as CurrencyCode[];
