const axios = require('axios');

async function testRegister() {
  try {
    console.log('Testing /api/auth/register...');
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';
    
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      email,
      password
    });
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    console.log('Register test passed!');
  } catch (err) {
    console.error('Register test failed:');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else {
      console.error('Error Message:', err.message);
    }
  }
}

testRegister();
