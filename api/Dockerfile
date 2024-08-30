FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript ts-node

RUN npx tsc

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "src/app.js"]
