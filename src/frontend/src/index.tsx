import "./i18n";
import ReactDOM from "react-dom/client";
import i18n, { loadLanguage, normalizeLanguage } from "./i18n";
import reportWebVitals from "./reportWebVitals";

import "./style/classes.css";
// @ts-ignore
import "./style/index.css";
// @ts-ignore
import "./App.css";
import "./style/applies.css";

// @ts-ignore
import App from "./customization/custom-App";
import { useShortcutsStore } from "./stores/shortcuts";
import { migrateStorageKeys } from "./utils/storage-migration";

migrateStorageKeys();
useShortcutsStore.getState().getShortcutsFromStorage();

const preferredLanguage =
  localStorage.getItem("languagePreference") || navigator.language || "en";
const detectedLang = normalizeLanguage(preferredLanguage);

loadLanguage(detectedLang).then(() => {
  void i18n.changeLanguage(detectedLang);
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
  );
  root.render(<App />);
  reportWebVitals();
});
