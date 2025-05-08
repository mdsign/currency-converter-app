import en from "./en";
import de from "./de";
import { Language } from "../types";

const translations = {
  en,
  de,
};

export function getTranslation(lang: Language) {
  return translations[lang];
}
