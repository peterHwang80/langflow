import {
  ASSISTANT_PLACEHOLDERS,
  ASSISTANT_TITLE,
  getAssistantPlaceholder,
} from "../assistant-panel.constants";

describe("assistant-panel.constants", () => {
  describe("ASSISTANT_TITLE", () => {
    it("should be idrflow Assistant", () => {
      expect(ASSISTANT_TITLE).toBe("idrflow Assistant");
    });
  });

  describe("ASSISTANT_PLACEHOLDERS", () => {
    it("should have at least 2 options for randomization", () => {
      expect(ASSISTANT_PLACEHOLDERS.length).toBeGreaterThanOrEqual(2);
    });

    it("should contain only non-empty strings", () => {
      for (const placeholder of ASSISTANT_PLACEHOLDERS) {
        expect(typeof placeholder).toBe("string");
        expect(placeholder.length).toBeGreaterThan(0);
      }
    });
  });

  describe("getAssistantPlaceholder", () => {
    it("should return a non-empty string", () => {
      const result = getAssistantPlaceholder();

      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should return a value from the ASSISTANT_PLACEHOLDERS array", () => {
      const result = getAssistantPlaceholder();

      expect(ASSISTANT_PLACEHOLDERS).toContain(result);
    });

    it("should be callable multiple times without error", () => {
      const results = Array.from({ length: 10 }, () =>
        getAssistantPlaceholder(),
      );

      for (const result of results) {
        expect(ASSISTANT_PLACEHOLDERS).toContain(result);
      }
    });
  });
});
