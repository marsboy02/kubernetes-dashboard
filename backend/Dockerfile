# build stage
FROM node:23 AS builder

RUN npm install -g pnpm
  
WORKDIR /app
  
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .  
RUN pnpm build
  
  
# runtime
FROM node:22-alpine

RUN apk add --no-cache libc6-compat \
    && npm install -g pnpm
  
WORKDIR /app
  
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod
  
EXPOSE 3000

CMD ["pnpm", "start:prod"]
  