# Father Gallery FE
<p align="center">
  <img src="./public/readme-logo.png" alt="Nest Logo" style="border-radius: 20px" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
Next.js 14로 개발한 Frontend 프로젝트 입니다.<br>


<br>
</p>
<p align="center">
<a target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## 스택
- Next.js 14 boilerplate 
  - typescript
  - app router
  - import alias: '@'
- UI 라이브러리
  - tailwindcss 
  - shadcn/ui
- 유틸
  - Data fetching
    - return-fetch
    - query-string
  - Data form
    - react-hook-form
    - zod(;zod-i18n-map)
  - Date
    - dayjs
    - lodash
  - Others
    - nuqs
- 상태관리
  - Zustand
  - TanStack React Query
- 린팅 및 포맷팅
  - eslint
  - prettier
  - husky


## 설명
아버지의 그림 작품들을 전시하는 사이트 위한 프론트엔드 프로젝트 입니다.<br>
차후 실제 서비스를 할 예정입니다.<br>
현재는 개발을 위한 테스트용으로 사용하고 있습니다.<br>
개인 프로젝트이지만 코드 작성의 맥락은 협업을 전제로 하여 작성하였습니다.<br>
협업의 기준은 이 프로젝트의 맥락을 쉽게 이해하여 투입 될 수 있는가 입니다.<br>

## 구현
- [x] 어드민 페이지
  - [x] `httponly=true` 값을 가진 엑세스 토큰과 리플래시 토큰으로 인증 구현
  - [x] 클라우드 플레어 이미지 업로드 구현
  - [x] 게시글 관리 페이지 구현
- [ ] 유저페이지
  - [ ] 메인 랜딩 페이지
  - [ ] 소개 페이지
  - [x] 게시글 페이지
- [ ] 구현
  - [ ] 글로벌 모달
  - [x] 페이지네이션 구현 (레퍼런스 [루리웹](https://bbs.ruliweb.com/pc/board/1020))
- [ ] 테스팅
  - [ ] 유닛 테스트
  - [ ] 통합 테스트
  - [ ] E2E 테스트
- [ ] Vercel을 이용한 배포
  - [x] 배포 및 도메인 연결
  - [ ] CI 구축 (CD는 Vercel에서 제공)
- 추가 작업 옵션
  - [ ] 차후 벡엔드 프로젝트와 함께 Mono Repo로 변경

## TMI
- PandaCSS를 사용하려 했으나 시간 단축을 위해 TailwindCSS + shadcn/ui 로 변경하였습니다.
  - 차후 디자인만 차용하여 PandaCSS로 변경할 의향이 있습니다. 
- Next.js 데이터 캐싱 기능으로 인한 변화
  - axios를 사용하지 않았습니다. (`cache()` 함수로 사용하는 솔루션이 있으나 이번엔 다르게 해보고 싶었습니다.)
  - 내장 fetch 함수는 구현 할 분량이 많아 시간 단축을 위해 oFetch를 사용하려고 하였으나 에로사항이 많아 국산 모듈 return-fetch를 사용하게 되었습니다. 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001)

