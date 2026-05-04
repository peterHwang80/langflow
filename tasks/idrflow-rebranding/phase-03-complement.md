# Phase 03 보완 체크리스트

## 목적

이번 라운드는 **Phase 3 보완만** 수행합니다.
**Phase 4 작업은 시작하지 않습니다.**

목표는 아래 3개 Finding을 해소하는 것입니다.

1. Phase 3가 완료로 표시되기에는 검증 상태가 아직 부족함
2. Current docs에 broken anchor가 아직 남아 있음
3. 상위 tracker가 다시 세부 문서와 어긋남

---

## 이번 라운드 범위

### 포함

- Phase 3 상태 문서 정합성 복구
- current docs broken anchor 수정
- Phase 3 검증 로그 정정
- README와 상세 문서 상태 동기화

### 제외

- Phase 4 착수
- versioned docs 본문 수정
- docs 자산 교체
- docs 도메인 변경
- `docs/static/CNAME` 변경
- `docs/static/files/*.json` 선별 수정
- 수동 검증을 하지 않은 상태에서 완료 처리

---

## 수정 대상 파일

- `tasks/idrflow-rebranding/README.md`
- `tasks/idrflow-rebranding/phase-03-docs-current.md`
- `tasks/idrflow-rebranding/verification-log.md`
- `docs/docs/API-Reference/api-openai-responses.mdx`
- `docs/docs/Support/release-notes.mdx`

필요 시 확인용으로만 참고:
- `docs/docusaurus.config.js`

---

## 해결해야 할 Finding

### Finding 1
- 파일: `tasks/idrflow-rebranding/phase-03-docs-current.md:3-8`
- 문제: `✅ Done`으로 적혀 있지만, 자산/URL 차단 요소와 수동 검증 미완료가 바로 아래 남아 있음
- 같은 변경 세트의 `README.md`, `verification-log.md`는 Phase 3를 `🟡 In Progress`로 기록 중

### Finding 2
- 파일: `docs/docs/API-Reference/api-openai-responses.mdx:129`
- 문제: `#global-var` 링크가 남아 있지만 해당 anchor target이 현재 문서에 없음
- 실제 `make docs_build` 실행 시 아래 broken anchor 경고가 발생함
- `/api-openai-responses#global-var`
- `/next/api-openai-responses#global-var`
- `/release-notes -> /api-openai-responses#global-var`

### Finding 3
- 파일: `tasks/idrflow-rebranding/README.md:17-19`
- 문제: README의 Phase 상태 표가 상세 문서와 일치하지 않음
- README: Phase 1 `✅ Done`, Phase 2 `✅ Done`, Phase 3 `🟡 In Progress`
- 상세 문서: Phase 1 `🔄 Re-opened`, Phase 2 `🟡 In Progress`, Phase 3 `✅ Done`

---

## 반드시 할 일

### 1. Phase 상태를 문서 전체에서 일치시킨다

수정 파일:
- `tasks/idrflow-rebranding/README.md`
- `tasks/idrflow-rebranding/phase-03-docs-current.md`
- `tasks/idrflow-rebranding/verification-log.md`

이번 라운드에서 가장 안전한 기준 상태:
- Phase 1: `🔄 Re-opened`
- Phase 2: `🟡 In Progress`
- Phase 3: `🟡 In Progress`

반드시 지킬 것:
- `README.md`의 요약 상태 표와 각 phase 문서 상태가 서로 다르면 안 됨
- `verification-log.md`의 Phase 3 heading/status도 같은 상태를 따라야 함
- 수동 검증이 미완료이면 `Done` 표기 금지
- 자산/도메인 차단 요소가 남아 있는데 `Done`으로 올리면 안 됨

### 2. `#global-var` broken anchor를 실제로 복구한다

수정 파일:
- `docs/docs/API-Reference/api-openai-responses.mdx`
- `docs/docs/Support/release-notes.mdx`

우선 처리:
- `api-openai-responses.mdx` 안에 `#global-var` anchor target이 실제로 존재하도록 수정
- 가장 안전한 방법은 해당 설명 구간에 명시적 anchor를 가진 헤딩을 복구하는 것
- 예: `## Pass global variables to your flows in headers {#global-var}`
- 현재 line 129의 링크와 `release-notes.mdx`의 `/api-openai-responses#global-var` 링크가 모두 유효해져야 함

중요:
- 단순히 링크 텍스트만 바꾸지 말고, 실제 anchor target이 생성되어야 함
- `/next/api-openai-responses#global-var`도 current docs 라우트에서 해결되어야 함
- versioned docs 1.8.0의 `#global-var`는 이번 라운드 수정 대상이 아님
- Phase 4 범위로 넘어가지 않도록 current docs만 수정

### 3. verification log의 Phase 3 기록을 사실 기준으로 고친다

수정 파일:
- `tasks/idrflow-rebranding/verification-log.md`

반드시 반영할 내용:
- 현재 docs build는 성공하지만 broken anchor warning이 있었다는 사실
- 이번 보완 후에는 `make docs_build`를 다시 실행하고, **current docs 관련 broken anchor warning이 실제로 0건인지** 확인한 뒤 기록
- 기존 1.8.0 versioned docs warning이 남아 있다면 `pre-existing / Phase 4 scope`로 분리 기록
- `Phase 3 관련 broken anchor 경고 0건` 문구는 실제 재검증 후에만 유지 가능
- 수동 검증 미완료 상태는 그대로 유지

권장 기록 방향:
- `make docs_build: SUCCESS`
- `current docs broken anchor: 0건` 또는 실제 남은 건수
- `versioned docs 1.8.0 warnings: pre-existing`
- `수동 검증: 미완료`

### 4. phase-03 문서의 완료 기준 표현을 보수적으로 조정한다

수정 파일:
- `tasks/idrflow-rebranding/phase-03-docs-current.md`

수정 방향:
- `✅ Done (자산·URL·수동 검증 제외)` 문구 제거
- `🟡 In Progress`로 변경
- 상단에 남은 차단 요소를 유지
- 필요하면 아래 두 층으로 다시 정리
- `이번 라운드에서 완료된 것`
- `Phase 3 전체 완료로 인정하려면 남은 것`

권장 남은 항목:
- docs 브랜드 이미지 미교체
- docs 도메인 미확정
- 수동 검증 미완료

### 5. README 요약 상태 표를 다시 맞춘다

수정 파일:
- `tasks/idrflow-rebranding/README.md`

반드시 수정:
- Phase 1 상태를 상세 문서와 맞춘다
- Phase 2 상태를 상세 문서와 맞춘다
- Phase 3 상태를 상세 문서와 맞춘다

즉, 이번 라운드 종료 시점 기준으로 README는 최소한 아래와 같아야 함:
- Phase 1: `🔄 Re-opened`
- Phase 2: `🟡 In Progress`
- Phase 3: `🟡 In Progress`

---

## 검증 명령

```bash
# phase 상태 문서 정합성 확인
rg -n 'Re-opened|In Progress|Done|Not Started' \
  tasks/idrflow-rebranding/README.md \
  tasks/idrflow-rebranding/phase-01-frontend-shell.md \
  tasks/idrflow-rebranding/phase-02-assets-locales-links.md \
  tasks/idrflow-rebranding/phase-03-docs-current.md \
  tasks/idrflow-rebranding/verification-log.md

# broken anchor 관련 확인
rg -n 'api-openai-responses#global-var|#global-var|\\{#global-var\\}' \
  docs/docs/API-Reference/api-openai-responses.mdx \
  docs/docs/Support/release-notes.mdx

# docs 잔여 Langflow 확인
rg -n 'Langflow' docs/docs docs/static/llms.txt docs/static/llms-full.txt docs/docusaurus.config.js

# docs build 재검증
make docs_build
```

---

## verification-log.md에 남겨야 할 내용

반드시 아래를 구분해서 기록하세요.

1. `make docs_build` 성공 여부
2. current docs broken anchor 경고 유무
3. versioned docs 1.8.0 경고는 남는지 여부
4. Phase 3 관련 anchor 경고가 실제로 사라졌는지 여부
5. 수동 검증 미완료 여부
6. 자산/도메인 차단 요소 유지 여부

---

## 하지 말 것

- Phase 4 시작 금지
- versioned docs 본문 수정 금지
- docs 자산 교체 금지
- CNAME 변경 금지
- 도메인 값 임의 변경 금지
- 수동 검증 없이 `Done`으로 올리기 금지
- `docs_build` 성공만 보고 broken anchor 경고를 무시한 채 완료 처리 금지

---

## 완료 조건

아래를 모두 만족해야 이번 보완 라운드를 종료할 수 있습니다.

- `phase-03-docs-current.md`, `README.md`, `verification-log.md`의 상태가 서로 일치함
- Phase 3는 `🟡 In Progress`로 보수적으로 유지됨
- `api-openai-responses.mdx`의 `#global-var` anchor가 실제로 존재함
- `/api-openai-responses#global-var`, `/next/api-openai-responses#global-var`, `/release-notes -> /api-openai-responses#global-var` broken anchor가 사라짐
- `verification-log.md`가 current docs 경고와 versioned docs 경고를 구분해서 사실대로 기록함
- 수동 검증 미완료 상태를 숨기지 않음
