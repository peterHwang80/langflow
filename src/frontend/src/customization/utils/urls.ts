// Public brand URLs — canonical source of truth.
// The official docs live under the idrsoft docs host.
export const DOCS_URL = "https://docs.idrsoft.com/idrflow";
export const DESKTOP_URL = ""; // TODO: add the official idrflow Desktop download URL

export const IdrflowButtonRedirectTarget = () => {
  return "https://idrflow.com"; // TODO: replace when the production idrflow site is finalized
};

// API URL helpers — canonical source: api-urls.ts
// 하위 호환성을 위해 re-export 유지
export { getBaseUrl, getHealthCheckUrl } from "@/customization/utils/api-urls";
