import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import './App.css'; // Uncommented this if you need the CSS
// import Student from './Components/StudentDashBoard/Student';


// import SignInAdmin from './Components/WardenSignIn/SignInAdmin';
// import WardenDashboard from './Components/WardenDashBoard/Warden';


// import StudentProfile from "./Components/myProfile/studentProfile";

import OccasionForm from './Components/OccasionForm/tempOccasion';

import ResetPass from './Components/ResetPassword/ResetPass';
import Studentoccasion from './Components/Studentoccasion/Studentoccasion';
import SignInStu from './Components/StuSignIn/SignInStu';
import Attendance from './Components/Attendance/Attendance'; 
import Stud from './Components/Daily_Warden/Stud';
import Ward from './Components/Daily_Meal/Ward';
import MonthlyReport from './Components/MonthlyReport/MonthlyReport'
import AboutFFF from './Components/AboutFFF/About_Us';
import Profile from './Components/Profile/Profile';
import SDash from './Components/Student_Dashboard/SDash';
import Stdreg from './Components/Registration/Stdreg';
import WDash from './Components/WardenDashBoard/WDash';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  return (
    <div className="App">
      <main>
        <Routes>
        
       
          {/* <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/reset-password/:id" element={<ResetPass />} />  */}

          {/* Admin Routes */}
          {/* <Route path="/signin-admin" element={<SignInAdmin onLogin={handleAdminLogin} />} />
          <Route path="/warden-dashboard" element={isAdmin ? <WardenDashboard /> : <Navigate to="/signin-admin" />} /> */}

          {/* <Route path="*" element={<Navigate to="/signin" />} /> */}

          {/* <Route path="/my-profile" element={<StudentProfile />} /> */}

        
      

          <Route path="/occasion-form" element={<OccasionForm />} />
          <Route path="/student-occasion" element={<Studentoccasion />} /> 
          <Route path="/signin" element={<SignInStu />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/stud-daily" element={<Stud />} />
          <Route path="/warden-daily" element={<Ward />} />
          <Route path="/monthly-report" element={<MonthlyReport />} /> 
          <Route path="/about-us" element={<AboutFFF />} />      
           <Route path="/Profile" element={<Profile />} /> 
          <Route path="/SDash" element={<SDash />} />
          <Route path="/register" element={<Stdreg />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/WDash" element={<WDash />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
