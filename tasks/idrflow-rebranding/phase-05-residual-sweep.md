# Phase 05 — Residual Sweep and Final Verification

**상태:** 🟡 In Progress
**sweep 완료:** 2026-05-05 / **최종 수동 검증:** 미완료

---

## 변경 범위

Frontend, docs, backend 사용자 노출 문자열 최종 sweep.
Whitelist 밖 잔여 항목만 개별 처리했습니다.

---

## 최종 Residual Summary

| 범주 | 잔여 건수 | 분류 |
|------|---------|------|
| `src/frontend/src/` (snap 제외) | 84 | 전량 intentional residue |
| `src/frontend/public/` | 0 | 완료 |
| `src/frontend/index.html` | 0 | 완료 |
| `src/frontend/README.md` | 0 | 완료 |
| `docs/README.md` | 사용자 표면 0 / fenced code 예외 1 | `@langflow` import 경로 — whitelist |
| `docs/docs/` (current docs) | 49 | 전량 코드블록 내부 — whitelist |
| `docs/versioned_docs/` | 119 | 전량 외부 URL·코드 식별자 — whitelist |
| `docs/static/files/` | **1** (수정 후) | Python 임베딩 코드 — whitelist |

---

## 수정한 항목

| 파일 | 줄 | 변경 전 | 변경 후 |
|------|-----|---------|---------|
| `docs/static/files/Conversational_Notion_Agent.json` | 2976 | `"description"`: `...from Langflow tables...` | `...from idrflow tables...` |
| `docs/static/files/Conversational_Notion_Agent.json` | 3042 | `"info"`: `...use the Langflow tables.` | `...use the idrflow tables.` |
| `docs/static/files/Meeting_Notes_Agent.json` | 45 | `"Subir Notion Agent no Langflow Prod."` | `"Subir Notion Agent no idrflow Prod."` |

> 같은 `Conversational_Notion_Agent.json` 3035번 줄은 Python 소스코드 전체가 JSON 문자열로 임베딩된 `"value"` 필드.
> `from langflow.custom import Component` 등 Python import — **whitelist (임베딩 코드)**.

---

## Intentional Residue 최종 목록

| 분류 | 건수 | 이유 |
|------|------|------|
| `src/frontend/src/locales/` i18n 키 이름 (`builtWithLangflow`, `getLangflowDesktop`) | 21 | 내부 식별자 — 영구 whitelist |
| SVG/PNG 자산 임포트명 (`LangflowLogo`, `MCPLangflow`, `LangflowLogoColor`, `langflow_assistant`) | ~29 | 파일명 보존 — 자산 교체 시 변경 |
| 코드 주석 내 Langflow (비노출) | 6 | 사용자 표면 아님 |
| 함수·컴포넌트명 (`LangflowButtonRedirectTarget`, `LangflowCounts` 등) | 7 | 내부 식별자 |
| `t("modal.io.builtWithLangflow")` 등 i18n 키 참조 | 2 | 키 이름 — 값은 idrflow로 변경 완료 |
| Current docs 코드블록 49건 | 49 | whitelist (CLI·import·env var·예제 코드) |
| Versioned docs 외부 URL·SDK 식별자·코드 | 119 | whitelist (Phase 4 확인) |
| `com.LangflowDesktop`, `com.Langflow` | 다수 | 명시적 whitelist |
| `@Langflow` (YouTube 핸들) | 2 | 외부 조직명 whitelist |
| `docs/docusaurus.config.js` 리다이렉트 `/👋 Welcome-to-Langflow` | 1 | 레거시 URL 호환성 유지 |
| `Conversational_Notion_Agent.json` Python 코드 임베딩 (line 3035) | 1줄 | 임베딩 코드 whitelist |

---

## 검증 결과

### 잔여 건수 최종 확인 (2026-05-05)

```
frontend/src:   84  (전량 intentional residue)
current docs:   49  (전량 코드블록 — whitelist)
versioned docs: 119 (전량 whitelist)
static/files:    1  (Python 임베딩 코드 — whitelist)
```

### `make docs_build` (2026-05-05)

```
[SUCCESS] Generated static files in "build".
```

결과:
- **성공**
- broken anchor 경고 **0건**
- OpenAPI Sampler 경고 (pre-existing / out-of-scope) 잔류

### `make test_frontend` (2026-05-05)

```
Test Suites: 2 failed, 283 passed, 285 total
Tests:       2 failed, 4005 passed, 4007 total
```

실패 스위트 (기존 기준선 — Phase 1부터 동일):
- `src/modals/IOModal/components/chatView/__tests__/sort-sender-messages.test.ts`
- `src/utils/__tests__/dateTime.test.ts`

→ **신규 회귀 없음.** 두 파일 모두 리브랜딩 변경과 무관한 기존 오류.

---

## 수동 시나리오 체크

```
Frontend:
- [ ] 로그인 → 메인 → Playground → 로그아웃 전 경로
- [ ] API Keys, Store, MCP 페이지
- [ ] Share/IO modal
- [ ] Help/docs 링크

Docs:
- [x] docs 빌드 정적 파일 spot-check (Phase 4 완료)
- [ ] 현재 docs 홈 수동 UI 확인 (Phase 3 미완료 상태 그대로)
- [ ] 버전 전환 (1.8.0, 1.9.0) 수동 확인
```

> **Residual sweep code/doc cleanup: 완료** — 잔여 3건 수정, 빌드/테스트 재확인 완료.
> **Final verification: 진행 중** — Frontend 핵심 경로·current docs UI 수동 확인이 남아 있어 Phase 05는 아직 열려 있음.

---

## Phase 1–5 최종 상태 판정

| Phase | 이름 | 상태 | 근거 |
|-------|------|------|------|
| 0 | Baseline and Tracker Setup | ✅ Done | 완료 기준 충족 |
| 1 | Frontend Shell and Core Copy | 🔄 Re-opened | 코드 완료, UI 수동 확인 미실시 |
| 2 | Assets, Locales, and Link Centralization | 🟡 In Progress | SVG 자산 미확보 차단, 수동 확인 미실시 |
| 3 | Docs Site and Current Docs | 🟡 In Progress | docs_build 성공, 수동 UI 확인 미실시 |
| 4 | Versioned Docs and Public Repo Surface | ✅ Done | 수동 검증 완료 기록 있음 |
| 5 | Residual Sweep and Final Verification | 🟡 In Progress | 잔여 3건 수정·빌드/테스트 확인 완료, 최종 수동 검증 미완료 |

---

## 남은 리스크

| 항목 | 리스크 | 조치 |
|------|--------|------|
| SVG/PNG/ICO 자산 (Phase 2 차단) | 로고·파비콘이 여전히 Langflow 브랜드 이미지 | idrflow 로고 파일 확보 후 교체 |
| Frontend·docs 수동 UI 확인 미실시 | 런타임 edge case 미검출 가능성 | `make run_cli` 후 UI 직접 확인 |
| `LangflowButtonRedirectTarget` 함수 (urls.ts) | 함수명이 코드베이스에 노출 (사용자 표면 아님) | 리팩터링 선택적 |
