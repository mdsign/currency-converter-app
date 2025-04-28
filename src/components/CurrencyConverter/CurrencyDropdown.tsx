import styles from "./CurrencyConverter.module.scss";
import { CurrencyCode } from "./types";

interface CurrencyDropdownProps {
  label: string;
  value: CurrencyCode;
  currencies: CurrencyCode[];
  onChange: (value: CurrencyCode) => void;
  isTargetDropdown?: boolean;
  baseCurrency?: CurrencyCode;
  currencyFlagMap: Record<string, string>;
}

const currencyLabelMap: Record<CurrencyCode, string> = {
  EUR: "Euro",
  USD: "US Dollar",
  CHF: "Swiss Franc",
  GBP: "Great Britain Pound",
  JPY: "Japanese Yen",
  CAD: "Canadian Dollar",
};

export function CurrencyDropdown({
  label,
  value,
  currencies,
  onChange,
  isTargetDropdown,
  baseCurrency,
  currencyFlagMap,
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
                  {currency} - {currencyLabelMap[currency]}
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
