import { customGetHostProtocol } from "@/customization/utils/custom-get-host-protocol";
import type { GetCodeType } from "@/types/tweaks";

/**
 * Function to get the widget code for the API
 * @param {string} flow - The current flow.
 * @returns {string} - The widget code
 */
export default function getWidgetCode({
  flowId,
  flowName,
  isAuth,
  copy = false,
}: GetCodeType): string {
  void copy;

  const { protocol, host } = customGetHostProtocol();

  return `<!-- idrflow embedded chat package is not published yet.
Replace this placeholder with your approved idrflow-owned embed bundle and web component. -->
<!--
  <idrflow-chat
    window_title="${flowName}"
    flow_id="${flowId}"
    host_url="${protocol}//${host}"${
      !isAuth
        ? `
    api_key="..."`
        : ""
    }>
</idrflow-chat>
-->`;
}
