
# get a simple builder image
FROM node:24-slim AS builder
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update -qq && \
    apt-get install git git-crypt jq -qq < /dev/null > /dev/null && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /usr/local/bin/yarn /usr/local/bin/yarnpkg && \
    corepack enable && \
    corepack install --global pnpm@9.13.2

WORKDIR /app
COPY . /app
RUN pnpm install && pnpm build

# serve the built app via nginx
FROM nginxinc/nginx-unprivileged:stable

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN echo "charset utf-8;" > /etc/nginx/conf.d/charset.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

COPY --from=builder /app/dist /usr/share/nginx/html
