# Phase 02 Complements

## 목적

이 문서는 `phase-02-assets-locales-links.md`의 보완 지시서다.
이번 라운드에서는 **Phase 2 보완만** 수행하며, **Phase 3 이상 작업은 시작하지 않는다**.

목표는 아래 3개 리뷰 Finding을 해소하는 것이다.

1. Phase tracker 상태가 서로 모순됨
2. Phase 2 완료 판정과 검증 기록이 맞지 않음
3. 링크 중앙화 목표가 아직 달성되지 않음

---

## 이번 라운드 범위

### 포함

- Phase tracker 상태 정합성 수정
- Phase 2 상태/완료 기준/검증 로그 문서 정정
- 공개 URL 상수의 실제 중앙화
- 중앙화 후 관련 import/reference 정리
- 잔여 검색 결과와 검증 로그 재기록

### 제외

- SVG/PNG/ICO 자산 교체
- favicon/PWA 아이콘 실제 파일 교체
- docs Phase 3/4 착수
- 미확정 public URL 목적지 변경
- backend/CLI/환경변수/whitelist 식별자 변경

---

## 핵심 원칙

- 이번 라운드의 목적은 **“Phase 2 완료로 포장하는 것”이 아니라 “실제 상태와 문서를 일치시키는 것”**이다.
- 자산 교체가 미완료이고 수동 검증도 비어 있다면, Phase 2를 `Done`으로 올리지 않는다.
- 실제 도메인이 확정되지 않은 public URL은 **현재 값 유지 + TODO 주석 유지** 원칙으로 간다.
- 단, URL 정의 위치는 한 곳으로 모아야 한다.

---

## 해야 할 일

### 1. 상위 tracker 상태를 실제 문서와 맞춘다

수정 파일:

- `tasks/idrflow-rebranding/README.md`
- `tasks/idrflow-rebranding/phase-01-frontend-shell.md`
- `tasks/idrflow-rebranding/phase-02-assets-locales-links.md`
- `tasks/idrflow-rebranding/verification-log.md`

수정 원칙:

- `README.md`의 Phase 상태 표는 세부 문서와 반드시 일치해야 한다.
- 이번 라운드에서 **근거 없이** `Done` 표기를 복구하거나 유지하면 안 된다.
- 현재 기준으로 가장 안전한 목표 상태는 아래와 같다.
  - Phase 1: `🔄 Re-opened`
  - Phase 2: `🟡 In Progress`
- 만약 Claude가 다른 상태를 주장하려면, 해당 상태를 뒷받침하는 **실제 검증 결과와 문서 근거**를 같이 남겨야 한다.

권장 처리:

- `README.md`에서
  - Phase 1을 `🔄 Re-opened`
  - Phase 2를 `🟡 In Progress`
  로 수정한다.
- 세부 문서와 검증 로그의 상태 문구도 동일하게 맞춘다.

### 2. Phase 2를 “부분 완료 + 잔여 작업 존재” 상태로 정리한다

수정 파일:

- `tasks/idrflow-rebranding/phase-02-assets-locales-links.md`
- `tasks/idrflow-rebranding/verification-log.md`

해야 할 정리:

- 현재 Phase 2 문서는 자산 교체 대기로 `In Progress`라고 적고 있으므로, 이 상태를 기준 truth로 삼는다.
- 사용자 요약처럼 “Phase 2 완료”로 읽히는 표현은 문서에서 제거한다.
- 대신 아래처럼 **sub-task 단위 진행 상황**을 명시한다.
  - Sub-task A: 비영어 로케일 값 변경 완료
  - Sub-task B: URL 상수 TODO 주석 정리 완료
  - Sub-task C: 프로덕션 하드코딩 URL 치환 완료
  - Sub-task D: 자산 교체 미완료 / 보류
  - Sub-task E: 로그/잔여 검색 결과 갱신 완료

추가로 정리할 내용:

- `phase-02-assets-locales-links.md`의 완료 기준은 두 층으로 나눠 적는다.
  - `이번 라운드에서 완료된 것`
  - `Phase 2 전체 완료로 인정하려면 남은 것`
- 자산 교체와 수동 검증이 남아 있다면, 그 사실이 문서 첫 화면에서 바로 보이도록 적는다.
- `verification-log.md`에도 Phase 2 섹션 시작 부분에
  - `현재 상태: In Progress`
  - `완료된 하위 작업`
  - `남은 차단 요소`
  를 요약한다.

### 3. public URL 정의를 실제로 한 곳으로 중앙화한다

이번 Finding의 핵심은 **하드코딩 치환 자체가 아니라 source of truth의 분산**이다.

현재 분산 위치:

- `src/frontend/src/constants/constants.ts`
- `src/frontend/src/customization/config-constants.ts`
- `src/frontend/src/customization/utils/urls.ts`

목표:

- 공개 브랜드 URL은 **한 파일에서만 정의**
- 나머지 파일은 import/re-export만 수행
- 실제 URL 문자열 리터럴은 한 곳에만 존재

권장 canonical source:

- `src/frontend/src/customization/utils/urls.ts`

반드시 중앙화할 항목:

- `GITHUB_URL`
- `TWITTER_URL`
- `DOCS_URL`
- `DESKTOP_URL`
- `BUG_REPORT_URL`
- `STORE_URL`
- `LangflowButtonRedirectTarget`

### 4. 중앙화 과정에서 순환 import를 피하도록 구조를 정리한다

현재 `urls.ts`는 `config-constants.ts`를 import하고 있으므로, `config-constants.ts`가 다시 `urls.ts`를 import하면 순환이 생길 수 있다.

권장 구현 순서:

1. `urls.ts`에서 public brand URL만 담당하도록 역할을 분리한다.
2. `getBaseUrl`, `getHealthCheckUrl` 같은 API/헬스체크 helper는 별도 파일로 옮긴다.
   - 예시 파일명:
     - `src/frontend/src/customization/utils/api-urls.ts`
   - 파일명은 더 적절한 것이 있으면 바꿔도 되지만, 역할 분리는 명확해야 한다.
3. 기존 `getBaseUrl`, `getHealthCheckUrl` 사용처 import를 새 helper 파일로 갱신한다.
4. `urls.ts`는 아래만 담당하게 만든다.
   - public brand URL 상수
   - `LangflowButtonRedirectTarget`
5. `constants.ts`는 해당 URL 상수를 직접 정의하지 말고, canonical source에서 import 후 re-export하거나 값 참조만 하도록 바꾼다.
6. `config-constants.ts`의 `DOCS_LINK`는 literal을 유지하지 말고 정리한다.
   - 사용처가 실제로 없다면 제거 검토
   - 필요하다면 순환이 없는 구조에서 canonical source를 참조

중요:

- 최종 상태에서 public URL literal은 한 파일에만 있어야 한다.
- `config-constants.ts`에 `https://docs.langflow.org` literal이 남아 있으면 중앙화 목표를 달성한 것으로 보기 어렵다.

### 5. 관련 코드 치환 이후 잔여 표와 설명을 다시 맞춘다

수정 파일:

- `tasks/idrflow-rebranding/phase-02-assets-locales-links.md`
- `tasks/idrflow-rebranding/verification-log.md`

정리 원칙:

- URL literal이 한 곳으로 모였다면, residue 표도 그 구조를 반영해야 한다.
- 더 이상 사실이 아닌 문구는 제거한다.
  - 예: `config-constants.ts`에 TODO 주석이 남아 있다는 설명
  - 예: `constants.ts`가 실제 source of truth처럼 읽히는 설명

남겨도 되는 intentional residue:

- i18n 키 이름 (`builtWithLangflow`, `getLangflowDesktop`)
- `api.tsx` GitHub API whitelist
- `mockAPIData.ts` 테스트 목 URL
- 자산 파일명/자산 내용 미교체 항목
- 미확정 real destination URL 자체

### 6. 검증 기록을 실제 실행 기준으로 다시 남긴다

이번 라운드에서는 Phase 2 문서와 검증 로그가 실제 실행 여부와 일치해야 한다.

Claude는 아래를 직접 재실행하거나, 최소한 현재 결과를 다시 확인한 뒤 기록한다.

- `make format_frontend_check`
- `make test_frontend`

기록 원칙:

- Phase 1 때와 동일한 기존 실패가 재현되면, `unchanged baseline failure`로 명시
- 이번 중앙화 수정으로 새 실패가 생기면 별도로 분리 기록
- 수동 검증을 하지 않았다면 `미완료` 유지
- 자산 미교체 상태 때문에 시각 로고 검증이 막히는 부분은 명시

권장 기록 문구 예시:

- `make format_frontend_check`: 기존 Biome 기준선 실패 재현, 신규 Phase 2 회귀로 단정되지 않음
- `make test_frontend`: 기존 2개 실패 스위트 재현, 신규 Phase 2 회귀 없음
- 수동 검증: 미완료

---

## 수정 대상 파일

최소 수정 대상:

- `tasks/idrflow-rebranding/README.md`
- `tasks/idrflow-rebranding/phase-02-assets-locales-links.md`
- `tasks/idrflow-rebranding/verification-log.md`
- `src/frontend/src/constants/constants.ts`
- `src/frontend/src/customization/config-constants.ts`
- `src/frontend/src/customization/utils/urls.ts`

상황에 따라 추가 수정 가능:

- `src/frontend/src/customization/utils/api-urls.ts` 또는 동등한 새 helper 파일
- `getBaseUrl`, `getHealthCheckUrl` import를 사용하는 관련 프런트 파일들

---

## 하지 말 것

- SVG/PNG/ICO 자산 교체
- favicon 파일 실제 교체
- docs Phase 3/4 수정
- 미확정 idrflow URL을 임의로 생성해서 값 교체
- Python/backend/CLI 식별자 변경
- `LANGFLOW_*`, `import langflow`, API route, localStorage key 변경
- 수동 검증을 하지 않았는데 Done으로 승격
- 상태 문서 정리 없이 “Phase 2 완료”라고 쓰기

---

## 검증 명령

```bash
# tracker/문서 상태 확인
rg -n 'Re-opened|In Progress|Not Started|Done' tasks/idrflow-rebranding/README.md \
  tasks/idrflow-rebranding/phase-01-frontend-shell.md \
  tasks/idrflow-rebranding/phase-02-assets-locales-links.md \
  tasks/idrflow-rebranding/verification-log.md

# public URL literal 잔여 확인
rg -n 'https://docs\\.langflow\\.org|https://www\\.langflow\\.org/desktop|https://github\\.com/langflow-ai/langflow/issues|https://github\\.com/langflow-ai/langflow|https://x\\.com/langflow_ai|https://langflow\\.store/' \
  src/frontend/src

# production hardcoded URL 잔여 확인
rg -n 'docs\\.langflow\\.org|langflow\\.org|langflow-ai/langflow|langflow\\.store' \
  src/frontend/src \
  --glob '!**/*.test.*' --glob '!**/__tests__/*'

# public URL symbol 사용처 확인
rg -n 'DOCS_URL|GITHUB_URL|TWITTER_URL|DESKTOP_URL|BUG_REPORT_URL|STORE_URL|DOCS_LINK|LangflowButtonRedirectTarget' \
  src/frontend/src

# 포맷 / 테스트
make format_frontend_check
make test_frontend
```

---

## 완료 조건

아래를 모두 만족해야 이번 보완 라운드를 종료할 수 있다.

- `README.md`의 Phase 상태가 세부 문서/로그와 모순되지 않음
- Phase 2가 실제 상태에 맞게 `In Progress` 또는 근거 있는 다른 상태로 정리됨
- Phase 2 문서가 `부분 완료 + 남은 작업` 구조로 읽히며, 완료 과장이 없음
- public URL literal이 한 곳으로 중앙화됨
- `config-constants.ts`, `constants.ts`, `urls.ts`가 중복 source of truth를 갖지 않음
- 검증 로그가 실제 명령 실행 결과와 일치함
- 수동 검증을 하지 않았다면 완료로 적지 않음

---

## 기대되는 최종 상태

이번 라운드가 끝나면 아래처럼 보여야 한다.

- 상위 tracker만 봐도 현재 상태를 오해하지 않음
- Phase 2는 “상당 부분 진행됐지만 아직 닫히지 않았다”는 사실이 명확함
- public URL 수정 시 앞으로 한 파일만 보면 됨
- 다음 리뷰어가 문서와 코드 어느 쪽을 봐도 같은 상태로 이해할 수 있음
