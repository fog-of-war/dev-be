# 개발용 스테이지
FROM node:18-alpine AS development

WORKDIR /app

# package.json과 package-lock.json 파일 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 생성된 Prisma 파일 복사
COPY prisma ./prisma/

# 환경 변수 복사
COPY .env ./

# tsconfig.json 파일 복사
COPY tsconfig.json ./

# 소스 코드 복사
COPY . .

# Prisma 파일 생성
RUN npx prisma generate

# 서버를 포트 5000으로 실행하도록 설정
EXPOSE 5000

# 마이그레이션을 포함하여 시작 스크립트 실행
CMD ["npm", "run", "start:migrate:prod"]
