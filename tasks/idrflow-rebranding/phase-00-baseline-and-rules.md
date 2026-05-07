# Phase 00 — Baseline and Tracker Setup

**상태:** ✅ Done
**완료일:** 2026-05-03

---

## 완료 기준

- [x] `tasks/idrflow-rebranding/` 디렉토리 및 8개 추적 파일 생성
- [x] Whitelist 명시 — "무엇을 절대 바꾸지 않는지" 기록
- [x] 변경 대상 명시 — "무엇을 바꾸는지" 기록
- [x] 검색 기준선 수치 기록 (재실행 가능한 rg 명령 포함)
- [x] Git remote 상태 및 upstream 조건부 추가 절차 기록

---

## 1. Whitelist — 절대 바꾸지 않는 것

### 1-1. 환경변수

`LANGFLOW_*` 패턴으로 시작하는 모든 환경변수.

```
IDRFLOW_DATABASE_URL
IDRFLOW_SECRET_KEY
IDRFLOW_CONFIG_DIR
IDRFLOW_HOST
IDRFLOW_PORT
IDRFLOW_WORKERS
IDRFLOW_LOG_LEVEL
... (모든 LANGFLOW_ 접두사 환경변수)
```

### 1-2. Python 패키지명 및 모듈 경로

```python
import langflow
from langflow import ...
from langflow.base import ...
# pyproject.toml, setup.py 내 패키지명
# langflow, langflow-base
```

### 1-3. CLI 명령

```bash
uv run langflow run
uv run langflow --help
python -m langflow run
langflow run
```

### 1-4. API 경로

```
/api/v1/...
/api/v2/...
```

### 1-5. localStorage 키

`langflow_*` 패턴 또는 내부적으로 localStorage에 저장되는 식별자 키.

### 1-6. 내부 HTTP 헤더명

`x-langflow-*` 패턴의 커스텀 헤더.

### 1-7. 테스트 유틸리티 파일명 및 식별자

```
src/frontend/tests/utils/login-langflow.ts
src/frontend/tests/utils/add-flow-to-test-on-empty-langflow.ts
src/frontend/tests/utils/await-bootstrap-test.ts
```
— 파일명을 바꾸면 import 체인이 깨짐. 파일 내부에서 식별자로 쓰이는 문자열도 유지.

### 1-8. 코드블록/예제 내 명령어

문서(.md, .mdx) 안의 코드블록(` ```bash `, ` ```python ` 등)에서 사용되는 명령어, 환경변수, import 문.

---

## 2. 변경 대상

### 2-1. 사용자 표면 문자열 값

상수명(identifier)은 유지하고 값(string value)만 바꿉니다.

```ts
// 변경 전
export const APP_NAME = "Langflow";

// 변경 후
export const APP_NAME = "idrflow";
```

### 2-2. 로고 / Favicon 파일 내용

파일명(경로)은 유지하고 내용(SVG/PNG/ICO)만 교체합니다.

```
src/frontend/public/favicon.ico         → 내용 교체
src/frontend/src/assets/...logo*.svg    → 내용 교체
docs/static/img/...                     → 내용 교체
```

### 2-3. 문서 서술 / 타이틀 / 설명

`.md`, `.mdx` 파일의 사용자 서술 문장, H1/H2 제목, 링크 텍스트, 버튼 레이블.
단, 코드블록 내부는 제외 (1-8 규칙 적용).

### 2-4. 로케일 JSON 값 (7개 언어)

```
src/frontend/src/locales/en.json
src/frontend/src/locales/de.json
src/frontend/src/locales/es.json
src/frontend/src/locales/fr.json
src/frontend/src/locales/ja.json
src/frontend/src/locales/pt.json
src/frontend/src/locales/zh-Hans.json
```

JSON 키(key)는 유지, 값(value)의 "Langflow"만 "idrflow"로 변경.

### 2-5. 외부 링크 (Phase 2에서 중앙화)

현재 흩어진 외부 URL을 설정 상수로 모읍니다.
확정되지 않은 URL은 TODO 주석을 남기고 보류.

---

## 3. 검색 기준선 (2026-05-03 기준)

### 재실행 가능한 rg 명령

```bash
# Frontend — 파일 목록
rg -l "Langflow" src/frontend/src/ src/frontend/public/ src/frontend/index.html

# Frontend — 건수
rg -c "Langflow" src/frontend/src/ src/frontend/public/ src/frontend/index.html \
  | awk -F: '{s+=$2} END {print "Frontend total:", s}'

# Current docs — 파일 목록
rg -l "Langflow" docs/docs/

# Current docs — 건수
rg -c "Langflow" docs/docs/ \
  | awk -F: '{s+=$2} END {print "Current docs total:", s}'

# Versioned docs — 파일 목록
rg -l "Langflow" docs/versioned_docs/

# Versioned docs — 건수
rg -c "Langflow" docs/versioned_docs/ \
  | awk -F: '{s+=$2} END {print "Versioned docs total:", s}'

# Whitelist 확인 — Python import (건드리지 말 것)
rg -c "import langflow|from langflow" src/ \
  | awk -F: '{s+=$2} END {print "Python imports (whitelist):", s}'
```

### 기준선 수치

| 범주 | 건수 | 파일 수 | 비고 |
|------|------|---------|------|
| Frontend "Langflow" | 315 | 81 | Phase 1+2에서 처리 |
| Current docs "Langflow" | 1,886 | 188 | Phase 3에서 처리 |
| Versioned docs "Langflow" | 3,067 | 250 | Phase 4에서 처리 |
| Locale "Langflow" (7개 언어 × 19) | 133 | 7 | Phase 2에서 처리 |
| Python imports `langflow` (whitelist) | ~62 | ~27 | 유지 |

---

## 4. Git Remote 상태

```bash
# 현재 상태 (2026-05-03)
git remote -v
# origin  https://github.com/peterHwang80/langflow.git (fetch)
# origin  https://github.com/peterHwang80/langflow.git (push)
# upstream 없음
```

### upstream 조건부 추가 절차 (필요 시)

```bash
# upstream이 없을 때만 추가
git remote get-url upstream 2>/dev/null \
  || git remote add upstream https://github.com/langflow-ai/langflow.git

# 확인
git remote -v
```

> 이 Phase에서는 설정하지 않습니다. 향후 upstream 동기화가 필요할 때 위 명령을 사용하세요.

---

## 5. 기존 계획 문서 참조

변경 없이 유지합니다 (덮어쓰기 금지):

- `tasks/todo-plan-claude.md`
- `tasks/todo-plan-codex.md`
- `tasks/todo-plan-cursor.md`
- `tasks/whole-plan.md`
- `analysis/idrflow-1st-rebranding-checklist.md`
