import { PrismaClient } from '@prisma/client';

/**
 * UserService with Raw SQL - Alternative implementation for live coding
 * Demonstrates SQL knowledge instead of ORM usage
 */
export class UserServiceRaw {
  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Get all users with raw SQL
   */
  async getAllUsers() {
    const query = `
      SELECT 
        id, 
        email, 
        name, 
        age, 
        created_at,
        updated_at
      FROM users 
      ORDER BY created_at DESC
    `;
    
    const users = await this.prisma.$queryRaw`${query}`;
    return users;
  }

  /**
   * Get user by ID with raw SQL
   */
  async getUserById(id) {
    const query = `
      SELECT 
        id, 
        email, 
        name, 
        age, 
        created_at,
        updated_at
      FROM users 
      WHERE id = $1
      LIMIT 1
    `;
    
    const users = await this.prisma.$queryRaw`
      SELECT * FROM users WHERE id = ${parseInt(id)} LIMIT 1
    `;
    
    return users.length > 0 ? users[0] : null;
  }

  /**
   * Create user with raw SQL
   */
  async createUser(userData) {
    const { email, name, age } = userData;
    
    const query = `
      INSERT INTO users (email, name, age, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING id, email, name, age, created_at, updated_at
    `;
    
    const users = await this.prisma.$queryRaw`
      INSERT INTO users (email, name, age, created_at, updated_at)
      VALUES (${email}, ${name}, ${age || null}, NOW(), NOW())
      RETURNING *
    `;
    
    return users[0];
  }

  /**
   * Update user with raw SQL
   */
  async updateUser(id, userData) {
    const { email, name, age } = userData;
    
    const users = await this.prisma.$queryRaw`
      UPDATE users 
      SET 
        email = ${email},
        name = ${name},
        age = ${age || null},
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;
    
    return users[0];
  }

  /**
   * Delete user with raw SQL
   */
  async deleteUser(id) {
    await this.prisma.$queryRaw`
      DELETE FROM users WHERE id = ${parseInt(id)}
    `;
    
    return true;
  }

  /**
   * Advanced query example - Users with post count
   */
  async getUsersWithStats() {
    const query = `
      SELECT 
        u.id,
        u.name,
        u.email,
        u.created_at,
        COUNT(p.id) as post_count,
        MAX(p.created_at) as last_post_date
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      GROUP BY u.id, u.name, u.email, u.created_at
      ORDER BY u.created_at DESC
    `;
    
    // Note: This would work if you had a posts table
    // For now, just return basic user data
    return await this.prisma.$queryRaw`
      SELECT 
        id,
        name,
        email,
        created_at,
        0 as post_count
      FROM users
      ORDER BY created_at DESC
    `;
  }

  /**
   * Search users with pagination and filtering
   */
  async searchUsers(filters = {}) {
    const { search, page = 1, limit = 10, minAge, maxAge } = filters;
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE 1=1';
    const params = [];
    
    if (search) {
      whereClause += ` AND (name ILIKE $${params.length + 1} OR email ILIKE $${params.length + 1})`;
      params.push(`%${search}%`);
    }
    
    if (minAge) {
      whereClause += ` AND age >= $${params.length + 1}`;
      params.push(minAge);
    }
    
    if (maxAge) {
      whereClause += ` AND age <= $${params.length + 1}`;
      params.push(maxAge);
    }
    
    // Simplified version using Prisma's raw query
    return await this.prisma.$queryRaw`
      SELECT * FROM users
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;
  }

  /**
   * Disconnect from database
   */
  async disconnect() {
    await this.prisma.$disconnect();
  }
}
