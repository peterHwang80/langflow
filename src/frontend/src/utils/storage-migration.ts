const OLD_BRAND = "langflow";
const NEW_BRAND = "idrflow";

const LOCAL_STORAGE_SUFFIXES = [
  "-shortcuts",
  "-assistant-sessions",
  "-assistant-panel-size",
  "-assistant-selected-model",
];

const SESSION_STORAGE_EXACT = ["_login_redirect"];

const SESSION_STORAGE_PREFIXES = ["_local_sessions_"];

function migrateKey(storage: Storage, oldKey: string, newKey: string): void {
  try {
    const oldVal = storage.getItem(oldKey);
    if (oldVal === null) return;
    if (storage.getItem(newKey) === null) {
      storage.setItem(newKey, oldVal);
    }
    storage.removeItem(oldKey);
  } catch {
    // ignore per-key storage errors
  }
}

function migratePrefixKeys(
  storage: Storage,
  oldPrefix: string,
  newPrefix: string,
): void {
  try {
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const k = storage.key(i);
      if (k?.startsWith(oldPrefix)) keys.push(k);
    }
    for (const oldKey of keys) {
      const newKey = newPrefix + oldKey.slice(oldPrefix.length);
      migrateKey(storage, oldKey, newKey);
    }
  } catch {
    // ignore storage errors
  }
}

export function migrateStorageKeys(): void {
  for (const suffix of LOCAL_STORAGE_SUFFIXES) {
    migrateKey(localStorage, OLD_BRAND + suffix, NEW_BRAND + suffix);
  }

  for (const suffix of SESSION_STORAGE_EXACT) {
    migrateKey(sessionStorage, OLD_BRAND + suffix, NEW_BRAND + suffix);
  }

  for (const suffix of SESSION_STORAGE_PREFIXES) {
    migratePrefixKeys(sessionStorage, OLD_BRAND + suffix, NEW_BRAND + suffix);
  }
}
