# idrflow 리브랜딩 추적 디렉토리

## 목표

사용자 표면(UI/UX/Docs)의 `Langflow` → `idrflow` 전환.
내부 호환성 식별자(모듈 경로, API route, 환경변수, CLI 명령)는 유지합니다.

> **1차 완료 기준:** "사용자 표면의 브랜드 불일치 제거" — 저장소 전체에서 `langflow` 문자열 0건이 아닙니다.

---

## Phase 진행 상태

| Phase | 이름 | 상태 | 문서 |
|-------|------|------|------|
| 0 | Baseline and Tracker Setup | ✅ Done | [phase-00](./phase-00-baseline-and-rules.md) |
| 1 | Frontend Shell and Core Copy | 🔄 Re-opened | [phase-01](./phase-01-frontend-shell.md) |
| 2 | Assets, Locales, and Link Centralization | ⬜ Not Started | [phase-02](./phase-02-assets-locales-links.md) |
| 3 | Docs Site and Current Docs | ⬜ Not Started | [phase-03](./phase-03-docs-current.md) |
| 4 | Versioned Docs and Public Repo Surface | ⬜ Not Started | [phase-04](./phase-04-versioned-docs.md) |
| 5 | Residual Sweep and Final Verification | ⬜ Not Started | [phase-05](./phase-05-residual-sweep.md) |

---

## 핵심 원칙 (Whitelist 요약)

**절대 바꾸지 않는 것:**
- `LANGFLOW_*` 환경변수
- `import langflow` / `from langflow` (Python import)
- `uv run langflow run` 및 모든 CLI 명령
- `/api/v1`, `/api/v2` API 경로
- localStorage 키 (`langflow_*` 패턴 포함)
- 내부 헤더명
- Python 패키지명 (`langflow`, `langflow-base` 등)
- 테스트 ID, 테스트 유틸리티 파일명 내부 식별자
- 코드블록/예제 안의 명령어/환경변수

**바꾸는 것:**
- 사용자 표면 문자열 값 (상수명 유지, 값만 변경)
- 로고/favicon 파일 내용 (파일명 유지)
- 문서 서술/타이틀/설명 (코드블록 내부 제외)
- 로케일 JSON 값 (7개 언어)

자세한 규칙은 [phase-00-baseline-and-rules.md](./phase-00-baseline-and-rules.md) 참조.

---

## 검증 명령 빠른 참조

```bash
# 프런트엔드 잔여 건수 확인
rg -c "Langflow" src/frontend/src/ src/frontend/public/ src/frontend/index.html 2>/dev/null | awk -F: '{s+=$2} END {print "Total:", s}'

# Current docs 잔여 건수 확인
rg -c "Langflow" docs/docs/ 2>/dev/null | awk -F: '{s+=$2} END {print "Total:", s}'

# Versioned docs 잔여 건수 확인
rg -c "Langflow" docs/versioned_docs/ 2>/dev/null | awk -F: '{s+=$2} END {print "Total:", s}'

# 프런트엔드 빌드/테스트
make format_frontend_check
make test_frontend

# Docs 빌드
make docs_build
```

---

## 검증 로그

누적 결과는 [verification-log.md](./verification-log.md) 참조.
