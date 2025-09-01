import { UserServiceRaw } from '../services/userServiceRaw.js';

/**
 * UserController with Raw SQL - Alternative for live coding
 * Shows SQL knowledge instead of ORM dependency
 */
export class UserControllerRaw {
  constructor() {
    this.userService = new UserServiceRaw();
  }

  /**
   * Health check endpoint
   */
  async healthCheck(req, res, next) {
    try {
      // Test with a simple raw query
      const result = await this.userService.prisma.$queryRaw`SELECT 1 as test`;
      res.json({ 
        status: 'OK', 
        database: 'Connected (Raw SQL)',
        test_query: result,
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
  async getUsers(req, res, next) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({
        data: users,
        count: users.length,
        query_type: 'Raw SQL'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(req, res, next) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          query_type: 'Raw SQL'
        });
      }
      res.json({
        data: user,
        query_type: 'Raw SQL'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new user
   */
  async createUser(req, res, next) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json({
        data: user,
        query_type: 'Raw SQL INSERT',
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update existing user
   */
  async updateUser(req, res, next) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.json({
        data: user,
        query_type: 'Raw SQL UPDATE',
        message: 'User updated successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user
   */
  async deleteUser(req, res, next) {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Advanced endpoint - Get users with statistics
   */
  async getUsersWithStats(req, res, next) {
    try {
      const users = await this.userService.getUsersWithStats();
      res.json({
        data: users,
        query_type: 'Complex JOIN Query',
        message: 'Users with statistics retrieved'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Search endpoint with filtering and pagination
   */
  async searchUsers(req, res, next) {
    try {
      const filters = {
        search: req.query.search,
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
        minAge: req.query.minAge ? parseInt(req.query.minAge) : undefined,
        maxAge: req.query.maxAge ? parseInt(req.query.maxAge) : undefined
      };

      const users = await this.userService.searchUsers(filters);
      res.json({
        data: users,
        pagination: {
          page: filters.page,
          limit: filters.limit
        },
        filters: filters,
        query_type: 'Dynamic SQL with filters'
      });
    } catch (error) {
      next(error);
    }
  }
}
