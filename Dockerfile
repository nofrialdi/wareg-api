FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm i
RUN pnpm i -g @nestjs/cli
RUN pnpm i -g @prisma/cli
RUN pnpm add @prisma/client
RUN pnpm i -g @nestjs/swagger
RUN pnpm add @nestjs/swagger


COPY . ./
RUN npx prisma generate
RUN npx nest build

EXPOSE 4000

CMD ["pnpm", "start:prod"]
