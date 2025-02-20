import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPass.css";

const ResetPass = () => {
  const [studentId, setStudentId] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill("")); // 6-digit OTP
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false); // OTP verified state
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
        setOtpSent(true);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Error sending OTP. Please try again.");
    }
  };

  // Handle OTP verification
  useEffect(() => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      verifyOtp(enteredOtp);
    }
  }, [otp]);

  const verifyOtp = async (enteredOtp) => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5066/api/auth/verify-otp", {
        id: studentId,
        otp: enteredOtp,
      });

      if (response.data.success) {
        setSuccess("OTP verified successfully.");
        setIsOtpVerified(true);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
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
        otp: otp.join(""),
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

  // Handle OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input box
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1 className="reset-heading">Reset Password</h1>
        
        {!otpSent ? (
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
          <>
            <div className="otp-container">
              {otp.map((data, index) => (
                <input
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="otp-input"
                  disabled={isOtpVerified}
                />
              ))}
            </div>
            {error && <p className="reset-error">{error}</p>}
            {success && <p className="reset-success">{success}</p>}

            {isOtpVerified && (
              <form onSubmit={handleReset}>
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
                <button type="submit" className="reset-button">Reset Password</button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPass;
