# idrflow 1차 리브랜딩 — 작업 개요·목표·단계별 실행 계획

> **문서 목적:** Langflow 기반 제품을 **제품명 idrflow**로 전환하는 1차 작업(가시 영역 중심)에 대해, **개요·목표·범위·단계별 상세 계획**을 정리한다.
> **법률·상표·계약**은 별도 채널에서 다루며, 본 문서는 **소스·프로덕트(UX/문서) 수준**에 한정한다.

---

## 1. 개요

### 1.1 배경

- 사업화를 위해 **내부 제품명을 `idrflow`로 확정**했고, **핵심 기능·지원 범위는 현행 Langflow와 동일**하게 유지한다.
- 1차 전환은 **사용자에게 보이는 부분**에 집중한다: **웹 UI/UX**, **문서(docs)**, **PWA/브라우저 메타**, **이미지·로고** 등.
- 런타임 식별자(패키지명, API 경로, DB 키 등)는 **가능한 한 유지**하여 기술적 회귀를 최소화한다.

### 1.2 이 저장소에서의 위치

- **프론트엔드:** `src/frontend/`
- **문서 사이트(Docusaurus):** `docs/`
- **백엔드/CLI(표시 문자열만 후순위):** `src/backend/`, `src/lfx/` 등

---

## 2. 목표

### 2.1 정성 목표

1. **브랜드 일관성:** 화면·문서·탭 제목·PWA 설명에서 **“Langflow”가 제품명으로 쓰이던 자리**를 **idrflow(및 팀이 정한 표기 규칙)**로 통일한다.
2. **기능 보존:** Flow 편집, 실행, API, 인증, 배포 등 **기존 동작을 의도적으로 바꾸지 않는다.**
3. **배포 가능:** 프론트·docs **빌드가 통과**하고, 스모크 수준에서 **주요 사용자 여정**이 끊기지 않는다.

### 2.2 1차 범위(포함)

| 영역 | 내용 |
|------|------|
| UI 카피 | 로그인, 헤더, 빈 상태, 설정, 모달, 어시스턴트 등 **사용자 가독 텍스트** |
| i18n | `src/frontend/src/locales/*.json` 내 제품명·소개 문구 |
| 정적 메타 | `index.html` `<title>`, `manifest.json`, 파비콘/앱 아이콘 |
| 문서 | `docs/docusaurus.config.js`, `docs/static/`, `docs/docs/`(및 팀이 정한 하위 집합) |
| 시각 자산 | 로고/파비콘/OG 이미지(정책에 따라 경로만 유지하고 파일 교체) |

### 2.3 1차 범위(제외 또는 보류)

| 항목 | 사유 |
|------|------|
| Python/npm **패키지 공개 이름**을 `idrflow`로 변경 | PyPI/npm 정책·배포 파이프라인·다운스트림 영향 — **별도 결정** 후 |
| `versioned_docs/` 전면 개정 | 분량·링크 검증 비용 큼 — **2차** 또는 “현행 docs만” 전략 |
| API URL·스키마 내부 `langflow` 식별자 일괄 변경 | **호환성·클라이언트 파손** 위험 — 제품 정책 없이는 비권장 |
| E2E/단위 테스트 **파일명·내부 id** 대량 rename | CI 안정성 — **문구 변경 후** 실패 시 점진 수정 |

### 2.4 완료의 정의(Definition of Done) — 1차

- [ ] 사용자 주요 화면에서 **제품명이 idrflow 정책에 맞게** 보인다(탭 제목·헤더·로그인·랜딩 수준).
- [ ] `src/frontend` **프로덕션 빌드 성공** (`npm run build` 등 기존 프로젝트 스크립트).
- [ ] `docs` **빌드 성공** (`npm run build` in `docs/`).
- [ ] 문서/설정에 남아 있는 **공개 URL·조직명**이 팀 정책과 일치(예: 공식 문서 링크 유지 vs 자체 도메인 — **별도 커뮤니케이션 가이드** 반영).
- [ ] 변경 요약(CHANGELOG 또는 내부 릴리즈 노트)에 **“브랜딩만 변경, 기능 동일”** 명시.

---

## 3. 실행 원칙

1. **표시 문자열과 코드 식별자를 분리한다.**
   - 바꿀 것: UI 문자열, 문서, `title`/`description` 메타.
   - 함부로 바꾸지 말 것: `import` 경로, REST 경로, 환경변수 **키**(`/api/...`, `LANGFLOW_*` 등), 컴포넌트 **클래스명**(Langflow 컴포넌트 식별자 이슈는 백엔드 가이드 참고).
2. **검색 치환은 항상 문맥 단위로 한다.**
   - `Langflow` → `idrflow` (표기 규칙 확정 후: `Idrflow` / `IDRFlow` 등).
3. **docs는 단계화한다.**
   - 최소: `docusaurus.config.js` + `static/img` + 핵심 Get Started/About.
   - 전면: `docs/docs/**` + 필요 시 `versioned_docs/**`.
4. **테스트는 문구 의존 시 업데이트한다.**
   - `getByText('Langflow')` 류는 idrflow로 맞추거나 `data-testid`로 이전(별도 리팩터는 범위 밖이면 최소 수정).

---

## 4. 단계별 상세 계획

아래 단계는 **권장 순서**이며, 병렬 가능한 항목은 팀 역할에 따라 조정한다.

---

### Phase 0 — 준비 (반나절~1일)

| # | 작업 | 상세 | 산출 |
|---|------|------|------|
| 0.1 | **브랜드 가이드 확정** | 제품명 표기(대소문), 슬로건, 영/한 병기 여부, 금지 표현 | 1p 가이드 |
| 0.2 | **자산 패키지** | 파비콘, PWA 아이콘, 헤더 로고, 다크/라이트, (선택) OG 이미지 | `public/`·`docs/static/img/`에 넣을 파일 |
| 0.3 | **기준선 저장** | 리브랜딩 직전 브랜치/태그, 주요 시나리오 스크린샷(선택) | 스모크 기준 |
| 0.4 | **검색 인덱스** | `rg "Langflow" src/frontend` / `rg "Langflow" docs` 등으로 **파일 목록** 스냅샷 | 체크리스트 입력 |

**완료 기준:** 가이드·자산·검색 기준선이 있고, 담당자가 동일한 기대를 공유한다.

---

### Phase 1 — 프론트: “껍데기” + 전역 카피 (1~2일)

| # | 위치 | 작업 | 방법 |
|---|------|------|------|
| 1.1 | `src/frontend/index.html` | `<title>`, `lang` 필요 시 | 제품명 반영 |
| 1.2 | `src/frontend/public/manifest.json` | `name`, `short_name`, `description` | idrflow 톤에 맞게 |
| 1.3 | `src/frontend/public/` | `favicon.ico`, `icons/*` | 자산 교체, **파일명 유지** 권장 |
| 1.4 | `src/frontend/src/locales/*.json` | `Langflow` 등 키 메시지 | 언어별 일괄 정합; 누락 언어 없는지 diff |
| 1.5 | `src/frontend/src/constants/` | 공통 문자열·알림 | Phase 1에서 보이는 것 우선 |

**검증:** `make frontend` 또는 `npm run dev`로 탭 제목·PWA 설명·첫 로드 문구 확인.

---

### Phase 2 — 프론트: 화면·컴포넌트 (2~4일, 규모에 따라)

우선순위: **첫 방문 ~ 일상 사용 빈도 높은 경로**

| 순서 | 영역 | 경로 예시 | 작업 |
|------|------|-----------|------|
| 2.1 | 헤더·내비 | `components/core/appHeaderComponent/` | 로고 컴포넌트, 텍스트 |
| 2.2 | 인증 | `pages/LoginPage/`, `SignUpPage/`, `AdminPage/LoginPage/` | 카피·에러 문구 |
| 2.3 | 메인·빈 상태 | `pages/MainPage/pages/empty-page.tsx`, `emptyPage/` | 온보딩 문구 |
| 2.4 | 플레이그라운드·채팅 | `modals/IOModal/`, `playgroundComponent/` | 봇 메시지·로고 컴포넌트 |
| 2.5 | 어시스턴트 | `components/core/assistantPanel/` | empty state, 시스템 메시지 템플릿 |
| 2.6 | 설정·배포 UI | `pages/SettingsPage/`, `deploymentsPage/` | 사용자 노출 라벨만 |

**방법:** 파일별 `Langflow` 검색 → 문맥이 **제품명**이면 치환; **프로젝트명·기술명**이면 유지.

**검증:** 수동 스모크(로그인 → 홈 → 플로 1개 열기 → 플레이그라운드).
**회귀:** `make format_frontend` 후 `make lint`(프로젝트 정책에 맞게).

---

### Phase 3 — 문서 사이트 (2~5일, 범위에 따라)

#### 3-A 최소 패키지 (1차 권장 시작점)

| # | 파일/디렉터리 | 작업 |
|---|----------------|------|
| 3-A.1 | `docs/docusaurus.config.js` | `title`, `tagline`, navbar/footer, `url`/`baseUrl`은 **배포 도메인 정책** 반영 |
| 3-A.2 | `docs/static/img/` | 파비콘·로고 SVG 교체 |
| 3-A.3 | `docs/docs/Get-Started/`, `about-*.mdx` 등 소개 계열 | 제품 서술을 idrflow로 |

#### 3-B 본문 전개

| # | 작업 |
|---|------|
| 3-B.1 | `docs/docs/**` 전수: `Langflow` → 정책 표기(코드블록·CLI 예외 주의) |
| 3-B.2 | 스크린샷 교체(선택) — UI가 바뀐 뒤 배치하면 중복 작업 감소 |

#### 3-C 버전 문서

| 전략 | 내용 |
|------|------|
| 보류 | `versioned_docs/` 는 과거 스냅샷으로 두고, 상단에 “과거 문서” 안내만 |
| 동기화 | 릴리즈마다 또는 2차 스프린트에서 점진 치환 |

**검증:** `cd docs && npm install && npm run build`.
**참고:** Redoc/OpenAPI 번들 경고(`Can't resolve $ref`)는 **별도 기술 부채**로 목록화; 1차 목표는 **빌드 통과** 및 본문 브랜딩.

---

### Phase 4 — 백엔드·CLI·메타데이터 (선택, 0.5~2일)

| # | 위치 | 작업 |
|---|------|------|
| 4.1 | OpenAPI/스웨거 노출 제목 | 사용자에게 보이는 title/description만 |
| 4.2 | CLI `--help` 웰컴 문자열 | `src/lfx/`, `langflow` CLI 진입점 근처 |
| 4.3 | `pyproject.toml` / 루트 README | **내부 포크명**만 바꿀지 정책에 따름; 공개 패키지명 변경은 별도 결정 |

**원칙:** API 계약·경로는 건드리지 않는다.

---

### Phase 5 — 품질 게이트·마무리 (1~2일)

| # | 작업 | 상세 |
|---|------|------|
| 5.1 | 빌드 | `src/frontend` prod 빌드, `docs` 빌드 |
| 5.2 | 테스트 | 단위/일부 E2E — **문구 깨짐**만 우선 수정 |
| 5.3 | 검색 잔여 | `rg -i "langflow" src/frontend src` 를 **화이트리스트**(허용 경로)와 함께 검토 |
| 5.4 | 문서화 | 내부 위키/README에 “idrflow = Langflow 포크, 기능 동일” 한 줄 + 링크 |
| 5.5 | 릴리즈 | 태그·배포 체크리스트 |

---

## 5. 역할·병렬화 제안

| 역할 | 담당 |
|------|------|
| UI 카피 + i18n | 프론트 1명 |
| 자산(로고/파비콘) | 디자인 또는 프론트 |
| docs 최소 → 확장 | 테크라이터 또는 프론트 |
| CI/테스트 안정화 | QA 또는 프론트 |

---

## 6. 리스크·완화

| 리스크 | 완화 |
|--------|------|
| 전역 치환으로 API URL/패키지 깨짐 | **경로·식별자는 치환 금지 리스트** 유지; PR 단위로 리뷰 |
| E2E 텍스트 의존 실패 | 실패 로그 기준으로 해당 스펙만 수정 |
| docs 빌드 시간·링크 오류 | `versioned_docs` 범위 조절; broken link는 Docusaurus 설정에 따라 단계적 처리 |
| 번역 누락 | `locales` 전 언어 동일 키 검사 |

---

## 7. 빠른 참고 — 검색 커맨드 예시

프로젝트 루트에서(도구는 팀 환경에 맞게):

```bash
rg "Langflow" src/frontend --glob '!**/tests/**'
rg "Langflow" docs/docs docs/docusaurus.config.js
```

테스트 포함 전체:

```bash
rg "Langflow" src/frontend
```

---

## 8. 문서 이력

| 날짜 | 내용 |
|------|------|
| (초안) | idrflow 1차 리브랜딩 계획 수립 |

---

*본 계획은 저장소 구조(`src/frontend`, `docs`)에 맞춰 작성되었으며, 실행 시 팀의 배포·도메인·패키지 정책에 따라 Phase 3-A의 `url`/링크 항목을 조정한다.*
