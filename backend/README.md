# Prisma + Express + Neon Backend

Professional Express.js backend with **Clean Architecture**, Prisma ORM and Neon PostgreSQL.

## 🏗️ **Architecture**

```
backend/
├── src/
│   ├── controllers/          # HTTP request handlers
│   ├── services/             # Business logic layer
│   ├── routes/               # API route definitions
│   ├── middleware/           # Custom middleware
│   ├── models/               # Domain entities
│   └── app.js               # Express app configuration
├── prisma/
│   └── schema.prisma        # Database schema
├── tests/
│   └── user.test.js         # Unit tests
├── server.js                # Application entry point
├── api-test.http            # API endpoint tests
└── package.json
```

## 🚀 **Quick Start**

### 1. Set up Neon Database
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string

### 2. Environment Setup
Create `.env` file with your Neon connection string:
```bash
DATABASE_URL="postgresql://username:password@ep-xxxxx-xxxxx.region.aws.neon.tech/database_name?sslmode=require"
```

### 3. Install Dependencies
```bash
npm install
npm install cors helmet  # Additional security packages
```

### 4. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio (optional)
npm run db:studio
```

### 5. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 🐳 **Docker Setup**
```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop
docker-compose down
```

## 📊 **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/users` | Get all users |
| `POST` | `/users` | Create user |
| `GET` | `/users/:id` | Get user by ID |
| `PUT` | `/users/:id` | Update user |
| `DELETE` | `/users/:id` | Delete user |

## 🧪 **Testing**

### API Testing
```bash
# Use the HTTP file (VS Code with REST Client extension)
# Open api-test.http and click "Send Request"

# Or use curl commands
curl http://localhost:3001/health
curl http://localhost:3001/users
```

### Unit Testing
```bash
# Run basic model tests
node tests/user.test.js
```

## 🏛️ **Architecture Benefits**

### **Separation of Concerns**
- **Controllers**: Handle HTTP requests/responses
- **Services**: Contain business logic
- **Models**: Define data structures
- **Middleware**: Handle cross-cutting concerns

### **Maintainability**
- Clear file organization
- Easy to add new features
- Simple to test individual components
- Professional code structure

### **Scalability**
- Easy to add new endpoints
- Simple to modify business logic
- Clean dependency injection
- Modular design

## 🔧 **Development Commands**

```bash
# Start development server with auto-reload
npm run dev

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:push       # Push schema changes
npm run db:studio     # Open database GUI

# Testing
npm test              # Run tests
```

## 📁 **Key Files**

- **`server.js`**: Application entry point
- **`src/app.js`**: Express app configuration
- **`src/controllers/userController.js`**: HTTP handlers
- **`src/services/userService.js`**: Business logic
- **`src/models/userModel.js`**: User entity
- **`api-test.http`**: API testing endpoints

## 🛡️ **Security Features**

- **Helmet.js**: Security headers
- **CORS**: Cross-origin protection
- **Input validation**: Request validation
- **Error handling**: Secure error responses
- **Environment variables**: Secure config

## 🚀 **Perfect for**

- **Job interviews**: Demonstrates clean architecture
- **Live coding**: Well-structured and organized
- **Learning**: Clear separation of concerns
- **Production**: Scalable and maintainable
