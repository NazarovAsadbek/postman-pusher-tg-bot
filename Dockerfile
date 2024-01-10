FROM node:18.18.2-alpine3.17

WORKDIR /usr/src/app
RUN npm install -g pnpm
RUN npm install -g typescript

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN echo "BOT_TOKEN=6027261156:AAHPk98T0mW4guS5OobDyNPDiMazWNG2ZrM\nCHAT_ID=6708180875\nPOSTMAN_API_KEY=PMAK-659d306dc687832721dfbcd1-a75208816a8e8e257009d23dc8967ae23f\nCOLLECTION_ID=32049231-c9205bdc-27c9-438c-b44f-6f58e811ec7d\nUSER_TO_SEND_IDS=5673712208,6708180875,6245699690" > .env

RUN pnpm run build

CMD ["pnpm", "run", "start"]

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

EXPOSE 3000
