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
  const [otp, setOtp] = useState(new Array(6).fill("")); // OTP input fields
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false); // To track if OTP was sent
  const [loading, setLoading] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // OTP verification state
  const navigate = useNavigate();

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % foodQuotes.length);
    }, 4000);

    return () => clearInterval(quoteInterval);
  }, []);

  // Handle the OTP sending action when the user clicks the "Send OTP" button
  const handleSendOtp = async (e) => {
    e.preventDefault(); // Prevent form submission

    if (!studentId) {
      setError("Please enter your student ID.");
      return;
    }

    try {
      setLoading(true);
      setError(""); // Clear previous errors

      // Make an API request to send OTP
      const response = await axios.post("http://localhost:5066/api/auth/request-otp", { id: studentId });

      if (response.data.success) {
        setSuccess("OTP has been sent to your registered email.");
        setOtpSent(true); // Change to OTP sent state
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification action
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5066/api/auth/verify-otp", {
        id: studentId,
        otp: otp.join(''), // Joining OTP array as a string
      });
  
      console.log("OTP verified successfully:", response.data);
      setIsOtpVerified(true);  // OTP is verified, show the password reset form
      setSuccess(response.data.message); // Optionally, show a success message
    } catch (error) {
      console.error("OTP verification failed:", error.response.data);
      setError(error.response.data.message); // Set the error message from the backend
    }
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5066/api/auth/reset-password", {
        id: studentId,
        otp: otp.join(''), // OTP used in verification step
        newPassword: newPassword, // New password entered by the user
      });
  
      console.log("Password reset successfully:", response.data);
      alert(response.data.message);
      setSuccess(response.data.message);  // Show success message
      setNewPassword("");  // Clear input fields
      setConfirmPassword("");
    } catch (error) {
      console.error("Password reset failed:", error.response.data);
      setError(error.response.data.message);  // Show error message
    }
  };
  
  return (
    <div className={styles.re_resetContainer}>
      <div className={styles.re_resetBox}>
        <img src={logo} alt="Logo" className={styles.re_resetLogo} />
        <h2 className={styles.re_resetTitle}>Futility Food Fix</h2>
        <h1 className={styles.re_resetHeading}>Reset Password</h1>

        {/* Show the OTP form or the initial form */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <label htmlFor="studentId" className={styles.re_resetLabel}>Student ID</label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className={styles.re_resetInput}
              style={{ backgroundColor: "white", border: "1px solid black", color: "black" }}
              required
            />
            {error && <p className={styles.re_resetError}>{error}</p>}
            {success && <p className={styles.re_resetSuccess}>{success}</p>}
            <button type="submit" className={styles.re_resetButton} disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <>
            {/* OTP input fields */}
            <div className={styles.re_otpContainer}>
              {otp.map((data, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[index] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className={styles.re_resetOtp}
                />
              ))}
            </div>
            <button className={styles.re_resetButton} onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}
        {isOtpVerified && (
  <div className={styles.re_resetBox}>
    <h1 className={styles.re_resetHeading}>Reset Password</h1>

    <form onSubmit={handleResetPassword}>
      <label htmlFor="newPassword" className={styles.re_resetLabel}>New Password</label>
      <input
        type="password"
        id="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className={styles.re_resetInput}
        required
      />

      <label htmlFor="confirmPassword" className={styles.re_resetLabel}>Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className={styles.re_resetInput}
        required
      />

      {error && <p className={styles.re_resetError}>{error}</p>}
      {success && <p className={styles.re_resetSuccess}>{success}</p>}

      <button type="submit" className={styles.re_resetButton}>
        Reset Password
      </button>
    </form>
  </div>
)}

        <div className={styles.re_quoteContainer}>
          <p key={quoteIndex} className={styles.re_quoteText}>{foodQuotes[quoteIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
