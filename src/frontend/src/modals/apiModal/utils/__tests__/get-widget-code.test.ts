import type { GetCodeType } from "@/types/tweaks";
import getWidgetCode from "../get-widget-code";

// Mock the customGetHostProtocol
jest.mock("@/customization/utils/custom-get-host-protocol", () => ({
  customGetHostProtocol: () => ({
    protocol: "https:",
    host: "localhost:3000",
  }),
}));

describe("getWidgetCode", () => {
  const baseOptions: GetCodeType = {
    flowId: "test-flow-123",
    flowName: "Test Flow",
    isAuth: false,
    webhookAuthEnable: false,
  };

  describe("Basic widget code generation", () => {
    it("should generate widget code with API key when isAuth is false", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).toContain(
        "idrflow embedded chat package is not published yet.",
      );
      expect(code).not.toContain("<script");
      expect(code).not.toContain("langflow-embedded-chat");
      expect(code).toContain("<idrflow-chat");
      expect(code).toContain('window_title="Test Flow"');
      expect(code).toContain('flow_id="test-flow-123"');
      expect(code).toContain('host_url="https://localhost:3000"');

      expect(code).toContain('api_key="..."');
      expect(code).toContain("</idrflow-chat>");
    });

    it("should generate widget code without API key when isAuth is true", () => {
      const code = getWidgetCode({
        ...baseOptions,
        isAuth: true,
      });

      expect(code).toContain("<idrflow-chat");
      expect(code).toContain('window_title="Test Flow"');
      expect(code).toContain('flow_id="test-flow-123"');
      expect(code).toContain('host_url="https://localhost:3000"');

      expect(code).not.toContain("api_key");
      expect(code).toContain("</idrflow-chat>");
    });

    it("should return the placeholder snippet when copy is false", () => {
      const code = getWidgetCode({
        ...baseOptions,
        copy: false,
      });

      expect(code).toContain("Replace this placeholder");
      expect(code).toContain("<idrflow-chat");
    });

    it("should return the same placeholder snippet when copy is true", () => {
      const code = getWidgetCode({
        ...baseOptions,
        copy: true,
      });

      expect(code).toContain("Replace this placeholder");
      expect(code).toContain("<idrflow-chat");
    });
  });

  describe("Flow ID handling", () => {
    it("should correctly embed flowId in the widget", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowId: "custom-flow-456",
      });

      expect(code).toContain('flow_id="custom-flow-456"');
    });

    it("should handle empty flowId", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowId: "",
      });

      expect(code).toContain('flow_id=""');
    });

    it("should handle flowId with special characters", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowId: "flow-with-dashes_and_underscores",
      });

      expect(code).toContain('flow_id="flow-with-dashes_and_underscores"');
    });

    it("should handle flowId with UUID format", () => {
      const uuid = "550e8400-e29b-41d4-a716-446655440000";
      const code = getWidgetCode({
        ...baseOptions,
        flowId: uuid,
      });

      expect(code).toContain(`flow_id="${uuid}"`);
    });
  });

  describe("Flow name handling", () => {
    it("should correctly embed flowName in window_title", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "Custom Chat Widget",
      });

      expect(code).toContain('window_title="Custom Chat Widget"');
    });

    it("should handle empty flowName", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "",
      });

      expect(code).toContain('window_title=""');
    });

    it("should handle flowName with special characters", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "Chat Widget: v1.0 (beta)",
      });

      expect(code).toContain('window_title="Chat Widget: v1.0 (beta)"');
    });

    it("should handle flowName with quotes", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: 'Widget with "quotes"',
      });

      // Should still contain the window_title attribute
      expect(code).toContain("window_title=");
      // The function doesn't escape quotes, so they appear as-is
      expect(code).toContain("Widget with");
    });

    it("should handle flowName with unicode characters", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "聊天小部件 Chat Widget 🤖",
      });

      expect(code).toContain('window_title="聊天小部件 Chat Widget 🤖"');
    });

    it("should handle very long flowName", () => {
      const longName = "A".repeat(200);
      const code = getWidgetCode({
        ...baseOptions,
        flowName: longName,
      });

      expect(code).toContain(`window_title="${longName}"`);
    });
  });

  describe("Host URL handling", () => {
    it("should construct host_url from protocol and host", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).toContain('host_url="https://localhost:3000"');
    });

    it("should handle different protocols", () => {
      // Note: This tests the integration with customGetHostProtocol mock
      const code = getWidgetCode(baseOptions);

      expect(code).toContain("https://");
    });
  });

  describe("Authentication handling", () => {
    it("should include api_key attribute when isAuth is false", () => {
      const code = getWidgetCode({
        ...baseOptions,
        isAuth: false,
      });

      expect(code).toContain('api_key="..."');
    });

    it("should not include api_key attribute when isAuth is true", () => {
      const code = getWidgetCode({
        ...baseOptions,
        isAuth: true,
      });

      expect(code).not.toContain("api_key");
    });

    it("should handle isAuth being undefined (defaults to falsy)", () => {
      const code = getWidgetCode({
        flowId: "test-flow",
        flowName: "Test",
        isAuth: undefined,
        webhookAuthEnable: false,
      });

      // When isAuth is undefined/falsy, api_key should be included
      expect(code).toContain('api_key="..."');
    });
  });

  describe("Copy mode handling", () => {
    it("should use the same placeholder format when copy is true", () => {
      const code = getWidgetCode({
        ...baseOptions,
        copy: true,
      });

      expect(code).toContain("Replace this placeholder");
      expect(code).toContain("<idrflow-chat");
    });

    it("should use the same placeholder format when copy is false", () => {
      const code = getWidgetCode({
        ...baseOptions,
        copy: false,
      });

      expect(code).toContain("Replace this placeholder");
      expect(code).toContain("<idrflow-chat");
    });

    it("should default to the placeholder format when copy is undefined", () => {
      const code = getWidgetCode({
        flowId: "test",
        flowName: "Test",
        isAuth: false,
        webhookAuthEnable: false,
      });

      expect(code).toContain("Replace this placeholder");
    });
  });

  describe("Code structure", () => {
    it("should have a placeholder HTML structure with a commented idrflow-chat tag", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).not.toContain("<script");
      expect(code).toContain("<idrflow-chat");
      expect(code).toContain("</idrflow-chat>");
      expect(code).toContain("<!--");
    });

    it("should have all required attributes in the placeholder component", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).toMatch(/window_title="[^"]*"/);
      expect(code).toMatch(/flow_id="[^"]*"/);
      expect(code).toMatch(/host_url="[^"]*"/);
    });

    it("should not reference the upstream CDN bundle", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).not.toContain("langflow-embedded-chat");
    });

    it("should identify the snippet as a placeholder", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).toContain("approved idrflow-owned embed bundle");
    });
  });

  describe("Edge cases", () => {
    it("should handle all parameters being empty strings", () => {
      const code = getWidgetCode({
        flowId: "",
        flowName: "",
        isAuth: false,
        webhookAuthEnable: false,
      });

      expect(code).toContain("<idrflow-chat");
      expect(code).toContain('window_title=""');
      expect(code).toContain('flow_id=""');
    });

    it("should handle minimum required parameters", () => {
      const code = getWidgetCode({
        flowId: "test",
        flowName: "Test",
        isAuth: false,
        webhookAuthEnable: false,
      });

      expect(code).toContain("<idrflow-chat");
      expect(code).toContain("</idrflow-chat>");
    });

    it("should produce consistent output for same inputs", () => {
      const code1 = getWidgetCode(baseOptions);
      const code2 = getWidgetCode(baseOptions);

      expect(code1).toBe(code2);
    });

    it("should handle flowId with slashes", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowId: "folder/subfolder/flow",
      });

      expect(code).toContain('flow_id="folder/subfolder/flow"');
    });

    it("should handle flowName with newlines", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "Line1\nLine2",
      });

      expect(code).toContain("window_title=");
    });
  });

  describe("Output format", () => {
    it("should return a string", () => {
      const code = getWidgetCode(baseOptions);

      expect(typeof code).toBe("string");
    });

    it("should not have leading or trailing whitespace issues", () => {
      const code = getWidgetCode(baseOptions);

      expect(code.trimStart()).toMatch(/^<!--/);
    });

    it("should be copyable HTML code", () => {
      const code = getWidgetCode({
        ...baseOptions,
        copy: true,
      });

      // Should be valid HTML-like syntax
      expect(code).toContain("<");
      expect(code).toContain(">");
      expect(code).not.toContain("undefined");
      expect(code).not.toContain("null");
    });
  });

  describe("Integration scenarios", () => {
    it("should work with typical production settings", () => {
      const code = getWidgetCode({
        flowId: "prod-flow-123",
        flowName: "Production Chat Bot",
        isAuth: true,
        webhookAuthEnable: false,
        copy: false,
      });

      expect(code).toContain('flow_id="prod-flow-123"');
      expect(code).toContain('window_title="Production Chat Bot"');
      expect(code).not.toContain("api_key");
    });

    it("should work with typical development settings", () => {
      const code = getWidgetCode({
        flowId: "dev-flow-456",
        flowName: "Dev Chat Bot",
        isAuth: false,
        webhookAuthEnable: false,
        copy: true,
      });

      expect(code).toContain('flow_id="dev-flow-456"');
      expect(code).toContain('window_title="Dev Chat Bot"');
      expect(code).toContain('api_key="..."');
    });

    it("should work when embedded in HTML documentation", () => {
      const code = getWidgetCode(baseOptions);

      // Should be valid HTML that can be embedded
      expect(code).not.toContain("{{");
      expect(code).not.toContain("}}");
      expect(code).not.toContain("${");
    });
  });
});
