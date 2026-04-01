async function testRegister() {
  try {
    console.log('Testing /api/auth/register...');
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';
    
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    console.log('Response Status:', response.status);
    console.log('Response Data:', data);
    
    if (response.ok) {
      console.log('Register test passed!');
    } else {
      console.error('Register test failed with status', response.status);
    }
  } catch (err) {
    console.error('Register test failed with error:', err.message);
  }
}

testRegister();
