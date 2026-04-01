async function probeServer() {
  const paths = ['/', '/api', '/api/auth/register'];
  for (const path of paths) {
    try {
      console.log(`Probing ${path}...`);
      const response = await fetch(`http://localhost:5000${path}`, { method: 'GET' });
      const text = await response.text();
      console.log(`Status: ${response.status}`);
      console.log(`Content-type: ${response.headers.get('content-type')}`);
      console.log(`Body Snippet: ${text.substring(0, 100)}`);
      console.log('---');
    } catch (err) {
      console.log(`Error probing ${path}: ${err.message}`);
    }
  }
}

probeServer();
