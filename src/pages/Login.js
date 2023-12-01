import React, { useState } from 'react';


function Login({ setUserRole,setUserId, setUserCompID}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your server for user authentication
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        const { role,userid, user_compID} = data;
        
  
        // Update state
        setUserRole(role);
        setUserCompID(user_compID);
        setUserId(userid)
      } else {
        // Handle authentication failure, show an error message, etc.
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };
  

  return (
    <div className='formlogin'>
      <form className='login' onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
      <div>
      <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
        <div>
        <button type="submit">Log In</button>
        </div>
      
      </form>
    </div>
    
  );
}

export default Login;
