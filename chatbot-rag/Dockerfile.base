FROM node:20-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.12.0 --activate

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app

# Copy package files
COPY package.json pnpm-workspace.yaml turbo.json ./

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

COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY apps/admin/package.json ./apps/admin/
COPY apps/widget/package.json ./apps/widget/

# Install dependencies
RUN pnpm install

# Development stage
FROM base AS development
ENV NODE_ENV=development
COPY . .
EXPOSE 3000 3001 3002

# Builder stage
FROM base AS builder
COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS production
RUN corepack enable && corepack prepare pnpm@8.12.0 --activate
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy built application
COPY --from=builder /app .

# Remove dev dependencies and install production only
RUN pnpm install --prod

ENV NODE_ENV=production
USER node