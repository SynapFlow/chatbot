#!/bin/bash

echo "🚀 Starting ChatBot RAG in Development Mode (Simple)"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the chatbot-rag root directory"
    exit 1
fi

# Check Node.js version
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your API keys"
fi

echo ""
echo "🔧 For full functionality, you'll need these services running:"
echo "   - PostgreSQL on localhost:5432"
echo "   - Redis on localhost:6379"
echo "   - Qdrant on localhost:6333"
echo ""
echo "🏃‍♂️ Starting development servers..."
echo ""

# Check if pnpm is available
if command -v pnpm >/dev/null 2>&1; then
    echo "📦 Installing dependencies with pnpm..."
    pnpm install --frozen-lockfile --prefer-offline 2>/dev/null || {
        echo "⚠️  pnpm install failed, trying without frozen lockfile..."
        pnpm install --prefer-offline 2>/dev/null || {
            echo "❌ pnpm install failed. Please run manually:"
            echo "   pnpm install"
            exit 1
        }
    }
    
    echo "🚀 Starting development servers with pnpm..."
    pnpm dev
else
    echo "❌ pnpm not found. Installing..."
    npm install -g pnpm
    echo "📦 Installing dependencies..."
    pnpm install --prefer-offline
    echo "🚀 Starting development servers..."
    pnpm dev
fi