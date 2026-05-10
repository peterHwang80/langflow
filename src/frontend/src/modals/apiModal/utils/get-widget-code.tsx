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
  const usesPublicFlowMode = Boolean(isAuth);

  const safeFlowName = escapeHtmlAttribute(flowName ?? "");
  const safeFlowId = escapeHtmlAttribute(flowId ?? "");
  const hostUrl = `${protocol}//${host}`;
  const safeHostUrl = escapeHtmlAttribute(hostUrl);
  const safeScriptUrl = escapeHtmlAttribute(
    `${hostUrl}/embedded-chat/idrflow-chat.js`,
  );

  return `<!-- idrflow embedded chat source:
http://218.50.209.93:9001/peter/idrflow-embedded-chat -->
<script type="module" src="${safeScriptUrl}"></script>

<!-- ${usesPublicFlowMode ? "Public flow mode requires this page and host_url to share the same hostname so the client_id cookie can be sent." : "Replace YOUR_API_KEY_HERE with an API key that can access this private flow."} -->
<idrflow-chat
  window_title="${safeFlowName}"
  flow_id="${safeFlowId}"
  host_url="${safeHostUrl}"${
    usesPublicFlowMode
      ? ""
      : `
  api_key="YOUR_API_KEY_HERE"`
  }
></idrflow-chat>`;
}
