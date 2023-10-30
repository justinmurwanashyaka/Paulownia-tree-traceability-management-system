import React, { useState } from 'react';

function Login({ setUserRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulated authentication logic for demonstration purposes.
    if (username === 'grower' && password === 'password') {
      setUserRole('grower');
    } else if (username === 'provider' && password === 'password') {
      setUserRole('provider');
    } else {
      // Handle authentication failure, show an error message, etc.
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='login'>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
