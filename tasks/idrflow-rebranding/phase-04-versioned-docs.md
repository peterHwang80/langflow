# Phase 04 — Versioned Docs and Public Repo Surface

**상태:** 🟡 In Progress
**1차 작업:** 2026-05-05

> ⚠️ **수동 검증:** 미완료 — 버전 드롭다운(1.8.0 / 1.9.0)과 README 렌더링 확인 필요
> ℹ️ **version-1.8.0 전략:** 계속 노출 유지. 비노출 대신 prose 리브랜딩 + broken anchor 호환성 복구로 처리

---

## 변경 범위

- `docs/versioned_docs/version-1.8.0/`
- `docs/versioned_docs/version-1.9.0/`
- `docs/versioned_sidebars/`
- 루트 `README.md`
- `src/frontend/README.md`
- `docs/README.md`

---

## 핵심 규칙

Phase 03과 동일한 whitelist 규칙 적용:
- 코드블록 내부 명령어/환경변수/import 유지
- Bulk replace 금지 — "표면 문구 우선, 호환성 예제 보존"
- 실제 외부 URL 값은 미확정 시 유지, 사용자 표면 텍스트만 `idrflow`로 전환

---

## Sub-task 진행 상황

| Sub-task | 내용 | 상태 |
|----------|------|------|
| A | 루트 `README.md` 사용자 표면 문구 정리 | ✅ 완료 |
| B | `docs/versioned_sidebars/` label 및 sidebar ad 문구 정리 | ✅ 완료 |
| C | `version-1.9.0` prose/heading/title 정리 | ✅ 완료 |
| D | `version-1.8.0` prose/heading/title 정리 | ✅ 완료 |
| E | broken anchor backward-compatibility 복구 | ✅ 완료 |
| F | `make docs_build` 재검증 및 로그 정리 | ✅ 완료 |
| G | 수동 검증 | ⏸ 미완료 |

---

## 이번 라운드에서 완료된 것

- `README.md` Hero, 소개 문단, Desktop/Quickstart/Deployment/Contribute 표면 문구를 `idrflow` 기준으로 정리
- `src/frontend/README.md`, `docs/README.md`는 브랜드 문자열 잔여 0건으로 확인, 수정 없음
- `docs/versioned_sidebars/version-1.8.0-sidebars.json`, `version-1.9.0-sidebars.json` label 및 Desktop ad 문구 정리
- `docs/versioned_docs/version-1.8.0/**/*.mdx`, `version-1.9.0/**/*.mdx` 총 358개 MDX 파일의 prose/heading/title/alt/link text 정리
- `version-1.8.0` 문서의 `/data-types#data`, `/data-types#dataframe` 링크를 최신 anchor 체계(`#json`, `#table`)로 보정
- rebrand로 바뀐 heading slug에 old `langflow-*` anchor를 다시 부여해 backward-compatible anchor 유지
- `make docs_build` 성공

## Phase 4 전체 완료로 인정하려면 남은 것

1. **수동 검증**
   - docs 버전 드롭다운에서 `1.8.0`, `1.9.0` 전환
   - sidebar labels / sidebar ad / Get Started / API Reference / README 렌더링 확인
2. **잔여 예외 검토**
   - 외부 URL/조직명/핸들(`langflow-ai`, `@Langflow`, `docs.langflow.org`)을 의도된 예외로 최종 확정할지 판단

---

## Anchor 호환성 복구

이번 라운드에서 복구한 대표 old anchor:

- `#langflow-json-file-contents`
- `#serve-flows-through-a-langflow-mcp-server`
- `#install-langflow-from-source`
- `#run-langflow-from-source`
- `#set-up-your-langflow-development-environment`
- `#create-a-langflow-api-key`
- `#start-a-langflow-server-with-authentication-enabled`
- `#connect-langflow-to-a-local-postgresql-database`
- `#set-environment-variables-for-langflow-desktop`
- `#install-and-run-langflow-desktop`
- `#install-and-run-the-langflow-oss-python-package`

---

## 검증 명령

```bash
# README / versioned docs / sidebars 잔여 검색
rg -n 'Langflow|docs\.langflow\.org|langflow-ai|langflow_ai|@Langflow' \
  README.md src/frontend/README.md docs/README.md \
  docs/versioned_sidebars \
  docs/versioned_docs/version-1.9.0 \
  docs/versioned_docs/version-1.8.0

# Docs 빌드
make docs_build
```

수동: docs 사이트에서 버전 드롭다운으로 1.8.0, 1.9.0 전환 후 브랜드 확인.

---

## 수동 확인 결과

> **미완료** — Phase 4 자동 수정/빌드 검증 후 UI 수동 확인 필요

```
- [ ] README.md (루트) Hero/description
- [ ] docs 버전 1.8.0 전환
- [ ] docs 버전 1.9.0 전환
- [ ] sidebar labels
- [ ] sidebar ad / Desktop CTA
```

---

## 잔여 검색 결과 (2026-05-05 기준)

### 완료된 항목

| 범주 | 결과 |
|------|------|
| `About Langflow`, `Install Langflow`, `Langflow deployment overview` 등 sidebar label | 0건 |
| README 사용자 표면 `Langflow Desktop`, `Star Langflow`, `Welcome to Langflow` 등 | 0건 |
| `make docs_build` broken anchor 경고 | 0건 |

### 의도된 잔류 (Intentional Residue)

| 항목 | 이유 |
|------|------|
| `LangflowClient`, `langflow-chat`, `LANGFLOW_*` | 코드/SDK/호환성 식별자 |
| `langflow-ai`, `langflow_ai`, `@Langflow`, `docs.langflow.org` | 실제 외부 조직/도메인/핸들 |
| `Langflow` service name in Instana guide | 관측 도구 상의 실제 서비스 식별자 |
| `Langflow` sample output / code comments / code snippet variable names | 코드 예제 또는 런타임 반환값 예시 |
