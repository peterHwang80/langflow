import { migrateStorageKeys } from "../storage-migration";

describe("migrateStorageKeys", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("migrates old localStorage keys to new keys", () => {
    localStorage.setItem("langflow-shortcuts", '["test"]');
    localStorage.setItem("langflow-assistant-sessions", '{"s":1}');
    localStorage.setItem("langflow-assistant-panel-size", '{"width":700}');
    localStorage.setItem("langflow-assistant-selected-model", "gpt-4");

    migrateStorageKeys();

    expect(localStorage.getItem("idrflow-shortcuts")).toBe('["test"]');
    expect(localStorage.getItem("idrflow-assistant-sessions")).toBe('{"s":1}');
    expect(localStorage.getItem("idrflow-assistant-panel-size")).toBe(
      '{"width":700}',
    );
    expect(localStorage.getItem("idrflow-assistant-selected-model")).toBe(
      "gpt-4",
    );

    expect(localStorage.getItem("langflow-shortcuts")).toBeNull();
    expect(localStorage.getItem("langflow-assistant-sessions")).toBeNull();
    expect(localStorage.getItem("langflow-assistant-panel-size")).toBeNull();
    expect(
      localStorage.getItem("langflow-assistant-selected-model"),
    ).toBeNull();
  });

  it("migrates old sessionStorage keys to new keys", () => {
    sessionStorage.setItem("langflow_login_redirect", "/some/path");

    migrateStorageKeys();

    expect(sessionStorage.getItem("idrflow_login_redirect")).toBe("/some/path");
    expect(sessionStorage.getItem("langflow_login_redirect")).toBeNull();
  });

  it("migrates sessionStorage prefix keys", () => {
    sessionStorage.setItem("langflow_local_sessions_flow-1", '["s1"]');
    sessionStorage.setItem("langflow_local_sessions_flow-2", '["s2","s3"]');

    migrateStorageKeys();

    expect(sessionStorage.getItem("idrflow_local_sessions_flow-1")).toBe(
      '["s1"]',
    );
    expect(sessionStorage.getItem("idrflow_local_sessions_flow-2")).toBe(
      '["s2","s3"]',
    );
    expect(sessionStorage.getItem("langflow_local_sessions_flow-1")).toBeNull();
    expect(sessionStorage.getItem("langflow_local_sessions_flow-2")).toBeNull();
  });

  it("preserves new key when both old and new exist (new wins)", () => {
    localStorage.setItem("langflow-shortcuts", '["old"]');
    localStorage.setItem("idrflow-shortcuts", '["new"]');

    migrateStorageKeys();

    expect(localStorage.getItem("idrflow-shortcuts")).toBe('["new"]');
    expect(localStorage.getItem("langflow-shortcuts")).toBeNull();
  });

  it("is idempotent on repeated calls", () => {
    localStorage.setItem("langflow-shortcuts", '["test"]');

    migrateStorageKeys();
    migrateStorageKeys();

    expect(localStorage.getItem("idrflow-shortcuts")).toBe('["test"]');
    expect(localStorage.getItem("langflow-shortcuts")).toBeNull();
  });

  it("does nothing when no old keys exist", () => {
    migrateStorageKeys();

    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
  });

  it("isolates key failures without blocking other keys", () => {
    localStorage.setItem("langflow-shortcuts", '["test"]');
    localStorage.setItem("langflow-assistant-sessions", '{"s":1}');

    const originalGetItem = Storage.prototype.getItem;
    let callCount = 0;
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(function (
      this: Storage,
      key: string,
    ) {
      if (key === "langflow-shortcuts" && callCount++ === 0) {
        throw new Error("storage error");
      }
      return originalGetItem.call(this, key);
    });

    migrateStorageKeys();

    expect(localStorage.getItem("idrflow-assistant-sessions")).toBe('{"s":1}');

    vi.restoreAllMocks();
  });
});
