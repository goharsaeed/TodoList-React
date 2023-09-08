import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email: email,
        password: password,
      });
      window.alert('User registered successfully');

      console.log('User registered successfully');
   
      window.location.href = '/';
    } catch (error) {
      console.error('Error registering user:', error);
      window.alert('Error registering user: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className='login' onClick={handleSignup}>
          Signup
        </button>
        <p className="style">
          Already have an account? <Link to="/">Log in here</Link>.
        </p>
      </form>
    </div>
  );
}

export default Signup;
