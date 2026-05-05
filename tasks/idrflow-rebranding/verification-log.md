# Verification Log

Phase별 검증 결과를 날짜와 함께 누적 기록합니다.

---

## Phase 00 — Baseline (2026-05-03)

### 검색 기준선

| 범주 | 건수 | 파일 수 |
|------|------|---------|
| Frontend "Langflow" | 315 | 81 |
| Current docs "Langflow" | 1,886 | 188 |
| Versioned docs "Langflow" | 3,067 | 250 |
| Locale "Langflow" (7개 언어 × 19) | 133 | 7 |
| Python imports `langflow` (whitelist) | ~62 | ~27 |

### Git Remote

```
origin  https://github.com/peterHwang80/langflow.git (fetch)
origin  https://github.com/peterHwang80/langflow.git (push)
upstream: 없음
```

### 디렉토리 구조 확인

```
tasks/idrflow-rebranding/
├── README.md                        ✅
├── phase-00-baseline-and-rules.md   ✅
├── phase-01-frontend-shell.md       ✅
├── phase-02-assets-locales-links.md ✅
├── phase-03-docs-current.md         ✅
├── phase-04-versioned-docs.md       ✅
├── phase-05-residual-sweep.md       ✅
└── verification-log.md              ✅
```

**결과: Phase 00 완료 기준 충족.**

---

## Phase 01 — Frontend Shell (🔄 Re-opened)

### 1차 작업: 2026-05-03 / 보완 라운드: 2026-05-03

### 변경 파일 수

- 1차: 37개 (하드코딩 문자열, alt/title, 테스트 assertion)
- 보완 1: +1개 (`src/frontend/src/locales/en.json` — 19개 키 값 변경)

### 잔여 건수 (보완 라운드 후 기준)

```bash
rg -c "Langflow" src/frontend/src/ src/frontend/public/ src/frontend/index.html \
  --glob '!**/*.snap' --glob '!**/locales/*' \
  | awk -F: '{s+=$2} END {print "Total:", s}'
```
결과: **~190건** (locales 제외) — 전량 intentional residue (phase-01에 표 문서화 완료)

```bash
grep -c "Langflow" src/frontend/src/locales/en.json
```
결과: **3건** — 모두 i18n **키 이름** (`modal.io.builtWithLangflow`, `help.getLangflowDesktop`); 값은 모두 idrflow로 변경 완료.

### 주요 변경 내용

**1차 (하드코딩 문자열):**

| 범주 | 변경 전 | 변경 후 |
|------|---------|---------|
| `index.html` title | `"Langflow"` | `"idrflow"` |
| `manifest.json` name/short_name | `"Langflow"` | `"idrflow"` |
| `LANGFLOW_CHAT_TITLE` 값 | `"Langflow Chat"` | `"idrflow Chat"` |
| `STORE_TITLE` 값 | `"Langflow Store"` | `"idrflow Store"` |
| `ASSISTANT_TITLE` 값 | `"Langflow Assistant"` | `"idrflow Assistant"` |
| Crash error 버튼 | `"Restart Langflow"` | `"Restart idrflow"` |
| MCP Client 타이틀/설명 | `"Langflow MCP Client"` | `"idrflow MCP Client"` |
| Playground `document.title` fallback | `"Langflow"` | `"idrflow"` |
| `urls.ts` redirect URL | `"https://langflow.org"` | `"https://idrflow.com"` (TODO) |
| Logo title/alt 속성 (~10건) | `"Langflow logo/Logo/Assistant"` | `"idrflow ..."` |
| assistant placeholder | `"Ask me anything about Langflow..."` | `"Ask me anything about idrflow..."` |
| 테스트 assertion (6개 파일) | `"Langflow Assistant"` 등 | `"idrflow Assistant"` 등 |

**보완 라운드 (en.json — 19개 키 값):**

| 키 | 변경 전 값 | 변경 후 값 |
|----|-----------|-----------|
| `errors.noApiKey` | `"...use the Langflow Store."` | `"...use the idrflow Store."` |
| `errors.invalidApiKey` | `"...use the Langflow Store."` | `"...use the idrflow Store."` |
| `dialog.codePrompt` | `"Refer to the Langflow documentation..."` | `"Refer to the idrflow documentation..."` |
| `settings.apiPageParagraph` | `"...Langflow API keys..."` | `"...idrflow API keys..."` |
| `store.title` | `"Langflow Store"` | `"idrflow Store"` |
| `store.insertApiKey` | `"Insert your Langflow API key."` | `"Insert your idrflow API key."` |
| `misc.chatTitle` | `"Langflow Chat"` | `"idrflow Chat"` |
| `auth.loginTitle` | `"Sign in to Langflow"` | `"Sign in to idrflow"` |
| `auth.signupTitle` | `"Sign up for Langflow"` | `"Sign up for idrflow"` |
| `settings.generalDescription` | `"...related to Langflow..."` | `"...related to idrflow..."` |
| `settings.languageDescription` | `"...the Langflow interface."` | `"...the idrflow interface."` |
| `settings.apiKeysTitle` | `"Langflow API Keys"` | `"idrflow API Keys"` |
| `modal.io.builtWithLangflow` | `"Built with Langflow"` | `"Built with idrflow"` |
| `modal.io.builtWithLangflowTooltip` | `"Built with Langflow"` | `"Built with idrflow"` |
| `storeApiKey.title` | `"Langflow Store"` | `"idrflow Store"` |
| `storeApiKey.description` | `"Manage access to the Langflow Store."` | `"Manage access to the idrflow Store."` |
| `page.welcomeTitle` | `"Welcome to Langflow"` | `"Welcome to idrflow"` |
| `settings.description` | `"...settings for Langflow."` | `"...settings for idrflow."` |
| `help.getLangflowDesktop` | `"Get Langflow Desktop"` | `"Get idrflow Desktop"` |

### 빌드/테스트 결과 (2026-05-03 실행)

**`make format_frontend_check`:**
```
Found 1139 errors. Found 174 warnings.
make: *** [format_frontend_check] Error 1
```
→ **실패** — 저장소 전반의 기존 Biome 오류(1139건)가 다수 존재하며, 이번 리브랜딩 변경과 직접 관련 없는 기존 상태임. 이번 변경만의 문제로 단정 불가.

**`make test_frontend`:**
```
Test Suites: 2 failed, 283 passed, 285 total
Tests:       2 failed, 4005 passed, 4007 total
```
실패 스위트:
- `src/modals/IOModal/components/chatView/__tests__/sort-sender-messages.test.ts`
- `src/utils/__tests__/dateTime.test.ts`

→ **기존 실패로 분류** — 두 파일 모두 이번 리브랜딩 변경과 무관한 기존 오류. 리브랜딩 관련 테스트(assistant-panel, CanvasControls 등)는 모두 통과.

### 수동 검증

> **미완료** — `make run_cli` 후 UI 수동 확인 미실시. 수동 검증 완료 전까지 Done 표기 불가.

---

## Phase 02 — Assets, Locales, Links (🟡 In Progress)

### 현재 상태

- **완료된 하위 작업:** Sub-task A (로케일), B (URL 중앙화), C (하드코딩 URL 치환), E (로그 갱신)
- **차단 요소:** Sub-task D — idrflow 로고 파일 미확보, SVG/PNG/ICO 자산 교체 불가
- **수동 검증:** 미완료

### 1차 작업: 2026-05-03 / 보완 라운드: 2026-05-03

### 변경 파일 수

**1차 (Sub-task A/C):**
- 로케일 JSON: 6개 (de/es/fr/ja/pt/zh-Hans) × 19키 = **114줄 변경**
- 컴포넌트/모달 (하드코딩 URL 상수 교체): **7개**
  - `crashErrorComponent/index.tsx` — `BUG_REPORT_URL` 도입, 2곳 교체
  - `saveChangesModal/index.tsx` — `DOCS_URL` 도입, 1곳 교체
  - `playgroundComponent/chat-view/chat-input/components/no-input.tsx` — `DOCS_URL` 1곳 교체
  - `IOModal/components/chatView/chatInput/components/no-input.tsx` — `DOCS_URL` 1곳 교체
  - `McpJsonContent.tsx` — `DOCS_URL` 1곳 교체
  - `McpServerTab.tsx` — `DOCS_URL` 1곳 교체
  - `StoreApiKeyForm.tsx` — `STORE_URL` 도입, href 교체, 표시 텍스트 `langflow.store` → `idrflow Store`

**보완 라운드 1 (Sub-task B — URL 중앙화 완성):**
- `src/customization/utils/api-urls.ts` (신규) — getBaseUrl / getHealthCheckUrl
- `src/customization/utils/urls.ts` (리작성) — 공개 브랜드 URL canonical source
- `src/constants/constants.ts` — URL 직접 정의 제거, urls.ts에서 re-export로 교체
- `src/customization/config-constants.ts` — DOCS_LINK literal 제거 (사용처 없음)

**보완 라운드 2 (Biome 정리):**
- `src/modals/IOModal/components/chatView/chatInput/components/no-input.tsx` — 미사용 import 6개 제거 (`useEffect`, `useRef`, `useState`, `IconComponent`, `ICON_STROKE_WIDTH`, `cn`)
- `src/components/common/crashErrorComponent/index.tsx` — import 순서 수정 (organizeImports)
- `src/modals/saveChangesModal/index.tsx` — import 순서 수정
- `src/pages/MainPage/pages/homePage/components/McpJsonContent.tsx` — import 순서 수정
- `src/pages/MainPage/pages/homePage/components/McpServerTab.tsx` — import 순서 수정
- `src/pages/SettingsPage/pages/StoreApiKeyPage/components/StoreApiKeyForm.tsx` — import 순서 수정

### URL 중앙화 최종 구조

```
urls.ts         ← 공개 브랜드 URL literals 유일한 정의 위치 (GITHUB_URL, DOCS_URL 등)
api-urls.ts     ← getBaseUrl / getHealthCheckUrl (config-constants 의존)
constants.ts    ← urls.ts에서 re-export (직접 literal 없음)
config-constants.ts ← URL literal 없음
```

### 잔여 검색 결과 (보완 라운드 기준)

```bash
rg "Langflow" src/frontend/src/locales/ --glob '!en.json'
```
결과: **18건** — 모두 i18n 키 이름 (`modal.io.builtWithLangflow`, `help.getLangflowDesktop` 등) — 값 변경 완료

```bash
rg -n 'https://docs\.langflow\.org|https://github\.com/langflow-ai/langflow/issues|https://github\.com/langflow-ai/langflow|https://x\.com/langflow_ai|https://langflow\.store/' \
  src/frontend/src/ --glob '!**/urls.ts'
```
결과: **4건** — 모두 의도된 잔류
- `compute-section-visibility.test.ts:110`: 코드 주석 (기능 코드 아님)
- `mockAPIData.ts:38`: 테스트 목 데이터
- `Dropdowns.test.tsx:44,103`: 테스트 목 URL 값
- `no-input.test.tsx:80`: 테스트 assertion 값

```bash
rg -n 'DOCS_LINK' src/frontend/src/
```
결과: **0건** — DOCS_LINK 완전 제거됨

### 빌드/테스트 결과 (2026-05-03 보완 라운드 2 기준)

**`make format_frontend_check`:**
```
Found 1140 errors. Found 174 warnings.
```
→ **실패** — 기준선 (Phase 1: 1139건)과 거의 동일한 기존 Biome 오류. Phase 2 회귀로 단정 불가.

**Phase 2 수정 파일 개별 Biome 체크 (보완 라운드 2 완료 기준, 총 17개 파일):**

```
npx @biomejs/biome check \
  src/customization/utils/urls.ts \
  src/customization/utils/api-urls.ts \
  src/constants/constants.ts \
  src/customization/config-constants.ts \
  src/locales/de.json src/locales/es.json src/locales/fr.json \
  src/locales/ja.json src/locales/pt.json src/locales/zh-Hans.json \
  src/components/core/playgroundComponent/chat-view/chat-input/components/no-input.tsx
→ Checked 11 files. No fixes applied. (오류 0건)

npx @biomejs/biome check \
  src/modals/IOModal/components/chatView/chatInput/components/no-input.tsx \
  src/components/common/crashErrorComponent/index.tsx \
  src/modals/saveChangesModal/index.tsx \
  src/pages/MainPage/pages/homePage/components/McpJsonContent.tsx \
  src/pages/MainPage/pages/homePage/components/McpServerTab.tsx \
  src/pages/SettingsPage/pages/StoreApiKeyPage/components/StoreApiKeyForm.tsx
→ Found 2 errors (pre-existing): McpServerTab.tsx noUnusedVariables(isOAuthProject),
  StoreApiKeyForm.tsx noExplicitAny(×2) — Phase 2 신규 오류 0건
```

→ **Phase 2 수정 파일 전체 17개 기준: 신규 Biome 오류 0건.** 잔류 2건은 Phase 2 이전부터 존재한 pre-existing 오류.

**`make test_frontend`:**
```
Test Suites: 2 failed, 283 passed, 285 total
Tests:       2 failed, 4005 passed, 4007 total
```
실패 스위트:
- `src/modals/IOModal/components/chatView/__tests__/sort-sender-messages.test.ts`
- `src/utils/__tests__/dateTime.test.ts`

→ **Phase 1 기준선과 동일** (unchanged baseline failure). Phase 2 신규 회귀 없음.

### 수동 검증

> **미완료** — `make run_cli` 후 UI 수동 확인 필요

### 의도된 미수정 (Intentional Residue)

| 항목 | 이유 |
|------|------|
| SVG/PNG/ICO 자산 8개 | idrflow 로고 파일 미확보 — 파일 준비 후 내용 교체 예정 |
| URL 상수 값 (GITHUB_URL 등) | idrflow 도메인 미확정 — urls.ts에 TODO 주석 명시 |
| i18n 키 이름 (builtWithLangflow 등) | 내부 식별자 — 영구 유지 |
| 테스트 파일 URL 문자열 | 테스트 목 / assertion 값 — 기능 코드 아님 |
| `api.tsx` lines 103-105 | GitHub API 엔드포인트 whitelist — 기능 코드, 사용자 표면 아님 |

---

## Phase 03 — Current Docs (🟡 In Progress)

### 1차 작업: 2026-05-03

### 변경 파일 수

- `docs/docusaurus.config.js`: 7건 수정 (title, tagline, navbar alt, data-platform-title×3, footer)
- `docs/static/llms.txt`: 10건 수정
- `docs/static/llms-full.txt`: 14건 수정
- `docs/docs/**` MDX: **184개 파일** 수정 (Python fence-tracking 스크립트)
- `docs/docs/` 8개 헤딩에 explicit anchor ID 추가 (broken anchor 수정)

### 잔여 검색 결과

```bash
rg -c "Langflow" docs/docs/ | awk -F: '{s+=$2} END {print "Total:", s}'
→ 49건 / 16개 파일 (전량 코드블록 내부 — whitelist 준수)

grep -c "Langflow" docs/static/llms.txt docs/static/llms-full.txt
→ 1건, 1건 (YouTube URL @Langflow — 의도된 잔류)

grep -c "Langflow" docs/docusaurus.config.js
→ 2건 (코드 주석·리다이렉트 경로 — 의도된 잔류)
```

### 빌드 결과

**1차 (`make docs_build`, 2026-05-03):**
```
[SUCCESS] Generated static files in "build".
```
→ **성공.** 단, 산문 치환으로 헤딩 텍스트가 변경된 8개 헤딩에서 broken anchor 경고 발생.
(링크 대상 anchor가 `#langflow-...` → Docusaurus auto-ID `#idrflow-...`로 변경된 결과)

**보완 라운드 1 (2026-05-03):**
- 8개 헤딩에 `{#langflow-...}` 명시적 anchor ID 추가 → backward-compatible anchor 유지
- `docs/docs/API-Reference/api-openai-responses.mdx` — `#global-var` 헤딩 누락 복구
  (`## Pass global variables to your flows in headers {#global-var}` 추가)

**보완 라운드 1 후 빌드 확인:**
`/api-openai-responses#global-var`, `/release-notes` 경고가 여전히 발생.
원인: `docs/docs/`는 `path: "next"` (next 버전), 기본 라우트(`/`)는 `lastVersion: "1.9.0"`이므로
`docs/versioned_docs/version-1.9.0/**`가 실제 기본 docs로 서빙됨.

**보완 라운드 2 (2026-05-03):**
- `docs/versioned_docs/version-1.9.0/API-Reference/api-openai-responses.mdx` — `#global-var` 헤딩 복구
  (`## Pass global variables to your flows in headers {#global-var}` 추가)

**보완 라운드 2 후 `make docs_build` 재실행 (2026-05-04 확인):**
```
[SUCCESS] Generated static files in "build".
```
→ **성공.** current docs (`/`, `/next/`) broken anchor 경고 **0건**.
이전 재검증 실패 원인: 변경이 uncommitted 상태여서 별도 worktree(HEAD 기준) 빌드에서는 수정 전 파일이 사용됐음.

**잔류 경고 (1.8.0 versioned docs — pre-existing / Phase 4 scope):**
```
Broken anchor on source page path = /1.8.0/agent-tutorial: ...
Broken anchor on source page path = /1.8.0/api-request: ...
(외 1.8.0/ prefix 경고 다수)
```
→ Phase 3 이전부터 존재하는 기존 경고. Phase 4 (versioned docs) 에서 처리 예정.

### 수동 검증

> **미완료** — `cd docs && npm start` 후 UI 직접 확인 필요

### 의도된 잔류

| 항목 | 이유 |
|------|------|
| `docusaurus.config.js` url, Algolia indexName | 도메인 미확정, Algolia 외부 서비스 |
| `docusaurus.config.js` 코드 주석, 리다이렉트 경로 | 내부 식별자 |
| `docs/static/CNAME` | 도메인 미확정 |
| `docs/static/llms*.txt` YouTube URL | 외부 URL 미확정 |
| `docs/src/plugins/segment/` 2건 | 분석 서비스 식별자 |
| 코드블록 내 49건 | whitelist — CLI/환경변수/import |
| `docs/static/files/*.json` | Phase 5 선별 수정 예정 |

---

## Phase 04 — Versioned Docs (✅ Done)

### 현재 상태

- **전략:** `version-1.8.0` 문서는 비노출하지 않고 계속 노출 유지
- **완료된 하위 작업:** README 표면 정리, versioned sidebars 정리, `version-1.8.0`/`1.9.0` prose 정리, broken anchor backward-compatibility 복구, `make docs_build` 재검증, 로컬 정적 빌드 spot-check
- **수동 검증:** 완료

### 1차 작업: 2026-05-05

### 변경 파일 수

- 루트 `README.md`: 1개
- `docs/versioned_sidebars/*.json`: 2개
- `docs/versioned_docs/version-1.8.0/**/*.mdx`, `version-1.9.0/**/*.mdx`: **358개 MDX 파일**
- `src/frontend/README.md`: 사용자 표면 브랜드 잔여 0건 확인, 수정 없음
- `docs/README.md`: 사용자 표면 브랜드 잔여 0건 확인, fenced code 내 `@langflow` import 경로 유지

### 핵심 변경 내용

1. **Public Repo Surface**
   - 루트 `README.md` Hero / Desktop / Quickstart / Deployment / Contribute 문구를 `idrflow` 기준으로 정리
   - Twitter badge label을 `Follow @idrflow`로 조정

2. **Versioned Sidebars**
   - `About Langflow`, `Install Langflow`, `Langflow deployment overview` 등 label 정리
   - sidebar ad의 `Download Langflow Desktop` → `Download idrflow Desktop`

3. **Versioned Docs Prose**
   - `version-1.8.0`, `version-1.9.0` MDX 본문에서 코드블록 밖 prose/heading/title/alt/link text를 `idrflow` 기준으로 정리
   - fenced code, `LangflowClient`, `LANGFLOW_*`, `langflow-chat`, 외부 URL 값은 유지

4. **Anchor 호환성 복구**
   - `#langflow-json-file-contents`
   - `#serve-flows-through-a-langflow-mcp-server`
   - `#install-langflow-from-source`
   - `#run-langflow-from-source`
   - `#set-up-your-langflow-development-environment`
   - `#create-a-langflow-api-key`
   - `#start-a-langflow-server-with-authentication-enabled`
   - `#connect-langflow-to-a-local-postgresql-database`
   - `#set-environment-variables-for-langflow-desktop`
   - `#install-and-run-langflow-desktop`
   - `#install-and-run-the-langflow-oss-python-package`

5. **1.8.0 Data Type Links**
   - `/data-types#data` → `/data-types#json`
   - `/data-types#dataframe` → `/data-types#table`

### 잔여 검색 결과

```bash
rg -n 'About Langflow|Install Langflow|Trigger flows with the Langflow API|Build components with Langflow Assistant|Use Langflow data types|Use the Langflow CLI|Langflow deployment overview|Download Langflow Desktop' \
  README.md docs/versioned_sidebars/version-1.8.0-sidebars.json docs/versioned_sidebars/version-1.9.0-sidebars.json \
  docs/versioned_docs/version-1.8.0 docs/versioned_docs/version-1.9.0 --glob '*.mdx'
```
결과: **0건**

```bash
rg -n 'Langflow|docs\.langflow\.org|langflow-ai|langflow_ai|@Langflow' \
  README.md src/frontend/README.md docs/README.md \
  docs/versioned_sidebars \
  docs/versioned_docs/version-1.9.0 \
  docs/versioned_docs/version-1.8.0
```
결과: **323 lines**

분류:
- 실제 외부 URL/조직/핸들 (`langflow-ai`, `langflow_ai`, `@Langflow`, `docs.langflow.org`, `spaces/Langflow/Langflow`)
- 코드 예제/샘플 출력/SDK 식별자 (`LangflowClient`, `langflow-chat`, `LANGFLOW_*`)
- MDX code snippet import 변수명 및 import 경로 (`FormLangflowApiRequests`, `@langflow`)
- 데스크톱 번들/파일 시스템 식별자 (`com.LangflowDesktop`, `com.Langflow`)

표본 재확인 결과, 사용자 표면 prose 미수정 잔여는 없고 **intentional residue** 로 분류 가능한 항목만 남음.

### 빌드 결과 (2026-05-05)

**`make docs_build`:**
```
[SUCCESS] Generated static files in "build".
```

결과:
- **성공**
- **broken anchor 경고 0건**
- OpenAPI bundling 경고 / OpenAPI Sampler 경고는 여전히 남음
  - `openapi/langflow-workflows-openapi.json` `$ref` 해석
  - `openapi/openapi.json` `$ref` / discriminator mapping
  - `allOf with "array" type` sampler 경고

→ 위 OpenAPI 관련 경고는 Phase 4 리브랜딩 변경과 무관한 **pre-existing / out-of-scope** 경고로 분류

### 2차 작업: 2026-05-05 (보완 수정)

**Claude Code 검토 결과 발견된 prose 누락 수정:**

- `docs/versioned_docs/version-1.8.0/Develop/integrations-instana-traceloop.mdx:91`
  - 변경: `` search for `Langflow` `` → `` search for `idrflow` ``
- `docs/versioned_docs/version-1.9.0/Develop/integrations-instana-traceloop.mdx:91`
  - 변경: `` search for `Langflow` `` → `` search for `idrflow` ``

해당 항목은 사용자에게 Instana UI 서비스 목록에서 검색어를 안내하는 **산문 문구**로, 코드블록 외부에 위치함.

### 3차 작업: 2026-05-05 (마감 정리)

**독립 검사자 피드백 반영:**

- `docs/versioned_docs/version-1.9.0/API-Reference/README.md:3`
  - 변경: `local Langflow server` → `local idrflow server`
- `tasks/idrflow-rebranding/README.md`
  - 상위 phase tracker를 세부 문서 상태와 일치하도록 조정
- `tasks/idrflow-rebranding/phase-04-versioned-docs.md`
  - `docs/README.md` fenced code 내 `@langflow` import 경로 유지 사실 반영
  - Instana residue 분류 제거 및 final residue 목록 최신화

### 수동 검증

> **완료** — 로컬 정적 빌드 HTML spot-check 및 README 표면 재확인 완료

- 로컬 서버: `python3 -m http.server 4173` in `docs/build`
- 확인 페이지:
  - `/index.html` → `About idrflow`, version dropdown `1.10.x (Next) / 1.9.x / 1.8.x`, footer `© 2026 idrflow`
  - `/getting-started-installation/index.html` → `Install idrflow`, `Download idrflow`, `idrflow Desktop`
  - `/1.8.0/get-started-installation.html` → `Install idrflow`, `Download idrflow`, `1.8.x` banner
  - `/api-openai-responses.html`, `/1.8.0/api-openai-responses.html` → `local idrflow server`, API reference labels, sidebar CTA
- `README.md` source spot-check:
  - Hero / Desktop / Deployment / Contribute 표면 문구가 `idrflow` 기준인지 재확인

---

## Phase 05 — Residual Sweep (🟡 In Progress)

### sweep 완료: 2026-05-05 / 최종 수동 검증: 미완료

### 수정 파일

| 파일 | 수정 내용 |
|------|----------|
| `docs/static/files/Conversational_Notion_Agent.json` | `"description"` 필드 `Langflow tables` → `idrflow tables` |
| `docs/static/files/Conversational_Notion_Agent.json` | `"info"` 필드 `Langflow tables` → `idrflow tables` |
| `docs/static/files/Meeting_Notes_Agent.json` | 대화 시뮬레이션 `Langflow Prod` → `idrflow Prod` |

### 최종 잔여 건수 (2026-05-05)

```bash
rg -c 'Langflow' src/frontend/src/ --glob '!**/*.snap' | awk -F: '{s+=$2} END {print "frontend/src:", s}'
→ frontend/src: 84  (전량 intentional residue)

rg -c 'Langflow' docs/docs/ | awk -F: '{s+=$2} END {print "current docs:", s}'
→ current docs: 49  (전량 코드블록 내부 — whitelist)

rg -c 'Langflow' docs/versioned_docs/ | awk -F: '{s+=$2} END {print "versioned docs:", s}'
→ versioned docs: 119  (전량 whitelist)

rg -c 'Langflow' docs/static/files/ | awk -F: '{s+=$2} END {print "static/files:", s}'
→ static/files: 1  (Python 임베딩 코드 — whitelist)
```

### 검증 결과

**`make docs_build` (2026-05-05):**
```
[SUCCESS] Generated static files in "build".
```
→ **성공.** broken anchor 경고 0건. OpenAPI Sampler 경고는 pre-existing.

**`make test_frontend` (2026-05-05):**
```
Test Suites: 2 failed, 283 passed, 285 total
Tests:       2 failed, 4005 passed, 4007 total
```
→ **신규 회귀 없음.** Phase 1 기준선과 동일.

### 최종 Intentional Residue

| 분류 | 건수 | 이유 |
|------|------|------|
| i18n 키 이름 (`builtWithLangflow`, `getLangflowDesktop`) | 21 | 내부 식별자 — 영구 whitelist |
| SVG/PNG 자산 임포트명 | ~29 | 파일명 보존 — 자산 교체 시 변경 |
| API 헤더 `X-Langflow-Global-Var-*` | 6 | 백엔드 계약 |
| 코드 주석 (비노출) | 6 | 사용자 표면 아님 |
| 함수·컴포넌트명 | 7 | 내부 식별자 |
| i18n 키 참조 (`t("modal.io.builtWithLangflow")`) | 2 | 키 이름 — 값은 idrflow |
| Current docs 코드블록 | 49 | whitelist |
| Versioned docs 외부 URL·코드 | 119 | whitelist |
| `com.LangflowDesktop`, `com.Langflow` | 다수 | 명시적 whitelist |
| `@Langflow` YouTube 핸들 | 2 | 외부 조직명 whitelist |
| `docs/docusaurus.config.js` 리다이렉트 | 1 | 레거시 URL 호환성 |
| `Conversational_Notion_Agent.json` Python 임베딩 | 1줄 | 임베딩 코드 whitelist |
