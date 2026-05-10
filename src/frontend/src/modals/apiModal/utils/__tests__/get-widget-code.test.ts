import type { GetCodeType } from "@/types/tweaks";
import getWidgetCode from "../get-widget-code";

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

  describe("live widget snippet", () => {
    it("returns the live script tag and widget element", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).toContain(
        'src="https://localhost:3000/embedded-chat/idrflow-chat.js"',
      );
      expect(code).toContain("<idrflow-chat");
      expect(code).toContain("</idrflow-chat>");
      expect(code).not.toContain("Publish-ready package coordinates");
      expect(code).not.toContain("<!--\n  <idrflow-chat");
    });

    it("references the embedded chat source repository", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).toContain(
        "http://218.50.209.93:9001/peter/idrflow-embedded-chat",
      );
    });

    it("interpolates flowName, flowId, and host_url in the live widget tag", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).toContain('window_title="Test Flow"');
      expect(code).toContain('flow_id="test-flow-123"');
      expect(code).toContain('host_url="https://localhost:3000"');
    });

    it("includes api_key only for private flow mode", () => {
      const privateCode = getWidgetCode({ ...baseOptions, isAuth: false });
      const publicCode = getWidgetCode({ ...baseOptions, isAuth: true });

      expect(privateCode).toContain('api_key="YOUR_API_KEY_HERE"');
      expect(privateCode).toContain("Replace YOUR_API_KEY_HERE");
      expect(publicCode).not.toContain("api_key=");
      expect(publicCode).toContain("same hostname");
    });

    it("produces identical output regardless of copy flag", () => {
      const codeCopyFalse = getWidgetCode({ ...baseOptions, copy: false });
      const codeCopyTrue = getWidgetCode({ ...baseOptions, copy: true });

      expect(codeCopyFalse).toBe(codeCopyTrue);
    });
  });

  describe("HTML attribute escaping", () => {
    it("escapes double quotes in flowName so the snippet stays well-formed", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: 'Widget with "quotes"',
      });

      expect(code).toContain('window_title="Widget with &quot;quotes&quot;"');
      expect(code).not.toContain('window_title="Widget with "quotes""');
    });

    it("escapes single quotes in flowName", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "It's a flow",
      });

      expect(code).toContain('window_title="It&#39;s a flow"');
    });

    it("escapes ampersands in flowName and flowId", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "A & B",
        flowId: "id&value",
      });

      expect(code).toContain('window_title="A &amp; B"');
      expect(code).toContain('flow_id="id&amp;value"');
    });

    it("escapes angle brackets to prevent markup injection", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "<img src=x onerror=alert(1)>",
        flowId: "</idrflow-chat>",
      });

      expect(code).not.toMatch(/<img\s+src=/);
      expect(code).toContain(
        'window_title="&lt;img src=x onerror=alert(1)&gt;"',
      );
      expect(code).toContain('flow_id="&lt;/idrflow-chat&gt;"');
      const closingTags = code.match(/<\/idrflow-chat>/g) ?? [];
      expect(closingTags).toHaveLength(1);
    });

    it("preserves non-special characters as-is", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "Plain Title 123 - ok",
        flowId: "550e8400-e29b-41d4-a716-446655440000",
      });

      expect(code).toContain('window_title="Plain Title 123 - ok"');
      expect(code).toContain('flow_id="550e8400-e29b-41d4-a716-446655440000"');
    });

    it("handles empty flowId and flowName safely", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowId: "",
        flowName: "",
      });

      expect(code).toContain('window_title=""');
      expect(code).toContain('flow_id=""');
    });

    it("handles unicode and emoji without breaking the snippet", () => {
      const code = getWidgetCode({
        ...baseOptions,
        flowName: "聊天小部件 🤖",
      });

      expect(code).toContain('window_title="聊天小部件 🤖"');
    });
  });

  describe("Output format", () => {
    it("returns a string starting with the source comment", () => {
      const code = getWidgetCode(baseOptions);

      expect(typeof code).toBe("string");
      expect(code.trimStart()).toMatch(/^<!--/);
    });

    it("does not contain unresolved template tokens", () => {
      const code = getWidgetCode(baseOptions);

      expect(code).not.toContain("{{");
      expect(code).not.toContain("}}");
      expect(code).not.toContain("${");
      expect(code).not.toContain("undefined");
      expect(code).not.toContain("null");
    });

    it("produces consistent output for identical inputs", () => {
      const a = getWidgetCode(baseOptions);
      const b = getWidgetCode(baseOptions);

      expect(a).toBe(b);
    });
  });
});
