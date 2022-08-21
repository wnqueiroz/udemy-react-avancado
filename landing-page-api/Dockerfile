FROM node:16.15.0-alpine3.15 AS build

WORKDIR /build

COPY [ "package.json", "yarn.lock", "./" ]

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:16.15.0-alpine3.15 AS runtime

WORKDIR /app

COPY --from=build /build/ ./

ARG NODE_ENV=production

ENV NODE_PORT=1337
ENV NODE_ENV=$NODE_ENV

EXPOSE $NODE_PORT

RUN echo "yarn start" >> entrypoint.sh \
  && chmod a+x entrypoint.sh

ENTRYPOINT [ "sh", "entrypoint.sh" ]
