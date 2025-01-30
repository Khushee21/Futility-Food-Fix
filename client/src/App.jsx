import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInStu from "./Components/StuSignIn/SignInStu";
import Student from "./Components/StudentDashBoard/Student";
// import { resetPassword } from "../../server/controllers/authController";
import ResetPass from "./Components/ResetPassword/ResetPass";

function App() {
  return (
    <Router>
      <Routes>
        {/* Student Sign-In Page */}
        <Route path="/signin" element={<SignInStu />} />

        {/* Student Dashboard */}
        <Route path="/student-dashboard" element={<Student />} />

        {/* Password Reset Page with student ID in URL */}
        {/* <Route path="/reset-password/:id" element={<ResetPass />} /> */}
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/reset-password/:id" element={<ResetPass />} />

        {/* Default Route */}
        <Route path="*" element={<SignInStu />} />
      </Routes>
    </Router>
  );
}

export default App;
