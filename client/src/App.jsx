import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInStu from "./Components/StuSignIn/SignInStu";
import Student from "./Components/StudentDashBoard/Student";
import ResetPass from "./Components/ResetPassword/ResetPass";
import Stdreg from "./Components/Registration/Stdreg"; // Import the Registration form

function App() {
  return (
    <Router>
      <Routes>
        {/* Student Registration */}
        <Route path="/register" element={<Stdreg />} />

        {/* Student Sign-In Page */}
        <Route path="/signin" element={<SignInStu />} />

        {/* Student Dashboard */}
        <Route path="/student-dashboard" element={<Student />} />

        {/* Password Reset Page */}
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/reset-password/:id" element={<ResetPass />} />

        {/* Default Route */}
        <Route path="*" element={<SignInStu />} />
      </Routes>
    </Router>
  );
}

export default App;
