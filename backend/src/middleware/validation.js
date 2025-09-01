import { User } from '../models/userModel.js';


/**
 * Validate user data for creation/update using UserModel validation
 */
export const validateUser = (req, res, next) => {
  try {
    // Use centralized validation from UserModel
    User.validateUserData(req.body);
    next();
  } catch (error) {
    // Extract validation errors from the error message
    const errorMessage = error.message;
    const errors = errorMessage.includes('Validation failed: ') 
      ? errorMessage.replace('Validation failed: ', '').split(', ')
      : [errorMessage];

    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors
    });
  }
};

/**
 * Validate ID parameter
 */
export const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ 
      error: 'Invalid ID format. ID must be a positive number' 
    });
  }

  req.params.id = id;
  next();
};
