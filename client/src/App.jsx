import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Student from './Components/StudentDashBoard/Student';
import OccasionForm from './Components/OccasionForm/tempOccasion';
import Studentoccasion from './Components/Studentoccasion/Studentoccasion';
import SignInAdmin from './Components/WardenSignIn/SignInAdmin';
import WardenDashboard from './Components/WardenDashBoard/Warden';
import SignInStu from './Components/StuSignIn/SignInStu';
import ResetPass from './Components/ResetPassword/ResetPass';
import Stdreg from './Components/Registration/Stdreg';
import Stud from './Components/Daily_Warden/Daily_Warden/Stud';
import Ward from './Components/Daily_Meal/Ward';

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
          <Route path="/student-dashboard" element={<Student />} />
          <Route path="/reset-password" element={<ResetPass />} />
          <Route path="/reset-password/:id" element={<ResetPass />} />

          <Route 
            path="/signin-admin" 
            element={<SignInAdmin onLogin={handleAdminLogin} />} 
          />

          <Route 
            path="/warden-dashboard" 
            element={isAdmin ? <WardenDashboard /> : <Navigate to="/signin-admin" />} 
          />

          <Route path="/occasion-form" element={<OccasionForm />} />
          <Route path="/student-occasion" element={<Studentoccasion />} />
          <Route path="/Daily-warden" element={<Ward />} />
          <Route path="/Daily-meal" element={<Stud />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
