
# get a simple builder image
FROM node:22-slim AS builder
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update -qq && \
    apt-get install git git-crypt jq -qq < /dev/null > /dev/null && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /usr/local/bin/yarn /usr/local/bin/yarnpkg && \
    corepack enable && \
    corepack install --global pnpm@latest

WORKDIR /app
COPY . /app
RUN pnpm install && pnpm build

# switch to a distroless image 
FROM nginxinc/nginx-unprivileged:stable AS base

FROM gcr.io/distroless/nodejs22-debian12:latest
USER 1000

EXPOSE 8081

COPY --from=builder /app /app

WORKDIR /app

CMD ["src/server.js"]

# COPY --from=builder /app/dist /usr/share/nginx/html
