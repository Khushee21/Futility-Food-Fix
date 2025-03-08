import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import StudentProfile from "./Components/myProfile/studentProfile";
import Student from './Components/StudentDashBoard/Student';
import OccasionForm from './Components/OccasionForm/tempOccasion';
import Studentoccasion from './Components/Studentoccasion/Studentoccasion';
import SignInAdmin from './Components/WardenSignIn/SignInAdmin';
import WardenDashboard from './Components/WardenDashBoard/Warden';
import SignInStu from './Components/StuSignIn/SignInStu';
import ResetPass from './Components/ResetPassword/ResetPass';
import Stdreg from './Components/Registration/Stdreg';
// import Stud from './Components/Daily_Warden/Daily_Warden/Stud';
// import Ward from './Components/Daily_Meal/Ward';
import SDash from './Components/Student_Dashboard/SDash';
import AboutFFF from './Components/AboutFFF/About_Us' // Importing AboutFFF component


function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle admin login state
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
          <Route 
            path="/signin-admin" 
            element={<SignInAdmin onLogin={handleAdminLogin} />} 
          />
          <Route 
            path="/warden-dashboard" 
            element={isAdmin ? <WardenDashboard /> : <Navigate to="/signin-admin" />} 
          />

          {/* Other Routes */}
          <Route path="/occasion-form" element={<OccasionForm />} />
          <Route path="/student-occasion" element={<Studentoccasion />} />
          {/* <Route path="/Daily-warden" element={<Ward />} />
          <Route path="/Daily-meal" element={<Stud />} /> */}
          <Route path="/my-profile" element={<StudentProfile />} />
          <Route path="/about-us" element={<AboutFFF />} /> {/* Uncommented this route */}
          
          {/* Student Dashboard */}
          {/*<Route path="/student-dashboard" element={<Student />} />  Uncommented this route */}
          <Route path="/SDash" element={<SDash />} /> {/* If you need to keep both routes, otherwise pick one */}
          
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
