# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a RAG (Retrieval-Augmented Generation) chatbot platform project with three main components:
- **Widget Chatbot**: Embeddable JavaScript chat widget for websites
- **Admin Portal**: Management dashboard for configuring chatbots and data sources
- **Backend API**: Microservices architecture handling chat, document processing, and vector search

## Project Structure

The project follows a monorepo structure:
```
chatbot-rag/
├── apps/
│   ├── admin/          # Next.js admin panel
│   ├── widget/         # Vanilla JS chatbot
│   └── api/           # Backend API
├── packages/
│   ├── shared/        # Shared code
│   └── ui/           # Reusable components
├── infrastructure/   # IaC and configs
└── docs/            # Documentation
```

## Development Commands

Since this is a new project, specific build/test commands will be established as the monorepo is set up. Expected commands based on the planned stack:

### For monorepo management (once set up with Nx/Turborepo):
- `npm run dev` - Start all services in development mode
- `npm run build` - Build all packages
- `npm run test` - Run all tests
- `npm run lint` - Run linting across the monorepo

### For individual apps (expected):
- `npm run dev:admin` - Start admin panel
- `npm run dev:widget` - Start widget development
- `npm run dev:api` - Start backend API

## Technical Architecture

### Backend Stack
- **API Framework**: Node.js with Fastify/NestJS or Python with FastAPI
- **Databases**: PostgreSQL (relational data), Redis (cache), Qdrant (vector database)
- **Queue System**: BullMQ or Celery for async tasks
- **LLM Integration**: LangChain for LLM abstraction

### Frontend Stack
- **Admin Panel**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Chat Widget**: Vanilla JavaScript with Rollup bundling (zero dependencies)

### Key Services
- Authentication service with JWT/OAuth2
- Web crawler using Playwright/Puppeteer
- Document parser supporting PDF, DOCX, images with OCR
- Embedding service with multi-model support
- Chat service with streaming and context management

## Development Phases

The project follows a 50-step development plan divided into 5 phases:
1. **Infrastructure and Architecture** (Steps 1-10)
2. **Backend Core** (Steps 11-20)
3. **Frontend Admin** (Steps 21-30)
4. **Widget Chatbot** (Steps 31-40)
5. **Optimization and Production** (Steps 41-50)

## Important Constraints

- **Performance**: Response time < 2s, support 1000+ concurrent users
- **Security**: GDPR compliant, data encryption, rate limiting
- **Compatibility**: Support modern browsers (last 2 versions)
- **Testing**: Minimum 80% code coverage requirement