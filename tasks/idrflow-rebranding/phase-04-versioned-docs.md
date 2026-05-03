# Phase 04 — Versioned Docs and Public Repo Surface

**상태:** ⬜ Not Started

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

---

## 대상 파일 목록

### Versioned Docs
```
docs/versioned_docs/version-1.8.0/     ← 전체
docs/versioned_docs/version-1.9.0/     ← 전체
docs/versioned_sidebars/               ← sidebar label 확인
```

> 실행 전 파일 목록:
> `rg -l "Langflow" docs/versioned_docs/ | wc -l`

### Public Repo Surface (README)
```
README.md
src/frontend/README.md
docs/README.md
```

---

## 완료 기준

- 공개 리포지토리 표면(README)에서 Langflow 브랜드 미노출
- 버전 전환(1.8.0, 1.9.0) 시 사용자 서술에서 브랜드 불일치 없음
- 코드블록 예제는 유지됨
- `make docs_build` 성공

---

## 검증 명령

```bash
# 잔여 건수
rg "Langflow" docs/versioned_docs/
rg "Langflow" README.md src/frontend/README.md docs/README.md

# Docs 빌드
make docs_build
```

수동: docs 사이트에서 버전 드롭다운으로 1.8.0, 1.9.0 전환 후 브랜드 확인.

---

## 수동 확인 결과

> 실행 후 채움

```
- [ ] README.md (루트) Hero/description
- [ ] docs 버전 1.8.0 전환
- [ ] docs 버전 1.9.0 전환
- [ ] sidebar labels
```

---

## 잔여 검색 결과

> Phase 완료 후 채움
