import en from "./en";
import de from "./de";

export type Language = "en" | "de";

const translations = {
  en,
  de,
};

export function getTranslation(lang: Language) {
  return translations[lang];
}
