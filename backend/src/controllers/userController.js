import { UserService } from '../services/userService.js';

/**
 * UserController - HTTP request handlers for user operations
 */
export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  /**
   * Health check endpoint
   */
  healthCheck = async (req, res, next) => {
    try {
      const isConnected = await this.userService.checkConnection();
      res.json({ 
        status: 'OK', 
        database: isConnected ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'Error', 
        database: 'Disconnected', 
        error: error.message 
      });
    }
  }

  /**
   * Get all users
   */
  getUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users.map(user => user.toJSON()));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   */
  getUserById = async (req, res, next) => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.toJSON());
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new user
   */
  createUser = async (req, res, next) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user.toJSON());
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing user
   */
  updateUser = async (req, res, next) => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.json(user.toJSON());
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user
   */
  deleteUser = async (req, res, next) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
