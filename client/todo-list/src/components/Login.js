import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      const token = response.data.token;
      console.log("Logged in successfully. Token:", token);
      window.alert('Log In successfully');
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      console.log(setIsLoggedIn);
      window.location.href = "/todo";
    } catch (error) {
      console.error("Error logging in:", error);
      window.alert('Error Loggin In: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
        <button type="button" className="login" onClick={handleLogin}>
          Login
        </button>
        <p className="style">
          Don't have an account? <Link to="/signup">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
}

export default Login;
