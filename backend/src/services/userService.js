import { PrismaClient } from '@prisma/client';
import { User } from '../models/userModel.js';

/**
 * UserService - Business logic for user operations
 */
export class UserService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get all users
   * @returns {Promise<User[]>} Array of users
   */
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return users.map(user => User.fromPrisma(user));
  }

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {Promise<User|null>} User or null if not found
   */
  async getUserById(id) {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
    return user ? User.fromPrisma(user) : null;
  }

  /**
   * Create new user
   * @param {Object} userData - User data
   * @returns {Promise<User>} Created user
   */
  async createUser(userData) {
    // Validate and sanitize data using centralized validation
    const cleanData = User.validateAndSanitize(userData);

    const user = await this.prisma.user.create({
      data: {
        email: cleanData.email,
        name: cleanData.name,
        age: cleanData.age
      }
    });
    return User.fromPrisma(user);
  }

  /**
   * Update existing user
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<User>} Updated user
   */
  async updateUser(id, userData) {
    // Validate and sanitize data using centralized validation
    const cleanData = User.validateAndSanitize(userData);

    const user = await this.prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        email: cleanData.email,
        name: cleanData.name,
        age: cleanData.age,
        updatedAt: new Date()
      }
    });
    return User.fromPrisma(user);
  }

  /**
   * Delete user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteUser(id) {
    await this.prisma.user.delete({
      where: { id: parseInt(id) }
    });
    return true;
  }

  /**
   * Check database connection
   * @returns {Promise<boolean>} Connection status
   */
  async checkConnection() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    await this.prisma.$disconnect();
  }
}
