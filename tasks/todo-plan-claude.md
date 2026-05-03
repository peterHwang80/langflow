# idrflow 리브랜딩 상세 계획서

## 개요

Langflow(MIT 라이선스) 오픈소스를 기반으로 **idrflow**라는 제품명으로 사업화한다.
기능과 아키텍처는 현재 Langflow를 그대로 유지하고, 사용자에게 보이는 UI/UX 및 문서를 idrflow 브랜드로 교체하는 것이 1차 목표다.

## 목표

- Langflow upstream을 지속적으로 추적하면서 보안 패치 및 신규 기능을 이식할 수 있는 포크 구조 유지
- 사용자에게 노출되는 모든 "Langflow" 브랜드를 "idrflow"로 교체
- 백엔드 내부 모듈명·API 엔드포인트는 그대로 유지 (upstream 머지 비용 최소화)
- 작업 완료 후 독립적인 idrflow 배포 가능 상태 달성

## 원칙

1. **내부 코드 구조 불변**: 백엔드 모듈명(`langflow.*`), API 경로(`/api/v1/`), DB 스키마, 환경 변수(`LANGFLOW_*`)는 건드리지 않는다. Upstream 머지 비용이 기하급수적으로 증가한다.
2. **표층(surface) 교체만**: 사용자 눈에 보이는 텍스트, 로고, 문서 만 교체한다.
3. **파일 분리 우선**: 가능하면 기존 파일을 수정하지 않고 customization 레이어(이미 존재)를 활용한다.
4. **추적 가능성 유지**: 모든 변경 사항을 커밋 단위로 명확히 분리하여 upstream diff를 최소화한다.

---

## 변경 영향 범위 분석

### 변경 대상 요약

| 영역 | 파일 수 | 우선순위 | 방식 |
|------|---------|---------|------|
| Frontend 핵심 상수 | 2 | P0 | 직접 수정 |
| Customization 레이어 | ~10 | P0 | 직접 수정 |
| HTML 진입점 / manifest | 3 | P0 | 직접 수정 |
| 로고·이미지 에셋 | 8 | P1 | 파일 교체 (디자인 필요) |
| 문서 (MDX/MD) | 624 | P1 | 스크립트 일괄 치환 |
| Docusaurus 설정 | 1 | P1 | 직접 수정 |
| 외부 URL (docs, store) | ~10곳 | P2 | 직접 수정 |
| 백엔드 노출 텍스트 | ~5 | P2 | 직접 수정 |

### 변경하지 않는 항목 (Upstream 유지)

- 백엔드 모듈 경로: `src/backend/base/langflow/`
- API 엔드포인트: `/api/v1/`, `/api/v2/`
- 환경 변수: `LANGFLOW_*`
- DB 테이블·컬럼명
- LocalStorage 키: `langflow_access_token`, `langflow-shortcuts` 등 (내부용)
- Python 클래스명: `LangflowApplication`, `LangflowUvicornWorker` 등
- 컴포넌트 내부 CSS 클래스: `langflow-chat-desc` 등 (내부 스타일)

---

## 단계별 상세 계획

---

### Phase 0: 환경 준비 및 브랜치 전략

**목표**: 안전한 작업 환경 구성, upstream 추적 가능한 Git 구조 수립

#### 0-1. Git 브랜치 구조 설정

```
main (upstream 추적)
  └── idrflow/branding (리브랜딩 작업 브랜치)
        └── idrflow/release (배포용)
```

- `main` 브랜치: Langflow upstream 변경사항을 주기적으로 머지
- `idrflow/branding`: 모든 리브랜딩 변경사항만 포함 (rebase로 upstream 위에 올림)
- `idrflow/release`: 배포 준비 브랜치

#### 0-2. upstream remote 추가

```bash
git remote add upstream https://github.com/langflow-ai/langflow.git
git fetch upstream
```

#### 0-3. 작업 브랜치 생성

```bash
git checkout -b idrflow/phase1-branding
```

**완료 기준**: 브랜치 생성 및 upstream remote 설정 확인

---

### Phase 1: Frontend 핵심 텍스트 교체

**목표**: 사용자에게 가장 많이 노출되는 UI 텍스트를 idrflow로 교체

**예상 소요 시간**: 2~3시간

#### 1-1. HTML 진입점 및 PWA 설정

**파일**: `src/frontend/index.html`

| 변경 전 | 변경 후 |
|---------|---------|
| `<title>Langflow</title>` | `<title>idrflow</title>` |

**파일**: `src/frontend/public/manifest.json`

| 필드 | 변경 전 | 변경 후 |
|------|---------|---------|
| `name` | `"Langflow"` | `"idrflow"` |
| `short_name` | `"Langflow"` | `"idrflow"` |
| `description` | `"Langflow is a low-code builder..."` | `"idrflow is a low-code builder..."` |

**파일**: `src/frontend/package.json`

| 필드 | 변경 전 | 변경 후 |
|------|---------|---------|
| `name` | `"langflow"` | `"idrflow"` |

---

#### 1-2. 핵심 UI 상수 파일

**파일**: `src/frontend/src/constants/constants.ts`

변경 대상 라인:

```typescript
// 변경 전 → 변경 후

// Line 171
"Refer to the Langflow documentation"
→ "Refer to the idrflow documentation"

// Line 270
"Langflow: Create, Chain, Communicate."
→ "idrflow: Create, Chain, Communicate."

// Line 276
"Design Dialogues with Langflow."
→ "Design Dialogues with idrflow."

// Line 671 (API_PAGE_PARAGRAPH)
"Your secret Langflow API keys are listed below..."
→ "Your secret idrflow API keys are listed below..."

// Line 753
LANGFLOW_CHAT_TITLE = "Langflow Chat"
→ LANGFLOW_CHAT_TITLE = "idrflow Chat"

// Line 761
STORE_TITLE = "Langflow Store"
→ STORE_TITLE = "idrflow Store"

// Line 763 (상수명은 문서화용; 실제 식별자는 소스 기준)
KEY_INPUT_LABEL = "Insert your Langflow credential."
→ KEY_INPUT_LABEL = "Insert your idrflow credential."

// Line 995
DOCS_URL = "https://docs.langflow.org"
→ DOCS_URL = "https://docs.idrflow.com"   (또는 준비된 URL로)

// Line 998
DESKTOP_URL = "https://www.langflow.org/desktop"
→ DESKTOP_URL = "https://www.idrflow.com/desktop"
```

**주의**: `LANGFLOW_ACCESS_TOKEN`, `LANGFLOW_API_TOKEN` 등 LocalStorage 키 상수명은 **변경하지 않는다** (내부 구현 변수명이며 사용자에게 노출되지 않음).

---

#### 1-3. 알림 메시지 상수

**파일**: `src/frontend/src/constants/alerts_constants.tsx`

```typescript
// Line 41
"...to use the Langflow Store."
→ "...to use the idrflow Store."

// Line 43
"...to use the Langflow Store."
→ "...to use the idrflow Store."
```

---

#### 1-4. Customization 레이어 설정

**파일**: `src/frontend/src/customization/config-constants.ts`

```typescript
// 변경 전
export const DOCS_LINK = "https://docs.langflow.org";

// 변경 후
export const DOCS_LINK = "https://docs.idrflow.com";
```

**파일**: `src/frontend/src/customization/utils/urls.ts`

```typescript
// 변경 전
LangflowButtonRedirectTarget = "https://langflow.org"

// 변경 후
LangflowButtonRedirectTarget = "https://idrflow.com"
```

**파일**: `src/frontend/src/customization/utils/custom-poll-build-events.ts`

```typescript
// 변경 전
"Langflow was not able to connect to the server..."

// 변경 후
"idrflow was not able to connect to the server..."
```

**파일**: `src/frontend/src/customization/components/custom-store-sidebar.tsx`

```typescript
// title: "Langflow API Keys" → "idrflow API Keys"
// title: "Langflow Store"    → "idrflow Store"
```

---

#### 1-5. Share Modal 텍스트

**파일**: `src/frontend/src/modals/shareModal/index.tsx`

```typescript
// "} to the Langflow Store." → "} to the idrflow Store."
```

---

#### 1-6. buildUtils 에러 메시지

**파일**: `src/frontend/src/utils/buildUtils.ts`

```typescript
// "Langflow was not able to connect to the server..."
// → "idrflow was not able to connect to the server..."
```

**완료 기준**: `grep -r '"Langflow' src/frontend/src --include="*.tsx" --include="*.ts"` 결과 0건

---

### Phase 2: 로고·이미지 에셋 교체

**목표**: 모든 Langflow 로고를 idrflow 로고로 교체

**전제조건**: idrflow 로고 디자인 파일 준비 완료

**예상 소요 시간**: 디자인 완료 후 1시간

#### 2-1. 교체 대상 에셋 목록

| 현재 파일명 | 용도 | 규격 | 비고 |
|------------|------|------|------|
| `src/frontend/src/assets/LangflowLogo.svg` | 헤더, 로그인 페이지, 챗봇 아이콘 | SVG (단색, 심볼) | 22개 컴포넌트에서 import |
| `src/frontend/src/assets/LangflowLogoColor.svg` | Playground 모달 | SVG (컬러) | 1개 컴포넌트 |
| `src/frontend/src/assets/langflow_logo_white.svg` | 흰 배경용 전체 로고 | SVG (텍스트 포함) | |
| `src/frontend/src/assets/langflow_logo_black.svg` | 검정 배경용 전체 로고 | SVG (텍스트 포함) | |
| `src/frontend/src/assets/langflow-icon-smooth.svg` | 아이콘 (작은 크기) | SVG | |
| `src/frontend/src/assets/langflow-icon-smooth.png` | 아이콘 PNG 버전 | PNG | |
| `src/frontend/src/assets/langflow_assistant.svg` | AI 어시스턴트 일러스트 | SVG (67KB 복잡) | 선택적 교체 |
| `src/frontend/src/assets/MCPLangflow.png` | MCP 기능 설명 이미지 | PNG | |
| `src/frontend/public/favicon.ico` | 브라우저 탭 아이콘 | ICO (16~256px 멀티) | |

#### 2-2. 교체 방식

**방식 A (권장)**: 파일 내용만 교체, 파일명 유지
- 기존 파일명을 그대로 두고 SVG 내용만 idrflow 로고로 교체
- import 경로 변경 불필요 → upstream 머지 시 충돌 없음

**방식 B**: 새 파일명으로 추가 후 import 경로 수정
- 파일명을 `IdrflowLogo.svg` 등으로 변경
- 22개 이상의 컴포넌트에서 import 경로 수정 필요
- 권장하지 않음 (upstream 충돌 증가)

#### 2-3. favicon 교체 절차

```bash
# ICO 파일 생성 도구 필요 (ImageMagick 또는 온라인 도구)
# 16x16, 32x32, 48x48, 256x256 PNG를 합쳐서 .ico 생성
convert icon-16.png icon-32.png icon-48.png icon-256.png \
  -define icon:auto-resize=256,48,32,16 \
  src/frontend/public/favicon.ico
```

#### 2-4. manifest.json 아이콘 경로

현재 `manifest.json`은 `/icons/` 경로를 참조하지만 실제로는 `favicon.ico`만 존재.
idrflow 아이콘 파일들을 `src/frontend/public/icons/` 에 배치:

```
public/icons/
  32x32.png
  128x128.png
  128x128@2x.png
  icon.ico
```

**완료 기준**: 앱 실행 후 로그인 페이지, 헤더, 브라우저 탭에서 idrflow 로고 확인

---

### Phase 3: 문서 리브랜딩

**목표**: 624개 마크다운/MDX 문서에서 Langflow → idrflow 브랜드 교체

**예상 소요 시간**: 스크립트 작성 1시간 + 검토 2시간

#### 3-1. 치환 스크립트 작성

`tasks/rebrand-docs.sh` 스크립트:

```bash
#!/usr/bin/env bash
# idrflow 문서 리브랜딩 스크립트
# 실행: bash tasks/rebrand-docs.sh

set -e

DOCS_DIR="docs/docs"
BACKUP_DIR="docs/.backup-langflow"

# 백업
echo "[1/4] 문서 백업 중..."
cp -r "$DOCS_DIR" "$BACKUP_DIR"

# 텍스트 치환 규칙
echo "[2/4] 텍스트 치환 중..."

find "$DOCS_DIR" -type f \( -name "*.md" -o -name "*.mdx" \) | while read file; do
  # 대소문자 구분 치환
  sed -i '' \
    -e 's/Langflow/idrflow/g' \
    -e 's/langflow/idrflow/g' \
    -e 's/LANGFLOW/IDRFLOW/g' \
    -e 's/docs\.langflow\.org/docs.idrflow.com/g' \
    -e 's/www\.langflow\.org/www.idrflow.com/g' \
    "$file"
done

echo "[3/4] Docusaurus 설정 파일 수정..."
# docusaurus.config.js는 별도 처리 (주석 포함)

echo "[4/4] 완료. 검토 후 백업 디렉토리를 삭제하세요:"
echo "  rm -rf $BACKUP_DIR"
```

#### 3-2. 치환 예외 목록 (변경하지 않을 것들)

- `langflow-ai/langflow` GitHub 저장소 URL (현재 참조가 필요한 경우)
- `pip install langflow` 명령어 → `pip install idrflow` 또는 별도 패키지명으로
- 코드 예제 내 `import langflow` → Phase 4 백엔드 패키지 이후 검토

#### 3-3. Docusaurus 설정 파일 수정

**파일**: `docs/docusaurus.config.js`

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| title | `"Langflow Documentation"` | `"idrflow Documentation"` |
| tagline | `"Langflow is a low-code app builder..."` | `"idrflow is a low-code app builder..."` |
| url | `"https://docs.langflow.org"` | `"https://docs.idrflow.com"` |
| organizationName | `"langflow-ai"` | `"idrflow"` (또는 자사 GitHub org) |
| projectName | `"langflow"` | `"idrflow"` |
| logo.alt | `"Langflow"` | `"idrflow"` |
| logo.src | `"img/lf-docs-light.svg"` | `"img/idrflow-docs-light.svg"` |
| footer copyright | `"© ... Langflow"` | `"© ... idrflow"` |
| algolia.indexName | `"langflow"` | idrflow Algolia 인덱스 |
| data-platform-title (3곳) | `'Langflow'` | `'idrflow'` |

#### 3-4. 문서 로고 이미지 교체

`docs/static/img/` 디렉토리에서:
- `lf-docs-light.svg` → idrflow 문서 로고 (라이트 모드)
- `lf-docs-dark.svg` → idrflow 문서 로고 (다크 모드)

**완료 기준**: `grep -r "Langflow" docs/docs/ --include="*.md" --include="*.mdx" | wc -l` 결과 0건

---

### Phase 4: 외부 URL 및 링크 정비

**목표**: 앱 내 하드코딩된 외부 Langflow URL을 idrflow 도메인으로 교체

**예상 소요 시간**: 1시간

#### 4-1. 도메인 계획

idrflow 서비스를 위해 준비할 도메인:

| 서비스 | 도메인 (예시) |
|--------|------------|
| 메인 사이트 | `www.idrflow.com` |
| 문서 | `docs.idrflow.com` |
| API | `api.idrflow.com` |
| 스토어 (향후) | `store.idrflow.com` |

#### 4-2. 변경 파일 목록

| 파일 | 현재 URL | 변경 후 |
|------|---------|---------|
| `src/frontend/src/customization/config-constants.ts` | `docs.langflow.org` | `docs.idrflow.com` |
| `src/frontend/src/customization/utils/urls.ts` | `langflow.org` | `idrflow.com` |
| `src/frontend/src/constants/constants.ts` | `docs.langflow.org`, `langflow.org/desktop` | idrflow 도메인 |
| `src/frontend/src/stores/darkStore.ts` | GitHub stars API (`langflow-ai/langflow`) | idrflow GitHub repo |

#### 4-3. GitHub Stars 카운트 처리

현재 헤더에 Langflow GitHub star 수를 표시하는 기능이 있음.

옵션:
- A) idrflow GitHub 저장소 star 수로 교체
- B) 해당 기능 비활성화 (`customization/components/custom-langflow-counts.tsx` 수정)
- C) 그대로 유지 (사용자에게는 숫자만 보임)

**권장**: Phase 1에서는 B(비활성화)로 처리, 자사 GitHub 저장소 생성 후 A로 전환

---

### Phase 5: 백엔드 사용자 노출 텍스트 교체

**목표**: API 응답 또는 UI에 노출되는 백엔드 텍스트 교체

**예상 소요 시간**: 1시간

**원칙**: 백엔드 모듈 구조, 클래스명, 환경변수는 건드리지 않음. 오직 사용자에게 보이는 에러 메시지, 설명 텍스트만 교체.

#### 5-1. 변경 대상 확인

```bash
grep -rn '"Langflow\|Langflow ' \
  src/backend/base/langflow/ \
  --include="*.py" \
  | grep -v "class Langflow\|def langflow\|import langflow\|#.*Langflow\|langflow\." \
  | grep -i "error\|message\|title\|description\|label"
```

위 명령으로 실제 사용자 메시지만 추출 후 개별 수정.

#### 5-2. 알려진 변경 대상

- `langflow_launcher.py`: 실행 로그 메시지 (사용자 노출 여부 확인 필요)
- API 응답 에러 메시지에 "Langflow" 포함된 경우

---

### Phase 6: 검증 및 품질 확인

**목표**: 리브랜딩이 완전히 적용됐는지 검증하고, 기존 기능이 정상 동작하는지 확인

**예상 소요 시간**: 2~3시간

#### 6-1. 브랜딩 완전성 검사

```bash
# 사용자 노출 텍스트에 남은 "Langflow" 확인
grep -r '"Langflow\|>Langflow\|title.*Langflow\|alt.*Langflow' \
  src/frontend/src \
  --include="*.tsx" --include="*.ts" \
  | grep -v "//\|import\|from\|class\|LANGFLOW_"

# 문서 내 잔존 텍스트 확인
grep -r "Langflow" docs/docs/ --include="*.md" --include="*.mdx" | wc -l

# 외부 URL 잔존 확인
grep -r "langflow\.org\|docs\.langflow" src/frontend/src \
  --include="*.tsx" --include="*.ts" --include="*.css"
```

#### 6-2. 기능 동작 확인 체크리스트

- [ ] 앱 시작 (`make run_cli`)
- [ ] 브라우저 탭 제목: "idrflow" 표시
- [ ] 로그인 페이지: idrflow 로고 표시
- [ ] 헤더: idrflow 로고 표시
- [ ] 새 Flow 생성 및 저장
- [ ] 컴포넌트 드래그 앤 드롭
- [ ] Playground(챗봇) 실행: idrflow 로고 표시
- [ ] API 키 관리 페이지: "idrflow API Keys" 표시
- [ ] 설정 메뉴 정상 동작
- [ ] 문서 링크 클릭 시 idrflow 도메인으로 이동 (또는 404 확인)

#### 6-3. 빌드 검증

```bash
make format_frontend   # 포맷 검사
make lint              # 타입 체크
make unit_tests        # 단위 테스트
```

---

### Phase 7: Upstream 추적 체계 구축

**목표**: Langflow 신규 버전을 지속적으로 이식할 수 있는 워크플로우 수립

**예상 소요 시간**: 1시간 (초기 설정)

#### 7-1. Upstream 머지 절차

```bash
# 1. upstream 최신 변경사항 가져오기
git fetch upstream

# 2. main 브랜치에 upstream 머지
git checkout main
git merge upstream/main

# 3. 리브랜딩 브랜치에 rebase
git checkout idrflow/branding
git rebase main

# 4. 충돌 해결 후 테스트
```

#### 7-2. 충돌 최소화 전략

- customization 레이어(`src/frontend/src/customization/`)를 최대한 활용
  - 새 텍스트를 추가할 때 constants.ts가 아닌 customization/constants.ts에 추가
  - 새 컴포넌트를 override할 때 customization/components/ 활용
- 파일명 변경 금지 (import 경로 변경 = 충돌 증가)
- 백엔드 코드 수정 최소화

#### 7-3. 버전 추적

`tasks/upstream-tracking.md` 파일을 별도 관리:

```markdown
| 날짜 | Langflow 버전 | 머지 완료 | 충돌 파일 |
|------|-------------|---------|---------|
| 2026-05-02 | v1.9.1 | ✅ | - |
```

---

## 작업 일정 (권장)

| 단계 | 작업 | 소요 시간 | 의존성 |
|------|------|---------|--------|
| Phase 0 | Git 브랜치 전략 설정 | 30분 | 없음 |
| Phase 1 | Frontend 텍스트 교체 | 2~3시간 | Phase 0 |
| Phase 2 | 로고·에셋 교체 | 1시간 | 디자인 파일 준비 |
| Phase 3 | 문서 리브랜딩 | 3시간 | Phase 0 |
| Phase 4 | URL 정비 | 1시간 | 도메인 결정 |
| Phase 5 | 백엔드 텍스트 | 1시간 | Phase 0 |
| Phase 6 | 검증 | 2~3시간 | Phase 1~5 |
| Phase 7 | Upstream 체계 | 1시간 | Phase 6 |

**총 예상 시간**: 12~14시간 (디자인 파일 준비 시간 제외)

---

## 보류 및 향후 검토 항목

이번 1차 작업에서는 다루지 않는 항목들:

| 항목 | 이유 | 향후 시점 |
|------|------|---------|
| Python 패키지명 (`pip install langflow`) | 배포 파이프라인 전면 수정 필요 | 2차 작업 |
| API 엔드포인트 경로 변경 | 기존 통합 파괴, upstream 충돌 | 불필요 (내부용) |
| 환경 변수명 변경 (`LANGFLOW_*`) | 기존 배포 환경 파괴 | 불필요 |
| idrflow Store 구축 | 별도 서비스 인프라 필요 | 별도 프로젝트 |
| 다국어(i18n) 지원 | 현재 영어 단일 | 3차 작업 |
| Algolia 검색 인덱스 | 문서 사이트 배포 후 | Phase 3 완료 후 |

---

## 위험 요소 및 대응

| 위험 | 가능성 | 대응 |
|------|--------|------|
| Upstream 대규모 리팩터링 | 중간 | 머지 주기를 월 단위로 고정, changelog 모니터링 |
| 로고 미준비로 Phase 2 지연 | 높음 | Phase 1 먼저 완료, Phase 2는 병행 진행 |
| 도메인 미확보로 URL 임시 처리 | 중간 | placeholder URL 사용 후 일괄 교체 |
| 문서 bulk 치환 후 내용 오류 | 낮음 | 백업 후 진행, 주요 문서 수동 검토 |
