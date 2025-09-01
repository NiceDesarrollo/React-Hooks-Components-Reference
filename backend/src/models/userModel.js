/**
 * User Model - Domain entity for user data
 */
export class User {
  constructor(id, email, name, age) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.age = age;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Create User instance from Prisma data
   * @param {Object} data - Prisma user data
   * @returns {User} User instance
   */
  static fromPrisma(data) {
    const user = new User(
      data.id,
      data.email,
      data.name,
      data.age
    );
    user.createdAt = data.createdAt;
    user.updatedAt = data.updatedAt;
    return user;
  }

  /**
   * Convert User to JSON format
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      age: this.age,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Static method to validate user data before operations
   * @param {Object} userData - User data to validate
   * @throws {Error} If validation fails
   * @returns {boolean} true if valid
   */
  static validateUserData(userData) {
    const errors = [];

    // Validate email
    if (!userData.email) {
      errors.push('Email is required');
    } else if (!userData.email.includes('@')) {
      errors.push('Invalid email format');
    } else if (userData.email.length < 5) {
      errors.push('Email must be at least 5 characters');
    }

    // Validate name
    if (!userData.name) {
      errors.push('Name is required');
    } else if (userData.name.length < 2) {
      errors.push('Name must be at least 2 characters');
    } else if (userData.name.length > 100) {
      errors.push('Name must be less than 100 characters');
    }

    // Validate age (optional)
    if (userData.age !== undefined && userData.age !== null) {
      const age = parseInt(userData.age);
      if (isNaN(age)) {
        errors.push('Age must be a valid number');
      } else if (age <= 0) {
        errors.push('Age must be greater than 0');
      } else if (age > 150) {
        errors.push('Age must be less than 150');
      }
    }

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    return true;
  }

  /**
   * Static method to sanitize user data
   * @param {Object} userData - Raw user data
   * @returns {Object} Sanitized user data
   */
  static sanitizeUserData(userData) {
    return {
      email: userData.email?.trim().toLowerCase(),
      name: userData.name?.trim(),
      age: userData.age ? parseInt(userData.age) : null
    };
  }

  /**
   * Static method to validate and sanitize user data
   * @param {Object} userData - Raw user data
   * @returns {Object} Clean, validated user data
   */
  static validateAndSanitize(userData) {
    // First sanitize
    const sanitized = User.sanitizeUserData(userData);
    
    // Then validate
    User.validateUserData(sanitized);
    
    return sanitized;
  }
}
