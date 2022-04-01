FROM node:16 AS builder

WORKDIR /app

COPY package.json .

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn build:types

RUN mkdir build

RUN npm pack --pack-destination ./build

FROM node:16 AS tester-vanilla

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN PACKAGE_TAR_PATH="./build/$(ls ./build)" && \
  echo "{\"license\": \"MIT\",\"dependencies\": {\"i18n-postal-address\": \"file:$PACKAGE_TAR_PATH\"}}" > package.json

RUN yarn

FROM node:16 AS tester-libpostal

WORKDIR /app

RUN apt install -y curl autoconf automake libtool pkg-config

COPY --from=builder /app/build /app/build
COPY --from=builder /app/scripts /app/scripts

RUN PACKAGE_TAR_PATH="./build/$(ls ./build)" && \
  echo "{\"license\": \"MIT\",\"dependencies\": {\"i18n-postal-address\": \"file:$PACKAGE_TAR_PATH\"}}" > package.json

RUN yarn

RUN ./scripts/install-libpostal.sh

RUN yarn add node-postal
