import {
  BASE_URL_API,
  HEALTH_CHECK_URL,
} from "@/customization/config-constants";

export function getBaseUrl(): string {
  return BASE_URL_API || "/api/v1/";
}

export function getHealthCheckUrl(): string {
  return HEALTH_CHECK_URL || "/health";
}

export const LangflowButtonRedirectTarget = () => {
  return "https://idrflow.com"; // TODO: idrflow 도메인 확정 후 업데이트
};
