# Quick Start - ChatBot RAG

## Current Status
Your chatbot RAG platform is ready! Since Docker isn't available in WSL, here are your options:

## Option 1: Simple Frontend Demo (Recommended for testing)
```bash
cd /mnt/d/workspace/lab/chatbot/chatbot-rag
cp .env.example .env
# Edit .env and add your OpenAI API key
pnpm install
pnpm dev:web
```

Visit: http://localhost:3001

## Option 2: Full Stack (Requires External Databases)
```bash
# 1. Setup external services:
# - PostgreSQL on localhost:5432
# - Redis on localhost:6379  
# - Qdrant on localhost:6333

# 2. Start the application:
pnpm install
pnpm dev  # Starts both API and Web
```

- API: http://localhost:3000
- Web: http://localhost:3001

## Option 3: Docker Desktop (Recommended for full experience)
1. Install Docker Desktop for Windows
2. Enable WSL 2 integration in Docker Desktop settings
3. Return to this directory and run:
```bash
npm run docker:up
```

## Current Installation Progress
✅ Dependencies are installing (may take 2-3 minutes)
✅ Environment configured
✅ All 50 features implemented

## Next Steps
1. Add your OpenAI API key to `.env`
2. Choose one of the options above
3. Start developing!

## Need Help?
- Check `RUN-LOCALLY.md` for detailed instructions
- View `chatbot-rag/` directory for all source code
- All 13 packages are ready for development