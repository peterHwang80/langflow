# Phase 03 — Docs Site and Current Docs

**상태:** 🟡 In Progress
**1차 작업:** 2026-05-03

> ⚠️ **차단 요소:** docs 브랜드 이미지 파일(`docs/static/img/`, logos/) 교체 미완료 — idrflow 로고 파일 미확보
> ⚠️ **미확정 URL:** `docs.langflow.org` 등 — docs 도메인 미확정으로 TODO 주석 유지
> ⚠️ **수동 검증:** 미완료 — docs 홈, navbar/footer, Get Started 등 직접 확인 필요

---

## 변경 범위

- `docs/docusaurus.config.js` (사이트 타이틀, tagline, navbar, footer)
- `docs/static/llms.txt`, `docs/static/llms-full.txt`
- `docs/docs/**` 본문 184개 파일 — 사용자 서술/타이틀/설명
- anchor backward-compatibility: 8개 헤딩에 `{#explicit-id}` 추가

---

## 핵심 규칙

코드블록(` ```bash `, ` ```python ` 등) 내부는 **절대 수정하지 않습니다:**

```
# 유지 예시 (코드블록 내부)
uv run langflow run
import langflow
export LANGFLOW_DATABASE_URL=...
```

수정 대상은 일반 산문(prose), 제목, 링크 텍스트, 버튼 레이블입니다.

`docs/static/files/*.json` 다운로드 예제는 bulk replace 금지 — Phase 5에서 선별 수정.

---

## Sub-task 진행 상황

| Sub-task | 내용 | 상태 |
|----------|------|------|
| A | docusaurus.config.js 브랜드 7곳 수정 | ✅ 완료 |
| B | docs/docs/** MDX 산문 치환 (Python 스크립트) | ✅ 완료 |
| C | llms.txt / llms-full.txt 수정 | ✅ 완료 |
| D | docs/src/plugins/segment/ 의도된 잔류 | ✅ 확인 |
| E | broken anchor 8개 explicit ID 추가 | ✅ 완료 |
| F | `docs/docs/` `api-openai-responses.mdx` `{#global-var}` 헤딩 복구 | ✅ 완료 |
| F2 | `versioned_docs/version-1.9.0/` `api-openai-responses.mdx` `{#global-var}` 헤딩 복구 | ✅ 완료 |
| G | 트래커 문서 상태 동기화 | ✅ 완료 |
| H | docs 브랜드 이미지 파일 교체 | ⏸ 보류 — 로고 파일 미확보 |
| I | docs 도메인 확정 및 CNAME 변경 | ⏸ 보류 — 도메인 미확정 |
| J | 수동 검증 | ⏸ 미완료 |

---

## 이번 라운드에서 완료된 것

- docusaurus.config.js, docs/docs/**, llms*.txt 산문 전환
- broken anchor 8건 explicit ID 추가 (E)
- `docs/docs/` `api-openai-responses.mdx` `{#global-var}` 헤딩 복구 (F)
- `versioned_docs/version-1.9.0/` `api-openai-responses.mdx` `{#global-var}` 헤딩 복구 (F2)
- `make docs_build` 성공 — current docs broken anchor 경고 0건 (1.8.0 pre-existing만 잔류)

## Phase 3 전체 완료로 인정하려면 남은 것

1. **docs 브랜드 이미지** — idrflow 로고 파일 확보 후 `docs/static/img/`, `logos/` 내용 교체
2. **docs 도메인 확정** — `docs.langflow.org` → idrflow 도메인 후 CNAME, `docusaurus.config.js` url, Algolia indexName 변경
3. **수동 검증** — `cd docs && npm start` 후 docs 홈, navbar/footer, 문서 본문 직접 확인

---

## 변경 내용 요약

### docusaurus.config.js (7건 수정)

| 라인 | 변경 전 | 변경 후 |
|------|---------|---------|
| 13 | `title: "Langflow Documentation"` | `title: "idrflow Documentation"` |
| 15 | tagline `"Langflow is a low-code..."` | `"idrflow is a low-code..."` |
| 17 | `url: "https://docs.langflow.org"` | TODO 주석 추가 (도메인 미확정) |
| 441 | `alt: "Langflow"` | `alt: "idrflow"` |
| 463,477,491 | `data-platform-title: 'Langflow'` | `data-platform-title: 'idrflow'` |
| 526 | `© ... Langflow` | `© ... idrflow` |

### docs/docs/** (184개 파일 수정)
- Python fence-tracking 스크립트로 코드블록 밖 "Langflow" → "idrflow" 치환
- 잔여 49건: 전량 코드블록 내부 (whitelist 준수 확인)

### llms.txt / llms-full.txt
- 각 10건 / 14건 변경
- YouTube URL `@Langflow` — 의도된 잔류 (외부 URL 미확정)

### broken anchor 수정 (8개 헤딩)
- 헤딩 텍스트는 idrflow로 변경됐으나 anchor ID는 `{#...langflow...}` 유지
- 대상: `#start-a-langflow-server-with-authentication-enabled` 등 8개

---

## 잔여 검색 결과 (2026-05-03 기준)

```bash
rg -c "Langflow" docs/docs/ | awk -F: '{s+=$2} END {print s}'
→ 49건 (전량 코드블록 내부)

grep -c "Langflow" docs/static/llms.txt docs/static/llms-full.txt
→ 1건씩 (YouTube URL @Langflow — 의도된 잔류)

grep -c "Langflow" docs/docusaurus.config.js
→ 2건 (코드 주석, 리다이렉트 URL 경로 — 의도된 잔류)
```

---

## 빌드/테스트 결과 (2026-05-04 최종 기준)

**`make docs_build`:**
```
[SUCCESS] Generated static files in "build".
[WARNING] Docusaurus found broken anchors!
→ 1.8.0/ prefix 경고 35건 (pre-existing — Phase 4 scope)
```
→ **성공.** current docs (`/`, `/next/`) 관련 broken anchor 경고 **0건**.
1.8.0 경고는 Phase 3 이전부터 존재하는 기존 상태.

---

## 의도된 잔류 (Intentional Residue)

| 항목 | 이유 |
|------|------|
| `docusaurus.config.js` url, Algolia indexName | 도메인 미확정, Algolia 외부 서비스 |
| `docusaurus.config.js` 코드 주석, 리다이렉트 경로 | 내부 코드/URL 식별자 |
| `docs/static/CNAME` (`docs.langflow.org`) | 도메인 미확정 |
| `docs/static/llms.txt`, `llms-full.txt` YouTube URL `@Langflow` | 외부 URL 미확정 |
| `docs/src/plugins/segment/` 2건 | 분석 서비스 식별자 |
| `docs/static/img/`, `logos/` 브랜드 이미지 | 자산 파일 미확보 |
| `docs/static/files/*.json` | Phase 5에서 선별 수정 예정 |
| 코드블록 내 49건 | whitelist — CLI/환경변수/import |

---

## 수동 확인 결과

> **미완료** — `make run_cli` 또는 `cd docs && npm start` 후 수동 확인 필요

```
- [ ] docs 홈 (Hero, tagline)
- [ ] navbar / footer 브랜드
- [ ] 검색창 placeholder
- [ ] Get Started 주요 문서
- [ ] Deployment 주요 문서
- [ ] 다운로드 예제 링크
```
