# Phase 01 — Frontend Shell and Core Copy

**상태:** 🔄 Re-opened
**1차 작업:** 2026-05-03 / **보완 라운드:** 2026-05-03

---

## 변경 범위

앱 셸, 핵심 상수, 로그인/가입/헤더/채팅/설정/도움말/Store/API Key/MCP 관련 사용자 표면 문자열.
값(string value)만 바꾸고 상수명(identifier)은 유지합니다.
함께 깨지는 테스트 문자열과 snapshot도 이 Phase에서 정리합니다.

---

## 대상 파일 목록

### 앱 셸 / 핵심 진입점
- `src/frontend/index.html`
- `src/frontend/public/manifest.json`

### Constants / Alerts / Flow Constants
- `src/frontend/src/constants/constants.ts`
- `src/frontend/src/constants/alerts_constants.tsx`
- `src/frontend/src/flow_constants.tsx`

### Customization Layer
- `src/frontend/src/customization/constants.ts`
- `src/frontend/src/customization/components/custom-langflow-counts.tsx`
- `src/frontend/src/customization/components/custom-store-sidebar.tsx`
- `src/frontend/src/customization/utils/custom-poll-build-events.ts`
- `src/frontend/src/customization/utils/urls.ts`

### Pages — Login / Signup / Admin / Account
- `src/frontend/src/pages/LoginPage/index.tsx`
- `src/frontend/src/pages/SignUpPage/index.tsx`
- `src/frontend/src/pages/DeleteAccountPage/index.tsx`
- `src/frontend/src/pages/AdminPage/LoginPage/index.tsx`

### Pages — Main / Empty State
- `src/frontend/src/pages/MainPage/pages/empty-page.tsx`
- `src/frontend/src/pages/MainPage/pages/emptyPage/index.tsx`
- `src/frontend/src/pages/MainPage/pages/homePage/components/McpAutoInstallContent.tsx`
- `src/frontend/src/pages/MainPage/pages/deploymentsPage/components/deployment-stepper-modal.tsx`
- `src/frontend/src/pages/MainPage/pages/deploymentsPage/components/type-to-confirm-delete-dialog.tsx`

### Pages — Settings / Playground
- `src/frontend/src/pages/SettingsPage/index.tsx`
- `src/frontend/src/pages/SettingsPage/pages/ApiKeysPage/helpers/get-modal-props.tsx`
- `src/frontend/src/pages/SettingsPage/pages/McpClientPage/index.tsx`
- `src/frontend/src/pages/Playground/index.tsx`

### Components — Header / Chat / Canvas
- `src/frontend/src/components/core/appHeaderComponent/index.tsx`
- `src/frontend/src/components/core/appHeaderComponent/components/langflow-counts.tsx`
- `src/frontend/src/components/core/canvasControlsComponent/CanvasControls.tsx`
- `src/frontend/src/components/core/canvasControlsComponent/HelpDropdownView.tsx`
- `src/frontend/src/components/core/folderSidebarComponent/components/sideBarFolderButtons/components/mcp-server-notice.tsx`

### Components — Crash / Share / Templates
- `src/frontend/src/components/common/crashErrorComponent/index.tsx`

### Modals
- `src/frontend/src/modals/shareModal/index.tsx`
- `src/frontend/src/modals/templatesModal/components/GetStartedComponent/index.tsx`
- `src/frontend/src/modals/IOModal/playground-modal.tsx`
- `src/frontend/src/modals/IOModal/components/chatView/chatMessage/components/chat-logo-icon.tsx`
- `src/frontend/src/modals/IOModal/components/chatView/components/chat-view.tsx`

### Playground Component
- `src/frontend/src/components/core/playgroundComponent/chat-view/chat-messages/components/bot-message-logo.tsx`
- `src/frontend/src/components/core/playgroundComponent/chat-view/chat-messages/components/bot-message.tsx`

### Assistant Panel
- `src/frontend/src/components/core/assistantPanel/assistant-panel.constants.ts`
- `src/frontend/src/components/core/assistantPanel/components/assistant-empty-state.tsx`
- `src/frontend/src/components/core/assistantPanel/components/assistant-no-models-state.tsx`
- `src/frontend/src/components/core/assistantPanel/components/assistant-message.tsx`

### API Queries
- `src/frontend/src/controllers/API/queries/assistant/use-template-assistant.ts`
- `src/frontend/src/controllers/API/queries/assistant/use-system-message-gen.ts`
- `src/frontend/src/controllers/API/queries/deployments/use-get-deployment-attachments.ts`

### Utils
- `src/frontend/src/utils/buildUtils.ts`
- `src/frontend/src/utils/reactflowUtils.ts`
- `src/frontend/vite.config.mts`

### Tests (문자열 일치 수정)
- `src/frontend/src/components/core/canvasControlsComponent/__tests__/CanvasControls.test.tsx`
- `src/frontend/src/components/core/playgroundComponent/chat-view/chat-messages/components/__tests__/chat-message.test.tsx`
- `src/frontend/src/components/core/assistantPanel/__tests__/assistant-panel.constants.test.ts`
- `src/frontend/src/components/core/assistantPanel/components/__tests__/assistant-input.test.tsx`
- `src/frontend/src/components/core/assistantPanel/components/__tests__/assistant-header.test.tsx`
- `src/frontend/src/components/core/assistantPanel/components/__tests__/assistant-message.test.tsx`

---

## 완료 기준 (재정의 — 보완 라운드 기준)

이번 Phase 1은 **영어(en) 기준 핵심 UX 표면 문구 정리**를 범위로 한다.

**이번 라운드에서 Done으로 인정하는 것:**
- 앱 셸(index.html, manifest.json) `idrflow` 전환
- `src/frontend/src/locales/en.json` 핵심 UX 문자열 `idrflow` 전환
- 하드코딩 문자열 값(상수명 유지, 값만 변경) 전환
- 로고 alt/title 속성값 전환
- 영향받는 테스트 assertion 문자열 전환

**이번 라운드에서 Done으로 인정하지 않는 것 (Phase 2 이관):**
- 다국어 로케일(`de.json`, `es.json`, `fr.json`, `ja.json`, `pt.json`, `zh-Hans.json`) 미수정
- 공개 링크 목적지 미전환 (아래 "링크 임시 예외" 참조)
- 로고/favicon/PWA 아이콘 파일 내용 미교체

**링크 임시 예외 — Phase 2 이전까지 의도적 미수정:**

| 상수 / 위치 | 현재 URL | 사유 |
|-------------|----------|------|
| `GITHUB_URL` (`constants.ts`) | `https://github.com/langflow-ai/langflow` | 도메인 미확정 |
| `TWITTER_URL` (`constants.ts`) | `https://twitter.com/langflow_ai` | 도메인 미확정 |
| `DOCS_URL` (`constants.ts`) | `https://docs.langflow.org` | 도메인 미확정 |
| `DESKTOP_URL` (`constants.ts`) | `https://langflow.org/...` | 도메인 미확정 |
| `BUG_REPORT_URL` (`constants.ts`) | `https://github.com/langflow-ai/...` | 도메인 미확정 |
| 하드코딩 `docs.langflow.org` 링크 | — | 범위 외 |
| 하드코딩 GitHub Issues 링크 | — | 범위 외 |

→ 이 항목들은 Phase 2 Link Centralization 에서 설정 상수로 모으고 TODO 명시 예정.

**수동 검증:** 미완료 (Phase 1 보완 라운드 종료 후 `make run_cli`로 확인 필요)

---

## 검증 명령

```bash
# 잔여 건수 확인
rg "Langflow" src/frontend/src/ src/frontend/public/ src/frontend/index.html \
  --glob '!*.test.*' --glob '!__tests__/*'

# 포맷 / 린트
make format_frontend_check

# 테스트
make test_frontend
# 또는 변경 파일 범위만
# make test_frontend_file path=<changed test file>
```

---

## 수동 확인 결과

> 미완료 (Phase 1 종료 후 `make run_cli`로 수동 확인 필요)

```
make run_cli 후:
- [ ] 로그인 페이지
- [ ] 회원가입 페이지
- [ ] 메인 헤더
- [ ] Empty state
- [ ] Playground
- [ ] API Keys 설정
- [ ] Store
- [ ] MCP Client
- [ ] Share/I/O modal
- [ ] Help/docs 링크
```

---

## 잔여 검색 결과 (intentional residue)

2026-05-03 보완 라운드 기준.

### 1. 내부 식별자 (심볼명 — 영구 유지)

| 패턴 | 위치 | 이유 |
|------|------|------|
| `LangflowLogo`, `LangflowLogoColor` | import 심볼명 (여러 파일) | SVG 컴포넌트 식별자 — 파일명/심볼 변경 없이 내용만 교체(Phase 2) |
| `LangflowCounts`, `CustomLangflowCounts` | `langflow-counts.tsx`, `custom-langflow-counts.tsx` | 컴포넌트 심볼명 |
| `langflowAssistantIcon` | import 변수명 | 자산 변수명 |
| `MCPLangflow` | import 변수명 | PNG 자산 변수명 (Phase 2 내용 교체) |
| `LangflowButtonRedirectTarget` | `urls.ts` 함수명 | 내부 식별자 (URL 값은 idrflow.com으로 변경 완료) |
| `LangflowButtonClick` | `playground-modal.tsx` 함수명 | 내부 식별자 / analytics 이벤트명 |

### 2. Whitelist (절대 변경 불가)

| 패턴 | 위치 | 이유 |
|------|------|------|
| `LANGFLOW_*` 상수명 | `constants.ts` | whitelist — 환경변수/상수 식별자 |

### ~~이전 Whitelist — 변경 완료~~

| 패턴 | 변경 후 | 비고 |
|------|---------|------|
| ~~`X-Langflow-Global-Var-*`~~ | `X-Idrflow-Global-Var-*` | breaking change로 즉시 교체 |
| ~~`langflow-assistant-session-*`~~ | 삭제 | live consumer 없는 dead prefix — export 및 테스트 제거 |

### 3. i18n 키 이름 (키 이름 유지 — 값 변경 완료)

| i18n 키 | 상태 |
|---------|------|
| `modal.io.builtWithLangflow` | 키 유지, en 값 → "Built with idrflow" ✅, 비영어 → Phase 2 deferred |
| `modal.io.builtWithLangflowTooltip` | 키 유지, en 값 → "Built with idrflow" ✅, 비영어 → Phase 2 deferred |
| `help.getLangflowDesktop` | 키 유지, en 값 → "Get idrflow Desktop" ✅, 비영어 → Phase 2 deferred |

### 4. 공개 링크 (임시 예외 — Phase 2 이관)

`GITHUB_URL`, `TWITTER_URL`, `DOCS_URL`, `DESKTOP_URL`, `BUG_REPORT_URL` 및 하드코딩된 `docs.langflow.org` 링크.
→ idrflow 도메인 미확정으로 이번 라운드 미수정. Phase 2 Link Centralization에서 처리.

### 5. 사용자 표면 아닌 항목 (코드 주석 / 내부 문서)

| 파일 | 내용 | 이유 |
|------|------|------|
| `deployment-stepper-modal.tsx` | "Langflow database", "Langflow flow name" 주석 | 내부 구현 설명 주석 |
| `reactflowUtils.ts` | "entire Langflow project" 주석 | 기여자 헌정 주석 |
| `use-get-deployment-attachments.ts` | JSDoc 주석 | 내부 API 설명 |
| `playgroundAuthGate/docs/*.md` | "Langflow AI flow builder" | 내부 개발 문서 |
| `assistant-message.test.tsx` (fixture) | "Langflow is a visual flow builder." | mock AI 응답 — 테스트 fixture |
