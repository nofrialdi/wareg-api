FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install
RUN pnpm install -g @nestjs/cli
RUN pnpm install -g @prisma/cli
RUN pnpm add @prisma/client
RUN pnpm install -g @nestjs/swagger
# RUN pnpm setup
# RUN pnpm fetch --prod
RUN pnpm install -r --prod
RUN pnpm add @prisma/client

COPY . ./
RUN npx prisma generate
RUN npx nest build

EXPOSE 4000

CMD ["pnpm", "start:prod"]
