FROM oven/bun:alpine

WORKDIR /app

RUN echo @edge http://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache postgresql16-client@edge

COPY package.json .
COPY bun.lockb .
COPY src ./src
COPY tmp ./tmp

RUN bun install

CMD ["bun", "run", "src/index.ts"]
