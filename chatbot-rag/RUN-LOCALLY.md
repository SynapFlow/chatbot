# 🏠 Run ChatBot RAG Locally

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- Docker Desktop installed and running
- OpenAI API key

### Option 1: Full Docker Setup (Recommended)

```bash
# 1. Clone and navigate
git clone <your-repo>
cd chatbot-rag

# 2. Set up environment
cp .env.example .env
# Edit .env with your API keys (see below)

# 3. Start everything with Docker
npm run docker:up

# 4. Wait 2-3 minutes for services to start
# Then access:
# - Web App: http://localhost:3001
# - API: http://localhost:3000
# - Qdrant: http://localhost:6333/dashboard
```

### Option 2: Development Mode (Hot Reload)

```bash
# 1. Install dependencies
pnpm install

# 2. Start databases with Docker
docker-compose up postgres redis qdrant -d

# 3. Start development servers
pnpm run dev:api    # API on :3000
pnpm run dev:web    # Web on :3001

# Or start both:
pnpm run dev
```

---

## ⚙️ Environment Configuration

Create `.env` file in the root directory:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/chatbot_rag
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Vector Database
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=

# AI Providers (at least OpenAI required)
OPENAI_API_KEY=sk-your-openai-api-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-key
COHERE_API_KEY=your-cohere-key

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-min-32-chars
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Application Settings
NODE_ENV=development
PORT=3000
CHAT_DEFAULT_PROVIDER=openai
CHAT_DEFAULT_MODEL=gpt-3.5-turbo
ENABLE_RETRIEVAL=true
ENABLE_WEBHOOKS=true
ENABLE_ANALYTICS=true

# File Upload
MAX_FILE_SIZE=50MB
UPLOAD_DIR=./uploads

# Rate Limiting
THROTTLE_TTL=60
THROTTLE_LIMIT=100

# Logging
LOG_LEVEL=debug
SENTRY_DSN=
```

---

## 🐳 Docker Commands

```bash
# Start all services
npm run docker:up

# Start in background
docker-compose up -d

# View logs
npm run docker:logs
docker-compose logs -f api
docker-compose logs -f web

# Stop services
npm run docker:down

# Restart a service
docker-compose restart api

# Clean everything (removes data)
npm run docker:clean
```

---

## 💻 Development Commands

```bash
# Install dependencies
pnpm install

# Development (hot reload)
pnpm run dev          # Start all services
pnpm run dev:api      # API only
pnpm run dev:web      # Web only

# Build
pnpm run build        # Build all
pnpm run build:api    # API only
pnpm run build:web    # Web only

# Testing
pnpm run test         # Run tests
pnpm run test:watch   # Watch mode
pnpm run lint         # Lint code
pnpm run typecheck    # Type checking
```

---

## 🗄️ Database Setup

### Automatic Setup (Docker)
When using Docker, databases are created automatically.

### Manual Setup
If running without Docker:

```bash
# Install PostgreSQL locally
# Create database
createdb chatbot_rag

# Run migrations (when available)
pnpm run db:migrate

# Seed data (when available)
pnpm run db:seed
```

---

## 🔍 Verify Installation

### 1. Check Services
```bash
# All services should be "healthy"
docker-compose ps

# Check API health
curl http://localhost:3000/api/health

# Check database connection
curl http://localhost:3000/api/health/detailed
```

### 2. Test Endpoints
```bash
# API Documentation
open http://localhost:3000/api/docs

# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how are you?"}'

# Web interface
open http://localhost:3001
```

### 3. Test File Upload
```bash
# Create test file
echo "This is a test document" > test.txt

# Upload via API
curl -X POST http://localhost:3000/api/documents/upload \
  -F "file=@test.txt"
```

---

## 🛠️ Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill processes on ports
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:3001 | xargs kill -9
sudo lsof -ti:5432 | xargs kill -9
```

**2. Docker Issues**
```bash
# Reset Docker
docker-compose down -v
docker system prune -f
npm run docker:up
```

**3. Permission Issues**
```bash
# Fix permissions
sudo chown -R $USER:$USER .
chmod +x railway-quick-fix.sh
```

**4. Module Not Found**
```bash
# Clean install
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

**5. API Not Responding**
```bash
# Check API logs
docker-compose logs api

# Restart API service
docker-compose restart api
```

### Database Issues

**Connection Failed**:
```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Reset database
docker-compose down postgres
docker volume rm chatbot-rag_postgres_data
docker-compose up postgres -d
```

**Redis Connection**:
```bash
# Test Redis
docker-compose exec redis redis-cli ping
# Should return "PONG"
```

### Vector Database Issues

**Qdrant Not Working**:
```bash
# Check Qdrant health
curl http://localhost:6333/health

# Reset Qdrant
docker-compose restart qdrant
```

---

## 📊 Monitoring & Logs

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f postgres
```

### Monitor Resources
```bash
# Container stats
docker stats

# Disk usage
docker system df
```

### API Monitoring
```bash
# Health check
curl http://localhost:3000/api/health

# Detailed health
curl http://localhost:3000/api/health/detailed

# Metrics (if enabled)
curl http://localhost:3000/metrics
```

---

## 🎯 Quick Tests

### 1. Chat Test
```bash
# Basic chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

### 2. Document Upload Test
```bash
# Create test file
echo "Sample document content" > sample.txt

# Upload
curl -X POST http://localhost:3000/api/documents/upload \
  -F "file=@sample.txt"
```

### 3. Web Interface Test
1. Open http://localhost:3001
2. Try uploading a document
3. Chat with the AI
4. Check analytics dashboard

---

## 🎉 Success!

If everything is working:

✅ **Web App**: http://localhost:3001  
✅ **API Docs**: http://localhost:3000/api/docs  
✅ **Qdrant Dashboard**: http://localhost:6333/dashboard  
✅ **Health Check**: http://localhost:3000/api/health  

Your ChatBot RAG platform is now running locally! 🚀

---

## 💡 Development Tips

- **Hot Reload**: Use `pnpm run dev` for automatic restarts
- **Database GUI**: Use pgAdmin at http://localhost:5050 (if enabled)
- **Vector Search**: Use Qdrant dashboard to explore vectors
- **API Testing**: Use built-in Swagger docs at `/api/docs`
- **Logs**: Always check logs when debugging issues

**Happy coding! 🎊**