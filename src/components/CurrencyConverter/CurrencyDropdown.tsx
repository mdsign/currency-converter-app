import styles from "./CurrencyConverter.module.scss";
import { CurrencyCode, CurrencyLabels } from "./types";

interface CurrencyDropdownProps {
  label: string;
  value: CurrencyCode;
  currencies: CurrencyCode[];
  onChange: (value: CurrencyCode) => void;
  isTargetDropdown?: boolean;
  baseCurrency?: CurrencyCode;
  currencyFlagMap: Record<string, string>;
  currencyLabels: CurrencyLabels;
}

export function CurrencyDropdown({
  label,
  value,
  currencies,
  onChange,
  isTargetDropdown,
  baseCurrency,
  currencyFlagMap,
  currencyLabels,
}: CurrencyDropdownProps) {
  const supportedPairs = new Set([
    "EUR-USD",
    "EUR-CHF",
    "EUR-GBP",
    "USD-JPY",
    "CHF-USD",
    "GBP-CAD",
  ]);

  return (
    <div className={styles.formField}>
      <label htmlFor="currency" className={styles.formFieldLabel}>
        {label}
      </label>
      <div className={styles.currencyDropdown}>
        <img
          src={currencyFlagMap[value]}
          alt={`${value} Flag`}
          aria-hidden="true"
          className={styles.flag}
        />
        <div className={styles.selectWrapper}>
          <select
            id="currency"
            name="currency"
            aria-label="Currency selector"
            aria-describedby="currencySelectorHelp"
            className={styles.selectInput}
            value={value}
            onChange={(e) => onChange(e.target.value as CurrencyCode)}
          >
            {currencies.map((currency) => {
              let isDisabled = false;

              if (isTargetDropdown && baseCurrency) {
                const key = `${baseCurrency}-${currency}`;
                isDisabled = !supportedPairs.has(key);
              }

              return (
                <option
                  key={currency}
                  value={currency}
                  disabled={isDisabled}
                  aria-disabled={isDisabled}
                >
                  {currency} - {currencyLabels[currency]}
                </option>
              );
            })}
          </select>
          <span id="currencySelectorHelp" className={styles.visuallyHidden}>
            Press space or arrow keys to open the list
          </span>
        </div>
      </div>
    </div>
  );
}
