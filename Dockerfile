FROM node:18.18.2-alpine3.17

WORKDIR /usr/src/app

COPY package.json *.lock ./

RUN yarn && yarn add typescript tsc ts-node

COPY . .

RUN yarn build

CMD ["node", "dist/app.js"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

EXPOSE 3000
