# Father Gallery FE
<p align="center">
  <img src="./public/readme-logo.png" alt="Nest Logo" style="border-radius: 20px" />
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">
Next.js 14로 개발한 Frontend 프로젝트 입니다.<br>
</p>

<br>
<p align="center">
<a target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## 배포된 사이트 바로가기 -> 현재 종료됨
- [KimDongcheol Art (김동철 그림세상)](https://kimdongcheol-art.com/)
- [API 문서 (Swagger)](https://api.kimdongcheol-art.com/api)

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
- 테스트
  - API 모킹
    - msw 2.0
  - UT, IT
    - jest
    - testing-library
  - E2E
    - playwright


## 설명
아버지의 그림 작품들을 전시하는 사이트 위한 프론트엔드 프로젝트 입니다.<br>
개인 프로젝트이지만 코드 작성의 맥락은 협업을 전제로 하여 작성하였습니다.<br>
협업의 기준은 이 프로젝트의 맥락을 쉽게 이해하여 투입 될 수 있는가 입니다.<br>

## 구현
- [x] 어드민 페이지
  - [x] `httponly=true` 값을 가진 엑세스 토큰과 리플래시 토큰으로 인증 구현
  - [x] 클라우드 플레어 이미지 업로드 구현
  - [x] 게시글 관리 페이지 구현
- [x] 유저페이지
  - [x] 메인 랜딩 페이지
  - [x] 소개 페이지
  - [x] 게시글 페이지
- [x] 구현
  - [x] 글로벌 모달
  - [x] 페이지네이션 구현 (레퍼런스 [루리웹](https://bbs.ruliweb.com/pc/board/1020))
- [x] 테스팅
  - [x] 유닛 테스트
  - [x] 통합 테스트
  - [x] E2E 테스트
- [x] 배포
  - [x] Vercel을 이용한 배포 및 도메인 연결
  - [x] Github action 테스트 CI 구축 (CD는 Vercel에서 제공)
- [x] 분석도구
  - [x] Vercel Analytics

## TMI
- PandaCSS를 사용하려 했으나 시간 단축을 위해 TailwindCSS + shadcn/ui 로 변경하였습니다.
  - 차후 디자인만 차용하여 PandaCSS로 변경할 의향이 있습니다.
- Next.js 데이터 캐싱 기능으로 인한 변화
  - axios를 사용하지 않았습니다. (`cache()` 함수로 사용하는 솔루션이 있으나 이번엔 다르게 해보고 싶었습니다.)
  - 내장 fetch 함수는 구현 할 분량이 많아 시간 단축을 위해 oFetch를 사용하려고 하였으나 에로사항이 많아 국산 모듈 return-fetch를 사용하게 되었습니다.

## 프로젝트 실행하기
### 임시 실행하기
> 공유용 `.env` 환경변수 파일을 통해 유저 페이지만 [MSW](https://mswjs.io/)로 모킹된 API가 동작하여 접근 가능합니다.
> - 접근 가능한 유저 페이지
    >   - `/`
>   - `/gallery`
      >     - 이미지는 모킹된 데이터와 상관없이 랜덤 임시 이미지를 사용합니다.
>   - ~~`/gallery/:id`~~
      >     - 위 디테일 페이지는 서버사이드 페이지로 구현되어 있습니다.<br>그러나 현재 Next.js App router에서 서버사이드 사용시 MSW가 올바르게 동작하지 작동하지 않습니다.<br>차후 수정할 예정입니다. [해당 이슈 바로가기](https://github.com/mswjs/msw/issues/1644)
>   - `/about`

### 전체 기능 실행하기
> 모든 기능을 실행하기 위해서는 [API서버](https://github.com/DohwanKim/nest-be-father-gallery)가 필요합니다.<br>
> `.env`의 `NEXT_PUBLIC_CLOUDFLARE_IMAGE_ACCOUNT_ID`값에 공개 Cloudflare Image key가 항목을 추가해시고
> `NEXT_PUBLIC_USE_MSW`값을 `false`로 변경해주세요.


## 실행하기
```bash
# install dependencies or use your package manager instanced of npm
npm install
# run dev server
npm run dev

# go to http://localhost:3001
```

## License
[MIT licensed](LICENSE).


