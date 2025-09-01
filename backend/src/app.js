import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

/**
 * Express Application Setup
 */
const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/health', userRoutes); // Health check route
app.use('/users', userRoutes);  // User routes

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Prisma Express Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      users: '/users'
    },
    documentation: 'See api-test.http for endpoint examples'
  });
});

// 404 handler for unknown routes
app.use('*', notFound);

// Global error handler
app.use(errorHandler);

export default app;
