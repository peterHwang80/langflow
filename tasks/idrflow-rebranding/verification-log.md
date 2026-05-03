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
- 보완: +1개 (`src/frontend/src/locales/en.json` — 19개 키 값 변경)

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

## Phase 02 — Assets, Locales, Links (미완료)

> Phase 완료 후 채움

---

## Phase 03 — Current Docs (미완료)

> Phase 완료 후 채움

---

## Phase 04 — Versioned Docs (미완료)

> Phase 완료 후 채움

---

## Phase 05 — Residual Sweep (미완료)

> Phase 완료 후 채움

### 최종 Intentional Residue

> Phase 05 완료 후 채움
