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
          <label htmlFor="amount" className={styles.formFieldLabel}>
            {translation.amount}
          </label>
          <input
            id="amount"
            name="amount"
            className={styles.currencyInput}
            type="number"
            value={amount}
            onChange={handleAmountChange}
            aria-describedby="amountInputHelp"
            aria-label="Amount to convert"
            min="1"
            inputMode="decimal"
            placeholder="Enter amount"
          />
          <span id="amountInputHelp" className={styles.visuallyHidden}>
            Enter the amount you want to convert
          </span>
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
          isTargetDropdown={true}
          baseCurrency={baseCurrency}
          currencyFlagMap={currencyFlagMap}
        />
      </div>
      <fieldset
        className={styles.result}
        tabIndex={0}
        role="status"
        aria-live="polite"
        title={`Conversion result: ${amount} ${baseCurrency} = ${converted.toFixed(
          4
        )} ${targetCurrency}`}
      >
        <legend className={styles.resultBase}>
          <span className={styles.resultBaseValue}>{amount}</span>
          <span>{baseCurrency} =</span>
        </legend>
        <output className={styles.resultValue}>
          {converted.toFixed(4)} {targetCurrency}
        </output>
      </fieldset>
    </div>
  );
};
