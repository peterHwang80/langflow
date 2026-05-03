# `todo-plan-claude.md` 보완 메모

이 문서는 `tasks/todo-plan-claude.md`의 작업 흐름을 유지한 상태에서, 실제 저장소를 확인하며 발견한 **보완 필요 사항만** 정리한 문서다.
즉, Claude 계획을 대체하는 새 계획이 아니라, **그 흐름 안에서 빠진 것 / 수정해야 하는 것 / 과한 것**만 덧붙인다.

---

## 1. 먼저 수정해야 할 핵심 사항

### 1-1. `src/frontend/package.json`의 `name` 변경은 1차 범위에서 제외

Claude 문서의 Phase 1에는 아래 항목이 있다.

- `src/frontend/package.json`
  - `name: "langflow" -> "idrflow"`

이 항목은 1차 리브랜딩 범위에서 제외하는 것이 맞다.

- 사용자 노출 표면이 아니다.
- 현재 `src/frontend/package.json`은 `"private": true`다.
- upstream diff만 늘고, 실질적인 제품 표면 변경 효과는 없다.

따라서 이 항목은 **삭제** 또는 **보류** 처리한다.

### 1-2. 문서 일괄 치환 스크립트는 그대로 실행하면 안 된다

Claude 문서의 Phase 3 `rebrand-docs.sh`는 아래 이유로 그대로 쓰면 위험하다.

- `Langflow`, `langflow`, `LANGFLOW`를 전역 치환한다.
- `docs/docs`만 대상으로 잡고 있어 `docs/static`, `docs/src`, `docs/sidebars.js`, `versioned_docs`, `versioned_sidebars`는 놓친다.
- 반대로 `import langflow`, `pip install langflow`, `LANGFLOW_*`, GitHub URL, API 예시, 코드 샘플까지 잘못 바꿀 수 있다.

따라서 Phase 3은 아래처럼 바꿔야 한다.

- `rg`로 후보를 먼저 수집한다.
- `docs 전역 설정/정적 자산`과 `docs 본문`을 분리한다.
- `current docs`와 `versioned docs`를 분리한다.
- `openapi`, `static/files/*.json`, 코드 예제는 별도 검토 대상으로 둔다.
- `langflow` 소문자 전역 치환은 금지한다.

### 1-3. "`Langflow` 0건" 기준은 whitelist 방식으로 바꿔야 한다

Claude 문서의 완료 기준 중 일부는 아래처럼 잡혀 있다.

- frontend `grep` 결과 0건
- docs `grep` 결과 0건

이 기준은 1차 리브랜딩의 실제 금지사항과 충돌한다.

남겨야 하는 것:

- `LANGFLOW_*` 환경 변수
- `langflow` 패키지명 / import 경로 / CLI 명령
- 내부 localStorage key / event name
- 일부 example / API / 문서 코드블록

따라서 완료 기준은 아래로 수정한다.

- 사용자 노출 표면의 `Langflow`는 제거
- 내부 호환성 식별자는 whitelist로 허용
- 잔여 문자열은 "왜 남았는지 설명 가능"해야 함

### 1-4. 백엔드 sweep은 기본 플로우가 아니라 후순위 옵션으로 내려야 한다

Claude 문서의 Phase 5는 백엔드 사용자 노출 텍스트 변경을 독립 단계로 두고 있다.
하지만 1차 리브랜딩의 핵심은 frontend + docs 표면이며, 백엔드는 실제로는 다음 조건일 때만 최소 범위로 다루는 것이 맞다.

- 프론트 작업을 마친 뒤에도 사용자에게 `Langflow`가 그대로 노출되는 경우
- API 응답/로그인이 아닌 실제 UX 흐름에서 확인되는 경우

즉, Phase 5는 **기본 단계가 아니라 선택적 후속 단계**로 낮춘다.

---

## 2. Phase별 보완 사항

## Phase 0 보완

Claude 문서 흐름은 유지하되, 아래 통제 장치를 먼저 추가한다.

- `git remote add upstream ...` 전에 기존 remote 상태를 먼저 확인한다.
  - 현재 저장소 기준 `origin`만 있다.
  - 이미 `upstream`이 있는 환경에서는 중복 추가하지 않도록 조건부 처리 필요
- 브랜치 전략은 구현 체크리스트와 분리한다.
  - 운영 워크플로우로는 유효하지만, 리브랜딩 구현 자체의 완료 조건은 아니다.
- 시작 전에 `rg` 기준선을 저장한다.

권장 기준선 명령:

```bash
rg -n 'Langflow|docs\.langflow\.org|langflow\.org|langflow-ai|langflow_ai' \
  src/frontend/src src/frontend/public src/frontend/index.html docs README.md
```

- 시작 전에 "의도적으로 남겨둘 문자열" 규칙을 문서화한다.
  - `LANGFLOW_*`
  - `pip install langflow`
  - `uv run langflow run`
  - `import langflow`
  - `github.com/langflow-ai/langflow`가 기술 출처로 필요한 경우

## Phase 1 보완

Claude 문서의 Phase 1은 constants/customization 중심이라서 실제 사용자 표면 파일이 꽤 빠져 있다.
Phase 1에 아래 파일들을 추가해야 한다.

### 2-1. 로그인/가입/헤더/채팅 표면 추가

- `src/frontend/src/pages/LoginPage/index.tsx`
  - `LangflowLogo`
  - `title="Langflow logo"`
- `src/frontend/src/pages/SignUpPage/index.tsx`
  - `LangflowLogo`
  - `title="Langflow logo"`
- `src/frontend/src/pages/AdminPage/LoginPage/index.tsx`
  - `title="Langflow logo"`
- `src/frontend/src/components/core/playgroundComponent/chat-view/chat-messages/components/bot-message-logo.tsx`
  - `title="Langflow Logo"`
- `src/frontend/src/components/core/playgroundComponent/chat-view/chat-messages/components/bot-message.tsx`
  - `LangflowLogo` 사용 지점
- `src/frontend/src/pages/MainPage/pages/empty-page.tsx`
  - `alt="Langflow Logo Light"`
  - `alt="Langflow Logo Dark"`

### 2-2. 실제 텍스트 표면 추가

- `src/frontend/src/flow_constants.tsx`
  - `"Design Dialogues with Langflow."`
  - `"Create, Curate, Communicate with Langflow."`
  - `"Innovation in Interaction with Langflow."`
- `src/frontend/src/components/core/assistantPanel/assistant-panel.constants.ts`
  - `"Langflow Assistant"`
  - `"Ask me anything about Langflow..."`
  - `"Answer questions about Langflow"`
- `src/frontend/src/components/common/crashErrorComponent/index.tsx`
  - `"Restart Langflow"`
  - bug report 링크

### 2-3. 설정/도움말/문서 링크 표면 추가

- `src/frontend/src/pages/SettingsPage/index.tsx`
  - `"Langflow MCP Client"`
- `src/frontend/src/pages/SettingsPage/pages/McpClientPage/index.tsx`
  - `"Langflow MCP Client"`
  - `"this Langflow"`
- `src/frontend/src/pages/SettingsPage/pages/ApiKeysPage/helpers/get-modal-props.tsx`
  - `"Create a secret API Key to use Langflow API."`
- `src/frontend/src/components/core/playgroundComponent/chat-view/chat-input/components/no-input.tsx`
  - docs 링크
- `src/frontend/src/modals/IOModal/components/chatView/chatInput/components/no-input.tsx`
  - docs 링크
- `src/frontend/src/modals/saveChangesModal/index.tsx`
  - docs 링크
- `src/frontend/src/pages/MainPage/pages/homePage/components/McpJsonContent.tsx`
  - docs 링크
- `src/frontend/src/pages/MainPage/pages/homePage/components/McpServerTab.tsx`
  - docs 링크
- `src/frontend/src/pages/MainPage/pages/homePage/components/McpAutoInstallContent.tsx`
  - `"the Langflow server"`

### 2-4. locale 전수 반영을 Phase 1에 포함

Claude 문서 Phase 1에는 locale 전수 반영이 빠져 있다.
실제 저장소에서는 아래 파일들에 제품명/스토어/API key/desktop/welcome/built with 표면이 광범위하게 들어가 있으므로 Phase 1에 포함해야 한다.

- `src/frontend/src/locales/en.json`
- `src/frontend/src/locales/ja.json`
- `src/frontend/src/locales/fr.json`
- `src/frontend/src/locales/de.json`
- `src/frontend/src/locales/es.json`
- `src/frontend/src/locales/pt.json`
- `src/frontend/src/locales/zh-Hans.json`

특히 아래 키를 우선 점검한다.

- `auth.loginTitle`
- `auth.signupTitle`
- `settings.apiKeysTitle`
- `settings.apiPageParagraph`
- `settings.description`
- `settings.generalDescription`
- `settings.languageDescription`
- `store.title`
- `store.insertApiKey`
- `storeApiKey.title`
- `storeApiKey.description`
- `misc.chatTitle`
- `modal.io.builtWithLangflow`
- `modal.io.builtWithLangflowTooltip`
- `page.welcomeTitle`
- `help.getLangflowDesktop`

## Phase 2 보완

Claude 문서의 Phase 2는 방향은 맞지만, 실제 저장소 기준으로 아래 보완이 필요하다.

### 2-5. `manifest.json`의 아이콘 경로는 이미 선언돼 있지만 실제 파일이 없다

현재 `src/frontend/public/manifest.json`은 아래 경로를 참조한다.

- `icons/32x32.png`
- `icons/128x128.png`
- `icons/128x128@2x.png`
- `icons/icon.ico`

하지만 실제 저장소에는 `src/frontend/public/icons/` 디렉토리가 없다.
따라서 Phase 2에는 아래 중 하나를 명시해야 한다.

- `public/icons/*` 자산을 새로 추가
- 또는 `manifest.json`을 현재 실제 자산 구조에 맞게 다시 정리

즉, favicon만 교체하면 끝나는 단계가 아니다.

### 2-6. 파일명 유지 원칙을 명시적으로 고정

Claude 문서도 권장하고 있지만, 최종적으로는 다음처럼 못박는 것이 좋다.

- `LangflowLogo.svg`류는 **내용만 교체**
- import 경로 rename 금지
- alt/title/accessibility 문구는 함께 교체

## Phase 3 보완

Claude 문서의 가장 큰 보완 포인트는 이 단계다.
문서 작업은 "bulk replace"가 아니라 아래 순서로 쪼개야 한다.

### 2-7. docs 전역 설정/정적 자산 단계를 먼저 분리

Phase 3 시작 시 아래 파일을 먼저 처리한다.

- `docs/docusaurus.config.js`
- `docs/static/CNAME`
- `docs/static/llms.txt`
- `docs/static/llms-full.txt`
- `docs/src/theme/Footer.js`
- `docs/src/components/ChatWidget/index.tsx`
- `docs/src/plugins/segment/index.js`
- `docs/src/plugins/segment/data-attribute-tracking.js`
- `docs/sidebars.js`

이 단계는 본문 대량 치환보다 먼저 끝내야 한다.

### 2-8. current docs와 versioned docs를 분리

current docs 우선:

- `docs/docs/Get-Started/*`
- `docs/docs/Deployment/*`
- `docs/docs/Flows/*`
- `docs/docs/API-Reference/*`
- `README.md`

조건부:

- `docs/versioned_docs/version-1.9.0/**`
- `docs/versioned_docs/version-1.8.0/**`
- `docs/versioned_sidebars/version-1.9.0-sidebars.json`
- `docs/versioned_sidebars/version-1.8.0-sidebars.json`

권장 판단:

- 1차 기본값은 `current docs 우선`
- versioned docs를 실제 노출한다면 그때 같이 정리
- versioned docs를 당장 노출하지 않는다면 1차 기본 범위에서 제외

### 2-9. docs에서 별도 검토가 필요한 파일군 추가

Claude 문서에는 아래 파일군이 빠져 있다.

- `docs/static/img/*` 로고/파비콘
- `docs/openapi/openapi.json`
- `docs/openapi/langflow-workflows-openapi.json`
- `docs/openapi/generate_openapi.py`
- `docs/openapi/fetch_openapi_spec.py`
- `docs/static/files/*.json`

이 파일군은 일반 본문보다 더 조심해서 다뤄야 한다.

- `openapi*.json`은 공개 문서 title/description만 바꿀지, 명세 본문까지 건드릴지 따로 결정 필요
- `static/files/*.json`은 샘플 flow, 코드, 문서 URL이 섞여 있어서 일괄 치환 금지

### 2-10. `README.md`는 docs/public surface와 함께 묶는 것이 자연스럽다

Claude 문서에는 루트 `README.md`가 빠져 있다.
이 파일은 공개 표면이므로 Phase 3에 반드시 포함하는 편이 낫다.

점검 대상:

- 상단 로고
- 제품 소개 문단
- Desktop 링크
- docs 링크
- 배포/설치 안내
- GitHub/Twitter/YouTube 배지 및 링크

## Phase 4 보완

Claude 문서의 Phase 4는 URL 정비 방향은 좋지만, 실제 저장소 기준으로 추가 대상이 더 있다.

### 2-11. 외부 링크 추가 점검 대상

- `src/frontend/src/constants/constants.ts`
  - `GITHUB_URL`
  - `BUG_REPORT_URL`
  - `DOCS_URL`
  - `DESKTOP_URL`
- `src/frontend/src/components/common/crashErrorComponent/index.tsx`
  - GitHub issues 링크
- `README.md`
  - docs / desktop / social / GitHub links

### 2-12. GitHub stars 기능은 `darkStore.ts`와 연결돼 있다

Claude 문서의 방향은 맞지만, 실제 연결 위치를 명시해두는 편이 좋다.

- `src/frontend/src/stores/darkStore.ts`
  - `getRepoStars("langflow-ai", "langflow")`
- `src/frontend/src/customization/components/custom-langflow-counts.tsx`
  - 카운트 UI 래퍼

따라서 star 노출 정책은 아래 중 하나로 Phase 4에 명시한다.

- 새 repo 준비 전까지 비활성화
- 기존 Langflow repo를 임시 유지
- 새 repo로 전환

## Phase 5 보완

이 단계는 아래처럼 수정하는 것이 좋다.

- 기본 플로우에서는 실행하지 않음
- frontend/docs를 마친 후 실제 UX에서 남은 노출만 후속 수정
- `"Langflow"` 문자열이 있다고 해서 backend 전체 sweep을 바로 하지는 않음

즉, 이 단계 이름은 아래처럼 바꾸는 편이 더 정확하다.

- `Phase 5: 선택적 백엔드 노출 문자열 정리`

## Phase 6 보완

Claude 문서의 검증 단계는 유지하되, 명령과 합격 기준을 실제 저장소 기준으로 조정한다.

### 2-13. `grep` 대신 `rg` 사용

저장소 작업 원칙상 검색은 `rg` 기준으로 정리하는 편이 낫다.

권장 명령:

```bash
rg -n 'Langflow|docs\.langflow\.org|langflow\.org|langflow-ai|langflow_ai' \
  src/frontend/src src/frontend/public src/frontend/index.html docs README.md
```

### 2-14. 실제 빌드/검증 순서 보완

권장 검증 순서:

```bash
cd src/frontend && npm run build
cd docs && npm run build
make format_frontend
make test_frontend
```

조건부 추가:

```bash
make tests_frontend
```

`make unit_tests`는 branding-only 변경에서는 기본 필수로 두기보다, backend를 건드렸을 때 추가하는 편이 더 현실적이다.

### 2-15. 합격 기준을 "0건"이 아니라 "설명 가능한 잔여"로 수정

검증 시 남아도 되는 대표 예시는 아래다.

- `LANGFLOW_*`
- `pip install langflow`
- `uv run langflow run`
- `import langflow`
- 내부 테스트 파일
- versioned docs가 의도적으로 보류된 경우의 문자열

## Phase 7 보완

Upstream 추적 체계는 유효하지만, 현재 리브랜딩 구현의 완료 조건과는 분리하는 것이 좋다.

- 구현 완료 전 필수 단계는 아님
- 운영/유지보수 문서로 별도 분리 가능

즉, 이 단계는 아래처럼 위치를 조정한다.

- `후속 운영 가이드`
- 또는 `부록`

---

## 3. Claude 플로우에 그대로 추가하면 좋은 최소 체크리스트

- [ ] Phase 1에서 `src/frontend/package.json` `name` 변경 항목 제거
- [ ] Phase 1에 로그인/가입/헤더/assistant/settings/help/no-input/empty-page/locale 파일 추가
- [ ] Phase 2에 `public/icons/*` 부재 대응 추가
- [ ] Phase 3에서 bulk replace 대신 `docs config -> current docs -> conditional versioned docs` 순서로 변경
- [ ] Phase 3에 `README.md`, `docs/sidebars.js`, `docs/src/*`, `docs/static/*`, `docs/openapi/*`, `docs/static/files/*.json` 추가
- [ ] Phase 4에 GitHub/bug-report/crash-error 링크 추가
- [ ] Phase 5를 선택 단계로 격하
- [ ] Phase 6의 검색/검증 기준을 `0건`에서 `whitelist 기반`으로 수정
- [ ] Phase 7을 구현 DoD에서 분리

---

## 4. 요약 판단

Claude 문서는 전체 흐름과 upstream-friendly한 태도는 좋다.
다만 실제 저장소 기준으로는 아래 세 가지를 반드시 보완해야 한다.

- frontend의 실제 사용자 표면 파일과 locale sweep이 빠져 있다.
- docs는 naive bulk replace가 아니라 단계별/문맥별로 나눠야 한다.
- 1차 리브랜딩의 금지사항 때문에 "`Langflow` 0건" 같은 완료 기준은 그대로 쓰면 안 된다.

따라서 실제 실행 시에는 **Claude의 phase 구조를 유지하되, 이 문서의 보완점을 각 phase에 삽입해서 진행**하는 것이 가장 안전하다.
