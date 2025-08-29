const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test health check
    console.log('1. Testing health check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', health.data);

    // Test create user
    console.log('\n2. Creating a test user...');
    const newUser = await axios.post(`${BASE_URL}/users`, {
      email: 'test@example.com',
      name: 'Test User',
      age: 25
    });
    console.log('✅ User created:', newUser.data);

    // Test get all users
    console.log('\n3. Getting all users...');
    const users = await axios.get(`${BASE_URL}/users`);
    console.log('✅ Users:', users.data);

    // Test get user by ID
    console.log('\n4. Getting user by ID...');
    const user = await axios.get(`${BASE_URL}/users/${newUser.data.id}`);
    console.log('✅ User by ID:', user.data);

    // Test update user
    console.log('\n5. Updating user...');
    const updatedUser = await axios.put(`${BASE_URL}/users/${newUser.data.id}`, {
      email: 'updated@example.com',
      name: 'Updated User',
      age: 30
    });
    console.log('✅ User updated:', updatedUser.data);

    // Test delete user
    console.log('\n6. Deleting user...');
    await axios.delete(`${BASE_URL}/users/${newUser.data.id}`);
    console.log('✅ User deleted');

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();
