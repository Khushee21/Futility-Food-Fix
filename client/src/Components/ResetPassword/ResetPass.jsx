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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/request-otp", { id: studentId });
      setSuccess(res.data.message);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setSuccess("");
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return setError("Please enter a valid 6-digit OTP.");
    }

    try {
      const res = await axios.post("/api/auth/verify-otp", {
        id: studentId,
        otp: enteredOtp,
      });
      setSuccess(res.data.message);
      setIsOtpVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await axios.post("/api/auth/reset-password", {
        id: studentId,
        otp: otp.join(""),
        newPassword,
      });
      setSuccess("Password reset successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className={styles.re_resetContainer}>
      <div className={styles.re_resetBox}>
        <img src={logo} alt="Logo" className={styles.re_resetLogo} />
        <h2 className={styles.re_resetTitle}>Futility Food Fix</h2>
        <h1 className={styles.re_resetHeading}>Reset Password</h1>

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <label htmlFor="studentId" className={styles.re_resetLabel}>
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className={styles.re_resetInput}
              required
              style={{ backgroundColor: "white", border: "1px solid black", color: "black" }}
            />
            {error && <p className={styles.re_resetError}>{error}</p>}
            {success && <p className={styles.re_resetSuccess}>{success}</p>}
            <button type="submit" className={styles.re_resetButton} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : !isOtpVerified ? (
          <>
            <div className={styles.re_otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className={styles.re_resetOtp}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <button onClick={handleVerifyOtp} className={styles.re_resetButton} disabled={otp.join("").length < 6}>
              Verify OTP
            </button>
            {error && <p className={styles.re_resetError}>{error}</p>}
            {success && <p className={styles.re_resetSuccess}>{success}</p>}
          </>
        ) : (
          <form onSubmit={handleResetPassword}>
            <label className={styles.re_resetLabel}>New Password</label>
            <input
              type="password"
              className={styles.re_resetInput}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <label className={styles.re_resetLabel}>Confirm Password</label>
            <input
              type="password"
              className={styles.re_resetInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <p className={styles.re_resetError}>{error}</p>}
            {success && <p className={styles.re_resetSuccess}>{success}</p>}
            <button type="submit" className={styles.re_resetButton}>
              Reset Password
            </button>
          </form>
        )}

        <div className={styles.re_quoteContainer}>
          <p key={quoteIndex} className={styles.re_quoteText}>
            {foodQuotes[quoteIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
