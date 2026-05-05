# Phase 04 — Versioned Docs and Public Repo Surface

**상태:** ✅ Done
**1차 작업:** 2026-05-05 / **마감 정리:** 2026-05-05

> ✅ **수동 검증:** 완료 — 로컬 정적 빌드 HTML spot-check 및 README 표면 점검 완료
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
| G | 수동 검증 | ✅ 완료 |

---

## 이번 라운드에서 완료된 것

- `README.md` Hero, 소개 문단, Desktop/Quickstart/Deployment/Contribute 표면 문구를 `idrflow` 기준으로 정리
- `src/frontend/README.md`는 사용자 표면 브랜드 잔여 0건으로 확인, 수정 없음
- `docs/README.md`는 사용자 표면 브랜드 잔여 0건으로 확인, `@langflow` import 경로는 fenced code 예제로 유지
- `docs/versioned_sidebars/version-1.8.0-sidebars.json`, `version-1.9.0-sidebars.json` label 및 Desktop ad 문구 정리
- `docs/versioned_docs/version-1.8.0/**/*.mdx`, `version-1.9.0/**/*.mdx` 총 358개 MDX 파일의 prose/heading/title/alt/link text 정리
- `version-1.8.0` 문서의 `/data-types#data`, `/data-types#dataframe` 링크를 최신 anchor 체계(`#json`, `#table`)로 보정
- rebrand로 바뀐 heading slug에 old `langflow-*` anchor를 다시 부여해 backward-compatible anchor 유지
- `docs/versioned_docs/version-1.9.0/API-Reference/README.md` 의 `local Langflow server` 잔여 산문을 `local idrflow server` 로 정정
- `make docs_build` 성공

## Phase 4 완료 판정

- docs 버전 `1.9.x`, `1.8.x` 렌더 결과와 version dropdown, sidebar label, Desktop CTA, API Reference 문구를 로컬 정적 빌드에서 spot-check 완료
- README 표면 텍스트(Desktop/Deployment/Contribute/Hero)는 소스 기준으로 재확인 완료
- 잔여 `Langflow`는 외부 URL/조직명/핸들, 코드/SDK 식별자, 데스크톱 번들 식별자, 코드 예제 import/변수명만 남는 것으로 정리

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

수동: `docs/build` 정적 사이트를 로컬 서버로 띄워 `1.9.x`/`1.8.x` 핵심 페이지 렌더 결과 확인.

---

## 수동 확인 결과

> **완료** — 2026-05-05 로컬 정적 빌드 HTML spot-check 및 README 표면 재확인

```
- [x] README.md (루트) Hero/description
- [x] docs 버전 1.8.0 전환
- [x] docs 버전 1.9.0 전환
- [x] sidebar labels
- [x] sidebar ad / Desktop CTA
```

확인 기준:

- `docs/build/index.html`: `About idrflow`, version dropdown `1.10.x (Next) / 1.9.x / 1.8.x`, footer `© 2026 idrflow`
- `docs/build/getting-started-installation/index.html`: `Install idrflow`, `Download idrflow`, `idrflow Desktop`
- `docs/build/1.8.0/get-started-installation.html`: `Install idrflow`, `Download idrflow`, `1.8.x` banner
- `docs/build/api-openai-responses.html`, `docs/build/1.8.0/api-openai-responses.html`: `local idrflow server` 문구 및 API reference label 확인

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
| `langflow-ai`, `langflow_ai`, `@Langflow`, `docs.langflow.org`, `spaces/Langflow/Langflow` | 실제 외부 조직/도메인/핸들/외부 서비스 URL |
| `com.LangflowDesktop`, `com.Langflow` | 데스크톱 번들/파일 시스템 식별자 |
| `@langflow` raw-loader import 경로, `FormLangflowApiRequests` 등 MDX code snippet 변수명 | 코드 예제 import/변수명 |
| `Langflow` sample output / code comments | 코드 예제 또는 런타임 반환값 예시 |
