import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; // Uncommented this if you need the CSS
import StudentProfile from "./Components/myProfile/studentProfile";
import Student from './Components/StudentDashBoard/Student';
import OccasionForm from './Components/OccasionForm/tempOccasion';
import Studentoccasion from './Components/Studentoccasion/Studentoccasion';
import SignInAdmin from './Components/WardenSignIn/SignInAdmin';
import WardenDashboard from './Components/WardenDashBoard/Warden';
import SignInStu from './Components/StuSignIn/SignInStu';
import ResetPass from './Components/ResetPassword/ResetPass';
import Stdreg from './Components/Registration/Stdreg';
import SDash from './Components/Student_Dashboard/SDash';
import Stud from './Components/Daily_Warden/Stud';
import Ward from './Components/Daily_Meal/Ward';
// import MonthlyReport from './Components/MonthlyReport/MonthlyReport'
import AboutFFF from './Components/AboutFFF/About_Us'; // Importing AboutFFF component
import MonthlyReport from './Components/MonthlyReport/MonthlyReport'; // Added MonthlyReport from report branch
import Attendance from './Components/Attendance/Attendance'; // Added Attendance

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  return (
    <div className="App">
      <main>
        <Routes>
          {/* Student Routes */}
          <Route path="/register" element={<Stdreg />} />
          <Route path="/signin" element={<SignInStu />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/reset-password/:id" element={<ResetPass />} />

          {/* Admin Routes */}
          <Route path="/signin-admin" element={<SignInAdmin onLogin={handleAdminLogin} />} />
          <Route path="/warden-dashboard" element={isAdmin ? <WardenDashboard /> : <Navigate to="/signin-admin" />} />

          {/* Other Routes */}
          <Route path="/occasion-form" element={<OccasionForm />} />
          <Route path="/student-occasion" element={<Studentoccasion />} />
          <Route path="/my-profile" element={<StudentProfile />} />
          <Route path="/about-us" element={<AboutFFF />} />
          <Route path="/stud-daily" element={<Stud />} />
          <Route path="/warden-daily" element={<Ward />} />
          {/* Student Dashboard */}
          <Route path="/SDash" element={<SDash />} />

          {/* New Routes */}
          <Route path="/monthly-report" element={<MonthlyReport />} />
          <Route path="/Attendance" element={<Attendance />} />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
