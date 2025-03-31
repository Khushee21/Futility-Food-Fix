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
    <div className={styles.re_resetContainer}>
      <div className={styles.re_resetBox}>
        <img src={logo} alt="Logo" className={styles.re_resetLogo}/>
        <h2 className={styles.re_resetTitle}>Futility Food Fix</h2>
        <h1 className={styles.re_resetHeading}>Reset Password</h1>

        {!otpSent ? (
          <form>
            <label htmlFor="studentId" className={styles.re_resetLabel}>Student ID</label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className={styles.re_resetInput}
              style={{backgroundColor:"white",border:"1px solid black"}}
              required
            />
            {error && <p className={styles.re_resetError}>{error}</p>}
            {success && <p className={styles.re_resetSuccess}>{success}</p>}
            <button type="submit" className={styles.re_resetButton}>Send OTP</button>
          </form>
        ) : (
          <>
            <div className={styles.re_otpContainer}>
              {otp.map((data, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  className={styles.re_resetOtp}
                />
              ))}
            </div>
          </>
        )}

        {/* ⬇️ Quotes placed below the OTP container inside reset-box */}
        <div className={styles.re_quoteContainer}>
          <p key={quoteIndex} className={styles.re_quoteText}>{foodQuotes[quoteIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
