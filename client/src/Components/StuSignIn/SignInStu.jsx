import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SignInStu.css';

const SignInStu = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/students/login", {
        id,
        password,
      });
      if (response.data.success) {
        alert("Login successful!");
        navigate("/student-dashboard");
      } else {
        setError("Invalid ID or Password");
      }
    } catch (err) {
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-heading">Student Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 mb-2">Student ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="auth-input"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}  // Toggle password visibility
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}  // Toggle the visibility state
                className="show-password-toggle"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">Login</button>
        </form>
        <div className="auth-link" onClick={() => navigate("/reset-password")}>
          Forgot Password?
        </div>
        <div className="auth-link" onClick={() => navigate("/register")}>
          New User? Register here
        </div>
        <div className="auth-link" onClick={() => navigate("/admin-login")}>
          Login as an Admin
        </div>
      </div>
    </div>
  );
};

export default SignInStu;

