import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Student from "./Components/StudentDashBoard/Student";
import OccasionForm from "./Components/OccasionForm/tempOccasion"; 
import Studentoccasion from "./Components/Studentoccasion/Studentoccasion";
import SignInAdmin from "./Components/WardenSignIn/SignInAdmin";
import Warden from "./components/WardenDashBoard/Warden";
import SignInStu from "./Components/StuSignIn/SignInStu";
import ResetPass from "./Components/ResetPassword/ResetPass";
import Stdreg from "./Components/Registration/Stdreg";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle admin login state
  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            {/* Student Routes */}
            <Route path="/register" element={<Stdreg />} />
            <Route path="/signin" element={<SignInStu />} />
            <Route path="/student-dashboard" element={<Student />} />
            <Route path="/reset-password" element={<ResetPass />} />
            <Route path="/reset-password/:id" element={<ResetPass />} />

            {/* Admin Sign In Route */}
            <Route 
              path="/signin-admin" 
              element={<SignInAdmin onLogin={handleAdminLogin} />} 
            />

            {/* Warden Dashboard Route (Protected for Admin) */}
            <Route 
              path="/warden-dashboard" 
              element={isAdmin ? <Warden /> : <Navigate to="/signin-admin" />} 
            />

            {/* Occasion Form Route */}
            <Route path="/occasion-form" element={<OccasionForm />} />

            {/* Additional Route for Student Occasion */}
            <Route path="/student-occasion" element={<Studentoccasion />} />

            {/* Default Route (Fallback to Sign In as Student) */}
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
