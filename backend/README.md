# Prisma + Express + Neon Backend

Simple Express.js backend with Prisma ORM and Neon PostgreSQL.

## 🚀 Quick Start

### 1. Set up Neon Database
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string

### 2. Set up Environment
Create `.env` file with your Neon connection string:
```
DATABASE_URL="postgresql://username:password@ep-xxxxx-xxxxx.region.aws.neon.tech/database_name?sslmode=require"
```

### 3. Run with Docker
```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop
docker-compose down
```

### 4. Test the API
```bash
# Test health check
curl http://localhost:3001/health

# Or use the test script
node test-api.js
```

## 📊 API Endpoints
- `GET /health` - Health check
- `GET /users` - Get all users
- `POST /users` - Create user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🔧 Manual Commands
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start server
npm start
```
