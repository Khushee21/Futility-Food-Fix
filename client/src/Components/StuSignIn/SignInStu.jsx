import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; 
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
    }, 1500);
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
        navigate("/SDash");
      } else {
        setError(response.data.message || "❌ Invalid ID or Password");
      }
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || "Server error"}`);
    }
  };

  return (
    <div className={styles.sstu_authBox}>
      <img src={logo} alt="Logo" className={styles.sstu_authLogo} />
      <h1 className={styles.sstu_authHeading}>Futility Food Fix</h1>

      <form onSubmit={handleLogin}>
        <div className={styles.sstu_inputContainer}>
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

        <div className={styles.sstu_inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <label className={password ? "filled" : ""}>Password</label>
          <span
            className={styles.sstu_eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        {error && <p className={styles.sstu_authError}>{error}</p>}

        <button type="submit" className={styles.sstu_authButton}>Login</button>
      </form>

      <div className={styles.sstu_authLinks}>
        <p onClick={() => navigate("/reset-password")}>Forgot Password?</p>
        <p onClick={() => navigate("/register")}>New User? <span>Register here</span></p>
        <p onClick={() => navigate("/signin-admin")}>Login as an Admin</p>
      </div>

      <p className={styles.sstu_foodQuote}>{foodQuotes[quoteIndex]}</p>
    </div>
  );
};

export default SignInStu;
