import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPass.css"; // Import the CSS file

const ResetPass = () => {
  const { id } = useParams(); // Get the student ID from the URL (you may still want this for validation)
  const [newPassword, setNewPassword] = useState(""); // New password input
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password input
  const [studentId, setStudentId] = useState(id || ""); // ID input field, default to ID from URL
  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message
  const navigate = useNavigate(); // React Router navigate for page redirection

  // Handle password reset form submission
  const handleReset = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if both passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Clear previous success or error messages
    setSuccess("");
    setError("");

    // Proceed with password reset logic
    try {
      // Send reset request to backend with the student ID and new password
      const response = await axios.post("http://localhost:5000/api/students/reset-password", {
        id: studentId, // Send the ID from the form field
        newPassword,
      });

      // Check if the password reset was successful
      if (response.data.success) {
        setSuccess("Password reset successful! Redirecting to login...");
        // Redirect to login page after 3 seconds
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        // If there's an error message from backend, show it
        setError(response.data.message);
      }
    } catch (err) {
      // Catch any unexpected errors and display a generic error message
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h1 className="reset-heading">Reset Password</h1>
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label htmlFor="studentId" className="reset-label">Student ID</label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)} // Update student ID
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
        {/* Back to SignIn page link */}
        <div className="reset-link" onClick={() => navigate("/signin")}>
          Back to Login
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
