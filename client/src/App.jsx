import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SignInAdmin from './Components/WardenSignIn/SignInAdmin';
import WDash from './Components/WardenDashBoard/WDash';
import StudentProfile from './Components/myProfile/studentProfile';
import NGO from './Components/NGO/NGO';
import OccasionForm from './Components/OccasionForm/tempOccasion';
import ResetPass from './Components/ResetPassword/ResetPass';
import Studentoccasion from './Components/Studentoccasion/Studentoccasion';
import SignInStu from './Components/StuSignIn/SignInStu';
import Attendance from './Components/Attendance/Attendance';
import Stud from './Components/Daily_Warden/Stud';
import Ward from './Components/Daily_Meal/Ward';
import MonthlyReport from './Components/MonthlyReport/MonthlyReport';
import AboutFFF from './Components/AboutFFF/About_Us';
import Profile from './Components/myProfile/studentProfile';
import SDash from './Components/Student_Dashboard/SDash';
import Stdreg from './Components/Registration/Stdreg';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  return (
    <div className="App">
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signin" element={<SignInStu />} />
          <Route path="/register" element={<Stdreg />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/ResetPass" element={<ResetPass />} />
          <Route path="/ResetPass/:id" element={<ResetPass />} />

          {/* Student Dashboard & Features */}
          <Route path="/SDash" element={<SDash />} />
          <Route path="/StudentProfile" element={<StudentProfile />} />
          <Route path="/student-occasion" element={<Studentoccasion />} />
          <Route path="/about-us" element={<AboutFFF />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Attendance" element={<Attendance />} />

          {/* Admin Routes */}
          <Route path="/SignInAdmin" element={<SignInAdmin onLogin={handleAdminLogin} />} />
          <Route path="/WDash" element={isAdmin ? <WDash /> : <Navigate to="/SignInAdmin" />} />
          <Route path="/occasion-form" element={<OccasionForm />} />
          <Route path="/stud-daily" element={<Stud />} />
          <Route path="/warden-daily" element={<Ward />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />

          {/* NGO Route */}
          <Route path="/NGO" element={<NGO />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
