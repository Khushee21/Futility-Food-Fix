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
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!studentId.trim()) {
      setError("Please enter your Student ID.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5066/api/auth/request-otp",
        { id: studentId.trim() }, // Trim whitespace
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSuccess("OTP sent to your registered email.");
        setOtpSent(true);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error sending OTP. Please try again."
      );
    } finally {
      setLoading(false);
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
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5066/api/auth/verify-otp",
        {
          id: studentId.trim(),
          otp: enteredOtp.trim(),
        }
      );

      if (response.data.success) {
        setSuccess("OTP verified successfully.");
        setIsOtpVerified(true);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error verifying OTP. Please try again."
      );
    } finally {
      setLoading(false);
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
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5066/api/auth/reset-password",
        {
          id: studentId.trim(),
          otp: otp.join(""),
          newPassword,
        }
      );

      if (response.data.success) {
        setSuccess("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error resetting password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = element.value;
    setOtp(updatedOtp);

    // Auto-focus to the next field
    if (element.value !== "" && index < 5) {
      element.nextSibling.focus();
    }

    // Auto-focus to the previous field on backspace
    if (element.value === "" && index > 0) {
      element.previousSibling.focus();
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1 className="reset-heading">Reset Password</h1>

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="mb-4">
              <label htmlFor="studentId" className="reset-label">
                Student ID
              </label>
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
            <button type="submit" className="reset-button" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
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
                  className="reset-otp"
                  disabled={isOtpVerified}
                />
              ))}
            </div>
            {error && <p className="reset-error">{error}</p>}
            {success && <p className="reset-success">{success}</p>}

            {isOtpVerified && (
              <form onSubmit={handleReset}>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="reset-label">
                    New Password
                  </label>
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
                  <label htmlFor="confirmPassword" className="reset-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="reset-input"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="reset-button"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPass;
