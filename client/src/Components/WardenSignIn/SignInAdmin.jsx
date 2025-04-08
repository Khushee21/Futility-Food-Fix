import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SignInAdmin.css'; // Optional, for styling

const SignInAdmin = ({ onLogin }) => {  // Accept onLogin prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5066/api/auth/admin/login", {
        username,
        password,
      });

      if (response.data.success) {
        alert("✅ Admin login successful!");

        // Call onLogin to update the admin state in App.jsx
        onLogin();  // This will set isAdmin to true in App.jsx

        // Navigate to the Warden dashboard
        navigate("/WDash");
      } else {
        setError(response.data.message || "❌ Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Admin Login Error:", err);
      setError("❌ Network error. Please check your connection.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-heading">Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignInAdmin;
