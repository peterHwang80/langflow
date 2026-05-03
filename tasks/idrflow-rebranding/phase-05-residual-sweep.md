# Phase 05 — Residual Sweep and Final Verification

**상태:** ⬜ Not Started

---

## 변경 범위

Frontend, docs, backend 사용자 노출 문자열 최종 sweep.
Whitelist 밖 잔여 항목만 개별 처리합니다.

**Backend 수정 기준:** 실제 UX나 API 응답에서 드러나는 문자열이 남아 있을 때만 최소 범위 수정.

---

## 절차

### 1. 잔여 sweep

```bash
# Frontend 잔여
rg "Langflow" src/frontend/src/ src/frontend/public/ src/frontend/index.html \
  --glob '!*.snap'

# Current docs 잔여
rg "Langflow" docs/docs/

# Versioned docs 잔여
rg "Langflow" docs/versioned_docs/

# Backend 사용자 노출 문자열 확인
rg -l "Langflow" src/backend/ \
  --glob '!**/__pycache__/**' \
  --glob '!**/*.pyc'
```

### 2. 항목별 처리 판단

각 잔여 항목에 대해:
- **Whitelist 해당** → `verification-log.md`에 "intentional residue"로 기록
- **수정 필요** → 개별 수정 후 재확인
- **미결정** → TODO 주석 남기고 별도 이슈 트래킹

### 3. 최종 기록

`verification-log.md`에 기록:
- 최종 rg 결과 (건수 + 파일 수)
- 명령 실행 결과 스냅샷
- 수동 시나리오 체크 결과
- Intentional residue 목록 (남겨둔 이유 포함)

---

## 완료 기준

- 사용자 표면에서 Langflow 브랜드 불일치 없음
- Whitelist 항목은 모두 intentional residue로 문서화됨
- `verification-log.md` 최종 버전 완성
- 모든 빌드/테스트 통과

---

## 검증 명령

```bash
# Frontend
make format_frontend
make test_frontend

# Docs
make docs_build

# Backend (수정한 경우에만)
# uv run pytest src/backend/tests/unit/... -x

# 최종 brand audit
rg -c "Langflow" src/frontend/src/ src/frontend/public/ docs/docs/ docs/versioned_docs/ \
  | sort -t: -k2 -rn | head -20
```

---

## 수동 시나리오 체크

> 실행 후 채움

```
Frontend:
- [ ] 로그인 → 메인 → Playground → 로그아웃 전 경로
- [ ] API Keys, Store, MCP 페이지
- [ ] Share/IO modal
- [ ] Help/docs 링크

Docs:
- [ ] docs 홈
- [ ] navbar/footer
- [ ] Get Started, Deployment 주요 문서
- [ ] 버전 전환 (1.8.0, 1.9.0)
```

---

## 잔여 검색 결과 / Intentional Residue

> Phase 완료 후 채움

### Intentional Residue (남겨둔 항목)

| 파일 | 패턴 | 이유 |
|------|------|------|
| (예시) `src/backend/langflow/...` | `import langflow` | Python 모듈 경로 — whitelist |
| (예시) `docs/docs/...` | ` ```bash\nuv run langflow run` | 코드블록 내 CLI 명령 — whitelist |
