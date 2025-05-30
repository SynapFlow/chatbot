FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-workspace.yaml ./

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

# Copy source code
COPY . .

# Development stage
FROM base AS development
EXPOSE 3000
CMD ["pnpm", "--filter=web", "dev"]

# Build stage
FROM base AS builder
RUN pnpm --filter=web build

# Production stage
FROM node:20-alpine AS production
RUN npm install -g pnpm
WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["pnpm", "--filter=web", "start"]