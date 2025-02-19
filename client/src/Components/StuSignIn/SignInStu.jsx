import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SignInStu.css';

const SignInStu = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Log the input values to verify they're being sent correctly
    console.log("Logging in with:", { id, password });

    try {
      const response = await axios.post(
        "http://localhost:5066/api/auth/login",
        { id, password }, // Send 'id' and 'password' to backend
        { withCredentials: true } // Include cookies or session data if needed
      );

      if (response.data.success) {
        alert("✅ Login successful!");
        navigate("/student-dashboard");
      } else {
        setError(response.data.message || "❌ Invalid ID or Password");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      if (err.response) {
        setError(`❌ ${err.response.data.message || "Server error"}`);
      } else {
        setError("❌ Network error. Please check your connection.");
      }
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
              autoComplete="username" // Helps with autofill for the username
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
                autoComplete="current-password" // Ensures browser autofill works for password
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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
