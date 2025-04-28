import styles from "./CurrencyConverter.module.scss";
import { CurrencyCode } from "./types";

interface CurrencyDropdownProps {
  label: string;
  value: CurrencyCode;
  currencies: CurrencyCode[];
  onChange: (value: CurrencyCode) => void;
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
  currencyFlagMap,
}: CurrencyDropdownProps) {
  return (
    <div className={styles.formField}>
      <label className={styles.formFieldLabel}>{label}</label>
      <div className={styles.currencyDropdown}>
        <img
          src={currencyFlagMap[value]}
          alt=""
          aria-hidden="true"
          className={styles.flag}
        />
        <div className={styles.selectWrapper}>
          <select
            className={styles.selectInput}
            value={value}
            onChange={(e) => onChange(e.target.value as CurrencyCode)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency} - {currencyLabelMap[currency]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
