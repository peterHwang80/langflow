# Langflow 코드베이스 분석

## 개요

이 문서는 현재 `langflow` 저장소의 구조를 빠르게 이해할 수 있도록, 디렉토리와 대표 파일의 역할을 정리한 분석 문서입니다.
대상 범위는 루트 설정/빌드 파일, `src` 하위 핵심 코드(`backend`, `frontend`, `lfx`, `sdk`), 문서/테스트/CI/배포 구성입니다.

## 최상위 구조

- `pyproject.toml`
  - Python 워크스페이스 중심 설정 파일입니다.
  - 워크스페이스 멤버(`src/backend/base`, `src/lfx`, `src/sdk`)와 공통 테스트/린트 정책을 정의합니다.
- `Makefile`
  - 개발 작업의 메인 진입점입니다.
  - 서버 실행, 포맷, 린트, 테스트, Alembic, 버전 업데이트 등의 명령을 통합합니다.
- `uv.lock`
  - Python 의존성 lock 파일로, 재현 가능한 개발/CI 환경을 보장합니다.
- `src/`
  - 제품 코드 핵심 디렉토리입니다.
- `docs/`
  - Docusaurus 기반 문서 사이트 소스입니다.
- `.github/workflows/`
  - CI/CD 파이프라인 정의 파일들이 위치합니다.
- `docker/`, `deploy/`
  - 컨테이너 이미지 구성 및 배포 스택 정의를 담당합니다.

## src 디렉토리 상세

### 1) `src/backend`

FastAPI 기반 백엔드와 Langflow 서비스 레이어의 중심입니다.
핵심 구현은 `src/backend/base/langflow/`에 집중되어 있습니다.

#### 대표 파일과 역할

- `src/backend/base/langflow/__main__.py`
  - `langflow` CLI 엔트리포인트입니다.
  - `run`, `superuser`, `migration` 등 명령을 구성하고 서버 시작 흐름을 제어합니다.
- `src/backend/base/langflow/main.py`
  - FastAPI 앱 팩토리입니다.
  - 앱 초기화(lifespan), middleware/CORS/static 설정, 서비스 시작/종료를 관리합니다.
- `src/backend/base/langflow/server.py`
  - Gunicorn 실행 구성을 담당합니다.
  - 워커/로깅/시그널 처리 같은 서버 런타임 세부 동작을 정의합니다.
- `src/backend/base/langflow/api/router.py`
  - `/api/v1`, `/api/v2` 라우터를 통합하는 상위 라우터입니다.
- `src/backend/base/langflow/api/v1/flows.py`
  - Flow 생성/조회/수정/삭제 등 Flow 도메인 API의 핵심입니다.
- `src/backend/base/langflow/api/v1/chat.py`
  - 빌드/실행/이벤트 스트리밍 등 실행 인터랙션 API를 담당합니다.
- `src/backend/base/langflow/services/deps.py`
  - FastAPI 의존성 주입(DI) 경계입니다.
  - 서비스/DB 세션 주입 공통 로직을 제공합니다.
- `src/backend/base/langflow/services/database/service.py`
  - DB 엔진/세션/마이그레이션/헬스 점검을 관리합니다.

#### 테스트 구조

- `src/backend/tests/conftest.py`
  - 공통 fixture, 테스트 클라이언트, DB/인증 초기화 로직을 제공합니다.
- `src/backend/tests/unit/`
  - 단위 테스트.
- `src/backend/tests/integration/`
  - 통합 테스트.
- `src/backend/tests/performance/`, `src/backend/tests/locust/`
  - 성능/부하 테스트.

---

### 2) `src/frontend`

React + TypeScript + Vite 기반 UI 애플리케이션입니다.
상태 관리는 Zustand, 데이터 패칭은 React Query + Axios 패턴을 사용합니다.

#### 대표 파일과 역할

- `src/frontend/src/index.tsx`
  - 프론트엔드 앱 부트스트랩 엔트리입니다.
  - i18n 초기화 후 React 루트를 마운트합니다.
- `src/frontend/src/App.tsx`
  - 앱 최상위 컴포넌트입니다.
  - 전역 UI 상태(예: 테마)와 라우터 주입을 담당합니다.
- `src/frontend/src/routes.tsx`
  - 전체 라우팅 트리를 정의합니다.
  - 인증/권한 흐름이 여기서 연결됩니다.
- `src/frontend/src/stores/flowStore.ts`
  - 플로우 캔버스 핵심 상태 저장소입니다.
  - 노드/엣지, 빌드 상태, 실행/검증, 저장 흐름을 관리합니다.
- `src/frontend/src/stores/authStore.ts`
  - 인증 상태(로그인/세션 관련)를 관리합니다.
- `src/frontend/src/controllers/API/api.tsx`
  - Axios 인스턴스 및 인터셉터 레이어입니다.
  - 공통 에러 처리, 인증 처리, 요청/응답 공통 정책을 담당합니다.
- `src/frontend/src/controllers/API/queries/`
  - React Query 훅 계층입니다.
  - 캐시, refetch, mutation 기반 API 상호작용을 제공합니다.
- `src/frontend/src/contexts/index.tsx`
  - Query/Auth/ReactFlow 등 앱 전역 Provider 조립 지점입니다.

#### 프론트 테스트/설정

- `src/frontend/vite.config.mts`
  - Vite 번들 및 dev 프록시 설정.
- `src/frontend/tsconfig.json`
  - TypeScript strict 모드, path alias, 컴파일 범위 설정.
- `src/frontend/playwright.config.ts`
  - E2E 실행 설정.
- `src/frontend/tests/`
  - Playwright 기반 E2E 시나리오 및 fixture.
- `src/frontend/jest.config.js`
  - 프론트 단위 테스트 구성.

---

### 3) `src/lfx`

경량 실행기(Executor)와 그래프 엔진 코어를 포함하는 독립 패키지입니다.
백엔드 런타임에서 재사용되는 핵심 실행 로직이 여기에 있습니다.

#### 대표 파일과 역할

- `src/lfx/src/lfx/__main__.py`
  - `lfx` CLI 엔트리포인트입니다.
- `src/lfx/src/lfx/cli/commands.py`
  - `lfx serve`, `lfx run` 등의 명령 구현을 담당합니다.
- `src/lfx/src/lfx/cli/serve_app.py`
  - 플로우 실행용 FastAPI 앱 생성 로직을 포함합니다.
- `src/lfx/src/lfx/graph/graph/base.py`
  - 그래프 실행 엔진의 핵심 자료구조/실행 로직이 위치합니다.
- `src/lfx/src/lfx/services/`
  - auth/settings/cache/session/tracing 등 실행 인프라 서비스.
- `src/lfx/src/lfx/schema/`
  - 실행 입출력 데이터 모델/스키마 정의.

---

### 4) `src/sdk`

외부에서 Langflow 기능을 소비하기 위한 SDK 계층입니다.
클라이언트/스키마/헬퍼 유틸 등 통합용 코드의 위치입니다.

## 문서/CI/배포 디렉토리

- `docs/`
  - 사용자/개발자 문서 사이트 소스.
  - `docs/docusaurus.config.js`에서 사이트 구조, 버전, 플러그인, 라우팅 정책을 관리합니다.
- `.github/workflows/`
  - CI/CD 파이프라인.
  - `ci.yml`, `python_test.yml` 등에서 변경 경로별 테스트 및 검증 작업을 오케스트레이션합니다.
- `docker/`
  - 개발/배포용 컨테이너 이미지 빌드 구성.
- `deploy/`
  - compose 기반 배포 토폴로지(서비스 묶음) 정의.

## 빠른 진입점 가이드

- API를 수정/추가할 때: `src/backend/base/langflow/api/` -> `services/` -> 필요 시 `tests/`.
- DB 변경이 있을 때: `services/database/` + Alembic(`alembic.ini`, `alembic/versions`).
- 실행 로직(그래프) 분석 시: `src/lfx/src/lfx/graph/`.
- UI 라우팅/화면 흐름 변경 시: `src/frontend/src/routes.tsx`, `pages/`, `components/`.
- 전역 플로우 편집 상태 확인 시: `src/frontend/src/stores/flowStore.ts`.
- 문서/릴리즈 파이프라인 파악 시: `docs/`, `.github/workflows/`, `Makefile`.

## 참고

이 문서는 "전체 파일 나열"이 아닌 "핵심 구조 파악"을 목표로 작성되었습니다.
세부 구현 분석이 필요하면 도메인 단위(예: auth, flow 실행, playground, mcp)로 별도 분석 문서를 분리하는 것을 권장합니다.
