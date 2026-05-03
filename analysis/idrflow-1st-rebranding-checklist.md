# idrflow 1차 리브랜딩 체크리스트

목표: 내부 엔진과 호환성은 유지하고, 사용자에게 보이는 UI/UX와 문서 표면만 `Langflow`에서 `idrflow`로 1차 전환한다.

## 원칙

- [ ] 1차에서는 내부 패키지명, import 경로, CLI 명령, 환경 변수 이름은 유지한다.
- [ ] 1차에서는 저장된 flow 호환성을 깨는 변경을 하지 않는다.
- [ ] 1차에서는 사용자에게 직접 노출되는 브랜드 문자열, 로고, 문서 URL, 공개 링크만 우선 교체한다.
- [ ] `langflow` 명령을 계속 써야 하는 경우, 문서에는 "idrflow is powered by Langflow-compatible runtime" 같은 식으로 설명을 분리한다.

## 1차에서 건드리지 말아야 하는 것

- [ ] `/Users/peter/Workspaces/github/langflow/pyproject.toml`
  - `project.name = "langflow"` 유지
  - `project.scripts.langflow` 유지
- [ ] `/Users/peter/Workspaces/github/langflow/src/backend/base/pyproject.toml`
  - `name = "langflow-base"` 유지
- [ ] `/Users/peter/Workspaces/github/langflow/src/sdk/pyproject.toml`
  - `name = "langflow-sdk"` 유지
- [ ] `/Users/peter/Workspaces/github/langflow/src/lfx/pyproject.toml`
  - `name = "lfx"` 유지
- [ ] `/Users/peter/Workspaces/github/langflow/src/backend/base/langflow/`
  - Python 모듈 경로 `langflow.*` 유지
- [ ] `/Users/peter/Workspaces/github/langflow/.env.example`
  - `LANGFLOW_*` 환경 변수 이름 유지
- [ ] `/Users/peter/Workspaces/github/langflow/AGENTS.md`
  - 컴포넌트 class name 변경 금지 원칙 유지
- [ ] `localStorage` 키, custom event 이름, test id처럼 비가시적 식별자는 1차에서는 유지
  - 예: `langflow-shortcuts`, `langflow-scroll-to-bottom`

## P0: 앱 셸과 핵심 브랜드 표면

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/index.html`
  - `<title>Langflow</title>`를 `idrflow`로 변경
  - 필요한 경우 `noscript` 문구도 제품명 기준으로 정리

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/public/manifest.json`
  - `name`
  - `short_name`
  - `description`
  - 앱 아이콘 설명이 있다면 함께 점검

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/public/favicon.ico`
  - `idrflow` 브랜드 아이콘으로 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/assets/LangflowLogo.svg`
  - 실제 로고 SVG 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/assets/LangflowLogoColor.svg`
  - 컬러 버전 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/assets/langflow_logo_black.svg`
  - 블랙 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/assets/langflow_logo_white.svg`
  - 화이트 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/assets/logo_dark.png`
  - 다크 테마용 래스터 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/assets/logo_light.png`
  - 라이트 테마용 래스터 로고 교체

## P0: 로그인, 가입, 헤더, 채팅 표면

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/LoginPage/index.tsx`
  - 로고 import 교체 여부 점검
  - `title="Langflow logo"` 변경

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SignUpPage/index.tsx`
  - 로고 import 교체 여부 점검
  - `title="Langflow logo"` 변경

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/AdminPage/LoginPage/index.tsx`
  - 관리자 로그인 화면 로고와 접근성 텍스트 변경

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/components/core/appHeaderComponent/index.tsx`
  - 상단 헤더 로고 교체
  - 클릭 시 이동 동선이 `idrflow` UX와 맞는지 점검

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/components/core/playgroundComponent/chat-view/chat-messages/components/bot-message-logo.tsx`
  - 봇 메시지 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/components/core/playgroundComponent/chat-view/chat-messages/components/bot-message.tsx`
  - 봇 메시지 내부 로고 사용 지점 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/modals/IOModal/components/chatView/chatMessage/components/chat-logo-icon.tsx`
  - 공유/임베드 채팅에서 보이는 브랜드 아이콘 교체

## P0: 프런트 커스터마이징 포인트

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/customization/config-constants.ts`
  - `DOCS_LINK`를 `idrflow` 문서 주소로 변경

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/customization/utils/urls.ts`
  - `LangflowButtonRedirectTarget()`를 `idrflow` 홈페이지로 변경

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/customization/components/custom-store-sidebar.tsx`
  - `Langflow API Keys` -> `idrflow API Keys`
  - `Langflow Store` -> `idrflow Store` 또는 기능 미제공 시 제거

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/customization/components/custom-header-menu-items-title.tsx`
  - 필요한 경우 `idrflow` 전용 메뉴 타이틀/배지 추가

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/customization/components/custom-langflow-counts.tsx`
  - 이름은 그대로 둬도 되지만, 사용자 노출 문구가 있으면 `idrflow` 기준으로 점검

## P0: 설정 화면과 도움말 링크

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SettingsPage/index.tsx`
  - `Langflow MCP Client`
  - 사이드바 브랜드명

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SettingsPage/pages/McpClientPage/index.tsx`
  - `Langflow MCP Client`
  - "this Langflow" 같은 설명 문구
  - 단, CLI 예제의 `langflow`/`lfx` 명령은 호환성 이유로 유지할지 명확히 결정

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SettingsPage/pages/ApiKeysPage/helpers/get-modal-props.tsx`
  - `Langflow API` 문구를 `idrflow API`로 변경

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SettingsPage/pages/StoreApiKeyPage/components/StoreApiKeyForm.tsx`
  - `langflow.store` 링크 제거 또는 `idrflow` 스토어로 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/components/core/canvasControlsComponent/HelpDropdownView.tsx`
  - 도움말/문서 링크가 `docs.langflow.org`를 가리키는지 점검

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/components/core/playgroundComponent/chat-view/chat-input/components/no-input.tsx`
  - 도움말 문구와 docs 링크 교체

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/modals/IOModal/components/chatView/chatInput/components/no-input.tsx`
  - 도움말 문구와 docs 링크 교체

## P0: 다국어 번역 문자열

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/locales/en.json`
  - 로그인/가입/환영/설정/API key/store/desktop/chat/built with 문구를 `idrflow` 기준으로 변경

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/locales/ja.json`
- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/locales/fr.json`
- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/locales/de.json`
- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/locales/es.json`
- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/locales/pt.json`
- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/locales/zh-Hans.json`
  - `Langflow` 문자열을 `idrflow`로 교체
  - `Langflow Store`, `Langflow Desktop` 같은 product surface를 실제 제공 여부에 맞게 수정

## P0: 문서 사이트 전역 설정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docusaurus.config.js`
  - `title`
  - `tagline`
  - `favicon`
  - `url`
  - `organizationName`
  - `projectName`
  - navbar logo alt/src
  - GitHub/Twitter/Discord 링크
  - footer copyright
  - `algolia.indexName`
  - `data-platform-title`
  - 리다이렉트 목록에 `langflow` 고유 slug가 있으면 유지/정리 여부 판단
  - 주의: docs 빌드와 검색 설정을 함께 검증

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/CNAME`
  - `docs.langflow.org`를 `docs.idrflow...` 또는 새 문서 도메인으로 변경

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/llms.txt`
  - 문서 개요, 링크, 제품명, 사이트 URL 전부 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/llms-full.txt`
  - 문서 개요와 링크 전부 교체

## P0: 문서 사이트 브랜드 에셋

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/img/favicon.ico`
  - 문서 전용 파비콘 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/img/langflow-logo-color-blue-bg.svg`
  - 문서 메인 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/img/langflow-logo-color-black-solid.svg`
  - 문서 메인 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/img/langflow-icon-black-transparent.svg`
  - 플로팅 검색 버튼 아이콘 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/img/lf-docs-light.svg`
  - navbar 라이트 로고 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/img/lf-docs-dark.svg`
  - navbar 다크 로고 교체

## P0: 문서 사이트 UI 동작과 외부 스크립트

- [ ] `/Users/peter/Workspaces/github/langflow/docs/src/theme/Footer.js`
  - 플로팅 검색 버튼 아이콘 경로 교체
  - hover 문구를 `idrflow` 톤으로 조정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/src/components/ChatWidget/index.tsx`
  - `langflow-embedded-chat` 외부 스크립트 사용 여부 결정
  - 계속 쓸 경우 브랜딩/host URL/flow example 교체
  - 독립 운영이면 `idrflow` 전용 embed script로 대체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/src/plugins/segment/index.js`
  - IBM/DataStax/Langflow 기반 analytics 설정 제거 또는 `idrflow` 기준으로 재구성
  - privacy policy link, product title, tracking metadata 전부 점검

- [ ] `/Users/peter/Workspaces/github/langflow/docs/src/plugins/segment/data-attribute-tracking.js`
  - `Langflow` 기반 데이터 속성명이 남아 있는지 점검

## P1: 공개 리포지토리 표면

- [ ] `/Users/peter/Workspaces/github/langflow/README.md`
  - 상단 로고
  - 제품 소개 문단
  - 웹사이트/문서/소셜 링크
  - Docker image 안내
  - 설치/실행 안내
  - `langflow` 명령은 유지할지, `idrflow managed` 중심으로 다시 쓸지 결정

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/README.md`
  - 공개 배포 시 보이는 브랜드 문구 정리

- [ ] `/Users/peter/Workspaces/github/langflow/docs/README.md`
  - 문서 개발 안내에 남아 있는 `Langflow` 브랜드 문구 정리

## P1: 문서 본문 중 우선순위 높은 파일

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Get-Started/get-started-installation.mdx`
  - 제품명
  - Desktop/Store 제공 여부
  - 설치 명령은 호환성 기준으로 유지 여부 결정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Get-Started/about-langflow.mdx`
  - 문서 제목과 본문 전체를 `idrflow` 기준으로 수정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Get-Started/get-started-quickstart.mdx`
  - `Langflow API key`, `Langflow server`, `Welcome to Langflow` 등 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Deployment/deployment-overview.mdx`
  - `idrflow` 배포 모델로 톤 조정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Deployment/deployment-architecture.mdx`
  - IDE/runtime 설명에서 `idrflow` 이름 반영

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Deployment/deployment-docker.mdx`
  - Docker image 이름을 실제 `idrflow` 배포 전략에 맞게 수정
  - 단, 내부 엔진이 `langflow` 기반이면 예제 명령과 설명 분리

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Deployment/security.mdx`
  - 운영 주체를 `idrflow` 기준으로 정리

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Flows/concepts-overview.mdx`
- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Flows/concepts-publish.mdx`
- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/Flows/concepts-playground.mdx`
  - 사용자 여정에서 자주 보는 핵심 가이드 우선 수정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/docs/API-Reference/README.md`
  - API 소개 텍스트를 `idrflow` 기준으로 조정

## P1: 버전 문서 운영 여부 결정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/versioned_docs/version-1.9.0/**`
  - 실제로 버전 문서를 서비스할 계획이면 `Langflow` 브랜드 교체

- [ ] `/Users/peter/Workspaces/github/langflow/docs/versioned_docs/version-1.8.0/**`
  - 서비스하지 않을 계획이면 비공개 또는 제거 고려

주의:

- 버전 문서를 그대로 서비스하면 `Langflow` 브랜드가 대량으로 남는다.
- 1차에서는 `current docs + version-1.9.0`만 우선 정리하고 `1.8.0`은 비노출 처리하는 것도 현실적이다.

## P1: OpenAPI와 샘플 데이터

- [ ] `/Users/peter/Workspaces/github/langflow/docs/openapi/openapi.json`
  - `title`, `description` 등 공개 문서에 노출되는 브랜딩 점검

- [ ] `/Users/peter/Workspaces/github/langflow/docs/openapi/langflow-workflows-openapi.json`
  - `Langflow V2 Workflow API` 표기 조정

- [ ] `/Users/peter/Workspaces/github/langflow/docs/openapi/generate_openapi.py`
  - 주석/설명 문구 정리

- [ ] `/Users/peter/Workspaces/github/langflow/docs/openapi/fetch_openapi_spec.py`
  - `langflow-ai/sdk` 같은 upstream 언급이 고객 노출되는지 점검

- [ ] `/Users/peter/Workspaces/github/langflow/docs/static/files/*.json`
  - 데모 flow 내부 설명, 문서 URL, sample title에 `Langflow`가 남는지 점검

## P2: 1차에서는 보류 가능하지만 목록화할 것

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SettingsPage/pages/McpClientPage/index.tsx`
  - CLI 예제의 `langflow`/`lfx` 명령 alias 추가 여부는 2차 검토

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SettingsPage/pages/StoreApiKeyPage/**`
  - `Langflow Store` 자체를 계속 쓸지, `idrflow Store`로 재정의할지 제품 결정 필요

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/SettingsPage/pages/ShortcutsPage/**`
  - `langflow-shortcuts` localStorage key는 마이그레이션 설계 없이 바꾸지 않음

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/components/core/playgroundComponent/sliding-container/components/flow-page-sliding-container.tsx`
  - `langflow-scroll-to-bottom` custom event는 2차 alias 전략 없이 바꾸지 않음

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/src/pages/FlowPage/**`
  - 주석, 테스트, 내부 helper 이름은 고객 비노출이면 보류 가능

- [ ] `/Users/peter/Workspaces/github/langflow/src/frontend/tests/**`
  - 브랜드 표기가 QA 산출물에 노출되지 않는다면 2차 정리

## 검증 체크리스트

- [ ] 로그인 화면에 `Langflow`가 보이지 않는다.
- [ ] 가입 화면에 `Langflow`가 보이지 않는다.
- [ ] 헤더, 파비콘, 브라우저 타이틀이 모두 `idrflow` 기준이다.
- [ ] 설정 화면에 `Langflow API Keys`, `Langflow Store` 같은 문구가 남아 있지 않다.
- [ ] 플레이그라운드/채팅 로고가 모두 `idrflow` 기준이다.
- [ ] 문서 메인 페이지, 푸터, 소셜 링크, CNAME, llms 파일이 모두 `idrflow` 기준이다.
- [ ] docs 검색, analytics, privacy 링크가 더 이상 `langflow` 또는 제3자 운영 설정을 가리키지 않는다.
- [ ] 공개 문서에서 `uv run langflow run` 같은 명령이 남아 있다면, 의도적으로 유지한 것인지 설명이 붙어 있다.
- [ ] `rg -n 'Langflow|langflow\\.org|docs\\.langflow\\.org|langflow-ai|langflow_ai' src/frontend/src src/frontend/public src/frontend/index.html docs README.md` 재실행 시 남은 항목이 의도된 내부 호환성 범위뿐이다.

## 실행 순서 권장

- [ ] 1. 전역 설정과 에셋 교체
- [ ] 2. 로그인/헤더/설정/채팅 표면 교체
- [ ] 3. locale 문자열 교체
- [ ] 4. 문서 사이트 설정 교체
- [ ] 5. 핵심 docs 본문 교체
- [ ] 6. versioned docs 노출 전략 결정
- [ ] 7. 마지막에 `rg`로 잔여 브랜드 문자열 재점검
