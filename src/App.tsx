import { useState } from "react";
import {
  CurrencyCode,
  ExchangeRates,
} from "./components/CurrencyConverter/types";
import { Language } from "./components/CurrencyConverter/types";
import { CurrencyConverter } from "./components/CurrencyConverter/CurrencyConverter";

function App() {
  const appTitle = "Currency Converter";

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<Language>("en");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "de" : "en"));
  };

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
    <>
      <header>
        <div className="header-content">
          <div className="header-actions">
            <span className="action-item">
              Change Theme:{" "}
              <a href="#" onClick={toggleTheme}>
                {theme === "light" ? "Dark" : "Light"}
              </a>
            </span>
            <span className="action-item">
              Change Language:{" "}
              <a href="#" onClick={toggleLanguage}>
                {language === "en" ? "DE" : "EN"}
              </a>
            </span>
          </div>
        </div>
      </header>
      <main className={`app ${theme}`}>
        <h1>{appTitle}</h1>
        <CurrencyConverter
          language={language}
          rates={newRates}
          currencies={newCurrencies}
        />
      </main>
      <footer>{/* Footer content */}</footer>
    </>
  );
}

export default App;
