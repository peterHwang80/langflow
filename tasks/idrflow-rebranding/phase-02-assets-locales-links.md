# Phase 02 — Assets, Locales, and Link Centralization

**상태:** ⬜ Not Started

---

## 변경 범위

- 로고/favicon/PWA 아이콘 파일 내용 교체 (파일명 유지)
- 7개 언어 로케일 JSON 값 동기화
- 흩어진 외부 링크를 설정 상수로 중앙화 (확정 안 된 URL은 TODO 유지)

---

## 대상 파일 목록

### 자산 파일 (내용 교체, 파일명 유지)

```
src/frontend/public/favicon.ico
src/frontend/src/assets/                ← 로고 SVG 목록 확인 필요
docs/static/img/                        ← docs 로고 확인 필요
```

> Phase 실행 전 실제 파일 목록 재확인:
> `find src/frontend/src/assets -name "*logo*" -o -name "*brand*"`

### Manifest PWA 아이콘

```
src/frontend/public/manifest.json       ← icons[] 배열 참조 경로
src/frontend/public/icons/              ← 디렉토리 없음 → 생성 필요 여부 확인
```

### 접근성 alt/title

Phase 01에서 누락된 `alt="Langflow logo"` 등의 속성값.

### 로케일 JSON (7개 언어)

```
src/frontend/src/locales/en.json
src/frontend/src/locales/de.json
src/frontend/src/locales/es.json
src/frontend/src/locales/fr.json
src/frontend/src/locales/ja.json
src/frontend/src/locales/pt.json
src/frontend/src/locales/zh-Hans.json
```

각 파일에서 값(value)의 "Langflow" → "idrflow" (키 유지).

### 외부 링크 중앙화

현재 흩어진 외부 URL을 한 곳의 설정 상수로 모으기:
```
src/frontend/src/customization/utils/urls.ts   ← 이미 존재, 확장
```

확정되지 않은 URL은:
```ts
// TODO: idrflow 도메인 확정 후 업데이트
export const DOCS_URL = "https://docs.idrflow.com"; // TODO
```

---

## 완료 기준

- 로고, favicon, PWA 이름이 모두 idrflow 브랜드 표시
- 7개 언어 UI에서 Langflow 문구 미노출
- 외부 링크가 urls.ts 단일 파일에서 관리됨
- 미확정 URL은 TODO 주석으로 위치 명시

---

## 검증 명령

```bash
# 로케일 잔여 확인
rg "Langflow" src/frontend/src/locales/

# 자산 alt/title 잔여 확인
rg 'alt="Langflow|title="Langflow' src/frontend/src/

# 포맷 / 테스트
make format_frontend_check
make test_frontend
```

수동: `make run_cli` 후 PWA manifest, 다국어 UI(언어 변경), 주요 외부 링크 클릭 확인.

---

## 수동 확인 결과

> 실행 후 채움

```
- [ ] PWA 이름 (브라우저 설치 시)
- [ ] 로그인 페이지 로고
- [ ] 헤더 로고
- [ ] 채팅 봇 로고
- [ ] 다국어 전환 후 브랜드 문구 (de / ja / zh-Hans 최소 확인)
- [ ] 주요 외부 링크 (docs, GitHub 등)
```

---

## 잔여 검색 결과

> Phase 완료 후 채움
