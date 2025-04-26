import {
  CurrencyCode,
  ExchangeRates,
} from "./components/CurrencyConverter/types";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";

function App() {
  const appTitle = "Currency Converter";

  const newRates: ExchangeRates = {
    "EUR-USD": 1.6,
    "EUR-CHF": 0.98,
    "EUR-GBP": 0.86,
    "USD-JPY": 155,
    "CHF-USD": 1.2,
    "GBP-CAD": 1.8,
  };

  const newCurrencies: CurrencyCode[] = [
    "EUR",
    "USD",
    "CHF",
    "GBP",
    "JPY",
    "CAD",
  ];

  return (
    <div>
      <h1>{appTitle}</h1>
      <CurrencyConverter rates={newRates} currencies={newCurrencies} />
    </div>
  );
}

export default App;
