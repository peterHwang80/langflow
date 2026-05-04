# Phase 02 — Assets, Locales, and Link Centralization

**상태:** 🟡 In Progress
**1차 작업:** 2026-05-03 / **보완 라운드:** 2026-05-03

> ⚠️ **차단 요소:** 자산 파일(SVG/PNG/ICO) 교체 미완료 — idrflow 로고 파일 미확보
> ⚠️ **수동 검증:** 미완료 — `make run_cli` 후 UI 확인 필요

---

## 변경 범위

- 비영어 로케일 JSON (de/es/fr/ja/pt/zh-Hans) 값 동기화
- 공개 브랜드 URL canonical source 중앙화 (`urls.ts` 단일 파일)
- 흩어진 하드코딩 URL → 상수 참조로 교체
- 로고/favicon/PWA 아이콘 파일 내용 교체 (파일명 유지) ← **보류**

---

## Sub-task 진행 상황

| Sub-task | 내용 | 상태 |
|----------|------|------|
| A | 비영어 로케일 6개 파일 값 변경 | ✅ 완료 |
| B | URL 상수 중앙화 (urls.ts → canonical) + TODO 주석 | ✅ 완료 |
| C | 프로덕션 하드코딩 URL → 상수 참조 교체 (7개 파일) | ✅ 완료 |
| D | 자산 파일 내용 교체 (SVG/PNG/ICO) | ⏸ 보류 — 로고 파일 미확보 |
| E | 검증 로그·잔여 검색 결과 갱신 | ✅ 완료 |

---

## 완료 기준

### 이번 라운드에서 완료된 것

- 비영어 로케일 6개 파일: `rg "Langflow" src/frontend/src/locales/` → 키 이름만 잔류 (값 0건)
- 공개 브랜드 URL literal이 `urls.ts` 단일 파일에만 존재
- `constants.ts`는 `urls.ts`에서 re-export만 수행
- `config-constants.ts`에 URL literal 없음 (DOCS_LINK 제거)
- 프로덕션 파일의 하드코딩 URL → 상수 참조로 전환 완료
- 미확정 URL에 TODO 주석 명시

### Phase 2 전체 완료로 인정하려면 남은 것

1. **idrflow 로고 파일 확보** → SVG/PNG/ICO 파일 내용 교체 (파일명 유지)
   - `LangflowLogo.svg`, `LangflowLogoColor.svg`, `langflow_logo_black.svg`, `langflow_logo_white.svg`
   - `langflow-icon-smooth.svg/png`, `langflow_assistant.svg`, `MCPLangflow.png`
   - `public/favicon.ico`
2. **수동 검증** — `make run_cli` 후 UI 직접 확인

---

## URL 중앙화 구조 (보완 라운드 완료 기준)

```
src/frontend/src/customization/utils/
  urls.ts        ← 공개 브랜드 URL literals 유일한 정의 위치
  api-urls.ts    ← getBaseUrl / getHealthCheckUrl (config-constants 의존)

src/frontend/src/constants/constants.ts
  ← urls.ts에서 re-export (직접 literal 없음)

src/frontend/src/customization/config-constants.ts
  ← URL literal 없음 (DOCS_LINK 제거)
```

의존성 흐름 (순환 없음):
`config-constants.ts` ← `api-urls.ts` ← `urls.ts` ← `constants.ts`

---

## 검증 명령

```bash
# 로케일 잔여 확인 (키 이름만 남아야 함)
rg "Langflow" src/frontend/src/locales/ --glob '!en.json'

# 공개 URL literal 잔여 확인 (urls.ts 제외)
rg -n 'https://docs\.langflow\.org|https://www\.langflow\.org/desktop|https://github\.com/langflow-ai/langflow/issues|https://github\.com/langflow-ai/langflow|https://x\.com/langflow_ai|https://langflow\.store/' \
  src/frontend/src/ --glob '!**/urls.ts'

# DOCS_LINK 잔여 확인
rg -n 'DOCS_LINK' src/frontend/src/

# 포맷 / 테스트
make format_frontend_check
make test_frontend
```

수동: `make run_cli` 후 PWA manifest, 다국어 UI(언어 변경), 주요 외부 링크 클릭 확인.

---

## 수동 확인 결과

> **미완료** — `make run_cli` 후 수동 확인 필요

```
- [ ] PWA 이름 (브라우저 설치 시)
- [ ] 로그인 페이지 로고 (SVG 자산 미교체로 시각적 로고는 Langflow 유지)
- [ ] 헤더 로고 (동일 이유)
- [ ] 채팅 봇 로고 (동일 이유)
- [ ] 다국어 전환 후 브랜드 문구 (de / ja / zh-Hans 최소 확인)
- [ ] 주요 외부 링크 (docs, GitHub 등) — 상수화 완료, URL값은 TODO
```

---

## 잔여 검색 결과 (2026-05-03 보완 라운드 기준)

### 완료된 항목

| 범주 | 건수 |
|------|------|
| 비영어 로케일 값 "Langflow" | 0건 (19개 키 × 6언어 = 114건 변경) |
| 하드코딩 docs.langflow.org (프로덕션) | 0건 |
| 공개 URL literal 중복 정의 | 0건 (urls.ts에만 존재) |

### 의도된 잔류 (Intentional Residue)

| 위치 | 내용 | 이유 |
|------|------|------|
| 로케일 파일 키 이름 | `"modal.io.builtWithLangflow"`, `"help.getLangflowDesktop"` 등 | i18n 키 식별자 — 내부용, 영구 유지 |
| `urls.ts` URL 상수값 | `GITHUB_URL`, `DOCS_URL` 등 | idrflow 도메인 미확정 — TODO 주석 명시 |
| `api.tsx` lines 103-105 | GitHub API 엔드포인트 whitelist | 기능 코드 — 사용자 표면 아님 |
| 테스트 파일 URL | `mockAPIData.ts`, `Dropdowns.test.tsx`, `no-input.test.tsx` | 테스트 목 데이터 / assertion 값 |
| SVG/PNG/ICO 자산 파일 | `LangflowLogo.svg` 등 8개 | idrflow 로고 파일 미확보 — 별도 작업 필요 |
