import React, { useState } from "react";
import styles from "./CurrencyConverter.module.scss";
import classNames from "classnames";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { CurrencyConverterProps, CurrencyCode, ExchangeRates } from "./types";
import { defaultRates, defaultCurrencies } from "../../utils/currency";
import { currencyFlagMap } from "../../utils/flagUtils";

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  rates = defaultRates,
  currencies = defaultCurrencies,
  inputValue = 1,
  onChange,
  className,
  translation,
}) => {
  const [amount, setAmount] = useState(inputValue);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>("EUR");
  const [targetCurrency, setTargetCurrency] = useState<CurrencyCode>("USD");

  const pairKey = `${baseCurrency}-${targetCurrency}` as keyof ExchangeRates;
  const rate = (rates as ExchangeRates)[pairKey] ?? 0;
  const converted = amount * rate;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
    if (onChange) onChange(value);
  };

  return (
    <div className={styles.currencyConverterWrapper}>
      <div
        className={classNames(styles.formContainer, className)}
        role="form"
        aria-label="Currency Converter"
      >
        <div className={styles.formField}>
          <label>{translation.amount}</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            aria-label="Amount to convert"
          />
        </div>
        <CurrencyDropdown
          label={translation.from}
          value={baseCurrency}
          currencies={currencies}
          onChange={(value) => setBaseCurrency(value)}
          currencyFlagMap={currencyFlagMap}
        />

        <CurrencyDropdown
          label={translation.to}
          value={targetCurrency}
          currencies={currencies}
          onChange={(value) => setTargetCurrency(value)}
          currencyFlagMap={currencyFlagMap}
        />
      </div>
      <fieldset className={styles.result}>
        <legend>
          <span className={styles.baseAmount}>{amount}</span>
          <span className={styles.baseCurrency}>{baseCurrency} =</span>
        </legend>
        {converted.toFixed(4)} {targetCurrency}
      </fieldset>
    </div>
  );
};
