import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ResetPass.module.css";
import logo from "./logo.png";

const foodQuotes = [
  "Food is the ingredient that binds us together.",
  "Good food is the foundation of happiness.",
  "Eat well, live well, be well.",
  "Cooking is love made visible.",
  "Happiness is homemade."
];

const ResetPass = () => {
  const [studentId, setStudentId] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % foodQuotes.length);
    }, 4000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className={styles.resetContainer}>
      <div className={styles.resetBox}>
        <img src={logo} alt="Logo" className={styles.resetLogo}/>
        <h2 className={styles.resetTitle}>Futility Food Fix</h2>
        <h1 className={styles.resetHeading}>Reset Password</h1>

        {!otpSent ? (
          <form>
            <label htmlFor="studentId" className={styles.resetLabel}>Student ID</label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className={styles.resetInput}
              required
            />
            {error && <p className={styles.resetError}>{error}</p>}
            {success && <p className={styles.resetSuccess}>{success}</p>}
            <button type="submit" className={styles.resetButton}>Send OTP</button>
          </form>
        ) : (
          <>
            <div className={styles.otpContainer}>
              {otp.map((data, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  className={styles.resetOtp}
                />
              ))}
            </div>
          </>
        )}

        {/* ⬇️ Quotes placed below the OTP container inside reset-box */}
        <div className={styles.quoteContainer}>
          <p key={quoteIndex} className={styles.quoteText}>{foodQuotes[quoteIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
