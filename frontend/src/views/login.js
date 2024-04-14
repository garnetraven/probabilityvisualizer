import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './login.css';

function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');


  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/login', { username, password });
      const token = response.data.token; // Assuming the JWT token is returned from the server
      localStorage.setItem('token', token); // Save token in local storage
      console.log(response.data);
      // Redirect to dashboard after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setError(error.response.data.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/register', { username, email, password, confirmPassword });
      const token = response.data.token; // Assuming the JWT token is returned from the server
      localStorage.setItem('token', token); // Save token in local storage
      console.log(response.data);
      // Redirect to dashboard after successful registration
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='container'>
      <h1>{showRegister ? 'Register!' : 'Welcome Back!'}</h1>
      <div>
        {showRegister ? (
          <form onSubmit={handleRegisterSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
              Confirm Password:
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button type="submit">Register</button>
            <button onClick={toggleRegister}>Already Registered? Login</button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <label>
              Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit">Login</button>
            <button>Forgot Password?</button>
            <button onClick={toggleRegister}>Not Registered? Register</button>
          </form>
        )}
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default Login;
