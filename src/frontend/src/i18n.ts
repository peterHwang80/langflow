import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import ja from "./locales/ja.json";
import pt from "./locales/pt.json";
import zhHans from "./locales/zh-Hans.json";

const LANGUAGE_LOADERS = {
  en: async () => ({ default: en }),
  de: async () => ({ default: de }),
  es: async () => ({ default: es }),
  fr: async () => ({ default: fr }),
  ja: async () => ({ default: ja }),
  pt: async () => ({ default: pt }),
  "zh-Hans": async () => ({ default: zhHans }),
} as const;

export type SupportedLanguageCode = keyof typeof LANGUAGE_LOADERS;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export function normalizeLanguage(lang?: string | null): SupportedLanguageCode {
  if (!lang) return "en";

  const trimmedLang = lang.trim();
  if (!trimmedLang) return "en";

  if (trimmedLang in LANGUAGE_LOADERS) {
    return trimmedLang as SupportedLanguageCode;
  }

  const lowerLang = trimmedLang.toLowerCase();
  if (lowerLang.startsWith("zh")) {
    return "zh-Hans";
  }

  const baseLang = lowerLang.split("-")[0];
  if (baseLang in LANGUAGE_LOADERS) {
    return baseLang as SupportedLanguageCode;
  }

  return "en";
}

export async function loadLanguage(lang: string): Promise<void> {
  const normalizedLang = normalizeLanguage(lang);

  if (normalizedLang === "en") return;
  if (i18n.hasResourceBundle(normalizedLang, "translation")) return;

  const messages = await LANGUAGE_LOADERS[normalizedLang]();
  i18n.addResourceBundle(normalizedLang, "translation", messages.default);
}

export default i18n;
