#!/bin/bash

# ChatBot RAG Local Startup Script
set -e

echo "🚀 Starting ChatBot RAG Platform Locally..."
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

print_success "Docker is running"

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Creating from .env.example..."
    cp .env.example .env
    print_warning "Please edit .env file with your OpenAI API key before continuing."
    print_warning "At minimum, set: OPENAI_API_KEY=sk-your-key-here"
    echo ""
    echo "Press Enter after you've added your OpenAI API key to .env, or Ctrl+C to exit..."
    read
fi

# Check if OpenAI API key is set
if ! grep -q "OPENAI_API_KEY=sk-" .env; then
    print_warning "OpenAI API key not found in .env file."
    print_warning "Please add your OpenAI API key: OPENAI_API_KEY=sk-your-key-here"
    echo "Press Enter after updating, or Ctrl+C to exit..."
    read
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    if command -v pnpm &> /dev/null; then
        pnpm install
    elif command -v npm &> /dev/null; then
        npm install
    else
        print_error "Neither pnpm nor npm found. Please install Node.js and npm."
        exit 1
    fi
    print_success "Dependencies installed"
fi

# Offer choice of running method
echo ""
echo "Choose how to run the application:"
echo "1) Full Docker (recommended for demos)"
echo "2) Development mode (hot reload)"
echo "3) Docker databases + local development"
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        print_status "Starting full Docker environment..."
        docker-compose up -d
        
        print_status "Waiting for services to be ready..."
        sleep 10
        
        # Check if services are healthy
        print_status "Checking service health..."
        
        # Wait for API to be ready
        for i in {1..30}; do
            if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
                break
            fi
            echo -n "."
            sleep 2
        done
        echo ""
        
        print_success "All services are running!"
        echo ""
        echo "🎆 Your ChatBot RAG Platform is ready!"
        echo "====================================="
        echo "🌍 Web Interface: http://localhost:3001"
        echo "🔗 API Documentation: http://localhost:3000/api/docs"
        echo "📋 API Health: http://localhost:3000/api/health"
        echo "📈 Qdrant Dashboard: http://localhost:6333/dashboard"
        echo ""
        echo "To stop: npm run docker:down"
        echo "To view logs: npm run docker:logs"
        ;;
        
    2)
        print_status "Starting databases with Docker..."
        docker-compose up postgres redis qdrant -d
        
        print_status "Waiting for databases to be ready..."
        sleep 5
        
        print_status "Starting development servers..."
        echo "This will start both API and Web servers with hot reload."
        echo "Press Ctrl+C to stop all services."
        echo ""
        
        if command -v pnpm &> /dev/null; then
            pnpm run dev
        else
            npm run dev
        fi
        ;;
        
    3)
        print_status "Starting databases with Docker..."
        docker-compose up postgres redis qdrant -d
        
        print_status "Waiting for databases to be ready..."
        sleep 5
        
        echo ""
        echo "Databases are running. Now you can:"
        echo "- Start API: pnpm run dev:api (or npm run dev:api)"
        echo "- Start Web: pnpm run dev:web (or npm run dev:web)"
        echo "- Or both: pnpm run dev (or npm run dev)"
        echo ""
        print_success "Databases ready for development!"
        ;;
        
    *)
        print_error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
print_success "Setup complete! Happy coding! 🎉"

# Show resource usage
echo ""
echo "Resource Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}" 2>/dev/null || echo "Docker stats not available"

echo ""
echo "Useful commands:"
echo "- View logs: docker-compose logs -f"
echo "- Restart service: docker-compose restart <service>"
echo "- Stop all: docker-compose down"
echo "- Clean everything: docker-compose down -v"