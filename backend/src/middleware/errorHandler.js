/**
 * Global Error Handler Middleware
 */

/**
 * Handle all application errors
 */
export const errorHandler = (error, req, res, next) => {
  console.error('Error occurred:', error);

  // Prisma specific errors
  if (error.code === 'P2002') {
    return res.status(400).json({ 
      error: 'Email already exists',
      code: 'DUPLICATE_EMAIL'
    });
  }

  if (error.code === 'P2025') {
    return res.status(404).json({ 
      error: 'User not found',
      code: 'USER_NOT_FOUND'
    });
  }

  if (error.code === 'P2003') {
    return res.status(400).json({ 
      error: 'Foreign key constraint failed',
      code: 'CONSTRAINT_ERROR'
    });
  }

  // Validation errors
  if (error.message.includes('Invalid user data')) {
    return res.status(400).json({ 
      error: error.message,
      code: 'VALIDATION_ERROR'
    });
  }

  // Default server error
  res.status(500).json({ 
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
};

/**
 * Handle 404 errors for unknown routes
 */
export const notFound = (req, res) => {
  res.status(404).json({ 
    error: `Route ${req.method} ${req.path} not found`,
    code: 'ROUTE_NOT_FOUND'
  });
};
