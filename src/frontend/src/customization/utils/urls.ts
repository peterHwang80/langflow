// Public brand URLs — canonical source of truth
// idrflow 도메인 확정 후 각 URL 업데이트 예정 (TODO 주석 참조)

export const GITHUB_URL = "https://github.com/langflow-ai/langflow"; // TODO: idrflow GitHub repo URL 확정 후 업데이트
export const TWITTER_URL = "https://x.com/langflow_ai"; // TODO: idrflow X/Twitter URL 확정 후 업데이트
export const DOCS_URL = "https://docs.langflow.org"; // TODO: idrflow docs URL 확정 후 업데이트
export const DESKTOP_URL = "https://www.langflow.org/desktop"; // TODO: idrflow Desktop URL 확정 후 업데이트
export const BUG_REPORT_URL = "https://github.com/langflow-ai/langflow/issues"; // TODO: idrflow GitHub Issues URL 확정 후 업데이트
export const STORE_URL = "https://langflow.store/"; // TODO: idrflow Store URL 확정 후 업데이트

export const LangflowButtonRedirectTarget = () => {
  return "https://idrflow.com"; // TODO: idrflow 도메인 확정 후 업데이트
};

// API URL helpers — canonical source: api-urls.ts
// 하위 호환성을 위해 re-export 유지
export { getBaseUrl, getHealthCheckUrl } from "@/customization/utils/api-urls";
