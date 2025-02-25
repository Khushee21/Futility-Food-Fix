import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignInStu.module.css";
import logo from "./logo.png"; 

const foodQuotes = [
  "Happiness is homemade!",
  "Good food, good mood!",
  "You are what you eat, so eat something sweet!",
  "Food is the ingredient that binds us together.",
  "Savor the flavor of life!",
];

const SignInStu = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % foodQuotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    setQuoteIndex((prevIndex) => (prevIndex + 1) % foodQuotes.length);
  }, 2000); // Faster transition (2s instead of 3s)
  return () => clearInterval(interval);
}, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5066/api/auth/login",
        { id, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("✅ Login successful!");
        navigate("/student-dashboard");
      } else {
        setError(response.data.message || "❌ Invalid ID or Password");
      }
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || "Server error"}`);
    }
  };

  return (
    <div className={styles.authBox}>
      <img src={logo} alt="Logo" className={styles.authLogo} />
      <h1 className={styles.authHeading}>Futility Food Fix</h1>

      <form onSubmit={handleLogin}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            autoComplete="username"
          />
          <label className={id ? "filled" : ""}>Student ID</label>
        </div>

        <div className={styles.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <label className={password ? "filled" : ""}>Password</label>
        </div>

        {error && <p className={styles.authError}>{error}</p>}

        <button type="submit" className={styles.authButton}>Login</button>
      </form>

      <div className={styles.authLinks}>
        <p onClick={() => navigate("/reset-password")}>Forgot Password?</p>
        <p onClick={() => navigate("/register")}>New User? <span>Register here</span></p>
        <p onClick={() => navigate("/signin-admin")}>Login as an Admin</p>
      </div>

      <p className={styles.foodQuote}>{foodQuotes[quoteIndex]}</p>
    </div>
  );
};

export default SignInStu;