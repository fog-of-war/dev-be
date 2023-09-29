# 제로초님 질문 위한 브랜치

docker-compose.yml 로 postgresql 과 redis 컨테이너 실행가능합니다.

## 실행방법

```
// .env.development 에 환경변수를 추가하신 후 실행해주세요

$ docker-compose up -d // postgresql db 및 redis 컨테이너 실행
$ npm install
$ npm run db:dev:restart // db 초기화
$ npm run start:dev
```

## env 목록

env.development 를 생성한 후 환경변수 추가

```
DB_HOST={}
DB_USER={}
DB_PASSWORD={}
DB_NAME={}
DB_PORT={}
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"
GOOGLE_OAUTH_ID={}
GOOGLE_OAUTH_SECRET={}
KAKAO_CLIENT_ID={}
KAKAO_JAVASCRIPT_KEY={}
NAVER_CLIENT_ID={}
NAVER_CLIENT_PW={}
GOOGLE_REDIRECT_URL={}
KAKAO_REDIRECT_URL={}
NAVER_REDIRECT_URL={}
AT_SECRET={}
RT_SECRET={}
```

## 로그인 시 프론트엔드

https://github.com/fog-of-war/dev-fe 를 클론한 뒤 .env 에 하기 환경변수를 추가한 후 실행해주시면 됩니다.

```
$ npm install
$ npm run start
```

```
// .env

REACT_APP_API_URL=http://localhost:5000/
REACT_APP_SOCKET_URL=ws://localhost:5000/v1/ws-alert
```

## 게시물 및 댓글 작성 방법

각각의 파일에서 "Bearer YOUR_ACCESS_TOKEN" 에 엑세스 토큰을 채워주세요

```
$ node send_posts.js
$ node send_comments.js
```
