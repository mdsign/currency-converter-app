import React, { useState } from "react";
import styles from "./CurrencyConverter.module.scss";
import classNames from "classnames";
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
  const [base, setBase] = useState<CurrencyCode>("EUR");
  const [target, setTarget] = useState<CurrencyCode>("USD");

  const pairKey = `${base}-${target}` as keyof ExchangeRates;
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
        <div className={styles.formField}>
          <label>{translation.from}</label>
          <div className={styles.currencyDropdown}>
            <img
              src={currencyFlagMap[base]}
              alt=""
              aria-hidden="true"
              className={styles.flag}
            />
            <select
              value={base}
              onChange={(e) => setBase(e.target.value as CurrencyCode)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formField}>
          <label>{translation.to}</label>
          <div className={styles.currencyDropdown}>
            <img
              src={currencyFlagMap[target]}
              alt=""
              aria-hidden="true"
              className={styles.flag}
            />
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value as CurrencyCode)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          {/* <select
            value={target}
            onChange={(e) => setTarget(e.target.value as CurrencyCode)}
          >
            {currencies.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select> */}
        </div>
      </div>
      <fieldset className={styles.result}>
        <legend>
          <span className={styles.baseAmount}>{amount}</span>
          <span className={styles.baseCurrency}>{base} =</span>
        </legend>
        {converted.toFixed(4)} {target}
      </fieldset>
    </div>
  );
};
