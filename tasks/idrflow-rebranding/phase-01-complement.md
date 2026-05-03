# Phase 01 Complement

## 목적

이 문서는 `phase-01-frontend-shell.md`의 보완 지시서다.
이번 라운드에서는 **Phase 1만 보완**하며, **Phase 2 작업은 시작하지 않는다**.

목표는 아래 3개 리뷰 Finding을 해소하는 것이다.

1. Phase 1 완료 기준과 실제 런타임 노출 상태 불일치
2. 사용자 표면 링크가 아직 Langflow 자산으로 연결됨
3. 검증 로그가 실제 검증 상태를 반영하지 않음

---

## 이번 라운드 범위

### 포함

- Phase 1 상태/완료 기준/검증 로그 문서 정정
- `en.json` 기반 핵심 UX 런타임 문자열 보완
- 필요 시 관련 테스트 문자열 보정
- 링크 유지 정책의 예외 문서화

### 제외

- Phase 2 착수
- 다국어 7개 전체 수정
- 링크 중앙화
- 실제 public URL 목적지 변경
- favicon / logo / asset 교체
- docs 작업

---

## 해야 할 일

### 1. Phase 1 상태를 완료에서 해제

수정 파일:

- `tasks/idrflow-rebranding/README.md`
- `tasks/idrflow-rebranding/phase-01-frontend-shell.md`
- `tasks/idrflow-rebranding/verification-log.md`

수정 내용:

- Phase 1 상태를 `✅ Done`에서 `🟡 In Review` 또는 `🔄 Re-opened`로 변경
- 문서들 사이 상태 표현이 서로 다르면 안 됨
- 이번 보완이 끝나기 전까지 `Done` 표기 금지

### 2. Phase 1 완료 기준을 현실에 맞게 재정의

`phase-01-frontend-shell.md` 의 완료 기준을 아래 의미로 수정한다.

- 이번 라운드 완료 기준은 **기본 언어(en) 기준 핵심 UX 표면 문구 정리**
- 다국어 전체 반영은 `Phase 2`
- 공개 링크 목적지 전환은 `Phase 2`
- 현재 Langflow 링크 유지 상태는 **임시 예외**로 명시

즉, 이번 라운드는 “문구 정합성 + 문서 정합성 + 검증 기록 정합성”을 맞추는 단계다.

### 3. `en.json` 런타임 표면 문자열 수정

수정 파일:

- `src/frontend/src/locales/en.json`

반드시 수정할 키:

- `errors.noApiKey`
- `errors.invalidApiKey`
- `dialog.codePrompt`
- `settings.apiPageParagraph`
- `store.title`
- `store.insertApiKey`
- `misc.chatTitle`
- `auth.loginTitle`
- `auth.signupTitle`
- `settings.generalDescription`
- `settings.languageDescription`
- `settings.apiKeysTitle`
- `settings.description`
- `modal.io.builtWithLangflow`
- `modal.io.builtWithLangflowTooltip`
- `storeApiKey.title`
- `storeApiKey.description`
- `page.welcomeTitle`
- `help.getLangflowDesktop`

원칙:

- key 이름은 유지
- value만 `idrflow` 기준으로 변경
- wording은 기존 톤을 유지하되 브랜드명만 자연스럽게 교체

### 4. 영향받는 핵심 화면 기준으로 정리

이번 수정으로 기본 언어 런타임에서 아래 화면이 `idrflow` 기준으로 보이도록 맞춘다.

- 로그인 페이지
- 회원가입 페이지
- Empty state
- API Keys 화면
- Store 화면
- Playground / I/O modal
- Help 메뉴 / Desktop 항목

### 5. 링크 관련 Finding은 예외로 명시

이번 라운드에서는 아래 항목을 **수정하지 않는다**.

- `src/frontend/src/constants/constants.ts` 의:
  - `GITHUB_URL`
  - `TWITTER_URL`
  - `DOCS_URL`
  - `DESKTOP_URL`
  - `BUG_REPORT_URL`
- 하드코딩된 `docs.langflow.org` 링크
- 하드코딩된 GitHub Issues 링크

대신 아래를 문서에 명시한다.

- 공개 링크 목적지 전환은 아직 범위 밖
- 현재 Langflow 링크 유지가 의도된 임시 결정임
- 이 항목은 `Phase 2` 또는 후속 검수 후 처리 예정임

### 6. intentional residue 표 재정리

`phase-01-frontend-shell.md` 의 잔여 검색 결과 표를 수정한다.

특히 아래 항목 설명을 바꾼다.

- `t("help.getLangflowDesktop")`
- `t("modal.io.builtWithLangflow*")`

이 항목들은 더 이상 “locale 미수정”이 아니라:

- i18n key name 유지
- en 값은 이번 라운드에서 반영
- 비영어 locale 값은 `Phase 2 deferred`

로 설명해야 한다.

### 7. 검증 로그를 실제 상태대로 갱신

`verification-log.md` 에 아래를 사실 그대로 기록한다.

- `make format_frontend_check` 실패
- 이유: 저장소 전반의 기존 Biome 오류가 많아 이번 변경만의 문제로 단정 불가
- `make test_frontend` 실패
- 실패 스위트:
  - `src/modals/IOModal/components/chatView/__tests__/sort-sender-messages.test.ts`
  - `src/utils/__tests__/dateTime.test.ts`
- 현재로서는 리브랜딩 변경과 직접 관련 없는 기존 실패로 분류
- 수동 검증을 하지 않았다면 `미완료`로 기록
- 수동 검증을 했다면 실제 확인 항목만 체크

---

## 하지 말 것

- `de.json`
- `es.json`
- `fr.json`
- `ja.json`
- `pt.json`
- `zh-Hans.json`

위 파일 수정 금지.

또한 아래 작업도 금지.

- 링크 중앙화
- `constants.ts` 공개 URL 변경
- `docs.langflow.org` 하드코딩 링크 전환
- 자산 교체
- docs 수정
- Phase 2 문서 수정으로 범위 확장

---

## 검증 명령

```bash
rg -n '"[^"]+": ".*Langflow' src/frontend/src/locales/en.json

rg -n 'Langflow' src/frontend/src/ src/frontend/public/ src/frontend/index.html \
  --glob '!**/*.snap' --glob '!**/__tests__/*'

make format_frontend_check

make test_frontend
```

---

## 완료 조건

아래를 모두 만족해야 이번 보완 라운드를 종료할 수 있다.

- Phase 1 문서 상태가 더 이상 완료를 과장하지 않음
- `en.json` 기준 핵심 UX 문구가 `idrflow`로 정리됨
- 링크 유지 정책이 임시 예외로 문서화됨
- 검증 로그가 실제 실행 결과와 일치함
- 수동 검증을 하지 않았다면 완료로 적지 않음
