FROM oven/bun:alpine

WORKDIR /app

RUN apk add --update --no-cache postgresql-client

COPY package.json .
COPY bun.lockb .
COPY src ./src
COPY tmp ./tmp

RUN bun install

CMD ["bun", "run", "src/index.ts"]
