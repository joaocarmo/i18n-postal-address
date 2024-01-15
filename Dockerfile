# Base image
FROM node:20 AS builder

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
FROM node:20 AS tester

RUN corepack enable

WORKDIR /app

RUN apt install -y curl autoconf automake libtool pkg-config

COPY --from=builder /app /app

RUN ./scripts/install-libpostal.sh

RUN pnpm install --frozen-lockfile

RUN rm -rf ./lib/__mocks__

RUN npm rebuild

# For manual testing in a vanilla environment
FROM node:20 AS tester-vanilla

RUN corepack enable

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN PACKAGE_TAR_PATH="./build/$(ls ./build)" && \
  echo "{\"license\": \"MIT\",\"dependencies\": {\"i18n-postal-address\": \"file:$PACKAGE_TAR_PATH\"}}" > package.json

RUN pnpm install --frozen-lockfile

# For manual testing in an environment with libpostal
FROM node:20 AS tester-libpostal

RUN corepack enable

WORKDIR /app

RUN apt install -y curl autoconf automake libtool pkg-config

COPY --from=builder /app/build /app/build
COPY --from=builder /app/scripts /app/scripts

RUN PACKAGE_TAR_PATH="./build/$(ls ./build)" && \
  echo "{\"license\": \"MIT\",\"dependencies\": {\"i18n-postal-address\": \"file:$PACKAGE_TAR_PATH\"}}" > package.json

RUN pnpm install --frozen-lockfile

RUN ./scripts/install-libpostal.sh

RUN pnpm add node-postal
