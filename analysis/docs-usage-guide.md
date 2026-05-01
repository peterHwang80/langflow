# Langflow `docs/` 활용 가이드

## 목적

`docs/` 디렉토리는 Langflow 문서 사이트의 원본 소스입니다.
이 폴더의 문서(`.md`, `.mdx`), 설정, 정적 리소스를 기반으로 Docusaurus가 웹 문서 사이트를 생성합니다.

## 핵심 요약

- `docs/`는 "웹 문서 사이트 소스" 저장소 역할을 한다.
- 로컬에서 실행하면 브라우저로 문서를 쉽게 확인할 수 있다.
- 빌드하면 정적 사이트가 생성되어 배포 가능한 형태가 된다.
- 현재 저장소 기준 `docs/`는 `npm` 사용이 맞다.

## 패키지 매니저 기준 (중요)

현재 `docs/` 상태:

- `package-lock.json` 있음
- `yarn.lock` 없음

따라서 `docs/` 작업은 **npm 기준**으로 진행하는 것을 권장합니다.

## 로컬에서 문서 사이트 실행

프로젝트 루트에서:

```bash
cd docs
npm install
npm run start
```

동작:

- 개발 서버가 실행됨
- 문서 수정 시 자동 반영(hot reload)
- 브라우저에서 문서 사이트를 확인 가능

## 빌드/검증 흐름

```bash
cd docs
npm run build
npm run serve
```

- `build/` 디렉토리에 정적 사이트 생성
- 실제 배포와 유사한 형태로 로컬 검증 가능

## 문서 버저닝 활용

Docusaurus 버저닝으로 릴리즈별 문서를 스냅샷할 수 있습니다.

```bash
cd docs
npm run docs:version -- 1.9.0
```

활용 포인트:

- 릴리즈 시점 문서 보존
- 최신(next) 문서와 과거 버전 문서 동시 운영

## 어떤 파일을 주로 수정하면 되나

- `docs/docs/`: 기본 문서 본문 (`.md`, `.mdx`)
- `docs/versioned_docs/`: 버전 스냅샷 문서
- `docs/sidebars.js`: 사이드바/내비게이션 구성
- `docs/docusaurus.config.js`: 사이트/버전/플러그인/라우팅 설정
- `docs/static/`: 이미지 등 정적 리소스

## 협업 시 권장 규칙

- `docs/`에서는 npm만 사용 (`npm install`, `npm run ...`)
- 락파일 혼용 금지 (`package-lock.json` + `yarn.lock` 동시 사용 지양)
- 문서 PR 전 최소 `npm run build`로 깨진 링크/빌드 오류 확인

## 빠른 체크리스트

- [ ] `cd docs && npm install`
- [ ] `npm run start`로 로컬 확인
- [ ] 문서/사이드바/설정 수정
- [ ] `npm run build` 성공 확인
- [ ] 필요 시 `npm run serve`로 최종 검증
