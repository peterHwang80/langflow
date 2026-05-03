# Phase 03 — Docs Site and Current Docs

**상태:** ⬜ Not Started

---

## 변경 범위

- `docs/docusaurus.config.js` (사이트 타이틀, tagline, navbar, footer)
- `docs/src/` (React 컴포넌트, 커스텀 페이지)
- `docs/static/CNAME`, `llms*.txt`, docs 브랜드 에셋
- `docs/docs/**` 본문 — 사용자 서술/타이틀/설명

**우선순위:** Get Started → Deployment → Flows → API Reference → 나머지

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

`docs/static/files/*.json` 다운로드 예제는 bulk replace 금지 — 실제 사용자에게 보이는 title/description/link만 선별 수정.

---

## 대상 파일 목록

### Docusaurus 설정
- `docs/docusaurus.config.js`
- `docs/src/` (전체 확인 필요)
- `docs/static/CNAME`
- `docs/llms.txt` (있는 경우)

### Current Docs 우선순위

1. **Get Started**
   - `docs/docs/Get-Started/`

2. **Deployment**
   - `docs/docs/Deployment/`

3. **Flows**
   - `docs/docs/Flows/`

4. **API Reference / Develop**
   - `docs/docs/Develop/`

5. **나머지 current docs**
   - `docs/docs/` 전체 잔여 파일

> 실행 전 파일 목록:
> `rg -l "Langflow" docs/docs/ | head -30`

---

## 완료 기준

- `docs/docs/` 내 사용자 서술에서 Langflow 브랜드 미노출
- 코드블록 내 명령어/변수는 유지됨 (whitelist 준수)
- `make docs_build` 성공

---

## 검증 명령

```bash
# 잔여 건수 (코드블록 제외 어림)
rg "Langflow" docs/docs/ --glob '!*.json'

# Docs 빌드
make docs_build

# API 예제 문법 확인
make api_examples_local_syntax
```

수동: docs 홈, navbar/footer, 검색 영역, Get Started 문서, Deployment 문서, 다운로드 예제 링크 확인.

---

## 수동 확인 결과

> 실행 후 채움

```
- [ ] docs 홈 (Hero, tagline)
- [ ] navbar / footer 브랜드
- [ ] 검색창 placeholder
- [ ] Get Started 주요 문서
- [ ] Deployment 주요 문서
- [ ] 다운로드 예제 링크
```

---

## 잔여 검색 결과

> Phase 완료 후 채움
