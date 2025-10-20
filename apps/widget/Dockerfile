FROM node:25-alpine AS base

RUN corepack enable && corepack prepare pnpm@8.12.0 --activate
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Development stage
FROM base AS development
ENV NODE_ENV=development
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/widget/package.json apps/widget/

# Copy package.json files individually to preserve directory structure
COPY packages/shared/package.json ./packages/shared/
COPY packages/vector-store/package.json ./packages/vector-store/
COPY packages/queue/package.json ./packages/queue/
COPY packages/parser/package.json ./packages/parser/
COPY packages/events/package.json ./packages/events/
COPY packages/embeddings/package.json ./packages/embeddings/
COPY packages/crawler/package.json ./packages/crawler/
COPY packages/chunker/package.json ./packages/chunker/
COPY packages/chat/package.json ./packages/chat/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/

RUN pnpm install
COPY . .
EXPOSE 3002
CMD ["pnpm", "--filter=widget", "dev"]

# Builder stage
FROM base AS builder
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/widget/package.json apps/widget/

# Copy package.json files individually to preserve directory structure
COPY packages/shared/package.json ./packages/shared/
COPY packages/vector-store/package.json ./packages/vector-store/
COPY packages/queue/package.json ./packages/queue/
COPY packages/parser/package.json ./packages/parser/
COPY packages/events/package.json ./packages/events/
COPY packages/embeddings/package.json ./packages/embeddings/
COPY packages/crawler/package.json ./packages/crawler/
COPY packages/chunker/package.json ./packages/chunker/
COPY packages/chat/package.json ./packages/chat/
COPY packages/database/package.json ./packages/database/
COPY packages/types/package.json ./packages/types/
COPY packages/ui/package.json ./packages/ui/

RUN pnpm install
COPY . .
RUN pnpm --filter=widget build

# Production stage with nginx
FROM nginx:alpine AS production
COPY --from=builder /app/apps/widget/dist /usr/share/nginx/html
COPY apps/widget/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]