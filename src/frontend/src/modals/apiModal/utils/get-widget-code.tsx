import { customGetHostProtocol } from "@/customization/utils/custom-get-host-protocol";
import type { GetCodeType } from "@/types/tweaks";

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function getWidgetCode({
  flowId,
  flowName,
  isAuth,
}: GetCodeType): string {
  const { protocol, host } = customGetHostProtocol();

  const safeFlowName = escapeHtmlAttribute(flowName ?? "");
  const safeFlowId = escapeHtmlAttribute(flowId ?? "");
  const safeHostUrl = escapeHtmlAttribute(`${protocol}//${host}`);

  return `<!-- idrflow embedded chat package is not published yet.
Replace this placeholder with your approved idrflow-owned embed bundle and web component. -->
<!--
  <idrflow-chat
    window_title="${safeFlowName}"
    flow_id="${safeFlowId}"
    host_url="${safeHostUrl}"${
      !isAuth
        ? `
    api_key="..."`
        : ""
    }>
</idrflow-chat>
-->`;
}
