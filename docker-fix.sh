#!/bin/bash

echo "🔧 Docker Build Fix for ChatBot RAG"
echo "=================================="

# Clean up any existing problematic files
echo "🧹 Cleaning up..."
rm -rf node_modules .pnpm-store
find . -name "node_modules" -type d -exec rm -rf {} + 2>/dev/null || true
find . -name ".pnpm-store" -type d -exec rm -rf {} + 2>/dev/null || true

# Create a minimal .dockerignore
echo "📝 Creating optimized .dockerignore..."
cat > .dockerignore << EOF
node_modules
.pnpm-store
**/.pnpm/
**/node_modules/.pnpm/
.pnpm-debug.log*
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.next
.cache
dist
build
tmp
temp
.tmp
logs
*.log
.DS_Store
.git
.gitignore
.vscode
.idea
*.swp
*.swo
test
tests
**/*.test.js
**/*.test.ts
**/*.spec.js
**/*.spec.ts
*.md
!README.md
Dockerfile*
docker-compose*
.dockerignore
EOF

echo "✅ Docker environment cleaned and optimized"
echo ""
echo "Now try running:"
echo "  docker-compose up --build"
echo ""
echo "If you still get permission errors, make sure:"
echo "1. Docker Desktop is running"
echo "2. WSL integration is enabled in Docker Desktop settings"
echo "3. Your user is in the docker group"