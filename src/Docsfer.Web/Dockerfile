FROM node:24-alpine AS build

WORKDIR /source

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY ./src/Docsfer.Web/package.json ./src/Docsfer.Web/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY ./src/Docsfer.Web ./

RUN pnpm run build

FROM nginx:alpine AS run

COPY --from=build /source/dist /usr/share/nginx/html

COPY ./docker/proxy/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
