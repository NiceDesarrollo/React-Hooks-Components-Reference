import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { validateUser } from '../middleware/validation.js';

/**
 * User Routes - Define all user-related endpoints
 */
const router = Router();
const userController = new UserController();

// Health check endpoint
router.get('/health', userController.healthCheck);

// User CRUD endpoints
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', validateUser, userController.createUser);
router.put('/:id', validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
