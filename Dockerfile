# Base image
FROM node:24 AS builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

RUN pnpm build:types

RUN mkdir build

RUN npm pack --pack-destination ./build

# For CI testing
FROM node:24 AS tester

RUN corepack enable

WORKDIR /app

COPY --from=builder /app /app

# For manual testing in a vanilla environment
FROM node:24 AS tester-vanilla

RUN corepack enable

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN PACKAGE_TAR_PATH="./build/$(ls ./build)" && \
  echo "{\"license\": \"MIT\", \"dependencies\": {\"i18n-postal-address\": \"file:$PACKAGE_TAR_PATH\"} }" > package.json

RUN pnpm install --frozen-lockfile
