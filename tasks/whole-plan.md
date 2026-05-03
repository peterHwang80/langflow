# idrflow 1차 리브랜딩 실행 계획

## Summary

- 현재 기준 잔존 범위는 대략 `frontend surface 72`, `docs current 198`, `docs versioned 365`건이며, 한 번에 밀기보다 `앱 표면 -> 자산/로케일 -> current docs -> versioned/docs repo surface -> 최종 audit` 순서로 쪼개는 것이 가장 안전합니다.
- 1차 목표는 사용자 표면만 `Langflow -> idrflow`로 전환하고, 내부 호환성 식별자와 런타임 구조는 유지하는 것입니다.
- 구현을 시작하는 첫 작업은 코드 수정이 아니라 계획 기록 파일 생성입니다. 새 기록 위치는 `tasks/idrflow-rebranding/`로 고정하고, 여기의 `README.md`, `phase-00`~`phase-05` 문서, `verification-log.md`를 계속 업데이트합니다.
- 각 Phase는 끝날 때마다 `변경 범위`, `남은 이슈`, `검증 명령`, `수동 확인 결과`, `잔여 검색 결과`를 해당 md에 남깁니다.

## Implementation Changes

- 백엔드 공개 인터페이스는 바꾸지 않습니다. `langflow.*` 모듈 경로, `/api/v1` `/api/v2`, `LANGFLOW_*`, CLI 명령, 패키지명, 로컬스토리지 키, 내부 헤더명은 유지합니다.
- 프런트 표시 문자열과 로고만 바꾸되, 심볼명은 유지해도 됩니다. 예를 들어 `LANGFLOW_CHAT_TITLE` 상수명은 그대로 두고 값만 `idrflow Chat`으로 바꿉니다.
- 외부 링크는 흩어진 하드코딩을 줄이기 위해 한 곳으로 모읍니다. 확정되지 않은 URL은 설정 상수에 TODO와 함께 두고, 제품 표면은 `idrflow` 브랜드 기준으로 표시합니다.
- docs는 bulk replace를 금지하고, `사용자 표면 문장`과 `호환성 때문에 남겨야 하는 코드/명령/환경변수`를 분리해서 다룹니다.

## Phase Plan

1. `Phase 0 — Baseline and Tracker Setup`
   `tasks/idrflow-rebranding/README.md`, `phase-00-baseline-and-rules.md`, `phase-01`~`phase-05`, `verification-log.md`를 만들고 템플릿을 고정합니다.
   `upstream` remote는 현재 없는 상태이므로 중복 없이 조건부 추가 절차를 기록합니다.
   `rg` 기준선과 whitelist를 문서화합니다. whitelist에는 `LANGFLOW_*`, `import langflow`, `uv run langflow run`, API route, localStorage key, test id, internal header가 포함됩니다.
   완료 기준은 “무엇을 바꾸고 무엇을 절대 안 바꾸는지”가 md에 명시되고, 검색 기준선이 재실행 가능하게 기록된 상태입니다.

2. `Phase 1 — Frontend Shell and Core Copy`
   앱 셸, 핵심 상수, 로그인/가입/헤더/채팅/설정/도움말/Store/API Key/MCP 관련 사용자 표면을 먼저 정리합니다.
   대상은 `index.html`, `manifest.json`, frontend constants/alerts/flow constants, customization layer, login/signup/admin pages, header/chat logo alt/title, crash/help/share/settings/MCP/assistant 관련 표면입니다.
   이 Phase에서는 값만 바꾸고 내부 구현 식별자는 유지합니다. 함께 깨지는 테스트 문자열과 snapshot도 같은 Phase에서 정리합니다.
   완료 기준은 프런트 핵심 UX 경로에서 `Langflow`가 눈에 띄지 않고, 잔여 문자열은 whitelist 또는 미처리 목록으로 설명 가능한 상태입니다.

3. `Phase 2 — Assets, Locales, and Link Centralization`
   준비된 `idrflow` 자산을 기존 파일명 유지 방식으로 교체합니다. 앱 로고, favicon, docs 로고, 접근성 `alt/title`, 그리고 `manifest`가 참조하는 `public/icons/*`까지 맞춥니다.
   `en/ja/fr/de/es/pt/zh-Hans` locale의 브랜드 문구를 전부 동기화하고, 현재 흩어진 외부 링크는 설정 상수로 모읍니다.
   확정되지 않은 외부 URL은 한 군데에서만 관리하고 TODO를 남깁니다. 기본 제품 도메인은 `idrflow` 기준으로 표시하되, GitHub/social/issue/chat widget 같은 비확정 타깃은 설정 상수에서 후속 확정이 가능하도록 둡니다.
   완료 기준은 로고, favicon, PWA 이름, 다국어 UI, 주요 외부 링크가 모두 일관된 브랜드를 보여주는 상태입니다.

4. `Phase 3 — Docs Site and Current Docs`
   `docs/docusaurus.config.js`, `docs/src`, `docs/static/CNAME`, `llms*.txt`, 문서 브랜드 에셋, current docs 본문(`docs/docs/**`)을 정리합니다.
   current docs는 우선순위 높은 Get Started, Deployment, Flows, API Reference부터 시작하되, 같은 Phase 안에서 전체 current docs를 끝내는 것을 목표로 합니다.
   단, 코드블록과 예제의 `import langflow`, `uv run langflow run`, `LANGFLOW_*`, Langflow-compatible 설명은 그대로 두고, 사용자 서술/타이틀/링크/버튼/설명만 바꿉니다.
   `docs/static/files/*.json` 같은 다운로드 예제는 무차별 치환하지 않고, 실제로 사용자에게 보이는 title/description/link만 선별 수정합니다.

5. `Phase 4 — Versioned Docs and Public Repo Surface`
   `docs/versioned_docs/version-1.8.0`, `version-1.9.0`, `docs/versioned_sidebars`, 그리고 루트 `README.md`, `src/frontend/README.md`, `docs/README.md`를 정리합니다.
   versioned docs에도 current docs와 동일한 whitelist 규칙을 적용합니다. 여기서도 bulk replace 대신 “표면 문구 우선, 호환성 예제 보존” 원칙을 유지합니다.
   이 Phase가 끝나면 공개 리포지토리 표면과 문서 버전 전환 시점 모두에서 브랜드 불일치가 사라져야 합니다.

6. `Phase 5 — Residual Sweep and Final Verification`
   frontend, docs, backend 사용자 노출 문자열에 대해 마지막 `rg` sweep을 돌리고, whitelist 밖 잔여 항목만 개별 처리합니다.
   backend는 실제 UX나 API 응답에서 드러나는 문자열이 남아 있을 때만 최소 범위로 수정합니다.
   `verification-log.md`에 최종 검색 결과, 명령 실행 결과, 수동 시나리오 체크 결과, 남겨둔 intentional residue를 모두 기록하고 종료합니다.

## Test Plan

- Phase 1, 2 종료 시:
  `make format_frontend`
  `make format_frontend_check`
  `make test_frontend`
  필요 시 `make test_frontend_file path=<changed test file>`로 영향 범위를 먼저 확인합니다.
  수동 검증은 `make run_cli` 후 로그인, 회원가입, 메인 헤더, empty state, Playground, API Keys, Store, MCP Client, Share/I/O modal, Help/docs 링크를 확인합니다.

- Phase 3, 4 종료 시:
  `make docs_build`
  `make api_examples_local_syntax`
  수동 검증은 docs 홈, navbar/footer, 검색/플러그인 영역, current docs 주요 문서, versioned docs 전환, 다운로드 예제 링크를 확인합니다.

- Phase 5 종료 시:
  `make format_frontend`
  `make test_frontend`
  `make docs_build`
  backend 문자열을 건드린 경우에만 `make unit_tests async=false` 또는 관련 `uv run pytest ...`를 추가합니다.
  마지막으로 brand audit용 `rg` 명령과 실제 UI smoke 결과를 `verification-log.md`에 남깁니다.

## Assumptions

- 새 계획 문서는 기존 `tasks/todo-plan-claude.md`, `tasks/todo-plan-codex.md`, `analysis/idrflow-1st-rebranding-checklist.md`를 덮어쓰지 않고, 별도 디렉터리 `tasks/idrflow-rebranding/` 아래에 생성합니다.
- 문서 범위는 `current docs 먼저`, `versioned docs는 다음 Phase`로 진행합니다.
- 로고와 favicon 자산은 이미 준비되어 있으며, 파일명 변경 없이 내용만 교체합니다.
- 외부 URL은 즉시 전부 확정할 수 없으므로, 구현 시 한 곳의 설정 상수로 모으고 TODO를 남깁니다.
- 1차 완료 기준은 “사용자 표면의 브랜드 불일치 제거”이지 “저장소 전체에서 `langflow` 문자열 0건”이 아닙니다.
