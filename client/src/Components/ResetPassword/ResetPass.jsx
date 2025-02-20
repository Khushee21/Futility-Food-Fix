import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPass.css"; // Import the CSS file

const ResetPass = () => {
  const [studentId, setStudentId] = useState("");
  const [otp, setOtp] = useState(""); // New OTP input field
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false); // To manage OTP sent state
  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!studentId) {
      setError("Please enter your Student ID.");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5066/api/auth/send-otp", {
        id: studentId,
      });

      if (response.data.success) {
        setSuccess("OTP sent to your registered email.");
        setOtpSent(true); // Move to OTP verification step
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error sending OTP. Please try again.");
    }
  };

  // Handle password reset
  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5066/api/auth/reset-password", {
        id: studentId,
        otp, // Include OTP for verification
        newPassword,
      });

      if (response.data.success) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1 className="reset-heading">Reset Password</h1>
        
        {!otpSent ? (
          // Step 1: Send OTP
          <form onSubmit={handleSendOtp}>
            <div className="mb-4">
              <label htmlFor="studentId" className="reset-label">Student ID</label>
              <input
                type="text"
                id="studentId"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="reset-input"
                required
              />
            </div>
            {error && <p className="reset-error">{error}</p>}
            {success && <p className="reset-success">{success}</p>}
            <button type="submit" className="reset-button">Send OTP</button>
          </form>
        ) : (
          // Step 2: Verify OTP and Reset Password
          <form onSubmit={handleReset}>
            <div className="mb-4">
              <label htmlFor="otp" className="reset-label">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="reset-input"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="reset-label">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="reset-input"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="reset-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="reset-input"
                required
              />
            </div>
            {error && <p className="reset-error">{error}</p>}
            {success && <p className="reset-success">{success}</p>}
            <button type="submit" className="reset-button">Reset Password</button>
          </form>
        )}

        {/* Back to SignIn page link */}
        <div className="reset-link" onClick={() => navigate("/signin")}>
          Back to Login
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
