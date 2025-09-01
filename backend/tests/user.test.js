import { User } from '../src/models/userModel.js';

/**
 * Basic User Model Tests
 * Run with: node tests/user.test.js
 */

// Simple test runner
const tests = [];
const test = (name, fn) => tests.push({ name, fn });
const expect = (actual) => ({
  toBe: (expected) => {
    if (actual !== expected) {
      throw new Error(`Expected ${expected}, got ${actual}`);
    }
  },
  toHaveProperty: (prop) => {
    if (!(prop in actual)) {
      throw new Error(`Expected to have property ${prop}`);
    }
  }
});

// User Model Tests
test('should create user with valid data', () => {
  const user = new User(1, 'test@example.com', 'Test User', 25);
  expect(user.email).toBe('test@example.com');
  expect(user.name).toBe('Test User');
  expect(user.age).toBe(25);
});

test('should convert to JSON correctly', () => {
  const user = new User(1, 'test@example.com', 'Test User', 25);
  const json = user.toJSON();
  expect(json).toHaveProperty('id');
  expect(json).toHaveProperty('email');
  expect(json).toHaveProperty('name');
  expect(json).toHaveProperty('age');
});

test('should validate user data correctly', () => {
  const validUser = new User(1, 'test@example.com', 'Test User', 25);
  expect(validUser.isValid()).toBe(true);

  const invalidUser = new User(1, 'invalid-email', 'Test User', 25);
  expect(invalidUser.isValid()).toBe(false);
});

test('should create user from Prisma data', () => {
  const prismaData = {
    id: 1,
    email: 'test@example.com',
    name: 'Test User',
    age: 25,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const user = User.fromPrisma(prismaData);
  expect(user.email).toBe('test@example.com');
  expect(user.name).toBe('Test User');
});

// Run tests
console.log('🧪 Running User Model Tests...\n');

tests.forEach(({ name, fn }) => {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
  }
});

console.log('\n✨ Tests completed!');
